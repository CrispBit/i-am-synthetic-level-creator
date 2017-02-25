function startEditor(left, right, view, level) {

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

function resizeView(view) {

    view.width = view.clientWidth;
    view.height = view.clientHeight;
    draw();

}
