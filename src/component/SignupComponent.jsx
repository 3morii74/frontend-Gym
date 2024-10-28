import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/images/website/Back_Arrow.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1); // To control which step to show
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConfPassword] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {};
    if (!fname) newErrors.fname = "First name is required.";
    if (!lname) newErrors.lname = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!conf_password)
      newErrors.conf_password = "Please confirm your password.";
    if (step === 2) {
      if (!phone) newErrors.phone = "Phone number is required.";
      if (!date) newErrors.date = "Date is required.";
      if (!gender) newErrors.gender = "Please select your gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setStep(2); // Move to the next step
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post("https://your-api-url.com/signup", {
          fname,
          lname,
          email,
          password,
          phone,
          date,
          gender,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Signup error:", error);
      }
    } else {
      console.log("Form has errors. Fix them before submitting.");
    }
  };

  return (
    <div className="bg-white_bg h-full w-full col-span-2 flex flex-col  flex  flex-col">
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
                  htmlFor="fname"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-1 px-2 2xl:py-4 2xl:px-4"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                {errors.fname && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.fname}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="lname"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border  py-1 px-2 2xl:py-4 2xl:px-4"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                {errors.lname && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.lname}
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
                  value={conf_password}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                {errors.conf_password && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.conf_password}
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

              {/* Date */}
              <div className=" mx-[50px] lg:mx-[80px] xl:mx-[120px] 2xl:mx-[190px]">
                <label
                  htmlFor="date"
                  className="text-sm lg:text-base 2xl:text-2xl"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border py-1 px-2 2xl:py-4 2xl:px-4"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm lg:text-base">
                    {errors.date}
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
                  className="w-full bg-[#2c8c99] text-white  py-2 2xl:text-2xl 2xl:py-3 rounded-full mr-4"
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
