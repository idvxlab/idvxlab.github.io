// var canvas = document.querySelector('#canvas-overlay');
// var canvasContext = canvas.getContext('2d');
// var lineCanvas = document.querySelector('#canvas-lines');
// var lineCanvasContext = lineCanvas.getContext('2d');
// var pointLifetime = 500;
// var points = [];

// //FILL CANVAS
// canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
// canvasContext.fillRect(0, 0, canvas.width, canvas.height);

// //INIT
// function init() {
//     document.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('resize', resizeCanvases);
//     resizeCanvases();
//     tick();
// }

// init();

// //RESIZE CANVAS
// function resizeCanvases() {
//     canvas.width = lineCanvas.width = window.innerWidth;
//     canvas.height = lineCanvas.height = window.innerHeight;
// }

// function onMouseMove(event) {
//     points.push({
//         time: Date.now(),
//         x: event.clientX,
//         y: event.clientY
//     });
// }

// function tick() {
//     // Remove old points
//     points = points.filter(function(point) {
//         var age = Date.now() - point.time;
//         return age < pointLifetime;
//     });

//     drawLineCanvas();
//     drawImageCanvas();
//     requestAnimationFrame(tick);
//     //setTimeout(() => {
//     //tick();
//     //}, 1000 / 60);
// }

// function drawLineCanvas() {
//     var minimumLineWidth = 70;
//     var maximumLineWidth = 140;
//     var lineWidthRange = maximumLineWidth - minimumLineWidth;
//     var maximumSpeed = 70;

//     lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
//     lineCanvasContext.lineCap = 'round';
//     lineCanvasContext.shadowBlur = 70;
//     lineCanvasContext.shadowColor = '#000';

//     for (var i = 1; i < points.length; i++) {
//         var point = points[i];
//         var previousPoint = points[i - 1];

//         // Change line width based on speed
//         var distance = getDistanceBetween(point, previousPoint);
//         var speed = Math.max(0, Math.min(maximumSpeed, distance));
//         var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
//         lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

//         // Fade points as they age
//         var age = Date.now() - point.time;
//         var opacity = (pointLifetime - age) / pointLifetime;
//         lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';

//         lineCanvasContext.beginPath();
//         lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
//         lineCanvasContext.lineTo(point.x, point.y);
//         lineCanvasContext.stroke();
//     }
// }

// function getDistanceBetween(a, b) {
//     return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
// }

// function drawImageCanvas() {
//     canvasContext.globalCompositeOperation = 'source-over';
//     canvasContext.save();
//     canvasContext.fillStyle = "rgb(0, 0, 0)";
//     //canvasContext.globalAlpha = 0.009;
//     canvasContext.globalAlpha = 0.05;
//     canvasContext.fillRect(0, 0, canvas.width, canvas.height);
//     canvasContext.restore();
//     canvasContext.globalCompositeOperation = 'destination-out';
//     canvasContext.drawImage(lineCanvas, 0, 0);

// }


// var spotlight = document.getElementById("spotlight");
// var spotlight_child = document.getElementById("spotlight-child");
// var bubbletext = document.getElementById("bubbletext");
// bubbletext.addEventListener("mousemove", moveSpotlight);
// bubbletext.addEventListener("touchmove", moveSpotlight);

// function moveSpotlight(e) {
//     var pos = void 0,
//         x = void 0,
//         y = void 0;
//     e.preventDefault();
//     x = e.clientX - 300;
//     y = e.clientY - 350;
//     spotlight.style.left = x + "px";
//     spotlight.style.top = y + "px";
//     spotlight_child.style.left = x + "px";
//     spotlight_child.style.top = y + "px";
// }

// const app = document.querySelector('#spotlight');
// const hammertime = new Hammer(app);

//sec1-气泡页面
const svgNode = document.querySelector('svg');
const fePointLightNode = svgNode.querySelector('fePointLight');
svgNode.addEventListener('mousemove', handleMove);
svgNode.addEventListener('touchend', handleMove);
function handleMove(event) {
  var touch=event.changedTouches[0];
  fePointLightNode.setAttribute('x', touch.clientX);
  fePointLightNode.setAttribute('y',  touch.clientY);
}

var loading_text=document.getElementsByClassName('loading-text');
TweenMax.fromTo(loading_text,1,{opacity:0},{opacity:1,repeat:-1,yoyo:true})

