
module.exports.api = {
    apiEndpoint: 'https://127.0.0.1:3000/posts',
    client: {
        timeout: 500,
        retry: false,
        defaultRequestHeader: {
            cache: false,
        },
    },
};
