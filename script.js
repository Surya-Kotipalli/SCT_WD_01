const genres = {
  Action: ["Mad Max: Fury Road", "John Wick", "The Dark Knight", "Gladiator", "Avengers: Endgame", "Inception", "Die Hard", "Black Panther", "Logan"],
  Comedy: ["Superbad", "The Hangover", "Step Brothers", "The Mask", "Mean Girls", "Jumanji", "The Grand Budapest Hotel", "Zombieland", "Tropic Thunder"],
  Drama: ["The Shawshank Redemption", "Forrest Gump", "Fight Club", "A Beautiful Mind", "The Pursuit of Happyness", "Whiplash", "Parasite", "Moonlight", "Titanic"],
  Fantasy: ["Harry Potter", "The Lord of the Rings", "Pan’s Labyrinth", "The Hobbit", "The Chronicles of Narnia", "Coraline", "Spirited Away", "Alice in Wonderland", "Doctor Strange"],
  Horror: ["The Conjuring", "Get Out", "It", "A Quiet Place", "Hereditary", "The Exorcist", "Sinister", "Us", "Insidious"],
  Romance: ["The Notebook", "Pride & Prejudice", "La La Land", "A Star is Born", "Call Me By Your Name", "Titanic", "Crazy Rich Asians", "Me Before You", "To All the Boys I’ve Loved Before"],
  SciFi: ["Interstellar", "Inception", "The Matrix", "Blade Runner 2049", "Avatar", "Ex Machina", "Tenet", "Star Wars", "Guardians of the Galaxy"],
  Thriller: ["Gone Girl", "Se7en", "Memento", "Prisoners", "Shutter Island", "Zodiac", "Nightcrawler", "The Silence of the Lambs", "Oldboy"]
};

const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const wishlistCount = document.getElementById('wishlist-count');
const wishlistContainer = document.getElementById('wishlist-items');
const genresGrid = document.getElementById('genres-grid');

function showGenres() {
  genresGrid.innerHTML = '';
  Object.keys(genres).forEach(genre => {
    const card = document.createElement('div');
    card.className = 'genre-card';
    card.textContent = genre;
    card.onclick = () => showMovies(genre);
    genresGrid.appendChild(card);
  });
}

function showMovies(genre) {
  genresGrid.innerHTML = '';

  // Back to Home button
  const backBtn = document.createElement('button');
  backBtn.textContent = '⬅ Back to Genres';
  backBtn.className = 'back-btn';
  backBtn.onclick = showGenres;
  genresGrid.appendChild(backBtn);

  // Display movies
  genres[genre].forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `<h3>${movie}</h3>
      <button onclick="watchMovie('${movie}')">Watch</button>
      <button onclick="addToWishlist('${movie}')">Add to Wishlist</button>`;
    genresGrid.appendChild(movieCard);
  });
}

function watchMovie(movie) {
  alert(`Now watching: ${movie}`);
}

function addToWishlist(movie) {
  if (!wishlist.includes(movie)) {
    wishlist.push(movie);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlist();
  }
}

function updateWishlist() {
  wishlistCount.textContent = wishlist.length;
  wishlistContainer.innerHTML = '';
  wishlist.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `<h3>${movie}</h3>
      <button onclick="watchMovie('${movie}')">Watch</button>
      <button onclick="removeFromWishlist('${movie}')">Remove</button>`;
    wishlistContainer.appendChild(movieCard);
  });
}

function removeFromWishlist(movie) {
  const index = wishlist.indexOf(movie);
  if (index !== -1) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlist();
  }
}

document.querySelector('.cta-button').addEventListener('click', () => {
  document.getElementById('genres').scrollIntoView({ behavior: 'smooth' });
});

showGenres();
updateWishlist();
