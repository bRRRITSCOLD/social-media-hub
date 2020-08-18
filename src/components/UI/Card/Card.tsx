// node_modules
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// styles
import { useCardStyles } from './Card.styles';

export function Card(props: {
  children?: any;
}): JSX.Element {
  // deconstruct for ease
  const {
    children, ...rest
  } = props;
  // styles
  const cardStyles = useCardStyles();
  const cardClasses = classNames({
    [cardStyles.card]: true,
    // [cardStyles.cardPlain]: plain,
    // [cardStyles.cardProfile]: profile,
    // [cardStyles.cardChart]: chart,
    // [className as string]: className !== undefined,
  });
  // render
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}
