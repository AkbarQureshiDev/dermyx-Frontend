import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, SITE_NAME, pageUrl } from '../utils/seo'

const setMeta = (key, content, attr = 'name') => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const Seo = ({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  keywords,
  jsonLd,
}) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    const url = pageUrl(path)
    document.title = fullTitle

    setMeta('description', description)
    setMeta(
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
    if (keywords) setMeta('keywords', keywords)
    setCanonical(url)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', type, 'property')
    setMeta('og:site_name', SITE_NAME, 'property')
    setMeta('og:image', image, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)
  }, [title, description, path, image, type, noindex, keywords])

  const json = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    if (!json) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'page-jsonld'
    document.getElementById('page-jsonld')?.remove()
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}

export default Seo
