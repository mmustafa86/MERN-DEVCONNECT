import React from "react";
import PropTypes from "prop-types";
import Momoent from "react-moment";

const ProfileEducation = ({
    education: { school, degree, fieldofstudy, current, to, from, description }
  }) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Momoent format="YYYY/MM/DD">{from}</Momoent> -
        {!to ? "now" : <Momoent format="YYYY/MM/DD">{to}</Momoent>}
      </p>
      <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field Of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
