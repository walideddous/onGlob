import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, to, since, description },
}: any) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{since}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}{' '}
      </p>
      <p>
        <strong>Postion : </strong>
        {title}{' '}
      </p>
      <p>
        <strong>Description : </strong>
        {description}{' '}
      </p>
    </div>
  );
};

export default ProfileExperience;
