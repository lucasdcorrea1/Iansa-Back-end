class ValidateEmail {
  static checkEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      return false;
    }
    return false;
  }
}

export default ValidateEmail;
