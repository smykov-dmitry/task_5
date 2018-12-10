var script = document.createElement('script');
var url = "https://api.vk.com/method/photos.get?owner_id=-37512548&album_id=164359161&access_token=b90de1bdb90de1bdb90de1bdf8b96aa58abb90db90de1bde50e1574bb91f26336ad6d70&v=5.92&count=108";
var pics = [];
var photos = document.getElementById('photos');

script.src = url + '&callback=callbackFunc';
document.getElementsByTagName("head")[0].appendChild(script);

function callbackFunc(result) {
    do {
        var rt = document.getElementById('spinner');
        rt.style.display = 'flex';
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
                pic.addEventListener("click", f);
                pic.addEventListener("mouseenter", fh);
                pic.addEventListener("mouseleave", fh2);
                pic.src = pics[i+j].sizes[3].url;
                row.appendChild(pic);
            }
            photos.appendChild(row);
        }
    }
}

function fh (event) {
    var op = document.getElementById(event.target.id);
    op.style.opacity = '0.7';
    op.style.cursor = 'pointer';
}

function fh2 (event) {
    var op = document.getElementById(event.target.id);
    op.style.opacity = '1';
}

function f (event) {
    /*var rt = document.getElementById('spinner');
    rt.style.display = 'flex';*/
    var modal = document.getElementById('modal');
    var picContainer = document.getElementById('pic-container');
    var crossClose = document.getElementById('cross-close');
    var bigView = document.createElement('div');
    var carousel = document.getElementById('carousel');
    document.getElementById('pic-container').innerHTML = "";
    document.getElementById('carousel').innerHTML = "";
    crossClose.addEventListener("click", f2);
    function f2 () {
        modal.style.display = 'none';
        document.getElementById('pic-container').innerHTML = "";
        document.getElementById('carousel').innerHTML = "";
    }
    /*var rt = document.getElementById('spinner');
    rt.style.display = 'flex';
    setTimeout(function(){document.getElementById('spinner').style.display = 'none';}, 2000);*/

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
                var pic6 = document.createElement('img');
                pic6.id = tmp;
                pic6.src = pics[tmp].sizes[0].url;
                /*if(j == 0) {
                    pic6.id = '123';
                    var t = document.getElementById('123');
                    t.style.border = '1vh solid #ffffff';
                }
                pic6.id = tmp;*/
                pic6.addEventListener("click", f);
                pic6.addEventListener("mouseenter", fh);
                pic6.addEventListener("mouseleave", fh2);
                carousel.appendChild(pic6);
            }
        }
    }
}
