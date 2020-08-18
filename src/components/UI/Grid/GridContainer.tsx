// node_modules
import React from 'react';
import Grid from '@material-ui/core/Grid';

// styles
import { useGridContainerStyles } from './GridContainer.styles';

export function GridContainer(props: {
  [key: string]: any;
  [key: number]: any;
  children: any;
}): JSX.Element {
  // deconstruct for ease
  const { children, ...rest } = props;
  // styles
  const gridContainerStyles = useGridContainerStyles();
  // render
  return (
    <Grid container {...rest} className={gridContainerStyles.grid}>
      {children}
    </Grid>
  );
}
