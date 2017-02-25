function startEditor(left, right, view, level) {

    initLeft(left, level);

    var ctx = view.getContext("2d");

    window.draw = function () {

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, view.width, view.height);

        ctx.drawImage(level.spritesheet.image,
                      view.width/2 - level.spritesheet.image.width/2,
                      view.height/2 - level.spritesheet.image.height/2);

    };

    window.addEventListener("resize", function() {
        resizeView(view);
    });

    resizeView(view);

}

function initLeft(left, level) {

    for (var y = 0; y < level.spritesheet.rows; y++) {

        for (var x = 0; x < level.spritesheet.columns; x++) {

            var tileDiv = document.createElement("div");
            tileDiv.style.width = level.spritesheet.spriteWidth + "px";
            tileDiv.style.height = level.spritesheet.spriteHeight + "px";
            tileDiv.classList.add("tile");

            tileDiv.style.backgroundImage =
                "url(" + level.spritesheet.image.src + ")";
            tileDiv.style.backgroundPosition =
                -level.spritesheet.spriteWidth * x + "px " +
                -level.spritesheet.spriteHeight * y + "px";

            left.appendChild(tileDiv);

        }
    }
}

function resizeView(view) {

    view.width = view.clientWidth;
    view.height = view.clientHeight;
    draw();

}
