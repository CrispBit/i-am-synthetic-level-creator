window.onload = function() {

    var createnew = document.getElementById("createnew");
    var begindiv = document.getElementById("begin");
    var editor = document.getElementById("editor");

    createnew.onclick = function() {
        begindiv.style.display = "none";
        editor.style.display = "flex";
    };

};
