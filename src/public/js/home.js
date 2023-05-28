// Obtener elementos del DOM
const category = document.getElementById('categorySelect');

function filterByCategory(param) {
  obj={}
fetch(`/api/product/${param}`,{
    method:'GET',
    headers: {
        'Content-Type':'application/json'
    }
}).then(result=>result.json()).then(json=>console.log(json));
}