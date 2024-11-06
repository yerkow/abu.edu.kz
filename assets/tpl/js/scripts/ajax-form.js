$(document).ready(function () {
    function ajaxSuccess(response, status, xhr, form) {
        if (response) {
            switch (response.status) {
                case 'extention':
                    console.log(response);
                    alert('Ошибка! Данный тип файлов пересылать нельзя');
                    break;
                case 'error':
                    console.log(response);
                    $().toastmessage('showErrorToast', 'Ошибка! Повторите позже');
                    break;
                case 'success':
                    console.log(response);
                    $("form").clearForm();
                    $().toastmessage('showSuccessToast', 'Ваше сообщение отправлено');
                    switch (response.action) {
                        case 'order':
                            $.magnificPopup.close();
                            break;
                        case 'job':
                            $.magnificPopup.close();
                            break;
                    }
                    break;
            }
        }
    }

    function beforeAjaxSubmit(data, form, options) {
        var allSender = true,
            sender = true,
            item,
            re = /^[\.\-_A-Za-z0-9]+?@[\.\-A-Za-z0-9]+?\.[A-Za-z0-9]{2,6}$/;
        form.find('.error-field').removeClass('error-field');
        form.find('input:required, textarea:required ').each(function (i) {
            item = $(this);
            if (item.length > 0) {
                if ($(this).is('required') && !$(this).is('a')) {
                    sender = $(this).val() != "";
                }
                switch ($(this).attr('type')) {
                    case 'checkbox':
                        sender = $(this).prop('checked') == true;
                        break;
                    default:
                        sender = $(this).val() != "";
                        break;
                }
                if (!sender) {
                    allSender = false;
                    item.addClass('error-field');
                    $().toastmessage('showErrorToast', 'Заполните поле ' + item.attr("placeholder").replace('*', '') + '');
                }
            }
        });
        form.find('input[type="email"]').each(function (i) {
            item = $(this);
            if ($(this).val()) {
                if (!re.test($(this).val())) {
                    allSender = false;
                    item.addClass('error-field');
                    $().toastmessage('showErrorToast', 'Заполните корректно e-mail');
                }
            }
        });
        console.log(allSender);
        return allSender;
    }

    var ajaxOptions = {
        beforeSubmit: beforeAjaxSubmit,
        success: ajaxSuccess,
        url: '/ajax-form',
        type: 'post',
        dataType: 'json'
    };
    $(".js-form-submit").click(function () {
        $(this).parents('form').ajaxSubmit(ajaxOptions);
    });
});