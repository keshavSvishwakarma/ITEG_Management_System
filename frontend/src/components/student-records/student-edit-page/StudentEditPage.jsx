import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import UserProfile from "../../common-components/user-profile/UserProfile";

const StudentEditPage = () => {
  // const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  ); // Set default or placeholder
  const location = useLocation();
  // const navigate = useNavigate();
  const studentData = location.state?.student || {};

  const [formData, setFormData] = useState({
    firstName: studentData.name || "",
    lastName: "",
    contactNumber: studentData.mobile || "",
    fatherName: studentData.fatherName || "",
    gender: "",
    track: studentData.course || "",
    address: studentData.village || "",
    "12th Subject": "",
    "12th Percentage": "",
    "10th Percentage": "",
    passoutYear: "",
    courseType: "Course",
    itegLevels: [],
    permission: false,
    permissionReason: "",
    placed: false,
    companyName: "",
    placementDate: "",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  // const [imageSrc] = useState(
  //   "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  // );

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "itegLevels") {
      setFormData((prevData) => ({
        ...prevData,
        itegLevels: checked
          ? [...prevData.itegLevels, value]
          : prevData.itegLevels.filter((level) => level !== value),
      }));
    } else if (type === "checkbox" || type === "radio") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.contactNumber.match(/^\d{10}$/))
      newErrors.contactNumber = "Enter a valid 10-digit number";
    if (!formData.fatherName)
      newErrors.fatherName = "Father's name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.track) newErrors.track = "Track is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.twelfthSubject)
      newErrors.twelfthSubject = "12th subject is required";
    if (!formData.twelfthPercentage.match(/^\d{1,2}(\.\d{1,2})?$/))
      newErrors.twelfthPercentage = "Enter a valid percentage";
    if (!formData.tenthPercentage.match(/^\d{1,2}(\.\d{1,2})?$/))
      newErrors.tenthPercentage = "Enter a valid percentage";
    if (!formData.passoutYear.match(/^\d{4}$/))
      newErrors.passoutYear = "Enter a valid year";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <UserProfile showBackButton heading="Student Edit Page" />
      <div className="w-[80vw] p-3 min-h-screen ">
        <button
          type="button"
          className="absolute right-8 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg"
        >
          {" "}
          Save
        </button>

        <div className="flex items-center space-x-4 mt-4">
          <div
            className="relative w-40 h-40 rounded-full border-4 border-dotted border-orange-500 cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              className="w-full h-full rounded-full object-cover p-2"
              src={imageSrc}
              alt="Profile"
            />
            {/* Camera Icon */}
            <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2">
              <FaCamera className="text-white text-lg" />
            </div>
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <h3 className="mt-6 text-2xl font-semibold">Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(formData)
              .slice(0, 7)
              .map((key) => (
                <label key={key} className="block font-medium">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={` ${key
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    className="p-3 border text-sm border-gray-300 bg-slate-50 rounded-xl w-full"
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-sm">{errors[key]}</p>
                  )}
                </label>
              ))}
          </div>

          {/* Academic Details */}
          <h3 className="mt-6 text-2xl font-semibold">Academic Details</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(formData)
              .slice(7, 10)
              .map((key) => (
                <label key={key} className="block font-medium">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={` ${key
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    className="p-3 border border-gray-300 bg-slate-50 rounded-lg w-full"
                  />
                  {errors[key] && (
                    <p className="text-red-500 text-sm">{errors[key]}</p>
                  )}
                </label>
              ))}
          </div>

          {/* Course Selection */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="block font-medium">
              12th Passout Year
              <input
                type="text"
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="p-3 border border-gray-300 bg-slate-50 rounded-lg w-full"
              />
              {errors.passoutYear && (
                <p className="text-red-500 text-sm">{errors.passoutYear}</p>
              )}
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="courseType"
                  value="Course"
                  checked={formData.courseType === "Course"}
                  onChange={handleChange}
                  className="mr-2 accent-red-600"
                />{" "}
                Course
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="courseType"
                  value="Diploma"
                  checked={formData.courseType === "Diploma"}
                  onChange={handleChange}
                  className="mr-2 accent-red-600"
                />{" "}
                Diploma
              </label>
            </div>
          </div>
          <h3 className="mt-6 text-2xl font-semibold">Iteg Levels</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              "1A Level",
              "1B Level",
              "1C Level",
              "2A Level",
              "2B Level",
              "2C Level",
            ].map((level) => (
              <label key={level} className="inline-flex items-center">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="checkbox"
                  name="itegLevels"
                  value={level}
                  checked={formData.itegLevels.includes(level)}
                  onChange={handleChange}
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>

          <h3 className="mt-6 text-2xl font-semibold">Permission</h3>
          <div className="flex items-center mt-4">
            <label className="inline-flex items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                name="permission"
                checked={formData.permission}
                onChange={handleChange}
              />
              <span className="ml-2">Permission</span>
            </label>
            {formData.permission && (
              <input
                type="text"
                name="permissionReason"
                value={formData.permissionReason}
                onChange={handleChange}
                placeholder="Reason..."
                className="ml-4 p-2 border rounded-lg"
              />
            )}
          </div>

          <h3 className="mt-6 text-2xl font-semibold">Placed</h3>
          <div className="flex items-center mt-4">
            <label className="inline-flex items-center">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                name="placed"
                checked={formData.placed}
                onChange={handleChange}
              />
              <span className="ml-2">Placed</span>
            </label>
          </div>
          {formData.placed && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="p-2 border rounded-lg"
              />
              <input
                type="date"
                name="placementDate"
                value={formData.placementDate}
                onChange={handleChange}
                className="p-2 border rounded-lg"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg"
            >
              Reject
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg"
            >
              Select
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentEditPage;

// import { useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaCamera } from "react-icons/fa";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import UserProfile from "../../common-components/user-profile/UserProfile";
// import TextInput from "../../common-components/common-feild/TextInput";
// import SelectInput from "../../common-components/common-feild/SelectInput";
// import RadioGroup from "../../common-components/common-feild/RadioGroup";
// import CheckboxGroup from "../../common-components/common-feild/CheckboxGroup";

// const StudentEditPage = () => {
//   const fileInputRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(
//     "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
//   );
//   const location = useLocation();
//   const studentData = location.state?.student || {};

//   const initialValues = {
//     firstName: studentData.name || "",
//     lastName: "",
//     contactNumber: studentData.mobile || "",
//     fatherName: studentData.fatherName || "",
//     gender: "",
//     track: studentData.course || "",
//     address: studentData.village || "",
//     twelfthSubject: "",
//     twelfthPercentage: "",
//     tenthPercentage: "",
//     passoutYear: "",
//     courseType: "Course",
//     itegLevels: [],
//     permission: false,
//     permissionReason: "",
//     placed: false,
//     companyName: "",
//     placementDate: "",
//     imageSrc: imageSrc,
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     contactNumber: Yup.string()
//       .matches(/^\d{10}$/, "Must be a valid 10-digit number")
//       .required("Contact number is required"),
//     twelfthPercentage: Yup.number()
//       .typeError("Enter a valid percentage")
//       .min(0)
//       .max(100)
//       .required("12th percentage is required"),
//     tenthPercentage: Yup.number()
//       .typeError("Enter a valid percentage")
//       .min(0)
//       .max(100)
//       .required("10th percentage is required"),
//     passoutYear: Yup.string().required("Passout year is required"),
//   });

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e, setFieldValue) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//         setFieldValue("imageSrc", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (values) => {
//     console.log("Submitted values:", values);
//   };

//   return (
//     <div className="w-[80vw] p-4 min-h-screen">
//       <UserProfile showBackButton heading="Student Edit Page" />

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue }) => (
//           <Form className="space-y-10">
//             {/* Save Button */}
//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-lg"
//               >
//                 Save
//               </button>
//             </div>

//             {/* Profile Image Upload */}
//             <div className="flex items-center space-x-6">
//               <div
//                 className="relative w-40 h-40 rounded-full border-4 border-dotted border-orange-500 cursor-pointer"
//                 onClick={handleImageClick}
//               >
//                 <img
//                   className="w-full h-full rounded-full object-cover p-2"
//                   src={imageSrc}
//                   alt="Profile"
//                 />
//                 <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2">
//                   <FaCamera className="text-white text-lg" />
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, setFieldValue)}
//                 />
//               </div>
//             </div>

