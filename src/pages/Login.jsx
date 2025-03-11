import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { verifyauthentication } from "../services/authenticationService";
import { doConnection } from "../services/connectionService";
import {
  getEmployeeImage,
  getEmployeeNameAndId,
} from "../services/employeeService";
import { doConnectionPublic, getServiceURL } from "../services/publicService";
import { getNameFromEmail } from "../utils/emailHelpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, setUserData } = useAuth();

  // Memoized login handler to prevent re-creation on each render.
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      if (!email) {
        setError("Username is required!");
        setLoading(false);
        return;
      } else if (!password) {
        setError("Password is required!");
        setLoading(false);
        return;
      }

      try {
        // Step 1: Connect to public service.
        const publicConnection = await doConnectionPublic(email);
        if (publicConnection === "Invalid domain on Client Connection Data") {
          setError(publicConnection);
          setLoading(false);
          return;
        }

        // Step 2: Retrieve dynamic client URL.
        const clientURL = await getServiceURL(email);
        if (!clientURL || !clientURL.startsWith("http")) {
          setError("Failed to retrieve a valid client URL.");
          setLoading(false);
          return;
        }

        // Step 2: Verify authentication.
        const userName = getNameFromEmail(email);
        const userDetails = { User: userName, Pass: password };
        const authentication = await verifyauthentication(userDetails, email);

        if (authentication !== "Authetication passed") {
          setError(authentication);
          setLoading(false);
          return;
        }

        // Optionally update userData with the client URL immediately.
        setUserData((prev) => ({ ...prev, ClientURL: clientURL }));

        // Step 3: Fetch client connection and employee details in parallel.
        const [clientConnection, employeeData] = await Promise.all([
          doConnection(clientURL, email),
          getEmployeeNameAndId(userName, email, clientURL),
        ]);

        if (!employeeData || !employeeData.length) {
          setError("Employee details not found.");
          setLoading(false);
          return;
        }

        const empNo = employeeData[0].EMP_NO;

        const employeeImage = await getEmployeeImage(empNo, clientURL);

        const payload = {
          token: "dummy-token",
          email,
          currentUserLogin: email,
          currentUserName: employeeData[0].USER_NAME,
          currentUserEmpNo: empNo,
          currentUserImageData: employeeImage,
          clientURL: clientURL,
        };

        // Call login from context. It will handle splitting the payload.
        login(payload);

        navigate("/");
      } catch (err) {
        console.error("Login error:", err);
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, setUserData, navigate]
  );

  return (
    <div className="flex min-h-screen items-center justify-center primary-content">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full text-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="input input-bordered flex items-center gap-2">
              <Mail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="relative">
            <label className="input input-bordered flex items-center gap-2">
              <KeyRound />
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </label>
          </div>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-4 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner className="loading loading-spinner loading-md" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        {/* <p className="text-center text-gray-300 text-sm mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-blue-300">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
