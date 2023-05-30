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
