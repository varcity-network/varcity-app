import React, { Component } from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {getEducation, updateEducation} from './actions';
import { browserHistory } from 'react-router';
import EduList from './EduList';
import EduForm from './EduForm';


class EduPages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      educations: {
        institution: '', 
        year: 2017, 
        country: '', 
        city: '', 
        state: '', 
        degree: '', 
        satReading: '', 
        satWriting: '', 
        satMath: '', 
        actMath: '', 
        actReading: '', 
        actScience: '', 
        actWriting: '', 
        ibHistory: '', 
        ibLanguage: '', 
        ibMath: '', 
        ibScience: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentWillMount() {
  //   if (this.props.educations[0].id == '') {
  //     this.props.actions.loadEducation();
  //   }
  // }

  handleChange(event) {
    this.setState({
      educations: {
      [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit() {
    // send to db
  }

  render() {
    // const educations = this.props.educations;
    return (
      <div className="">
        <EduForm onSubmit={this.handleSubmit} onChange={this.handleChange} props={this.state.educations} />

        {/* <EduPresentation />  */}
        {/* <h1>Education<Link to={'/edu/new'} className="">Education ++</Link></h1>
        <div className="">
          <EduList educations={educations} />
        </div>
        <div className="">
          {this.props.children}
        </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.educations.length > 0) {
    return {
      educations: state.educations, 
      authId: state.authId
    };
  } else {
    return {
      educations: [{
        institution: '', 
        year: 2017, 
        country: '', 
        city: '', 
        state: '', 
        degree: '', 
        satReading: '', 
        satWriting: '', 
        satMath: '', 
        actMath: '', 
        actReading: '', 
        actScience: '', 
        actWriting: '', 
        ibHistory: '', 
        ibLanguage: '', 
        ibMath: '', 
        ibScience: ''
      }],
      authId: state.authId
    }
  }
}

const mapDispatchToProps = { getEducation, updateEducation };


// function mapDispatchToProps(dispatch) {
//   return {actions: bindActionCreators(actions, dispatch)}
// }

export default connect(mapStateToProps, mapDispatchToProps)(EduPages);