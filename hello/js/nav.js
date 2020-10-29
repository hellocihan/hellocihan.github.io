
/**
 * The nav stuff
 */ (function(window) {

    'use strict';

    var body = document.body,
        mask = document.createElement("div"),
        toggleSlideRight = document.getElementsByClassName("toggle-slide-right"),
        dataImg = document.querySelector(".dataImg"),
        spinner = document.querySelector(".loading"),
        colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#bf717f", "#814968", "#8f2041"],
        activeNav;

    mask.className = "mask";
    dataImg.style.display = 'none';

    var dataImgFunction = function() {
        var thisAttr = this.getAttribute("data-href");
        var thisAttr2x = thisAttr.replace('.png', '') + '@2x.png';
        classie.add(body, "smr-open");
        document.body.appendChild(mask);
        activeNav = "smr-open";
        dataImg.style.display = 'block';
        dataImg.setAttribute("src", "/hello/images/spacer.png");
        dataImg.setAttribute("srcset", "/hello/images/spacer.png");
        spinner.style.display = "block"
        setTimeout(function() {
            spinner.style.display = "none";
            dataImg.setAttribute("src", thisAttr);
            dataImg.setAttribute('srcset', thisAttr2x + ' 2x');
        }, 2000);
    };

    for (var i = 0; i < toggleSlideRight.length; i++) {
        toggleSlideRight[i].addEventListener('click', dataImgFunction, false);
    }

    /* hide active menu if mask is clicked */
    mask.addEventListener("click", function() {
        classie.remove(body, activeNav);
        activeNav = "";
        document.body.removeChild(mask);
    });

    /* hide active menu if close menu button is clicked */ [].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el, i) {
        el.addEventListener("click", function() {
            classie.remove(body, activeNav);
            activeNav = "";
            document.body.removeChild(mask);
        });
    });




    var images = ['<img src="art/001.png">', '<img src="art/002.png">', '<img src="art/003.png">', '<img src="art/004.png">', '<img src="art/005.png">', '<img src="art/006.png">', '<img src="art/007.png">'],
        index = 0;
    index = Math.floor(Math.random() * images.length);
    $("#art").css("opacity", 1).html(images[index]);
})(window);