//             {/* Personal Info */}
//             <div>
//               <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <TextInput label="First Name" name="firstName" />
//                 <TextInput label="Last Name" name="lastName" />
//                 <TextInput label="Contact Number" name="contactNumber" />
//                 <TextInput label="Father's Name" name="fatherName" />
//                 <SelectInput
//                   label="Gender"
//                   name="gender"
//                   options={[
//                     { value: "male", label: "Male" },
//                     { value: "female", label: "Female" },
//                   ]}
//                 />
//                 <SelectInput
//                   label="Track"
//                   name="Select Track"
//                   options={[
//                     { value: "", label: "Harda" },
//                     { value: "Internship", label: "Khategaon" },
//                   ]}
//                 />
//                 <TextInput label="Address" name="address" />
//               </div>
//             </div>

//             {/* Academic Info */}
//             <div>
//               <h2 className="text-2xl font-bold mb-4  pt-6 border-t-2 border-orange-500">
//                 Academic Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <TextInput label="12th Subject" name="twelfthSubject" />
//                 <TextInput label="12th Percentage" name="twelfthPercentage" />
//                 <TextInput label="10th Percentage" name="tenthPercentage" />
//                 <TextInput label="Passout Year" name="passoutYear" />
//                 <RadioGroup
//                   label="Permission"
//                   name="permission"
//                   options={[
//                     { label: "Course", value: true },
//                     { label: "Diploma", value: false },
//                   ]}
//                 />
//               </div>
//             </div>

