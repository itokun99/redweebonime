import React, {Component} from 'react';
import API from '../../../services/RootService';
import {Link} from 'react-router-dom';


class AnimePage extends Component {
    state = {
        anime : {
            anime_mal_id: "",
            anime_title: "",
            image: "",
            pv: "",
            synopsis: "",
            japanese: "",
            type: "",
            episode: "",
            status: "",
            aired: "",
            studio: "",
            genre: "",
            duration: "",
            score: "",
        },
        editMode : false,
    }

    handleChangeText = (input) => {
        let name = input.target.name;
        let anime = {...this.state.anime};
        switch(name){
            case "anime_mal_id":
                anime.anime_mal_id = input.target.value;
                break;
            case "anime_title":
                anime.anime_title = input.target.value;
                break;
            case "anime_alternative":
                anime.japanese = input.target.value;
                break;
            case "anime_genre":
                anime.genre = input.target.value;
                break;
            case "anime_type":
                anime.type = input.target.value;
                break;
            case "anime_status":
                anime.status = input.target.value;
                break;
            case "anime_score":
                anime.score = input.target.value;
                break;
            case "anime_episode":
                anime.episode = input.target.value;
                break;
            case "anime_duration":
                anime.duration = input.target.value;
                break;
            case "anime_release":
                anime.aired = input.target.value;
                break;
            case "anime_studios":
                anime.studio = input.target.value;
                break;
            case "anime_poster":
                anime.image = input.target.value;
                break;
            case "anime_sinopsis":
                anime.synopsis = input.target.value;
                break;
            case "anime_trailer":
                anime.pv = input.target.value;
                break;
            default:
                return false;
        }

        this.setState({
            anime : anime
        }, () => {
            console.log(this.state.anime);
        })
    }

    handleResetForm = () => {
        let anime = {...this.state.anime};
        for(var key in anime){
            anime[key] = ""
        }
    }

    // get anime info dari MAL
    getAnimeInfo = () => {
        let button = document.getElementById('generate');
        button.innerText = "Loading..";
        button.setAttribute('disabled', "");

        let id = this.state.anime.anime_mal_id
        API.getAnimeFromMAL(id)
        .then((response) => {
            if(response.status){
                console.log(response);
                alert(response.pesan);
                response.anime_info.anime_mal_id = id;
                this.setState({
                    anime : response.anime_info
                }, () => {
                    console.log(this.state.anime);
                    button.innerText = "generate";
                    button.removeAttribute('disabled');
                })

            } else {
                alert(response.pesan);
                console.log(response);
                button.innerText = "generate1";
                button.setAttribute('disabled');
            }
        })
    }

    handleGetAnimeForEdit = () => {
        let id = this.props.match.params.id;
        if(typeof(id) !== "undefined"){
            let params = {
                mode : 2,
                anime_id : id
            }
            API.getAnimeList(params)
            .then((response) => {
                if(response.status){
                    let data = response.data[0];
                    let anime = {...this.state.anime};

                    anime.anime_id = data.anime_id;
                    anime.anime_mal_id = data.anime_mal_id;
                    anime.anime_title = data.anime_title;
                    anime.image = data.anime_poster;
                    anime.pv = data.anime_trailer;
                    anime.synopsis = data.anime_sinopsis;
                    anime.japanese = data.anime_alternative;
                    anime.type = data.anime_type;
                    anime.episode = data.anime_episode;
                    anime.status = data.anime_status;
                    anime.aired = data.anime_release;
                    anime.studio = data.anime_studios;
                    anime.genre = data.anime_genre;
                    anime.duration = data.anime_duration;
                    anime.score = data.anime_score;

                    this.setState({
                        anime : anime,
                        editMode : true,
                    })
                } else {
                    
                }
            })
        }
    }

    handleSaveAnime = () => {
        let anime = {...this.state.anime}
        if(anime.anime_mal_id === ""){
            alert("Masukan ID MAL-nya");
        } else {
            let insert_data = {
                anime_mal_id : anime.anime_mal_id,
                anime_title : anime.anime_title,
                anime_poster : anime.image,
                anime_alternative : anime.japanese,
                anime_type : anime.type,
                anime_status : anime.status,
                anime_score : anime.score,
                anime_studios : anime.studio,
                anime_duration : anime.duration,
                anime_episode : anime.episode,
                anime_genre : anime.genre,
                anime_release : anime.aired,
                anime_trailer : anime.pv,
                anime_sinopsis : anime.synopsis
            }
            API.saveAnime(insert_data)
            .then((response) => {
                if(response.status){
                    alert(response.pesan)
                } else {
                    console.log(response);
                    alert(response.pesan);
                }
            })
        }
    }

