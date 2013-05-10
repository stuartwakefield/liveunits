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
			
			case "monitor":
				serveAssetFile(response, "html/monitor.html");
				break;
				
			case "assets":
				serveAssetFile(response, parts.slice(2).join("/"));
				break;
			
			default:
				handleAction(response, args);
				break;
			
		}
		
	}
	
	function handleAction(response, args) {
		
		var action;
		
		if(args.asset)
			action = "asset";
		
		if(args.action)
			action = args.action;
			
		switch(action) {
			
			case "check":			
				waitAndCheckForScriptChanges(new Date().valueOf(), args.hash, response);
				// The request is a long poll where it periodically tests that the 
				// watched resources haven't changed. If the hash is the same then 
				// it will wait and check again until the TEST_SERVER_MAX_WAIT time 
				// has elapsed. It returns the new hash as soon as the check shows 
				// the resources have changed
				break;
				
			case "test":
				serveAsset(response, "html", "test");
				break;
			case "test.assets":
				respond(response, resources.getSource(), assets.getMimeType("script"));
				break;
			case "asset":
				serveAsset(response, args.asset, args.name);
				break;
			case "monitor":
				serveAsset(response, "html", "monitor");
				break;
			case "result":
				
				break;
			default:
				serveAsset(response, "html", "live");
				break;
		}
	}
	
	function serveAsset(response, type, name) {
		respond(response, assets.getContent(type, name), assets.getMimeType(type), assets.isCachable(type));
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