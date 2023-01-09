const btn = document.querySelector('button');
btn.addEventListener('click', function(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);

    document.querySelector('body').style.background = `rgb(${r},${g},${b})`;
    document.querySelector('h1').innerText = `rgb(${r},${g},${b})`;
});