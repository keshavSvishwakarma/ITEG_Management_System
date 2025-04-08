
// import React, { useState } from "react";
// import axios from "axios";
// import { Formik, form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First Name is required"),
//   lastName: Yup.string().required("Last Name is required"),
//   gender: Yup.string().required("Gender is required"),
//   contactNumber: Yup.string()
//     .required("Contact Number is required")
//     .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian number"),
//   address: Yup.string().required("Address is required"),
//   fathersName: Yup.string().required("Father's Name is required"),
//   fathersContact: Yup.string()
//     .required("Father's Contact is required")
//     .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian number"),
//   track: Yup.string().required("Track is required"),
//   twelfthSubject: Yup.string().required("12th Subject is required"),
//   twelfthPercentage: Yup.number()
//     .required("12th Percentage is required")
//     .min(0, "Too low")
//     .max(100, "Too high"),
//   tenthPercentage: Yup.number()
//     .required("10th Percentage is required")
//     .min(0, "Too low")
//     .max(100, "Too high"),
//   twelfthPassoutYear: Yup.string().required("12th Passout Year is required"),
//   courseOrDiploma: Yup.string().required("Required"),
// });
// const SignupPage = () => {
//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     gender: "",
//     contactNumber: "",
//     address: "",
//     fathersName: "",
//     fathersContact: "",
//     track: "",
//     twelfthSubject: "",
//     twelfthPercentage: "",
//     tenthPercentage: "",
//     twelfthPassoutYear: "",
//     courseOrDiploma: "",
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const response = await axios.post("YOUR_API_ENDPOINT", values);
//       alert("Form submitted successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit the form");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4">
//       <div className="w-full px-8 md:flex  justify-between">
//         <div className="flex">
//           <img
//             className="h-28 object-cover object-fit"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjw8YBC_nn5QPHaP3T1IfWTQTQ6dASsbwpA&s"
//             alt="Placeholder"
//           />
//           <div>
//             <h1 className="text-3xl font-bold mb-6 w-52 mx-8">
//               SANT SINGAJI EDUCATIONAL SOCIETY
//             </h1>
//           </div>
//         </div>
//         <div className="py-4 md:pt-20">
//           <h1 className="text-3xl font-bold text-sky-900 mx-8 w-full">
//             Registration form
//           </h1>
//         </div>
//       </div>
//       <div className="bg-sky-900 w-full h-1 mx-8 "></div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg  w-full "
//       >
//         <h2 className="text-3xl font-bold mb-6 ">Personal Information</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               First Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-orenge-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.firstName && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.firstName}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               Last Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.lastName && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.lastName}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               Gender <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               placeholder="Gender"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             {errors.gender && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.gender}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               Contact Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               placeholder="Contact Number"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.contactNumber && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.contactNumber}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               Father's Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="fathersName"
//               value={formData.fathersName}
//               onChange={handleChange}
//               placeholder="Father's Name"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.fathersName && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.fathersName}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               Father's Contact <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="fathersContact"
//               value={formData.fathersContact}
//               onChange={handleChange}
//               placeholder="Father's Contact"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.fathersContact && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.fathersContact}
//               </p>
//             )}
//           </div>

//           <div className="col-span-1 md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Address"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.address}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block pt-4  text-sm font-medium text-gray-700">
//               Select Track <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="track"
//               value={formData.track}
//               onChange={handleChange}
//               placeholder="Select Track"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             >
//               <option value="">Select Track</option>
//               <option value="track1">Track 1</option>
//               <option value="track2">Track 2</option>
//               <option value="Gopalpur">Gopalpur</option>
//               <option value="Narshullaganj">Narshullaganj</option>
//             </select>
//             {errors.track && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.track}
//               </p>
//             )}
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold my-6  w-full">Academic details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               12th Subject <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="twelfthSubject"
//               value={formData.twelfthSubject}
//               onChange={handleChange}
//               placeholder="12th Subject"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.twelfthSubject && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.twelfthSubject}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               12th Percentage <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="twelfthPercentage"
//               value={formData.twelfthPercentage}
//               onChange={handleChange}
//               placeholder="12th Percentage"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.twelfthPercentage && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.twelfthPercentage}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               10th Percentage <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="tenthPercentage"
//               value={formData.tenthPercentage}
//               onChange={handleChange}
//               placeholder="10th Percentage"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.tenthPercentage && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.tenthPercentage}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block  text-sm font-medium text-gray-700">
//               12th Passout Year <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="twelfthPassoutYear"
//               value={formData.twelfthPassoutYear}
//               onChange={handleChange}
//               placeholder="12th Passout Year"
//               className="mt-1 block w-full border border-gray-300 bg-gray-100 rounded-xl shadow-sm p-3 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:shadow-lg transition-all duration-200"
//             />
//             {errors.twelfthPassoutYear && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.twelfthPassoutYear}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               What do you want to do here{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             <div className="mt-2 space-x-8">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="courseOrDiploma"
//                   value="course"
//                   checked={formData.courseOrDiploma === "course"}
//                   onChange={handleChange}
//                   className="form-radio h-4 w-4 text-red-600 accent-red-600 border-gray-300"
//                 />
//                 <span className="ml-2">Course</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="courseOrDiploma"
//                   value="diploma"
//                   checked={formData.courseOrDiploma === "diploma"}
//                   onChange={handleChange}
//                   className="form-radio h-4 w-4 text-red-600 accent-red-600 border-gray-300"
//                 />
//                 <span className="ml-2">Diploma</span>
//               </label>
//             </div>
//             {errors.courseOrDiploma && (
//               <p className="text-red-500 text-sm font-semibold">
//                 {errors.courseOrDiploma}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="mt-6 flex justify-end">
//           <button
//             type="submit"
//             className="w-40 bg-orange-600 font-bold text-xl text-white py-3 px-4 rounded-full 
//                    relative overflow-hidden transition-all duration-300 ease-in-out
//                    hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700
//                    hover:scale-105 hover:shadow-[0_0_15px_rgba(255,127,0,0.6)]
//                    active:scale-95
//                    before:absolute before:top-0 before:left-0 before:w-full before:h-full 
//                    before:bg-white/10 before:scale-0 before:rounded-full
//                    hover:before:scale-150 hover:before:opacity-0
//                    before:transition-all before:duration-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;




