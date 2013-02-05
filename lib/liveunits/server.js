var http = require("http");
var url = require("url");

function Server(assets, resources, port, maxwait) {

	http.createServer(function(request, response) {
		
		var location = url.parse(request.url, true), 
		    action;
		
		if(location.query.asset)
			action = "asset";
		
		if(location.query.action)
			action = location.query.action;
			
		switch(action) {
			
			case "check":			
				waitAndCheckForScriptChanges(new Date().valueOf(), location.query.hash, response);
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
				serveAsset(response, location.query.asset, location.query.name);
				break;
			default:
				serveAsset(response, "html", "live");
				break;
		}
		
	}).listen(port);
	
	function serveAsset(response, type, name) {
		respond(response, assets.getContent(type, name), assets.getMimeType(type), assets.isCachable(type));
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