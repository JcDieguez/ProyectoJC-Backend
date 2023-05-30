const category = document.getElementById('categorySelect');
function filterByCategory(param) {
  category.value = param;

  if (param !== "all") {

    category.value = param;
    const url = `/?category=${encodeURIComponent((param))}`;
    window.location.href = url;

  } else {
    category.value = param;
    window.location.href = '/';
  }
}

const deleteButtons = document.querySelectorAll('.delete-button');
const modifyButtons = document.querySelectorAll('.modify-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.productId;
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        location.reload();
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  });
});

modifyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.productId;
      const url = `/cargaProductos?productId=${encodeURIComponent((productId))}`;
    window.location.href =url;
  })

});
