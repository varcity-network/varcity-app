import React from 'react';

export default function InfoPresentation({ info }) {
  console.log('InfoPresentation',info);
  const age = getAge(info.person.dob);

  return (
    <div>
      <div className="image is-128x128">
        <img src={info.profileUrl} alt="Profile" />
      </div>

      <div className="content">
        <h1>{info.firstName} {info.lastName}</h1>
      </div>

      <div>
        <table className="table">
          <tbody>
            <tr>
              <td>Age</td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>Sport</td>
              <td>{info.primarySport} {info.position}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{info.person.height} {info.person.heightUom}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{info.person.weight} {info.person.weightUom}</td>
            </tr>
            <tr>
              <td>Organization</td>
              <td>{info.organization}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{info.location.city} {info.location.state} {info.location.country}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="box">
        <span>
          <a className="icon is-medium" href={info.socials.facebookUrl}>
            <i className="fa fa-facebook fa-lg"></i>
          </a>
        </span>
        <span>
          <a className="icon is-medium" href={info.socials.twitterUrl}>
            <i className="fa fa-twitter fa-lg"></i>
          </a>
        </span>
        <span>
          <a className="icon is-medium" href={info.socials.instagramUrl}>
            <i className="fa fa-instagram fa-lg"></i>
          </a>
        </span>
      </div>

      <div className="box content">
        <blockquote>{info.about}</blockquote>
        <p>{info.awards}</p>
      </div>
    </div>
  );
}

// function _calculateAge(birthday) { // birthday is a date
//   var ageDifMs = Date.now() - birthday.getTime();
//   var ageDate = new Date(ageDifMs); // miliseconds from epoch
//   return Math.abs(ageDate.getUTCFullYear() - 1970);
// }

function getAge(dob) {
  if (!dob) return 0;
  const diffMS = Date.now() - dob.getTime();
  const ageDate = new Date(diffMS);
  const years = Math.abs(ageDate.getUTCFullYear() - 1970);
  console.log('getAge',diffMS,ageDate,years );

  return `${years} years old`;
}