import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getProfileGithub } from '../../actions/profile';

const ProfileGithub = ({ getProfileGithub, username, repos }: any) => {
  useEffect(() => {
    getProfileGithub(username);
  }, [getProfileGithub, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo: any) => (
          <Fragment>
            <div key={repo._id} className='repo bg-white p-1 my-1'>
              <h4>
                <a href={repo.html_url} rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </Fragment>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  repos: state.profile.repos,
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getProfileGithub })(ProfileGithub);
