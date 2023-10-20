/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// MODEL of the MVC architecture
//
// Description:
//  Fetches and posts information to the API
/////////////////////////////////////////////////
const t="https://api.themoviedb.org/3",e={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnmWMVoAklqxoxIvq9uRoKatzqDiTXY"}},i={popularMoviesInfo:[],movieSpotlightInfo:[]},r=async function(r){try{let n=await fetch(`${t}/movie/popular/?language=en-US&page=${r}`,e),s=await n.json();return i.popularMoviesInfo.push({popularMovies:s.results,page:s.page}),s}catch(t){throw console.error(`(model.js::fetchPopularMovies()) ${t}`),t}},n=async function(i){try{let r=await fetch(`${t}/genre/movie/list?language=en`,e),{genres:n}=await r.json(),s=[],a=0;return n.every(t=>(i.some(e=>e===t.id)&&(s.push(t.name),a++),a!==i.length)),s}catch(t){throw console.error(`(model.js::getGenres()) ${t}`),t}},s=async function(){if(0===i.popularMoviesInfo.length||i.popularMoviesInfo[0].popularMovies.length<3)return;let t=i.popularMoviesInfo[0].popularMovies;// FIXME: Magic numbers
for(let e=0;e<27;e+=9){let r={};r.title=t[e].title,r.releaseDate=t[e].release_date;try{r.genres=await n(t[e].genre_ids)}catch(t){throw console.error(`(module.js::determineMovieSpotlight()) ${t}`),t}r.description=t[e].overview,r.rating=t[e].vote_average,r.backdropPath=`https://image.tmdb.org/t/p/original${t[e].backdrop_path}`,i.movieSpotlightInfo.push(r)}};class a{#t=document.querySelector(".nav-bar--search");#e=document.querySelector(".nav-bar--search-bar");#i=document.querySelector(".nav-bar--search-bar-btn");initHandlers(){this.#r(),this.#n()}#r(){this.#t.addEventListener("submit",this.#s.bind(this))}#s(t){t.preventDefault(),// TODO: Use later to get user search input
console.log(this.#e.value),""!==this.#e.value&&// ...
(this.#e.value="")}#n(){this.#i.addEventListener("mouseenter",this.#a.bind(this))}#a(){this.#o(!0),this.#t.addEventListener("mouseleave",this.#o.bind(this,!1))}#o(t){this.#e.style.width=t?"36rem":"0rem",this.#e.style.padding=t?"0 1rem 0 1rem":"0rem"}}var o=new a;class l{#l=document.querySelector(".content-spotlight--slider");initSpotlightContent(t){t.forEach(t=>{this.#l.insertAdjacentHTML("beforeend",`<div class="content-spotlight--main-content">
          <img class="content-spotlight--backdrop" src="${t.backdropPath}" />
          <p class="content-spotlight--title">${t.title}</p>
          <div class="content-spotlight--more-container">
            <p class="content-spotlight--more">Read description</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-spotlight--more-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>`)})}}var h=new l,c=new class{#h;#c;#d;#p=0;#u;initVars(){this.#h=document.querySelectorAll(".content-spotlight--btn"),this.#c=document.querySelectorAll(".content-spotlight--main-content"),this.#d=this.#c.length,this.#u=document.querySelector(".content-spotlight--markers")}initHandlers(){this.#m(),this.#g(),this.#v(),this.#S()}#m(){this.#h.forEach(this.#y.bind(this))}#y(t){t.addEventListener("click",this.#M.bind(this))}#M(t){t.currentTarget.classList.contains("content-spotlight--left-btn")?this.#f():t.currentTarget.classList.contains("content-spotlight--right-btn")&&this.#w()}#g(){document.addEventListener("keydown",this.#k.bind(this))}#k(t){"ArrowLeft"===t.key?this.#f():"ArrowRight"===t.key&&this.#w()}#v(){this.#u.addEventListener("click",this.#b.bind(this))}#b(t){if(t.target.classList.contains("content-spotlight--marker")){let e=t.target.dataset.slide;this.#B(e),this.#E(e)}}#S(){this.#h.forEach(t=>{t.addEventListener("mouseover",t=>this.#I(t,!0))}),this.#h.forEach(t=>{t.addEventListener("mouseout",t=>this.#I(t,!1))})}#I(t,e){t.currentTarget.classList.contains("content-spotlight--left-btn")?document.querySelector(".slider-shadow-left").style.width=e?"7rem":"0rem":t.currentTarget.classList.contains("content-spotlight--right-btn")&&(document.querySelector(".slider-shadow-right").style.width=e?"7rem":"0rem")}initDefaultState(){this.#H(),this.#B(0),this.#E(0)}#H(){this.#c.forEach(this.#L.bind(this))}#L(t,e){this.#u.insertAdjacentHTML("beforeend",`<div class="content-spotlight--marker" data-slide=${e}></div>`)}#B(t){document.querySelectorAll(".content-spotlight--marker").forEach(t=>t.classList.remove("content-spotlight--marker-active")),document.querySelector(`.content-spotlight--marker[data-slide="${t}"]`).classList.add("content-spotlight--marker-active")}#E(t){this.#p=Number(t),this.#c.forEach((e,i)=>e.style.transform=`translateX(${(i-t)*100}%)`)}#w(){this.#p===this.#d-1?this.#p=0:this.#p++,this.#B(this.#p),this.#E(this.#p)}#f(){0===this.#p?this.#p=this.#d-1:this.#p--,this.#B(this.#p),this.#E(this.#p)}};new class{addOverviewVisibleHandler(t){document.querySelectorAll(".content-spotlight--more-container")}addOverviewMoreHandler(){}},o.initHandlers();/////////////////////////////////////////////////
///////// Spotlight functionality
const d=async function(){try{return 0===i.popularMoviesInfo.length&&await r(1),0===i.movieSpotlightInfo.length&&await s(),h.initSpotlightContent(i.movieSpotlightInfo),c.initVars(),c.initDefaultState(),c.initHandlers(),i.movieSpotlightInfo}catch(t){throw console.error(`(controller.js::controlSpotlightMovieData()) ${t})`),t}};d();// const controlSpotlightMovieOverviewVisible = async function () {
//   try {
//     // Waits for spotlight movie data to become available
//     const movieSpotlightInfo = await controlSpotlightMovieData();
//     spotlightOverviewView.addOverviewVisibleHandler(movieSpotlightInfo);
//   } catch (err) {
//     console.error(`(controller.js::controlSpotlightMovieOverviewVisible()) ${err})`);
//     throw err;
//   }
// };
//# sourceMappingURL=index.7a86cc09.js.map

//# sourceMappingURL=index.7a86cc09.js.map
