const clientId = 'I9AD2IXVaVlXJXQldM4gZA'
const secret = 'XvmYLsnwp90M9MvGk0kbDbMLJChCJHjQTfybWYKBfcsGT5zTN1vL8DB8VW1vxB65'
const accessToken = ''

const Yelp = {
  getAccessToken(
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=`${clientId}``&client_secret=`${secret}`',
      {method : 'POST'}).then(response => {
        response.json();
    }).then(jsonResponse => {
      access_token = jsonResponse.access_token;
    });
  ),

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=`${this.term}`&location=`${this.location}`&sort_by=`${this.sortBy}`',
        {
          headers: {Authorization: `Bearer ${accessToken}`}
        });
    }).then(response => {
      response.json();
    }).then(jsonResponse => {
      if (json.Response.businesses) {
        return jsonResponse.businesses.map(business =>
        {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories,
            rating: business.rating,
            reviewCount: business.review_count
        }
      );
      }
    });
  }

};

export default Yelp;
