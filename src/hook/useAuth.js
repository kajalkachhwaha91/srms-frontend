import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rolesList, setRolesList] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);

    const API_BASE_URL = "https://student-result-management-system-vikh.onrender.com";

    // -------------------Fetch Roles---------------------------
    const fetchRoles = async () => {
        setLoadingRoles(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/roles`);
            if (response.data?.roles) {
                setRolesList(response.data.roles);
            } else {
                toast.error("Failed to load roles");
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
            toast.error("Error fetching roles list");
        } finally {
            setLoadingRoles(false);
        }
    };

    // -------------------Login---------------------------
    const userLogin = async (email, password, roleId) => {
        setLoading(true);
        try {
            const payload = {
                email: email,
                password: password
            };

            const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);

            if (response.data?.token) {
                // Store token and user info in sessionStorage
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("userName", response.data.user.name);
                sessionStorage.setItem("userEmail", response.data.user.email);
                sessionStorage.setItem("userRole", response.data.user.role);
                sessionStorage.setItem("roleId", roleId);

                toast.success("Login successful");

                // Navigate based on role
                const roleName = response.data.user.role.toLowerCase();
                if (roleName === "admin") {
                    navigate("/admin");
                } else if (roleName === "teacher") {
                    navigate("/staff");
                } else if (roleName === "student") {
                    navigate("/student");
                } else {
                    navigate("/dashboard");
                }

                setLoading(false);
                return response.data;
            }
        } catch (error) {
            console.error("Error while Login:", error);
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // -------------------Logout---------------------------
    const logoutUser = () => {
        toast.success("Logout Successfully");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("roleId");
        navigate("/");
    };

    // -------------------Get Auth Header---------------------------
    const getAuthHeader = () => {
        const token = sessionStorage.getItem("token");
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    return {
        loading,
        loadingRoles,
        rolesList,
        fetchRoles,
        userLogin,
        logoutUser,
        getAuthHeader
    };
};

export default useAuth;