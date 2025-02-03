import Product from './Product.js';
import ProductService from './product.mock.service.js';

const url = new URL(window.location);

const searchedParams = url.searchParams;
const editID = searchedParams.get('id');
const isEditMode = editID ? true : false;

if (isEditMode)
    setUpEditForms();

document.getElementById('product-form')
    .addEventListener('submit', submitProductForm);

function setUpEditForms() {
    const eleHeading = document.querySelector('h1');
    const eleButton = document.querySelector('button');

    eleHeading.textContent = "Edit Product"
    eleButton.textContent = "Update Product"

    try {
        const existingProduct = ProductService.findProduct(editID);
        const productForm = document.getElementById('product-form');

        productForm.name.value = existingProduct.name;
        productForm.price.value = existingProduct.price;
        productForm.stock.value = existingProduct.stock;
        productForm.description.value = existingProduct.description;
    } catch (error) {
        window.location = 'search.html';
        return;
    }
}


function submitProductForm(event) {
    event.preventDefault();
    const productForm = event.target;

    const eleMessageBox = document.getElementById("message-box");
    const eleNameError = productForm.name.nextElementSibling;
    const valid = validateProductForm(event.target);

    if (valid) {
        const productParams = {
            id: editID,
            name: productForm.name.value,
            price: productForm.price.value,
            stock: productForm.stock.value,
            description: productForm.description.value
        };

        const productObject = new Product(productParams);

        try {
            if (isEditMode) {
                ProductService.updateProduct(productObject);
            }
            else {
                ProductService.createProduct(productObject);
            }
            window.location.href = 'search.html'
        }
        catch (error) {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = error.message;
        }
    }
    else {
        eleMessageBox.classList.remove('d-none');
        eleMessageBox.textContent = "Something went wrong."
    }

}

function validateProductForm(form) {
    let valid = true;

    // Name validation
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;
    const eleNameInput = document.getElementById('name');

    if (name == '') {
        valid = false;
        eleNameError.classList.remove('d-none');
        eleNameInput.classList.add('is-invalid');
        eleNameError.textContent = 'You must enter a name.';
    }
    else {
        eleNameError.classList.add('d-none');
        eleNameInput.classList.remove('is-invalid');

    }

    // Price Validation
    const price = form.price.value;
    const elePriceError = form.price.nextElementSibling;
    const elePriceInput = document.getElementById('price');

    if  (price == '') {
        valid = false;
        elePriceError.classList.remove('d-none');
        elePriceInput.classList.add('is-invalid');
        elePriceError.textContent = 'You must enter a price';
    }
    else if (isNaN(price)) {
        valid = false;
        elePriceError.classList.remove('d-none');
        elePriceInput.classList.add('is-invalid');
        elePriceError.textContent = 'Price must be a number.';
    }
    else if (String(price).split(".")[1]?.length > 2) {
        valid = false;
        elePriceError.classList.remove('d-none');
        elePriceInput.classList.add('is-invalid');
        elePriceError.textContent = 'Price must be a number with no more than two decimal places.';
    }
    else {
        elePriceError.classList.add('d-none');
        elePriceInput.classList.remove('is-invalid');
    }

    // Stock validation
    const stock = form.stock.value;
    const eleStockError = form.stock.nextElementSibling;
    const eleStockInput = document.getElementById('stock');

    if (stock == '') {
        valid = false;
        eleStockError.classList.remove('d-none');
        eleStockInput.classList.add('is-invalid');
        eleStockError.textContent = 'You must enter a stock.';
    }
    else if (!Number.isInteger(Number(stock))) {
        valid = false;
        eleStockError.classList.remove('d-none');
        eleStockInput.classList.add('is-invalid');

        eleStockError.textContent = 'Stock must be a whole number.';
    }
    else {
        eleStockError.classList.add('d-none');
        eleStockInput.classList.remove('is-invalid');

    }

    // Description validation
    const description = form.description.value;
    const eleDescriptionError = form.description.nextElementSibling;
    const eleDescriptionInput = document.getElementById('description');

    if (description == '') {
        valid = false;
        eleDescriptionError.classList.remove('d-none');
        eleDescriptionInput.classList.add('is-invalid');
        eleDescriptionError.textContent = 'You must enter a description.';
    }
    else {
        eleDescriptionError.classList.add('d-none');
        eleDescriptionInput.classList.remove('is-invalid');

    }

    return valid;
}