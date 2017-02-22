window.addEventListener("load", function() {

    var createnew = document.getElementById("createnew");
    var begindiv = document.getElementById("begin");
    var editor = document.getElementById("editor");
    var view = document.getElementById("view");
    var spritesheetInput = document.getElementById("spritesheet-input");
    var noSpriteText = document.getElementById("add-spritesheet-text");

    createnew.addEventListener("click", function() {

        if (spritesheetInput.files.length > 0) {

            begindiv.style.display = "none";
            editor.style.display = "flex";
            view.width = view.clientWidth;
            view.height = view.clientHeight;
            var ctx = view.getContext("2d");

        } else {
            noSpriteText.hidden = false;
        }
    });
});
