const current_version = "1.0.0";

$(function(){

    $.get("https://raw.githubusercontent.com/JonyDF/ProJet-app/new-version-checker/release_compiler/version.txt", (data) => {
        if (data != current_version) {
           $('.body_black_transparent_overlay').fadeIn('fast');    
           $('.update-alert').addClass('update-alert-active');
        } else {
            $('.body_black_transparent_overlay').fadeOut('fast');    
           $('.update-alert').removeClass('update-alert-active');
        }
    });

    $(document).on('click', '.update-alert-close-btn', function() {
        $('.body_black_transparent_overlay').fadeOut('fast');
        $('.update-alert').removeClass('update-alert-active');
    });

    if (localStorage.getItem('first-open') == null || localStorage.getItem('first-open') == 0) {
        $('#single-page-first-open').show();
    }

    $(document).on('click', '#start', function() {
        $('#single-page-first-open').fadeOut('fast');
        localStorage.setItem('first-open', 1);
    });

    // Capitalize the author input
    function textCapitalize(str) {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);       
        }
        return splitStr.join(' ');
    }

    // execute the function
    $(document).on('input', '#project-author', function () {
        $(this).val(textCapitalize($(this).val()));
    });
    
    // check the input of the project name.
    $(document).on('input', '#project-name', function() {
        // replace spaces with underscore
        $(this).val($(this).val().replace(' ', '_'));

        if(!$(this).val().match(/^\w+$/)) {
            if ($(this).val().length >= 1) {
                // error
                $('.message-error-project-name').stop().slideDown('fast');
            } else {
                // success
                $('.message-error-project-name').stop().slideUp('fast');
            }
            $('#next').addClass('next-disabled');
            $('#project-author').parents('.tmp-class-hidden').stop().slideUp('fast');
        } else {
            // success
            $('#next').removeClass('next-disabled');
            $('.message-error-project-name').stop().slideUp('fast');
            $('#project-author').parents('.tmp-class-hidden').stop().slideDown('fast');
        }

    });

    // #next - when the user can see the options panel
    $(document).on('click', '#next', function() {
        if(!$(this).hasClass('next-disabled')) {
            $('.main-section-options').addClass('main-section-options-active');
            $('.body_black_transparent_overlay').fadeIn('fast');
        }
    }).on('click', '.btn-close-main-section-options', function() {
            $('.main-section-options').removeClass('main-section-options-active');
            $('.body_black_transparent_overlay').fadeOut('fast');
    }).on('keyup', function(e) {
        if(e.keyCode == 27 && $('.main-section-options').hasClass('main-section-options-active')) {
            $('.main-section-options').removeClass('main-section-options-active');
            $('.body_black_transparent_overlay').fadeOut('fast');
        }
    });

    // automatic check
    $(document).on('change', '.option-list-container input[type="checkbox"]', function() {
        if($('#box-3').is(':checked')) {
            $('#box-8').prop('checked', true);
        }
    });

    // information toggle
    $(document).on('click', '.information-btn', function() {
        $('.body_black_transparent_overlay').fadeIn('fast');
        $('.information').show();
    }).on('click', '.information-close', function() {
        $('.body_black_transparent_overlay').fadeOut('fast');
        $('.information').hide();
    }).on('keyup', function(e) {
        if(e.keyCode == 27 && $('.information').css('display') != 'none') {
            $('.body_black_transparent_overlay').fadeOut('fast');
            $('.information').hide();
        }
    });
    
    // ccreate new project 
    $(document).on('click', '.create-new-project', function() {
        $('#single-page-success, #single-page-error').hide();
        $('.main-section-options').removeClass('main-section-options-active');
        $('.body_black_transparent_overlay').fadeOut('fast');
    });

});