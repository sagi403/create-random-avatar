import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import twilight from "react-syntax-highlighter/dist/esm/styles/prism/twilight";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const AvatarCode = ({ code }) => {
  const customTwilight = JSON.parse(JSON.stringify(twilight));

  customTwilight['code[class*="language-"]'].fontSize = "9px";

  return (
    <SyntaxHighlighter
      language="javascript"
      style={customTwilight}
      wrapLines={true}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default AvatarCode;
