import React, { Fragment, useEffect } from 'react';
import Spinner from './../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

//Redux
import { connect } from 'react-redux';
import { getPosts } from './../../actions/post';

const Posts = ({ getPosts, post: { loading, posts } }: any) => {
  useEffect(() => {
    getPosts();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcom to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post: any) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
