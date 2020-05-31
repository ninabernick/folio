import React, {Component} from 'react';
import  ArtistsService  from  './ArtistsService';

const  artistsService  =  new  ArtistsService();

class ArtistList extends Component{

    constructor(props) {
        super(props);
        this.state  = {
            artists: [],
            nextPageURL:  ''
        };
        this.nextPage  =  this.nextPage.bind(this);
        this.handleDelete  =  this.handleDelete.bind(this);
    }
    componentDidMount() {
        var self  =  this;
        artistsService.getArtists().then(function (result) {
            self.setState({ artists:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(e,pk){
        var  self  =  this;
        artistsService.deleteArtist({pk :  pk}).then(()=>{
            var  newArr  =  self.state.artists.filter(function(obj) {
                return  obj.pk  !==  pk;
            });
            self.setState({artists:  newArr})
        });
    }

    nextPage(){
        var  self  =  this;
        artistsService.getArtistsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ artists:  result.data, nextPageURL:  result.nextlink})
        });
    }

    render() {

        return (
        <div  className="artists--list">
            <table  className="table">
                <thead  key="thead">
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>About</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.artists.map( c  =>
                    <tr  key={c.pk}>
                        <td>{c.pk}  </td>
                        <td>{c.first_name}</td>
                        <td>{c.last_name}</td>
                        <td>{c.email}</td>
                        <td>{c.about}</td>
                        <td>
                        <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                        <a  href={"/artist/" + c.pk}> Update</a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
    }
}
export default ArtistList;