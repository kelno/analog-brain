import React from 'react';

interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => (
  <span title={text} style={{ cursor: 'help' }}>
    ℹ️
  </span>
);
