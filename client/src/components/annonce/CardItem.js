import React from 'react'
import { deleteAnnonce, getAnnonces} from '../../actions/annonceActions';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

function CardItem(props) {

  console.log(props.annonce)
  return (
  <div className="card card-style">
    <img src={props.annonce.avatar} className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{props.annonce.title}</h5>
      <p className="card-text">{props.annonce.description}</p>
      {/* <div className="main-box"> */}
      <p className="card-text">Price: {props.annonce.price}</p>
      <p className="card-text">Etat: {props.annonce.etat}</p>
      <Link to="/login">Participate</Link>
      {/* </div> */}
    </div>
    <div className="btn-section">
    {props.autho.isAuthenticated ? <button  className="btn btn-success btstyle">Update</button > : null}
    {props.autho.isAuthenticated ? <button onClick={()=> {props.deleteAnnonce(props.annonce._id)}} className="btn btn-danger btstyle">Delete</button >: null}
    </div>
    <div className="progress">
  <div className="progress-bar progress-bar-striped barprogress" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">60%</div>
</div>
  </div>
  )
}

const mapStateToProps = state => ({
  autho: state.auth
});

export default connect(mapStateToProps, {deleteAnnonce})(
  CardItem
);
