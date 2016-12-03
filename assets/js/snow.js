var imgObj = null;
var animate ;

function init(){
    imgObj = document.getElementById('snowflake');
    imgObj.style.top = '-20px';
    moveRight();
}

function moveRight(){
    imgObj.style.top = parseInt(imgObj.style.top) + 10 + 'px';
    if (parseInt(imgObj.style.top) > Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) {
        imgObj.style.top = '-20px';
    }
    animate = setTimeout(moveRight,20); // call moveRight in 20msec
}

function stop(){
    clearTimeout(animate);
    imgObj.style.top = '-20px';
}

window.onload =init;