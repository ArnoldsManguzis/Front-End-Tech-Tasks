import React from "react";
import data from "../data/data.json";
import Documents from "../components/Documents";

const JuniorMid = () => {
    return (
        <div className="flex">
            <div className="flex flex-col w-2/4">
                <Documents style="flex flex-col" documents={data} />
            </div>
        </div>
    );
};

export default JuniorMid;
