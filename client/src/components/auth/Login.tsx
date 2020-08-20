import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loginUser } from './../../actions/auth';

const Login = ({ loginUser, isAuthenticated }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log('SUCCESS');
    loginUser({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength={6}
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
