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
    <div className="bg-white_bg h-full w-full col-span-2 flex flex-col md:flex md:flex-col">
      <Link to="/welcome" className="">
        <img src={BackArrow} alt="BackArrow" className="2xl:w-20" />
      </Link>
      <form
        onSubmit={handleSignup}
        className="text-primary mt-14 w-full flex flex-col justify-center items-center font-poppins"
      >
        <h2 className="font-poppins 2xl:text-5xl mb-4">
          Join the LVH<span className="text-[#2c8c99]">I</span> Movement
        </h2>

        <div className="mt-[100px] w-full space-y-7">
          {step === 1 && (
            <>
              {/* First Name */}
              <div className="mx-[190px]">
                <label htmlFor="fname" className="text-2xl">
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
                {errors.fname && (
                  <span className="text-red-500">{errors.fname}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="mx-[190px]">
                <label htmlFor="lname" className="text-2xl">
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
                {errors.lname && (
                  <span className="text-red-500">{errors.lname}</span>
                )}
              </div>

              {/* Email */}
              <div className="mx-[190px]">
                <label htmlFor="email" className="text-2xl">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="mx-[190px]">
                <label htmlFor="password" className="text-2xl">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mx-[190px]">
                <label htmlFor="confPassword" className="text-2xl">
                  Confirm Password
                </label>
                <input
                  id="confPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={conf_password}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                {errors.conf_password && (
                  <span className="text-red-500">{errors.conf_password}</span>
                )}
              </div>

              {/* Next Button */}
              <div className="mx-[190px]">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-white py-2 rounded-full"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Phone */}
              <div className="mx-[190px]">
                <label htmlFor="phone" className="text-2xl">
                  Phone
                </label>
                <input
                  id="phone"
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border-black border py-4 px-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}
              </div>

              {/* Date */}
              <div className="mx-[190px]">
                <label htmlFor="date" className="text-2xl">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full bg-white_bg rounded-2xl border-black/[20%] border py-4 px-4"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date}</span>
                )}
              </div>

              {/* Gender */}
              <div className="mx-[190px]">
                <label className="text-2xl">Gender</label>
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
                  <span className="text-red-500">{errors.gender}</span>
                )}
              </div>

              {/* Back and Signup Buttons */}
              <div className="flex justify-between mx-[190px]">
                <button
                  type="button"
                  onClick={() => setStep(1)} // Go back to Step 1
                  className="w-full bg-[#2c8c99] text-white py-2 rounded-full mr-4"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-full"
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
