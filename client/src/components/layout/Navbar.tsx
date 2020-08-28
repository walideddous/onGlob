import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout }: any) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/Alan'>Alan</Link>
      </li>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const gestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'> Register</Link>
      </li>
      <li>
        <Link to='/login'> Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> OnGlob
        </Link>
      </h1>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : gestLinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
