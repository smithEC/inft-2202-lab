import template from './home.ejs';
import './home.scss';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').innerHTML = html;
}