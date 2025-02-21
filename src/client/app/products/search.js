import ProductService from './product.mock.service.js';

const url = new URL(window.location);
const searchedParams = url.searchParams;
const page = parseInt(searchedParams.get('page')?? 1);
const perPage = parseInt(searchedParams.get('perPage') ?? 6);

const eleMessageBox = document.getElementById('message-box');
const eleCardDisplay = document.getElementById('card-display');

const records = ProductService.listProducts(page, perPage);

toggleVisibility(records);

function drawPaginationLinks(elePaginationContainer, currentPage, totalPages) {
    const elePaginationItems = elePaginationContainer.querySelector('ul.pagination');
    elePaginationItems.replaceChildren();

    console.log(totalPages);

    if (totalPages > 1) {
        elePaginationContainer.classList.remove('d-none');
    }
    else {
        elePaginationContainer.classList.add('d-none');
    }

    // Previous button
    const elePrevItem = document.createElement('li');
    elePrevItem.classList.add('page-item');
    const elePrevLink = document.createElement('a');
    elePrevLink.textContent = 'Previous';   
    elePrevLink.setAttribute('href', `search.html?page=${currentPage-1}&perPage=${perPage}`);
    elePrevLink.classList.add('page-link');

    if (currentPage === 1) {
        elePrevLink.setAttribute('disabled', true);
        elePrevLink.classList.add('disabled');
    }

    elePrevItem.append(elePrevLink);
    elePaginationItems.append(elePrevItem);     

    // Numbered Buttons
    for(let i = 1; i <= totalPages; i++) {
        const elePageItem = document.createElement('li');

        elePageItem.classList.add('page-item');
        const elePageLink = document.createElement('a');
        elePageLink.classList.add('page-link');

        
        if (currentPage === i) {
            elePageLink.classList.add('active');
        }

        elePageLink.setAttribute('href', `search.html?page=${i}&perPage=${perPage}`);
        elePageLink.textContent = i;

        elePageItem.append(elePageLink);
        elePaginationItems.append(elePageItem);
    }

    // Next button
    const eleNextItem = document.createElement('li');
    eleNextItem.classList.add('page-item');
    const eleNextLink = document.createElement('a');
    eleNextLink.textContent = 'Next';   
    eleNextLink.setAttribute('href', `search.html?page=${currentPage+1}&perPage=${perPage}`);
    eleNextLink.classList.add('page-link');

    if (currentPage === totalPages) {
        eleNextLink.setAttribute('disabled', true);
        eleNextLink.classList.add('disabled');
    }

    eleNextItem.append(eleNextLink);
    elePaginationItems.append(eleNextItem);  
}

function toggleVisibility(products) {
    if (!products.length) {
        eleMessageBox.classList.remove('d-none');
    }
    else {
        eleMessageBox.classList.add('d-none');
        displayProducts(products);

        const elePaginationContainer = document.getElementById('pagination');
        const totalPages = Math.ceil(ProductService.getProductCount() / perPage);
        drawPaginationLinks(elePaginationContainer, page, totalPages);

        console.log(perPage);
    }
}

function displayProducts(products) {
    for (const product of products) {
        const eleCard = createCard(product.name, product.description, product.price, product.stock, product);
        eleCardDisplay.append(eleCard);
    }
}

function createCard(name, description, price, stock, product) {
    console.log(name);  
    const eleGrid = document.createElement("div");
    eleGrid.className = "col-md-6 col-lg-4 d-flex justify-content-center";

    // Card setup
    const eleCard = document.createElement('div');
    eleCard.className = 'card';
    eleCard.style.width = '18rem';
    eleGrid.append(eleCard);

    // Create image icon
    const eleImageIcon = document.createElement('i');
    eleImageIcon.className = 'fa-solid fa-tag';
    eleImageIcon.style.fontSize = "15em";
    eleImageIcon.style.marginRight = "auto";
    eleImageIcon.style.marginLeft = "auto";
    eleCard.append(eleImageIcon);

    // Create card body1
    const eleCardBody1 = document.createElement('div');
    eleCardBody1.className = 'card-body';
    eleCard.append(eleCardBody1);

    // Create header
    const eleCardHeader = document.createElement('h5')
    eleCardHeader.className = 'card-title';
    eleCardHeader.textContent = name;
    eleCardBody1.append(eleCardHeader);

    // Create description
    const eleCardDescription = document.createElement('p');
    eleCardDescription.className = 'card-text';
    eleCardDescription.textContent = description;
    eleCardBody1.append(eleCardDescription);

    // Create list for product info
    const eleCardList = document.createElement('ul');
    eleCardList.className = 'list-group list-group-flush';
    eleCard.append(eleCardList);

    // Create price info
    const eleCardPrice = document.createElement('li');
    eleCardPrice.className = 'list-group-item';
    eleCardPrice.textContent = `$${price}`;
    eleCardList.append(eleCardPrice);

    // Create stock info
    const eleCardStock = document.createElement('li');
    eleCardStock.className = 'list-group-item';
    eleCardStock.textContent = `${stock} in stock`;
    eleCardList.append(eleCardStock);

    // Create card body2
    const eleCardBody2 = document.createElement('div');
    eleCardBody2.className = 'card-body';
    eleCardBody2.style.marginLeft = 'auto';
    eleCardBody2.style.marginRight = 'auto';
    eleCard.append(eleCardBody2);

    // Create shopping Cart Button
    const eleCartButton = document.createElement('button');
    eleCartButton.className = 'btn btn-success';
    eleCardBody2.append(eleCartButton);

    // Create cart Icon
    const eleCartIcon = document.createElement('i');
    eleCartIcon.className = 'fa-solid fa-cart-shopping';
    eleCartButton.append(eleCartIcon);

    // Create edit Button
    const eleEditButton = document.createElement('a');
    eleEditButton.className = 'btn btn-primary mx-2';
    eleCardBody2.append(eleEditButton);
    eleEditButton.setAttribute('href', `create.html?id=${product.id}`);

    // Create cart Icon
    const eleEditIcon = document.createElement('i');
    eleEditIcon.className = 'fa-solid fa-edit';
    eleEditButton.append(eleEditIcon);

    // Create trash Button
    const eleTrashButton = document.createElement('button');
    eleTrashButton.className = 'btn btn-danger';
    eleCardBody2.append(eleTrashButton);

    // Create trash Icon
    const eleTrashIcon = document.createElement('i');
    eleTrashIcon.className = 'fa-solid fa-trash';
    eleTrashButton.append(eleTrashIcon);
    eleTrashButton.addEventListener('click', onDeleteClick(product));

    return eleGrid;
}

function onConfirm(product) {
    return event => {
        try {
            ProductService.deleteProduct(product);
            window.location = 'search.html';
        } catch (error) {
            eleMessageBox.classList.remove('d-none');
            eleMessageBox.textContent = error.message;
        }
    }
}

function onShow(product) {
    return event => {
        document.querySelector("#confirmation .btn-danger")
            .addEventListener('click', onConfirm(product));
    }
}

function onDeleteClick(product) {
    return event => {
        const eleModalWindow = document.getElementById('confirmationModal');
        const modal = new bootstrap.Modal('#confirmationModal');
        eleModalWindow.addEventListener('show.bs.modal', onShow(product));
        modal.show();
    }
}