const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a;function o(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`;document.body.style.backgroundColor=t}t.addEventListener("click",(t=>{console.log(t),t.target.disabled||(t.target.disabled=!0,a=setInterval(o,1e3))})),e.addEventListener("click",(t=>{console.log(t),t.target.disabled||(t.target.disabled=!1,clearInterval(a))}));
//# sourceMappingURL=01-color-switcher.04237036.js.map
