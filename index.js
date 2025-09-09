jQuery(function() { 
    $('.shadow-div').on('mouseover', function() {
        $(this).removeClass('shadow-sm');
        $(this).addClass('shadow');
    })
    
    $('.shadow-div').on('mouseleave', function() {
        $(this).removeClass('shadow');
        $(this).addClass('shadow-sm');
    })
});
