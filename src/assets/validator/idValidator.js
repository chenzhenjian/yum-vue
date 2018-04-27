let Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
let ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

let isTrueValidateCodeBy18IdCard = (a_idCard) => {
    let sum = 0,
        arr = a_idCard.split('');
    if (arr[17].toLowerCase() === 'x') {
        arr[17] = 10;
    }
    for (let i = 0; i < 17; i++) {
        sum += Wi[i] * arr[i];
    }
    let valCodePosition = sum % 11;
    return arr[17] === ValideCode[valCodePosition];
};
let isValidityBrithBy18IdCard = (idCard18) => {
    let year = idCard18.substring(6, 10);
    let month = idCard18.substring(10, 12);
    let day = idCard18.substring(12, 14);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    return !(temp_date.getFullYear() !== parseFloat(year)
        || temp_date.getMonth() !== parseFloat(month) - 1
        || temp_date.getDate() !== parseFloat(day));
};
let isValidityBrithBy15IdCard = (idCard15) => {

    let year = idCard15.substring(6, 8);
    let month = idCard15.substring(8, 10);
    let day = idCard15.substring(10, 12);
    let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

    return !(temp_date.getYear() !== parseFloat(year)
        || temp_date.getMonth() !== parseFloat(month) - 1
        || temp_date.getDate() !== parseFloat(day));
};

const isValidId = (id) => {
    let length = id.length;
    if (length === 15) {
        return isValidityBrithBy15IdCard(id)
    } else if (length === 18) {
        return isTrueValidateCodeBy18IdCard(id) && isValidityBrithBy18IdCard(id)
    } else {
        return false
    }
};

export default isValidId;