import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestoItemTemplate } from '../templates/template-creator';
 
const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Resto</h2>
        <div id="restos" class="restos">
 
        </div>
      </div>
    `;
  },
 
  async afterRender() {
    const restos = await FavoriteRestoIdb.getAllRestos();
    const restosContainer = document.querySelector('#restos');
    
    if (restos.length === 0) {
      restosContainer.innerHTML = '<p class="resto-item__not__found">Tidak ada resto untuk ditampilkan</p>';
    } else {
      restos.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });
    }
  },
};
 
export default Favorite;