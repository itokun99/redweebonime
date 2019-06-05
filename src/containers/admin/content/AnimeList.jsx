import React, {Component} from 'react';
import AnimeListTable from '../../../components/AnimeListTable';
import API from '../../../services/RootService';

class AnimeList extends Component {
    state = {
        animes : [],
        isLoading : true,
    }

    getAnimeList = () => {
        API.getAnimeList()
        .then((response) => {
            if(response.status){
                let animes = response.data;
                this.setState({
                    animes : animes,
                    isLoading : false,
                })
            } else {
                alert(response.pesan);
                console.log(response);
            }
        })
    }

    handleEditButton = (id) => {
        this.props.history.push(`/admin/anime/edit/${id}`, {
            anime_id : id
        })
    }
    handleDeleteButton = (id, title) => {
        let confirmation = window.confirm(`Hapus ${title} sekarang?`);
        if(confirmation){
            API.deleteAnime(id)
            .then((response) => {
                if(response.status){
                    alert(`${title} sudah dihapus dari database`);
                    this.getAnimeList();
                } else {
                    alert("Tidak bisa menghapus, kesalahan server");
                }
            })
        }
    }

    componentDidMount(){
        this.getAnimeList();
    }

    render(){
        return(
            <div className="page-card">
                <div className="page-card-header">
                    <h2 className="page-card-title">Anime List</h2>
                </div>
                <div className="page-card-body">
                    <div className="table-wrapper responsive">
                        <AnimeListTable
                            animes={this.state.animes}
                            edit = {(id) => this.handleEditButton(id)}
                            delete = {(id, title) => this.handleDeleteButton(id, title)}
                        />
                    </div>
                </div>
                <div className="page-card-footer">
                
                </div>
            </div>
        )
    }
}

export default AnimeList;