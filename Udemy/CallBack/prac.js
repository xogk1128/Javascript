const fakeRequest = (url) => {
    return new Promise((resolve, reject)=>{
        const rand = Math.random();
        setTimeout(()=>{
            if(rand < 0.5)
                resolve();
            else
                reject();
        }, 1000);
    })
};

fakeRequest('/dogs/1')
    .then(()=>{
        console.log('DONE WITH REQUEST!');
    })