import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      phone: '',
      adress: '',
      country: '',
      region: '',
      cp:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
      profile.adress = !isEmpty(profile.adress) ? profile.adress : '';
      profile.country = !isEmpty(profile.country) ? profile.country : '';
      profile.region = !isEmpty(profile.region) ? profile.region : '';
      profile.cp = !isEmpty(profile.cp) ? profile.cp : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        phone: profile.phone,
        adress: profile.adress,
        country: profile.country,
        region: profile.region,
        cp: profile.cp
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      phone: this.state.phone,
      adress: this.state.adress,
      country: this.state.country,
      region: this.state.region,
      cp: this.state.cp
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors} = this.state;
    const country = [
      { label: 'Select Country', value: 0 },
      { label: 'Tunis', value: 'Tunis' },
      { label: 'Ariana', value: 'Ariana' },
      { label: 'Ben Arous', value: 'Ben Arous' },
      { label: 'Manouba', value: 'Manouba' },
      { label: 'Zaghouan', value: 'Zaghouan' },
      { label: 'Beja', value: 'Beja' },
      { label: 'Touzer', value: 'Touzer' },
      { label: 'Gabes', value: 'Gabes' },
      { label: 'Nabel', value: 'Nabel' }
    ];
  
    const regions = [
      {district: '', label: 'Select Region', value: '' },
      {district: 'Tunis', label: 'La Marsa', value: 'La Marsa' },
      {district: 'Tunis',label: 'Lac I', value: 'Lac I' },
      {district: 'Tunis',label: 'Carthage', value: 'Carthage' },
      {district: 'Ariana', label: 'La Soukra', value: 'La Soukra' },
      {district: 'Ariana',label: 'Borj Lozir', value: 'Borj Lozir' },
      {district: 'Ariana', label: 'Chotrana I', value: 'Chotrana I' },
      {district: 'Ben Arous', label: 'Zahra', value: 'Zahra' },
      {district: 'Ben Arous', label: 'Borj Sedria', value: 'Borj Sedria' },
      {district: 'Manouba', label: 'Douar hicher', value: 'Douar hicher' },
      {district: 'Nabel', label: 'kélibia', value: 'kélibia' }
    ];


    
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL."
                />
                <TextFieldGroup
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Create your phone number"
                />
                <TextFieldGroup
                  placeholder="Adress"
                  name="adress"
                  value={this.state.adress}
                  onChange={this.onChange}
                  error={errors.adress}
                  info="Create your adress"
                />
                <div className="adress-info">
                <SelectListGroup
                  placeholder="Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  options={country}
                  error={errors.ville}
                  info="Select your Country"
                />
                <SelectListGroup
                  placeholder="Region"
                  name="region"
                  value={this.state.region}
                  onChange={this.onChange}
                  options={regions.filter(el=> el.district===this.state.country || el.district==='')}
                  error={errors.region}
                  info="Select your region"
                />
                <TextFieldGroup
                  placeholder="Code Postal"
                  name="cp"
                  value={this.state.cp}
                  onChange={this.onChange}
                  error={errors.cp}
                  info="Create your postal code"
                />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
