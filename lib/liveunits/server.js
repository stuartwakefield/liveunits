var http = require("http");
var url = require("url");

function Server(assets, resources, port, maxwait) {

	http.createServer(function(request, response) {
		
		var location = url.parse(request.url, true);
		  
		handlePath(response, location.pathname, location.query);
		
	}).listen(port);
	
	function handlePath(response, path, args) {
		
		var parts = path.split(/\//);
		
		switch(parts[1]) {
			
			case "check":
				waitAndCheckForScriptChanges(new Date().valueOf(), args.hash, response);
				break;
				
			case "test":
			
				switch(parts[2]) {
					case "assets":
						respond(response, resources.getSource(), "application/javascript");
						break;
					
					default:
						serveAssetFile(response, "html/test.html");
						break;
					
				}
			
				break;
			
			case "monitor":
				serveAssetFile(response, "html/monitor.html");
				break;
				
			case "assets":
				serveAssetFile(response, parts.slice(2).join("/"));
				break;
			
			default:
				serveAssetFile(response, "html/live.html");
				break;
			
		}
		
	}
	
	function serveAssetFile(response, file) {
		respond(response, assets.getContentFile(file), assets.getMimeTypeFile(file), assets.isCachableFile(file));
	}
	
	// TODO Detect if watch can be used and use that instead
	function waitAndCheckForScriptChanges(start, check, response) {
		setTimeout(function() {
			if(start + maxwait < new Date().valueOf() 
				|| check != (hash = resources.getHash())) {
				respond(response, JSON.stringify({
					"hash" : hash
				}), "application/json");
			} else {
				waitAndCheckForScriptChanges(start, check, response);
			}
		}, 10);
	}
	
	function respond(response, content, mimetype, cachable) {
		response.setHeader("Content-Type", (mimetype || "text/plain") + "; charset=utf-8");
		response.setHeader("Content-Length", content.length);
		if(!cachable)
			response.setHeader("Cache-Control", "no-cache");
		response.end(content);
	}

}

module.exports = Server;