var imgObj = null;
var animate ;
var number_of_snowballs = 100;
var imageObjects = [];
var snowSpeed = 3;

function init(){
    for (var i = 0; i < number_of_snowballs; i++) {
        imgObj = document.getElementById('snowflake' + i);
        imgObj.style.top = Math.floor((Math.random() * window.innerHeight) + 1) + 'px';
        imgObj.style.left = Math.floor((Math.random() * window.innerWidth) + 1) + 'px';
        imageObjects.push(imgObj);
    }
    console.log("init done!");
    moveSnow();

}

function moveSnow(){
    for (var i = 0; i < number_of_snowballs; i++) {
        var increase = getSpeed(i);
        console.log(increase);
        imageObjects[i].style.top = parseInt(imageObjects[i].style.top) + increase + 'px';
        if (parseInt(imageObjects[i].style.top) > Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) {
            imageObjects[i].style.top = '-20px';
            imageObjects[i].style.left = Math.floor((Math.random() * window.innerWidth) + 1) + 'px';
            if (i < number_of_snowballs / 3) {
                imageObjects[i].style['z-index'] = Math.floor((Math.random() * 6) ) - 2;
            }
        }
    }
    animate = setTimeout(moveSnow,20); // call moveRight in 20msec
}

function getSpeed(i) {
    if (i < number_of_snowballs / 3) {
        return snowSpeed
    } else if (i < number_of_snowballs / 3 * 2) {
        return snowSpeed / 2
    } else {
        return snowSpeed / 3
    }

}

function stop(){
    clearTimeout(animate);
    imgObj.style.top = '-20px';
}

window.onload =init;