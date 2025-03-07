// Fowards every children and props too

import { PropsWithChildren } from 'react';

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

function Section({ children, title, ...props }: PropsWithChildren<SectionProps>) {
  return (
    <section {...props} className="mt-8">
      <h2 className="text-3xl text-brain-secondary">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default Section;
