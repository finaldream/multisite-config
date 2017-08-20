
module.exports.api = {
    apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
    client: {
        timeout: 6000,
        retry: true,
        defaultRequestHeader: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
};
