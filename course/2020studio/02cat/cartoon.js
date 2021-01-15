var count =0;

$(".content_area").mousemove(function(event) {

    var eye1 = $(".eye1");
    var x1 = (eye1.offset().left) + (eye1.width() / 2);
    var y1 = (eye1.offset().top) + (eye1.height() / 2);
    var rad1 = Math.atan2(event.pageX - x1, event.pageY - y1);
    var rot1 = (rad1 * (180 / Math.PI) * -1) + 180;
    eye1.css({
      '-webkit-transform': 'rotate(' + rot1 + 'deg)',
      '-moz-transform': 'rotate(' + rot1 + 'deg)',
      '-ms-transform': 'rotate(' + rot1 + 'deg)',
      'transform': 'rotate(' + rot1 + 'deg)'
    });


    var eye2 = $(".eye2");
    var x2 = (eye2.offset().left) + (eye2.width() / 2);
    var y2 = (eye2.offset().top) + (eye2.height() / 2);
    var rad2 = Math.atan2(event.pageX - x2, event.pageY - y2);
    var rot2 = (rad2 * (180 / Math.PI) * -1) + 180;
    eye2.css({
      '-webkit-transform': 'rotate(' + rot2 + 'deg)',
      '-moz-transform': 'rotate(' + rot2 + 'deg)',
      '-ms-transform': 'rotate(' + rot2 + 'deg)',
      'transform': 'rotate(' + rot2 + 'deg)'
    });
    var eye3 = $(".eye3");
    var x3 = (eye3.offset().left) + (eye3.width() / 2);
    var y3 = (eye3.offset().top) + (eye3.height() / 2);
    var rad3 = Math.atan2(event.pageX - x3, event.pageY - y3);
    var rot3 = (rad3 * (180 / Math.PI) * -1) + 180;
    eye3.css({
      '-webkit-transform': 'rotate(' + rot3 + 'deg)',
      '-moz-transform': 'rotate(' + rot3 + 'deg)',
      '-ms-transform': 'rotate(' + rot3 + 'deg)',
      'transform': 'rotate(' + rot3 + 'deg)'
    });
    var eye4 = $(".eye4");
    var x4 = (eye4.offset().left) + (eye4.width() / 2);
    var y4 = (eye4.offset().top) + (eye4.height() / 2);
    var rad4 = Math.atan2(event.pageX - x4, event.pageY - y4);
    var rot4 = (rad4 * (180 / Math.PI) * -1) + 180;
    eye4.css({
      '-webkit-transform': 'rotate(' + rot4 + 'deg)',
      '-moz-transform': 'rotate(' + rot4 + 'deg)',
      '-ms-transform': 'rotate(' + rot4 + 'deg)',
      'transform': 'rotate(' + rot4 + 'deg)'
    });
    var eye5 = $(".eye5");
    var x5 = (eye5.offset().left) + (eye5.width() / 2);
    var y5 = (eye5.offset().top) + (eye5.height() / 2);
    var rad5 = Math.atan2(event.pageX - x5, event.pageY - y5);
    var rot5 = (rad5 * (180 / Math.PI) * -1) + 180;
    eye5.css({
      '-webkit-transform': 'rotate(' + rot5 + 'deg)',
      '-moz-transform': 'rotate(' + rot5 + 'deg)',
      '-ms-transform': 'rotate(' + rot5 + 'deg)',
      'transform': 'rotate(' + rot5 + 'deg)'
    });
    var eye6 = $(".eye6");
    var x6 = (eye6.offset().left) + (eye6.width() / 2);
    var y6 = (eye6.offset().top) + (eye6.height() / 2);
    var rad6 = Math.atan2(event.pageX - x6, event.pageY - y6);
    var rot6 = (rad6 * (180 / Math.PI) * -1) + 180;
    eye6.css({
      '-webkit-transform': 'rotate(' + rot6 + 'deg)',
      '-moz-transform': 'rotate(' + rot6 + 'deg)',
      '-ms-transform': 'rotate(' + rot6 + 'deg)',
      'transform': 'rotate(' + rot6 + 'deg)'
    });
    var eye7 = $(".eye7");
    var x7 = (eye7.offset().left) + (eye7.width() / 2);
    var y7 = (eye7.offset().top) + (eye7.height() / 2);
    var rad7 = Math.atan2(event.pageX - x7, event.pageY - y7);
    var rot7 = (rad7 * (180 / Math.PI) * -1) + 180;
    eye7.css({
      '-webkit-transform': 'rotate(' + rot7 + 'deg)',
      '-moz-transform': 'rotate(' + rot7 + 'deg)',
      '-ms-transform': 'rotate(' + rot7 + 'deg)',
      'transform': 'rotate(' + rot7 + 'deg)'
    });
  });

  var action1 = document.getElementById("cat1");
  action1.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat1 = $("#cat1");
    cat1.css({
      'display' : 'none'
    })
    var text1 = $("#text1");
    text1.css({
      'display':'initial'
    })
    setTimeout(() => {
      var cartoon1_screen1 = $("#cartoon1_screen1");
      cartoon1_screen1.css({
      'display':'initial'
    })
    var cartoon1_screen2 = $("#cartoon1_screen2");
    cartoon1_screen2.css({
      'display':'initial'
    })
    }, 2000);
  }

  var action2 = document.getElementById("cat2");
  action2.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat2 = $("#cat2");
    cat2.css({
      'display' : 'none'
    })
    var text2 = $("#text2");
    text2.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon2_screen1 = $("#cartoon2_screen1");
    cartoon2_screen1.css({
      'display':'initial'
    })
    }, 2000);
  }

  var action3 = document.getElementById("cat3");
  action3.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat3 = $("#cat3");
    cat3.css({
      'display' : 'none'
    })
    var text3 = $("#text3");
    text3.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon3_screen1 = $("#cartoon3_screen1");
    cartoon3_screen1.css({
      'display':'initial'
    })
  }, 2000);
  }

  var action4 = document.getElementById("cat4");
  action4.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat4 = $("#cat4");
    cat4.css({
      'display' : 'none'
    })
    var text4 = $("#text4");
    text4.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon4_screen1 = $("#cartoon4_screen1");
    cartoon4_screen1.css({
      'display':'initial'
    })
  }, 2000);
  }

  var action5 = document.getElementById("cat5");
  action5.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat5 = $("#cat5");
    cat5.css({
      'display' : 'none'
    })
    var text5 = $("#text5");
    text5.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon5_screen1 = $("#cartoon5_screen1");
    cartoon5_screen1.css({
      'display':'initial'
    })
    var cartoon5_screen2 = $("#cartoon5_screen2");
    cartoon5_screen2.css({
      'display':'initial'
    })
  }, 2000);
  }

  var action6 = document.getElementById("cat6");
  action6.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat6 = $("#cat6");
    cat6.css({
      'display' : 'none'
    })
    var text6 = $("#text6");
    text6.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon6_screen1 = $("#cartoon6_screen1");
    cartoon6_screen1.css({
      'display':'initial'
    })
    var cartoon6_screen2 = $("#cartoon6_screen2");
    cartoon6_screen2.css({
      'display':'initial'
    })
  }, 2000);
  }
  var action7 = document.getElementById("cat7");
  action7.onclick= function(){
    count++;
    if(count==7){
      var button = $("#button");
      button.css({
        'display':'initial'
      })
    }
    var cat7 = $("#cat7");
    cat7.css({
      'display' : 'none'
    })
    var text7 = $("#text7");
    text7.css({
      'display':'initial'
    })
    setTimeout(() => {
    var cartoon7_screen1 = $("#cartoon7_screen1");
    cartoon7_screen1.css({
      'display':'initial'
    })
    var cartoon7_screen2 = $("#cartoon7_screen2");
    cartoon7_screen2.css({
      'display':'initial'
    })
  }, 2000);
  }
  
  !function(){
    var myHeight=window.innerHeight;
    var myWidth=window.innerWidth;
    var content_area = $(".content_area");
    if (myHeight>610) {
      content_area.css({
        'top':(myHeight-610)/2
      });
    }
    if(myWidth>1280){
      content_area.css({
        'left':(myWidth-1280)/2
      });
    }
  }();  

