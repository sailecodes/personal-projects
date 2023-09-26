// Controller of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views
class e{#e=document.querySelector(".nav-bar--search");#a=document.querySelector(".nav-bar--search-bar");#r=document.querySelector(".nav-bar--search-bar-btn");initHandlers(){this.#s(),this.#t()}#s(){this.#e.addEventListener("submit",this.#h.bind(this))}#h(e){e.preventDefault(),// TODO: Use later to get user search input
console.log(this.#a.value),""!==this.#a.value&&// ...
(this.#a.value="")}#t(){this.#r.addEventListener("mouseenter",this.#n.bind(this))}#n(){this.#i(!0),this.#e.addEventListener("mouseleave",this.#i.bind(this,!1))}#i(e){this.#a.style.width=e?"36rem":"0rem",this.#a.style.padding=e?"0 1rem 0 1rem":"0rem"}}var a=new e;new class{},a.initHandlers();//# sourceMappingURL=index.a5be67fe.js.map

//# sourceMappingURL=index.a5be67fe.js.map
