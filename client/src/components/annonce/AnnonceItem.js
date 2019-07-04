import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteAnnonce, getAnnonces} from '../../actions/annonceActions';
import CardItem from './CardItem';

class AnnonceItem extends Component {
  componentDidMount=()=>{
    {console.log("annonces",this.props.annonce)}
  }
  onDeleteClick(id) {
    this.props.deleteAnnonce(id);
  }


  render() {
    const { annonce, auth, showActions } = this.props;

    return (
     <div>
       
     <CardItem  delete={this.onDeleteClick}/>
     </div>
    );
  }
}

AnnonceItem.defaultProps = {
  showActions: true
};

AnnonceItem.propTypes = {
  deleteAnnonce: PropTypes.func.isRequired,
  getAnnonces: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  annonce: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  annonce: state.annonce
});

export default connect(mapStateToProps, {getAnnonces, deleteAnnonce})(
  AnnonceItem
);
