/*
 * spritesheet: Spritesheet
 * width: Integer
 * height: Integer
 * data: Uint8Array
 * bg: Image
 */

function Level(spritesheet, width, height, data, bg) {

    this.spritesheet = spritesheet;
    this.width = width;
    this.height = height;
    this.data = data;
    this.bg = bg;

}

Level.fromDAT = function(levelfile, callback) {
    var fr = new FileReader();

    fr.onerror = function() {

        console.log(fr.error);
        callback(null);

    };

    fr.onload = function() {

        var level = new Level();

        var size = new Uint16Array(fr.result, 0, 2);

        level.width = size[0];
        level.height = size[1];

        level.data = new Uint8Array(fr.result, 4);

        callback(level);

    };

    fr.readAsArrayBuffer(levelfile);
}
