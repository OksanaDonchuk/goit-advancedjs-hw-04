import{a as y,S as b,i as a}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();async function v(s,t,r){const n="https://pixabay.com/api/",e="37918988-e3d1c8b61b1090de1ebde83c0";return(await y.get(`${n}`,{params:{key:`${e}`,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:`${t}`,per_page:`${r}`}})).data}const u=40,E=document.querySelector(".search-form"),f=document.querySelector(".gallery"),L=document.querySelector(".observer"),l=document.querySelector(".end-page"),$=new b(".gallery a"),c=new IntersectionObserver(S,{rootMargin:"1000px"});l.classList.add("is-hidden");E.addEventListener("submit",w);let d,m;function w(s){s.preventDefault();const t=s.currentTarget.elements.searchQuery.value.trim();if(!t){a.show({message:"Enter the value to search for.",position:"topRight",color:"#FCE8E6"});return}d=0,m=t,f.innerHTML="",c.observe(L)}async function S(s){s.forEach(async t=>{if(t.isIntersecting){d+=1;const r=await P(m,d);r&&(f.insertAdjacentHTML("beforeend",r),$.refresh())}})}async function P(s,t=1){try{l.classList.add("is-hidden");const r=await v(s,t,u);return r.totalHits?(t===1&&a.show({message:`Hooray! We found ${r.totalHits} images.`,position:"topRight",color:"#E6FCED"}),r.totalHits<=t*u&&(c.disconnect(),l.classList.remove("is-hidden")),r.hits.map(({largeImageURL:n,webformatURL:e,tags:o,likes:i,views:p,comments:h,downloads:g})=>`
                <a class="gallery__item" href="${n}">
                  <div class="photo-card">
                      <img src="${e}" alt="${o}" loading="lazy" />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${i}</p>
                        <p class="info-item"><b>Views</b> ${p}</p>
                        <p class="info-item"><b>Comments</b> ${h}</p>
                        <p class="info-item"><b>Downloads</b> ${g}</p>
                      </div>
                    </div>
                 </a>`).join("")):(a.show({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",color:"#FCE8E6"}),c.disconnect(),"")}catch(r){console.dir(r),a.error({message:r.message}),c.disconnect()}}
//# sourceMappingURL=commonHelpers.js.map
