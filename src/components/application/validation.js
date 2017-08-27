import _ from 'lodash';

const isString = value => {
  return typeof value === 'string';
};

const isNumber = value => {
  return !_.isNaN(parseInt(value, 10));
};

const isHTTPWebsite = value => {
    const re = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/);
    return re.test(value);
};

const colleges = [
];

export default {
    isString,
    isNumber,
    isHTTPWebsite,
    colleges,
}