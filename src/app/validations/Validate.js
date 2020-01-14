'use strict';

exports.validateEmailAddress = async (data) => {
    var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
};

function validateCnpj(cnpj) {

    if (cnpj == '') return false;

    if (cnpj.length != 18)
        return false;

    cnpj = cnpj.replace(/[^\d]+/g, '');
    
    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;
 
    var size = cnpj.length - 2
    var numbers = cnpj.substring(0, size);
    var digits = cnpj.substring(size);
    var sum = 0;
    var post = size - 7;
    for (var i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * post--;
        if (post < 2)
        post = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) return false;
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    post = size - 7;
    for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * post--;
        if (post < 2)
        post = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1))
        return false;

    return true;

};