
/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./project/src', '.html') ==> ['./project/src/a.html','./project/src/build/index.html']
 * @param  {String} startPath    Path relative to this file or other file which requires this files
 * @param  {String} filter       Extension name, e.g: '.html'
 * @return {Array}               Result files with path string in an array
 */
var methods = {};
var methods = {
	findFilesInDir: function findFilesInDir(startPath,filter){
 
var path = require('path'), 
    fs   = require('fs');

    var results = [];

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        console.log('-- file name: ',startPath);
		if (startPath.indexOf("mediacenter") == -1) {
			var filename=path.join(startPath,files[i]);
			var stat = fs.lstatSync(filename);
			var filenameUpper = filename.toUpperCase();
			var filterUpper = filter.toUpperCase();
			if (stat.isDirectory()){
				results = results.concat(findFilesInDir(filename,filter)); //recurse
			}
			else if (filenameUpper.indexOf(filterUpper)>=0) {
				console.log('-- found: ',filename);
				results.push(filename);
			}
		}
    }
    return results;
},
findFilesInSpecificDirectory: function findFilesInSpecificDirectory(startPath){
 
var path = require('path'), 
    fs   = require('fs');

    var results = [];

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            results = results.concat(findFilesInSpecificDirectory(filename)); //recurse			
        }
        else  {
            results.push(filename);			
        }
    }
    return results;
}
};

exports.data = methods;
//module.exports = findFilesInDir('G:/Films', '.avi');
//module.exports = findFilesInDir('G:/Films', 'Star.Wars');
//module.exports = findFilesInDir('./project/src', '.html');
