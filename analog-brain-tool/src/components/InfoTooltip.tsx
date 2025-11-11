import React from 'react';

interface InfoTooltipProps {
  text: string;
}

/* Info tooltip to be put anywhere in text, accessible on hover or click 
TODO: should be a full screen modal or something!
*/
export const DetailsTooltip: React.FC<InfoTooltipProps> = ({ text }) => (
  <button type="button" aria-label="Details" title={text} className="inline-flex items-center cursor-help">
    <span aria-hidden="true" className="info-icon">
      ℹ️
    </span>
  </button>
);
