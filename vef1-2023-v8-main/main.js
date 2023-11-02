import { createCartLine, showCartContent } from './lib/ui.js';


const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart');
    return;
  }
  
  let existingLine = null;
  for (let i = 0; i < cartTableBodyElement.children.length; i++) {
    if (cartTableBodyElement.children[i].dataset.cartProductId === product.id.toString()) {
      existingLine = cartTableBodyElement.children[i];
      break;
    }
  }

  if (existingLine) {
    const currentQuantity = parseInt(existingLine.dataset.quantity, 10);
    existingLine.dataset.quantity = currentQuantity + quantity;

    
    const quantityElement = existingLine.querySelector('td:nth-child(2)');
    quantityElement.textContent = existingLine.dataset.quantity;

    
    const totalElement = existingLine.querySelector('td:nth-child(4) .price');
    totalElement.textContent = formatNumber(product.price * existingLine.dataset.quantity) + ' kr.-';
  } else {
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  }

  showCartContent(true);
}




function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr')

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const id = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu id
  const product = products.find((i) => i.id === id);

  // Finnum fjölda sem á að bæta við körfu með því að athuga á input
  const quantityInput = event.target.querySelector('input[type="number"]');
  const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}


// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun

const submitOrderForm = document.querySelector('.submit-order');

submitOrderForm.addEventListener('submit', submitOrderHandler);


