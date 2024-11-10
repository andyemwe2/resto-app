import TheRestoDbSource from '../../data/therestodb-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const RestoList = {
  async render() {
    return `
      <div class="content">
        <div id="loadingIndicator" class="loading-indicator"></div>
        <h2 class="content__heading">List restaurants</h2>
        <div id="restos" class="restos">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restos = await TheRestoDbSource.nowPlayingRestos();
    const restosContainer = document.querySelector('#restos');
    const loadingIndicator = document.querySelector('#loadingIndicator');

    try {
      restosContainer.innerHTML = restos.map((resto) => createRestoItemTemplate(resto)).join('');
      loadingIndicator.style.display = 'none';
    } catch (error) {
      loadingIndicator.style.display = 'none';
      restosContainer.innerHTML = `<p class="error-message">Gagal memuat data restoran. Silakan coba lagi.</p>`;
    }
  },
};

export default RestoList;