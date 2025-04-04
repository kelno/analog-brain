export interface SVGTemplateProps {
  alt: string;
  draw?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const SVGTemplate: React.FC<SVGTemplateProps> = ({
  alt,
  draw,
  width = 24,
  height = 24,
  className = '',
}) => {
  return (
    <svg
      role="graphics-symbol"
      aria-label={alt}
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={width}
      height={height}
      className={`${className}`}
    >
      <path
        className="w-full h-full"
        fill="none"
        color="currentcolor"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d={draw}
      />
    </svg>
  );
};
