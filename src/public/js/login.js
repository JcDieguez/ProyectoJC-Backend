const form = document.getElementById('loginForm');
const errorElement = document.getElementById('loginError');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  fetch('/api/sessions/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al iniciar sesión');
    }
  }).then(data => {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', data.user);
    window.location.href = '/';
  }).catch(error => {
    errorElement.textContent = error.message;
  });
});
