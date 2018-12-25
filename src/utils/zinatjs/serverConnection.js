import Zinat from './zinat.js';

//const CLIENT_DOMAIN = 'https://anfora.social';

var zinatAPI = new Zinat(process.env.VUE_APP_CLIENT_DOMAIN)
export default zinatAPI;
