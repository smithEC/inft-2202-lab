import template from './search.ejs';
import ProductService from '../../services/product.service.js';

export default async (route) => {
  const html = template();
  document.getElementById('app').innerHTML = html;

  const hash = window.location.hash;
  const queryString = hash.split('?')[1] || '';
  const params = new URLSearchParams(queryString);
  
  const page = parseInt(params.get('page') ?? 1);
  const perPage = parseInt(params.get('perPage') ?? 6);
  

  const spinner = document.getElementById('spinner');
  const messageBox = document.getElementById('message-box');
  const cardDisplay = document.getElementById('card-display');

  try {
    const { pagination, records } = await ProductService.listProducts(page, perPage);

    spinner.classList.add('d-none');

    if (!records.length) {
      messageBox.classList.remove('d-none');
    } else {
      displayProducts(records);
      setupPagination(pagination.page, pagination.pages, perPage);
    }

  } catch (error) {
    spinner.classList.add('d-none');
    messageBox.classList.remove('d-none');
    messageBox.textContent = 'Failed to load products.';
    console.error(error);
  }
};

function displayProducts(products) {
  const container = document.getElementById('card-display');
  container.innerHTML = '';

  for (const product of products) {
    const card = createCard(product);
    container.appendChild(card);
  }
}

function createCard(product) {
  const grid = document.createElement('div');
  grid.className = "col-md-6 col-lg-4 d-flex justify-content-center";

  const card = document.createElement('div');
  card.className = 'card';
  card.style.width = '18rem';
  grid.appendChild(card);

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-tag';
  icon.style.fontSize = "15em";
  icon.style.margin = "auto";
  card.appendChild(icon);

  const body1 = document.createElement('div');
  body1.className = 'card-body';
  card.appendChild(body1);

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.name;
  body1.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'card-text';
  desc.textContent = product.description;
  body1.appendChild(desc);

  const list = document.createElement('ul');
  list.className = 'list-group list-group-flush';
  card.appendChild(list);

  const price = document.createElement('li');
  price.className = 'list-group-item';
  price.textContent = `$${product.price}`;
  list.appendChild(price);

  const stock = document.createElement('li');
  stock.className = 'list-group-item';
  stock.textContent = `${product.stock} in stock`;
  list.appendChild(stock);

  const body2 = document.createElement('div');
  body2.className = 'card-body d-flex justify-content-center gap-2 flex-wrap';
  card.appendChild(body2);

  const cartButton = document.createElement('button');
  cartButton.className = 'btn btn-success';
  cartButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
  body2.appendChild(cartButton);

  if (product._id && product._id.length > 0) {
    const editBtn = document.createElement('a');
    editBtn.className = 'btn btn-primary mx-2';
    editBtn.href = `#/create?id=${product._id}`;
    editBtn.innerHTML = '<i class="fa-solid fa-edit"></i>';
    body2.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.addEventListener('click', () => showDeleteModal(product));
    body2.appendChild(delBtn);
  }

  return grid;
}

function showDeleteModal(product) {
  const modal = new bootstrap.Modal('#confirmationModal');
  const confirmBtn = document.querySelector('#confirmation .btn-danger');
  const spinner = document.getElementById('delete-spinner');

  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.onclick = async () => {
    try {
      spinner.classList.remove('d-none');
      await ProductService.deleteProduct(product);
      window.location.reload();
    } catch (err) {
      spinner.classList.add('d-none');
      alert('Failed to delete product.');
    }
  };

  modal.show();
}


function setupPagination(currentPage, totalPages, perPage) {
  const pagination = document.getElementById('pagination');
  const ul = pagination.querySelector('ul.pagination');
  ul.innerHTML = '';

  pagination.classList.toggle('d-none', totalPages <= 1);

  const addPageItem = (label, targetPage, disabled = false, active = false) => {
    const li = document.createElement('li');
    li.className = 'page-item';
  
    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = `#/search?page=${targetPage}&perPage=${perPage}`;
    a.textContent = label;
  
    if (disabled) li.classList.add('disabled');
    if (active) {
      li.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  
    li.appendChild(a);
    ul.appendChild(li);
  };
  

  addPageItem('Previous', currentPage - 1, currentPage === 1);

  for (let i = 1; i <= totalPages; i++) {
    addPageItem(i, i, false, i === currentPage);
  }

  addPageItem('Next', currentPage + 1, currentPage === totalPages);

  document.getElementById('dropdown').classList.remove('d-none');
  [3, 6, 9].forEach(n => {
    const btn = document.getElementById(`button-${n}`);
    if (btn) btn.addEventListener('click', () => {
      window.location.href = `#/search?page=1&perPage=${n}`;
    });
  });
}
