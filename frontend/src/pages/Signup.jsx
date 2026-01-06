import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Heading, SubHeading, InputBox, Button, BottomWarning } from "../components";

export const Signup = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, [navigate]);

  const handleSignup = async () => {
    setError("");
    if (!firstName || !lastName || !username || !password || !transactionPin) {
      setError("Please fill all fields");
      return;
    }
    if (transactionPin.length !== 6) {
      setError("PIN must be 6 digits");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signup",
        { firstName, lastName, username, password, transactionPin }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.response?.data;
      setError(typeof apiMsg === "string" ? apiMsg : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 h-screen flex justify-center items-center animate-fade-in">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-96 animate-scale-in">
        <Heading label={t("signup")} />
        <SubHeading label={t("enterYourInformation")} />
        <div className="space-y-2">
          <InputBox label="First Name" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <InputBox label="Last Name" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          <InputBox label="Email" placeholder="Email" type="email" value={username} onChange={e => setUsername(e.target.value)} />
          <InputBox label="Password" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} error={error} />
          <InputBox label="Transaction PIN (6 digits)" placeholder="123456" type="password" value={transactionPin} onChange={e => setTransactionPin(e.target.value)} />
        </div>
        <div className="mt-4">
          <Button label={t("signup")} onClick={handleSignup} loading={loading} disabled={loading} />
        </div>
        {error ? <div className="text-xs text-red-600 mt-2">{error}</div> : null}
        <div className="mt-2">
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};
