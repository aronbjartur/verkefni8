import { formatNumber } from './helpers.js';

export function createCartLine(product, quantity) {
  // tafla
  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.cartProductId = product.id.toString();
  cartLineElement.dataset.quantity = quantity;

  // heiti
  const titleElement = document.createElement('td');
  titleElement.textContent = product.title;
  cartLineElement.appendChild(titleElement);

  // fjöldi
  const quantityElement = document.createElement('td');
  quantityElement.textContent = quantity;
  cartLineElement.appendChild(quantityElement);

  // verð
  const priceElement = document.createElement('td');
  const priceSpanElement = document.createElement('span');
  priceSpanElement.className = 'price';
  priceSpanElement.textContent = formatNumber(product.price) + ' kr.-';
  priceElement.appendChild(priceSpanElement);
  cartLineElement.appendChild(priceElement);

  // samtals
  const totalElement = document.createElement('td');
  const totalSpanElement = document.createElement('span');
  const formTdElement = document.createElement('td');
  totalSpanElement.className = 'price';
  totalSpanElement.textContent = formatNumber(product.price * quantity) + ' kr.-';
  totalElement.appendChild(totalSpanElement);
  cartLineElement.appendChild(totalElement);

  
  
  
  
  

  // eyða takkinn
const removeButtonTd = document.createElement('td');
const removeForm = document.createElement('form');
removeForm.className = 'remove';
removeForm.method = 'post';

const removeButton = document.createElement('button');
removeButton.textContent = 'Eyða';


removeButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  const cartLineElement = event.target.closest('tr');
  cartLineElement.remove(); // Remove item from cart
});

removeForm.appendChild(removeButton);
removeButtonTd.appendChild(removeForm);
cartLineElement.appendChild(removeButtonTd);


  
   // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu

   return cartLineElement;
}


function createReceipt() {
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  const receiptSection = document.querySelector('.receipt');
  const receiptContent = document.createElement('div');

  
  for (const cartLine of Array.from(cartTableBodyElement.children)) {
    const item = cartLine.cloneNode(true);
   
    const deleteButton = item.querySelector('.remove');
    if (deleteButton) {
      deleteButton.remove();
    }
    receiptContent.appendChild(item);
  }

  
  while (receiptSection.firstChild) {
    receiptSection.removeChild(receiptSection.firstChild);
  }
  receiptSection.appendChild(receiptContent);

  // Clear cart
  while (cartTableBodyElement.firstChild) {
    cartTableBodyElement.removeChild(cartTableBodyElement.firstChild);
  }
}


function submitOrderHandler(event) {
  event.preventDefault(); 

  
  createReceipt();
}


const submitOrderForm = document.querySelector('.submit-order');
if (submitOrderForm) {
  submitOrderForm.addEventListener('submit', submitOrderHandler);
}


/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
  


  
}
