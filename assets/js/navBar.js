$(document).ready(function() {
    var main_route = (window.location.pathname.split("/")[1]);
    $('#navbar_' + main_route).addClass('active');

    var mentor_route = (window.location.pathname.split("/")[2]);
    console.log('#mentor_navbar_' + mentor_route);
    $('#mentor_navbar_' + mentor_route).addClass('active');

});
