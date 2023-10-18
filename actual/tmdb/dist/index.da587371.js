/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the
//              model and different views
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// MOVIE MODEL of the MVC architecture
//
// Description: Fetches movie data from and posts
//              movie data to the API
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////// API
/////////////////////////////////////////////////
const t="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6".concat("IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnm").concat("WMVoAklqxoxIvq9uRoKatzqDiTXY"),e={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${t}`}},n="https://api.themoviedb.org/3",i="https://image.tmdb.org/t/p",r="/discover/movie?include_adult=false&include_video=false&language=en-US".concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=vote_average.desc").concat("&vote_average.gte=7.5&vote_count.gte=200&with_origin_country=US&with_original_language=en").concat("&without_genres=10402%2C%2010749%2C%2016%2C%2036%2C%2099&");"/discover/movie?include_adult=false&include_video=false&language=en-US".concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=popularity.desc").concat("&vote_average.gte=7&vote_count.gte=200&with_origin_country=US&with_original_language=en").concat("&without_genres=10402%2C%2010749%2C%2016%2C%2036%2C%2099&");const s="/discover/movie?include_adult=false&include_video=false&language=en-US".concat("&primary_release_date.gte=2020-01-01&region=US&release_date.gte=2020-01-01&sort_by=popularity.desc").concat("&vote_average.gte=7&vote_count.gte=200&with_origin_country=US&with_original_language=en").concat("&without_genres=10770&"),o="original",a=[{adult:!1,backdrop_path:"/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",genre_ids:[28,878,12],id:565770,original_language:"en",original_title:"Blue Beetle",overview:"Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",popularity:1314.664,poster_path:"/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",release_date:"2023-08-16",title:"Blue Beetle",trailerUrl:"vS3_72Gb-bI",video:!1,vote_average:7.1,vote_count:1299},{adult:!1,backdrop_path:"/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",genre_ids:[35,12,14],id:346698,original_language:"en",original_title:"Barbie",overview:"Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",popularity:819.756,poster_path:"/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",release_date:"2023-07-19",title:"Barbie",trailerUrl:"Y1IgAEejvqM",video:!1,vote_average:7.2,vote_count:5419},{adult:!1,backdrop_path:"/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",genre_ids:[27,53],id:1008042,original_language:"en",original_title:"Talk to Me",overview:"When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",popularity:1744.488,poster_path:"/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",release_date:"2023-07-26",title:"Talk to Me",trailerUrl:"aLAKJu9aJys",video:!1,vote_average:7.2,vote_count:1418}],l=["Adventure","Action","Drama","Romance"],c={trackBackdropsFetched:!1,movieGenresInfo:[],mostPopularMoviesInfo:[],movieSpotlightInfo:[],topRatedMoviesInfo:[],moviesByGenreInfo:[],movieTracksInfo:[]};if(localStorage.getItem("movieState")){let t=JSON.parse(localStorage.getItem("movieState"));c.trackBackdropsFetched=t.trackBackdropsFetched,c.movieGenresInfo=t.movieGenresInfo,c.mostPopularMoviesInfo=t.mostPopularMoviesInfo,c.movieSpotlightInfo=t.movieSpotlightInfo,c.topRatedMoviesInfo=t.topRatedMoviesInfo,c.moviesByGenreInfo=t.moviesByGenreInfo,c.movieTracksInfo=t.movieTracksInfo}const d=function(t){let e=[],n=0;return c.movieGenresInfo.every(i=>(t.some(t=>t===i.id)&&(e.push(i.name),n++),n!==t.length)),e},h=function(t){let e=[],n=0;return c.movieGenresInfo.every(i=>(t.some(t=>t.toLowerCase()===i.name.toLowerCase())&&(e.push(i.id),n++),n!==t.length)),e},v=function(t){return{id:t.id,title:t.title,releaseDate:t.release_date,genres:d(t.genre_ids),description:t.overview,rating:t.vote_average,backdropPath:`${i}/${o}${t.backdrop_path}`}},g=async function(){if(0===c.movieGenresInfo.length)try{let t=await fetch(`${n}/genre/movie/list?language=en`,e),{genres:i}=await t.json();c.movieGenresInfo=i}catch(t){throw console.error(`(model.js::fetchMovieGenres()) ${t}`),t}},p=function(t){0===c.mostPopularMoviesInfo.length&&c.mostPopularMoviesInfo.push({page:1,results:a})},u=async function(t){if(0===c.topRatedMoviesInfo.length)try{let i=await fetch(`${n}${r}page=${t}`,e),s=await i.json();c.topRatedMoviesInfo.push({page:s.page,results:s.results.map(t=>v(t))})}catch(t){throw console.error(`(model.js::fetchTopRatedMovies()) ${t}`),t}},m=async function(t){if(0!==c.moviesByGenreInfo.length)return;let i=h(l);fetch(`${n}with_genres=12&page=1`,e);try{let r=await Promise.all([fetch(`${n}${s}with_genres=${i[0]}&page=${t}`,e),fetch(`${n}${s}with_genres=${i[1]}&page=${t}`,e),fetch(`${n}${s}with_genres=${i[2]}&page=${t}`,e),fetch(`${n}${s}with_genres=${i[3]}&page=${t}`,e)]),o=await Promise.all([r[0].json(),r[1].json(),r[2].json(),r[3].json()]);o.forEach((t,e)=>{c.moviesByGenreInfo.push({genre:l[e],results:{page:t.page,movies:t.results.map(t=>v(t))}})})}catch(t){throw console.error(`(model.js::fetchMoviesByGenre()) ${t}`),t}},k=async function(){if(!c.trackBackdropsFetched)try{for(let t=0;t<c.movieTracksInfo.length;t++)for(let i=0;i<c.movieTracksInfo[t].movies.length;i++){let r=await fetch(`${n}/movie/${c.movieTracksInfo[t].movies[i].id}/images?include_image_language=en`,e),s=await r.json();c.movieTracksInfo[t].movies[i].backdropPath=0===s.backdrops.length?c.movieTracksInfo[t].movies[i].backdrop_path:s.backdrops[0].file_path}c.trackBackdropsFetched=!0}catch(t){throw console.error(`(model.js::fetchBackdropsOfTrackMovies()) ${t}`),t}},w=function(){0===c.mostPopularMoviesInfo.length&&c.mostPopularMoviesInfo[0].results.forEach(t=>{c.movieSpotlightInfo.push(v(t))})},f=function(){0===c.movieTracksInfo.length&&c.movieTracksInfo.push({heading:"Top Rated",movies:c.topRatedMoviesInfo[0].results},{heading:c.moviesByGenreInfo[0].genre,movies:c.moviesByGenreInfo[0].results.movies},{heading:c.moviesByGenreInfo[1].genre,movies:c.moviesByGenreInfo[1].results.movies},{heading:c.moviesByGenreInfo[2].genre,movies:c.moviesByGenreInfo[2].results.movies},{heading:c.moviesByGenreInfo[3].genre,movies:c.moviesByGenreInfo[3].results.movies})};var y=new class{#t;#e;#n;/**
   * Initializes class variables
   */initVars(){this.#t=document.querySelector(".nav-bar--search-form"),this.#e=document.querySelector(".nav-bar--search-bar"),this.#n=document.querySelector(".nav-bar--search-bar-btn")}/**
   * Initializes class handlers
   */initHandlers(){this._handleSearch(),this._handleSearchBarHoverState()}/**
   * Handles fetching search data
   *
   * TODO: Use input to fetch data from API
   */_handleSearch(){this.#t.addEventListener("submit",t=>{t.preventDefault(),console.log(this.#e.value),""!==this.#e.value&&(this.#e.value="")})}/**
   * Handles the visibility of the search bar depending on the hover state
   */_handleSearchBarHoverState(){this.#n.addEventListener("mouseenter",()=>{this.#i(!0)}),this.#t.addEventListener("mouseleave",t=>{this.#i(!1)})}#i(t){this.#e.style.width=t?"36rem":"0rem",this.#e.style.padding=t?"0 1rem 0 1rem":"0rem"}},b=new class{#r;#s;initVars(t){this.#r=t,this.#s=document.querySelector(".content-spotlight--slider")}initDefaultState(){this.#r.forEach(t=>{this.#s.insertAdjacentHTML("beforeend",`
        <div class="content-spotlight--main-content">
          <div class="content-spotlight--trailer-container">
            <iframe
              class="content-spotlight--trailer"
              frameborder="none"
              src="https://www.youtube.com/embed/${t.trailerUrl}?enablejsapi=1&rel=0&controls=0&autoplay=1">
            </iframe>
          </div>
          <img class="content-spotlight--backdrop" src="${t.backdropPath}" />
          <div class="content-spotlight--text-container">
            <p class="content-spotlight--title">${t.title}</p>
            <div class="content-spotlight--more">
              <button class="content-spotlight--more-btn content-spotlight--desc-btn">
                <p class="content-spotlight--desc-text">Read description</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="content-spotlight--text-icon">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
              <button class="content-spotlight--more-btn content-spotlight--trailer-btn">
                <p class="content-spotlight--trailer-text">Watch trailer</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="content-spotlight--text-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        `)})}},S=new class{#o;#a;#l;#c;initVars(){this.#o=document.querySelectorAll(".content-spotlight--trailer-btn"),this.#a=!1,this.#l=document.querySelectorAll(".content-spotlight--btn"),this.#c=document.querySelector(".content-spotlight--markers")}initHandlers(){this.addOnTrailerBtnClickedHandler(),this.addOnSpotlightBtnClickedHandler(),this.addOnArrowKeyClickedHandler(),this.addOnMarkerClickedHandler()}addOnTrailerBtnClickedHandler(){this.#o.forEach(t=>{t.addEventListener("click",t=>{let e=t.currentTarget.closest(".content-spotlight--main-content").querySelector(".content-spotlight--trailer"),n=t.currentTarget.querySelector(".content-spotlight--trailer-text");this.#a?(this.#d(e,n,!0),e.contentWindow.postMessage('{"event":"command", "func":"stopVideo", "args":""}',"*")):this.#d(e,n,!1),this.#a=!this.#a})})}addOnSpotlightBtnClickedHandler(){this.#l.forEach(t=>{t.addEventListener("click",()=>{this.#h()})})}addOnArrowKeyClickedHandler(){document.addEventListener("keydown",t=>{("ArrowLeft"===t.key||"ArrowRight"===t.key)&&this.#h()})}addOnMarkerClickedHandler(){this.#c.addEventListener("click",t=>{this.#h()})}#h(){let t=document.querySelector(".content-spotlight--marker-active").dataset.slide,e=document.querySelectorAll(".content-spotlight--main-content")[t],n=e.querySelector(".content-spotlight--trailer"),i=e.querySelector(".content-spotlight--trailer-text");this.#d(n,i,!0),this.#a=!1}#d(t,e,n){e.textContent=n?"Watch trailer":"Stop trailer",this.#v(e,n),t.style.transitionDuration=n?"0.1s":"1s",t.style.transitionDelay=n?"0s":"1s",t.style.opacity=n?"0":"1",t.allow=n?"":"autoplay",t.src=n?t.src:t.src.concat("&autoplay=1")}#v(t,e){let n=t.closest(".content-spotlight--trailer-btn"),i=n.querySelector(".content-spotlight--text-icon");n.removeChild(i),n.insertAdjacentHTML("beforeend",e?`<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-spotlight--text-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>`:`<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-spotlight--text-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
          </svg>`)}},T=new class{#g;#p;#u;#m=0;#k;initVars(){this.#g=document.querySelectorAll(".content-spotlight--btn"),this.#p=document.querySelectorAll(".content-spotlight--main-content"),this.#u=this.#p.length,this.#k=document.querySelector(".content-spotlight--markers")}initDefaultState(){this.#w(),this.#f(0),this.#y(0)}#w(){this.#p.forEach((t,e)=>{this.#k.insertAdjacentHTML("beforeend",`<div class="content-spotlight--marker content-spotlight--marker-${e}" data-slide=${e}></div>`)})}initHandlers(){this.addTransitionByBtnHandler(),this.addTransitionByKeyHandler(),this.addTransitionByMarkerHandler(),this.addBtnHoverShadowHandler()}addTransitionByBtnHandler(){this.#g.forEach(t=>{t.addEventListener("click",t=>{t.currentTarget.classList.contains("content-spotlight--left-btn")?this.#b():t.currentTarget.classList.contains("content-spotlight--right-btn")&&this.#S()})})}addTransitionByKeyHandler(){document.addEventListener("keydown",t=>{"ArrowLeft"===t.key?this.#b():"ArrowRight"===t.key&&this.#S()})}addTransitionByMarkerHandler(){this.#k.addEventListener("click",t=>{if(t.target.classList.contains("content-spotlight--marker")){let e=t.target.dataset.slide;this.#f(e),this.#y(e)}})}#f(t){document.querySelectorAll(".content-spotlight--marker").forEach(t=>t.classList.remove("content-spotlight--marker-active")),document.querySelector(`.content-spotlight--marker[data-slide="${t}"]`).classList.add("content-spotlight--marker-active")}#y(t){this.#m=Number(t),this.#p.forEach((e,n)=>e.style.transform=`translateX(${(n-t)*100}%)`)}#S(){this.#m===this.#u-1?this.#m=0:this.#m++,this.#f(this.#m),this.#y(this.#m)}#b(){0===this.#m?this.#m=this.#u-1:this.#m--,this.#f(this.#m),this.#y(this.#m)}addBtnHoverShadowHandler(){this.#g.forEach(t=>{t.addEventListener("mouseover",t=>this.#T(t,!0))}),this.#g.forEach(t=>{t.addEventListener("mouseout",t=>this.#T(t,!1))})}#T(t,e){t.currentTarget.classList.contains("content-spotlight--left-btn")?document.querySelector(".slider-shadow-left-bg").style.width=e?"7rem":"0rem":t.currentTarget.classList.contains("content-spotlight--right-btn")&&(document.querySelector(".slider-shadow-right-bg").style.width=e?"7rem":"0rem")}},B=new /**
 * Handles the view of the spotlight overview
 */class{#r;#B;#C;#_;#M;#H;#I;#O;#E;#x;/**
   * Initializes class fields
   */initVars(t){this.#r=t,this.#B=document.querySelector(".content-spotlight--overview"),this.#C=document.querySelector(".content-spotlight--overview-title-clip"),this.#_=this.#B.querySelector(".content-spotlight--overview-title"),this.#M=this.#B.querySelector(".content-spotlight--overview-rating"),this.#H=this.#B.querySelector(".content-spotlight--overview-date"),this.#I=this.#B.querySelector(".content-spotlight--overview-genres"),this.#O=this.#B.querySelector(".content-spotlight--overview-description"),this.#E=new Event("clippedTitleAnimDone")}/**
   * Inserts the default overview layout with initial content into the DOM
   *
   * @param {*} initialContent Contains the initial content
   */initDefaultState(t){document.querySelector(".content-spotlight--slider").insertAdjacentHTML("afterend",`
        <div class="content-spotlight--overview">
          <div>
            <div class="content-spotlight--overview-title-clip">
              <p class="content-spotlight--overview-title">${t.title}</p>
            </div>
            <p class="content-spotlight--overview-rating" style="background-color: ${this.#L(t.rating)};">${this.#$(t.rating,1)}</p>
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
          <p class="content-spotlight--overview-date">Release Date: ${t.releaseDate}</p>
          <div class="content-spotlight--overview-genres">
            <p>Genres: &nbsp;</p>
            ${t.genres.map((e,n)=>n===t.genres.length-1?`<p class="content-spotlight--overview-genre">${e}</p>`:`<p class="content-spotlight--overview-genre">${e}, &nbsp;</p>`).join("")}
          </div>
          <p class="content-spotlight--overview-description">${t.description}</p>
        </div>
      `)}initHandlers(){this.addOnReadBtnClickedHandler(),this.addOnOverviewBackBtnClickedHandler(),this.addOnClippedTitleAnimDoneHandler(),this.addOnSpotlightBtnClickedHandler(),this.addOnArrowKeyClickedHandler(),this.addOnMarkerClickedHandler()}/**
   *
   *
   * TODO: Maybe needed in the future if the spotlight is dynamically changed while on the website
   *       and spotlightContent needs to be updated so the handlers can use the right data. Maybe
   *       should be a handler, waiting for the signal that the spotlight content has been updated
   */reassignSpotlightContent(){}/**
   * Makes the title transition towards the default position after clipped animation
   */addOnClippedTitleAnimDoneHandler(){this.#_.addEventListener("clippedTitleAnimDone",function(){this.style.left="-0.5%"})}/**
   * Makes the title and text in the spotlight invisible, moves the overview into the window upon clicking the 'read
   * description' container, and animates the overview title if clipped
   */addOnReadBtnClickedHandler(){document.querySelectorAll(".content-spotlight--desc-btn").forEach(t=>{t.addEventListener("click",()=>{this.#q(!0),this.#B.style.transform="translateX(0%)",// Animates the overview title if clipped and dispatches a custom event after the animation to trigger the
// event handler defined above
this.#j()})})}#j(){if(this.#C.offsetWidth>=this.#C.scrollWidth)return;let t=Math.ceil(this.#C.scrollWidth/112);this.#_.style.transitionDuration=`${t}s`;let e=this.#A();this.#_.style.left=`-${(e-305)/305*100}%`,this.#x=setTimeout(()=>this.#_.dispatchEvent(this.#E),`${1e3*t+2e3}`)}#A(){this.#_.style.minWidth="max-content";let t=this.#_.offsetWidth;return this.#_.style.minWidth="",t}/**
   * Makes the spotlight title and text visible, moves the overview out of the window upon clicking the back button
   * in the overview, and resets the position of the title (for the case of clipped title animation)
   */addOnOverviewBackBtnClickedHandler(){document.querySelector(".content-spotlight--overview-back-btn").addEventListener("click",()=>{this.#q(!1),this.#B.style.transform="translateX(-100%)",this.#D()})}/**
   * Makes the title and text in the spotlight visible, moves the overview out of the window, changes the
   * overview content, and resets the position of the title (for the case of clipped title animation) upon clicking
   * any spotlight transition button
   */addOnSpotlightBtnClickedHandler(){document.querySelectorAll(".content-spotlight--btn").forEach(t=>{t.addEventListener("click",()=>{this.#N()})})}/**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking the left and right arrow keys
   */addOnArrowKeyClickedHandler(){document.addEventListener("keydown",t=>{("ArrowLeft"===t.key||"ArrowRight"===t.key)&&this.#N()})}/**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking a marker
   */addOnMarkerClickedHandler(){document.querySelector(".content-spotlight--markers").addEventListener("click",t=>{this.#N()})}#N(){this.#q(!1),this.#B.style.transform="translateX(-100%)",this.#D(),// Changes overview content after 0.5 seconds to avoid visible changes during transition
// Note: Must be < ~1 second to avoid not triggering the animation for clipped titles in the overview since the
//       trigger is dependent on the new slide content
setTimeout(()=>{this.#z()},500)}#q(t){document.querySelector('.content-spotlight--main-content[style="transform: translateX(0%);"] .content-spotlight--text-container').style.opacity=t?"0":""}#D(){// Note: Must execute to avoid animating the title to default position while already at the default position,
//       which causes either a slight jitter or a clipped title to not animate (since it's stuck at the
//       default position)
clearTimeout(this.#x),// Note: Must execute code below (i.e. transition = 'none') to avoid not moving clipped titles immediately to
//       the default position because the duration property is always set for clipped titles
this.#_.style.transition="none",this.#_.style.left="-0.5%",// Note: Must execute after some time to avoid conflict between transition = 'none' and transition = '...'
setTimeout(()=>{this.#_.style.transitionProperty="left",this.#_.style.transitionDelay="1.5s",this.#_.style.transitionTimingFunction="cubic-bezier(1, 1, 1, 1)"},100)}#z(){let t=this.#P(),e=this.#r[t];this.#R(e),this.#M.style.backgroundColor=this.#L(Number(this.#M.textContent))}#P(){let t=0;return document.querySelectorAll(".content-spotlight--marker").forEach(e=>{e.classList.contains("content-spotlight--marker-active")&&(t=e.dataset.slide)}),t}#R(t){this.#_.textContent=t.title,this.#M.textContent=this.#$(Number(t.rating),1),this.#H.textContent=`Release Date: ${t.releaseDate}`,this.#I.innerHTML="",this.#I.innerHTML=`
      <p>Genres: &nbsp;</p>
      ${t.genres.map((e,n)=>n===t.genres.length-1?`<p class="content-spotlight--overview-genre">${e}</p>`:`<p class="content-spotlight--overview-genre">${e}, &nbsp;</p>`).join("")}
    `,this.#O.textContent=t.description}#$(t,e){return(Math.round(10*t)/10).toFixed(e)}#L(t){return t>=9?"var(--c-rating-best)":t>=8?"var(--c-rating-good)":t>=7?"var(--c-rating-okay)":t>=6?"var(--c-rating-bad)":"var(--c-rating-worst)"}},C=new class{#G;#V;/**
   * Initializes class variables
   *
   * @param {*} trackContent Contains the content for each track
   */initVars(t){this.#G=t,this.#V=document.querySelector(".content-tracks")}/**
   * Initializes the track default state
   */initDefaultState(){this.#V.innerHTML="",this.#G.forEach((t,e)=>{this.#V.insertAdjacentHTML("beforeend",`<div class="content-tracks--section">
          <div class="content-tracks--section-heading">
            <p class="content-tracks--section-heading-title">${t.heading}</p>
            <div class="content-tracks--section-slider-markers">
              <div class="content-tracks--section-slider-marker content-tracks--section-slider-marker-active"></div>
              <div class="content-tracks--section-slider-marker"></div>
              <div class="content-tracks--section-slider-marker"></div>
              <div class="content-tracks--section-slider-marker"></div>
            </div>
          </div>

          <div class="content-tracks--section-slider" data-section-slider="${e}">
            ${t.movies.map((t,e)=>`<div class="content-tracks--section-slider-content"
                             style="transform: translateX(${104.5*e}%)
                                    ${5===e?"; filter: brightness(50%)":""}">
                          <div class="content-tracks--overview">
                            <div class="content-tracks--trailer-container">
                              <iframe
                                class="content-tracks--trailer"
                                frameborder="none"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY?enablejsapi=1&controls=0&autoplay=1">
                              </iframe>
                            </div>
                            <img
                              class="content-tracks--overview-img"
                              src="${i}/${o}${t.backdropPath}" />
                            <div class="content-tracks--overview-meta">
                              <div>
                                <p class="content-tracks--overview-rating" style="background-color: ${this.#W(t.rating)}">${this.#F(t.rating,1)}</p>
                                <div class="content-tracks--overview-genres">
                                  ${t.genres.map((e,n)=>n>2?"":n===(t.genres.length-1<2?t.genres.length-1:2)?`<p class="content-spotlight--overview-genre">${e}</p>`:`<p class="content-spotlight--overview-genre">${e}, &nbsp;</p>`).join("")}
                                </div>
                                <div>
                                  <button class="content-tracks--overview-btn content-tracks--overview-desc-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="content-tracks--overview-btn-icon content-tracks--overview-desc-btn-icon">
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                  </button>
                                  <button class="content-tracks--overview-btn content-tracks--overview-trailer-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <p class="content-tracks--overview-desc">${t.description}</p>
                            </div>
                          </div>
                        </div>`).join("")}
          </div>

          <button class="content-tracks--btn content-tracks--left-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-tracks--btn-icon">
              <path class="path" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button class="content-tracks--btn content-tracks--right-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="content-tracks--btn-icon">
                <path class="path" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
          </button>

          <div class="slider-shadow-left-sm"></div>
          <div class="slider-shadow-right-sm"></div>
        </div>`)})}#F(t,e){return(Math.round(10*t)/10).toFixed(e)}#W(t){return t>=9?"var(--c-rating-best)":t>=8?"var(--c-rating-good)":t>=7?"var(--c-rating-okay)":t>=6?"var(--c-rating-bad)":"var(--c-rating-worst)"}},_=new class{#U;#J;/**
   * Initializes class variables
   */initVars(){this.#U=document.querySelector(".content-tracks"),this.#J=document.querySelectorAll(".content-tracks--section")}/**
   * Initializes class handlers
   */initHandlers(){this._handleSliderHovered(),this._handleSliderBtnClicked(),this._handleSliderBtnHovered()}/**
   * Handles the visibility of the shadows
   */_handleSliderBtnHovered(){this.#U.addEventListener("mouseover",t=>{let e=t.target.closest(".content-tracks--btn");e&&(e.classList.contains("content-tracks--left-btn")?this.#T(e,!1,!0):e.classList.contains("content-tracks--right-btn")&&this.#T(e,!0,!0))}),this.#U.addEventListener("mouseout",t=>{let e=t.target.closest(".content-tracks--btn");e&&(e.classList.contains("content-tracks--left-btn")?this.#T(e,!1,!1):e.classList.contains("content-tracks--right-btn")&&this.#T(e,!0,!1))})}#T(t,e,n){let i=t.closest(".content-tracks--section").querySelector(e?".slider-shadow-right-sm":".slider-shadow-left-sm");i.style.width=n?"3rem":"0rem"}/**
   *  Handles the visibility of the track markers
   */_handleSliderHovered(){this.#J.forEach(t=>{t.addEventListener("mouseenter",e=>{t.querySelector(".content-tracks--section-slider-markers").style.width="6rem"})}),this.#J.forEach(t=>{t.addEventListener("mouseleave",e=>{t.querySelector(".content-tracks--section-slider-markers").style.width="0"})})}/**
   * Handles the carousel functionality of each track
   *
   * Note: Clicking a button too fast (from rendering) results in e.target === <path ... />
   */_handleSliderBtnClicked(){this.#U.addEventListener("click",t=>{let e=t.target.closest(".content-tracks--btn");if(e){if(e.classList.contains("content-tracks--left-btn"))this.#X(e),this.#K(e,!1),this.#Y(e,!1);else if(e.classList.contains("content-tracks--right-btn")){let t=e.previousElementSibling;t.style.opacity="1",this.#X(e),this.#K(e,!0),this.#Y(e,!0)}}})}#X(t){let e=t.closest(".content-tracks--section").querySelectorAll(".content-tracks--section-slider-content"),n=t.closest(".content-tracks--section").querySelectorAll(".content-tracks--btn");e.forEach(t=>{t.style.pointerEvents="none",setTimeout(()=>{t.style.pointerEvents="auto"},2200)}),n.forEach(t=>{t.style.pointerEvents="none",setTimeout(()=>{t.style.pointerEvents="auto"},2200)})}#K(t,e){let n=t.closest(".content-tracks--section").querySelectorAll(".content-tracks--section-slider-marker"),i=0;n.forEach((t,n)=>{t.classList.contains("content-tracks--section-slider-marker-active")&&(i=e?(n+1)%4:(n+3)%4),t.classList.remove("content-tracks--section-slider-marker-active")}),n[i].classList.add("content-tracks--section-slider-marker-active")}#Y(t,e){let n=e?t.previousElementSibling.previousElementSibling:t.previousElementSibling,i=Array.from(n.querySelectorAll(".content-tracks--section-slider-content"));i.forEach(t=>{let n=this.#Z(t.style.transform),i=this.#Q(n,e);t.style.transform=`translateX(${i}%)`,-104.5===i||522.5===i?this.#tt(t,!0):this.#tt(t,!1),e?n<-104.5?this.#te(t,i,e):1985.5===n&&this.#te(t,i,!1):n>522.5&&this.#te(t,i,e)})}#tt(t,e){e?setTimeout(()=>{t.style.filter="brightness(50%)"},1900):t.style.filter="brightness(100%)"}#Z(t){let e=t.slice(11);return Number(e.slice(0,e.indexOf("%")))}#Q(t,e){return e?t-522.5:t+522.5}#te(t,e,n){t.style.opacity="0",t.style.transform=`translateX(${n?e+2090:e-2090}%)`,setTimeout(()=>{t.style.opacity="1"},2e3)}},M=new class{#tn;#ti;#tr;#ts;#to;#ta;/**
   * Initializes class variables
   */initVars(){this.#tn=document.querySelectorAll(".content-tracks--section-slider-content"),this.#ti=[]}/**
   * Initializes class handlers
   */initHandlers(){this._handleMetaBtnIconClicked(),this._handleContentHoverState()}/**
   * Handles displaying the description or trailer for a track content depending on which
   * button is clicked
   *
   * Note: Could be divided into separate functions but maintained for efficiency
   */_handleMetaBtnIconClicked(){this.#tn.forEach(t=>{t.addEventListener("click",e=>{if(e.target.closest(".content-tracks--overview-btn")){let n=e.target.closest(".content-tracks--overview-meta");if(e.target.closest(".content-tracks--overview-desc-btn")){let t="9rem"===n.style.minHeight;n.style.minHeight=t?"3.5rem":"9rem"}else if(e.target.closest(".content-tracks--overview-trailer-btn")){let n=t.querySelector(".content-tracks--trailer"),i="autoplay"===n.allow;this.#tl(e.target,i),n.style.transitionDuration=i?"0.1s":"1s",n.style.transitionDelay=i?"0s":"1s",n.style.opacity=i?"0":"1",n.allow=i?"":"autoplay",n.src=i?n.src:n.src.concat("&autoplay=1")}}})})}/**
   * Handles enlarging and shrinking track content depending on hover state
   *
   * Note: Could be divided into separate functions but maintained for efficiency
   */_handleContentHoverState(){for(let t=0;t<this.#tn.length;t++){let e;let n=this.#tn[t];// Handles enlarging a track content that is being hovered
n.addEventListener("mouseenter",async()=>{let t=this.#tc(n.style.transform);if(t<0||t>418)return;let i=Number(n.closest(".content-tracks--section-slider").dataset.sectionSlider);if(n.style.transform.includes("scale(1.3)")||this.#to&&!this.#ta&&this.#tr!==t&&this.#ts===i&&(await this.#td(401),!n.matches(":hover")||n.style.transform.includes("scale(1.3)")))return;this.#ti.forEach(t=>{clearTimeout(t)}),clearTimeout(e),this.#ts=i,this.#tr=t,this.#to=!0,n.style.zIndex="48",n.style.transition="filter 0.8s, transform 1.2s cubic-bezier(0.17, 0.84, 0.44, 1)",n.style.transformOrigin=0===t?"left":418===t?"right":"center",n.style.transform=n.style.transform.concat(" scale(1.3)");let r=n.querySelector(".content-tracks--overview-img");r.style.borderRadius="4px 4px 0 0";let s=n.querySelector(".content-tracks--overview-meta");s.style.opacity="1",s.style.pointerEvents="auto"}),// Handles shrinking a track content that is no longer hovered
n.addEventListener("mouseleave",()=>{if(!n.style.transform.includes("scale(1.3)"))return;let t=this.#tc(n.style.transform);if(t<0||t>418)return;this.#th(n);let i=n.style.transform;n.style.transform=i.slice(0,i.indexOf(" ")),n.style.transition="filter 0.8s, transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1)";let r=n.querySelector(".content-tracks--overview-img");r.style.borderRadius="4px";let s=n.querySelector(".content-tracks--overview-meta");s.style.minHeight="3.5rem",s.style.opacity="0",s.style.pointerEvents="none";let o=s.querySelector(".content-tracks--overview-desc");o.scrollTo(0,0),this.#ta=!1,e=setTimeout(()=>{n.style.zIndex="47",n.style.transition="filter 0.8s, transform 2.5s cubic-bezier(0.17, 0.84, 0.44, 1)",this.#ta=!0},400)})}}#th(t){let e=t.querySelector(".content-tracks--overview-trailer-btn");this.#tl(e,!0);let n=t.querySelector(".content-tracks--trailer");n.style.transitionDuration="0.1s",n.style.transitionDelay="0s",n.style.opacity="0",n.allow="",n.src=n.src}#tl(t,e){let n=t.closest(".content-tracks--overview-trailer-btn");n.innerHTML="",n.insertAdjacentHTML("beforeend",e?`<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>`:`<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
          </svg>`)}#tc(t){return Number(t.slice(11,t.indexOf("%")))}#td(t){return new Promise(e=>{let n=setTimeout(()=>e(),t);this.#ti.push(n)})}};y.initVars(),y.initHandlers();/////////////////////////////////////////////////
///////// Default movie state init
/////////////////////////////////////////////////
const H=async function(){p(1),await Promise.all([g(),u(1)]),await m()},I=function(){// Determines the top 3 most popular movies
w(),b.initVars(c.movieSpotlightInfo),b.initDefaultState(),S.initVars(),S.initHandlers(),T.initVars(),T.initDefaultState(),T.initHandlers(),B.initDefaultState(c.movieSpotlightInfo[0]),B.initVars(c.movieSpotlightInfo),B.initHandlers()},O=async function(){// Determines the top rated movies and most popular movies by genre
f(),// Fetches relevant backdrops of each track movie
// Note: Dependent on above code
await k(),C.initVars(c.movieTracksInfo),C.initDefaultState(),_.initVars(),_.initHandlers(),M.initVars(),M.initHandlers()},E=function(t){t||localStorage.getItem("movieState")||localStorage.setItem("movieState",JSON.stringify(c))},x=async function(){await H(),I(),await O(),E(!1)};x();//# sourceMappingURL=index.da587371.js.map

//# sourceMappingURL=index.da587371.js.map
