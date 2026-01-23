import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/slices/authSlice";
import PrimaryButton from "../../components/ui/Button.jsx";
import FormField from "../../components/ui/FormField.jsx";
import { Formik, Form } from "formik";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [availableRoles, setAvailableRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${conf.apiBaseUrl}/roles`);
        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = await res.json();
        setAvailableRoles(data.roles || []);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching roles!");
      }
    };

    fetchRoles();
  }, []);

  const roleOptions = availableRoles.map((r) => ({
    label: r.name === "Teacher" ? "Staff" : r.name,
    value: r.name.toLowerCase() === "teacher" ? "staff" : r.name.toLowerCase(),
  }));

  // --- Handle Signup ---
  //   const handleSignup = async (e) => {
  //     e.preventDefault();
  //     setMessage("");

  //     if (loading) return;

  //     if (!role) {
  //       setMessage("Please select a role before signing up!");
  //       return;
  //     }

  //     try {
  //       await dispatch(signupUser({ name, email, password, role })).unwrap();

  //       setMessage("Signup successful! Redirecting to login...");

  //       setTimeout(() => navigate("/login"), 1500);
  //     } catch (err) {
  //       setMessage(err);
  //     }
  //   };

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden font-inter">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#00b8f1] rounded-br-[200px] opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b8f1] opacity-10 rounded-tl-[200px]"></div>

      {/* Message Box */}
      {message && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-blue-500 text-white rounded-lg shadow-xl max-w-sm w-full text-center animate-pulse">
          <p className="font-medium">{message}</p>
          <button
            onClick={() => setMessage("")}
            className="ml-3 text-sm font-bold"
          >
            [Dismiss]
          </button>
        </div>
      )}

      {/* Signup Container */}
      <div className="relative z-10 flex w-full max-w-4xl mx-auto my-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-auto sm:h-[550px]">
        {/* Left Section (same as login) */}
        <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-900 w-20 h-20 mb-4 flex items-center justify-center rounded-xl shadow-lg">
              <span className="text-white text-4xl font-extrabold">K</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              KDKCE MCA DEPARTMENT
            </h1>
            <h2 className="text-base text-gray-500 mt-2">
              STUDENT RESULT MANAGEMENT SYSTEM
            </h2>
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="flex w-full md:w-1/2 justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Create Account
            </h2>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                role: "",
              }}
              onSubmit={async (values) => {
                if (!values.role) {
                  setMessage("Please select a role");
                  return;
                }

                try {
                  await dispatch(signupUser(values)).unwrap();
                  setMessage("Signup successful! Redirecting...");
                  setTimeout(() => navigate("/login"), 1500);
                } catch (err) {
                  setMessage(err);
                }
              }}
            >
              <Form>
                <FormField
                  label="Full Name"
                  name="name"
                  placeholder="Full Name"
                />

                <FormField
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="Email Address"
                />

                <FormField
                  type="password"
                  placeholder="Create Password"
                  label="Password"
                  name="password"
                  className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5"
                />

                {/* Role Dropdown */}
                <FormField
                  label="Role"
                  name="role"
                  fieldType="select"
                  options={roleOptions}
                  loading={availableRoles.length === 0}
                />

                <PrimaryButton
                  //   onClick={handleSignup}
                  loading={loading}
                  text="Sign Up"
                  type="submit"
                  loadingText="Creating Account..."
                />

                <p
                  className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
