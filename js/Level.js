/*
 * name: String
 * spritesheet: Spritesheet
 * width: Integer
 * height: Integer
 * data: Uint8Array
 * bg: Image
 * levelfile: String (filename)
 */

function Level(name, spritesheet, width, height, data, bg, levelfile) {

    //TODO events

    name = typeof name !== "undefined" ? name : "Unnamed";
    spritesheet = typeof spritesheet !== "undefined" ? spritesheet : new Spritesheet();

    this.name = name || "Unnamed";
    this.spritesheet = spritesheet;
    this.width = width;
    this.height = height;
    this.data = data;
    this.bg = bg;
    this.levelfile = levelfile;

}

Level.prototype.loadDataFromDAT = function(levelfile, finishCallback) {

    var level = this;
    var fr = new FileReader();

    fr.onerror = function() {

        console.log(fr.error);
        finishCallback(false);

    };

    fr.onload = function() {

        var size = new Uint16Array(fr.result, 0, 2);

        level.width = size[0];
        level.height = size[1];

        level.data = new Uint8Array(fr.result, 4);

        finishCallback(true);

    };

    fr.readAsArrayBuffer(levelfile);
};

Level.prototype.loadDataFromCSV = function(levelfile, finishCallback) {

    var level = this;
    var fr = new FileReader();

    fr.onerror = function() {
        console.log(fr.error);
        finishCallback(false);
    };

    fr.onload = function() {

        var a = fr.result.split("\n").filter(v => v);
        level.height = a.length;

        a = a.join(",").split(",").map(v => +v + 1);
        level.width = a.length / level.height;

        level.data = new Uint8Array(a);

        finishCallback(true);

    };

    fr.readAsText(levelfile);
};

Level.fromYamlMetadata = function(metadatafile, finishCallback) {

    var fr = new FileReader();

    fr.onerror = function() {
        console.log(fr.error);
        finishCallback(null);
    };

    fr.onload = function() {
        finishCallback(parseMetadata(fr.result));
    };

    fr.readAsText(metadatafile);
};
