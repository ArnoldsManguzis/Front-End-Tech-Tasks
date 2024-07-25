import React, { Suspense } from "react";
import Absences from "../components/Absences";
import HeaderButton from "../components/HeaderButton";

const Senior = () => {
    const [sortBy, setSortBy] = React.useState<
        "startDate" | "endDate" | "absenceType" | "name"
    >("startDate");
    return (
        <div className="flex flex-col">
            <div className="flex flex-row mx-8 mt-8 justify-between">
                <HeaderButton
                    selected={sortBy === "startDate"}
                    title="Start Date"
                    onClick={() => setSortBy("startDate")}
                />
                <HeaderButton
                    selected={sortBy === "endDate"}
                    title="End Date"
                    onClick={() => setSortBy("endDate")}
                />

                <HeaderButton
                    selected={sortBy === "absenceType"}
                    title="Absence Type"
                    onClick={() => setSortBy("absenceType")}
                />
                <HeaderButton
                    selected={sortBy === "name"}
                    title="Name(a-z)"
                    onClick={() => setSortBy("name")}
                />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Absences sortBy={sortBy} />
            </Suspense>
        </div>
    );
};

export default Senior;
