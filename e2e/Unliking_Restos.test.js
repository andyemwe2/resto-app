const assert = require('assert');

Feature('Unliking Restos');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restos', ({ I }) => {
  I.seeElement('#restos');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('unliking one resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.resto__title a');
  const firstResto = locate('.resto__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');

  const likedRestoTitle = await I.grabTextFrom('.resto__title');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);

  I.click('.resto__title a');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});