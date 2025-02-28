import { FC, useContext } from 'react';
import LeftArrowSVG from '../SVGs/LeftArrowSVG';
import UpArrowSVG from '../SVGs/UpArrowSVG';
import CardSelectorButton from './CardSelectorButton';
import ShareButtonSVG from '../SVGs/ShareButtonSVG';
import BrainContext from '../../store/BrainContext';
import useShare from '../../hooks/useShare';
import { Strings } from '../../constants/strings';

interface CardSelectorProps {
  extraClassName?: string;
  handleClickPrevious: () => void;
  handleClickBackToTop: () => void;
  disableBackToTop: boolean;
}

const CardSelector: FC<CardSelectorProps> = ({
  extraClassName,
  handleClickPrevious,
  handleClickBackToTop,
  disableBackToTop,
}) => {
  const brainContext = useContext(BrainContext);

  const getShareURL = () => {
    const params = brainContext.getShareURLParams();
    return `${window.location.href}?${params}`;
  };

  const { share } = useShare();
  const handleShare = () => {
    share(getShareURL(), Strings.shareTitle, Strings.shareDescription);
  };

  const bordercolor = 'border-amber-300';
  return (
    <div
      key="fixed"
      className={`${
        extraClassName ? extraClassName + ' ' : ''
      } rounded-2xl ${bordercolor} z-1 absolute inset-0 border-2 pointer-events-none`}
    >
      <div className="absolute top-full right-4 flex gap-2 pointer-events-auto">
        {/*Previous Button*/}
        <CardSelectorButton
          disabled={brainContext.hasCardHistory === false}
          onClick={(e) => {
            e.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item
            handleClickPrevious();
          }}
          className={`${bordercolor}`}
        >
          <LeftArrowSVG alt="previous" />
        </CardSelectorButton>

        {/*Back to Top Button*/}
        <CardSelectorButton
          disabled={disableBackToTop}
          onClick={(e) => {
            e.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item
            handleClickBackToTop();
          }}
          className={`${bordercolor}`}
        >
          <UpArrowSVG alt="Back-To-Top" />{' '}
          {/*Seems having a space causes issue on firefox, related to aria-label*/}
        </CardSelectorButton>

        {/*Share Button*/}
        <CardSelectorButton
          onClick={(e) => {
            e.stopPropagation(); // don't click on the whole card if we're clicking on a specific card item
            handleShare();
          }}
          className={`${bordercolor}`}
        >
          <ShareButtonSVG alt="share" />
        </CardSelectorButton>
      </div>
    </div>
  );
};

export default CardSelector;
