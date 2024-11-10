const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('adding a customer review', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto__title a');
  const firstResto = locate('.resto__title a').first();
  I.click(firstResto);

  I.seeElement('#reviewForm');
  const reviewerName = 'Rafif Ahmad';
  const reviewContent = 'This is a test review';
  I.fillField('#reviewerName', reviewerName);
  I.fillField('#reviewContent', reviewContent);
  I.click('button[type="submit"]');

  I.seeElement('.review-item');
  const lastReviewName = await I.grabTextFrom(locate('.review-item .review-name').last());
  const lastReviewContent = await I.grabTextFrom(locate('.review-item .review-content').last());
  assert.strictEqual(lastReviewName, reviewerName);
  assert.strictEqual(lastReviewContent, reviewContent);
});
