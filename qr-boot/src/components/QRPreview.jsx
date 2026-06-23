import QRCode from "react-qr-code";

export function QRPreview({ value, size }) {
return (
    <div className="flex justify-center w-full">
        <div className="bg-white border-3 border-[#e4ff30] p-5 sm:p-8 inline-block sm:rounded-none w-full max-w-[320px] sm:max-w-none sm:w-auto">
        <div className="flex justify-center">
            <QRCode value={value} size={size} level="H" />
        </div>
        <p className="text-center mt-4 sm:mt-6 text-xs text-black">
            Download your QR
        </p>
        </div>
    </div>
);
}