    handleEditAnime = () => {
        let anime = {...this.state.anime}
        if(anime.anime_mal_id === "" || anime.anime_id === ""){
            alert("Masukan ID/ID MAL-nya");
        } else {
            let insert_data = {
                anime_id : anime.anime_id,
                anime_mal_id : anime.anime_mal_id,
                anime_title : anime.anime_title,
                anime_poster : anime.image,
                anime_alternative : anime.japanese,
                anime_type : anime.type,
                anime_status : anime.status,
                anime_score : anime.score,
                anime_studios : anime.studio,
                anime_duration : anime.duration,
                anime_episode : anime.episode,
                anime_genre : anime.genre,
                anime_release : anime.aired,
                anime_trailer : anime.pv,
                anime_sinopsis : anime.synopsis
            }
            API.editAnime(insert_data)
            .then((response) => {
                if(response.status){
                    alert(response.pesan)
                } else {
                    console.log(response);
                    alert(response.pesan);
                }
            })
        }
    }

    componentDidMount(){
        this.handleGetAnimeForEdit();
    }

    render(){
        return(
            <div className="page-card">
                <div className="page-card-header">
                    <h2 className="page-card-title">{this.state.editMode ? "Edit Anime" : "Add Anime"}</h2>
                </div>
                <div className="page-card-body">
                    <div className="page-row">
                        <div id="add_anime">
                            {/* <h4 className="block-title">Tambah Anime</h4> */}
                            <form className="add-anime-item">
                                <div className="anime-pic">
                                    <img src={this.state.anime.image === "" ? "https://cdn.myanimelist.net/images/anime/1993/93837.jpg" : this.state.anime.image} alt="Anime Poster" title="Anime Poster" />
                                </div>
                                <div className="anime-info">
                                    <div className="form-group form-row">
                                        <div className="form-left">
                                            {/* <label className="form-label"></label> */}
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_mal_id" className="form-control form-control-sm" name="anime_mal_id" placeholder="MAL ID" defaultValue={this.state.anime.anime_mal_id} />
                                        </div>
                                        <div className="form-right">
                                            {
                                                this.state.editMode ?
                                                <button type="button" id="generate" className="btn btn-primary btn-sm btn-block" disabled>Disable</button>
                                                :
                                                <button type="button" id="generate" onClick={this.getAnimeInfo} className="btn btn-primary btn-sm btn-block">Generate</button>
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Judul Anime</label>
                                        <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_title" name="anime_title" className="form-control form-control-sm" placeholder="Judul anime" defaultValue={this.state.anime.anime_title} />
                                    </div>
                                    <div className="form-group form-row">
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Judul Alternatif</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_alternative" name="anime_alternative" className="form-control form-control-sm" placeholder="Judul Alternatif" defaultValue={this.state.anime.japanese} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Genre</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_genre" name="anime_genre" className="form-control form-control-sm" placeholder="Genre" defaultValue={this.state.anime.genre} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Tipe</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_type" name="anime_type" className="form-control form-control-sm" placeholder="Tipe" defaultValue={this.state.anime.type} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Status</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_status" name="anime_status" className="form-control form-control-sm" placeholder="Status" defaultValue={this.state.anime.status} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Skor</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_score" name="anime_score" className="form-control form-control-sm" placeholder="Skor" defaultValue={this.state.anime.score} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Jum Eps</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_episode" name="anime_episode" className="form-control form-control-sm" placeholder="Jumlah Eps" defaultValue={this.state.anime.episode} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Durasi</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_duration" name="anime_duration" className="form-control form-control-sm" placeholder="Durasi" defaultValue={this.state.anime.duration} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Rilis</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_release" name="anime_release" className="form-control form-control-sm" placeholder="Rilis" defaultValue={this.state.anime.aired} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Studio</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_studios" name="anime_studios" className="form-control form-control-sm" placeholder="Studio" defaultValue={this.state.anime.studio} />
                                        </div>
                                        <div className="form-group form-bagi">
                                            <label className="form-label">Trailer</label>
                                            <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_trailer" name="anime_trailer" className="form-control form-control-sm" placeholder="Trailer" defaultValue={this.state.anime.pv} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">Poster</label>
                                        <input onChange={(e) => this.handleChangeText(e)} type="text" id="anime_poster" name="anime_poster" className="form-control form-control-sm" placeholder="Poster" defaultValue={this.state.anime.image} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Sinopsis</label>
                                        <textarea onChange={(e) => this.handleChangeText(e)} id="anime_sinopsis" name="anime_sinopsis" rows={5} className="form-control form-control-sm" placeholder="Sinopsis" value={this.state.anime.synopsis}></textarea>
                                    </div>
                                    <div className="form-group">
                                        {this.state.editMode ?
                                            <>
                                                <button onClick={this.handleEditAnime} type="button" className="btn btn-primary btn-sm">Edit</button>
                                                &nbsp;&nbsp;&nbsp;
                                                <Link to="/admin/anime" className="btn btn-primary btn-sm">Kembali</Link>                                    
                                            </>
                                        :
                                            <button onClick={this.handleSaveAnime} type="button" className="btn btn-primary btn-sm">Save</button>                                        
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="add_anime_play">
                            <div className="play-anime-item">

                            </div>
                        </div>
                        <div id="anime_list">
                            <div className="anime-list-item">

                            </div>
                        </div>

                    </div>
                </div>
                <div className="page-card-footer">

                </div>
            </div>
        )
    }
}

export default AnimePage;