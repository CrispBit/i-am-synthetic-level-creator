function startEditor(left, right, view, level) {

    var viewOffset = {x: 0, y: 0};
    var viewScale = 1;

    initLeft(left, level);

    var ctx = view.getContext("2d");

    window.draw = function() {

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, view.width, view.height);

        var r1 = level.width * level.spritesheet.spriteWidth / view.width;
        var r2 = level.height * level.spritesheet.spriteHeight / view.height;
        if (r1 > r2) viewScale = 1/r1;
        else viewscale = 1/r2;

        for (var y = 0; y < level.height; y++) {

            for (var x = 0; x < level.width; x++) {

                var i;
                if ((i = level.data[x + level.width * y]) > 0) {

                    i--;

                    var sx = i % level.spritesheet.columns *
                            level.spritesheet.spriteWidth;
                    var sy = Math.floor(i / level.spritesheet.columns) *
                            level.spritesheet.spriteHeight;
                    var dx = (x - level.width / 2) *
                        level.spritesheet.spriteWidth *
                        viewScale + viewOffset.x + view.width / 2;
                    var dy = (y - level.height / 2) *
                        level.spritesheet.spriteHeight *
                        viewScale + viewOffset.y + view.height / 2;


                    ctx.drawImage(level.spritesheet.image, sx, sy,
                        level.spritesheet.spriteWidth,
                        level.spritesheet.spriteHeight, dx, dy,
                        level.spritesheet.spriteWidth * viewScale,
                        level.spritesheet.spriteHeight * viewScale);

                }
            }
        }
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
