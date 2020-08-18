// node_modi;es
import React from 'react';
import classNames from 'classnames';

// styles
import { useCardHeaderStyles } from './CardHeader.styles';

export function CardHeader(props: {
  children: any;
}): JSX.Element {
  // deconstruct for ease
  const { children, ...rest } = props;
  // styles
  const classes = useCardHeaderStyles();
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    // [classes[`${color}CardHeader`]]: color,
    // [classes.cardHeaderPlain]: plain,
    // [classes.cardHeaderStats]: stats,
    // [classes.cardHeaderIcon]: icon,
    // [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}
