URL = URL || webkitURL;

window.addEventListener("load", function() {

    var createnewButton = document.getElementById("createnew"),
        importButton = document.getElementById("import"),
        lvldimContinue = document.getElementById("lvldim-continue"),
        okButton = document.getElementById("ok");
        editor = document.getElementById("editor"),
        view = document.getElementById("view");

    var level = new Level();

    importButton.addEventListener("click", function() {

        var begindiv = document.getElementById("begin"),
            spritesheetInput = document.getElementById("spritesheet-input"),
            levelfileInput = document.getElementById("levelfile-input"),
            metadataInput = document.getElementById("metadata-input");

        if (spritesheetInput.files.length > 0 &&
            levelfileInput.files.length > 0) {

            var levelfile = levelfileInput.files[0];

            function next(success) {

                console.log(level, success);
                var spritesheetConfig = document.getElementById("spritesheet-config");

                if (!success) {
                    alert("There was an error loading the levelfile");
                    return;
                }

                begindiv.style.display = "none";
                spritesheetConfig.style.display = "inline-block";

            }

            if (levelfile.name.match(/\.csv$/)) level.loadDataFromCSV(levelfile, next);
            else level.loadDataFromDAT(levelfile, next);
        } else begindiv.classList.add("missing-field");
    });

    createnewButton.addEventListener("click", function() {

        var spritesheetInput = document.getElementById("spritesheet-input"),
            lvldim = document.getElementById("lvldim"),
            begindiv = document.getElementById("begin");

        if (spritesheetInput.files.length > 0) {

            begindiv.style.display = "none";
            lvldim.style.display = "inline-block";

            level = new Level();

        } else begindiv.classList.add("missing-field");
    });

    lvldimContinue.addEventListener("click", function() {

        var lvldim = document.getElementById("lvldim"),
            spritesheetConfig = document.getElementById("spritesheet-config"),
            lvlwidth = document.getElementById("lvlwidth").value,
            lvlheight = document.getElementById("lvlheight").value;

        if (lvlwidth && lvlheight) {

            level.width = +lvlwidth;
            level.height = +lvlheight;
            level.data = new Uint8Array(lvlwidth * lvlheight);

            lvldim.style.display = "none";
            spritesheetConfig.style.display = "inline-block";

        } else lvldim.classList.add("missing-field");
    });

    okButton.addEventListener("click", function() {

        var spritesheetConfig = document.getElementById("spritesheet-config"),
            spritesheetInput = document.getElementById("spritesheet-input"),
            left = document.getElementById("left"),
            right = document.getElementById("right"),
            view = document.getElementById("view"),
            rows = document.getElementById("rows").value,
            columns = document.getElementById("columns").value,
            spriteWidth = document.getElementById("width").value,
            spriteHeight = document.getElementById("height").value;

        if (spriteWidth && spriteHeight && rows && columns) {

            spritesheetConfig.style.display = "none";

            editor.style.display = "flex";

            var spritesheetURL = URL.createObjectURL(spritesheetInput.files[0]);
            var spritesheetImage = new Image();
            spritesheetImage.src = spritesheetURL;

            spritesheetImage.onload = function() {
                var spritesheet = new Spritesheet(spritesheetImage, rows,
                                                  columns, spriteWidth,
                                                  spriteHeight);
                level.spritesheet = spritesheet;
                startEditor(left, right, view, level);
            }

        } else spritesheetConfig.classList.add("missing-field");
    });
});
