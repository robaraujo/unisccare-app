//const API = '54.233.171.181';
const API = 'localhost:8000';

export let config = {
  server: API,
  apiUrl: `http://${API}/api`,
  tokenName: 'token',
  user: {
    register: '/register',
    login: '/authenticate',
    refresh:'/authenticateRefresh',
  }
};