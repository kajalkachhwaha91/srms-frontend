import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- API URLs ---
const BASE_URL = "https://student-result-management-system-vikh.onrender.com";
const ROLES_URL = `${BASE_URL}/roles`;
const SIGNUP_URL = `${BASE_URL}/users/signup`;

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [availableRoles, setAvailableRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Fetch roles on mount
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch(ROLES_URL);
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

    // --- Handle Signup ---
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");

        if (isLoading) return;
        if (!role) {
             setMessage("Please select a role before signing up!");
             return;
        }

        setIsLoading(true);

        const payload = {
            name,
            email,
            password,
            role: role === "staff" ? "Teacher" : role.charAt(0).toUpperCase() + role.slice(1)
        };

        try {
            const response = await fetch(SIGNUP_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Signup failed");

            setMessage("Signup successful! Redirecting to login...");
            
            setTimeout(() => navigate("/"), 1500);

        } catch (error) {
            console.error("Signup Error:", error.message);
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 relative overflow-hidden font-inter">

            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#00b8f1] rounded-br-[200px] opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b8f1] opacity-10 rounded-tl-[200px]"></div>

            {/* Message Box */}
            {message && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-blue-500 text-white rounded-lg shadow-xl max-w-sm w-full text-center animate-pulse">
                    <p className="font-medium">{message}</p>
                    <button onClick={() => setMessage("")} className="ml-3 text-sm font-bold">
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
                        <h1 className="text-2xl font-bold text-gray-800">KDKCE MCA DEPARTMENT</h1>
                        <h2 className="text-base text-gray-500 mt-2">STUDENT RESULT MANAGEMENT SYSTEM</h2>
                    </div>
                </div>

                {/* Right Section - Signup Form */}
                <div className="flex w-full md:w-1/2 justify-center items-center p-8 md:p-12">
                    <div className="w-full max-w-sm">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Account</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5"
                        />

                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5"
                        />

                        {/* Role Dropdown */}
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-6 bg-white"
                        >
                            <option value="">
                                {availableRoles.length === 0 ? "Loading Roles..." : "Select Role"}
                            </option>
                            {availableRoles.map((r) => (
                                <option 
                                    key={r.id} 
                                    value={r.name.toLowerCase() === "teacher" ? "staff" : r.name.toLowerCase()}
                                >
                                    {r.name === "Teacher" ? "Staff" : r.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleSignup}
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold ${
                                isLoading ? "bg-gray-400" : "bg-[#00b8f1] text-white hover:bg-[#009ed1]"
                            }`}
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>

                       <p 
    className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline"
    onClick={() => navigate("/login")}
>
    Already have an account? Login
</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
