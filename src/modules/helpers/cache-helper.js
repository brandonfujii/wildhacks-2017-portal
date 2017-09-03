class CacheHelper {
    static set(key, value) {
        if (typeof value === 'object') {
            value =  JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    static get(key) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch(err) {
            return value;
        }
    }
}

export default CacheHelper;
