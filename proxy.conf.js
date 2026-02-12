module.exports = [
    {
        context: ['/api/auth'],
        target: 'https://127.0.0.1:44303',
        secure: false,
        changeOrigin: false,
        headers: {
            "Host": "localhost:44303"
        },
        logLevel: 'debug'
    },
    {
        context: ['/api'],
        target: 'http://127.0.0.1:46497',
        secure: false,
        changeOrigin: true, // For the main API, 127.0.0.1 seems fine or we assume it accepts it
        logLevel: 'debug'
    }
];
