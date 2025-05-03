import React, { ReactNode } from 'react';

/**
 * Processes text content to support:
 * - Line breaks (via \n)
 * - Basic Markdown: **bold**, *italic* (TODO)
 * - Custom info syntax: |ℹ️ tooltip text| (TODO)
 *
 * @param text The raw text to process
 * @returns ReactNode with processed content
 */
export function processTextContent(text: string): ReactNode {
  // For now, just handle basic line breaks as a starting point
  if (!text.includes('\n') && !text.includes('<br>')) return text;

  // Split by newlines and create an array of elements
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));

  // TODO: Future enhancements:
  // 1. Parse Markdown-style formatting (**bold**, *italic*)
  // 2. Handle custom info popup syntax |ℹ️ tooltip text|
  // 3. Consider using a lightweight Markdown parser library
}
