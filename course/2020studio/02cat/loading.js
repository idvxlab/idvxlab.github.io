$("#progressFill").animate({ 
    width: "100%"
  }, 7.5*1000);

$("#percentage").animate({ 
    left: "100%"
}, 7.5*1000);

var count = 0;
var timer = setInterval(function(){
    count++;
    var percentageValue = count + '%'
    $("#percentage_number").html(percentageValue);
    if(count >= 100) {
        clearInterval(timer);
        window.location.href="cartoon.html"
    }
    },70)

!function(){
    var myHeight=window.innerHeight;
    var myWidth=window.innerWidth;
    var content_area = $(".content_area");
    if (myHeight>610) {
      content_area.css({
        'top':(myHeight-610)/2,
      });
    }
    if(myWidth>1280){
      content_area.css({
        'left':(myWidth-1280)/2
      });
    }
  }();  