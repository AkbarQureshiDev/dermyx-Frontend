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

const ProductReviews = ({ productId }) => {

  const { backendUrl, token, navigate } = useContext(ShopContext)
  const [reviews, setReviews] = useState([])
  const [summary, setSummary] = useState({ average: 0, total: 0, breakdown: [] })
  const [sort, setSort] = useState('recent')
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  const [openForm, setOpenForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
    // Guests don't have an account name to fall back on.
    if (!token && !name.trim()) {
      toast.error('Please add the name to show on your review.')
      return
    }
    setSubmitting(true)
    try {
      const response = await axios.post(
        backendUrl + '/api/review/add',
        { productId, rating, comment, name },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        setComment('')
        setName('')
        setOpenForm(false)
        await load()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
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

  const visible = showAll ? reviews : reviews.slice(0, 3)

  return (
    <div className='mt-14 md:w-4/5' id="reviews">

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

      {/* Write a review — guests can post one too, no account needed */}
      <div className='mt-6'>
        {openForm ? (
          <form onSubmit={submitReview} className='border rounded-xl p-5 bg-white flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-gray-700'>Your rating</span>
              <div className='flex items-center gap-1' onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    className="cursor-pointer"
                  >
                    <span style={{ color: (hover || rating) >= star ? '#facc15' : '#d1d5db' }}>
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              maxLength={60}
              required={!token}
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black'
              placeholder='Your name (shown publicly)'
            />

            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              rows={4}
              maxLength={1000}
              required
              className='border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black resize-none'
              placeholder='How did it work for your skin? Texture, results, packaging — anything useful.'
            />

            <div className='flex items-center justify-between'>
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
                  className='px-5 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-60'
                >
                  {submitting ? 'POSTING...' : 'PUBLISH REVIEW'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setOpenForm(true)}
            className='w-full border-2 border-black text-black px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors'
          >
            WRITE A REVIEW
          </button>
        )}
      </div>

      {/* Sort */}
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

      {/* List */}
      <div className='mt-4 flex flex-col divide-y divide-gray-100'>
        {loading ? (
          <p className='text-sm text-gray-400 py-6'>Loading reviews…</p>
        ) : visible.length === 0 ? (
          <p className='text-sm text-gray-500 py-6 border rounded-lg px-4'>
            No reviews yet — be the first to tell others how it worked for you.
          </p>
        ) : visible.map((review) => (
          <div key={review._id} className='py-5 flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-semibold flex-shrink-0'>
                {(review.name || 'C').charAt(0).toUpperCase()}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <p className='text-sm font-medium text-gray-800 truncate'>{review.name}</p>
                  {review.verified && (
                    <span className='text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full'>
                      VERIFIED PURCHASE
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-2 mt-0.5'>
                  <Stars rating={review.rating} size={12} />
                  <span className='text-[11px] text-gray-400'>
                    {new Date(review.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            </div>

            <p className='text-sm text-gray-600 leading-relaxed'>{review.comment}</p>

            <button
              onClick={() => voteHelpful(review)}
              className='self-start text-xs text-gray-500 hover:text-black border border-gray-200 rounded-full px-3 py-1 transition-colors'
            >
              👍 Helpful ({review.helpful || 0})
            </button>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className='mt-4 text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black'
        >
          {showAll ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  )
}

export default ProductReviews
