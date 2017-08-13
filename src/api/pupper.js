const appendQueryParams = (path, queryParams) => {
    const e = encodeURIComponent;
    const paramStr = Object.keys(queryParams)
        .map(key => `${e(key)}=${e(queryParams[key])}`)
        .join('&');

    const joinedBy = path.indexOf('?') > -1 ? '&' : '?';

    return `${path}${joinedBy}${paramStr}`;
};

const getUrl = (path, queryParams) => {
    return queryParams ? appendQueryParams(path, queryParams) : path;
};

const handleResponse = response => {
    if (!response.ok) {
        return response.json().then(err => err);
    }

    return response.json();
};

const handleError = err => {
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }
};

/**
 * Pupper is a wrapper for the isomorphic-fetch function
 */
class Pupper {
    constructor(hostname) {
        this.hostname = hostname ? hostname : process.env.REACT_APP_BACKEND_HOST_NAME;
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    request(method, route, options = {}) {
        const path = `${this.hostname}${route}`;
        const headers = {
            ...this.defaultHeaders,
            ...options.headers,
        };

        const opts = Object.assign(options, {
            method,
            headers: new Headers(headers),
            body: method !== 'GET' ? JSON.stringify(options.body) : null,
        });

        return fetch(getUrl(path, opts.queryParams), opts);
    }

    get(route, options = {}) {
        return this.request('GET', route, options).then(handleResponse).catch(handleError);
    }

    post(route, options = {}) {
        return this.request('POST', route, options).then(handleResponse).catch(handleError);
    }

    put(route, options = {}) {
        return this.request('PUT', route, options).then(handleResponse).catch(handleError);
    }

    delete(route, options = {}) {
        return this.request('DELETE', route, options).then(handleResponse).catch(handleError);
    }
}

export default new Pupper();
