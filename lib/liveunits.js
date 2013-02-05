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
		
		assets: {
			html: {
				test: path.resolve(__dirname, "./liveunits/assets/test.html"),
				live: path.resolve(__dirname, "./liveunits/assets/live.html")
			},
			style: {
				base: path.resolve(__dirname, "./liveunits/assets/base.css"),
				style: path.resolve(__dirname, "./liveunits/assets/style.css")
			},
			script: {
				live: path.resolve(__dirname, "./liveunits/assets/live.js"),
				jquery: path.resolve(__dirname, "./liveunits/assets/jquery-1.8.0.min.js"),
				assertion: path.resolve(__dirname, "./liveunits/assets/assertion.js"),
				tester: path.resolve(__dirname, "./liveunits/assets/tester.js"),
				results: path.resolve(__dirname, "./liveunits/assets/jquery-tester-results.js")
			},
			png: {
				pass: path.resolve(__dirname, "./liveunits/assets/pass.png"),
				fail: path.resolve(__dirname, "./liveunits/assets/fail.png")
			}
		},
		
		mimetypes: {
			html: "text/html",
			style: "text/css",
			script: "text/javascript",
			png: "image/png"
		},
		
		cache: {
			png: true
		}
		
	};
	
	var assets = new AssetResolver(config.assets, config.mimetypes, config.cache);
	var resources = new ResourceList(items);
	var server = new Server(assets, resources, config.general.port, config.general.maxwait);
	
	this.getPort = function() {
		return config.general.port;
	};

}

module.exports = LiveUnits;