import { FC, RefAttributes } from 'react';

interface CardSelectorProps extends RefAttributes<HTMLDivElement> {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const CardSelector: FC<CardSelectorProps> = ({ ref, cardRef }) => {
  let dynamicHeight = 0;
  let dynamicWidth = 0;
  let dynamicTop = 0;
  if (cardRef !== null && cardRef.current && cardRef.current.parentElement) {
    dynamicHeight = cardRef.current?.clientHeight ?? 0;
    dynamicWidth = cardRef.current?.clientWidth ?? 0;

    const cardRect = cardRef.current.getBoundingClientRect();
    const parentRect = cardRef.current.parentElement.getBoundingClientRect();
    dynamicTop = cardRect.top - parentRect.top;
  }
  console.debug(dynamicHeight);
  console.debug(dynamicWidth);
  console.debug('top ' + dynamicTop);

  return (
    <div
      ref={ref}
      style={{ height: `${dynamicHeight}px`, width: `${dynamicWidth}px`, top: `${dynamicTop}px` }}
      className="pointer-events-none rounded-2xl border-amber-300 z-50 absolute border-2 transition-all duration-200 ease-in-out"
    ></div>
  );
};

export default CardSelector;

/*
  // Dynamically set the height of the second element to match the first
  useEffect(() => {
    if (cardRef.current && selectorRef.current) {
      console.log('useEffect ' + currentCardId);
      selectorRef.current.style.height = `${cardRef.current.clientHeight}px`;
      selectorRef.current.style.width = `${cardRef.current.clientWidth}px`;
    }
  }, [currentCardId]);

  */
