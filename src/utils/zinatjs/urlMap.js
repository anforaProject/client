module.exports = {
    'auth': '/api/v1/auth',
    'upload': '/api/v1/statuses',
    'retriveImages': (id) => {return '/api/v1/accounts/'+ id + '/statuses'},
    'retriveUser': (id) => {return '/api/v1/accounts/'+id},
    'logout': '/logout',
    'homeTimeline': '/api/v1/timelines/home',
    'verifyCredentials': '/api/v1/accounts/verify_credentials'
}
