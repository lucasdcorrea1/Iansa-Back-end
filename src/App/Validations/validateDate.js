'use strict'
exports.compareDate = function(dateNow, dateCompare) {
    if (dateNow.getTime() > dateCompare.getTime()) {
        return false;
    }
    return true;
};
