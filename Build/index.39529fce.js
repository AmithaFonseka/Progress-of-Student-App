(()=>{"use strict";let e=()=>localStorage.getItem("theme"),t=e=>localStorage.setItem("theme",e),a=()=>{let t=e();return t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")},r=e=>{"auto"===e&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.setAttribute("data-bs-theme","dark"):document.documentElement.setAttribute("data-bs-theme",e)};r(a());let d=(e,t=!1)=>{let a=document.querySelector("#bd-theme");if(!a)return;let r=document.querySelector("#bd-theme-text"),d=document.querySelector(".theme-icon-active use"),c=document.querySelector(`[data-bs-theme-value="${e}"]`),s=c.querySelector("svg use").getAttribute("href");document.querySelectorAll("[data-bs-theme-value]").forEach(e=>{e.classList.remove("active"),e.setAttribute("aria-pressed","false")}),c.classList.add("active"),c.setAttribute("aria-pressed","true"),d.setAttribute("href",s);let l=`${r.textContent} (${c.dataset.bsThemeValue})`;a.setAttribute("aria-label",l),t&&a.focus()};window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{let t=e();"light"!==t&&"dark"!==t&&r(a())}),window.addEventListener("DOMContentLoaded",()=>{d(a()),document.querySelectorAll("[data-bs-theme-value]").forEach(e=>{e.addEventListener("click",()=>{let a=e.getAttribute("data-bs-theme-value");t(a),r(a),d(a,!0)})})})})();
//# sourceMappingURL=index.39529fce.js.map
