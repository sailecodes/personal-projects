/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the model and different views
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// MODEL of the MVC architecture
//
// Description: Fetches data from and posts data to the API
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////// API
const e={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnmWMVoAklqxoxIvq9uRoKatzqDiTXY"}},t="https://api.themoviedb.org/3",i=["adventure","action","drama","romance"],n={movieGenresInfo:[],tvsGenresInfo:[],mostPopularMoviesInfo:[],movieSpotlightInfo:[],topRatedMoviesInfo:[],moviesByGenreInfo:[],movieTracksInfo:[]},s=function(e){let t=[],i=0;return n.movieGenresInfo.every(n=>(e.some(e=>e===n.id)&&(t.push(n.name),i++),i!==e.length)),t},o=function(e){let t=[],i=0;return n.movieGenresInfo.every(n=>(e.some(e=>e.toLowerCase()===n.name.toLowerCase())&&(t.push(n.id),i++),i!==e.length)),t},r=function(e){return`${t}/discover/movie`.concat("?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc").concat(`&with_genres=${e}`)},l=async function(){if(0===n.movieGenresInfo.length)try{let i=await fetch(`${t}/genre/movie/list?language=en`,e),{genres:s}=await i.json();n.movieGenresInfo=s}catch(e){throw console.error(`(model.js::fetchMovieGenres()) ${e}`),e}},a=async function(i){if(0===n.mostPopularMoviesInfo.length)try{let s=await fetch(`${t}/movie/popular/?language=en-US&page=${i}`,e),o=await s.json();n.mostPopularMoviesInfo.push({mostPopularMovies:o.results,page:o.page})}catch(e){throw console.error(`(model.js::fetchPopularMovies()) ${e}`),e}},c=async function(i){if(0===n.topRatedMoviesInfo.length)try{let s=await fetch(`${t}/movie/top_rated?language=en-US&page=${i}`,e),o=await s.json();n.topRatedMoviesInfo.push({topRatedMovies:o.results,page:o.page})}catch(e){throw console.error(`(model.js::fetchTopRatedMovies()) ${e}`),e}},h=async function(){if(0!==n.moviesByGenreInfo.length)return;let t=o(i);try{let i=await Promise.all([fetch(r(t[0]),e),fetch(r(t[1]),e),fetch(r(t[2]),e),fetch(r(t[3]),e)]),s=await Promise.all([i[0].json(),i[1].json(),i[2].json(),i[3].json()]);s.forEach((e,i)=>{n.moviesByGenreInfo.push({genreId:t[i],results:{page:e.page,movies:e.results}})})}catch(e){throw console.error(`(model.js::fetchMoviesByGenre()) ${e}`),e}},d=function(){if(0===n.mostPopularMoviesInfo.length)return;let e=n.mostPopularMoviesInfo[0].mostPopularMovies;for(let t=0;t<27;t+=9){let i={};i.id=e[t].id,i.title=e[t].title,i.releaseDate=e[t].release_date;try{i.genres=s(e[t].genre_ids)}catch(e){throw console.error(`(module.js::determineMovieSpotlight()) ${e}`),e}i.description=e[t].overview,i.rating=e[t].vote_average,i.backdropPath=`https://image.tmdb.org/t/p/original${e[t].backdrop_path}`,n.movieSpotlightInfo.push(i)}},v=function(){n.movieTracksInfo.push(n.topRatedMoviesInfo[0].topRatedMovies.slice(0,10)),n.movieTracksInfo.push([{genreId:n.moviesByGenreInfo[0].genreId,movies:n.moviesByGenreInfo[0].results.movies.slice(0,10)}],[{genreId:n.moviesByGenreInfo[1].genreId,movies:n.moviesByGenreInfo[1].results.movies.slice(0,10)}],[{genreId:n.moviesByGenreInfo[2].genreId,movies:n.moviesByGenreInfo[2].results.movies.slice(0,10)}],[{genreId:n.moviesByGenreInfo[3].genreId,movies:n.moviesByGenreInfo[3].results.movies.slice(0,10)}])};class p{#e=document.querySelector(".nav-bar--search");#t=document.querySelector(".nav-bar--search-bar");#i=document.querySelector(".nav-bar--search-bar-btn");initHandlers(){this.#n(),this.#s()}// TODO: Use input for search functionality
#n(){this.#e.addEventListener("submit",e=>{e.preventDefault(),console.log(this.#t.value),""!==this.#t.value&&(this.#t.value="")})}#s(){this.#i.addEventListener("mouseenter",()=>{this.#o(!0),this.#e.addEventListener("mouseleave",this.#o.bind(this,!1))})}#o(e){this.#t.style.width=e?"36rem":"0rem",this.#t.style.padding=e?"0 1rem 0 1rem":"0rem"}}var g=new p,m=new class{#r;#l;initVars(e){this.#r=e,this.#l=document.querySelector(".content-spotlight--slider")}initDefaultState(){this.#r.forEach(e=>{this.#l.insertAdjacentHTML("beforeend",`<div class="content-spotlight--main-content">
          <img class="content-spotlight--backdrop" src="${e.backdropPath}" />
          <div class="content-spotlight--text-container">  
            <p class="content-spotlight--title">${e.title}</p>
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
          </div>
        </div>`)})}},u=new class{#a;#c;#h;#d=0;#v;initVars(){this.#a=document.querySelectorAll(".content-spotlight--btn"),this.#c=document.querySelectorAll(".content-spotlight--main-content"),this.#h=this.#c.length,this.#v=document.querySelector(".content-spotlight--markers")}initDefaultState(){this.#p(),this.#g(0),this.#m(0)}#p(){this.#c.forEach((e,t)=>{this.#v.insertAdjacentHTML("beforeend",`<div class="content-spotlight--marker content-spotlight--marker-${t}" data-slide=${t}></div>`)})}initHandlers(){this.addTransitionByBtnHandler(),this.addTransitionByKeyHandler(),this.addTransitionByMarkerHandler(),this.addBtnHoverShadowHandler()}addTransitionByBtnHandler(){this.#a.forEach(e=>{e.addEventListener("click",e=>{e.currentTarget.classList.contains("content-spotlight--left-btn")?this.#u():e.currentTarget.classList.contains("content-spotlight--right-btn")&&this.#w()})})}addTransitionByKeyHandler(){document.addEventListener("keydown",e=>{"ArrowLeft"===e.key?this.#u():"ArrowRight"===e.key&&this.#w()})}addTransitionByMarkerHandler(){this.#v.addEventListener("click",e=>{if(e.target.classList.contains("content-spotlight--marker")){let t=e.target.dataset.slide;this.#g(t),this.#m(t)}})}#g(e){document.querySelectorAll(".content-spotlight--marker").forEach(e=>e.classList.remove("content-spotlight--marker-active")),document.querySelector(`.content-spotlight--marker[data-slide="${e}"]`).classList.add("content-spotlight--marker-active")}#m(e){this.#d=Number(e),this.#c.forEach((t,i)=>t.style.transform=`translateX(${(i-e)*100}%)`)}#w(){this.#d===this.#h-1?this.#d=0:this.#d++,this.#g(this.#d),this.#m(this.#d)}#u(){0===this.#d?this.#d=this.#h-1:this.#d--,this.#g(this.#d),this.#m(this.#d)}addBtnHoverShadowHandler(){this.#a.forEach(e=>{e.addEventListener("mouseover",e=>this.#f(e,!0))}),this.#a.forEach(e=>{e.addEventListener("mouseout",e=>this.#f(e,!1))})}#f(e,t){e.currentTarget.classList.contains("content-spotlight--left-btn")?document.querySelector(".slider-shadow-left").style.width=t?"7rem":"0rem":e.currentTarget.classList.contains("content-spotlight--right-btn")&&(document.querySelector(".slider-shadow-right").style.width=t?"7rem":"0rem")}},w=new /**
 * Handles the view of the spotlight overview
 */class{#r;#y;#S;#k;#T;#O;#I;#M;#B;#C;/**
   * Initializes class fields
   */initVars(e){this.#r=e,this.#y=document.querySelector(".content-spotlight--overview"),this.#S=document.querySelector(".content-spotlight--overview-title-clip"),this.#k=this.#y.querySelector(".content-spotlight--overview-title"),this.#T=this.#y.querySelector(".content-spotlight--overview-rating"),this.#O=this.#y.querySelector(".content-spotlight--overview-date"),this.#I=this.#y.querySelector(".content-spotlight--overview-genres"),this.#M=this.#y.querySelector(".content-spotlight--overview-description"),this.#B=new Event("clippedTitleAnimDone")}/**
   * Inserts the default overview layout with initial content into the DOM
   *
   * @param {*} initialContent Contains the initial content
   */initDefaultState(e){document.querySelector(".content-spotlight--slider").insertAdjacentHTML("afterend",`
        <div class="content-spotlight--overview">
          <div>
            <div class="content-spotlight--overview-title-clip">
              <p class="content-spotlight--overview-title">${e.title}</p>
            </div>
            <p class="content-spotlight--overview-rating" style="background-color: ${this.#b(e.rating)};">${e.rating}</p>
          </div>
          <button class="content-spotlight--overview-back-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-spotlight--overview-back-btn-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
          <p class="content-spotlight--overview-date">Release Date: ${e.releaseDate}</p>
          <div class="content-spotlight--overview-genres">
            <p>Genres: &nbsp;</p>
            ${e.genres.map((t,i)=>i===e.genres.length-1?`<p class="content-spotlight--overview-genre">${t}</p>`:`<p class="content-spotlight--overview-genre">${t}, &nbsp;</p>`).join("")}
          </div>
          <p class="content-spotlight--overview-description">${e.description}</p>
        </div>
      `)}initHandlers(){this.addOnReadBtnClickedHandler(),this.addOnOverviewBackBtnClickedHandler(),this.addOnClippedTitleAnimDoneHandler(),this.addOnSpotlightBtnClickedHandler(),this.addOnArrowKeyClickedHandler(),this.addOnMarkerClickedHandler()}// TODO: Maybe needed in the future if the spotlight is dynamically changed while on the website
//       and spotlightContent needs to be updated so the handlers can use the right data. Maybe
//       should be a handler, waiting for the signal that the spotlight content has been updated
reassignSpotlightContent(){}/**
   * Makes the title transition towards the default position after clipped animation
   */addOnClippedTitleAnimDoneHandler(){this.#k.addEventListener("clippedTitleAnimDone",function(){this.style.left="-0.5%"})}/**
   * Makes the title and text in the spotlight invisible, moves the overview into the window upon clicking the 'read
   * description' container, and animates the overview title if clipped
   */addOnReadBtnClickedHandler(){document.querySelectorAll(".content-spotlight--more-container").forEach(e=>{e.addEventListener("click",()=>{this.#E(!0),this.#y.style.transform="translateX(0%)",// Animates the overview title if clipped and dispatches a custom event after the animation to trigger the
// event handler defined above
this.#H()})})}#H(){if(this.#S.offsetWidth>=this.#S.scrollWidth)return;let e=Math.ceil(this.#S.scrollWidth/112);this.#k.style.transitionDuration=`${e}s`;let t=this.#$();this.#k.style.left=`-${(t-305)/305*100}%`,this.#C=setTimeout(()=>this.#k.dispatchEvent(this.#B),`${1e3*e+2e3}`)}#$(){this.#k.style.minWidth="max-content";let e=this.#k.offsetWidth;return this.#k.style.minWidth="",e}/**
   * Makes the spotlight title and text visible, moves the overview out of the window upon clicking the back button
   * in the overview, and resets the position of the title (for the case of clipped title animation)
   */addOnOverviewBackBtnClickedHandler(){document.querySelector(".content-spotlight--overview-back-btn").addEventListener("click",()=>{this.#E(!1),this.#y.style.transform="translateX(-100%)",this.#L()})}/**
   * Makes the title and text in the spotlight visible, moves the overview out of the window, changes the
   * overview content, and resets the position of the title (for the case of clipped title animation) upon clicking
   * any spotlight transition button
   *
   * TODO: --> (BUG) Background title doesn't appear during transition
   */addOnSpotlightBtnClickedHandler(){document.querySelectorAll(".content-spotlight--btn").forEach(e=>{e.addEventListener("click",()=>{this.#x()})})}/**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking the left and right arrow keys
   */addOnArrowKeyClickedHandler(){document.addEventListener("keydown",()=>{this.#x()})}/**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking a marker
   */addOnMarkerClickedHandler(){document.querySelector(".content-spotlight--markers").addEventListener("click",e=>{this.#x()})}#x(){this.#E(!1),this.#y.style.transform="translateX(-100%)",this.#L(),// Changes overview content after 0.5 seconds to avoid visible changes during transition
// Note: Must be < ~1 second to avoid not triggering the animation for clipped titles in the overview since the
//       trigger is dependent on the new slide content
setTimeout(()=>{this.#q()},500)}#E(e){document.querySelector('.content-spotlight--main-content[style="transform: translateX(0%);"] .content-spotlight--text-container').style.opacity=e?"0":""}#L(){// Note: Must execute to avoid animating the title to default position while already at the default position,
//       which causes either a slight jitter or a clipped title to not animate (since it's stuck at the
//       default position)
clearTimeout(this.#C),// Note: Must execute code below (i.e. transition = 'none') to avoid not moving clipped titles immediately to
//       the default position because the duration property is always set for clipped titles
this.#k.style.transition="none",this.#k.style.left="-0.5%",// Note: Must execute after some time to avoid conflict between transition = 'none' and transition = '...'
setTimeout(()=>{this.#k.style.transitionProperty="left",this.#k.style.transitionDelay="1.5s",this.#k.style.transitionTimingFunction="cubic-bezier(1, 1, 1, 1)"},100)}#q(){let e=this.#G(),t=this.#r[e];this.#A(t),this.#T.style.backgroundColor=this.#b(Number(this.#T.textContent))}#G(){let e=0;return document.querySelectorAll(".content-spotlight--marker").forEach(t=>{t.classList.contains("content-spotlight--marker-active")&&(e=t.dataset.slide)}),e}#A(e){this.#k.textContent=e.title,this.#T.textContent=e.rating,this.#O.textContent=`Release Date: ${e.releaseDate}`,this.#I.innerHTML="",this.#I.innerHTML=`
      <p>Genres: &nbsp;</p>
      ${e.genres.map((t,i)=>i===e.genres.length-1?`<p class="content-spotlight--overview-genre">${t}</p>`:`<p class="content-spotlight--overview-genre">${t}, &nbsp;</p>`).join("")}
    `,this.#M.textContent=e.description}#b(e){return e>=9?"var(--c-rating-best)":e>=8?"var(--c-rating-good)":e>=7?"var(--c-rating-okay)":e>=6?"var(--c-rating-bad)":"var(--c-rating-worst)"}};g.initHandlers();/////////////////////////////////////////////////
///////// Default movie state init
const f=async function(){await Promise.all([l(),a(1),c(1)]),await h()},y=function(){// Determines the top 3 most popular movies
d(),m.initVars(n.movieSpotlightInfo),m.initDefaultState(),u.initVars(),u.initDefaultState(),u.initHandlers(),w.initDefaultState(n.movieSpotlightInfo[0]),w.initVars(n.movieSpotlightInfo),w.initHandlers()},S=function(){// Determines the top rated movies and most popular movies by genre
v()},k=async function(){await f(),y(),S(),console.log(n)};k();//# sourceMappingURL=index.be711b4c.js.map

//# sourceMappingURL=index.be711b4c.js.map
