import React from 'react';

const AnimeListTable = (props) => {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}} className="caption">No</th>
                    <th>Anime Title</th>
                    <th>MAL ID</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.animes.length > 0 ?
                        props.animes.map((anime, index) => {
                            
                            return(
                                <tr key={index}>
                                    <td style={{textAlign: "center"}} className="caption" >{index+1}</td>
                                    <td>{anime.anime_title}</td>
                                    <td style={{textAlign: "center"}}>{anime.anime_mal_id}</td>
                                    <td style={{textAlign: "center"}}>
                                        <button type="button" onClick={() => props.edit(anime.anime_id)} className="btn btn-primary btn-sm">Edit</button>
                                        &nbsp;&nbsp;
                                        <button type="button" onClick={() => props.delete(anime.anime_id, anime.anime_title)} className="btn btn-primary btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    :
                    <tr>
                        <td colSpan={4} style={{textAlign: "center"}}>No data to show in the table</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default AnimeListTable;