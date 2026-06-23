import { useMemo, useState } from "react";
import { DownloadButton, secondaryButtonClass } from "../../components/DownloadButton";
import { QRPreview } from "../../components/QRPreview";
import { useClipboard } from "../../hooks/useClipboard";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useQRDownload } from "../../hooks/useQRDownload";
// Import the logo
import logo from "../../assets/qrboot.svg";
import { Helmet } from "react-helmet-async";

const DEMO_URL = "https://www.myweb.com/";
const REPO_URL = "https://github.com/saidbourhabi/qr-boot.git";

function Home() {
const [text, setText] = useState(DEMO_URL);
const debouncedText = useDebouncedValue(text);
const isMobile = useMediaQuery("(max-width: 639px)");
const { downloading, downloadPNG, downloadSVG } = useQRDownload();
const { pasteFromClipboard } = useClipboard(setText);

const qrValue = useMemo(
    () => debouncedText.trim() || DEMO_URL,
    [debouncedText],
);

const qrSize = isMobile ? 200 : 280;

return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6 sm:p-6">
        <Helmet>
          <title>QR Code Generator: Create your Free QR Code</title>
          <meta name="description" content="Generate branded QR codes in seconds, share them with your audience, and instantly track your scan data." />
        </Helmet>
      <div className="w-full max-w-5xl">
        <header className="w-full flex flex-col items-center justify-between sm:flex-row sm:justify-between sm:items-center gap-3 mb-8 sm:mb-10">
          {/* Replace h1 with the logo image */}
          <img
            src={logo}
            alt="QR Boot logo"
            className="h-10 sm:h-14 w-auto"
            fetchPriority="high"
          />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white hover:text-[#e4ff30] transition-colors"
          >
            View on GitHub
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start md:items-center">
          <div className="order-2 md:order-1 space-y-5 sm:space-y-8">
            <div>
              <label
                htmlFor="qr-input"
                className="block text-xs sm:text-sm text-gray-400 mb-2 tracking-wide"
              >
                Enter your Website
              </label>
              <input
                id="qr-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://myweb.com or any link..."
                className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-black border text-[#e4ff30] border-white  rounded text-base sm:text focus:border-[#e4ff30] focus:ring-1 focus:ring-[#e4ff30] outline-none transition-all"
              />
            </div>

            <button
              type="button"
              onClick={pasteFromClipboard}
              className={secondaryButtonClass}
              aria-label="Paste from clipboard"
            >
              Paste from Clipboard
            </button>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <DownloadButton
                loading={downloading === "png"}
                disabled={!qrValue}
                onClick={() => downloadPNG(qrValue)}
                aria-label="Download QR code as PNG"
              >
                Download PNG
              </DownloadButton>
              <DownloadButton
                loading={downloading === "svg"}
                disabled={!qrValue}
                onClick={() => downloadSVG(qrValue)}
                aria-label="Download QR code as SVG"
              >
                Download SVG
              </DownloadButton>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <QRPreview value={qrValue} size={qrSize} />
          </div>
        </div>

        <footer className="text-center text-gray-500 text-xs sm:text-sm mt-12 sm:mt-16">
          made by{" "}
          <a
            className="text-[#e4ff30] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/saidbourhabi"
          >
            saidbourhabi
          </a>
        </footer>
      </div>
    </main>
  );
}

export default Home;
