import { useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Verification() {
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const [resendMessage, setResendMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isResending, setIsResending] = useState(false); // Resending state

  const inputs = useRef(new Array(6).fill(null));

  if (!location.state?.fromInternalNavigation) {
    return <Navigate to="/" replace />;
  }

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e, index) => {
    console.log('input', inputs.current.map((input) => input.value).join(''));
    if (e.target.value) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (!new RegExp(`^[0-9]{${inputs.current.length}}$`).test(text)) {
      return;
    }
    text.split('').forEach((digit, idx) => {
      if (inputs.current[idx]) {
        inputs.current[idx].value = digit;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = inputs.current.map((input) => input.value).join('');
    if (otp.length < 6) {
      setErrorMessage('The OTP field is required.');
    } else {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.post(
          'https://api-lvhi.amrnabih.com/api/email/verify-otp',
          { otp },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to verify OTP.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true); // Start resending state
    try {
      const response = await axios.post(
        'https://api-lvhi.amrnabih.com/api/email/resend-otp',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResendMessage('OTP has been resent to your email.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false); // Stop resending state
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="text-center bg-white px-4 sm:px-8 py-10 rounded-xl md:shadow-xl ">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your Email.
          </p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputs.current[idx] = el)}
                type="text"
                className="w-10 h-10 md:w-14 md:h-14 text-center text-lg md:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded md:p-4 outline-none focus:bg-white focus:border-hover focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onInput={(e) => handleInput(e, idx)}
                onFocus={handleFocus}
                onPaste={handlePaste}
              />
            ))}
          </div>
          {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 transition-colors duration-150 ${isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-primary hover:bg-gradient-to-l hover:from-hover hover:to-primary focus:ring-hover'
                }`}
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          Didn&apos;t receive code?{' '}
          <button
            type="button"
            disabled={isResending} // Disable button when resending
            className={`font-medium ${isResending ? 'text-gray-500 cursor-not-allowed' : 'text-primary hover:text-hover'
              }`}
            onClick={handleResendOtp}
          >
            {isResending ? 'Resending...' : 'Resend'}
          </button>
        </div>
        {resendMessage && <p className="text-primary mt-3">{resendMessage}</p>}
      </div>
    </div>
  );
}

export default Verification;
