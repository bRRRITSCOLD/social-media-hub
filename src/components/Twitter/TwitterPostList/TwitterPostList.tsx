// node_modules
import React, { ReactNode } from 'react';
// styles
import { TwitterPostInterface } from '../../../models/twitter';
import TwitterPost from '../TwitterPost/TwitterPost';

const TwitterPostList: React.FC<{
  posts: TwitterPostInterface[];
}> = ({
  posts,
}: { posts: TwitterPostInterface[]; }) => {
  return (
    <div>
      {
        posts.map((post: TwitterPostInterface) => (
          <TwitterPost
            body={post.body}
            createdDate={post.createdDate}
          />
        ))
      }
    </div>
  );
};

export default TwitterPostList;
