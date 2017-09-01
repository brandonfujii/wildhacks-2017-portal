const isOk = response => {
    if (!response) {
        return false;
    }

    if (response.meta) {
        if (response.meta.statusCode === 200) {
            return true;
        }
    } 

    return false;
};

export default isOk;
