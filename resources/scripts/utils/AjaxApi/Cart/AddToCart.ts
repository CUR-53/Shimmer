import type { AddToCartRequest, AddToCartResponse } from '@ts/Shopify/AjaxApi/Cart/AddToCart';

const AddToCart = async (items: AddToCartRequest[]): Promise<AddToCartResponse> => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Items must be a non-empty array');
  }

  const response = await fetch(`/cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error('Failed to add products to cart');
  }

  return response.json();
};

export default AddToCart;
