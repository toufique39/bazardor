const BASE_URL =
  "https://api.abcz.workers.dev/api/bazardor";


export async function getProducts() {
  const response = await fetch(
    `${BASE_URL}/products`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getCategories() {
  const response = await fetch(
    `${BASE_URL}/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

// Get single category
export async function getCategoryBySlug(slug) {
  const response = await fetch(
    `${BASE_URL}/categories/${slug}`
  );

  if (!response.ok) {
    throw new Error("Category not found");
  }

  return response.json();
}

// Get products by category
export async function getProductsByCategory(slug) {
  const response = await fetch(
    `${BASE_URL}/products?category=${slug}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category products"
    );
  }

  return response.json();
}

// Get single product by slug
export async function getProductBySlug(slug) {
  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}