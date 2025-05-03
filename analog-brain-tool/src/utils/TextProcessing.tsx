import React, { ReactNode } from 'react';

/**
 * Processes text content to support:
 * - Line breaks (via \n)
 * - Basic Markdown: **bold**, *italic* (NYI, consider using a lightweight Markdown parser library)
 * - Custom info syntax: |ℹ️ tooltip text| (NYI)
 *
 * @param text The raw text to process
 * @returns ReactNode with processed content
 */
export function processTextContent(text: string): ReactNode {
  if (!text.includes('\n')) return text;

  // Split by newlines and create an array of elements
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}
