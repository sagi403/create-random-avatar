import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import twilight from "react-syntax-highlighter/dist/esm/styles/prism/twilight";
import clipboardCopy from "clipboard-copy";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const AvatarCode = ({ code }) => {
  const customTwilight = JSON.parse(JSON.stringify(twilight));

  customTwilight['code[class*="language-"]'].fontSize = "12px";

  const handleCopy = () => {
    clipboardCopy(code)
      .then(() => {
        console.log("Code copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy code:", err);
      });
  };

  return (
    <div className="flex flex-col">
      <SyntaxHighlighter
        language="jsx"
        style={customTwilight}
        wrapLines={true}
        customStyle={{
          margin: "0px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          border: "3px solid #404040",
        }}
      >
        {code}
      </SyntaxHighlighter>
      <button
        className="bg-neutral-700 py-2 text-white text-center rounded-bl rounded-br"
        onClick={handleCopy}
      >
        Copy to clipboard
      </button>
    </div>
  );
};

export default AvatarCode;
