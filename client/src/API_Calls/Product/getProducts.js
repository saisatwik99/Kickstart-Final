// Product API Calls
export function getProducts () {
    return fetch("/admin/company")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => (res.json()))
}

export function getWishlist (token) {
    return fetch(`/admin/wishlist?token=${token}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => (res.json()))
}

export function getProductInfo (productId) {
    return fetch(`/admin/companyInfo?companyId=${productId}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => (res.json()))
}