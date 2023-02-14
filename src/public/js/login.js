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
      window.location.href = '/welcome';
    } else {
      response.json().then(data => {
        errorElement.textContent = data.error;
      });
    }
  }).catch(err => console.error(err));
});