class ValidateDate {
  static async compareDate(dateNow, dateCompare) {
    if (dateNow.getYear() > dateCompare.getYear()) return false;

    if (dateNow.getMonth() === dateCompare.getMonth()) {
      if (dateNow.getDate() > dateCompare.getDate() + 1) return false;

      return true;
    }
    if (dateNow.getMonth() > dateCompare.getMonth()) {
      return false;
    }

    return true;
  }
}

export default ValidateDate;
