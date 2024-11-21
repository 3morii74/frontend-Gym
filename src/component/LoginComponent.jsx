import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/images/website/Back_Arrow.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginService } from "../Services/LoginService";

const Login = () => {
  const { login } = LoginService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stay_logged_in, setStay_logged_in] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0, // returns true if no errors
      errors: newErrors,
    }; // returns true if no errors
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validation = handleValidation();

    if (validation.isValid) {
      const result = await login({ email, password, stay_logged_in });
      if (result instanceof Error) {
        // Handle the error here
        if (result.response) {
          const serverErrors = result.response.data.message;
          const newErrors = {};
          if (serverErrors === "Unauthorized") {
            newErrors["email"] = "Email Or Password is incorrect";
            newErrors["password"] = "Email Or Password is incorrect";
            setErrors(newErrors); // Update state with server validation errors
          } else if (serverErrors === "Email not verified." && result.response.data.access_token) {
            navigate("/verification", { state: { fromInternalNavigation: true } });
            Cookies.set("access_token", result.response.data.access_token, {
              expires: 7,
            });
          }
        } else {
          const newErrors = {};
          newErrors["email"] = "Form has errors. Fix them before submitting.";
          setErrors(newErrors); // Update state with server validation errors
        }
      } else {
        navigate("/"); // Redirect on successful login
      }
    } else {
      console.log("Form has errors. Fix them before submitting.");
    }
  };
  return (
    <div className="bg-white_bg h-full w-full col-span-2 flex flex-col">
      <Link to="/welcome" className="mx-4 my-10 lg:m-10">
        <img
          src={BackArrow}
          alt="BackArrow"
          className="w-9 lg:w-11 xl:w-16 2xl:w-20"
        />
      </Link>
      <form
        onSubmit={handleSignup}
        className="text-primary w-full h-2/4 flex flex-col justify-center items-center font-poppins"
      >
        <h2 className="font-poppins text-lg md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl mb-4">
          Rise & Shine: Log In for Gains!
        </h2>

        <div className=" mt-[30px] lg:mt-[30px] xl:mt-[50px] 2xl:mt-[60px] w-full space-y-8 lg:space-y-7">
          <div className="space-y-5">
            {/* Email */}
            <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
              <label
                htmlFor="email"
                className="text-sm lg:text-base 2xl:text-2xl"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm lg:text-base">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
              <label
                htmlFor="password"
                className="text-sm lg:text-base 2xl:text-2xl"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text-red-500 text-sm lg:text-base">
                  {errors.password}
                </span>
              )}
              <div className="py-1">
                <a
                  href="/forgot-password" // Link to the forgot password page
                  className="text-sm justify-self-end text-primary  transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="space-y-2 pt-4">

                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="stay-log-in"
                      checked={stay_logged_in}
                      onChange={() => setStay_logged_in(!stay_logged_in)}
                      className="sr-only peer" // Hide default checkbox
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-primary transition-colors"></div>
                    <div
                      className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                   peer-checked:translate-x-5"
                    ></div>
                  </div>
                  <span className="text-gray-700 font-medium">Stay logged in</span>
                </label>


              </div>

            </div>
            {/* stay log in */}
          </div>
          {/* login Buttons */}
          <div className="lg:flex justify-between space-y-5 lg:space-y-0  mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
            <button
              type="submit"
              className="w-full bg-primary text-white  py-2 2xl:text-2xl 2xl:py-3 rounded-full"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
