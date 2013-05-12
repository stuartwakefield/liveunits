var AssetResolver = require("./liveunits/asset_resolver");
var ResourceList = require("./liveunits/resource_list");
var Server = require("./liveunits/server");
var path = require("path");

function LiveUnits(items) {

	var config = {
		
		general: {
			port: 8383,
			maxwait: 10000
		},
		
		extensions: {
			html: "text/html",
			css: "text/css",
			png: "image/png",
			js: "application/javascript"
		},
		
		cache: {
			png: true
		}
		
	};
	
	var assetsDir = path.resolve(__dirname, "liveunits/assets");
	var assets = new AssetResolver(assetsDir, config.assets, config.mimetypes, config.extensions, config.cache);
	var resources = new ResourceList(items);
	var server = new Server(assets, resources, config.general.port, config.general.maxwait);
	
	server.listen();
	
	this.getPort = function() {
		return config.general.port;
	};

}

module.exports = LiveUnits;