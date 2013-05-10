var fs = require("fs")
  , path = require("path");

function AssetResolver(basedir, assets, mimetypes, extensions, cachable) {
	
	this.getFilePath = function(type, name) {
		return assets[type] && assets[type][name];
	};
	
	this.getContent = function(type, name) {
		return fs.readFileSync(this.getFilePath(type, name));
	};
	
	this.getContentFile = function(file) {
		return fs.readFileSync(path.resolve(basedir, file));
	};
	
	this.getMimeType = function(type) {
		return mimetypes[type] || "text/plain";
	};
	
	this.getFileExtension = function(file) {
		var matches = file.match(/\.([^\.]+)$/);
		return matches[1];
	}
	
	this.getMimeTypeFile = function(file) {
		return this.getMimeType(this.getFileExtension(file)); 
	};
	
	this.isCachable = function(type) {
		return cachable[type] || false;
	}
	
	this.isCachableFile = function(file) {
		return this.isCachable(this.getFileExtension(file));
	}
	
}

module.exports = AssetResolver;