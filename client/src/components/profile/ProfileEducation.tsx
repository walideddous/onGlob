import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, since, description },
}: any) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{since}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}{' '}
      </p>
      <p>
        <strong>Degree : </strong>
        {degree}{' '}
      </p>
      <p>
        <strong>field of Study : </strong>
        {fieldofstudy}{' '}
      </p>
      <p>
        <strong>Description : </strong>
        {description}{' '}
      </p>
    </div>
  );
};

export default ProfileEducation;
