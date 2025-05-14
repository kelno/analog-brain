import { ReactNode } from 'react';
import { InfoTooltip } from '../components/InfoTooltip';

/**
 * Processes text content to support:
 * - Line breaks (via \n)
 * - Basic Markdown: **bold**, *italic* (NYI, consider using a lightweight Markdown parser library)
 * - Custom info syntax: |tooltip text| shows as ℹ️ with tooltip
 *
 * @param text The raw text to process
 * @returns ReactNode with processed content
 */
export function processTextContent(text: string): ReactNode {
  const sanitizedText = text.trim();
  if (!sanitizedText) return null;

  // Regular expression to match pipe-enclosed text and line breaks
  const regex = /%([^%]+)%|(\n)/g;
  let lastIndex = 0;
  const parts: ReactNode[] = [];
  let match: RegExpExecArray | null;

  // Process all matches
  while ((match = regex.exec(sanitizedText)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(sanitizedText.slice(lastIndex, match.index));
    }

    // Handle tooltip or line break
    if (match[1]) {
      // It's a tooltip
      parts.push(<InfoTooltip key={`info-${match.index}`} text={match[1].trim()} />);
    } else {
      // It's a line break
      parts.push(<br key={`br-${match.index}`} />);
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < sanitizedText.length) {
    parts.push(sanitizedText.slice(lastIndex));
  }

  return <>{parts}</>;
}
