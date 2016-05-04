module.exports = exports = (password) => {
  if (password.length < 8) {
    return 'password must be 8 characters long';
  }
  if (password.length > 255) {
    return 'password must less then 255 characters long';
  }
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*#?&]+$/;

  if (!regex.test(password)) {
    return 'password needs uppercase and lowercase letters and at least one number';
  }
  return false;
};
