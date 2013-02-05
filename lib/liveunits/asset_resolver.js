var fs = require("fs");

function AssetResolver(assets, mimetypes, cachable) {
	
	this.getFilePath = function(type, name) {
		return assets[type] && assets[type][name];
	};
	
	this.getContent = function(type, name) {
		return fs.readFileSync(this.getFilePath(type, name));
	};
	
	this.getMimeType = function(type) {
		return mimetypes[type] || "text/plain";
	};
	
	this.isCachable = function(type) {
		return cachable[type] || false;
	}
	
}

module.exports = AssetResolver;