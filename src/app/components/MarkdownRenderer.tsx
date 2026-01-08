"use client";
import { type ComponentPropsWithoutRef, useEffect, useState} from "react";
import Markdown from 'react-markdown';
// @ts-ignore
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

// Custom hook for dark mode detection
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial color scheme
    const checkColorScheme = () => {
      const isDark =
        document.documentElement.classList.contains("force-dark") ||
        (document.documentElement.classList.contains("color-scheme-adaptive") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);
    };

    // Check on mount
    checkColorScheme();

    // Set up listeners for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => checkColorScheme();
    mediaQuery.addEventListener("change", handleChange);

    // Observer for class changes on html element
    const observer = new MutationObserver(checkColorScheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  return isDarkMode;
}

function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);
  const isDarkMode = useDarkMode();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy code:", err);
      });
  };

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 bg-primary px-2 py-1 rounded text-sm hover:opacity-80 transition-opacity"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        style={isDarkMode ? oneDark : oneLight}
        language={language}
        PreTag="div"
        className="!rounded-lg !m-0"
        customStyle={{
          borderRadius: "0.5rem",
          margin: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <section className="markdown-content whitespace-pre-line">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Use 'inline' instead of spreading '...props' to avoid DOM errors on the code tag
                    code(props: ComponentPropsWithoutRef<"code"> & {inline?: boolean, className?: string}) {
                        const match = /language-(\w+)/.exec(props.className || "");
                        return !props.inline && match ? (
                            <CodeBlock language={match[1]}>
                                {String(props.children).replace(/\n$/, '')}
                            </CodeBlock>
                        ) : (
                            <code className={`${props.className}`} >
                                {props.children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </Markdown>
        </section>
    );
}