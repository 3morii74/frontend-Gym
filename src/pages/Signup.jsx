import LogoSide from "../component/LogoSide"; // adjust the import path if necessary
import SignupComponent from "../component/SignupComponent"; // adjust the import path if necessary

const Signup = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-5">
      <SignupComponent />
      <LogoSide />
    </div>
  );
};

export default Signup;
