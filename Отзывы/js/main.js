function submitForm(event) {
    event.preventDefault();
    showNotification();
    // Здесь можно добавить код для отправки данных на сервер или другую обработку формы
  }

  function showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = 'Спасибо за отзыв!';

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

