import SVGTemplate, { SVGTemplateProps } from './SVGTemplate';

type ShareButtonSVGProps = SVGTemplateProps;

const ShareButtonSVG: React.FC<ShareButtonSVGProps> = (props) => {
  const d =
    'M14,11.8L14,11.8l0-4.6c0-0.9-1.1-1.3-1.7-0.7L4,14.8l8.3,8.3c0.6,0.6,1.7,0.2,1.7-0.7v-4.6h0 c5.3,0,9.8,3.7,11,8.8l0,0.2v-4C25,16.7,20.1,11.8,14,11.8z';

  return (
    <SVGTemplate
      {...props}
      draw={d}
      className={`${props.className ? props.className : ''} scale-x-[-1]`}
    ></SVGTemplate>
  );
};

export default ShareButtonSVG;
