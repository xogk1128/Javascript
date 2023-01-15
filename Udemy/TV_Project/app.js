const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e){
    e.preventDefault();

    const searchTerm = form.elements.query.value;
    const config = { params : { q: searchTerm}};
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    makeImages(res.data);
});

const list = document.querySelector('#list');
const makeImages = (shows) => {
    if(list.childElementCount){
        const children = list.children;
        for(let i=0; i<list.childElementCount; i++)
            list.removeChild(children[i]);
    }
    for(let result of shows){
        if(result.show.image){
            const span = document.createElement('span');
            const img = document.createElement('img');
            
            img.src= result.show.image.medium;
            span.append(img)
            list.append(span);
        }
    }
}