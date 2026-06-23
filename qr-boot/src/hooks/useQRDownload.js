import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

const QR_OPTIONS = {
    width: 400,
    margin: 2,
    errorCorrectionLevel: "H",
};

function triggerDownload(dataUrl, format) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function useQRDownload() {
const [downloading, setDownloading] = useState(null);
const requestIdRef = useRef(0);
const download = useCallback(async (value, format) => {
    if (!value?.trim()) {
        toast.error("Enter text or a URL first");
        return;
    }

    const requestId = ++requestIdRef.current;
    setDownloading(format);

    try {
    const QRCodeLib = (await import("qrcode")).default;
    if (format === "png") {
        const dataUrl = await QRCodeLib.toDataURL(value, QR_OPTIONS);
        if (requestId !== requestIdRef.current) return;
        triggerDownload(dataUrl, "png");
        toast.success("PNG downloaded successfully");
        return;
    }

    const svgString = await QRCodeLib.toString(value, {
        ...QR_OPTIONS,
        type: "svg",
    });
    if (requestId !== requestIdRef.current) return;

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, "svg");
    URL.revokeObjectURL(objectUrl);
    toast.success("SVG downloaded successfully");
    } catch (err) {
    if (requestId !== requestIdRef.current) return;
    console.error("QR download error:", err);
    toast.error("Failed to generate QR code");
    } finally {
    if (requestId === requestIdRef.current) {
        setDownloading(null);
    }
    }
}, []);

return { downloading, downloadPNG: (value) => download(value, "png"), downloadSVG: (value) => download(value, "svg") };
}