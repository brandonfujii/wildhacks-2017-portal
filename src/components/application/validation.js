import isNaN from 'lodash/isNaN';

const isString = value => {
  return typeof value === 'string';
};

const isNumber = value => {
  return !isNaN(parseInt(value, 10));
};

const isWebsite = value => {
    const re = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);
    return re.test(value);
};

export default {
    isString,
    isNumber,
    isWebsite,
};
