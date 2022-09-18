const baseURL = 'https://ecom-d0607.herokuapp.com/api/';

const urls = {
  login: baseURL + 'auth/login',
  userRegistration: baseURL + 'auth/register',
  verifyUser: baseURL + 'user/verify/',
  forgotPassword: baseURL + 'auth/forgotpassword',
  resetPassword: baseURL + 'auth/resetpassword',
  changePassword: baseURL + 'user/change-password/',
  getAllUsers: baseURL + 'user/',
  getCategories: baseURL + 'category',
  getProducts: baseURL + 'product/getProductByCatgories?category=',
  getAllProducts: baseURL + 'product/',
  getWishlist: baseURL + 'wishlist/',
  updateUser: baseURL + 'user/',
  addToWishlist: baseURL + 'wishlist',
  getCartItems: baseURL + 'cart/items/',
  createOrder: baseURL + 'order',
  clearCart: baseURL + 'cart/items/clearCart/',
  increaseCartItemQuantity: baseURL + 'cart/items/i-quantity/',
  decreaseCartItemQuantity: baseURL + 'cart/items/d-quantity/',
  getProductUnits: baseURL + 'product-unit',
  getOrderStatus: baseURL + 'order-status',
  searchProduct: baseURL + '/product/search/',
  getOffers: baseURL + 'offers',
  applyCouponCode: baseURL + 'coupon/search/',
};

export default urls;
