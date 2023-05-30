const button = document.getElementById('purchaseButton');
let countdown = 8; // Tiempo en segundos

button.addEventListener('click', async evt => {
  evt.preventDefault();

  // Animación del botón al hacer click
  button.style.transform = 'scale(0.9)';
  button.style.transition = 'transform 0.2s';

  // Mostrar mensaje de confirmación
  const alertElement = document.createElement('div');
  alertElement.textContent = '¡Compra realizada exitosamente! Tu orden ha sido procesada y será enviada en breve. Serás redirigido automáticamente al inicio.';
  alertElement.style.position = 'fixed';
  alertElement.style.top = '20px';
  alertElement.style.left = '50%';
  alertElement.style.transform = 'translateX(-50%)';
  alertElement.style.padding = '10px';
  alertElement.style.color = '#fff';
  alertElement.style.backgroundColor = 'green';
  alertElement.style.fontSize = '16px';
  alertElement.style.fontWeight = 'bold';
  alertElement.style.borderRadius = '5px';
  alertElement.style.zIndex = '9999';
  document.body.appendChild(alertElement);

  // Enviar solicitud fetch
  console.log("llega aca")
  const response = await fetch('/api/cart/purchase', {
    method: 'POST'
  });

  const result = await response.json();
  console.log(result);

  // Remover animación del botón
  button.style.transform = '';

  // Remover mensaje de confirmación después de 8 segundos
  setTimeout(() => {
    alertElement.remove();
  }, countdown * 1000);

  // Redirigir al inicio y mostrar contador de tiempo restante
  const countdownElement = document.createElement('div');
  countdownElement.textContent = `Redirigiendo al inicio en ${countdown} segundos`;
  countdownElement.style.position = 'fixed';
  countdownElement.style.bottom = '20px';
  countdownElement.style.left = '50%';
  countdownElement.style.transform = 'translateX(-50%)';
  countdownElement.style.padding = '10px';
  countdownElement.style.color = '#fff';
  countdownElement.style.backgroundColor = 'black';
  countdownElement.style.fontSize = '16px';
  countdownElement.style.fontWeight = 'bold';
  countdownElement.style.borderRadius = '5px';
  countdownElement.style.zIndex = '9999';
  document.body.appendChild(countdownElement);

  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = `Redirigiendo al inicio en ${countdown} segundos`;
  }, 1000);

  // Redirigir a la página principal después de 8 segundos
  setTimeout(() => {
    clearInterval(countdownInterval);
    countdownElement.remove();
    window.location.href = '/';
  }, countdown * 1000);
});

// Manejar el evento click en el botón de eliminar
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const productId = button.dataset.productId;
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE'
      });      
      if (response.ok) {
        // Recargar la página después de eliminar el producto
        location.reload();
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  });
});
