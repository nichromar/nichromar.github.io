images = document.getElementsByClassName('t2');
for(let i = 0; i < images.length; i++){
    images.item(i).addEventListener('click', (e) => {
        images.item(i).classList.toggle('t3');
    })
}