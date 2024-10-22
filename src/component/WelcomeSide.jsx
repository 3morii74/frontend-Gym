import AtSign from '../assets/images/welcome/At_sign.png';
import Facebook from '../assets/images/welcome/facebook.png';
import Instagram from '../assets/images/welcome/Instagram.png';
import WhatsApp from '../assets/images/welcome/WhatsApp.png';

const WelcomeSide = () => {
  return (
    <div className='relative bg-white_bg h-full w-full col-span-2 flex flex-col md:flex md:flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center space-y-14'>
        {/* Welcome Title */}
        <h1 className='font-Inter font-bold text-4xl lg:text-4xl 2xl:text-7xl text-black/[62%]'>WELCOME</h1>

        {/* Welcome Text */}
        <p className='font-Inter text-center px-8 text-xs lg:text-base xl:text-lg 2xl:text-2xl font-normal text-black'>
          Since our launch, we&apos;ve dedicated ourselves to building a space where fitness thrives.
          Our focus on personalized training programs, engaging workout reels, progress tracking,
          and expert tips ensures every member reaches their goals at LVHI.
        </p>

        {/* Buttons (Sign Up + Login) */}
        <div className='lg:space-x-32 space-y-4 lg:space-y-0 md:space-x-0 2xl:space-x-40 w-full px-8 font-bold flex text-base 2xl:text-3xl lg:text-lg flex-col lg:flex-row justify-center items-center'>
          <div className='h-8 py-5 lg:py-5 w-1/2 md:py-5 xl:py-6 2xl:py-8 bg-primary rounded-3xl text-white_bg flex justify-center items-center'>Sign Up</div>
          <div className='h-8 py-5 lg:py-5 w-1/2 md:py-5 xl:py-6 2xl:py-8 bg-primary rounded-3xl text-white_bg flex justify-center items-center'>Login</div>
        </div>

        {/* Social Icons */}
        <div className='absolute w-full bottom-10 pt-10'>
          <div className='flex space-x-4 justify-start pl-11'>
            <img src={AtSign} alt="At Sign" className="h-8 lg:h-7 xl:h-7 2xl:h-9" />
            <img src={Facebook} alt="Facebook" className="h-8 lg:h-7 xl:h-7 2xl:h-9" />
            <img src={Instagram} alt="Instagram" className="h-8 lg:h-7 xl:h-7 2xl:h-9" />
            <img src={WhatsApp} alt="WhatsApp" className="h-8 lg:h-7 xl:h-7 2xl:h-9" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSide;
