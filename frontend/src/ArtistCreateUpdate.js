import  React, { Component } from  'react';
import  ArtistsService  from  './ArtistsService';

const  artistsService  =  new  ArtistsService();

class  ArtistCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } =  this.props;
        if(params  &&  params.pk)
        {
            artistsService.getArtist(params.pk).then((c)=>{
                this.refs.firstName.value  =  c.first_name;
                this.refs.lastName.value  =  c.last_name;
                this.refs.email.value  =  c.email;
                this.refs.about.value  =  c.about;
            })
        }
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
        if(params  &&  params.pk){
            this.handleUpdate(params.pk);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    handleCreate(){
        artistsService.createArtist(
            {
            "first_name":  this.refs.firstName.value,
            "last_name":  this.refs.lastName.value,
            "email":  this.refs.email.value,
            "about":  this.refs.about.value
            }).then((result)=>{
                    alert("Artist created!");
            }).catch(()=>{
                    alert('There was an error! Please re-check your form.');
            });
    }

    handleUpdate(pk){
        artistsService.updateArtist(
            {
            "pk":  pk,
            "first_name":  this.refs.firstName.value,
            "last_name":  this.refs.lastName.value,
            "email":  this.refs.email.value,
            "address":  this.refs.address.value,
            "about":  this.refs.about.value
            }
            ).then((result)=>{
        
                alert("Artist updated!");
            }).catch(()=>{
                alert('There was an error! Please re-check your form.');
            });
        }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              First Name:</label>
              <input className="form-control" type="text" ref='firstName' />

            <label>
              Last Name:</label>
              <input className="form-control" type="text" ref='lastName'/>

            <label>
              Email:</label>
              <input className="form-control" type="text" ref='email' />

            <label>
              About:</label>
              <textarea className="form-control" ref='about' ></textarea>


            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </form>
        );
  }

}
export default ArtistCreateUpdate;