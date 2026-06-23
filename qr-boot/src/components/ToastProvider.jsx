import { Toaster } from "react-hot-toast";

export function ToastProvider() {
return (
    <Toaster
        position="top-center"
        toastOptions={{
        duration: 2500,
        style: {
        background: "#000000",
        color: "#e4ff30",
        border: "2px solid #e4ff30",
        },
    }}
    />
);
}
