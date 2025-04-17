import template from './footer.ejs';
import './footer.scss';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').insertAdjacentHTML('afterEnd',html);
}
