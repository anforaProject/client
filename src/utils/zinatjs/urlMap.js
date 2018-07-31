module.exports = {
    'auth': '/api/v1/auth',
    'uploadStatus': '/api/v1/statuses',
    'uploadMedia': '/api/v1/media',
    'retriveImages': (id) => {return '/api/v1/accounts/'+ id + '/statuses'},
    'retriveUser': (id) => {return '/api/v1/accounts/'+id},
    'logout': '/logout',
    'homeTimeline': '/api/v1/timelines/home',
    'verifyCredentials': '/api/v1/accounts/verify_credentials',
    'updateCredentials': '/api/v1/accounts/update_credentials'
}
