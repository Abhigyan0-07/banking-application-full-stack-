import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/bulk?filter=" + filter
      )
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-semibold mt-2 text-lg text-gray-900 dark:text-gray-100 animate-fade-in">{t("usersList")}</div>
      <div className="mt-3 mb-6">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          value={filter}
          type="text"
          placeholder={t("searchUsers")}
          className="w-full px-3 py-2 border rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400"
        />
      </div>
      {users.length === 0 ? (
        <div className="text-sm text-gray-600 dark:text-gray-400">{t("noUsers")}</div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user._id} className="animate-slide-up"><User user={user} /></div>
          ))}
        </div>
      )}
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 flex items-center justify-center mr-3 font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="leading-tight">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div>
        {user.isMalicious ? (
            <div className="flex items-center gap-2">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-medium border border-red-200">
                    Malicious User
                </span>
                <Button
                    onClick={() => {}}
                    label={"Blocked"}
                    disabled={true} // Add visual disabled style if button supports it
                />
            </div>
        ) : (
            <Button
            onClick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}
            label={"Send Money"}
            />
        )}
      </div>
    </div>
  );
}
