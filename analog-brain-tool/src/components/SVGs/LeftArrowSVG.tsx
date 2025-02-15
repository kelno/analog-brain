interface LeftArrowSVGProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LeftArrowSVG: React.FC<LeftArrowSVGProps> = ({ width = 24, height = 24, className }) => {
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={width}
      height={height}
      className={className}
    >
      <path
        className="w-full h-full"
        fill="none"
        color="currentcolor"
        stroke="currentcolor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        d="M4,16l8.3,8.3c0.6,0.6,1.7,0.2,1.7-0.7V19h13c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1H14V8.4c0-0.9-1.1-1.3-1.7-0.7
	L4,16z"
      />
    </svg>
  );
};

export default LeftArrowSVG;
