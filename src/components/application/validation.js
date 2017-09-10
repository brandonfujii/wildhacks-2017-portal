const isString = value => {
  return typeof value === 'string';
};

const isNumber = value => {
    const re = new RegExp(/^(\d)*$/);
    return re.test(value);
};

const isWebsite = value => {
    const re = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/);
    return re.test(value) || !value;
};

export default {
    isString,
    isNumber,
    isWebsite,
};
