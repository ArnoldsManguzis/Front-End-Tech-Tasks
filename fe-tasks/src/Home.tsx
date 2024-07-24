import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center">
            <button
                onClick={() => navigate("/JuniorMid")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 mt-5"
            >
                Junior/Mid
            </button>
            <button
                onClick={() => navigate("/Senior")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5 mt-5"
            >
                Senior
            </button>
        </div>
    );
};
export default Home;
