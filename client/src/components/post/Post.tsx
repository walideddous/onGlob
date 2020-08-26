import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

// Redux
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }: any) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link className='btn' to='/posts'>
        Back To Posts
      </Link>{' '}
      <PostItem post={post} showActions={true} />{' '}
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post &&
          post.comments &&
          post.comments.map((comment: any) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
