const fakeRequest = (url) => {
    return new Promise((resolve, reject)=>{
        const rand = Math.random();
        setTimeout(()=>{
            if(rand < 0.5)
                resolve('Your Fake Data Here');
            reject('Request Error!');
        }, 1000);
    })
};

// fakeRequest('/dogs/1')
//     .then((data)=>{
//         console.log('DONE WITH REQUEST!');
//         console.log("Data is :", data);
//     })
//     .catch((err) => {
//         console.log("Oh no!", err);
//     })
    

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve();
        }, delay);
    });
}

// delayedColorChange('red',1000)
//     .then(()=> delayedColorChange('green',1000))
//     .then(()=> delayedColorChange('blue',1000))
//     .then(()=> delayedColorChange('violet',1000))

// async function rainbow(){
//     await delayedColorChange('green',1000);
//     await delayedColorChange('blue',1000);
//     await delayedColorChange('violet',1000);
// }

// rainbow();

async function makeTwoRequests(){
    try{
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch(e){
        console.log('CAUGTH AN ERROR!');
        console.log('ERROR is :', e);
    }
}

makeTwoRequests();