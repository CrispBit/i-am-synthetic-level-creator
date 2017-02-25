window.addEventListener("load", function() {

    var continueButton = document.getElementById("continue"),
        importButton = document.getElementById("import"),
        okButton = document.getElementById("ok");
        editor = document.getElementById("editor"),
        view = document.getElementById("view");

    continueButton.addEventListener("click", function() {

        var spritesheetInput = document.getElementById("spritesheet-input");
        var spritesheetConfig = document.getElementById("spritesheet-config");
        var begindiv = document.getElementById("begin");

        if (spritesheetInput.files.length > 0) {

            begindiv.style.display = "none";
            spritesheetConfig.style.display = "inline-block";

        } else begindiv.classList.add("missing-field");
    });

    okButton.addEventListener("click", function() {
        
        var spritesheetConfig = document.getElementById("spritesheet-config"),
            left = document.getElementById("left"),
            right = document.getElementById("right"),
            view = document.getElementById("view"),
            spritesheet = {
                rows: document.getElementById("rows").value,
                columns: document.getElementById("columns").value,
                spriteWidth: document.getElementById("width").value,
                spriteHeight: document.getElementById("height").value
            };

        if (spritesheet.rows && spritesheet.columns &&
            spritesheet.spriteWidth && spritesheet.spriteHeight) {

            spritesheetConfig.style.display = "none";

            editor.style.display = "flex";
            startEditor(left, right, view);

        } else spritesheetConfig.classList.add("missing-field");
    });
});
