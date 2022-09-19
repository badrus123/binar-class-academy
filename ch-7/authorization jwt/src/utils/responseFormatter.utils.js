const responseDefaults = () => {
    const response = {
        'meta': {
            'status': 'success',
            'message': null,
        }
    }

    return response
}

module.exports = {
    responseSuccess: (data = null, message = null) => {
        const response = responseDefaults()

        response.meta.message = message
        response.data = data

        return response
    },
    responseError: (message = null) => {
        const response = responseDefaults()

        response.meta.status = 'error'
        response.meta.message = message

        return response
    }
}