// // node_modules
// import React, { useEffect } from 'react';
// import { Button } from '@material-ui/core';

// // componenets
// import TwitterPostForm from '../components/Twitter/TwitterPostForm/TwitterPostForm';
// // import TwitterPostList from '../components/Twitter/TwitterPostList/TwitterPostList';

// // styles
// // import { useStoreActions, useStoreState } from '../hooks';
// import { useStoreActions, useStoreState } from '../lib/hooks';

// const Home: React.FC = ({ location }: any) => {
//   // const twitterStore = useStoreState((state) => state.twitter);
//   const twitterActions = useStoreActions((state) => state.twitter);
//   useEffect(() => {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   const onClick = async () => {
//     await twitterActions.getOAuthRequestToken();
//     return false;
//   };
//   // let loading = false;
//   return (
//     <>
//       <TwitterPostForm />
//       <Button onClick={onClick}>
//         Connect
//       </Button>
//       {/* <TwitterPostList posts={twitterStore.posts} /> */}
//     </>
//   );
// };

// export default Home;

// node_modules
import React from 'react';

// componenets

// styles

const Home: React.FC = () => {
  // render element
  return (
    <>
      Home!
    </>
  );
};

export default Home;
