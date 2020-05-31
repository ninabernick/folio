import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ArtistsService{

    constructor(){}


    getArtists() {
        const url = `${API_URL}/api/artists/`;
        return axios.get(url).then(response => response.data);
    }
    getArtistsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getArtist(pk) {
        const url = `${API_URL}/api/artists/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteArtist(artist){
        const url = `${API_URL}/api/artists/${artist.pk}`;
        return axios.delete(url);
    }
    createArtist(artist){
        const url = `${API_URL}/api/artists/`;
        return axios.post(url,artist);
    }
    updateArtist(artist){
        const url = `${API_URL}/api/artists/${artist.pk}`;
        return axios.put(url,artist);
    }
}