const accessToken = localStorage.getItem('token');
let token;
if (accessToken) {
  token = accessToken.slice(1, -1);
}

export const config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};
