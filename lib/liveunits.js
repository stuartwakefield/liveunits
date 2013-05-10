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
				test: path.resolve(__dirname, "./liveunits/assets/html/test.html"),
				live: path.resolve(__dirname, "./liveunits/assets/html/live.html"),
				monitor: path.resolve(__dirname, "./liveunits/assets/html/monitor.html")
			},
			style: {
				base: path.resolve(__dirname, "./liveunits/assets/css/base.css"),
				style: path.resolve(__dirname, "./liveunits/assets/css/style.css")
			},
			script: {
				live: path.resolve(__dirname, "./liveunits/assets/js/live.js"),
				assert: path.resolve(__dirname, "./liveunits/assets/js/assert.js"),
				describe: path.resolve(__dirname, "./liveunits/assets/js/describe.js"),
				jquery: path.resolve(__dirname, "./liveunits/assets/lib/jquery/1.8.0/jquery.min.js"),
				assertion: path.resolve(__dirname, "./liveunits/assets/js/assertion.js"),
				tester: path.resolve(__dirname, "./liveunits/assets/js/tester.js"),
				results: path.resolve(__dirname, "./liveunits/assets/js/jquery-tester-results.js")
			},
			png: {
				pass: path.resolve(__dirname, "./liveunits/assets/img/pass.png"),
				fail: path.resolve(__dirname, "./liveunits/assets/img/fail.png")
			}
		},
		
		mimetypes: {
			html: "text/html",
			style: "text/css",
			script: "text/javascript",
			png: "image/png"
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
	
	var assets = new AssetResolver(path.resolve(__dirname, "liveunits/assets"), config.assets, config.mimetypes, config.extensions, config.cache);
	var resources = new ResourceList(items);
	var server = new Server(assets, resources, config.general.port, config.general.maxwait);
	
	this.getPort = function() {
		return config.general.port;
	};

}

module.exports = LiveUnits;