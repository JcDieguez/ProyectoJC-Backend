const category = document.getElementById('categorySelect');
function filterByCategory(param) {
  category.value = param;
  const userToken = localStorage.getItem('user');
  const user = JSON.parse(userToken);

  if (param !== "all") {
    fetch(`/api/product/${param}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'parametros': JSON.stringify(user.cart._id)
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      const { products, categorys } = data;
      const url = `/homeFiltrados?products=${encodeURIComponent(JSON.stringify(products))}&categorys=${encodeURIComponent(JSON.stringify(categorys))}&category=${encodeURIComponent(JSON.stringify(param))}`;
      window.location.href = url;
      category.value = param;
    }).catch(error => {
      errorElement.textContent = error.message;
    });
  } else {
    window.location.href = '/';
  }
}
