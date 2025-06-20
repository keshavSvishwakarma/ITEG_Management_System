import { useState } from "react";
import { useForgetPasswordMutation } from "../../../redux/api/authApi";
import logo from "../../../assets/images/logo-ssism.png";
import bg from "../../../assets/images/forgetBg.png";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [forgetPassword, { isLoading, isSuccess, isError, error }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword({ email }).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="SSISM Logo" className="h-20 w-auto" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">Forget Password</h2>
        </div>

        {submitted && isSuccess ? (
          <div className="text-green-600 text-center text-sm">
            Password reset link sent to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-12 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Email"
              />
            </div>
            {isError && (
              <div className="text-red-600 text-sm">
                {error?.data?.message || "Failed to send reset email."}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-full mt-2 hover:bg-orange-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


// import logo from "../../../assets/images/logo-ssism.png";
// import ReusableForm from "../../../ReusableForm";
// import EmailField from "../common-feild/EmailField";
// import { loginValidationSchema } from "../../../validationSchema";
// import { useNavigate } from "react-router-dom";
// // import {  useForgetPasswordMutation} from "../../../redux/api/authApi/"
// const ForgetPassword = () => {
//   const navigate = useNavigate();
//   const initialValues = {
//     email: "",
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-10 rounded-lg w-full max-w-sm">
//         <div className="flex flex-col items-center">
//           <img src={logo} alt="SSISM Logo" className="h-20 w-30" />
//           <h2 className="text-xl font-bold text-gray-800 mt-2">
//             Forget Password
//           </h2>
//         </div>

//         {/* ✅ ReusableForm properly used */}
//         <ReusableForm
//           initialValues={initialValues}
//           validationSchema={loginValidationSchema}
//         >
//           {(values, handleChange) => (
//             <>
//               <div className="mt-4">
//                 <EmailField value={values.email} onChange={handleChange} />
//               </div>

//               <button
//                 onClick={navigate("/confirm-password")}
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-3 rounded-full mt-4 hover:bg-orange-600 transition"
//               >
//                 Get Link
//               </button>
//             </>
//           )}
//         </ReusableForm>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
