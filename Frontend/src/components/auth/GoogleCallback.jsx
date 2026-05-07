import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Google login failed. Please try again.");
      navigate("/login");
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));

        // Store token (default to sessionStorage like your existing logic)
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        toast.success("Google login successful!");

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/rentridehome", { replace: true });
          }
        }, 500);
      } catch {
        toast.error("Something went wrong. Please try again.");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm font-medium">
          Completing Google sign-in...
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;