function addCss(fileName) {

    let head = document.head;
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function div(val, by){
    return (val - val % by) / by;
}

function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}