import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addAnnonce } from '../../actions/annonceActions';
class Annonce extends Component {
    constructor(props){
        super(props),
        this.state={
            avatar:'',
            title:'',
            description:'',
            price:'',
            condition:'Disponible',
            etat:'',
            errors:{}

        }
    }
       componentWillReceiveProps=(nextProps)=> {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
        console.log(this.state.errors)
      }
      
      onSubmit=(e)=> {
        e.preventDefault();
    
        const Annonce = {
          avatar: this.state.avatar,
          title: this.state.title,
          description: this.state.description,
          price: this.state.price,
          condition: this.state.condition,
          etat: this.state.etat
        };
    
        this.props.addAnnonce(Annonce);
        this.props.history.push('/dashboard')
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        const { errors} = this.state;
        return (

     <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Annoucement</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Picture"
                  name="avatar"
                  value={this.state.avatar}
                  onChange={this.onChange}
                  error={errors.avatar}
                  info="Upload same picture for your annoucement."
                />
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Create your title annoucement"
                />
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Create same description for your annoucement "
                />
                <TextFieldGroup
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                  info="Make the price of your annoucement"
                  />
                {/* <TextFieldGroup
                  placeholder="Condition"
                  name="condition"
                  value={this.state.condition}
                  onChange={this.onChange}
                //   error={errors.condition}
                
                /> */}
                <TextFieldGroup
                  placeholder="Etat Offre"
                  name="etat"
                  value={this.state.etat}
                  onChange={this.onChange}
                  error={errors.etat}
                />
               
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
addAnnonce.propTypes = {
    annonce: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    annonce: state.annonce,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { addAnnonce })(
    withRouter(Annonce)
  );