function showScene1(){
  var sec1_down=document.getElementsByClassName('sec1_down');
  // TweenMax.fromTo(sec1_down,2,{opacity:0},{opacity:1})}
  var scene1_light_shanshuo=document.getElementById("scene1_light_shanshuo");
  scene1_light_shanshuo.className="scene1_light_shanshuo fade-in-circle"
}
//sec2-场景引入
function showScene2(){
  var tooltip_1 = document.getElementById('sec2_tooltip');
  var sec2_text = document.getElementById('sec2_text');
  // var sec2_circlel = document.getElementById('sec2_circlel');
  // var sec2_circles = document.getElementById('sec2_circles');

  var sec2_clock=document.getElementById("sec2_clock");

  var scene2_pic1 = document.getElementById('scene2_pic1');
  var scene2_pic2 = document.getElementById('scene2_pic2');
  var scene2_qipao1 = document.getElementById('scene2_qipao1');
  var scene2_qipao2 = document.getElementById('scene2_qipao2');
  // sec2_ruchang.className="";
  sec2_text.className='sec2_text';
  tooltip_1.className='sec2_tooltip';
  // sec2_circlel.className='sec2_circlel';
  // sec2_circles.className='sec2_circles';

  scene2_pic1.className="scene2_pic1 fade-in-right"
  scene2_pic2.className="scene2_pic2 fade-in-left"


  TweenMax.fromTo([tooltip_1,sec2_text],2,{opacity:0},{opacity:1,delay:2.5});
  TweenMax.fromTo(sec2_text,1,{scaleX:0.8,scaleY:0.8},{scaleX:0.9,scaleY:0.9,delay:3,repeat:-1,yoyo:true});
  // TweenMax.fromTo(sec2_circlel,.5,{opacity:0},{opacity:1,delay:3,repeat:-1,yoyo:true})
  // TweenMax.fromTo(sec2_circles,.5,{opacity:0},{opacity:1,delay:3.5,repeat:-1,yoyo:true})
  
  setInterval(showbubblesec2,1500)
  //   TweenMax.staggerTo(sec2_text,.5,{scaleX:0.9,scaleY:0.9},{scaleX:0.7,scaleY:0.7,delay:3,repeat:-1,yoyo:true});
// }
// TweenMax.staggerTo(sec2_text,.5,{scaleX:"-=0.2",scaleY:"-=0.2"},3);
}
function showbubblesec2(){
  scene2_qipao1.className="scene2_qipao1 pulse1"
  scene2_qipao2.className="scene2_qipao2 pulse1"

  sec2_clock.className="sec2_clock fade-in"
}

function showScene3(){
  // var sec3= document.getElementById('sec3');
  // sec3.className='back_sec3';
  var sec3_people=document.getElementById("sec3_people");
  var sec3_mobile=document.getElementById("sec3_mobile");
  var sec3_bubble=document.getElementById("sec3_bubble");
  sec3_people.className="fade-in-left";
  sec3_mobile.className="fade-in";

  TweenMax.fromTo(sec3_bubble,1.5,{opacity:0,scaleX:1.05,scaleY:1.05},{opacity:1,scaleX:1,scaleY:1})
  TweenMax.fromTo(sec3_bubble,1,{scaleX:1,scaleY:1},{scaleX:0.98,scaleY:0.98,repeat:-1,yoyo:true })

  // TweenMax.to(sec3_mobile,1,{scaleX:1.2,scaleY:1.2,rotation:-40})
  // var sec2_text = document.getElementById('sec2_text');
  // var sec2_ruchang=document.getElementById('sec2_ruchang');
  // sec2_ruchang.className +='back_sec2';
  // TweenMax.fromTo([tooltip_1,sec2_text],2,{opacity:0},{opacity:1,delay:2.5});
  // TweenMax.fromTo(sec2_text,1,{scaleX:0.8,scaleY:0.8},{scaleX:0.9,scaleY:0.9,delay:3,repeat:-1,yoyo:true});
}

