import { useCallback } from "react";
import toast from "react-hot-toast";

export function useClipboard(onPaste) {
const pasteFromClipboard = useCallback(async () => {
    try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText) {
        onPaste(clipboardText);
        toast.success("Pasted from clipboard");
        } else {
        toast.error("Clipboard is empty");
        }
    } catch {
        toast.error("Failed to paste from clipboard");
    }
    }, [onPaste]);

return { pasteFromClipboard };
}
