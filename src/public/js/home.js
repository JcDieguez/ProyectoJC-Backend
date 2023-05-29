// Obtener elementos del DOM
const category = document.getElementById('categorySelect');
function filterByCategory(param) {
  category.value = param;
  console.log(param)
  const userToken = localStorage.getItem('user');
  const user = JSON.parse(userToken);
 if(param!="all"){
   fetch(`/api/product/${param}`, {
     method: 'GET',
     headers: {
       'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       'parametros' : JSON.stringify(user.cart._id)
     }
   }).then(response => {
    
       return response.json();
    
   }).then(data => {
    
   const { products, categorys } = data;
   console.log(JSON.stringify(products))
   const url = `/homeFiltrados?products=${encodeURIComponent(JSON.stringify(products))}&categorys=${encodeURIComponent(JSON.stringify(categorys))}&category=${encodeURIComponent(JSON.stringify(param))}`;
   window.location.href = url;
   category.value = param;
   }).catch(error => {
     errorElement.textContent = error.message;
   });
 }else{
  console.log(param)
  window.location.href = '/';

 }
}