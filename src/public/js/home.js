// Obtener elementos del DOM
const category = document.getElementById('categorySelect');
function filterByCategory(param) {
  const userToken = localStorage.getItem('user');
  const user = JSON.parse(userToken);
  window.location.href =`/api/product/${param}/${user.cart._id}`
  
}