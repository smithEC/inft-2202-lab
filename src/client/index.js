import Navigo from "navigo";

import HeaderComponents from './app/components/header/header.js';
import FooterComponents from './app/components/footer/footer.js';

import HomePage from './app/components/home/home.js';
import AboutPage from './app/components/about/about.js';
import SearchPage from './app/components/search/search.js';
import CreatePage from './app/components/create/create.js';
 
 
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import './scss/styles.scss';
 
const router = new Navigo('/', { hash: true });

window.addEventListener('load', () => {
     HeaderComponents();
     FooterComponents();
     
     
     router
          .on('/', HomePage)
          .on('/about', AboutPage )
          .on('/search', SearchPage )
          .on('/create', CreatePage )

          .resolve();
});

window.addEventListener('hashchange', () => {
     router.resolve();
});