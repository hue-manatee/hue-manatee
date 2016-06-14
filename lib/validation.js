/*
  Solid work on a custom validator, I like the the use of strings for errors
  and false for success. You might consider, returning something that you can
  explicitly check for but your method seems solid.
*/
module.exports = exports = (password) => {
  if (password.length < 8) {
    return 'password must be 8 characters long';
  }
  if (password.length > 255) {
    return 'password must less then 255 characters long';
  }
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s$@$!%*#?&]+$/;

  if (!regex.test(password)) {
    return 'password needs uppercase and lowercase letters and at least one number';
  }
  return false;
};
