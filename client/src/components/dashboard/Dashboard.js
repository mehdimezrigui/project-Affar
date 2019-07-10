import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import {getAnnonces} from '../../actions/annonceActions'
import Spinner from '../common/Spinner';
import AnnonceItem from '../annonce/AnnonceItem';



class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAnnonces();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const {annonces} = this.props.annonce;
    console.log('annnnnn',annonces)
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="dash-container">
          <div className="dashbord-nav">
            <p className="lead text-dark">
              Welcome <span className='lead text-primary'>{profile.handle}</span>
            </p>
            <div className='nav'>
            {/* <ProfileActions /> */}
            <Link to="/edit-profile">
            <button className="btn btn-primary">Edit Profile</button>
            </Link>
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
            <Link to="/annoucement">
            <button type="button" className="btn btn-success">New Annoucement</button>
            </Link>
            </div>
          </div>

          <div className="profile-info">
          <span><i class="fas fa-home"></i>  {profile.adress}, {profile.region}, {profile.cp}, {profile.country}</span>
          <span><i class="fas fa-phone"></i>  {profile.phone}</span>
          <span><i class="fas fa-envelope"></i> {user.email}</span>
          </div>
          <AnnonceItem />
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard style">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  annonce: PropTypes.object.isRequired,
  getAnnonces: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  annonce: state.annonce
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount,getAnnonces })(
  Dashboard
);
