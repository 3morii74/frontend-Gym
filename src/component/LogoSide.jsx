import Arm from '../assets/images/website/arm.png';
import Slug from '../assets/images/website/slug.png';
import Lvhi from '../assets/images/website/lvhi.png';

const LogoSide = () => {
  return (
    <div className='bg-primary h-full md:col-span-3 hidden md:flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        {/* Stacked Images */}
        <img src={Arm} alt="Arm Logo" className="md:h-[150px] lg:h-[200px] mb-4 xl:h-[260px] 2xl:h-[300px]" />
        <img src={Lvhi} alt="LVHI Logo" className="md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px]" />

        {/* Slogan */}
        <div className='relative flex justify-start items-end'>
          <p className='font-poppins text-sm md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl tracking-[0.15em] text-white_bg text-center mb-2'>
            Unleash Your Strength With LVHI
          </p>
          <img src={Slug} alt="Slug" className="absolute h-8 lg:h-11 xl:h-12 2xl:h-18 md:left-[265px] lg:left-[375px] xl:left-[450px] 2xl:left-[576px]" />
        </div>
      </div>
    </div>
  );
}

export default LogoSide;
