var crypto = require("crypto");
var Resource = require("./resource");

function ResourceList(items) {
	
	this.getHash = function() {
		var hash = crypto.createHash("sha1");
		hash.update(this.getSource());
		return hash.digest("hex");
	};
	
	this.getSource = function() {
		var content = "";
		items.forEach(function(val) {
			content += new Resource(val).getSource();
		});
		return content;	
	};
	
	this.getSourceFiles = function() {
		var r = [];
		items.forEach(function(val) {
			r = r.concat(new Resource(val).getSourceFiles());
		});
		return r;
	};	
	
}

module.exports = ResourceList;
