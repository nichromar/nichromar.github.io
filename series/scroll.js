image_tracks = document.querySelectorAll(".images");
image_track_interiors = document.querySelectorAll(".imagesint");
scrollbars = document.querySelectorAll(".scrollbar");

function fitScrollbar(j){
    image_tracks[j].addEventListener("scroll", () => {
        loc = 2 + image_tracks[j].scrollLeft + (image_tracks[j].offsetWidth-4)*image_tracks[j].scrollLeft/image_tracks[j].scrollWidth;
        loc = Math.min(loc, image_track_interiors[j].offsetWidth - scrollbars[j].offsetWidth - 2);
        scrollbars[j].style.left = loc + "px";
    });
}

function defineScrollbars(){
    for(var i = 0; i < image_tracks.length; i++){
        if(image_tracks[i].offsetWidth > image_track_interiors[i].offsetWidth){
            scrollbars[i].style.opacity = 0;
        } else {
            scrollbars[i].style.opacity = 1;
            scrollbars[i].style.width = 100*(image_tracks[i].offsetWidth/image_track_interiors[i].offsetWidth) + "%";
            fitScrollbar(i);
        }
    }
}

Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    defineScrollbars();
    addEventListener("resize", () => {
        defineScrollbars();
    });
});