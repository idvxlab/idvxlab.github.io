

let d = 0;
d3.tsv("data.csv").then(function(data) {
  console.log(data);
  d = data;
});


var UA = {};
UA.isMobile = /iPad|iPod|iPhone|Android/.test(navigator.userAgent);
UA.isWx = /MicroMessenger/.test(navigator.userAgent);

var window_width = $(window).width(),
    window_height = $(window).height();

var north_street, south_street;
var tooltip;
$(document).ready(function() {
    loading();
    // 
    if (UA.isMobile) {
        let arc = addSvg("#architecture", "img/new_architecture.svg", useViewBox=true, viewBox="0 0 804 499");
        // arc.attr('transform', 'rotate(90)');
    } else {
        addSvg("#architecture", "img/new_architecture.svg", useViewBox=false, viewBox="", 
            hw=[window_height*0.5, window_height*0.5 * 804/499]);
    }
    
    north_street = addSvg("#street-north", "img/new_street-building-north.svg", 
        useViewBox=false, viewBox='', hw=[window_height*0.3, window_height*0.3 * 10761/1170.32])//"0 0 10761 1000");
    south_street = addSvg("#street-south", "img/new_street-building-south.svg", 
        useViewBox=false, viewBox='', hw=[window_height*0.3, window_height*0.3 * 10761/1170.32])//"0 0 10761 1000");

    tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    setTimeout(() => {
        
        let res1,res2;
        res1 = south_street.selectAll('g')
        res1.on("click", function(e, d) {
            console.log(e, d);
            let name = res1._groups[0][d].id
            if (name !== "" ) {
                tooltip.transition().duration(200).style("opacity", 0.9);
                if (name==="永安百货") {
                    tooltip.html('<strong>' + name +'</strong><br>南京东路635号<br>建于1918年。20世纪初折衷主义建筑风格的典型代表。南京路中央顶部有一座塔楼，名为“绮云阁”，是上海解放时南京路第一面红旗升起的地方，成为南京路一大人文景观。')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                } else if (name == "上海市第一食品商店") {
                    tooltip.html('<strong>' + name +'</strong><br>南京东路635号<br>建于1918年。20世纪初折衷主义建筑风格的典型代表。南京路中央顶部有一座塔楼，名为“绮云阁”，是上海解放时南京路第一面红旗升起的地方，成为南京路一大人文景观。')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }
                tooltip.html('<strong>' + name.split('_').filter(n => n[0]!='x').join('，') +'</strong>').style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            }
            
        }).on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            }).on("touchend", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });;

        res2 = north_street.selectAll('g');
        res2.on("click", function(e, d) {
            console.log(e, d);
            let name = res2._groups[0][d].id
            if (name !== "" ) {
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip.html('<strong>' + name.split('_').filter(n => n[0]!='x').join('，') +'</strong>').style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            }
            
        }).on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            }).on("touchend", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

    }, 3000);
})

function addSvg(domName, svgFileName, useViewBox, viewBox, hw) {
    var sketchZoom = d3.zoom();
    var ll = Math.min(window_height, window_width) * 0.5;
    if (viewBox == undefined) {
        viewBox = "0 0 " + window_width + " " + window_height;
    }
    var svg = d3.select(domName).append("svg")
        // .attr("width", window_width > 500 ? 0.7 * window_height : window_width - 5 + 'px')
        // .attr("height", window_width > 500 ? 0.7 * window_height : window_width - 5 + 'px')
        .attr('float', 'none')
        .attr('preserveAspectRatio',"xMidYMin meet")
    if (useViewBox == true) {
        svg.attr("viewBox", viewBox)
    } else {
        console.log(hw);
        svg.attr('width', hw[1]).attr('height', hw[0]);
    }
        
        // .call(sketchZoom.on("zoom", () => console.log('hi')));

    function responseCallback (xhr) {
        svg.append(function () {
                return xhr.responseXML.querySelector('svg');
            })
            
    }

    d3.request(svgFileName)
        .mimeType("image/svg+xml")
        .response(responseCallback)
        .get();

    return svg;
}


function loading() {
    var ary = ["new_architecture.svg","HouseLOADING.gif", "BackGround.gif", "1870road.jpg","ArrowUpDownV2.gif", "new_street-building-south.svg","new_street-building-north.svg"];
    var speed;
    var c = 0;
    var counter = 0;
    var step = 0,
        total = ary.length;

    $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    step++;
                    $(".loading-page .counter h1").html((step / total * 100).toFixed(0) + "%");
                    // $progressBox.css('width', step / total * 100 + '%');
                    oImg = null;

                    //->所有图片都已经加载完毕:关闭LOADING,显示PHONE
                    if (step === total) {
                        $('.loading_house_gif').css('display', 'none');
                $('.loading_street_gif').css('display', 'none');
                $('.loading-page').fadeOut(800);
                setTimeout(function () {
                    $(".swiper-wrapper").css("display","block");
                    $(".swiper-slide_0").fadeIn(500);

                    var swiper = new Swiper('.swiper-container', {
                        // slidesPerView: 'auto',
                        direction: 'vertical',
                        // mousewheel: true,
                        freeMode: false,
                        keyboard: {
                            enabled: true,
                            onlyInViewport: false,
                          },
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                        on: {
                            transitionStart: function () {
                                var index = $(".swiper-slide-active").attr('class').split("_")[1].split(" ")[0];
                                console.log('index',index);

                                if (index == '5') {

                                    swiper.destroy(false);
                                    swiper = new Swiper('.swiper-container', {
                                        slidesPerView: 'auto',
                                        direction: 'vertical',
                                        // mousewheel: true,
                                        freeMode: false,
                                        keyboard: {
                                            enabled: true,
                                            onlyInViewport: false,
                                          },
                                        scrollbar: {
                                            el: '.swiper-scrollbar',
                                        },
                                    });
                                    // swiper.detachEvents();
                                    swiper.slideTo(5, 500);
                                    $('.swiper-scrollbar').css('display', 'none');
                                    $('.container').css({
                                        'overflow': 'hidden',
                                        'pointer-events': 'none'
                                    });

                                    $('.map-container').css({
                                        'display': 'block',
                                        'overflow': 'scroll'
                                    });

                                }
                            }
                        }
                    });
                }, 20);
                    }
                }
            });
}

// var exploreViewRender = (function(){
//     return {
//         init: function () {
//             BUILDING[]
//         }
//     }
// })()



