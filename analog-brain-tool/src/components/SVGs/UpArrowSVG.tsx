import { SVGTemplate, SVGTemplateProps } from './SVGTemplate';

type UpArrowSVGProps = SVGTemplateProps;

export const UpArrowSVG: React.FC<UpArrowSVGProps> = (props) => {
  const d =
    'M16,4l-8.3,8.3C7.1,12.9,7.5,14,8.4,14H13v13c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1V14h4.6c0.9,0,1.3-1.1,0.7-1.7 L16,4z';

  return <SVGTemplate {...props} draw={d}></SVGTemplate>;
};
