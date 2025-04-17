import template from './about.ejs';
import profilePic from '../../img/profile.JPG';

export default (route) => {
    console.log('index',route);
    const html = template();
    document.getElementById('app').innerHTML = html

    const img = document.querySelector('img.profile');
    if (img) {
        img.src = profilePic;
    }
}