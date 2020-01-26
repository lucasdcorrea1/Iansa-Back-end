'use strict'
exports.compareDate = function (dateNow, dateCompare) {
    if (dateNow.getYear() > dateCompare.getYear())
        return false;

    if(dateNow.getMonth() == dateCompare.getMonth()){
        if(dateNow.getDate() > dateCompare.getDate() +1)
            return false;
            
        return true;
    }else if(dateNow.getMonth() > dateCompare.getMonth()){
        return false;
    }
    
    return true;
};
