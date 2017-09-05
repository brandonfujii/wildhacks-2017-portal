import FormData from 'form-data';

import { CONFIG } from 'config';

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
    if (CONFIG.NODE_ENV === 'development') {
        console.error(err);
    }
};

/**
 * Pupper is a wrapper for the isomorphic-fetch function
 */
class Pupper {
    constructor(hostname) {
        this.hostname = hostname || CONFIG.REACT_APP_BACKEND_HOST_NAME;
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    }

    sign(options = {}, token) {
        if (!token) return options;

        const headers = Object.assign(options.headers || {} , {
            'X-Access-Token': `Bearer ${token}`,
        });

        options.headers = headers;
        return options;
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

/**
 * FormDataDoggo is a pupper extension that handles form data payloads
 */
class FormDataDoggo extends Pupper {
    appendFormFields(fields = {}) {
        let form = new FormData();

        for (let key in fields) {
            form.append(key, fields[key]);
        }

        return form;
    }

    request(method, route, options = {}) {
        const path = `${this.hostname}${route}`;

        const opts = {
            method,
            headers: options.headers,
            body: this.appendFormFields(options.body),
        };

        return fetch(path, opts);
    }
}

export const Doggo = new FormDataDoggo();
export default new Pupper();
