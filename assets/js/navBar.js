$(document).ready(function() {
    var main_route = (window.location.pathname.split("/")[1]);
    $('#navbar_' + main_route).addClass('active');
});