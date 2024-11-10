import API_ENDPOINT from '../globals/api-endpoint';
 
class TheRestoDbSource {
  static async nowPlayingRestos() {
    const response = await fetch(API_ENDPOINT.RESTO_LIST);
    const responseJson = await response.json();
    
    return responseJson.restaurants;
  }
 
  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();

    return responseJson.restaurant;
  }

  static async addReview({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name, review }),
    });
    const responseJson = await response.json();
    return responseJson.customerReviews; // Mengembalikan daftar review yang diperbarui
  }
}
 
export default TheRestoDbSource;