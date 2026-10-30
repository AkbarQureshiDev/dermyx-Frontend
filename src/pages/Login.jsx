import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextValue';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [busy, setBusy] = useState(false);

  // Forgot password flow states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSendResetCode = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setBusy(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/forgot-password', { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit verification code');
      return;
    }
    if (!newPassword || newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      toast.error('Password must be at least 8 characters and include a letter and a number');
      return;
    }
    setBusy(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/reset-password', {
        email,
        otp,
        newPassword
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset states and return to login
        setOtp('');
        setNewPassword('');
        setPasword('');
        setOtpSent(false);
        setCurrentState('Login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setBusy(false);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (busy) return;

    if (currentState === 'Forgot Password') {
      if (!otpSent) {
        await handleSendResetCode();
      } else {
        await handleResetPassword();
      }
      return;
    }

    setBusy(true);
    try {
      if (currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          // Sign up always uses localStorage
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password, rememberMe });
        if (response.data.success) {
          setToken(response.data.token);
          if (rememberMe) {
            // Persist across browser sessions (30 days)
            localStorage.setItem('token', response.data.token);
            sessionStorage.removeItem('token');
          } else {
            // Only for this session, cleared on tab/browser close
            sessionStorage.setItem('token', response.data.token);
            localStorage.removeItem('token');
          }
        } else {
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (token) {
      const redirect = sessionStorage.getItem('redirectAfterLogin');
      if (redirect) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirect);
      } else {
        navigate('/');
      }
    }
  }, [token]);

  // Helper to switch modes cleanly
  const switchMode = (mode) => {
    setCurrentState(mode);
    setOtpSent(false);
    setOtp('');
    setNewPassword('');
    setShowPassword(false);
    setShowNewPassword(false);
  };

  return (
    <div className='w-full min-h-[70vh] flex flex-col justify-center items-center pt-16 sm:pt-24 pb-24'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2'>
        <p className='prata-regular text-3xl'>
          {currentState === 'Forgot Password' ? 'Reset Password' : currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Forgot Password Flow */}
      {currentState === 'Forgot Password' ? (
        <>
          {!otpSent ? (
            <>
              <p className='text-xs sm:text-sm text-gray-600 text-center -mt-1 mb-1 leading-relaxed'>
                Enter your registered email address and we will send you a 6-digit verification code to reset your password.
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Email Address'
                required
              />
              <button
                type='submit'
                disabled={busy}
                className={`w-full font-light px-8 py-2.5 mt-2 transition-colors ${busy ? 'bg-gray-400 text-white cursor-wait' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {busy ? 'SENDING CODE...' : 'SEND RESET CODE'}
              </button>
              <p
                onClick={() => switchMode('Login')}
                className='text-sm text-gray-600 hover:text-black hover:underline cursor-pointer mt-2'
              >
                Back to Login
              </p>
            </>
          ) : (
            <>
              <p className='text-xs sm:text-sm text-gray-600 text-center -mt-1 mb-1 leading-relaxed'>
                A 6-digit reset code has been sent to <span className='font-medium text-gray-900'>{email}</span>. Enter the code and your new password below.
              </p>

              <input
                onChange={(e) => setOtp(e.target.value.trim())}
                value={otp}
                type="text"
                maxLength={6}
                className='w-full px-3 py-2 border border-gray-800 text-center tracking-widest text-lg font-mono'
                placeholder='6-digit code'
                required
              />

              <div className='relative w-full'>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                  className='w-full px-3 py-2 pr-10 border border-gray-800'
                  placeholder='New Password (8+ chars, letter + number)'
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer p-1'
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <button
                type='submit'
                disabled={busy}
                className={`w-full font-light px-8 py-2.5 mt-2 transition-colors ${busy ? 'bg-gray-400 text-white cursor-wait' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {busy ? 'RESETTING...' : 'SET NEW PASSWORD'}
              </button>

              <div className='w-full flex justify-between items-center text-sm mt-1'>
                <button
                  type='button'
                  onClick={handleSendResetCode}
                  disabled={busy}
                  className='text-xs sm:text-sm text-gray-600 hover:text-black hover:underline cursor-pointer disabled:opacity-50'
                >
                  Resend Code
                </button>
                <p
                  onClick={() => switchMode('Login')}
                  className='text-xs sm:text-sm text-gray-600 hover:text-black hover:underline cursor-pointer'
                >
                  Back to Login
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        /* Login and Sign Up Flow */
        <>
          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className='w-full px-3 py-2 border border-gray-800'
              placeholder='Name'
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email'
            required
          />

          <div className='relative w-full'>
            <input
              onChange={(e) => setPasword(e.target.value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              className='w-full px-3 py-2 pr-10 border border-gray-800'
              placeholder='Password'
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer p-1'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className='w-full flex justify-between items-center text-sm mt-[-8px]'>
            {currentState === 'Login' ? (
              <label className='flex items-center gap-2 cursor-pointer select-none'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className='w-3.5 h-3.5 accent-black cursor-pointer'
                />
                <span className='text-gray-600'>Remember me</span>
              </label>
            ) : (
              <span />
            )}

            {currentState === 'Login' && (
              <p
                onClick={() => switchMode('Forgot Password')}
                className='cursor-pointer text-gray-600 hover:text-black hover:underline'
              >
                Forgot your password?
              </p>
            )}
          </div>

          <div className='w-full flex justify-end text-sm mt-[-6px]'>
            {currentState === 'Login' ? (
              <p onClick={() => switchMode('Sign Up')} className='cursor-pointer text-gray-800 hover:underline'>
                Don't have an account? <span className='font-medium text-black'>Create account</span>
              </p>
            ) : (
              <p onClick={() => switchMode('Login')} className='cursor-pointer text-gray-800 hover:underline'>
                Already have an account? <span className='font-medium text-black'>Login Here</span>
              </p>
            )}
          </div>

          <button
            disabled={busy}
            className={`font-light px-8 py-2 mt-4 transition-colors ${busy ? 'bg-gray-400 text-white cursor-wait' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            {busy ? 'PLEASE WAIT...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
          </button>
        </>
      )}
    </form>
    </div>
  )
}

export default Login;
