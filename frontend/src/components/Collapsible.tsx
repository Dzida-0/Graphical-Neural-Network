import { useState } from "react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded-2xl shadow-md p-4 bg-white w-full max-w-md">
            <Button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between">
                {title}
                <span>{isOpen ? "▲" : "▼"}</span>
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 1, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0,height: 0 }} 
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="mt-2 overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
             </AnimatePresence>
        </div>
    );
}
