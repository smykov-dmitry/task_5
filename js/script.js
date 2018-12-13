var script = document.createElement('script');
var url = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108";
var pics = [];
var photos = document.getElementById('photos');

script.src = url + '&callback=callbackFunc';
document.getElementsByTagName("head")[0].appendChild(script);

function callbackFunc(result) {
    do {
        var spinnerLayer = document.getElementById('spinner');
        spinnerLayer.style.display = 'flex';
        pics = result.response.items;
    }
    while (pics.length < 106)
    document.getElementById('spinner').style.display = 'none';
    var step = 3;
    for (var i=0; i<pics.length; i = i+step) {
        var row = document.createElement('div');
        row.className = 'row';
        var tmp = i%3;
        if (tmp == 0) {
            for (j=0; j<3;j++) {
                var pic = document.createElement('img');
                pic.id = (i+j).toString();
                pic.addEventListener("click", showModal);
                pic.addEventListener("mouseenter", inHover);
                pic.addEventListener("mouseleave", outHover);
                pic.src = pics[i+j].sizes[3].url;
                row.appendChild(pic);
            }
            photos.appendChild(row);
        }
    }
}

function inHover (event) {
    var hoverPic = document.getElementById(event.target.id);
    hoverPic.style.opacity = '0.7';
    hoverPic.style.cursor = 'pointer';
}

function outHover (event) {
    var hoverPic = document.getElementById(event.target.id);
    hoverPic.style.opacity = '1';
}

function showModal (event) {
    var modal = document.getElementById('modal');
    var picContainer = document.getElementById('pic-container');
    var crossClose = document.getElementById('cross-close');
    var leftArrow = document.getElementById('left-arrow');
    var rightArrow = document.getElementById('left-arrow');
    var bigView = document.createElement('div');
    var carousel = document.getElementById('carousel');
    var counter = document.getElementById('counter');
    document.getElementById('pic-container').innerHTML = "";
    document.getElementById('carousel').innerHTML = "";
    crossClose.addEventListener("click", closeModal);
    function closeModal() {
        modal.style.display = 'none';
        document.getElementById('pic-container').innerHTML = "";
        document.getElementById('carousel').innerHTML = "";
    }
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    //console.log(event.target);
    for(var i=0; i<pics.length; i++) {
        if(event.target.id == i) {
            var pic = document.createElement('img');
            pic.src = pics[i].sizes[6].url;
            bigView.appendChild(pic);
            picContainer.appendChild(bigView);
            for(j=-2; j<3; j++) {
                var tmp = i+j;
                if(tmp<0) {
                    tmp = 108+j;
                }
                if(tmp>107) {
                    tmp = tmp - 108;
                }
                var carouselPic = document.createElement('img');
                carouselPic.id = tmp;
                carouselPic.src = pics[tmp].sizes[0].url;
                carouselPic.addEventListener("click", showModal);
                carouselPic.addEventListener("mouseenter", inHover);
                carouselPic.addEventListener("mouseleave", outHover);
                carousel.appendChild(carouselPic);
                counter.innerHTML = "";
                counter.innerHTML = (i+1) + "/" + pics.length;
            }
        }
    }
}