import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian number"),
  address: Yup.string().required("Address is required"),
  fathersName: Yup.string().required("Father's Name is required"),
  fathersContact: Yup.string()
    .required("Father's Contact is required")
    .matches(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian number"),
  track: Yup.string().required("Track is required"),
  twelfthSubject: Yup.string().required("12th Subject is required"),
  twelfthPercentage: Yup.number()
    .required("12th Percentage is required")
    .min(0, "Too low")
    .max(100, "Too high"),
  tenthPercentage: Yup.number()
    .required("10th Percentage is required")
    .min(0, "Too low")
    .max(100, "Too high"),
  twelfthPassoutYear: Yup.string().required("12th Passout Year is required"),
  courseOrDiploma: Yup.string().required("Required"),
});

const SignupPage = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    address: "",
    fathersName: "",
    fathersContact: "",
    track: "",
    twelfthSubject: "",
    twelfthPercentage: "",
    tenthPercentage: "",
    twelfthPassoutYear: "",
    courseOrDiploma: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", values);
      alert("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full px-8 md:flex  justify-between">
        <div className="flex">
          <img
            className="h-28 object-cover object-fit"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjw8YBC_nn5QPHaP3T1IfWTQTQ6dASsbwpA&s"
            alt="Placeholder"
          />
          <div>
            <h1 className="text-3xl font-bold mb-6 w-52 mx-8">
              SANT SINGAJI EDUCATIONAL SOCIETY
            </h1>
          </div>
        </div>
        <div className="py-4 md:pt-20">
          <h1 className="text-3xl font-bold text-sky-1000 mx-8 w-full">
            Registration form
          </h1>
        </div>
      </div>
      <div className="bg-sky-900 w-full h-1 mx-8 "></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="bg-white p-8 rounded-lg  w-full ">
            <h2 className="text-3xl font-bold mb-6 ">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input-style"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input-style"
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Field as="select" name="gender" className="input-style">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  className="input-style"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Name <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="fathersName"
                  placeholder="Father's Name"
                  className="input-style"
                />
                <ErrorMessage
                  name="fathersName"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's Contact <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="fathersContact"
                  placeholder="Father's Contact"
                  className="input-style"
                />
                <ErrorMessage
                  name="fathersContact"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="input-style"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block pt-4 text-sm font-medium text-gray-700">
                  Select Track <span className="text-red-500">*</span>
                </label>
                <Field as="select" name="track" className="input-style">
                  <option value="">Select Track</option>
                  <option value="track1">Track 1</option>
                  <option value="track2">Track 2</option>
                  <option value="Gopalpur">Gopalpur</option>
                  <option value="Narshullaganj">Narshullaganj</option>
                </Field>
                <ErrorMessage
                  name="track"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold my-6 w-full">Academic details</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  12th Subject <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="twelfthSubject"
                  placeholder="12th Subject"
                  className="input-style"
                />
                <ErrorMessage
                  name="twelfthSubject"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  12th Percentage <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="twelfthPercentage"
                  placeholder="12th Percentage"
                  className="input-style"
                />
                <ErrorMessage
                  name="twelfthPercentage"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  10th Percentage <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="tenthPercentage"
                  placeholder="10th Percentage"
                  className="input-style"
                />
                <ErrorMessage
                  name="tenthPercentage"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  12th Passout Year <span className="text-red-500">*</span>
                </label>
                <Field
                  type="date"
                  name="twelfthPassoutYear"
                  className="input-style"
                />
                <ErrorMessage
                  name="twelfthPassoutYear"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  What do you want to do here{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 space-x-8">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="courseOrDiploma"
                      value="course"
                      className="form-radio h-4 w-4 text-red-600 accent-red-600 border-gray-300"
                    />
                    <span className="ml-2">Course</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="courseOrDiploma"
                      value="diploma"
                      className="form-radio h-4 w-4 text-red-600 accent-red-600 border-gray-300"
                    />
                    <span className="ml-2">Diploma</span>
                  </label>
                </div>
                <ErrorMessage
                  name="courseOrDiploma"
                  component="p"
                  className="text-red-500 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="w-40 bg-orange-600 font-bold text-xl text-white py-3 px-4 rounded-full 
                   relative overflow-hidden transition-all duration-300 ease-in-out
                   hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700
                   hover:scale-105 hover:shadow-[0_0_15px_rgba(255,127,0,0.6)]
                   active:scale-95
                   before:absolute before:top-0 before:left-0 before:w-full before:h-full 
                   before:bg-white/10 before:scale-0 before:rounded-full
                   hover:before:scale-150 hover:before:opacity-0
                   before:transition-all before:duration-500"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupPage;
