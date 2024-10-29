import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/images/website/Back_Arrow.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [step, setStep] = useState(1); // To control which step to show
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {};
    if (!first_name) newErrors.first_name = "First name is required.";
    if (!last_name) newErrors.last_name = "Last name is required.";
    if (!slug) newErrors.slug = "Nickname is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!password_confirmation)
      newErrors.password_confirmation = "Please confirm your password.";
    if (step === 2) {
      if (!phone) newErrors.phone = "Phone number is required.";
      if (!birth_date) newErrors.birth_date = "birth_date is required.";
      if (!gender) newErrors.gender = "Please select your gender.";
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0, // returns true if no errors
      errors: newErrors,
    };// returns true if no errors
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const validation = handleValidation();

    if (validation.isValid) {
      setStep(2); // Move to the next step
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validation = handleValidation();

    if (validation.isValid) {
      try {
        const response = await axios.post("https://api-lvhi.amrnabih.com/api/auth/register", {
          first_name,  // Map state variables to API expected keys
          last_name,
          slug,
          email,
          password,
          password_confirmation,
          phone,
          birth_date,   // Map birth_date to API expected key
          gender,
          status: "active",
        });
        // Log the response to the console
        Cookies.set("token", response.data.data.token, { expires: 7 });

        navigate("/");
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          const serverErrors = error.response.data.message;
          const newErrors = {};
          for (const [key, messages] of Object.entries(serverErrors)) {
            newErrors[key] = messages.join(", ");
          }
          setErrors(newErrors); // Update state with server validation errors
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
        className="text-primary w-full flex flex-col justify-center items-center font-poppins"
      >
        <h2 className="font-poppins text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl mb-4">
          Join the LVH<span className="text-[#2c8c99]">I</span> Movement
        </h2>

        <div className="mt-[30px] lg:mt-[30px] xl:mt-[50px] 2xl:mt-[100px] w-full space-y-4 lg:space-y-7">
          {step === 1 && (
            <>
              {/* First Name */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="first_name"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-1 px-2 2xl:py-4 2xl:px-4"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
                {errors.first_name && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.first_name}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="last_name"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.last_name}
                  </span>
                )}
              </div>
              {/* Slug */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="Slug"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Nickname
                </label>
                <input
                  id="slug"
                  type="text"
                  placeholder="Enter your Nickname"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                {errors.last_name && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.slug}
                  </span>
                )}
              </div>

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
              </div>

              {/* Confirm Password */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="confPassword"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Confirm Password
                </label>
                <input
                  id="confPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-1 px-2 2xl:py-4 2xl:px-4"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                />
                {errors.password_confirmation && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.password_confirmation}
                  </span>
                )}
              </div>

              {/* Next Button */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-white  py-2 2xl:text-2xl 2xl:py-3 rounded-full"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Phone */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="phone"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* birth_date */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="date"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  birth_date
                </label>
                <input
                  id="birth_date"
                  type="date"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border py-1 px-2 2xl:py-4 2xl:px-4"
                  value={birth_date}
                  onChange={(e) => setBirth_date(e.target.value)}
                />
                {errors.birth_date && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.birth_date}
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label className="2xl:text-2xl">Gender</label>
                <div className="flex space-x-6 mt-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.gender}
                  </span>
                )}
              </div>

              {/* Back and Signup Buttons */}
              <div className="lg:flex justify-between space-y-5 lg:space-y-0  mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <button
                  type="button"
                  onClick={() => setStep(1)} // Go back to Step 1
                  className={`w-full ${Object.keys(errors).length > 0 ? "bg-red-500" : "bg-[#2c8c99]"} text-white  py-2 2xl:text-2xl 2xl:py-3 rounded-full mr-4`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full bg-primary text-white  py-2 2xl:text-2xl 2xl:py-3 rounded-full"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
