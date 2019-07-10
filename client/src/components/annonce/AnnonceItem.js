import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteAnnonce, getAnnonces} from '../../actions/annonceActions';
import CardItem from './CardItem';


class AnnonceItem extends Component {
  componentDidMount=()=>{
    this.props.getAnnonces()
  }



  render() {
    const { annonces} = this.props.annonce;
 const {id}  = this.props.auth.user
    return (
     <div>
       <h3>My Annoucement</h3>
       <div className="mes-annonces">
       {!annonces?<h2>No annonce found</h2>:annonces.filter ( el => el.user ===id ) .map(el => <CardItem  annonce={el} />)}
       </div>
     </div>
    );
  }
}

AnnonceItem.defaultProps = {
  showActions: true
};

AnnonceItem.propTypes = {
  getAnnonces: PropTypes.func.isRequired,
  deleteAnnonce: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
 
};

const mapStateToProps = state => ({
  annonce: state.annonce,
  auth : state.auth
});

export default connect(mapStateToProps, {getAnnonces,deleteAnnonce})(
  AnnonceItem
);
