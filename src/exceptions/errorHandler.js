export const handleError = (error, res) => {
    console.error(error.message);
    // Error handling
    if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        res.status(error.response.status).json({ error: 'Server responded with an error' });
        console.log(error)
    } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        res.status(500).json({ error: 'No response received from the server' });
        console.log(error)
    } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).json({ error: 'An error occurred while making the request' });
        console.log(error)
    }
};