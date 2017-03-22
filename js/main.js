URL = URL || webkitURL;

window.addEventListener("load", function() {

    var createnewButton = document.getElementById("createnew"),
        importButton = document.getElementById("import"),
        lvldimContinue = document.getElementById("lvldim-continue"),
        okButton = document.getElementById("ok");
        view = document.getElementById("view");

    var level;

    importButton.addEventListener("click", function() {

        var begindiv = document.getElementById("begin"),
            spritesheetInput = document.getElementById("spritesheet-input"),
            levelfileInput = document.getElementById("levelfile-input"),
            metadataInput = document.getElementById("metadata-input");

        if (spritesheetInput.files.length > 0 &&
            levelfileInput.files.length > 0) {

            if (metadataInput.files.length > 0) {
                Level.fromYamlMetadata(metadataInput.files[0], function(lvl){
                    if (!lvl) {

                        alert("There was an error loading the metadata");

                        level = new Level();
                        loadfilestuff(false);

                    } else {
                        level = lvl;
                        loadfilestuff(true);
                    }
                });
            } else {
                level = new Level();
                loadfilestuff(false);
            }

            function loadfilestuff(metadataExists) {

                var levelfile = levelfileInput.files[0];

                var ready = 0; // will continue when this is 1, when both files have loaded
                function next(thing, success) {

                    if (!success) {
                        alert("There was an error loading the " + thing);
                        return;
                    } else if (!(ready >= 1)) {
                        ready++;
                        return;
                    }

                    if (metadataExists) {

                        var left = document.getElementById("left"),
                            right = document.getElementById("right"),
                            editor = document.getElementById("editor"),
                            view = document.getElementById("view");

                        begindiv.style.display = "none";
                        editor.style.display = "flex";

                        startEditor(left, right, view, level);

                    } else {

                        var spritesheetConfig = document.getElementById("spritesheet-config");

                        begindiv.style.display = "none";
                        spritesheetConfig.style.display = "inline-block";

                    }
                }

                // load level file
                if (levelfile.name.match(/\.csv$/))
                    level.loadDataFromCSV(levelfile, next.bind(null, "levelfile"));
                else
                    level.loadDataFromDAT(levelfile, next.bind(null, "levelfile"));

                // load spritesheet
                var spritesheetURL = URL.createObjectURL(spritesheetInput.files[0]);
                var spritesheetImage = new Image();
                spritesheetImage.src = spritesheetURL;
                level.spritesheet.image = spritesheetImage;
                spritesheetImage.onload = next.bind(null, "spritesheet", true);
                spritesheetImage.onerror = next.bind(null, "spritesheet", false);

            }
        } else begindiv.classList.add("missing-field");
    });

    createnewButton.addEventListener("click", function() {

        var spritesheetInput = document.getElementById("spritesheet-input"),
            nameInput = document.getElementById("name-input"),
            lvldim = document.getElementById("lvldim"),
            begindiv = document.getElementById("begin");

        if (spritesheetInput.files.length > 0) {

            begindiv.style.display = "none";
            lvldim.style.display = "inline-block";

            level = new Level(nameInput.value || "Unnamed");

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
            spriteHeight = document.getElementById("height").value,
            editor = document.getElementById("editor");

        if (spriteWidth && spriteHeight && rows && columns) {

            spritesheetConfig.style.display = "none";
            editor.style.display = "flex";

            level.spritesheet.spriteWidth = spriteWidth;
            level.spritesheet.spriteHeight = spriteHeight;
            level.spritesheet.rows = rows;
            level.spritesheet.columns = columns;

            startEditor(left, right, view, level);

        } else spritesheetConfig.classList.add("missing-field");
    });
});
