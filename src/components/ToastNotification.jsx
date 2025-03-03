import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastNotification = ({ message, type = "success", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = useCallback(() => {
        setVisible(false);
        if (onClose) onClose();
    }, [onClose]);

    const bgColor =
        type === "success" ? "bg-green-500" :
        type === "error" ? "bg-red-500" :
        "bg-blue-500";

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ x: "-100%", opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`fixed top-5 left-5 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg z-50`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base">{message}</span>
                        <button className="button-icon ml-4 text-white hover:opacity-70" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                                <path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z"/>
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ToastNotification;
