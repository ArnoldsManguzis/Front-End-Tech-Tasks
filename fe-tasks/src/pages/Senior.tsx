import React, { Suspense } from "react";
import Absences from "../components/Absences";

const Senior = () => {
    return (
        <div className="flex">
            <Suspense fallback={<div>Loading...</div>}>
                <Absences />
            </Suspense>
        </div>
    );
};

export default Senior;
