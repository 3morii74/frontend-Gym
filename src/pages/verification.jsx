import { useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
function Verification() {
  const location = useLocation();

  const inputs = useRef(new Array(6).fill(null));
  // Check if the route was accessed through internal navigation
  if (!location.state?.fromInternalNavigation) {
    return <Navigate to="/" replace />; // Redirect to home if accessed directly
  }

  const handleKeyDown = (e, index) => {
    if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
      e.preventDefault();
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e, index) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputs.current.map(input => input.value).join('');
    console.log('Entered OTP:', otp); // Replace with actual verification logic
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className=" text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">Enter the 6-digit verification code that was sent to your Email.</p>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => inputs.current[idx] = el}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onInput={(e) => handleInput(e, idx)}
                onFocus={handleFocus}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">Didn&apos;t receive code? <a className="font-medium text-primary hover:text-indigo-600" href="#0">Resend</a></div>
      </div>
    </div>

  );
}

export default Verification