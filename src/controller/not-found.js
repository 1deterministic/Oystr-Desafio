module.exports = {
    default: (request, response, next) => {
        return response.status(404).send({});
    }
};