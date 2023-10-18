// Function to fetch movie details and populate the page


function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
            const poster = document.querySelector('.poster img');
            const title = document.querySelector('.movie-title');
            const runtime = document.querySelector('.movie-runtime');
            const showtime = document.querySelector('.movie-showtime');
            const availableTickets = document.querySelector('.available-tickets');

            poster.src = data.poster;
            title.textContent = data.title;
            runtime.textContent = data.runtime + ' minutes';
            showtime.textContent = data.showtime;
            const remainingTickets = data.capacity - data.tickets_sold;
            availableTickets.textContent = remainingTickets;

            const buyTicketButton = document.querySelector('.buy-ticket');
            buyTicketButton.disabled = remainingTickets === 0; 
        })
        .catch((error) => console.error('Error fetching movie details:', error));
}

// <<<< movies and populate the movie menu
function fetchMovieList() {
    fetch('http://localhost:3000/films')
        .then((response) => response.json())
        .then((data) => {
            const filmList = document.getElementById('films');
            data.forEach((movie, index) => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.textContent = movie.title;
                li.addEventListener('click', () => {
                    fetchMovieDetails(index + 1); // Movie  start IDs
                });
                filmList.appendChild(li);
            });
        })
        .catch((error) => console.error('Error fetching movie list:', error));
}

// Calling the function 
fetchMovieList();
