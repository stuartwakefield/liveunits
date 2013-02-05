var fs = require("fs");

function Resource(item) {
	
	this.getSource = function() {
		var content = "";
		this.getSourceFiles().forEach(function(val) {
			content += fs.readFileSync(val);
		});
		return content;	
	};
	
	this.getSourceFiles = function() {
		var stat = fs.statSync(item), 
		    r = [];
		if(stat.isDirectory() && item.search(/^\./) == -1) {
			var items = fs.readdirSync(item);
			items.forEach(function(val) {
				r = r.concat(new Resource(item + "/" + val).getSourceFiles());
			})
		} else if(stat.isFile() && item.search(/\.js$/) != -1) {
			r.push(item);
		}
		return r;
	};
	
}

module.exports = Resource;