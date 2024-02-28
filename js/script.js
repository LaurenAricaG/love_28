countTime('2023/09/28 21:00', 'day', 'hour', 'minute', 'second');
document.writeln(
    "<div class=\"snow\" style=\"height:100%; position:fixed; left:0px; top:0px;right:0px; bottom:0px; pointer-events: none;z-index: 9999;\"><canvas width=\"1904\" height=\"913\" style=\"position:absolute;left: 0;top: 0;\"></canvas></div>"
);
    
// NIEVE
$(function () {

    if (/MSIE 6|MSIE 7|MSIE 8/.test(navigator.userAgent)) {
    return
    }
    var container = document.querySelector(".snow");
    if (/MSIE 9|MSIE 10/.test(navigator.userAgent)) {
    $(container).bind('click mousemove', function (evt) {
        this.style.display = 'none';
        var x = evt.pageX,
        y = evt.pageY
        if ($(document).scrollTop() > 0 || $(document).scrollTop() > 0) {
        x = x - $(document).scrollLeft() + 1
        y = y - $(document).scrollTop() + 1
        }
        evt.preventDefault();
        evt.stopPropagation();
        var under = document.elementFromPoint(x, y);
        var evtType = evt.type === 'click' ? 'click' : 'mouseenter'
        if (evt.type === 'click') {
        $(under)[0].click();
        } else {
        $(under).trigger('mouseenter');
        }
        $('body').css('cursor', 'default')
        this.style.display = '';
        return false;
    });
    }
    var containerWidth = $(container).width();
    var containerHeight = $(container).height();
    var particle;
    var camera;
    var scene;
    var renderer;
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var particles = [];
    var particleImages = [new Image(), new Image(), new Image(), new Image(), new Image()];
    particleImages[0].src = "./img/151375665240370100.png";
    particleImages[1].src = "./img/151375668550091372.png";
    particleImages[2].src = "./img/151375669416355455.png";
    particleImages[3].src = "./img/151375670204115466.png";
    particleImages[4].src = "./img/151375671039447316.png";
    var snowNum = 300;

    function init() {
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    scene.add(camera);
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(containerWidth, containerHeight);
    for (var i = 0; i < snowNum; i++) {
        var material = new THREE.ParticleBasicMaterial({
        map: new THREE.Texture(particleImages[i % 5])
        });
        particle = new Particle3D(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = 1;
        scene.add(particle);
        particles.push(particle)
    }
    container.appendChild(renderer.domElement);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("touchstart", onDocumentTouchStart, false);
    document.addEventListener("touchmove", onDocumentTouchMove, false);
    setInterval(loop, 900 / 50)
    }

    function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY
    }

    function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY
    }
    event.preventDefault();
    }

    function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY
    }
    event.preventDefault();
    }

    function loop() {
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        if ($(window).scrollTop() < 1000) {
        particle.scale.x = particle.scale.y = 1;
        } else {
        if (i > particles.length / 5 * 3) {
            particle.scale.x = particle.scale.y = 0;
        } else {
            particle.scale.x = particle.scale.y = 0.8;
        }
        }
        particle.updatePhysics();
        with(particle.position) {
        if (y < -1000) {
            y += 2000
        }
        if (x > 1000) {
            x -= 2000
        } else {
            if (x < -1000) {
            x += 2000
            }
        }
        if (z > 1000) {
            z -= 2000
        } else {
            if (z < -1000) {
            z += 2000
            }
        }
        }
    }
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera)
    }
    init()
});

// --------------------------------------------------------------

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

function loadImage(imgIndex) {
    curImgDom.src = imgList[imgIndex];
    if (isInitImage) {
        $('.img-intro').text(imgDescList[imgIndex]);
        return;
    }else {
        if (curImgDom.complete) {
            $('.img-intro').text(imgDescList[imgIndex]);
            return false;
        }
        curImgDom.onload = function () {
            $('.img-intro').text(imgDescList[imgIndex]);
        };
    }
}

//MOSTRAR IMAGENES CON EL TEXTO
var imgList = ['./images/img_1.jpg', './images/img_2.jpg', './images/img_3.jpg', './images/img_4.jpg', './images/img_5.jpg', './images/img_6.jpg', './images/img_7.jpg'];
var imgDescList = ['','Tú y yo, juntos para siempre.','','Cada momento a tu lado es un regalo único.','En tus ojos encuentro mi paz y en tus labios mi felicidad.','Mi corazón late por ti.', 'Contigo, todo es perfecto, TE❤AMO'];
var isInitImage = false;
var imgIndex = 0;
function setTimer(){
    var timer = setInterval(function() {
        imgIndex = 1 + imgIndex;
        if (imgIndex > (imgList.length - 1)) {
            imgIndex = 0;
            if (!isInitImage) {
                isInitImage = true;
                curImgDom.onload = null;
            }
        }
        imgIndex = (imgIndex > (imgList.length - 1)) ? 0 : imgIndex;
        loadImage(imgIndex);
    }, 4000);
    return timer;
}
var timer= setTimer();

