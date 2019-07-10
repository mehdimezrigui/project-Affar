import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAnnonces} from '../../actions/annonceActions';
import CardItem from '../annonce/CardItem'
class Landing extends Component {
  constructor(props){
    super(props),
    this.state={
      search:''
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    this.props.getAnnonces()
  }

  render() {
  
    const { annonces,search} = this.props.annonce;
    return (
      <div className="landing">
          <div className="container">
            <div className="row">
                <div className="col-md-12 text">
                {!annonces?<h2>No annonce found</h2>:annonces.filter(el => el.title.toUpperCase().includes(search.toUpperCase().trim())) .map(el => <CardItem  annonce={el} func={this.onDeleteClick}/>)}
                </div>
                </div>
          </div>
        </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  getAnnonces: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  annonce : state.annonce

});

export default connect(mapStateToProps , {getAnnonces})(Landing);
