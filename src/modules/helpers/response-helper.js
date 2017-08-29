const isOk = response => {
    return response.meta && response.meta.statusCode === 200;
};

export default isOk;
