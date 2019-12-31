const width = window.innerWidth;
const height = window.innerHeight;
const svg_load = d3.selectAll('.cover').append("svg")
        .attr("viewBox", [0, 0, width, height]);

if (width > height) {
    svg_load.append("svg:image")
        .attr('x', (width - 1299 * height * 0.6 / 600) / 2 )
        .attr('y', (height - height * 0.6) / 2)
        .attr("width", 1299 * height * 0.6 / 600)
        .attr("height", height * 0.6)
        .attr("xlink:href", "images/tenor.gif")
} else {
    svg_load.append("svg:image")
    .attr('x', (width - width * 0.6) / 2 )
    .attr('y', (height - width * 0.6 * 1299 / 600) / 2)
    .attr("width", width * 0.6)
    .attr("height", width * 0.6 * 1299 / 600)
    .attr("xlink:href", "images/tenor.gif")
}
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        drawing_cover();
        scroll_show();
        loadData();
        $('.container').css('overflow', 'scroll')
    }
    else {
        $('.container').css('overflow', 'hidden')
    }
};
  
let wh = $('body').height();

let viewCurrentIndex = 0;
let changeColor = false;
let endPage = false;
let lock0 = false,lock1 = false,lock2 = false;
$('.question_none_2').css('display', 'none')
$('.question_none_1').css('display', 'none')
$('.question_none_0').css('display', 'none')
const vis_text = ["权限","颜色","大小","纹理","","","","","","","",""]
$('.container').scroll(function () {
    let top = $(this).scrollTop();
    if(top >= trigger_dis('.end')  && !endPage){
        $("#question2").css('opacity', 0);
        $("#end-content").css('opacity', 1);
        
        endPage = true;
        $('.container').css('overflow', 'hidden');
        $('.container').stop().animate({
            scrollTop: $('.end').position().top + 1
        }, 300);                
        setTimeout(function(){
            $('.container').css('overflow', 'scroll');
            $('.blinds').css('transform',"rotateX(0deg) translateZ(1px)");
        }, 500);
        setTimeout(function(){
            $('.end-tilte').animate({
                opacity: 1
            }, 400);
        }, 1300);
    } else if(top >= trigger_dis('.end')){
        
    }
    else if(top < trigger_dis('.end') - wh * 0.2 && top >= trigger_dis('#last_block_2') + 3 *wh){
        $("#end-content").css('opacity', 0);
        $('.end-tilte').css('opacity', 0);
        $('.blinds').css('transform',"rotateX(90deg) translateZ(1px)");
        
        endPage = false;
    }
    else if(top < trigger_dis('.end') - wh * 0.2 && top >= trigger_dis('#last_block_2') + 1.2 * wh){
        $("#end-content").css('opacity', 0);
        $('.end-tilte').css('opacity', 0);
        $('.blinds').css('transform',"rotateX(90deg) translateZ(1px)");
        
        endPage = false;
        $("#question2").css('opacity', 1);
        
    }
    else if (top >= trigger_dis('#last_block_2') + 0.8 * wh) {
        $('.end-tilte').css('opacity', 0);
        $("#question2").css('opacity', 1)
            .css({background:"#fbfa6a", transition: "0.5s"});
        $('#choice').css('opacity', 0)
        $('#questionMark2').css({fill: "64ae61", transition: "0.5s"});
        $('#questionMark2').attr("d", "M450.602458 665.598073a62.463819 62.463819 0 0 0 122.879645 0L614.441984 102.399704A102.615282 102.615282 0 0 0 512.04228 0 105.256116 105.256116 0 0 0 409.642577 112.639674L450.602458 665.598073z m61.439822 153.599556a102.399704 102.399704 0 1 0 102.399704 102.399703 96.740773 96.740773 0 0 0-102.399704-102.399703z")
        $('#questionText2_1').text("有些隐私泄露是我们自己")
        $('#questionText2_2').text("在不经意间晒出去的")
    }
    else if (top >= trigger_dis('#step_vis_final') + 1.2*wh) { 
        $('.end-tilte').css('opacity', 0);
        $("#vis").css('opacity', 0);
        $("#question2").css('opacity', 1)
                    .css({background:"#64ae61", transition: "0.5s"});
        $('#questionMark2').attr("d", "M500.382 0.006c-177.646 19.719-276.341 96.721-296.085 230.93-3.949 43.437 17.757 67.13 65.143 71.066 23.667 3.961 43.411-13.808 59.207-53.296 23.692-82.9 80.862-124.35 171.735-124.35 110.479 7.885 169.698 63.156 177.671 165.8 0 94.759-64.313 110.202-99.248 138.774-44.267 36.218-73.217 72.952-108.655 135.216-29.779 52.314-34.91 164.227-34.91 164.227 0 47.373 21.655 71.066 65.143 71.066 39.413 0 61.194-23.693 65.155-71.066 0 0 5.219-125.594 55.925-181.129 57.472-62.942 194.749-107.071 198.698-268.922C804.365 108.561 697.772 15.789 500.382 0.006zM500.382 859.162c-45.524 0-82.409 36.91-82.409 82.41 0 45.523 36.885 82.422 82.409 82.422s82.422-36.898 82.422-82.422c0-45.5-36.898-82.41-82.422-82.41z")
                            .css({fill: "fbfa6a"});
        $('#questionText2_1').text("在怀疑APP窃取我们隐私的同时");
        $('#questionText2_2').text("我们自己保护好隐私了吗");
    }else if(top >= trigger_dis('#step_vis_0')){
        $('.end-tilte').css('opacity', 0);
        $("#question").css('opacity', 0);
        $("#question2").css('opacity', 0);
        $("#vis").css('opacity', 1);
        $("#user-introduction").css('opacity', 0);
        
        for(let i = 17; i--; i >= 0){
            if (top >= trigger_dis('#step_vis_' + i)) {
                action(i);
                return;
            } 
        }
    }
    else if(top >= trigger_dis('#step_user_intro')){
        $("#vis").css('opacity', 0);
        $("#user-introduction").css('opacity', 1);
        $("#question").css({opacity: 0, transition: "1s"});
    }else if (top >= (1.5 * wh)) {
        $("#user-introduction").css('opacity', 0);
        $("#question").css('opacity', 1)
            .css({background:"#64ae61", transition: "0.5s"}); 
        $('#questionMark').css({fill: "fbfa6a", transition: "0.5s"});
        $('#questionText').text("这些APP会收集多少隐私信息")
    }else{
        $("#question").css('opacity', 1)
            .css({background:"#fbfa6a", transition: "0.5s"});
        $('#questionMark').css({fill: "64ae61", transition: "0.5s"});
        $('#questionText').text("你手机上装了多少个APP")
    }
});

