(function() {
    colors = ['red', 'blue', 'green', 'purple', 'orange'];
    var path = window.document.location.pathname.split('/');
    current_location = path[path.length-1];
    var idx = $('.nav-item[name='+ current_location + ']').index();
    $('.nav-item[name='+ current_location + ']').css('border-top', '5px solid ' + colors[idx]);
})();