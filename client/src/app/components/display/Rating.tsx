import * as React from 'react';

import { colorMap } from 'common/theme/theme';
import { titleRightGreyLevel1, body1RightGreyLevel1 } from 'common/theme/styleguide';

import { style, cssRaw } from 'typestyle';
import * as classnames from 'classnames';
import { NestedCSSSelectors } from 'typestyle/lib/types';

const starColor = '#f2b01e';
const starDefaultColor = '#f0f0f0';
const backgroundColor = '#2a2a2a';

const RatingWrapperStyle = style({

});

const RatingBoxStyle = style({
    color: colorMap.brownGrey,
    textShadow: '0px 1px 10px rgba(0, 0, 0, 1)',
    margin: 'auto',
});

const CommonStartCSS = {
    fontSize: '16px',
    height: '32px',
    width: '32px',
    padding: '2px',
    fontFamily: 'materialinear',
    position: 'relative' as 'relative',
    display: 'inline-block' as 'inline-block',
};

const CommonIcon = {
    position: 'absolute',
    left: 0,
    overflow: 'hidden',
};

const RatingStarStyle = style({
    ...CommonStartCSS,
});

const FullStarStyle = style({
    ...CommonStartCSS,
    $nest: {
        '&:before': {
            ...CommonIcon as NestedCSSSelectors,
            color: starColor,
        },
    },
});

const EmptyStarStyle = style({
    ...CommonStartCSS,
    $nest: {
        '&:before': {
            ...CommonIcon as NestedCSSSelectors,
            color: starDefaultColor,
        },
    },
});

const HalfStarStarStyle = style({
    ...CommonStartCSS,
    $nest: {
        '&:before': {
            ...CommonIcon as NestedCSSSelectors,
            color: starColor,
            width: '50%',
        },
        '&:after': {
            ...CommonIcon as NestedCSSSelectors,
            color: colorMap.lightGrey,
            left: '8px',
            width: '50%',
            textIndent: '-8px',
            overflow: 'hidden',
        },
    },
});

export interface IRatingProps {
    value: number,
    rating: number,
    max: number,
    className?: string,
}

export type STAR_FILL_TYPE = 'full' | 'empty' | 'half';

export const getStarFill = (current, value, rating, max): STAR_FILL_TYPE => {
    const numberByStar = (1 / value) * 100;

    const valeurMin = (current - 1) * numberByStar;
    const valeurMax = current * numberByStar;

    const ratingLevel = Math.ceil((rating / max) * 100);

    if (ratingLevel >= valeurMax) {
        return 'full';
    }
    if (ratingLevel > valeurMin) {
        return 'half';
    }

    return 'empty';
};

const getStarFillStyle = (current, value, rating, max): string => {
    const fillType = getStarFill(current, value, rating, max);
    switch (fillType) {
        case 'full':
            return FullStarStyle;
        case 'half':
            return HalfStarStarStyle;
        default:
            return EmptyStarStyle;
    }
};

class Rating extends React.PureComponent<IRatingProps> {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { className, rating, value, max } = this.props;

        return (
            <div className={classnames(RatingWrapperStyle, className)}>
                {
                    Array(value).fill(0).map((element, index) => {
                        const fillMode = getStarFill(index + 1, value, rating, max);
                        return <span key={index} className={classnames((fillMode === 'half') ? 'icon-starHalfRating' : 'icon-star', getStarFillStyle(index + 1, value, rating, max))}></span>;
                    })
                }
            </div>
        );
    }
}

export default Rating;
