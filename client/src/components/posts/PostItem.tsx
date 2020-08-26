import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  showActions,
  deletePost,
}: any) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to='/profile'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => addLike(_id)}
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>
                {' '}
                {likes && likes.length > 0 && (
                  <span>{likes && likes.length}</span>
                )}
              </span>
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={(e) => removeLike(_id)}
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments && comments.length > 0 && (
                <span className='comment-count'>
                  {comments && comments.length}
                </span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={(e) => deletePost(_id)}
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
