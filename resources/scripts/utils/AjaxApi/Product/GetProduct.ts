import type Product from '@ts/Shopify/AjaxApi/Product/Product';

const GetProduct = async (handle: string): Promise<Product> => {
  const response = await fetch(`/products/${handle}.js`);

  if (!response.ok) {
    throw new Error('Failed to get product');
  }

  return response.json();
};

export default GetProduct;
