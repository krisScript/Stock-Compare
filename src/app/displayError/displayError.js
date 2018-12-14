const displayError = (alertMsg, type) => {
  const body = document.body;
  const alert = document.createElement('p');
  alert.className = 'alert';
  alert.textContent = alertMsg;
  const insertError = () => {
    body.insertBefore(alert, body.childNodes[0]);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  };
  if (type === 'duplication') {
    insertError();
  } else {
    if (body.firstElementChild.className === 'alert') {
    } else {
      insertError();
    }
  }
};
export default displayError;
