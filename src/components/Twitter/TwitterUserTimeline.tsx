/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// node_modules
import React, { useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';

// styles
import { get } from 'lodash';
import { Button, Container } from '@material-ui/core';
// import { useTwitterTimelinesStyles } from './TwitterTimelines.styles';

// libraries

// components

export function TwitterUserTimeline(props: {
  tweetsLoading: boolean;
  tweets: any[]
  isAuthenticated: boolean;
  onClickAuthenticate: (event: any) => void | Promise<void>;
}): JSX.Element {
  // deconstruct for ease
  const {
    tweetsLoading,
    tweets,
    isAuthenticated,
    onClickAuthenticate,
  } = props;
  const containerRef = useRef();
  // render
  return (
    <Container
      style={{
        minHeight: 440, maxHeight: 440, height: '100%', overflow: 'scroll',
      }}
      // onScroll={(event) => {
      //   if ((containerRef.current as any).scrollTop === ((containerRef.current as any).scrollHeight - (containerRef.current as any).clientHeight)) {
      //     console.log(containerRef);
      //     console.log('AT BOTTOM!');
      //   }
      // }}
      // ref={containerRef as any}
    >
      {
          !isAuthenticated
            ? (
              <Button onClick={onClickAuthenticate}>
                Authenticate
              </Button>
            )
            : tweetsLoading
              ? (
                <div>Loading user timeline...</div>
              )
              : !tweets || !tweets.length
                ? (
                  <div>Loading user timeline...</div>
                )
                : (
                  <Table>
                    <TableBody>
                      {tweets.map((tweet) => (
                        <TableRow>
                          <TableCell>{new Date(tweet.createdAt).toISOString()}</TableCell>
                          <TableCell>{tweet.user.screenName}</TableCell>
                          <TableCell>{tweet.text}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
        }
    </Container>
  );
}
