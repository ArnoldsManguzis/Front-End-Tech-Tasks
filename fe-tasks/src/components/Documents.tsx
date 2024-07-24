import React from "react";

type Document = {
    type: string;
    name: string;
    added: string;
    size: number;
    files?: Document[];
};
interface DocumentsProps {
    documents: Document[];
    style?: string;
    border?: string;
    sortBy?: "name" | "added" | "size";
    filter?: string;
}

export const sortDocuments = (
    documents: Document[],
    sortBy?: string,
    filter?: string
) => {
    const newDocuments = documents;
    if (sortBy === "name") {
        newDocuments.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "added") {
        newDocuments.sort(
            (a, b) => new Date(a.added).getTime() - new Date(b.added).getTime()
        );
    }
    if (sortBy === "size") {
        newDocuments.sort((a, b) => a.size - b.size);
    }
    console.log(filter);
    if (filter && filter.length > 0) {
        return newDocuments.filter((doc) =>
            doc.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
    console.log(JSON.stringify(newDocuments, null, " "));
    return newDocuments;
};

const Documents = ({
    documents,
    style,
    border,
    sortBy,
    filter,
}: DocumentsProps) => {
    const [open, setOpen] = React.useState<string[]>([]);

    return (
        <div className={style}>
            {sortDocuments(documents, sortBy, filter).map((document, index) => {
                const isFolder = document.type === "folder";
                if (isFolder) {
                }
                return (
                    <div className="flex flex-col">
                        {isFolder ? (
                            <div
                                className={`items-start mt-8 ml-8 ${
                                    open.includes(document.name)
                                        ? "border-2 border-slate-100 rounded-md"
                                        : ""
                                }`}
                            >
                                <button
                                    key={index}
                                    onClick={() => {
                                        setOpen((prev) => {
                                            if (prev.includes(document.name)) {
                                                return prev.filter(
                                                    (name) =>
                                                        name !== document.name
                                                );
                                            }
                                            return [...prev, document.name];
                                        });
                                    }}
                                    className={`flex ${
                                        open.includes(document.name)
                                            ? ""
                                            : " border-2"
                                    } border-slate-100 rounded-md p-4 items-start text-center align-middle  justify-between w-full text-center inline-flex items-center`}
                                >
                                    <div className="flex flex-col items-start">
                                        <div>{document.name}</div>
                                        <div>{document.added}</div>
                                        <div>{document.type}</div>
                                        <div>{document.size} mb</div>
                                    </div>
                                    {open.includes(document.name) ? (
                                        <svg
                                            className="h-5 w-5 text-black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 15l7-7 7 7"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-5 w-5 text-black"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    )}
                                </button>

                                {document.files &&
                                    open.includes(document.name) && (
                                        <div className="-ml-8">
                                            <Documents
                                                border="border-0 rounded-md"
                                                documents={document.files}
                                            />
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div
                                key={index}
                                className={`flex flex-col mt-8 ml-8 ${
                                    border ? border : "border-2"
                                } border-slate-100 rounded-md p-4 items-start`}
                            >
                                <div>{document.name}</div>
                                {document.added && <div>{document.added}</div>}
                                {document.type}
                                {document.size && <div>{document.size} mb</div>}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Documents;
