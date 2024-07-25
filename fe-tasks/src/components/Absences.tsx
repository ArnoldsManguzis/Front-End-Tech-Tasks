import { useEffect, useState } from "react";
import { addDays, typeToReadable } from "../helpers";

interface Absence {
    id: number;
    startDate: string;
    endDate: string;
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

type AbsencesProps = {
    sortBy?: "startDate" | "endDate" | "absenceType" | "name";
};

const sortData = (data: Absence[], sortBy: AbsencesProps["sortBy"]) => {
    return data.sort((a, b) => {
        if (sortBy === "startDate") {
            return (
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
            );
        }
        if (sortBy === "endDate") {
            return (
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
            );
        }
        if (sortBy === "absenceType") {
            return a.absenceType.localeCompare(b.absenceType);
        }
        if (sortBy === "name") {
            return a.employee.firstName.localeCompare(b.employee.firstName);
        }
        return 0;
    });
};

const Absences = ({ sortBy }: AbsencesProps) => {
    const [data, setData] = useState<Absence[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = "https://front-end-kata.brighthr.workers.dev/api/absences";
        const urlConflicts =
            "https://front-end-kata.brighthr.workers.dev/api/conflict/";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json: Absence[] = await response.json();

                const dataWithConflicts: Absence[] = await Promise.all(
                    json.map(async (absence, index) => {
                        const response = await fetch(urlConflicts + absence.id);
                        const conflict: {
                            conflicts: boolean;
                        } = await response.json();
                        json[index].conflict = conflict.conflicts;
                        json[index].endDate = addDays(
                            new Date(absence.startDate),
                            absence.days
                        ).toLocaleDateString("en-gb");
                    })
                ).then(() => json);

                setData(dataWithConflicts);
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
            {sortData(data, sortBy).map((absence) => {
                return (
                    <div
                        key={absence.id}
                        className={`flex flex-row text-left  border-2 ${
                            absence.conflict
                                ? "border-red-500"
                                : "border-slate-300"
                        } rounded-md my-8 mx-8 p-4 justify-between items-center`}
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
                            <div>to: {absence.endDate}</div>
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
