export let cfg = {
  server: 'http://localhost:8000',
  apiUrl: 'http://localhost:8000/api',
  tokenName: 'token',
  user: {
    register: '/register',
    login: '/authenticate',
    refresh:'/authenticateRefresh',
  },
  books: '/books'
};