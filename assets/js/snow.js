var imgObj = null;
var animate ;
var number_of_snowballs = 30;
var imageObjects = [];

function init(){
    for (var i = 0; i < number_of_snowballs; i++) {
        imgObj = document.getElementById('snowflake' + i);
        imgObj.style.top = Math.floor((Math.random() * window.innerHeight) + 1) + 'px';
        imgObj.style.left = Math.floor((Math.random() * window.innerWidth) + 1) + 'px';
        imageObjects.push(imgObj);
    }
    moveSnow();

}

function moveSnow(){
    for (var i = 0; i < number_of_snowballs; i++) {
        imageObjects[i].style.top = parseInt(imageObjects[i].style.top) + 4 + 'px';
        if (parseInt(imageObjects[i].style.top) > Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) {
            imageObjects[i].style.top = '-20px';
            imageObjects[i].style.left = Math.floor((Math.random() * window.innerWidth) + 1) + 'px';
        }
    }
    animate = setTimeout(moveSnow,20); // call moveRight in 20msec
}

function stop(){
    clearTimeout(animate);
    imgObj.style.top = '-20px';
}

window.onload =init;