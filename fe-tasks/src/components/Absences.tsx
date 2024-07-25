import { useEffect, useState } from "react";

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
                return <div>{absence.employee.firstName}</div>;
            })}
        </div>
    );
};

export default Absences;
