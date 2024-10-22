


import LogoSide from '../component/LogoSide';  // adjust the import path if necessary
import WelcomeSide from '../component/WelcomeSide';
function Welcome() {
    return (
        <div className='w-screen h-screen grid grid-cols-1 md:grid-cols-5'>
        <LogoSide />
        <WelcomeSide />
      </div>
    );
}

export default Welcome;
