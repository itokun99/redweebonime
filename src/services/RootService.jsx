// global setting untuk hosting online / offline
const settings = {
    isOnline : false,
    onlinePath : "",
    offlinePath : "http://localhost/weebonime/"
}

// method untuk auth async
const request = (path, method = "GET", data = {}) => {
    const promise = new Promise((resolve, reject) => {
        var option = {
            headers : {
                "Content-Type" : 'application/json'
            }
        }
        if(method === "post" || method === "POST" || method === "put" || method === "PUT"){
            option.method = method;
            option.body = JSON.stringify(data);
        } else {
            option.method = method
        }
        fetch(`${settings.isOnline ? settings.onlinePath : settings.offlinePath}${path}`, option)
        .then((response) => {
            if(response.ok){
                resolve(response.json())
            } else {
               resolve(response.json()); 
            }
        }).catch((error) => {
            console.log("error is", error);
            resolve(error.json())
        })
    })
    return promise;
}

// get admin list
const getadmin = (data = {id : null}) => {
    let path = `api/user/getadmin${data.id !== null && data.id !== "" ? "?id="+data.id : ""}`;
    return request(path);
}

// register user/admin
const createAdmin = (data = {}) => {
    let path = "api/user/createadmin";
    let method = "POST";
    return request(path, method, data);
}

// login user/admin
const loginAdmin = (data = {}) => {
    let path = "api/user/loginadmin";
    let method = "POST";
    return request(path, method, data);
}

// anime grab from MAL
const getAnimeFromMAL = (id) => {
    let path = `api/grab-anime?id=${id}`;
    return request(path);
}

//get anime list {mode : "simple"} simpel / {mode : 2} kompleks
const getAnimeList = (data = {mode : 1}) => {
    // hitung jumlah paramater
    let params = [];
    for(let key in data){
        // data sebagai parameter dimasukan ke array
        params.push(key);
    }

    // setting paramter API untuk anime_id
    let anime_id = `${typeof(data.anime_id) !== "undefined" ? "anime_id=" + data.anime_id : ""}`;
    
    // set path untuk API animes
    let path = `${data.mode === 1 ? "api/animes/getanimelist" : "api/animes"}${params.length > 1 ? "?" : ""}${anime_id}`;
    return request(path);
}

// save anime 
const saveAnime = (data = {}) => {
    let path = "api/animes";
    let method = "POST";
    return request(path, method, data);
}

// edit anime
const editAnime = (data = {}) => {
    let path = "api/animes";
    let method = "PUT";
    return request(path, method, data);
}

// delete anime
const deleteAnime = (id) => {
    let path = `api/animes?anime_id=${id}`;
    let method = "DELETE";
    return request(path, method);
}

// store API
const API = {
    getadmin,
    createAdmin,
    loginAdmin,
    getAnimeFromMAL,
    getAnimeList,
    saveAnime,
    editAnime,
    deleteAnime
}

export default API;