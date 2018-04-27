const isValidPhone = (phoneNumber) => {
  let reg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
  return reg.test(phoneNumber);
};

export default isValidPhone;