/**
 * Javascript port of the PHP-Class MPOExtracor originally by Mihai Scurtu
 * https://www.phpclasses.org/package/6030-PHP-Extract-images-from-Fuji-MPO-files.html
 * 
 * @author Pascal Pohl <pakl@paklweb.de>
 * @version 1.0
 */

var MPOExtracor = function(file, callback) {
	var fr = new FileReader()

	this.file = ""
	this.numImgs = 0
	this.imgStart = []
	this.imgEnd = []

	this.imgs = [];

	self = this

	fr.onloadend = function(evt) {
		if(evt.target.readyState == FileReader.DONE) {
			self.file = evt.target.result
			self.parseFile()
			self.extractImgs()
			if(typeof(callback) == "function") {
				callback(self);
			}
		}
	}

	fr.readAsBinaryString(file)
}

MPOExtracor.prototype.parseFile = function() {
	var byte = 0
	var level = 0
	var cursor = 0
	while(cursor < this.file.length) {
		if(level < 0) {
			console.log("File is corrupt");
		}

		byte = this.file.substr(cursor, 1).charCodeAt(0);
		cursor++;

		if(byte == 0xFF) { //found a JPEG marker
			//read a byte from the file
			byte = this.file.substr(cursor, 1).charCodeAt(0);
			cursor++;

			if(byte == 0xD8) { //found a SOI marker (Start Of Image)
				if(level == 0) { //no image-in-image situation
					//mark new image start
					this.imgStart[this.numImgs] = cursor - 2;
				}
				level++;
			}

			if(byte == 0xD9) { //found a EOI marker (End Of Image)
				level--;
				if(level == 0) { //no image-in-image situation
					//mark new image end
					this.imgEnd[this.numImgs] = cursor - 2;

					//move to finding a new image
					this.numImgs++;
				}
			}
		}
	}

	if(level != 0) {
		console.log("File is corrupt");
	}

	if(this.numImgs < 1) {
		console.log('Invalid file; no images found.');
	}
	console.log(this.numImgs + " images found");
}

MPOExtracor.prototype.extractImgs = function() {
	for(var i = 0; i < this.numImgs; i++) {

		//extract the image
		this.imgs[i] = this.file.substring(this.imgStart[i], this.imgEnd[i]);

		if(this.imgs[i].length <= 0) {
			console.log("Cannot extract image " + i + ".");
		}
	}
}