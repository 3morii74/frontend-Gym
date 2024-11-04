import Lvhi from '../assets/images/website/lvhi.png';
import Arm from '../assets/images/website/arm.png';

function NavBar({ backgroundColor }) {
    return (
        <div className={`w-full h-10 ${backgroundColor}`}>
            <nav className='flex'>
                <img src={Arm} alt="Arm Logo" className="md:h-[50px] lg:h-[150px] mb-4 xl:h-[50px] 2xl:h-[200px]" />
                <img src={Lvhi} alt="LVHI Logo" className="md:w-[250px] lg:w-[300px] xl:h-[250px] 2xl:w-[500px]" />
                <ul className="flex space-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/workout">Workout</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;