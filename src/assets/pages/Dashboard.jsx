import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Dashboard() {
  const { LOG_OUT } = useContext(AuthContext);

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white mt-[120px] h-fit p-12 rounded-sm flex flex-col gap-[20px]">
        <h1 className="text-black uppercase">Dashboard</h1>
        <p><span className="font-bold">Welcome: </span> {localStorage.getItem("dx_er3c22")} </p>
        <button
          className="bg-red-600 text-white rounded-md uppercase font-bold px-5 py-2"
          onClick={LOG_OUT}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
