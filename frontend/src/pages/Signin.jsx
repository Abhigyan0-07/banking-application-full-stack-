import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Heading, SubHeading, InputBox, Button, BottomWarning } from "../components";


export const Signin = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, [navigate]);

  const handleSignin = async () => {
    setError("");
    if (!username || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.response?.data;
      setError(typeof apiMsg === "string" ? apiMsg : "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 h-screen flex justify-center items-center animate-fade-in">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-80 text-center animate-scale-in">
        <Heading label={t("signin")} />
        <SubHeading label={t("enterYourCredentials")} />
        <div className="space-y-2 text-left">
          <InputBox
            placeholder="Email"
            label="Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="email"
          />
          <InputBox
            placeholder="Password"
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            error={error}
          />
        </div>
        <div className="mt-4">
          <Button
            label={t("signin")}
            onClick={handleSignin}
            loading={loading}
            disabled={loading}
          />
        </div>
        {error ? (
          <div className="text-xs text-red-600 mt-2">{error}</div>
        ) : null}
        <div className="mt-2">
          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
};
