import { useState } from "react";

const DeleteAccountForm = ({ handleDelete, handleClose }) => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = () => {
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        handleDelete(password);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="deleteAccountForm p-4 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4 border-b-2 pb-1">Confirm Account Deletion</h2>
                <p className="text-sm mb-2">Deleting your account is permanent and cannot be undone. All associated data will be permanently removed. Are you sure you want to proceed?</p>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-gray-700 pr-10"
                    />
                    <button 
                        type="button"
                        className="button-icon absolute z-50 top-1/2 -translate-y-1/2 right-2 flex items-center"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? 
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                                <path d="M599-599q21 21 34 50.5t15 61.5q0 15-10.7 25.5Q626.59-451 612-451q-15.42 0-26.21-10.5Q575-472 575-487q2-20-4.5-37T552-553.5Q540-566 523.5-572t-36.5-4q-15 0-25.5-10.7Q451-597.41 451-612q0-15 10.5-25.5T487-648q32 2 61 14.5t51 34.5Zm-119-97q-16.68 0-32.48 1.05-15.8 1.05-31.6 3.85-14.92 2.1-28.42-5.4-13.5-7.5-17.5-22t3.5-27.5q7.5-13 22.27-15.25Q417-765 437.85-766.5 458.7-768 480-768q134 0 246.5 68.5t170.63 188.62q3.87 7.88 5.37 15.4 1.5 7.52 1.5 15.48 0 7.96-1.5 15.48Q901-457 898-449q-17.75 37.82-43.87 70.91Q828-345 797-316q-11 10-25.5 9T747-320.16q-10-12.17-8.5-26.5Q740-361 751-372q26-23 46.36-50 20.37-27 35.64-58-49-101-144.5-158.5T480-696Zm0 504q-131 0-241-69.5T65.93-446.19Q61-454 59.5-462.53q-1.5-8.52-1.5-17.5 0-8.97 1.5-17.47Q61-506 66-514q23-45 53.76-83.98Q150.53-636.96 190-669l-75-75q-11-11-11-25t11-25q11-11 25.5-11t25.5 11l628 628q11 11 11 25t-11 25q-11 11-25.5 11T743-116L638-220q-38.4 14-77.9 21-39.5 7-80.1 7ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26.21 0 51.1-3.5Q556-271 581-277l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                                <path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-130 0-239-69.5T68-445q-5-8-7-16.77t-2-18Q59-489 61-498t7-17q64-114 173-183.5T480-768q130 0 239 69.5T892-515q5 8 7 16.77t2 18q0 9.23-2 18.23t-7 17q-64 114-173 183.5T480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/>
                            </svg>
                        )}
                    </button>
                </div>
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                <div className="flex justify-end gap-2 mt-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={handleClose}>Cancel</button>
                    <button className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountForm;
