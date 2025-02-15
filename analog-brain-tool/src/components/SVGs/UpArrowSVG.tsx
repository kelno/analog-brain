interface UpArrowSVGProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const UpArrowSVG: React.FC<UpArrowSVGProps> = ({ width = 24, height = 24, className }) => {
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
        d="M16,4l-8.3,8.3C7.1,12.9,7.5,14,8.4,14H13v13c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1V14h4.6c0.9,0,1.3-1.1,0.7-1.7
	L16,4z"
      />
    </svg>
  );
};

export default UpArrowSVG;
