const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let o;function n(o){e.disabled=o,t.disabled=!o}function d(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;document.body.style.backgroundColor=t}t.addEventListener("click",(t=>{console.log(t),n(!1),o=setInterval(d,1e3)})),e.addEventListener("click",(t=>{console.log(t),n(!0),clearInterval(o)})),console.log("firsfsfdsfdt");
//# sourceMappingURL=01-color-switcher.75c3e7b8.js.map