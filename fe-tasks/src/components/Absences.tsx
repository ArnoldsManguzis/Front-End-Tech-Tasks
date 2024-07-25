import { useEffect, useState } from "react";
import { addDays } from "../helpers";

interface Absence {
    id: number;
    startDate: string;
    days: number;
    absenceType: string;
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
    });

    if (error) return <div>Something went wrong</div>;
    return (
        <div>
            {data.map((absence) => {
                return (
                    <div
                        key={absence.id}
                        className={`flex flex-col text-left  border-2 ${
                            absence.conflict
                                ? "border-orange-300"
                                : "border-slate-300"
                        } rounded-md my-8 ml-8 p-4`}
                    >
                        <div>
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
                            {absence.employee.firstName}{" "}
                            {absence.employee.lastName}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Absences;
