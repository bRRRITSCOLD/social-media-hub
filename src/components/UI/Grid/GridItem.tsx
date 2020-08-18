// node_modules
import React from 'react';
import Grid from '@material-ui/core/Grid';

// styles
import { useGridItemStyles } from './GridItem.styles';

export function GridItem(props: {
  [key: string]: any;
  [key: number]: any;
  children: any;
}): JSX.Element {
  // deconstruct for ease
  const { children, ...rest } = props;
  // styles
  const gridItemStyles = useGridItemStyles();
  // render
  return (
    <Grid item {...rest} className={gridItemStyles.grid}>
      {children}
    </Grid>
  );
}
