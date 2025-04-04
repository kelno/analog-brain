import { SVGTemplate, SVGTemplateProps } from './SVGTemplate';

type LeftArrowSVGProps = SVGTemplateProps;

export const LeftArrowSVG: React.FC<LeftArrowSVGProps> = (props) => {
  const d =
    'M4,16l8.3,8.3c0.6,0.6,1.7,0.2,1.7-0.7V19h13c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1H14V8.4c0-0.9-1.1-1.3-1.7-0.7 L4,16z';

  return <SVGTemplate {...props} draw={d}></SVGTemplate>;
};
