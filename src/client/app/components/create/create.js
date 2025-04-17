import template from './create.ejs';
import Product from '../../models/Product.js';
import ProductService from '../../services/product.service.js';

export default async (route) => {
  const html = template();
  document.getElementById('app').innerHTML = html;

  const url = new URL(window.location);
  const queryString = url.hash.split('?')[1] || '';
  const params = new URLSearchParams(queryString);
  const editID = params.get('id');
  const isEditMode = !!editID;

  if (isEditMode) await setupEditForm(editID);

  document.getElementById('product-form').addEventListener('submit', (e) =>
    submitForm(e, isEditMode, editID)
  );
};

async function setupEditForm(editID) {
  const heading = document.querySelector('h1');
  const button = document.querySelector('button');

  heading.textContent = 'Edit Product';
  button.innerHTML = 'Update Product <i id="submit-icon" class="fa-solid fa-check"></i>';

  try {
    const product = await ProductService.findProduct(editID);
    const form = document.getElementById('product-form');
    form.name.value = product.name;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.description.value = product.description;
  } catch (error) {
    console.error('Failed to load product for editing.');
  }
}

async function submitForm(event, isEditMode, editID) {
  event.preventDefault();
  const form = event.target;
  const icon = document.getElementById('submit-icon');
  const msgBox = document.getElementById('message-box');

  icon.className = 'fa-solid fa-spinner fa-spin-pulse';
  await ProductService.waitTho(500);
  icon.className = 'fa-solid fa-check';

  if (!validateForm(form)) {
    msgBox.classList.remove('d-none');
    msgBox.textContent = 'Something went wrong.';
    return;
  }

  const product = new Product(
    editID ?? null,
    form.name.value,
    form.price.value,
    form.stock.value,
    form.description.value
  );

  try {
    if (isEditMode) {
      await ProductService.updateProduct(product);
    } else {
      await ProductService.createProduct(product);
    }
    window.location.hash = '#/search';
  } catch (err) {
    const nameErr = form.name.nextElementSibling;
    nameErr.classList.remove('d-none');
    nameErr.textContent = err.message;
  }
}

function validateForm(form) {
  let valid = true;

  const showError = (field, message) => {
    const errorEl = field.nextElementSibling;
    field.classList.add('is-invalid');
    errorEl.classList.remove('d-none');
    errorEl.textContent = message;
    valid = false;
  };

  const clearError = (field) => {
    const errorEl = field.nextElementSibling;
    field.classList.remove('is-invalid');
    errorEl.classList.add('d-none');
  };

  const name = form.name;
  if (!name.value) showError(name, 'You must enter a name.');
  else clearError(name);

  const price = form.price;
  if (!price.value) showError(price, 'You must enter a price.');
  else if (isNaN(price.value)) showError(price, 'Price must be a number.');
  else if (String(price.value).includes('.') && price.value.split('.')[1].length > 2)
    showError(price, 'Max two decimal places.');
  else clearError(price);

  const stock = form.stock;
  if (!stock.value) showError(stock, 'You must enter a stock.');
  else if (!Number.isInteger(Number(stock.value))) showError(stock, 'Must be a whole number.');
  else clearError(stock);

  const description = form.description;
  if (!description.value) showError(description, 'You must enter a description.');
  else clearError(description);

  return valid;
}
