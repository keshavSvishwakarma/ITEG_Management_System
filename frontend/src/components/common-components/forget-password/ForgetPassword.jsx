import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ErrorMessage } from "formik";
import CryptoJS from "crypto-js";
import { useLoginMutation } from "../../../redux/auth/authApiSlice";
import ReusableForm from "../../../ReusableForm";
import EmailField from "../common-feild/EmailField";
import logo from "../../../assets/images/logo-ssism.png"; // replace with your logo path
import { loginValidationSchema } from "../../../validationSchema"; // make sure you have this

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const secretKey = "ITEG@123"; // AES encryption key

  const initialValues = {
    email: "",
  };

  const handleLoginSubmit = async (values) => {
    try {
      const response = await login(values).unwrap();

      // Encrypt token
      const encryptedToken = CryptoJS.AES.encrypt(
        response.token,
        secretKey
      ).toString();

      // Store in localStorage
      localStorage.setItem("token", encryptedToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("positionRole", response.user.positionRole);

      navigate("/", { replace: true });
    } catch (error) {
      setLoginError(error?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white  p-10 rounded-lg w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img src={logo} alt="SSISM Logo" className="h-20 w-30" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">
            Enter Your Email
          </h2>
        </div>

        <ReusableForm
          initialValues={initialValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginValidationSchema}
        >
          {(values, handleChange) => (
            <>
              <div className="mt-2">
                <EmailField value={values.email} onChange={handleChange} />
                {/* <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-0"
                /> */}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full  bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Get Link"}
                </button>
              </div>

              {loginError && (
                <div className="text-red-500 text-sm mt-1 text-center">
                  {loginError}
                </div>
              )}
            </>
          )}
        </ReusableForm>
      </div>
    </div>
  );
};

export default ForgetPassword;
