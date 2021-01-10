        +function(){
          loadImage('./image/knowledge1.png',imgLoaded1);
          loadImage('./image/knowledge2.png',imgLoaded2);
          loadImage('./image/knowledge3.png',imgLoaded3);
          loadImage('./image/knowledge4.png',imgLoaded4);
          loadImage('./image/knowledge5.png',imgLoaded5);
          loadImage('./image/knowledge6.png',imgLoaded6);
        }();
  
        function loadImage(url, callback) {
          var img = new Image();
          img.src = url;
          img.onload = function(){ //图片下载完毕时异步调用callback函数。
            callback.call(img); // 将callback函数this指针切换为img。
          };
        }
        
        function imgLoaded1(){
          var img = document.getElementById("knowledge1");
          img.setAttribute("src",this.src);
          if(img.style.opacity!=undefined){
            img.style.opacity=1;
          }
        }
        
        function imgLoaded2(){
            var img = document.getElementById("knowledge2");
        img.setAttribute("src",this.src);
         if(img.style.opacity!=undefined){
             img.style.opacity=1;
          }
        }
        function imgLoaded3(){
            var img = document.getElementById("knowledge3");
        img.setAttribute("src",this.src);
         if(img.style.opacity!=undefined){
             img.style.opacity=1;
          }
        }
        function imgLoaded4(){
            var img = document.getElementById("knowledge4");
        img.setAttribute("src",this.src);
         if(img.style.opacity!=undefined){
             img.style.opacity=1;
          }
        }
        function imgLoaded5(){
            var img = document.getElementById("knowledge5");
        img.setAttribute("src",this.src);
         if(img.style.opacity!=undefined){
             img.style.opacity=1;
          }
        }
        function imgLoaded6(){
            var img = document.getElementById("knowledge6");
        img.setAttribute("src",this.src);
         if(img.style.opacity!=undefined){
             img.style.opacity=1;
          }
        }


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