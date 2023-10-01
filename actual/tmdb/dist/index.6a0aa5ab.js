/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls information flow between the model and different views
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// MODEL of the MVC architecture
//
// Description: Fetches and posts information to the API
/////////////////////////////////////////////////
const t="https://api.themoviedb.org/3",e={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGQ0NzZiN2JmNWZmMjMxM2NlOWE5NmMzMTA2NWU2NiIsInN1YiI6IjY1MTIyNTYzMjZkYWMxMDE0ZTIzMzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ol_KoRpPN_9jMnmWMVoAklqxoxIvq9uRoKatzqDiTXY"}},i={popularMoviesInfo:[],movieSpotlightInfo:[]},n=async function(n){try{let r=await fetch(`${t}/movie/popular/?language=en-US&page=${n}`,e),s=await r.json();return i.popularMoviesInfo.push({popularMovies:s.results,page:s.page}),s}catch(t){throw console.error(`(model.js::fetchPopularMovies()) ${t}`),t}},r=async function(i){try{let n=await fetch(`${t}/genre/movie/list?language=en`,e),{genres:r}=await n.json(),s=[],o=0;return r.every(t=>(i.some(e=>e===t.id)&&(s.push(t.name),o++),o!==i.length)),s}catch(t){throw console.error(`(model.js::getGenres()) ${t}`),t}},s=async function(){if(0===i.popularMoviesInfo.length||i.popularMoviesInfo[0].popularMovies.length<3)return;let t=i.popularMoviesInfo[0].popularMovies;// FIXME: Magic numbers
for(let e=0;e<27;e+=9){let n={};n.title=t[e].title,n.releaseDate=t[e].release_date;try{n.genres=await r(t[e].genre_ids)}catch(t){throw console.error(`(module.js::determineMovieSpotlight()) ${t}`),t}n.description=t[e].overview,n.rating=t[e].vote_average,n.backdropPath=`https://image.tmdb.org/t/p/original${t[e].backdrop_path}`,i.movieSpotlightInfo.push(n)}};class o{#t=document.querySelector(".nav-bar--search");#e=document.querySelector(".nav-bar--search-bar");#i=document.querySelector(".nav-bar--search-bar-btn");initHandlers(){this.#n(),this.#r()}// TODO: Use input for search functionality
#n(){this.#t.addEventListener("submit",t=>{t.preventDefault(),console.log(this.#e.value),""!==this.#e.value&&(this.#e.value="")})}#r(){this.#i.addEventListener("mouseenter",()=>{this.#s(!0),this.#t.addEventListener("mouseleave",this.#s.bind(this,!1))})}#s(t){this.#e.style.width=t?"36rem":"0rem",this.#e.style.padding=t?"0 1rem 0 1rem":"0rem"}}var l=new o,a=new class{#o;#l;initVars(t){this.#o=t,this.#l=document.querySelector(".content-spotlight--slider")}initDefaultState(){this.#o.forEach(t=>{this.#l.insertAdjacentHTML("beforeend",`<div class="content-spotlight--main-content">
          <img class="content-spotlight--backdrop" src="${t.backdropPath}" />
          <div class="content-spotlight--text-container">  
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
          </div>
        </div>`)})}},h=new class{#a;#h;#c;#d=0;#v;initVars(){this.#a=document.querySelectorAll(".content-spotlight--btn"),this.#h=document.querySelectorAll(".content-spotlight--main-content"),this.#c=this.#h.length,this.#v=document.querySelector(".content-spotlight--markers")}initDefaultState(){this.#p(),this.#g(0),this.#u(0)}#p(){this.#h.forEach((t,e)=>{this.#v.insertAdjacentHTML("beforeend",`<div class="content-spotlight--marker" data-slide=${e}></div>`)})}initHandlers(){this.addTransitionByBtnHandler(),this.addTransitionByKeyHandler(),this.addTransitionByMarkerHandler(),this.addBtnHoverShadowHandler()}addTransitionByBtnHandler(){this.#a.forEach(t=>{t.addEventListener("click",t=>{t.currentTarget.classList.contains("content-spotlight--left-btn")?this.#m():t.currentTarget.classList.contains("content-spotlight--right-btn")&&this.#w()})})}addTransitionByKeyHandler(){document.addEventListener("keydown",t=>{"ArrowLeft"===t.key?this.#m():"ArrowRight"===t.key&&this.#w()})}addTransitionByMarkerHandler(){this.#v.addEventListener("click",t=>{if(t.target.classList.contains("content-spotlight--marker")){let e=t.target.dataset.slide;this.#g(e),this.#u(e)}})}#g(t){document.querySelectorAll(".content-spotlight--marker").forEach(t=>t.classList.remove("content-spotlight--marker-active")),document.querySelector(`.content-spotlight--marker[data-slide="${t}"]`).classList.add("content-spotlight--marker-active")}#u(t){this.#d=Number(t),this.#h.forEach((e,i)=>e.style.transform=`translateX(${(i-t)*100}%)`)}#w(){this.#d===this.#c-1?this.#d=0:this.#d++,this.#g(this.#d),this.#u(this.#d)}#m(){0===this.#d?this.#d=this.#c-1:this.#d--,this.#g(this.#d),this.#u(this.#d)}addBtnHoverShadowHandler(){this.#a.forEach(t=>{t.addEventListener("mouseover",t=>this.#S(t,!0))}),this.#a.forEach(t=>{t.addEventListener("mouseout",t=>this.#S(t,!1))})}#S(t,e){t.currentTarget.classList.contains("content-spotlight--left-btn")?document.querySelector(".slider-shadow-left").style.width=e?"7rem":"0rem":t.currentTarget.classList.contains("content-spotlight--right-btn")&&(document.querySelector(".slider-shadow-right").style.width=e?"7rem":"0rem")}},c=new /**
 * Handles the view of the spotlight overview
 */class{#o;#y;#k;#f;#O;#T;#C;#M;#b;#B;/**
   * Initializes class fields
   */initVars(t){this.#o=t,this.#y=document.querySelector(".content-spotlight--overview"),this.#k=document.querySelector(".content-spotlight--overview-title-clip"),this.#f=this.#y.querySelector(".content-spotlight--overview-title"),this.#O=this.#y.querySelector(".content-spotlight--overview-rating"),this.#T=this.#y.querySelector(".content-spotlight--overview-date"),this.#C=this.#y.querySelector(".content-spotlight--overview-genres"),this.#M=this.#y.querySelector(".content-spotlight--overview-description"),this.#b=new Event("clippedTitleAnimDone")}/**
   * Inserts the default overview layout with initial content into the DOM
   *
   * @param {*} initialContent Contains the initial content
   */initDefaultState(t){document.querySelector(".content-spotlight--slider").insertAdjacentHTML("afterend",`
        <div class="content-spotlight--overview">
          <div>
            <div class="content-spotlight--overview-title-clip">
              <p class="content-spotlight--overview-title">${t.title}</p>
            </div>
            <p class="content-spotlight--overview-rating" style="background-color: ${this.#E(t.rating)};">${t.rating}</p>
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
            ${t.genres.map((e,i)=>i===t.genres.length-1?`<p class="content-spotlight--overview-genre">${e}</p>`:`<p class="content-spotlight--overview-genre">${e}, &nbsp;</p>`).join("")}
          </div>
          <p class="content-spotlight--overview-description">${t.description}</p>
        </div>
      `)}initHandlers(){this.addOnReadBtnClickedHandler(),this.addOnOverviewBackBtnClickedHandler(),this.addOnClippedTitleAnimDoneHandler(),this.addOnSpotlightBtnClickedHandler(),this.addOnArrowKeyClickedHandler(),this.addOnMarkerClickedHandler()}// TODO: Maybe needed in the future if the spotlight is dynamically changed while on the website
//       and spotlightContent needs to be updated so the handlers can use the right data. Maybe
//       should be a handler, waiting for the signal that the spotlight content has been updated
reassignSpotlightContent(){}/**
   * Resets the position of the overview title after animation
   */addOnClippedTitleAnimDoneHandler(){this.#f.addEventListener("clippedTitleAnimDone",function(){this.style.left="-0.5%"})}/**
   * Makes the title and text in the spotlight invisible, moves the overview into the window upon clicking the 'read
   * description' container, and animates the overview title if clipped
   */addOnReadBtnClickedHandler(){document.querySelectorAll(".content-spotlight--more-container").forEach(t=>{t.addEventListener("click",()=>{this.#H(!0),this.#y.style.transform="translateX(0%)",// Animates the overview title if clipped and dispatches a custom event after the animation to trigger the
// event handler defined above
this.#L()})})}#L(){if(this.#k.offsetWidth>=this.#k.scrollWidth)return;console.log(this.#k.offsetWidth,this.#k.scrollWidth),this.#f.style.transitionDuration=`${Math.ceil(this.#k.scrollWidth/112// FIXME: magic number
)}s`;let t=this.#x(),e=(t-305)/305*100;console.log(t,e),this.#f.style.left=`-${e}%`,this.#B=setTimeout(()=>this.#f.dispatchEvent(this.#b),6e3)}#x(){this.#f.style.minWidth="max-content";let t=this.#f.offsetWidth;return this.#f.style.minWidth="",t}/**
   * Makes the spotlight title and text visible, moves the overview out of the window upon clicking the back button
   * in the overview, and resets the position of the title (for the case of clipped title animation)
   */addOnOverviewBackBtnClickedHandler(){document.querySelector(".content-spotlight--overview-back-btn").addEventListener("click",()=>{this.#H(!1),this.#y.style.transform="translateX(-100%)",this.#q()})}/**
   * Makes the title and text in the spotlight visible, moves the overview out of the window, changes the
   * overview content, and resets the position of the title (for the case of clipped title animation) upon clicking
   * any spotlight transition button
   *
   * TODO: --> (BUG) Background title doesn't appear during transition
   * TODO: --> (FUNCTIONALITY) Add the same functionality in the spotlight btns to arrow keys and markers
   */addOnSpotlightBtnClickedHandler(){document.querySelectorAll(".content-spotlight--btn").forEach(t=>{t.addEventListener("click",()=>{this.#I()})})}addOnArrowKeyClickedHandler(){document.addEventListener("keydown",()=>{this.#I()})}addOnMarkerClickedHandler(){document.querySelector(".content-spotlight--markers").addEventListener("click",t=>{this.#I()})}#I(){this.#H(!1),this.#y.style.transform="translateX(-100%)",this.#q(),// Changes overview content after 0.5 seconds to avoid visible changes during transition
// Note: Must be < ~1 second to avoid not triggering the animation for clipped titles in the overview since the
//       trigger is dependent on the new slide content
setTimeout(()=>{this.#A()},500)}#H(t){document.querySelector('.content-spotlight--main-content[style="transform: translateX(0%);"] .content-spotlight--text-container').style.opacity=t?"0":""}#q(){// Note: Must execute to avoid animating the title to default position while already at the default position,
//       which causes either a slight jitter or a clipped title to not animate (since it's stuck at the
//       default position)
clearTimeout(this.#B),// this.#spotlightOverviewTitle.style.transition = "none";
this.#f.style.left="-0.5%";// Note: Must execute after some time to avoid conflict between transition = 'none' and transition = '...'
// setTimeout(() => {
//   this.#spotlightOverviewTitle.style.transition = "left 4s cubic-bezier(1, 1, 1, 1) 1.5s";
// }, 100);
}#A(){let t=this.#$(),e=this.#o[t];this.#D(e),this.#O.style.backgroundColor=this.#E(Number(this.#O.textContent))}#$(){let t=0;return document.querySelectorAll(".content-spotlight--marker").forEach(e=>{e.classList.contains("content-spotlight--marker-active")&&(t=e.dataset.slide)}),t}#D(t){this.#f.textContent=t.title,this.#O.textContent=t.rating,this.#T.textContent=`Release Date: ${t.releaseDate}`,this.#C.innerHTML="",this.#C.innerHTML=`
      <p>Genres: &nbsp;</p>
      ${t.genres.map((e,i)=>i===t.genres.length-1?`<p class="content-spotlight--overview-genre">${e}</p>`:`<p class="content-spotlight--overview-genre">${e}, &nbsp;</p>`).join("")}
    `,this.#M.textContent=t.description}#E(t){return t>=9?"var(--c-rating-best)":t>=8?"var(--c-rating-good)":t>=7?"var(--c-rating-okay)":t>=6?"var(--c-rating-bad)":"var(--c-rating-worst)"}};l.initHandlers();/////////////////////////////////////////////////
///////// Spotlight functionality
const d=async function(){try{0===i.popularMoviesInfo.length&&await n(1),0===i.movieSpotlightInfo.length&&await s(),a.initVars(i.movieSpotlightInfo),a.initDefaultState(),h.initVars(),h.initDefaultState(),h.initHandlers(),c.initDefaultState(i.movieSpotlightInfo[0]),c.initVars(i.movieSpotlightInfo),c.initHandlers()}catch(t){throw console.error(`(controller.js::controlSpotlightMovieData()) ${t})`),t}};d();//# sourceMappingURL=index.6a0aa5ab.js.map

//# sourceMappingURL=index.6a0aa5ab.js.map
