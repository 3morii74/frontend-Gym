
import Arm from '../assets/images/website/arm.png';
import Search from '../assets/images/website/Search.png';
import ImgTest from '../assets/images/test/logo.png';
// eslint-disable-next-line react/prop-types
function NavBar({ backgroundColor }) {
    return (
        <div className={`w-full h-10 ${backgroundColor} px-16`}>
            <nav className="flex justify-between items-center h-full">
                <div className="flex space-x-2 items-center">
                    <img src={Arm} alt="Arm Logo" className="h-8 w-8" />
                    <h1 className="text-2xl self-end font-bold font-inter text-white">
                        LVH<span className="text-hover">I</span>
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <img
                                src={Search}
                                alt="Search"
                                className="w-10 aspect-square"
                            />
                        </li>
                        <li>
                            <a
                                className="font-extralight bg-gradient-to-r from-white to-[#2B9DB6] bg-clip-text text-transparent"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="font-extralight bg-gradient-to-r from-white to-[#2B9DB6] bg-clip-text text-transparent"
                                href="/"
                            >
                                My Workout
                            </a>
                        </li>
                        <li>
                            <a
                                className="font-extralight bg-gradient-to-r from-white to-[#2B9DB6] bg-clip-text text-transparent"
                                href="/"
                            >
                                My Profile
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center items-center space-x-3">
                    <img className='w-10 aspect-square' src={ImgTest} />
                    <p className='font-name text-white'>Amr M</p>
                </div>
            </nav>
        </div>

    );
}

export default NavBar;