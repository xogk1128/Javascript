const btn = document.querySelector(".menu_bar");
const menu = document.querySelector(".menu");
const icon = document.querySelector(".icon");

btn.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    icon.classList.toggle('active');
});