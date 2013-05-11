var fs = require("fs")
  , path = require("path");

function AssetResolver(basedir, assets, mimetypes, extensions, cachable) {
	
	this.getContentFile = function(file) {
		return fs.readFileSync(path.resolve(basedir, file));
	};
	
	this.getFileExtension = function(file) {
		var matches = file.match(/\.([^\.]+)$/);		
		return matches.length ? matches[1] : "";
	}
	
	this.getMimeTypeFile = function(file) {
		return extensions[this.getFileExtension(file)] || "text/plain"; 
	};
	
	this.isCachableFile = function(file) {
		return !!cachable[this.getFileExtension(file)];
	}
	
}

module.exports = AssetResolver;