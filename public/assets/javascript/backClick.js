const backToOrders = () => {
  document.location.replace('/orders');
}
document.querySelector('.backClick').addEventListener('click', backToOrders);