import React from 'react';
import Arm from '../assets/images/website/arm.png';
import Slug from '../assets/images/website/slug.png';
import Lvhi from '../assets/images/website/lvhi.png';
import AtSign from '../assets/images/welcome/At_sign.png';
import Facebook from '../assets/images/welcome/facebook.png';
import Instagram from '../assets/images/welcome/Instagram.png';
import WhatsApp from '../assets/images/welcome/WhatsApp.png';

function Welcome() {
    return (
        <div className='w-full h-screen grid grid-cols-1 md:grid-cols-5'>
            {/* Left side (images + slogan) */}
            <div className='bg-primary h-full  md:col-span-3 hidden md:flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    {/* Stacked Images */}
                    <img src={Arm} alt="Arm Logo" className="h-[100px] lg:h-[200px] mb-4" />
                    <img src={Lvhi} alt="LVHI Logo" className="w-[200px] lg:w-[300px] " />

                    {/* Slogan */}
                    <div className='flex justify-start items-end'>
                        <p className='font-Inter text-sm lg:text-base tracking-[0.15em] text-white_bg text-center mb-2'>Unleash Your Strength With LVHI</p>
                        <img src={Slug} alt="Slug" className="h-8 lg:h-14" />
                    </div>
                </div>
            </div>

            {/* Right side (welcome text + buttons) */}
            <div className='relative bg-white_bg h-full col-span-2 flex flex-col md:flex md:flex-col  justify-center items-center pl-10'>
                <div className='flex flex-col space-y-14 lg:pr-10'>
                    {/* Welcome Title */}
                    <h1 className='font-Inter font-bold text-2xl lg:text-5xl text-black/[62%]'>WELCOME</h1>

                    {/* Welcome Text */}
                    <p className='font-Inter text-xs mr-5 lg:mr-0 lg:text-sm font-normal text-black'>
                        Since our launch, we've dedicated ourselves to building a space where fitness thrives.
                        Our focus on personalized training programs, engaging workout reels, progress tracking,
                        and expert tips ensures every member reaches their goals at LVHI.
                    </p>

                    {/* Buttons (Sign Up + Login) */}
                    <div className='space-y-4 flex flex-col lg:flex-row lg:space-y-0 justify-between items-center'>
                        <div className='w-40 h-8 bg-primary rounded-3xl text-white_bg flex justify-center items-center'>Sign Up</div>
                        <div className='w-40 h-8 bg-primary rounded-3xl text-white_bg flex justify-center items-center'>Login</div>
                    </div>
                    {/* Social Icons */}
                    <div className='absolute right-10 bottom-5 flex space-x-4 pt-10 justify-self-end'>
                        <img src={AtSign} alt="At Sign" className="h-5 lg:h-6" />
                        <img src={Facebook} alt="Facebook" className="h-5 lg:h-6" />
                        <img src={Instagram} alt="Instagram" className="h-5 lg:h-6" />
                        <img src={WhatsApp} alt="WhatsApp" className="h-5 lg:h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
