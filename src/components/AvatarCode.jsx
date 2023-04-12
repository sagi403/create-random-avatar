import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import twilight from "react-syntax-highlighter/dist/esm/styles/prism/twilight";
import clipboardCopy from "clipboard-copy";
import { useCallback, useState } from "react";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const initialTwilight = JSON.parse(JSON.stringify(twilight));
initialTwilight['code[class*="language-"]'].fontSize = "12px";

const AvatarCode = ({ code }) => {
  const [customTwilight, setCustomTwilight] = useState(initialTwilight);

  const handleFontSizeChange = useCallback(increment => {
    setCustomTwilight(prevTwilight => {
      const prevFontSize = parseInt(
        prevTwilight['code[class*="language-"]'].fontSize,
        10
      );
      const newFontSize = prevFontSize + increment;
      const newTwilight = JSON.parse(JSON.stringify(prevTwilight));
      newTwilight['code[class*="language-"]'].fontSize = `${newFontSize}px`;
      return newTwilight;
    });
  }, []);

  const handleCopy = useCallback(() => {
    clipboardCopy(code);
  }, [code]);

  return (
    <div className="flex flex-col shadow-lg">
      <div className="flex justify-between items-center bg-neutral-800 pt-1 px-0.75 rounded-tl rounded-tr">
        <div className="text-neutral-100 py-2 px-4 bg-neutral-900 rounded-tl rounded-tr">
          Editor
        </div>
        <div className="mr-2">
          <button
            className="bg-neutral-700 px-2 py-1 text-neutral-100 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-transform duration-200 ease-in-out transform hover:scale-110"
            onClick={() => handleFontSizeChange(-1)}
          >
            <i className="bi bi-zoom-out"></i>
          </button>
          <button
            className="bg-neutral-700 px-2 py-1 text-neutral-100 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-transform duration-200 ease-in-out transform hover:scale-110"
            onClick={() => handleFontSizeChange(1)}
          >
            <i className="bi bi-zoom-in"></i>
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language="jsx"
        style={customTwilight}
        wrapLines={true}
        customStyle={{
          margin: "0px",
          borderRadius: "0px",
          borderTop: "none",
          borderLeft: "3px solid #262626",
          borderRight: "3px solid #262626",
          borderBottom: "3px solid #262626",
        }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="bg-neutral-800 w-full py-2 text-neutral-100 text-center rounded-bl rounded-br hover:shadow-lg active:-translate-y-0.5"
        onClick={handleCopy}
      >
        Copy to clipboard
      </button>
    </div>
  );
};

export default AvatarCode;
