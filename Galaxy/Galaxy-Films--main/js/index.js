//created a nav-feature to allow for sleek scroll 
// let nav = document.querySelector('nav');

//       window.addEventListener('scroll', function () {
//         if (window.pageYOffset > 100) {
//           nav.classList.add('bg-dark', 'shadow');
//         } else {
//           nav.classList.remove('bg-dark', 'shadow');
//         }
//       });

//      const button = document.getElementById('button')
//      const bodyContent = document.getElementById('lds-roller')
//      const dataInput = document.getElementsBy
window.onload = function () {
  document.getElementById("main").style.display = "none";
  document.getElementById("form").style.display = "none";
  document.getElementById("login").style.display = "block"

  //add event listener for
  document.getElementById("loginBtn").addEventListener("click", function(){
    document.getElementById("main").style.display = "flex"
    document.getElementById("form").style.display = "block"
    document.getElementById("login").style.display = "none"
    document.getElementById("nav").style.display = "none"
  })
}


const baseUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5c6898b87a119919b82f3da7cb07bc46&page=1'
const imagePath = 'https://image.tmdb.org/t/p/w1280/';
const searchAPI = "https://api.themoviedb.org/3/search/movie?api_key=5c6898b87a119919b82f3da7cb07bc46&query="

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// here we getting the movies
getMovies(baseUrl)
async function getMovies(url){
const res = await fetch (url)
const data = await res.json()
displayMovies(data.results)
console.log(data.results);
}
function displayMovies(movies){
main.innerHTML = ''
movies.forEach((movie) => { 
  const {title,poster_path,vote_average,overview}=movie
  const moviesElement = document.createElement('div')
  moviesElement.classList.add('movie')
  moviesElement.innerHTML = `
  <img src = "${imagePath + poster_path}" alt="${title}" />
  <div class = 'movie-info'>
  <h3>${title}</h3>
  <span class="${getClassByRating(vote_average)}"> ${vote_average}</span>
  <div class = 'overview'>
  <h3>Overview</h3>
  ${overview}
  </div>
  </div>
  `
  main.appendChild(moviesElement)
});
}

function getClassByRating(rating) {
  if(rating>=8){
    return 'green'
  }else if(rating>=5){
    return 'orange'
  }else{
    return 'red'
  }
}



form.addEventListener('submit',(e) =>{
  e.preventDefault()
  let searchValue = search.value 
  if(searchValue && searchValue !== ''){
    getMovies(searchAPI+searchValue)
    searchValue=''
  }else{
    window.location.reload
  }
} )