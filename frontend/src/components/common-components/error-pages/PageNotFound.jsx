import { useNavigate } from "react-router-dom";
import page404 from "../../../assets/images/404page.png";
const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Sorry, page not found!
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 text-center max-w-md mb-6">
        Sorry, we couldn’t find the page you’re looking for.
        Perhaps you’ve mistyped the URL? Be sure to check your spelling.
      </p>

      {/* Illustration + 404 */}
      <div className="relative">
        <img
          src={page404} // apna image path yaha lagao
          alt="Not Found Illustration"
          className="w-56 md:w-64 mx-auto"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-9xl font-bold text-orange-400 opacity-90 pointer-events-none mt-28">
          404
        </h1>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-900 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
