// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const GoogleCallback = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const userParam = searchParams.get("user");
//     const error = searchParams.get("error");

//     if (error) {
//       toast.error("Google login failed. Please try again.");
//       navigate("/login");
//       return;
//     }

//     if (token && userParam) {
//       try {
//         const user = JSON.parse(decodeURIComponent(userParam));

//         // Store token (default to sessionStorage like your existing logic)
//         sessionStorage.setItem("token", token);
//         sessionStorage.setItem("user", JSON.stringify(user));

//         toast.success("Google login successful!");

//         setTimeout(() => {
//           if (user.role === "admin") {
//             navigate("/admin/dashboard", { replace: true });
//           } else {
//             navigate("/rentridehome", { replace: true });
//           }
//         }, 500);
//       } catch {
//         toast.error("Something went wrong. Please try again.");
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//         <p className="text-gray-600 text-sm font-medium">
//           Completing Google sign-in...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default GoogleCallback;

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      toast.error(
        error === "blocked"
          ? "Your account has been blocked. Please contact support."
          : "Google login failed. Please try again.",
      );
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // ✅ Store in BOTH localStorage and sessionStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        toast.success("Google login successful! Redirecting...");

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/rentridehome", { replace: true });
          }
        }, 1000);
      } catch {
        toast.error("Something went wrong. Please try again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">
          Completing Google sign-in...
        </p>
        <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
