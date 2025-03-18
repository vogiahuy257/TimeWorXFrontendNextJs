// app/components/DeleteModal.tsx (Server Component)

interface DeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

const DeleteModal = ({ onClose, onConfirm, isDeleting = false }: DeleteModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white-css rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p className="text-sm text-gray-css mt-2">
                    Are you sure you want to delete this report? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-gray-css"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className={`px-4 py-2 rounded-md text-white font-medium transition-all duration-300 ease-in-out
                            ${isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
