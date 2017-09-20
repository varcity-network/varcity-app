import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfo, updateInfo } from '../store/athletes/actions';
import { getCountries, getRegions, getCities } from './address/actions';
import { TextInput, TextArea, NumberInput, DateInput, Toggle, TextSelect, UrlInput } from '../app/FormControls';
import sports from '../utils/sports';
import defaultValues from '../store/athletes/defaultValues';

export class Info extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editModeOn: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  componentWillMount() {
    this.props.getInfo(this.props.currentId);
    this.props.getCountries();
  }

  handleOnChange(value, id) {
    console.log(id, 'was changed to ', value);
    this.props.updateInfo(id, value);
  }
  
  handleCountryChange(value) {
    console.log('was changed to ', value);
    const { country } = value;
    this.props.getRegions(country);
  }

  handleRegionChange(value) {

  }

  handleCityChange(value) {

  }

  handleOnClick() {
    // console.log('currentId',this.props.currentId,'authId',this.props.authId);
    // if (this.props.currentId === this.props.authId) {
    //   console.log('edit mode allowed');
    //   this.setState({
    //     editModeOn: this.state.editModeOn ? false : true
    //   });
    // } else {
    //   console.log('edit mode NOT allowed');
    // }
  }

  render() {
    // TODO: set the loading state instead of using defaultValues
    const { info } = this.props.athletes[this.props.currentId] || defaultValues[123];
    const onChange = this.handleOnChange;
    const disabled = this.state.editMode;
    const heightUOM = [{ id: 1, text: 'in' }, { id: 2, text: 'cm' }];
    const weightUOM = [{ id: 1, text: 'lb' }, { id: 2, text: 'kg' }];

    console.log('this.props', this.props);
    console.log('this.state', this.state);
    return (
      <div className="column">
        <EditButton editModeOn={this.state.editMode} onClick={this.handleOnClick} />

        <div className="tile is-ancestor">

          <div className="tile is-vertical">
            <UrlInput value={info.profileUrl} propName="profileUrl" label="Image" change={onChange} disabled={disabled} />
          </div>
          
          <div className="tile is-vertical">
            <TextInput value={info.firstName} propName="firstName" label="First Name" change={onChange} disabled={disabled} />
            <TextInput value={info.lastName} propName="lastName" label="Last Name" change={onChange} disabled={disabled} />  
            <Toggle value={info.public} propName="public" label="Public Profile?" change={onChange} disabled={disabled} />
            {/* <DateInput value={info.person.dob} propName="dob" label="Birthday" change={onChange} disabled={disabled} /> */}
            <TextSelect value={info.primarySport} propName="primarySport" label="Primary Sport" options={sports} change={onChange} disabled={disabled} />
            <TextInput value={info.position} propName="position" label="Position" change={onChange} disabled={disabled} />
            <TextInput value={info.organization} propName="organization" label="School/Organization" change={onChange} disabled={disabled} />
          </div>

          <div className="tile is-vertical">
            <TextSelect value={info.location.country} propName="country" label="Country" options={this.props.address.countries} change={this.handleCountryChange} disabled={disabled} />
            <TextSelect value={info.location.state} propName="region" label="State/Region" options={this.props.address.regions} change={this.handleRegionChange} disabled={disabled} /> 
            <TextSelect value={info.location.city} propName="city" label="City" options={this.props.address.regions} change={this.handleCityChange} disabled={disabled} /> 
          </div>

          <div className="tile is-vertical">
            <div className="field body is-narrow is-grouped is-grouped-multiline">
              <NumberInput value={info.person.height} propName="height" label="Height" change={onChange} disabled={disabled} />
              <TextSelect value={info.person.heightUom} propName="heightUOM" label="(in/cm)" options={heightUOM} change={onChange} disabled={disabled} />
              <NumberInput value={info.person.weight} propName="weight" label="Weight" change={onChange} disabled={disabled} />
              <TextSelect value={info.person.weightUom} propName="weightUOM" label="(lb/kg)" options={weightUOM} change={onChange} disabled={disabled} />
            </div>
          </div>

          <div className="is-grouped is-grouped-multiline">
            <UrlInput value={info.socials.facebookUrl} propName="facebookUrl" label="Facebook" change={onChange} disabled={disabled} />
            <UrlInput value={info.socials.twitterUrl} propName="twitterUrl" label="Twitter" change={onChange} disabled={disabled} />
            <UrlInput value={info.socials.instagramUrl} propName="instagramUrl" label="Instagram" change={onChange} disabled={disabled} />
          </div>
        </div>
        {/* <div className="tile is-vertical">
          <TextArea value={bio.about} propName="about" label="Bio" change={onChange} disabled={disabled} />
          <TextArea value={bio.awards} propName="awards" label="Awards" change={onChange} disabled={disabled} />
        </div> */}
      </div>
    );
  }
}

function EditButton(editModeOn, onClick) {
  return (
    <div>
      <button className="button" onClick={onClick}>
        <span>
          <icon className={
            editModeOn ? 'fa fa-check fa-lg' : 'fa fa-pencil fa-lg'}
          /></span>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    athletes: state.athletes,
    address: state.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfo: (id) => {
      dispatch(getInfo(id));
    },
    updateInfo: (id) => {
      dispatch(updateInfo(id));
    },
    getCountries: () => {
      dispatch(getCountries());
    },
    getRegions: (country) => {
      dispatch(getRegions(country));
    },
    getCities: (country, region) => {
      dispatch(getCities(country, region));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      currentId: ownProps.location.pathname.split('/athletes/')[1],
    };
  })(Info);
