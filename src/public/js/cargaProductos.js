const form = document.getElementById('formularioProducto');
const inputElement = document.getElementById('fileAnterior') ;
form.addEventListener('submit',async evt=>{
    evt.preventDefault();
    const data = new FormData(form);

    const response = await fetch('/api/product/',{
        method:'POST',
        body:data
    })
    const result = await response.json();
    window.location.href='/'
})