/* ScheduleInterviewModal.jsx */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddPlacementInterviewRecordMutation } from "../../redux/api/authApi"; // ✅ RTK mutation

const ScheduleInterviewModal = ({ isOpen, onClose, studentId }) => {
    const [addInterviewRecord, { isLoading }] = useAddPlacementInterviewRecordMutation();

    const interviewSchema = Yup.object().shape({
        companyName: Yup.string().required("Required"),
        interviewDate: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        jobProfile: Yup.string().required("Required"),
        hrEmail: Yup.string().email("Invalid email").required("Required"),
        contactNumber: Yup.string().required("Required"),
        position: Yup.string().required("Required"),
        technology: Yup.string().required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            companyName: "",
            interviewDate: new Date().toISOString().substring(0, 10),
            remark: "",
            result: "Pending",
            location: "",
            jobProfile: "",
            hrEmail: "",
            contactNumber: "",
            position: "",
            technology: "",
            jobType: "",
        },
        validationSchema: interviewSchema,
        onSubmit: async (values, actions) => {
            try {
                if (!studentId) {
                    alert("Student ID missing!");
                    return;
                }

                await addInterviewRecord({
                    studentId,
                    interviewData: values,
                }).unwrap();

                alert("Interview added successfully ✅");
                actions.resetForm();
                onClose();
            } catch (err) {
                console.error("Failed to submit interview", err);
                alert(err?.data?.message || "Something went wrong ❌");
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-[90%] max-w-3xl min-h-[85vh] max-h-[95vh] overflow-y-auto shadow-2xl p-10">
                <h2 className="text-2xl font-semibold text-center text-orange-600 mb-8">
                    Add Placement Interview
                </h2>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Company Name */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="companyName"
                            onChange={formik.handleChange}
                            value={formik.values.companyName}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.companyName ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Company Name <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Interview Date */}
                    <div className="relative w-full">
                        <input
                            type="date"
                            name="interviewDate"
                            onChange={formik.handleChange}
                            value={formik.values.interviewDate}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                        />
                        <label className="absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none text-xs -top-2 text-black">
                            Interview Date <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Location */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="location"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.location ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Location <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Job Profile */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="jobProfile"
                            onChange={formik.handleChange}
                            value={formik.values.jobProfile}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.jobProfile ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Job Profile <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* HR Email */}
                    <div className="relative w-full">
                        <input
                            type="email"
                            name="hrEmail"
                            onChange={formik.handleChange}
                            value={formik.values.hrEmail}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.hrEmail ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            HR Email <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Contact Number */}
                    <div className="relative w-full">
                        <input
                            type="tel"
                            name="contactNumber"
                            onChange={formik.handleChange}
                            value={formik.values.contactNumber}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.contactNumber ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Contact Number <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Position */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="position"
                            onChange={formik.handleChange}
                            value={formik.values.position}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.position ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Position <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Technology */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="technology"
                            onChange={formik.handleChange}
                            value={formik.values.technology}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            placeholder=" "
                        />
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.technology ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Technology <span className="text-black">*</span>
                        </label>
                    </div>

                    {/* Job Type */}
                    <div className="md:col-span-2 relative w-full">
                        <select
                            name="jobType"
                            onChange={formik.handleChange}
                            value={formik.values.jobType}
                            className="peer h-12 w-full border-2 border-gray-300 rounded-md px-3 py-2 bg-white leading-tight focus:outline-none focus:border-black focus:ring-0 appearance-none transition-all duration-200"
                        >
                            <option value="" disabled hidden>Select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <label className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                            formik.values.jobType ? "text-xs -top-2 text-black" : "text-gray-400 top-2"
                        }`}>
                            Job Type <span className="text-black">*</span>
                        </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end space-x-4 mt-10">
                        <button
                            type="button"
                            onClick={() => {
                                formik.resetForm();
                                onClose();
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 bg-brandYellow text-white rounded-md hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleInterviewModal;
