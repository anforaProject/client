module.exports = {
    'auth': '/api/v1/auth',
    'upload': '/api/v1/statuses',
    'retriveImages': (username) => {return '/api/v1/accounts/'+ username + '/statuses'},
    'logout': '/logout'
}
