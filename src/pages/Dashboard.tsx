// node_modules
import React, { useEffect } from 'react';
import { Button, Dialog, IconButton } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
// import CloseIcon from '@material-ui/icons/Close';
// import { get } from 'lodash';

// libraries
// import { useStoreActions, useStoreState } from '../lib/hooks';

// componenets
import { GridContainer, GridItem } from '../components/UI/Grid';
import { Card } from '../components/UI/Card/Card';
import { TwitterTimelines } from '../components/Twitter/TwitterTimeline/TwitterTimelines';
// import { CardBody } from '../components/UI/Card/CardBody';
// import { CardFooter } from '../components/UI/Card/CardFooter';

// styles

const Dashboard: React.FC = () => {
  // render component
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TwitterTimelines />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <h2>Facebook</h2>
            <Button onClick={() => console.log('Facebook')}>
              Facebook
            </Button>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <h2>Instagram</h2>
            <Button onClick={() => console.log('Instagram')}>
              Instagram
            </Button>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default Dashboard;
