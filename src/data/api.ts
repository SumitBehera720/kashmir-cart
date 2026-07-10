import { mockProducts } from "./mockProducts";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://lightslategray-buffalo-652025.hostingersite.com/api';

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC DATA
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.map((p: any) => ({
      ...p,
      images: p.images ? p.images.map((img: any) => img.image_path) : []
    }));
  } catch (error) {
    console.warn("API offline/failed, falling back to mockProducts:", error);
    return mockProducts;
  }
}

export async function fetchProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product details');
    }
    const p = await res.json();
    return {
      ...p,
      images: p.images ? p.images.map((img: any) => img.image_path) : []
    };
  } catch (error) {
    console.warn(`API offline/failed, falling back to mockProduct for ${slug}:`, error);
    const mockP = mockProducts.find(p => p.slug === slug);
    return mockP || null;
  }
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`, {
    next: { revalidate: 300 }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchHomepageSections() {
  try {
    const res = await fetch(`${API_BASE}/homepage-sections`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export async function fetchFooter() {
  try {
    const res = await fetch(`${API_BASE}/footer`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function verifyBatch(batchNumber: string) {
  const res = await fetch(`${API_BASE}/verify-batch/${batchNumber}`);
  if (!res.ok) {
    if (res.status === 404) return { success: false, message: 'Invalid batch number' };
    throw new Error('Verification failed');
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

export async function loginUser(credentials: any) {
  return fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(userData: any) {
  return fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(userData),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────────────────────

export async function placeOrder(orderData: any, token: string) {
  return fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchAdminStats(token: string) {
  return fetch(`${API_BASE}/admin/stats`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
}

export async function fetchAdminUsers(token: string) {
  return fetch(`${API_BASE}/admin/users`, {
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
}

export async function toggleBlockUser(id: number, token: string) {
  return fetch(`${API_BASE}/admin/users/${id}/block`, {
    method: 'PUT',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export async function createCategory(categoryData: any, token: string) {
  return fetch(`${API_BASE}/admin/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(categoryData),
  });
}

export async function updateCategory(id: number, categoryData: any, token: string) {
  return fetch(`${API_BASE}/admin/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(categoryData),
  });
}

export async function deleteCategory(id: number, token: string) {
  return fetch(`${API_BASE}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
}

export async function uploadCategoryImage(categoryId: number, formData: FormData, token: string) {
  return fetch(`${API_BASE}/admin/categories/${categoryId}/images`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: formData,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

export async function createProduct(productData: any, token: string) {
  return fetch(`${API_BASE}/admin/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(id: number, productData: any, token: string) {
  return fetch(`${API_BASE}/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(productData),
  });
}

export async function deleteProduct(id: number, token: string) {
  return fetch(`${API_BASE}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
  });
}

export async function uploadProductImage(productId: number, formData: FormData, token: string) {
  return fetch(`${API_BASE}/admin/products/${productId}/images`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: formData,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — FOOTER
// ─────────────────────────────────────────────────────────────────────────────

export async function updateFooterDetails(footerData: any, token: string) {
  return fetch(`${API_BASE}/admin/footer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(footerData),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — HOMEPAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function updateHomepageSection(key: string, formData: FormData, token: string) {
  return fetch(`${API_BASE}/admin/homepage-sections/${key}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: formData,
  });
}

export async function uploadHomepageImage(formData: FormData, token: string) {
  return fetch(`${API_BASE}/admin/upload-homepage-image`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: formData,
  });
}
