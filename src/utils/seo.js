export const SITE_URL = 'https://www.dermyxskincare.com'
export const SITE_NAME = 'Dermyx Skincare'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.jpg`
export const CURRENCY = 'PKR'

export const BRAND_TERMS = [
  'dermyx',
  'dermyx skincare',
  'dermx',
  'dermyx skin care',
  'dermis skincare',
]

export const PRODUCT_TERMS = [
  'acne face wash pakistan',
  'salicylic acid face wash',
  'sunscreen spf 50 pakistan',
  'matte sunblock pakistan',
  'dark spots cream pakistan',
  'skin brightening cream',
  'hair fall shampoo pakistan',
  'anti hair fall shampoo',
  'dermatologist tested skincare',
  'skincare bundle pakistan',
  'buy skincare online pakistan',
  'cash on delivery skincare',
]

// Appends Cloudinary delivery transforms so cards never download full-size
// originals. Anything that is not a Cloudinary URL is returned untouched.
export const optimizeImage = (url, width = 800) => {
  if (typeof url !== 'string' || !url.includes('/image/upload/')) return url
  if (url.includes('/image/upload/f_auto')) return url
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${width}/`)
}

export const pageUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

export const stripText = (value = '') => String(value).replace(/\s+/g, ' ').trim()
