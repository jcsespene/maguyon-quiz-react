import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathTextProps {
  children: string;
  className?: string;
}

/**
 * Renders text with inline LaTeX math expressions and underlined text.
 * Use $...$ for inline math, e.g., "The formula is $x^2 + y^2 = z^2$"
 * Use _..._ for underlined text, e.g., "The _underlined_ word"
 */
export function MathText({ children, className }: MathTextProps) {
  // First split by $...$ patterns for inline math, then handle underscores
  const parts = children.split(/(\$[^$]+\$)/g);

  const renderTextWithUnderlines = (text: string, baseKey: number) => {
    // Split by _..._ patterns for underlined text
    const underlineParts = text.split(/(_[^_]+_)/g);
    return underlineParts.map((part, idx) => {
      if (part.startsWith('_') && part.endsWith('_') && part.length > 2) {
        // This is underlined text
        const underlinedText = part.slice(1, -1);
        return (
          <span key={`${baseKey}-${idx}`} style={{ textDecoration: 'underline' }}>
            {underlinedText}
          </span>
        );
      }
      return <span key={`${baseKey}-${idx}`}>{part}</span>;
    });
  };

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // This is a math expression
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, {
              throwOnError: false,
              displayMode: false,
            });
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            // If KaTeX fails, just show the original text
            return <span key={index}>{part}</span>;
          }
        }
        // Regular text - check for underlined parts
        return <span key={index}>{renderTextWithUnderlines(part, index)}</span>;
      })}
    </span>
  );
}
