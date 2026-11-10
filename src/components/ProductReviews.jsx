import React, { useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContextValue'
import Stars from './Stars'
import Title from './Title'

const SORTS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest', label: 'Lowest rated' },
  { value: 'helpful', label: 'Most helpful' },
]

// Helper for relative time like "Last week", "3 weeks ago", "Yesterday"
const getRelativeTime = (timestamp) => {
  if (!timestamp) return 'Recently';
  const now = Date.now();
  const date = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
  const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return 'Last week';
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return '1 month ago';
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  return `${Math.floor(diffInMonths / 12)} years ago`;
};

// Truncate at around 40 words and append "....."
const truncateWords = (text, limit = 40) => {
  if (!text) return { text: '', isTruncated: false };
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) {
    return { text, isTruncated: false };
  }
  return {
    text: words.slice(0, limit).join(' ') + '.....',
    isTruncated: true
  };
};

const ProductReviews = ({ productId, productImage, productName }) => {
  const { backendUrl, token, navigate } = useContext(ShopContext)
  const [reviews, setReviews] = useState([])
  const [summary, setSummary] = useState({ average: 0, total: 0, breakdown: [] })
  const [sort, setSort] = useState('recent')
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  const [openForm, setOpenForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [modalReview, setModalReview] = useState(null)

  useEffect(() => {
    if (!photo) {
      setPhotoPreview('')
      return
    }
    const url = URL.createObjectURL(photo)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photo])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/review/list', { productId, sort })
      if (response.data.success) {
        setReviews(response.data.reviews)
        setSummary(response.data.summary)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [backendUrl, productId, sort])

  useEffect(() => { load() }, [load])

  const submitReview = async (e) => {
    e.preventDefault()
    if (!rating) {
      toast.error('Please choose a star rating.')
      return
    }
    if (!name.trim()) {
      toast.error('Please add the name to show on your review.')
      return
    }
    setSubmitting(true)
    try {
      const data = new FormData()
      data.append('productId', productId)
      data.append('rating', rating)
      if (title.trim()) data.append('title', title.trim())
      data.append('comment', comment)
      data.append('name', name)
      data.append('email', email)
      if (photo) data.append('image', photo)

      const response = await axios.post(backendUrl + '/api/review/add', data, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setTitle('')
        setComment('')
        setPhoto(null)
        setOpenForm(false)
        await load()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const voteHelpful = async (review) => {
    if (!token) {
      sessionStorage.setItem('redirectAfterLogin', `/product/${productId}`)
      navigate('/login')
      return
    }
    try {
      const response = await axios.post(
        backendUrl + '/api/review/helpful',
        { reviewId: review._id },
        { headers: { token } }
      )
      if (response.data.success) {
        setReviews((prev) => prev.map((r) =>
          r._id === review._id ? { ...r, helpful: response.data.helpful } : r
        ))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const visible = showAll ? reviews : reviews.slice(0, 4)

  return (
    <div className='mt-14 w-full max-w-[1200px]' id="reviews">

      <div className='mb-6'>
        <Title text1={'RATINGS &'} text2={'REVIEWS'} />
      </div>

      {/* Summary */}
      <div className='flex flex-col sm:flex-row gap-8 border rounded-xl p-5 bg-gray-50/60'>
        <div className='flex flex-col items-center justify-center sm:min-w-[150px]'>
          <p className='text-4xl font-semibold text-gray-900'>{summary.average || 0}</p>
          <Stars rating={summary.average} size={16} className='mt-2' />
          <p className='text-xs text-gray-500 mt-2'>
            {summary.total} {summary.total === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className='flex-1 flex flex-col gap-1.5 justify-center'>
          {(summary.breakdown || []).map(({ star, count }) => {
            const pct = summary.total ? (count / summary.total) * 100 : 0
            return (
              <div key={star} className='flex items-center gap-2 text-xs text-gray-500'>
                <span className='w-8'>{star} ★</span>
                <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                  <div className='h-full bg-yellow-400 rounded-full transition-all duration-300' style={{ width: `${pct}%` }} />
                </div>
                <span className='w-6 text-right'>{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Write a review — guests or signed-in users can post */}
      <div className='mt-6'>
        {openForm ? (
          <form onSubmit={submitReview} className='border rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4'>
            <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
              <h3 className='text-base font-bold text-gray-800'>Write a Customer Review</h3>
              <button
                type='button'
                onClick={() => setOpenForm(false)}
                className='text-gray-400 hover:text-black text-sm'
              >
                ✕ Close
              </button>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-gray-700'>Your rating:</span>
              <div className='flex items-center gap-1' onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    <span style={{ color: (hover || rating) >= star ? '#facc15' : '#d1d5db' }}>
                      <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-3'>
              <label className='flex flex-col gap-1'>
                <span className='text-xs font-medium text-gray-600'>Your name *</span>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  maxLength={60}
                  required
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black'
                  placeholder='Name shown on your review (e.g. Alishba)'
                />
              </label>
              <label className='flex flex-col gap-1'>
                <span className='text-xs font-medium text-gray-600'>Email * (not shown publicly)</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  maxLength={120}
                  required
                  className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black'
                  placeholder='you@example.com'
                />
              </label>
            </div>

            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-600'>Review headline / title (optional)</span>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                maxLength={100}
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black'
                placeholder='e.g. Packing is so goated'
              />
            </label>

            <div className='flex flex-col gap-2'>
              <span className='text-xs font-medium text-gray-600'>Photo of the product you received (optional)</span>
              {photoPreview ? (
                <div className='flex items-center gap-3'>
                  <img src={photoPreview} alt="Product you received" className='w-24 h-24 object-cover rounded-xl border border-gray-300 shadow-sm' />
                  <button
                    type='button'
                    onClick={() => setPhoto(null)}
                    className='text-xs text-red-600 hover:text-red-700 underline underline-offset-2'
                  >
                    Remove photo
                  </button>
                </div>
              ) : (
                <label className='self-start cursor-pointer border border-dashed border-gray-300 hover:border-black rounded-xl px-4 py-3 text-xs text-gray-600 flex items-center gap-2 transition-colors'>
                  <span>📷</span>
                  <span>Upload a photo of your product</span>
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  />
                </label>
              )}
            </div>

            <label className='flex flex-col gap-1'>
              <span className='text-xs font-medium text-gray-600'>Your review *</span>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                rows={4}
                maxLength={1000}
                required
                className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black resize-none'
                placeholder='How did it work for your skin? Texture, results, packaging — anything useful.'
              />
            </label>

            <div className='flex items-center justify-between pt-2'>
              <span className='text-xs text-gray-400'>{comment.length}/1000</span>
              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => setOpenForm(false)}
                  className='px-4 py-2 text-sm border rounded-lg hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className='px-6 py-2.5 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-60 transition-colors'
                >
                  {submitting ? 'POSTING...' : 'PUBLISH REVIEW'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setOpenForm(true)}
            className='w-full border-2 border-black text-black px-6 py-3.5 text-sm font-bold tracking-wide hover:bg-black hover:text-white transition-all rounded-lg'
          >
            WRITE A REVIEW
          </button>
        )}
      </div>

      {/* Sort & Count */}
      {reviews.length > 1 && (
        <div className='mt-8 flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-700'>{summary.total} verified & customer reviews</p>
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className='text-sm border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-black bg-white'
          >
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      )}

      {/* Reviews Cards Display — Equal Height, Card layout matching reference image */}
      <div className='mt-6'>
        {loading ? (
          <p className='text-sm text-gray-400 py-6'>Loading reviews…</p>
        ) : visible.length === 0 ? (
          <p className='text-sm text-gray-500 py-8 border rounded-xl px-4 text-center bg-gray-50/50'>
            No reviews yet — be the first to tell others how it worked for you.
          </p>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch'>
            {visible.map((review) => {
              const { text: displayComment, isTruncated } = truncateWords(review.comment, 40);
              const cardImage = review.image || productImage;

              return (
                <div
                  key={review._id}
                  className='bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full'
                >
                  {/* Top Image area */}
                  <div className='relative w-full h-36 sm:h-72 bg-gray-100 overflow-hidden flex-shrink-0 group'>
                    {cardImage ? (
                      <img
                        src={cardImage}
                        alt={`Review photo by ${review.name}`}
                        loading='lazy'
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      />
                    ) : (
                      <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#eef6fa] to-[#d6ebf7] text-[#1b6b93] p-4 text-center'>
                        <div className='w-14 h-14 rounded-full bg-white/80 flex items-center justify-center text-xl font-bold shadow-sm mb-2'>
                          {(review.name || 'C').charAt(0).toUpperCase()}
                        </div>
                        <span className='text-xs font-semibold text-[#1b6b93]'>
                          {productName || 'Dermyx Skincare'}
                        </span>
                      </div>
                    )}

                    {review.image && (
                      <button
                        type="button"
                        onClick={() => setModalReview(review)}
                        className='absolute inset-0 bg-black/20 hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                        aria-label="View photo in full size"
                      >
                        <span className='bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow'>
                          Zoom photo
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Card Body — Content formatted like reference image */}
                  <div className='p-3 sm:p-5 flex flex-col flex-1 justify-between gap-2 sm:gap-3'>
                    <div className='flex flex-col flex-1'>
                      {/* Name in bold blue */}
                      <h4 className='font-bold text-sm sm:text-base text-[#1b6b93] tracking-tight truncate'>
                        {review.name}
                      </h4>

                      {/* Stars & Relative Time */}
                      <div className='flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap'>
                        <Stars rating={review.rating} size={14} />
                        <span className='text-xs text-gray-400 font-normal'>
                          {getRelativeTime(review.createdAt)}
                        </span>
                      </div>

                      {/* Optional Headline / Title */}
                      {review.title && (
                        <h5 className='font-bold text-xs sm:text-sm text-[#1b6b93] mt-2 leading-snug line-clamp-1'>
                          {review.title}
                        </h5>
                      )}

                      {/* Description truncated at ~40 words with "....." */}
                      <div className='mt-2 flex-1'>
                        <p className='text-xs sm:text-sm text-gray-600 leading-relaxed break-words line-clamp-4 sm:line-clamp-none'>
                          {displayComment}
                          {isTruncated && (
                            <button
                              type='button'
                              onClick={() => setModalReview(review)}
                              className='ml-1 text-xs text-[#1b6b93] font-semibold hover:underline inline-block'
                            >
                              Read more
                            </button>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Footer: Verified purchase & Helpful */}
                    <div className='pt-2 sm:pt-3 border-t border-gray-100 flex items-center justify-between gap-1 mt-auto text-xs flex-wrap'>
                      {review.verified ? (
                        <span className='text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full'>
                          ✓ Verified
                        </span>
                      ) : (
                        <span className='text-[10px] text-gray-400'>Customer Review</span>
                      )}

                      <button
                        onClick={() => voteHelpful(review)}
                        className='text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors'
                        title="Mark helpful"
                      >
                        <span>👍</span>
                        <span>Helpful ({review.helpful || 0})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Show more toggle */}
      {reviews.length > 4 && (
        <div className='mt-6 text-center'>
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className='inline-block border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:border-black hover:text-black transition-colors'
          >
            {showAll ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
          </button>
        </div>
      )}

      {/* Modal for full review details */}
      {modalReview && (
        <div
          className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'
          onClick={() => setModalReview(null)}
        >
          <div
            className='bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[90vh]'
            onClick={(e) => e.stopPropagation()}
          >
            {modalReview.image && (
              <div className='w-full max-h-72 bg-black flex items-center justify-center overflow-hidden'>
                <img
                  src={modalReview.image}
                  alt={`Review photo by ${modalReview.name}`}
                  className='max-h-72 w-full object-contain'
                />
              </div>
            )}
            <div className='p-6 overflow-y-auto flex flex-col gap-3'>
              <div className='flex items-start justify-between'>
                <div>
                  <h4 className='font-bold text-lg text-[#1b6b93]'>{modalReview.name}</h4>
                  <div className='flex items-center gap-2 mt-1'>
                    <Stars rating={modalReview.rating} size={15} />
                    <span className='text-xs text-gray-400'>
                      {getRelativeTime(modalReview.createdAt)}
                    </span>
                    {modalReview.verified && (
                      <span className='text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full'>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setModalReview(null)}
                  className='text-gray-400 hover:text-black text-xl font-bold'
                >
                  ✕
                </button>
              </div>

              {modalReview.title && (
                <h5 className='font-bold text-base text-[#1b6b93] mt-1'>
                  {modalReview.title}
                </h5>
              )}

              <p className='text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mt-1'>
                {modalReview.comment}
              </p>
            </div>
            <div className='px-6 py-3 bg-gray-50 border-t flex justify-end'>
              <button
                onClick={() => setModalReview(null)}
                className='px-5 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductReviews