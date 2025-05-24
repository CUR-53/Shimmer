import type GetCartResponse from '@ts/Shopify/AjaxApi/Cart/GetCart';

const GetCart = async (): Promise<GetCartResponse> => {
  const response = await fetch(`/cart.js`);

  if (!response.ok) {
    throw new Error('Failed to get cart');
  }

  return response.json();
};

export default GetCart;
