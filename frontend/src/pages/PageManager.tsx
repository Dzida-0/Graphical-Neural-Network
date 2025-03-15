import SinglePage from "./SinglePage";
import { useState } from "react";

export default function AppCore() {
    const [pages, setPages] = useState<{ id: number }[]>([{ id: 1 }]);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const maxPages = 5;

    const addPage = () => {
        if (pages.length >= maxPages) return;
        const newId = Math.max(...pages.map(p => p.id)) + 1;
        setPages([...pages, { id: newId }]);
        setCurrentPageIndex(pages.length);
    };

    const removePage = (index: number) => {
        if (pages.length === 1) return;
        setPages((prevPages) => prevPages.filter((_, i) => i !== index));
        setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-100">
            {/* Tabs */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white shadow">
                {pages.map((page, index) => (
                    <div
                        key={page.id}
                        className={`px-4 py-2 border-b-4 cursor-pointer text-sm font-medium
                        ${index === currentPageIndex ? "border-blue-500 bg-blue-100 text-blue-700" : "border-transparent bg-gray-200 text-gray-600"} flex items-center gap-2`}
                        onClick={() => setCurrentPageIndex(index)}
                    >
                        Page {page.id}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removePage(index);
                            }}
                            className="text-gray-500 hover:text-gray-700 text-lg"
                        >
                            ✖
                        </button>
                    </div>
                ))}

                {/* Add Page Button */}
                {pages.length < maxPages && (
                    <button onClick={addPage} className="text-gray-500 hover:text-gray-700 text-xl">
                        ➕
                    </button>
                )}
            </div>

            {/* Page Content */}
            <div className="flex-grow flex justify-center items-center p-6">
                {pages.map((page, index) => (
                    index === currentPageIndex && <SinglePage key={page.id} id={page.id} />
                ))}
            </div>
            <SinglePage key={10} id={10} />
        </div>
    );
}
