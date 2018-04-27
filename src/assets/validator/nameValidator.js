const isValidName = (name) => {
  let reg = /^[0-9A-Za-z_]{5,15}$/;
  return reg.test(name);
};

export default isValidName;