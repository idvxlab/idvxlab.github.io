var swiper = new Swiper('.swiper-container-v',{
    direction : 'vertical',
    followFinger : false,
    speed:800,
    mousewheel: false,
    pagination : {
        el:'.swiper-pagination-v',
        clickable: true,
    },
    on:{
        init:function(swiper){
            slide=this.slides.eq(0);
            slide.addClass('ani-slide');
        },
        transitionStart: function(){
            for(i=0;i<this.slides.length;i++){
                slide=this.slides.eq(i);
                slide.removeClass('ani-slide');
            }
        },
        transitionEnd: function(){
            slide=this.slides.eq(this.activeIndex);
            slide.addClass('ani-slide');  
        },
    },
    allowSlidePrev : false,
});

var swiperH = new Swiper('.swiper-container-h', {
    followFinger : false,
    speed:800,
    mousewheel: true,
    pagination : {
        el:'.swiper-pagination-h',
        clickable: true,
    },
    on:{
        init:function(swiper){
            slide=this.slides.eq(0);
            slide.addClass('ani-slide');
        },
        transitionStart: function(){
            for(i=0;i<this.slides.length;i++){
                slide=this.slides.eq(i);
                slide.removeClass('ani-slide');
            }
        },
        transitionEnd: function(){
            slide=this.slides.eq(this.activeIndex);
            slide.addClass('ani-slide');  
        },
    },
    effect : 'fade',
    allowSlidePrev : false,
});