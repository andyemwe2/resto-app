import CONFIG from '../../globals/config';
 
const createRestoDetailTemplate = (resto) => `
  <h2 class="resto__title">${resto.name}</h2>
  <img class="resto__poster" src="${CONFIG.BASE_IMG_LARGE + resto.pictureId}" alt="${resto.name}" />
  <div class="resto__info">
    <h3>Information</h3>
    <h4>Description</h4>
    <p>${resto.description}</p>
    <h4>Location</h4>
    <p>${resto.city}</p>
    <h4>Address</h4>
    <p>${resto.address}</p>
    <h4>Rating</h4>
    <p>${resto.rating}</p>
    <h4>Categories</h4>
    <ul>
      ${resto.categories.map(category => `<li>${category.name}</li>`).join('')}
    </ul>
    <h4>Menus</h4>
    <div class="resto__menus">
      <h5>Foods</h5>
      <ul>
        ${resto.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
      </ul>
      <h5>Drinks</h5>
      <ul>
        ${resto.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
      </ul>
    </div>
    <h4>Customer Reviews</h4>
    <div class="resto__reviews"></div>
  </div>
`;
 
const createRestoItemTemplate = (restaurants) => `
  <div class="resto-item">
    <div class="resto-item__header">
      <img class="resto-item__header__poster lazyload" alt="${restaurants.name}"
           data-src="${restaurants.pictureId ? CONFIG.BASE_IMG_SMALL + restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="resto-item__header__rating">
        <p>⭐️<span class="resto-item__header__rating__score">${restaurants.rating}</span></p>
      </div>
    </div>
    <div class="resto-item__content">
      <h3 class="resto__title"><a href="/#/detail/${restaurants.id}">${restaurants.name}</a></h3>
      <p>${restaurants.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
 
const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createReviewTemplate = (review) => `
  <div class="review-item">
    <h5 class=review-name>${review.name}</h5>
    <p class=review-content>${review.review}</p>
    <p class="review-date">${review.date}</p>
  </div>
`;
 
export { createRestoItemTemplate, createRestoDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate, createReviewTemplate };