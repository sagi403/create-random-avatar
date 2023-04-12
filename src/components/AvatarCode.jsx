import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import twilight from "react-syntax-highlighter/dist/esm/styles/prism/twilight";
import clipboardCopy from "clipboard-copy";
import { useState } from "react";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const AvatarCode = ({ code }) => {
  const [fontSize, setFontSize] = useState(12);
  const [customTwilight, setCustomTwilight] = useState(() => {
    const initialTwilight = JSON.parse(JSON.stringify(twilight));
    initialTwilight['code[class*="language-"]'].fontSize = `${fontSize}px`;
    return initialTwilight;
  });

  const handleFontSizeChange = increment => {
    setFontSize(prevFontSize => {
      const newFontSize = prevFontSize + increment;
      const newTwilight = JSON.parse(JSON.stringify(customTwilight));
      newTwilight['code[class*="language-"]'].fontSize = `${newFontSize}px`;
      setCustomTwilight(newTwilight);
      return newFontSize;
    });
  };

  const handleCopy = () => {
    clipboardCopy(code);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-neutral-700 pt-1 px-0.75 rounded-tl rounded-tr">
        <div className="text-white py-2 px-4 bg-neutral-900 rounded-tl rounded-tr">
          Editor
        </div>
        <div className="mr-2">
          <button
            className="bg-neutral-800 px-2 py-1 text-white rounded mr-2"
            onClick={() => handleFontSizeChange(-1)}
          >
            <i className="bi bi-zoom-out"></i>
          </button>
          <button
            className="bg-neutral-800 px-2 py-1 text-white rounded"
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
          borderLeft: "3px solid #404040",
          borderRight: "3px solid #404040",
          borderBottom: "3px solid #404040",
        }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="bg-neutral-700 w-full py-2 text-white text-center rounded-bl rounded-br"
        onClick={handleCopy}
      >
        Copy to clipboard
      </button>
    </div>
  );
};

export default AvatarCode;
