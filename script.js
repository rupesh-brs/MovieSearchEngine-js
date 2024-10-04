const apiKey = "3695b132";
const apiUrl = "https://www.omdbapi.com/?";
const searchButton = document.getElementById("search-button");
const moviesContainer = document.getElementById("movies");
const modalCenter = document.getElementById("modalCenter");

searchButton.addEventListener("click", showCovers);

function showCovers() {
    const name = document.getElementById("name").value.trim();
    moviesContainer.innerHTML = '';
    if (name) {
        addCovers(name);
    }
}

function addCovers(name) {
    const api = `${apiUrl}s=${name}&page=1&apikey=${apiKey}`;
    fetch(api)
        .then(response => response.json())
        .then(data => layoutCovers(data))
        .catch(() => alert("Information could not be obtained"));
}

function layoutCovers(films) {
    if (films.Search) {
        films.Search.forEach(element => {
            const film = document.createElement("div");
            film.className = "card col-12 col-sm-6 col-lg-3";
            film.onclick = () => searchFilm(element.imdbID);

            const cover = document.createElement("img");
            cover.src = element.Poster !== "N/A" ? element.Poster : 'assets/img/notFound.jpg';
            cover.className = "card-img-top";

            const title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = element.Title;

            film.appendChild(cover);
            film.appendChild(title);
            moviesContainer.appendChild(film);
        });
    }
}

function searchFilm(id) {
    const api = `${apiUrl}i=${id}&apikey=${apiKey}`;
    fetch(api)
        .then(response => response.json())
        .then(data => layoutModal(data))
        .catch(() => alert("Could not get information"));
}

function layoutModal(data) {
    document.getElementById("modalTitle").innerText = data.Title;
    document.getElementById("img").src = data.Poster !== "N/A" ? data.Poster : 'assets/img/notFound.jpg';
    document.getElementById("genre").innerText = data.Genre;
    document.getElementById("release").innerText = data.Released;
    document.getElementById("director").innerText = data.Director;
    document.getElementById("writer").innerText = data.Writer;
    document.getElementById("actors").innerText = data.Actors;
    document.getElementById("plot").innerText = data.Plot;
    document.getElementById("numPuntuacion").innerText = data.imdbRating;
    putStars(data.imdbRating);
    modalCenter.style.display = 'block';
}

document.getElementById("close").onclick = () => {
    modalCenter.style.display = 'none';
    clearModal();
};

function clearModal() {
    document.querySelectorAll('.stars i').forEach(star => star.className = 'far fa-star');
}

function putStars(imdbRating) {
    const rating = Math.round(imdbRating / 2);
    for (let i = 0; i < rating; i++) {
        document.querySelector(`.stars i:nth-child(${i + 1})`).className = 'fas fa-star';
    }
}
