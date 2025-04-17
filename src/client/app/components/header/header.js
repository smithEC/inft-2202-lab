import template from './header.ejs';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').insertAdjacentHTML('beforebegin',html);
}