import React from "react";
import data from "../data/data.json";
import Documents from "../components/Documents";

const JuniorMid = () => {
    const [sortBy, setSortBy] = React.useState<"name" | "added" | "size">(
        "name"
    );
    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-2/4">
                <div className="flex flex-row ml-8 mt-8 justify-between">
                    <button
                        onClick={() => setSortBy("name")}
                        className={`${
                            sortBy === "name"
                                ? "text-slate-1000 underline"
                                : "text-slate-500"
                        }`}
                    >
                        Name
                    </button>
                    <button
                        onClick={() => setSortBy("added")}
                        className={`${
                            sortBy === "added"
                                ? "text-slate-1000 underline"
                                : "text-slate-500"
                        }`}
                    >
                        Added
                    </button>
                    <button
                        onClick={() => setSortBy("size")}
                        className={`${
                            sortBy === "size"
                                ? "text-slate-1000 underline"
                                : "text-slate-500"
                        }`}
                    >
                        Size
                    </button>
                </div>
                <Documents
                    style="flex flex-col"
                    documents={data}
                    sortBy={sortBy}
                />
            </div>
        </div>
    );
};

export default JuniorMid;
