var imgObj = null;
var animate ;
var number_of_snowballs = 100;
var imageObjects = [];
var snowSpeed = 3;
var wind = 1;
var increase;
var shuffle;

var snow_creation_padding;
var snow_creation_width;
var snow_creation_location;

function init(){
    for (var i = 0; i < number_of_snowballs; i++) {
        imgObj = document.getElementById('snowflake' + i);
        if (typeof imgObj !== "undefined" && imgObj !== null) {
            imgObj.style.top = Math.floor((Math.random() * window.innerHeight) + 1) + 'px';
            imgObj.style.left = Math.floor((Math.random() * window.innerWidth) + 1) + 'px';
            imageObjects.push(imgObj);
        } else {
            return;
        }
    }
    moveSnow();

}

function moveSnow(){
    for (var i = 0; i < number_of_snowballs; i++) {
        increase = getSpeed(i);
        imageObjects[i].style.top = parseInt(imageObjects[i].style.top) + increase + 'px';
        shuffle = Math.floor(Math.random() * 2) -2;
        imageObjects[i].style.left = parseInt(imageObjects[i].style.left) + wind + shuffle + 'px';
        if (parseInt(imageObjects[i].style.top) > Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) {
            imageObjects[i].style.top = '-20px';
            imageObjects[i].style.left =  getSnowCreationLocation() + 'px';
            if (i < number_of_snowballs / 3) {
                imageObjects[i].style['z-index'] = Math.floor((Math.random() * 6) ) - 2;
            }
        }
    }

    animate = setTimeout(moveSnow,40); // call moveRight in 20msec
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

function getSnowCreationLocation() {
    snow_creation_padding = (window.innerHeight / snowSpeed) * Math.abs(wind);
    snow_creation_width = window.innerWidth + snow_creation_padding;
    if (wind < 0) {
        snow_creation_location = Math.floor((Math.random() * (   snow_creation_width   )) + 1) - snow_creation_padding;
    } else {
        snow_creation_location = Math.floor((Math.random() * (   snow_creation_width   )) + 1);
    }
    return snow_creation_location;
}

function stop(){
    clearTimeout(animate);
    imgObj.style.top = '-20px';
}

window.onload =init;