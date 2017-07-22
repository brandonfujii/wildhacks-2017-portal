
const handleResponse = response => {
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
};

// Make isomorphic fetch class