function showScene4(){
  var scene4_pic1=document.getElementById("scene4_pic1");
  var scene4_pic2=document.getElementById("scene4_pic2");
  var scene4_pic3=document.getElementById("scene4_pic3");
  var scene4_qipao1=document.getElementById("scene4_qipao1");
  var scene4_qipao2=document.getElementById("scene4_qipao2");
  var scene4_qipao3=document.getElementById("scene4_qipao3");
  var scene4_wenzi=document.getElementById("scene4_wenzi");
  
  scene4_wenzi.className="scene4_wenzi fade-in"

  scene4_pic1.className="scene4_pic1 fade-in-down";
  scene4_pic2.className="scene4_pic2 fade-in-left";
  scene4_pic3.className="scene4_pic3 fade-in-right";

  scene4_qipao1.className="scene4_qipao1 fade-in";
  scene4_qipao2.className="scene4_qipao2 fade-in";
  scene4_qipao3.className="scene4_qipao3 fade-in";
  TweenMax.fromTo([scene4_wenzi,scene4_qipao1,scene4_qipao2,scene4_qipao3],1,{scaleX:1.03,scaleY:1.03},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1.5})
  // TweenMax.fromTo([scene4_qipao1,scene4_qipao2,scene4_qipao3],1,{scaleX:1,scaleY:1},{scaleX:0.98,scaleY:0.98,repeat:-1,yoyo:true })


}

function showScene5(){
  var sec5_moon=document.getElementById("scene5_yueliang");
  var sec5_shubenhua=document.getElementById("scene5_laotou");
  var sec5_board=document.getElementById("scene5_mupai");
  sec5_moon.className='scene5_yueliang fade-in';
  sec5_shubenhua.className='scene5_laotou fade-in';
  sec5_board.className='scene5_mupai fade-in'
  // sec5_moon.className='animate__animated animate__fadeIn'
  // sec5_shubenhua.className='animate__animated animate__fadeIn'
  // sec5_board.className='animate__animated animate__fadeIn'
  TweenMax.fromTo(sec5_moon,0.6,{opacity:0},{opacity:1,repeat:-1,yoyo:true})
 
  TweenMax.fromTo(sec5_board,1,{opacity:0,scaleX:0},{opacity:1,scaleX:1,delay:0.5})
  
  // var sec3= document.getElementById('sec4');
  // sec3.className+='back_sec4'
  // var sec2_text = document.getElementById('sec2_text');
  // var sec2_ruchang=document.getElementById('sec2_ruchang');
  // sec2_ruchang.className +='back_sec2';
  // TweenMax.fromTo([tooltip_1,sec2_text],2,{opacity:0},{opacity:1,delay:2.5});
  // TweenMax.fromTo(sec2_text,1,{scaleX:0.8,scaleY:0.8},{scaleX:0.9,scaleY:0.9,delay:3,repeat:-1,yoyo:true});
}

