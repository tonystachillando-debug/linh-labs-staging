import React from 'react';

/**
 * Renders a bot message with lightweight markdown formatting:
 * - **bold** → <strong>
 * - *italic* → <em>
 * - `code` → <code>
 * - line breaks (\n) → <br />
 * - bullet lines starting with "- " or "• " → <ul><li>
 */

interface MarkdownMessageProps {
  text: string;
  className?: string;
}

// Splits text into blocks: bullet lists and regular paragraphs
function parseBlocks(text: string): Array<{ type: 'list'; items: string[] } | { type: 'paragraph'; lines: string[] }> {
  const rawLines = text.split('\n');
  const blocks: Array<{ type: 'list'; items: string[] } | { type: 'paragraph'; lines: string[] }> = [];
  let currentList: string[] | null = null;
  let currentParagraph: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: 'list', items: currentList });
      currentList = null;
    }
  };

  const flushParagraph = () => {
    if (currentParagraph && currentParagraph.length > 0) {
      blocks.push({ type: 'paragraph', lines: currentParagraph });
      currentParagraph = null;
    }
  };

  for (const line of rawLines) {
    const isBullet = /^[-•*]\s+/.test(line.trim());

    if (isBullet) {
      flushParagraph();
      if (!currentList) currentList = [];
      currentList.push(line.trim().replace(/^[-•*]\s+/, ''));
    } else {
      flushList();
      if (!currentParagraph) currentParagraph = [];
      currentParagraph.push(line);
    }
  }

  flushList();
  flushParagraph();

  return blocks;
}

// Applies inline formatting (bold, italic, code) to a string, returns React nodes
function renderInline(text: string): React.ReactNode[] {
  // Pattern: **bold**, *italic*, `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i} style={{ color: '#e2e8f0', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code
          key={i}
          style={{
            background: 'rgba(6,182,212,0.15)',
            color: '#67e8f9',
            padding: '1px 5px',
            borderRadius: 4,
            fontSize: '0.9em',
            fontFamily: 'monospace',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ text, className }) => {
  const blocks = parseBlocks(text);

  return (
    <span className={className} style={{ display: 'block' }}>
      {blocks.map((block, bi) => {
        if (block.type === 'list') {
          return (
            <ul key={bi} style={{ margin: '6px 0', paddingLeft: '1.2em', listStyleType: 'disc' }}>
              {block.items.map((item, li) => (
                <li key={li} style={{ marginBottom: 2 }}>
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        // paragraph block — join non-empty lines with <br />, skip orphan empty lines
        return (
          <span key={bi} style={{ display: 'block', marginBottom: bi < blocks.length - 1 ? '0.6em' : 0 }}>
            {block.lines.map((line, li) => (
              <React.Fragment key={li}>
                {li > 0 && line === '' ? null : (
                  <>
                    {li > 0 && line !== '' && <br />}
                    {renderInline(line)}
                  </>
                )}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </span>
  );
};