//             {/* ITEG Levels */}
//             {/* <div>
//               <h2 className="text-2xl font-bold mb-4">ITEG Levels</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <CheckboxGroup
//                   label=""
//                   name="itegLevels"
//                   options={[
//                     { value: "level1", label: "1A Level" },
//                     { value: "level2", label: "1B Level" },
//                     { value: "level3", label: "1C Level" },
//                   ]}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 ">
//                 <CheckboxGroup
//                   label=""
//                   name="itegLevels"
//                   options={[
//                     { value: "level4", label: "2A Level" },
//                     { value: "level5", label: "2B Level" },
//                     { value: "level6", label: "2C Level" },
//                   ]}
//                 />
//               </div>
//             </div> */}

//             <div className="pt-6 border-t-2 border-orange-500">
//               <h2 className="text-xl font-semibold text-blue-900 underline mb-4">
//                 Iteg Levels
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
//                 <CheckboxGroup
//                   label=""
//                   name="itegLevels"
//                   options={[
//                     { value: "level1", label: "1A Level" },
//                     { value: "level2", label: "1B Level" },
//                     { value: "level3", label: "1C Level" },
//                     { value: "level4", label: "2A Level" },
//                     { value: "level5", label: "2B Level" },
//                     { value: "level6", label: "2C Level" },
//                   ]}
//                 />
//               </div>
//             </div>

//             {/* Permission Section */}

//             <h2 className="text-2xl font-bold mb-4  ">Permission</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextInput label="Permission Reason" name="permissionReason" />

//               <TextInput
//                 label="Placement Date"
//                 placeholder={"dd/mm//yyyy"}
//                 name="placementDate"
//                 type="date"
//               />
//             </div>

//             {/* Placement Info */}
//             <div>
//               <h2 className="text-2xl font-bold mb-4">Placed</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                 <TextInput label="Company Name" name="companyName" />
//                 <TextInput
//                   label="Placement Date"
//                   placeholder={"dd/mm//yyyy"}
//                   name="placementDate"
//                   type="date"
//                 />
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default StudentEditPage;
