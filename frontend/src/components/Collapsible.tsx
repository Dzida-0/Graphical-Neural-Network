import { Button } from "./collapsibleLib/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNetwork } from "../context/NetworkContext";

export default function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
    const { collapsed, updateCollapsed} = useNetwork();

    return (
        <div className="border rounded-2xl shadow-md p-4 bg-white w-full">
            <Button onClick={() => updateCollapsed(title,!collapsed[title])} className="w-full flex justify-between">
                {title}
                <span>{!collapsed[title] ? "▲" : "▼"}</span>
            </Button>
            <AnimatePresence>
                {!collapsed[title] && (
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
