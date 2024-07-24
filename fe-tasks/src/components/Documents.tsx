import React from "react";

type Document = {
    type: string;
    name: string;
    added?: string;
    size?: number;
    files?: Document[];
};
interface DocumentsProps {
    documents: Document[];
    style?: string;
    border?: string;
}

const Documents = ({ documents, style, border }: DocumentsProps) => {
    const [open, setOpen] = React.useState<string[]>([]);

    return (
        <div className={style}>
            {documents.map((document, index) => {
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
                                    <div>{document.name}</div>
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
