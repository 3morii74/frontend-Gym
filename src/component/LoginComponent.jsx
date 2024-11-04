import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/images/website/Back_Arrow.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
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
      try {
        const response = await axios.post(
          "https://api-lvhi.amrnabih.com/api/auth/login",
          {
            email,
            password,
            stay_logged_in,
          }
        );
        console.log(response);
        // Log the response to the console
        Cookies.set("access_token", response.data.data.access_token, {
          expires: 7,
        });

        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.response) {
          const serverErrors = error.response.data.message;
          const newErrors = {};
          if (serverErrors == "Unauthorized") {
            newErrors["email"] = "Email Or Password is incorrect";
            newErrors["password"] = "Email Or Password is incorrect";
            setErrors(newErrors); // Update state with server validation errors
          }
        } else {
          console.error("Sign up error:", error);
        }
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
        <h2 className="font-poppins text-2xl md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl mb-4">
          Rise & Shine: Log In for Gains!
        </h2>

        <div className=" mt-[30px] lg:mt-[30px] xl:mt-[50px] 2xl:mt-[60px] w-full space-y-8 lg:space-y-7">
          <div>
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
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="stay-log-in"
                  checked={stay_logged_in}
                  onChange={() => setStay_logged_in(!stay_logged_in)} // Toggle the value
                  className="mr-2"
                />
                Stay logged in
              </label>
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
