// MUSICA
var musicDom = document.querySelector('.music');
var audioDom = document.querySelector('.audio');
var musicCloseDom = musicDom.querySelector('.music-close');
var curImgDom = document.getElementById('current-img');
if ( audioDom.readyState == 4) { 
    console.log('loaded');
} else {
    audioDom.addEventListener('play', function () {
        try {
            musicCloseDom.classList.add('rotate');
        } catch (error) {
        }
    }, false);
    audioDom.addEventListener('canplaythrough', function () {
        try {
            var promise = audioDom.play();
            if (promise !== undefined) {
                promise.then(function () {
                    musicCloseDom.classList.add('rotate');
                }).catch(function () {
                    musicCloseDom.classList.remove('rotate');
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }, false);
    audioDom.load();
}

musicDom.addEventListener('click', function (event) {
    if (!audioDom.paused) {
        audioDom.pause();
        musicCloseDom.classList.remove('rotate');
    } else {
        audioDom.play();
        musicCloseDom.classList.add('rotate');
    }

    event.preventDefault();
}, false);

