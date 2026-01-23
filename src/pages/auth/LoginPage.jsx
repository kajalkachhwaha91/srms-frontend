import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice.js";
import conf from "../../config";
import PrimaryButton from "../../components/ui/Button.jsx";
import FormField from "../../components/ui/FormField.jsx";
import { Formik, Form } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const [availableRoles, setAvailableRoles] = useState([]);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    role: reduxRole,
  } = useSelector((state) => state.auth);

  const roleOptions = availableRoles.map((r) => ({
    label: r.name === "Teacher" ? "Staff" : r.name,
    value: r.name.toLowerCase() === "teacher" ? "staff" : r.name.toLowerCase(),
  }));

  // --- 1. Fetch Available Roles on Component Mount ---
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${conf.apiBaseUrl}/roles`);
        if (!response.ok) {
          throw new Error("Failed to fetch roles from server.");
        }
        const data = await response.json();
        setAvailableRoles(data.roles || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
        error("Error loading roles. Please check the network.");
      }
    };
    fetchRoles();
  }, []);


  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden font-inter">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#00b8f1] rounded-br-[200px] opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b8f1] opacity-10 rounded-tl-[200px]"></div>

      {/* Message Box / Alert UI */}
      {error && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-red-500 text-white rounded-lg shadow-xl max-w-sm w-full text-center">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => error("")}
            className="mt-2 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 flex w-full max-w-4xl mx-auto my-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-auto sm:h-[500px]">
        {/* Left Panel - Logo Section (Desktop) */}
        <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-900 w-20 h-20 mb-4 flex items-center justify-center rounded-xl flex-shrink-0 shadow-lg">
              <span className="text-white text-4xl font-extrabold">K</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">
              KDKCE MCA DEPARTMENT
            </h1>
            <h2 className="text-base text-gray-500 mt-2">
              STUDENT RESULT MANAGEMENT SYSTEM
            </h2>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Welcome Back!
            </h2>
            <Formik
              initialValues={{
                email: "kanakk@gamil.com",
                password: "Kanak@91",
                role: "",
              }}
              onSubmit={async (values) => {
  if (!values.role) {
    alert("Please select a role before logging in!");
    return;
  }

  try {
    await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
        selectedRole: values.role,
      })
    ).unwrap();

    switch (values.role) {
      case "admin":
        navigate("/admin", { replace: true });
        break;
      case "student":
        navigate("/student", { replace: true });
        break;
      case "staff":
        navigate("/staff", { replace: true });
        break;
      default:
        alert(`Unknown role: ${values.role}`);
    }
  } catch (err) {
    console.error(err);
  }
}}

            >
              <Form>
                {/* Email Input */}
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />

                {/* Password Input */}
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />

                {/* Role Dropdown */}
                <FormField
                  label="Role"
                  name="role"
                  fieldType="select"
                  options={roleOptions}
                  loading={availableRoles.length === 0}
                />

                {/* Login Button */}

                <PrimaryButton
                  type="submit"
                  loading={loading}
                  disabled={availableRoles.length === 0}
                  text="Login"
                  loadingText="Logging In..."
                />

                {/* sign up  Link */}
                <p
                  className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Don't have an account? Create Account
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
