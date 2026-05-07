

// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");
//   const user = JSON.parse(
//     localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
//   );

//   console.log("ProtectedRoute check:", { token: !!token, user, requiredRole });

//   // Check if user is logged in
//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if role is required and matches
//   if (requiredRole && user.role !== requiredRole) {
//     console.log(
//       `Access denied. Required role: ${requiredRole}, User role: ${user.role}`,
//     );
//     // Redirect to home if not admin
//     return <Navigate to="/rentridehome" replace />;
//   }

//   return children ? children : <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // ── Token ─────────────────────────────────────────────────────
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // ── User — check each storage separately ─────────────────────
  let user = null;
  try {
    const userStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    user = userStr && userStr !== "null" ? JSON.parse(userStr) : null;
  } catch (e) {
    user = null;
  }

  // ── No token or no user → clear bad state + redirect ─────────
  if (!token || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // ── Role check ────────────────────────────────────────────────
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/rentridehome" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;