//---------------------------------------------- 
function showScene6(){
  var scene6_dikuang=document.getElementById('scene6_dikuang');
  var scene6_emo=document.getElementById("scene6_emo");
  var scene6_tianshi=document.getElementById("scene6_tianshi");

  scene6_dikuang.className="scene6_dikuang bounce-in";
  scene6_emo.className="scene6_emo rotate-in-down-right"
  scene6_tianshi.className="scene6_tianshi rotate-in-down-left"

  setInterval(showbubblesec6,1500)
}
function showbubblesec6(){
  var scene6_qipao=document.getElementById("scene6_qipao");
  scene6_qipao.className="scene6_qipao swing"
}
//---------------------------------------------- 
function showScene7(){
  var scene7_pic0=document.getElementById("scene7_pic0");
  var scene7_pic1=document.getElementById("scene7_pic1");
  var scene7_pic2=document.getElementById("scene7_pic2");
  var scene7_pic3=document.getElementById("scene7_pic3");

  var scene7_emo=document.getElementById("scene7_emo");

  var scene7_qipao0=document.getElementById("scene7_qipao0");
  var scene7_qipao1=document.getElementById("scene7_qipao1");
  var scene7_qipao2=document.getElementById("scene7_qipao2");
  var scene7_qipao3=document.getElementById("scene7_qipao3");
  

  scene7_pic0.className="scene7_pic0 bounce-in-left";
  scene7_pic1.className="scene7_pic1 bounce-in-left";
  scene7_pic2.className="scene7_pic2 bounce-in-right";
  scene7_pic3.className="scene7_pic3 bounce-in-up";
  
  scene7_emo.className="scene7_emo rotate-in-down-right"

  TweenMax.fromTo([scene7_qipao0,scene7_qipao1,scene7_qipao2,scene7_qipao3],1,{scaleX:1.03,scaleY:1.03},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
  setInterval(showbubblesec7,1200)
}

function showbubblesec7(){
  scene7_qipao0.className="scene7_qipao0 fade-in";
  scene7_qipao1.className="scene7_qipao1 fade-in";
  scene7_qipao2.className="scene7_qipao2 fade-in";
  scene7_qipao3.className="scene7_qipao3 fade-in";
}
//---------------------------------------------- 
function showScene8(){
  var secc8=document.getElementById("secc8");

  var scene8_age=document.getElementById("scene8_age");
  var scene8_chengshi=document.getElementById("scene8_chengshi");
  var scene8_city=document.getElementById("scene8_city");
  var scene8_tianshi=document.getElementById("scene8_tianshi");
 
  scene8_age.className="scene8_age fade-in"
  scene8_chengshi.className="scene8_chengshi fade-in"
  scene8_city.className="scene8_city fade-in"
  scene8_tianshi.className="scene8_tianshi rotate-in-down-left"
  secc8.addEventListener("touchend",bubblefloat)
  
}

function bubblefloat(event){
  var touch1=event.changedTouches[0];
  var scene8_qipao1=document.getElementById("scene8_qipao1")
  var scene8_qipao2=document.getElementById("scene8_qipao2")
  var scene8_qipao3=document.getElementById("scene8_qipao3")
  if(touch1.clientY<340) scene8_qipao1.className="bounce-in"
  else if(touch1.clientX<180) scene8_qipao2.className="bounce-in"
  else scene8_qipao3.className="bounce-in"
  setInterval(bounceit,4000)
}

function bounceit(){
  if (scene8_qipao1.className==="bounce-in"&&scene8_qipao2.className==="bounce-in"&&scene8_qipao3.className==="bounce-in")
    {
      scene8_qipao1.className="pulse"
      scene8_qipao2.className="pulse"
      scene8_qipao3.className="pulse"
    }
}
//---------------------------------------------- 
function showScene9(){
  var scene9_pic1=document.getElementById("scene9_pic1")
  var scene9_pic2=document.getElementById("scene9_pic2")
 
  
  scene9_pic1.className="scene9_pic1 bounce-in-left"
  scene9_pic2.className="scene9_pic2 bounce-in-right"

  setInterval(xianshisec9bubble,2000)
}
function xianshisec9bubble(){
  var scene9_yuan1=document.getElementById("scene9_yuan1")
  var scene9_yuan2=document.getElementById("scene9_yuan2")
  scene9_yuan1.className="scene9_yuan1 fade-in"
  scene9_yuan2.className="scene9_yuan2 fade-in"
  TweenMax.fromTo(scene9_yuan1,1,{opacity:0,scaleX:0.5,scaleY:0.5},{opacity:1,scaleX:1,scaleY:1,repeat:-1,yoyo:true})
  
}
//---------------------------------------------- 
function showScene10(){
  var sec10_bg=document.getElementById("sec10_bg")
  sec10_bg.className='sec101';
  setInterval(changesec10pic,1800)
}

function changesec10pic(){
  var sec10_bg=document.getElementById("sec10_bg")
  sec10_bg.className='sec102';
}

//---------------------------------------------- 
function showScene11(){
  var sec11bg=document.getElementById("sec11_bg")
  sec11bg.className='sec11bg'
}


function showScene12(){
   var scene12_pic2=document.getElementById("scene12_pic2");
   var scene12_pic1=document.getElementById("scene12_pic1");
  
   scene12_pic2.className="scene12_pic2 fade-in-left";
   scene12_pic1.className="scene12_pic1 fade-in";

   var scene12_qipao=document.getElementById("scene12_qipao");
   scene12_qipao.className="scene12_qipao fade-in";
   TweenMax.fromTo(scene12_qipao,1.5,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:0.5})
}

//---------------------------------------------- 
function showScene13(){
  // var scene13_bg=document.getElementById("scene13_bg");
  // scene13_bg.className="scene13_bgg"
  var scene13_bianben=document.getElementById("scene13_bianben");
  var scene13_bianchou=document.getElementById("scene13_bianchou");
  var scene13_bianpang=document.getElementById("scene13_bianpang");
  var scene13_cusi=document.getElementById("scene13_cusi");
  scene13_bianben.className="scene13_bianben bounce-in-left"
  scene13_bianpang.className="scene13_bianpang bounce-in-left"
  scene13_bianchou.className="scene13_bianchou bounce-in-right"
  scene13_cusi.className="scene13_cusi bounce-in-right"
}

