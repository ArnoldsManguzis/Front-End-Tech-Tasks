import { useEffect, useState } from "react";
import { addDays, typeToReadable } from "../helpers";

interface Absence {
    id: number;
    startDate: string;
    days: number;
    absenceType: "SICKNESS" | "ANNUAL_LEAVE" | "MEDICAL";
    employee: {
        firstName: string;
        lastName: string;
        id: string;
    };
    approved: boolean;
    conflict?: boolean;
}

const Absences = () => {
    const [data, setData] = useState<Absence[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = "https://front-end-kata.brighthr.workers.dev/api/absences";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json: Absence[] = await response.json();
                setData(json);
            } catch (error) {
                setError(true);
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Something went wrong</div>;
    return (
        <div>
            {data.map((absence) => {
                return (
                    <div
                        key={absence.id}
                        className={`flex flex-row text-left  border-2 ${
                            absence.conflict
                                ? "border-red-500"
                                : "border-slate-300"
                        } rounded-md my-8 ml-8 p-4 justify-between items-center`}
                    >
                        <div>
                            {absence.employee.firstName}{" "}
                            {absence.employee.lastName}
                            <div>
                                from:{" "}
                                {new Date(absence.startDate).toLocaleDateString(
                                    "en-gb"
                                )}
                            </div>
                            <div>
                                to:{" "}
                                {addDays(
                                    new Date(absence.startDate),
                                    absence.days
                                ).toLocaleDateString("en-gb")}
                            </div>
                        </div>
                        <div className="flex flex-col items-end ml-4 ">
                            {typeToReadable(absence.absenceType)}
                            <div
                                className={`${
                                    absence.approved
                                        ? "text-green-500"
                                        : "text-orange-500"
                                }`}
                            >
                                {absence.approved ? "Approved" : "Pending"}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Absences;
