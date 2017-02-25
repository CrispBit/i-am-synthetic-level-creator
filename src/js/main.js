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
            spritesheetConfig.style.display = "";

        } else begindiv.classList.add("missing-field");
    });

    okButton.addEventListener("click", function() {
        
        var spritesheetConfig = document.getElementById("spritesheet-config"),
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
            view.width = view.clientWidth;
            view.height = view.clientHeight;
            var ctx = view.getContext("2d");

        } else spritesheetConfig.classList.add("missing-field");
    });
});