function showScene14(){
  var scene14_pic1=document.getElementById("scene14_pic1");
  var scene14_pic2=document.getElementById("scene14_pic2");
  var scene14_pic3=document.getElementById("scene14_pic3");
  var scene14_tianshi=document.getElementById("scene14_tianshi");
  var scene14_qipao1=document.getElementById("scene14_qipao1");
  var scene14_qipao2=document.getElementById("scene14_qipao2");
  var scene14_qipao3=document.getElementById("scene14_qipao3");
  var back_button1=document.getElementById("back_button1");

  scene14_pic1.className="scene14_pic1 bounce-in-left"
  scene14_pic2.className="scene14_pic2 bounce-in-right"
  scene14_pic3.className="scene14_pic3 bounce-in-left"
  scene14_tianshi.className="scene14_tianshi rotate-in-down-left"

  TweenMax.fromTo([scene14_qipao1,scene14_qipao2,scene14_qipao3],1,{scaleX:1.05,scaleY:1.05},{scaleX:0.99,scaleY:0.99,repeat:-1,yoyo:true,delay:0.5})

  setInterval(showbubblesec14,1200)
}
function showbubblesec14(){
  back_button1.className="back_button1 fade-in";
  scene14_qipao1.className="scene14_qipao1 fade-in";
  scene14_qipao2.className="scene14_qipao2 fade-in";
  scene14_qipao3.className="scene14_qipao3 fade-in";
 
}
//---------------------------------------------- 
function showScene15(){

  var scene15_ren=document.getElementById("scene15_ren");
  scene15_ren.className="scene15_ren bounce-in";

  var secc15=document.getElementById("secc15");
  var back_button2=document.getElementById("back_button2");

  secc15.addEventListener("touchend",bubblefloat1)
 
}
var secc15flag=0;
function bubblefloat1(event){
  var htmlWidth=document.body.offsetWidth;
  var htmlHeight=document.body.offsetHeight;
  var touch2=event.changedTouches[0];
 

  var scene15_zhangdou=document.getElementById("scene15_zhangdou");
 
  var scene15_heiyanquan=document.getElementById("scene15_heiyanquan");

  var scene15_zuijiaoqipao=document.getElementById("scene15_zuijiaoqipao");

  var scene15_zhouwen=document.getElementById("scene15_zhouwen");

  var scene15_zhangdou_qp=document.getElementById("scene15_zhangdou_qp");
  var scene15_heiyanquan_qp=document.getElementById("scene15_heiyanquan_qp");
  var scene15_zuijiaoqipao_qp=document.getElementById("scene15_zuijiaoqipao_qp");
  var scene15_zhouwen_qp=document.getElementById("scene15_zhouwen_qp");

  if(touch2.clientY<htmlHeight/2 && touch2.clientX<htmlWidth/2) {
    scene15_zhangdou.className="scene15_zhangdou fade-in-left";
    scene15_zhangdou_qp.className="scene15_zhangdou_qp fade-in";
    secc15flag++;
    TweenMax.fromTo(scene15_zhangdou_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
  // setInterval(zhangdou,1200)
  }
  else if(touch2.clientY<htmlHeight/2 && touch2.clientX>htmlWidth/2) {
    scene15_heiyanquan.className="scene15_heiyanquan fade-in-right";  
    scene15_heiyanquan_qp.className="scene15_heiyanquan_qp fade-in"
    secc15flag++;
    TweenMax.fromTo(scene15_heiyanquan_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
  // setInterval(heiyanquan,1200)
  }
  else if(touch2.clientY>htmlHeight/2 && touch2.clientX<htmlWidth/2) {
    secc15flag++;
    scene15_zuijiaoqipao.className="scene15_zuijiaoqipao fade-in-left";
    scene15_zuijiaoqipao_qp.className="scene15_zuijiaoqipao_qp fade-in";
    TweenMax.fromTo(scene15_zuijiaoqipao_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
   
    // setInterval(zuijiaoqipao,1200)
  }
  else {
    secc15flag++;
    scene15_zhouwen.className="scene15_zhouwen fade-in-right";
    scene15_zhouwen_qp.className="scene15_zhouwen_qp fade-in";
    TweenMax.fromTo(scene15_zhouwen_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
    // setInterval(zhouwen,1200)
  }
  if(secc15flag>3) back_button2.className="back_button2 fade-in";
}

// function zhangdou(){
//   var scene15_zhangdou_qp=document.getElementById("scene15_zhangdou_qp");
//   scene15_zhangdou_qp.className("scene15_zhangdou_qp fade-in")
//   TweenMax.fromTo(scene15_zhangdou_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
// }
// function heiyanquan(){
//   // var scene15_heiyanquan_qp=document.getElementById("scene15_heiyanquan_qp");
//   // scene15_heiyanquan_qp.className("scene15_heiyanquan_qp fade-in")
//   TweenMax.fromTo(scene15_heiyanquan_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
// }
// function zuijiaoqipao(){
//   var scene15_zuijiaoqipao_qp=document.getElementById("scene15_zuijiaoqipao_qp");
//   scene15_zuijiaoqipao_qp.className="scene15_zuijiaoqipao_qp";
//   TweenMax.fromTo(scene15_zuijiaoqipao_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
// }
// function zhouwen(){
//   var scene15_zhouwen_qp=document.getElementById("scene15_zhouwen_qp");
//   scene15_zhouwen_qp.className="scene15_zhouwen_qp";
//   TweenMax.fromTo(scene15_zhouwen_qp,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
// }
//---------------------------------------------- 
function showScene16(){
  var scene16_pic=document.getElementById("scene16_pic");
  scene16_pic.className="scene16_pic bounce-in";
  var back_button3=document.getElementById("back_button3");
  setInterval(showbubblesec16,1500)
  setInterval(showarrowsec16,1800);
}
function showbubblesec16(){
  var scene16_qipao=document.getElementById("scene16_qipao");
  scene16_qipao.className="scene16_qipao swing"
}
function showarrowsec16(){
  var scene16_danru=document.getElementById("scene16_danru");
  scene16_danru.className="scene16_danru fade-in";
  back_button3.className="back_button3 fade-in";
}
//----------------------------------------------
function showScene17(){
  var scene17_pic2=document.getElementById("scene17_pic2");
  var scene17_pic1=document.getElementById("scene17_pic1");
  var back_button4=document.getElementById("back_button4");

  scene17_pic1.className="scene17_pic1 bounce-in-left"
  scene17_pic2.className="scene17_pic2 fade-in-right"
  setInterval(showbubblesec17,1200)

}

function showbubblesec17(){
  var scene17_cusiw_enzi=document.getElementById("scene17_cusiw_enzi");
  var scene17_qipao=document.getElementById("scene17_qipao");
   back_button4.className="back_button4 fade-in";
  scene17_cusiw_enzi.className="scene17_cusiw_enzi fade-in"
  TweenMax.fromTo(scene17_cusiw_enzi,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})

  scene17_qipao.className="scene17_qipao fade-in"
  TweenMax.fromTo(scene17_qipao,1,{scaleX:1.05,scaleY:1.05},{scaleX:1,scaleY:1,repeat:-1,yoyo:true,delay:1})
}

//---------------------------------------------- 

function showScene18(){
  var sec18_bg=document.getElementById("sec18_bg")
  sec18_bg.className="secc18 fade-in1"
}
//--------------------------------
function showScene19(){
  var scene19_bg=document.getElementById("scene19_bg")
  
  scene19_bg.className="scene19_bg fade-in"
  var scene19_biaoti=document.getElementById("scene19_biaoti")
  scene19_biaoti.className="scene19_biaoti pulse"
  setInterval(showbubblesec19,800)
}

function showbubblesec19(){
  var scene19_tips1=document.getElementById("scene19_tips1")
  scene19_tips1.className="scene19_tips1 fade-in-right"
}
//----------------
function showScene20(){
  var scene20_bg=document.getElementById("scene20_bg")
  scene20_bg.className="scene19_bg fade-in"
  var scene20_biaoti=document.getElementById("scene20_biaoti")
  scene20_biaoti.className="scene19_biaoti pulse"

  var scene19_tips2_biaoti=document.getElementById("scene19_tips2_biaoti");
  scene19_tips2_biaoti.className="scene19_tips2_biaoti fade-in"
  var scene19_tips2_wenzi=document.getElementById("scene19_tips2_wenzi")
  scene19_tips2_wenzi.className="scene19_tips2_wenzi fade-in-right"

}
//----------------
function showScene21(){
  var scene21_bg=document.getElementById("scene21_bg")
  scene21_bg.className="scene19_bg "
  var scene21_biaoti=document.getElementById("scene21_biaoti")
  scene21_biaoti.className="scene19_biaoti pulse"
  var scene21_tips2_biaoti=document.getElementById("scene21_tips2_biaoti");
  scene21_tips2_biaoti.className="scene19_tips2_biaoti fade-in"

  var scene19_tips3_wenzi=document.getElementById("scene19_tips3_wenzi");
  scene19_tips3_wenzi.className="scene19_tips3_wenzi fade-in-left"
  
}
//----------------
function showScene22(){
  var scene22_bg=document.getElementById("scene22_bg")
  scene22_bg.className="scene19_bg "
  var scene22_biaoti=document.getElementById("scene22_biaoti")
  scene22_biaoti.className="scene19_biaoti pulse"

  var scene19_tips4=document.getElementById("scene19_tips4")
  scene19_tips4.className="scene19_tips4 fade-in-right"
  
  var moreaboutbeidong=document.getElementById("moreaboutbeidong")
  moreaboutbeidong.className="moreaboutbeidong fade-in1";

  var getit=document.getElementById("getit")
  getit.className="getit fade-in1"
}
//----------------
function showScene23(){
  var scene23_bg=document.getElementById("scene23_bg")
  scene23_bg.className="scene20_bg fade-in"
  var scene23_beidong=document.getElementById("scene23_beidong")
  scene23_beidong.className="scene20_beidong pulse"

  var scene23_pic1=document.getElementById("scene23_pic1")
  scene23_pic1.className="scene20_pic1 fade-in-left"
}
//----------------
function showScene24(){
  var scene24_bg=document.getElementById("scene24_bg")
  scene24_bg.className="scene20_bg "
  var scene24_beidong=document.getElementById("scene24_beidong")
  scene24_beidong.className="scene20_beidong pulse"

  var scene24_pic2=document.getElementById("scene24_pic2")
  scene24_pic2.className="scene20_pic2 fade-in-left"

  var scene24_pic2_xiaobiaoti=document.getElementById("scene24_pic2_xiaobiaoti")
  scene24_pic2_xiaobiaoti.className="scene20_pic2_xiaobiaoti fade-in"
  
}
//----------------
function showScene25(){
  var scene25_bg=document.getElementById("scene25_bg")
  scene25_bg.className="scene20_bg "
  var scene25_beidong=document.getElementById("scene25_beidong")
  scene25_beidong.className="scene20_beidong pulse"

  var scene25_pic3=document.getElementById("scene25_pic3")
  scene25_pic3.className="scene20_pic3 fade-in-left"

  var scene25_pic2_xiaobiaoti=document.getElementById("scene25_pic2_xiaobiaoti")
  scene25_pic2_xiaobiaoti.className="scene20_pic2_xiaobiaoti fade-in"
  
}
//----------------
function showScene26(){
  var scene26_bg=document.getElementById("scene26_bg")
  scene26_bg.className="scene20_bg "
  var scene26_beidong=document.getElementById("scene26_beidong")
  scene26_beidong.className="scene20_beidong pulse"

  var scene26_pic4=document.getElementById("scene26_pic4")
  scene26_pic4.className="scene20_pic4 fade-in-left"

  var moreaboutzhudong=document.getElementById("moreaboutzhudong")
  moreaboutzhudong.className="moreaboutzhudong fade-in1";

  var getit1=document.getElementById("getit1")
  getit1.className="getit fade-in1"
}
//----------------
function showScene27(){
  var finalla=document.getElementById("finalla");
  finalla.className="finalla fade-in"

  var finalbutton=document.getElementById("finalbutton");
  finalbutton.className="finalbutton fade-in"

}
//----------------
function showScene28(){
  var appendix1=document.getElementById("appendix1");
  appendix1.className="appendix1 fade-in"
}
function showScene29(){
  var appendix2=document.getElementById("appendix2");
  appendix2.className="appendix2 fade-in"
}
function showScene30(){
  var appendix3=document.getElementById("appendix3");
  appendix3.className="appendix3 fade-in"
}
function showScene31(){
  var appendix4=document.getElementById("appendix4");
  appendix4.className="appendix4 fade-in"
}
function showScene32(){
  var appendix5=document.getElementById("appendix5");
  appendix5.className="appendix5 fade-in"
}

