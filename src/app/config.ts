export let config = {
  server: 'localhost:8000',
  apiUrl: `http://localhost:8000/api`,
  //server: '18.231.113.251',
  //apiUrl: `http://18.231.113.251/api`,
  //server: '192.168.0.12:8000',
  //apiUrl: `http://192.168.0.12:8000/api`,
  tokenName: 'token',
  user: {
    register: '/register',
    login: '/authenticate',
    refresh:'/authenticateRefresh',
  }
};