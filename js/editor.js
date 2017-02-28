function startEditor(left, right, view, level) {

    var viewOffset = {x: 0, y: 0};
    var viewScale = 1;

    initLeft(left, level);

    var ctx = view.getContext("2d");

    window.draw = function() {

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, view.width, view.height);

        ctx.strokeStyle = "#555";
        ctx.setLineDash([10, 3]);
        ctx.lineWidth = 2;
        ctx.strokeRect(-(level.width * level.spritesheet.spriteWidth) / 2 *
                       viewScale + viewOffset.x + view.width / 2 - 1,
                       -(level.height * level.spritesheet.spriteHeight) / 2 *
                       viewScale + viewOffset.y + view.height / 2 - 1,
                       level.width * level.spritesheet.spriteWidth * viewScale + 2,
                       level.height * level.spritesheet.spriteHeight * viewScale + 2);

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


                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;

                    ctx.drawImage(level.spritesheet.image, sx, sy,
                        level.spritesheet.spriteWidth,
                        level.spritesheet.spriteHeight, dx, dy,
                        level.spritesheet.spriteWidth * viewScale,
                        level.spritesheet.spriteHeight * viewScale);

                }
            }
        }

        var requestAnimationFrame = (window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(f){setTimeout(f,10);});

        requestAnimationFrame(draw);

    };

    window.addEventListener("resize", function() {
        resizeView(view);
    });

    view.addEventListener("wheel", function(e) {

        e.preventDefault();

        var scrollAmountY, scrollAmountX;
        switch (e.deltaMode) {

            case 0: // pixels
                scrollAmountY = e.deltaY;
                scrollAmountX = e.deltaX;
                break;

            case 1: // lines
                scrollAmountY = e.deltaY * 18;
                scrollAmountX = e.deltaX * 18;
                break;

            case 2: // pages (untested)
                scrollAmountY = e.deltaY * 40;
                scrollAmountX = e.deltaX * 18;
                break;
        }

        var rect = view.getBoundingClientRect();
        if (e.altKey || e.ctrlKey) {


            var scale = Math.pow(1.001, -scrollAmountY);

            var mousex = (e.clientX - rect.left - view.width/2 - viewOffset.x);
            var mousey = (e.clientY - rect.top - view.height/2 - viewOffset.y);

            viewOffset.x += -mousex * scale + mousex;
            viewOffset.y += -mousey * scale + mousey;

            viewScale *= scale;

        } else if (e.shiftKey) viewOffset.x += -scrollAmountY / 7;
        else {

            viewOffset.y += -scrollAmountY / 7;
            viewOffset.x += -scrollAmountX / 7;

        }
    });

    resizeView(view);

    var r1 = level.width * level.spritesheet.spriteWidth / view.width;
    var r2 = level.height * level.spritesheet.spriteHeight / view.height;
    if (r1 > r2) viewScale = 1/r1;
    else viewscale = 1/r2;

    draw();

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

}