function trigger_dis(d) {
    return $(d).position().top - wh * 0.8;
}

function action(index){
    if(index === viewCurrentIndex) return;
    $(".vis-title").css({'opacity': 0});
    $("#vis-title"+index).css({'opacity': 1});
    if(index > viewCurrentIndex){
        actionList[index]();
    }else{
        backList[index]();
    }
    viewCurrentIndex = index;
}

let quesObject = ['好奇', '金钱', '潮流'];
function questionAns(value) {
    let question = value.split('_')[0];
    let selected = value.split('_')[1];
    $('.question_none_'+question).css('display', 'block');
    $('.container').animate({
        scrollTop: $('#block_behind_q'+question).position().top + 1
    }, 1000);
    setTimeout(function(){
        $('#block_q0').css('height', '5vh')
    }, 1100)
    $('#last_block_' + question).css('height', '20vh')
    if(selected == 'neg') {
        $('.vs_pos').css({'width': '80%', transition:'0.5s'});
        $('.vs_neg').css({'width': '20%', transition:'0.5s'});
    } else {
        $('.vs_neg').css({'width': '80%', transition:'0.5s'});
        $('.vs_pos').css({'width': '20%', transition:'0.5s'});
        $('#ans_result_'+question).text(' 这可能导致...')
    }
    $('#vs_text_neg_' + question).text(quesObject[question])    
    $('#animation' + question + " button").css("animation", "none");
}
function para_dis(d){
    return parseInt($(d).offset().top) - 20;
}

function underline_trigger(ele) {
    var window_height = $(window).height();
    if ( para_dis(ele) <= 2*window_height/3){
        $(ele).addClass('underline_active');
    } else {
        $(ele).removeClass('underline_active');
    }
}

function blur_trigger() {
    var window_height = $(window).height();
    if (para_dis('#chap3') <= 2*window_height/3 ) {
        $('#question2').addClass('blur_active');
        $('.questionText').css({'opacity': 0, transition:'0.5s'})
    }
    else if (para_dis('#last_block') <= 2*window_height/3 ) {
        $('#question2').removeClass('blur_active');
        $('.questionText').css({'opacity': 1, transition:'0.5s'})
    }
    else if ( para_dis('#question0_head') <= 2*window_height/3){
        $('#question2').addClass('blur_active');
        $('.questionText').css({'opacity': 0, transition:'0.5s'})
    } else {
        $('#question2').removeClass('blur_active');
        $('.questionText').css({'opacity': 1, transition:'0.5s'})
    }
}

function scroll_show(){
    $('.container').scroll(function(){
        underline_trigger('.ud-3');
        blur_trigger();
    });
}