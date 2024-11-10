import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/therestodb-source';
import { createRestoDetailTemplate, createReviewTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="loadingIndicator" class="loading-indicator"></div>
      <div id="resto" class="resto"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer">
        <h3>Add Your Review</h3>
        <form id="reviewForm">
          <input type="text" id="reviewerName" placeholder="Your Name" required>
          <textarea id="reviewContent" placeholder="Write your review here" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await TheRestoDbSource.detailResto(url.id);
    const restoContainer = document.querySelector('#resto');
    const loadingIndicator = document.querySelector('#loadingIndicator');

    try {
      restoContainer.innerHTML = createRestoDetailTemplate(resto);

      // Load reviews into review-item elements
      const reviewsContainer = restoContainer.querySelector('.resto__reviews');
      resto.customerReviews.forEach((review) => {
        const reviewHtml = createReviewTemplate(review);
        reviewsContainer.insertAdjacentHTML('beforeend', reviewHtml);
      });

      // Like button initialization
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: resto.id,
          name: resto.name,
          description: resto.description,
          pictureId: resto.pictureId,
          rating: resto.rating,
        },
      });

      // Handle review form submission
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const reviewerName = document.getElementById('reviewerName').value;
        const reviewContent = document.getElementById('reviewContent').value;

        const updatedReviews = await TheRestoDbSource.addReview({
          id: url.id,
          name: reviewerName,
          review: reviewContent,
        });
        
        // Render updated reviews
        reviewsContainer.innerHTML = ''; // Kosongkan kontainer review
        updatedReviews.forEach((review) => {
          const reviewHtml = createReviewTemplate(review);
          reviewsContainer.insertAdjacentHTML('beforeend', reviewHtml);
        });
        
        // Clear form fields
        reviewForm.reset();
      });

      loadingIndicator.style.display = 'none';
    } catch (error) {
      // Tampilkan pesan error dan hilangkan loading indicator
      loadingIndicator.style.display = 'none';
      restoContainer.innerHTML = `<p class="error-message">Gagal memuat data. Silakan coba lagi.</p>`;
    }
  },
};

export default Detail;
