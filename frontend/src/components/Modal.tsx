import React, { useEffect, useRef } from "react";

type Props = {
    open: boolean,
    children: any,
    onClose: () => void,
}

type ButtonProps = {
    loading?: boolean,
    onClick: () => void
}

const Modal = ({ open, children, onClose }: Props) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (open) {
            dialogRef?.current?.showModal();
        } else {
            dialogRef?.current?.close();
        }
    }, [open, dialogRef.current])

    return (
        <dialog
            ref={dialogRef}
            onCancel={onClose}
            className="w-2/4 backdrop:bg-gray-500 backdrop:bg-opacity-50 bg-dark-color rounded-md p-4"
        >
            <div className="flex flex-col gap-y-4">
                {children}
            </div>
        </dialog>
    )
}

Modal.CancelButton = ({ loading = false, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="text-white px-6 py-2 border border-red-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-red-600 hover:ease-in-out"
        >
            {loading ? "Loading..." : "Cancel"}
        </button>
    )
}

Modal.SubmitButton = ({ loading = false, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="text-white px-6 py-2 border border-green-400 disabled:cursor-not-allowed disabled:opacity-40 hover:border-green-700 hover:bg-green-700 hover:ease-in-out"
        >
            {loading ? "Loading..." : "Submit"}
        </button>
    )
}

export { Modal };
export default Modal;