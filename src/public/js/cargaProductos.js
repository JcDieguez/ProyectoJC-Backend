const form = document.getElementById('formularioProducto');

form.addEventListener('submit', async evt => {
    evt.preventDefault();
    const data = new FormData(form);
    console.log(form)
    const response = await fetch('/api/product/', {
        method: 'POST',
        body: data
    })
    const result = await response.json();
})