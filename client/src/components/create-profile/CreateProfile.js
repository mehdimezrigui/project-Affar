import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';


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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
     // Select options for status
     
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
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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
                  error={errors.country}
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
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
