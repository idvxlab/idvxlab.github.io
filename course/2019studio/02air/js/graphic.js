var colors = ["#ffebfe", "#FFD967", "#B5D2EB", "#3939C8", "#808080", "#FFD967", "#B5D2EB", "#FFF08E", "#3939C8", "#BA2FB3", "#E9C20F", "#808080", "#3939C8", "#EA497F"];

// love_period_2(".figure");
// love_period_transition_2(".figure");

function love_period_2(DivName) {

    var love_period_group = d3.nest()
        .key(function (d) {
            return d.standard
        })
        .entries(love_period_data)

    var love_period_group = love_period_group.filter(function (d) {
        return d.key == "1" || d.key == "0"
    });

    // var love_period_group = d3.nest()
    //     .key(function (d) {
    //         return d.love_period
    //     })
    //     .entries(love_period_data)

    // var love_period_group = love_period_group.filter(function (d) {
    //     return d.key == "前" || d.key == "中" || d.key == "后"
    // });

    // var love_period_group = d3.nest()
    //     .key(function (d) {
    //         return d.love_period
    //     })
    //     .entries(love_period_data)

    // var love_period_group = love_period_group.filter(function (d) {
    //     return d.key == "前" || d.key == "中" || d.key == "后"
    // });



    // if (UA.isMobile) {
    var padding = {
        left: 5,
        top: 10,
        right: 5,
        bottom: 10,
    }
    var love_period_svg_width = $(window).width(),
        period_width = love_period_svg_width / 3,
        love_period_svg_margin = 0,
        period_values = 15,
        circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
        love_period_svg_height = $(window).height();
    // love_period_svg_height = circle_r*Math.ceil(435/period_values)+padding.top+padding.bottom+padding.bottom*4.5;
    // } else {

    //     var padding = {
    //         left: 5,
    //         top: 10,
    //         right: 5,
    //         bottom: 70,
    //     }

    //     var love_period_svg_width = 600,
    //         love_period_svg_margin = 35,
    //         // love_period_svg_height = 400,
    //         period_width = love_period_svg_width / 3,
    //         period_values = 15,
    //         circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
    //         love_period_svg_height = circle_r*Math.ceil(435/period_values)+padding.top+padding.bottom+padding.bottom*1
    // }

    var svg = d3.select(DivName)
        .append("svg")
        .attr("width", love_period_svg_width + love_period_svg_margin * 2)
        .attr("height", love_period_svg_height)
        .attr("class", "love_period_svg")
        // .style("background","black")
        // .style("pointer-events","none")
        .attr("transform", function (d, i) {
            return "translate(" + (0) + ", " + (-160) + ")"
        });

    // if(UA.isMobile){
    d3.select(".love_period_svg")
        .style("pointer-events", "none")
    // }else{
    //     // d3.select(DivName)
    //     //     .append("div")
    //     //     .attr("class","tooltips_div")

    // }

    var cr = (circle_r / 2) * 0.9

    //比例尺
    var xScale = d3.scaleTime()
        .domain([0, cr * 2])
        .range([0, cr * 1.9])

    var yScale = d3.scaleLinear()
        .domain([0, cr * 2])
        .range([0, cr * 1.9])


    for (var i = 0; i < love_period_group.length; i++) {


        svg.append("g")
            .attr("class", "love_period love_period_" + i)
            // .attr("transform", "translate(" + (window.innerWidth / 2 - ( circle_r  * period_values -2 * (circle_r - xScale(cr) * 2)) /2 + ", " + (0) + ")"));
            .attr("transform", "translate(" + (window.innerWidth / 2 - 71.58 + ", " + (i == 0? 0:-60) + ")"));


        d3.select(".love_period_" + i)
            .append("g")
            .attr("class", "love_period_circle_g love_period_circle_g_" + i)
            .attr("transform", "translate(" + (-10) + ", " + (0) + ")");


        // //填充icon
        // // if(UA.isMobile){
        // //image 加图 svg (append特殊用法)
        // d3.select(".love_period_" + i)
        //     .append("svg:image")
        //     .attr("class", "love_period_img love_period_img_" + i)
        //     .attr("xlink:href", "./assets/love_period_" + i + ".svg")
        //     .attr("width", period_width * 0.7 + "px")
        //     .attr("height", padding.bottom * 2 + "px")
        //     .attr("x", period_width * 0.15)
        //     .attr("y", love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) - padding.bottom * 4)
        //     .style("opacity", 0)

        // //text 加文字
        // d3.select(".love_period_" + i)
        //     .append("text")
        //     .attr("class", "love_period_values love_period_values_" + i)
        //     .attr("fill", function (d) {
        //         if (i != 2) {
        //             return colors[5 + (i)]
        //         } else {
        //             return colors[8 + (i)]
        //         }
        //     })
        //     .style("font-size", "12px")
        //     // .attr("font-weight", "blod")
        //     // .attr("stroke", function(d){
        //     //     if(i!=2){
        //     //         return colors[5 + (i)]
        //     //     }else{
        //     //         return colors[8 + (i)]
        //     //     }
        //     // })
        //     // .attr("stroke-width", 1)
        //     .style("font-style", "italic")
        //     .text(love_period_group[i].values.length)
        //     // .attr("text-anchor", "start")
        //     .attr("text-anchor", "middle")
        //     .attr("dominant-baseline", "middle")
        //     // .attr("transform", "translate(" + (period_width / 2) + ", " + (-20) + ")")
        //     // // .style("opacity",0)
        //     // .transition()
        //     // .duration(800)
        //     // .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values)
        //     // // .style("opacity",1)
        //     // .attr("transform", "translate(" + (love_period_group[i].values.length % period_values * circle_r + circle_r*1.2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) ) + ")")
        //     .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r + padding.bottom)) + ")")
        //     .style("opacity", 0);
        // // }else{
        // //     d3.select(".love_period_" + i)
        // //         .append("svg:image")
        // //         .attr("class", "love_period_img love_period_img_" + i)
        // //         .attr("xlink:href", "./assets/love_period_"+i+".svg")
        // //         .attr("width", period_width*0.7+"px")
        // //         .attr("height",padding.bottom+"px")
        // //         .attr("x",period_width*0.15)
        // //         .attr("y",love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r)-padding.bottom*1.3)
        // //         .style("opacity",0)   

        // //     d3.select(".love_period_" + i)
        // //         .append("text")
        // //         .attr("class", "love_period_values love_period_values_" + i)
        // //         .attr("fill", function(d){
        // //             if(i!=2){
        // //                 return colors[5 + (i)]
        // //             }else{
        // //                 return colors[8 + (i)]
        // //             }
        // //         })
        // //         .style("font-size", "12px")
        // //         // .attr("font-weight", "blod")
        // //         // .attr("stroke", function(d){
        // //         //     if(i!=2){
        // //         //         return colors[5 + (i)]
        // //         //     }else{
        // //         //         return colors[8 + (i)]
        // //         //     }
        // //         // })
        // //         // .attr("stroke-width", 1)
        // //         .style("font-style","italic")
        // //         .text(love_period_group[i].values.length)
        // //         // .attr("text-anchor", "start")
        // //         .attr("text-anchor", "middle")
        // //         .attr("dominant-baseline", "middle")
        // //         // .attr("transform", "translate(" + (period_width / 2) + ", " + (-20) + ")")
        // //         // // .style("opacity",0)
        // //         // .transition()
        // //         // .duration(800)
        // //         // .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values)
        // //         // // .style("opacity",1)
        // //         // .attr("transform", "translate(" + (love_period_group[i].values.length % period_values * circle_r + circle_r*1.2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) ) + ")")
        // //         .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r + padding.bottom*0.3) ) + ")")
        // //         .style("opacity",0);
        // // }

        // // .attr("y",love_period_svg_height - padding.bottom*0.6 - padding.bottom*0.25);




        //g circle集

        for (var j = 0; j < love_period_group[i].values.length; j++) {


            //每个bar建组
            d3.select(".love_period_circle_g_" + i)
                .append("g")
                .attr("class", "love_period_circle_" + i + " love_period_circle_" + i + "_" + j)
                // .attr("transform", "translate(" + (j % period_values * circle_r) + ", " + (-circle_r) + ")")
                .attr("transform", "translate(" + (0) + ", " + (-circle_r) + ")")
            // // .attr("transform","translate(" + (period_width/2) + ", " + (-circle_r) + ")")
            // .transition()
            // .duration(800 + Math.random() * 100) //加速版
            // // .duration(800)//正常速度
            // // .easeBounce()
            // // .ease(d3.easeBounceOut)
            // // .delay(j*100)
            // .delay(200 * Math.floor(j % period_values) + Math.floor(j / period_values) * period_values)
            // .attr("transform", "translate(" + (j % period_values * circle_r + circle_r / 4) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")



            //画circle
            // if(!UA.isMobile){

            //     circle(".love_period_circle_g_" + i,(circle_r / 2) * 0.8,"love_period_circle_"+i +"_" + j,colors[5 + (i )],colors[8 + (i)])


            //     //选择circle pop效果
            //     d3.select(".love_period_circle_g_" + i).select(".love_period_circle_"+i +"_" + j)   
            //         .on("mouseover", function () {

            //             var period_id = Number($(this).parent().attr("class").split("_")[7]);
            //             var circle_id = Number($(this).attr("class").split("_")[7]);
            //             console.log(love_period_group[period_id].values[circle_id].titles)

            //             console.log(love_period_group[period_id].values[circle_id].titles)

            //             // console.log(love_period_group[period_id].values[circle_id].len_count)
            //             // console.log($(this).parent().attr("class").split("_")[7])
            //             // console.log($(this).attr("class").split("_")[5]) d d
            //             // console.log(period_id)

            //             //获取当前鼠标定位
            //             // var mouseX = d3.mouse(this)[0];
            //             // var mouseY = d3.mouse(this)[1];

            //             var love_period_tooltips_left = (circle_id % period_values * circle_r + circle_r / 4) + period_id*period_width + circle_r/2 - (circle_r/2)*0.1 + love_period_svg_margin;

            //             var love_period_tooltips_top = (love_period_svg_height - padding.top - padding.bottom - (Math.floor(circle_id / period_values) * circle_r)) + circle_r;

            //             // var love_period_tooltips_left = d3.event.pageX;
            //             // var love_period_tooltips_top = d3.event.pageY;

            //             d3.selectAll(".love_period_svg").select(".love_period_tooltips_g")
            //                 .remove()

            //             d3.selectAll(".love_period_svg").select(".love_period_tooltips_tri")
            //                 .remove();

            //             var love_period_tooltips_g_left = love_period_tooltips_left;

            //             console.log(love_period_tooltips_left)

            //             if(love_period_tooltips_left<90){
            //                 var love_period_tooltips_g_left = 95
            //             }

            //             if(love_period_tooltips_left>575){
            //                 var love_period_tooltips_g_left = 575
            //             }

            //                 //tooltips
            //             var love_period_tooltips = d3.selectAll(".love_period_svg").append("g")
            //                 .attr("class", "love_period_tooltips_g")
            //                 .style("opacity", 1)
            //                 .attr("transform", "translate(" + (love_period_tooltips_g_left-period_width*0.9/2)  + ", " + (4.5+love_period_tooltips_top) + ")")
            //                 .attr("stroke-width", 1)
            //                 .style("stroke",function(){
            //                     if(period_id !=2){
            //                         return colors[period_id +5]
            //                     }else{
            //                         return colors[period_id +8]
            //                     }
            //                 })
            //                 .style("fill",function(){
            //                     if(period_id !=2){
            //                         return colors[period_id +5]
            //                     }else{
            //                         return colors[period_id +8]
            //                     }
            //                 })

            //             var love_period_tooltips_tri = d3.selectAll(".love_period_svg").append("g")
            //                 .attr("class", "love_period_tooltips_tri")
            //                 .style("opacity", 1)
            //                 .attr("transform", "translate(" + (love_period_tooltips_left-2.5) + ", " + (love_period_tooltips_top) + ")")
            //                 .style("stroke",function(){
            //                     if(period_id !=2){
            //                         return colors[period_id +5]
            //                     }else{
            //                         return colors[period_id +8]
            //                     }
            //                 })



            //             // d3.selectAll(".love_period_svg")
            //             //     .select(".tooltips_g") 
            //             //     .select("text")
            //             //     .text([])

            //             var t_text;
            //             var love_period_tooltips_text_num = Math.floor((period_width*0.9 -10)/14)

            //             var love_period_tooltips_title_data = [];

            //             var love_period_tooltips_text_col = 0;

            //             // console.log(tooltips_text_num)

            //             for(var t = 0; t<Math.ceil(love_period_group[period_id].values[circle_id].titles.length/love_period_tooltips_text_num);t++){
            //                 t_text = love_period_group[period_id].values[circle_id].titles.substr(t*love_period_tooltips_text_num,love_period_tooltips_text_num)
            //                 love_period_tooltips_title_data.push(t_text)
            //                 love_period_tooltips_text_col ++;
            //             }

            //             love_period_tooltips.append("rect")
            //                 .attr("width", period_width*0.9)
            //                 .attr("height", love_period_tooltips_text_col*14 + 14)
            //                 .attr("y", 0)
            //                 .attr("x", 0)
            //                 .attr("fill", "#fff")

            //             love_period_tooltips_tri.append("path")
            //                 .attr("d", "M5 0 L0 5 L10 5  Z")
            //                 .attr("transform", "translate(" + (0) + ", " + 0 + ")")
            //                 .attr("fill", "#fff")
            //                 // .attr("stroke", colors[2])
            //                 .attr("stroke-width", 1)
            //                 .attr("stroke-dasharray", "20,10")
            //                 .attr("stroke-dashoffset", "13")

            //             love_period_tooltips.append("text")
            //                 .text([])
            //                 .attr("class", "love_period_tooltips_title")
            //                 .attr("y", 0)
            //                 .attr("x", 0)
            //                 .attr("font-size", "14px")
            //                 .attr("stroke", "none");

            //             love_period_tooltips.select(".love_period_tooltips_title").selectAll("tspan")
            //                 .data(love_period_tooltips_title_data)
            //                 .enter()
            //                 .append("tspan")
            //                 .attr("x",5)
            //                 .attr("dy","https://h5.thepaper.cn/html/zt/2019/08/love/assets/1.1em")
            //                 .text(function(d){return d})



            //         })
            //         .on("mouseout",function(){

            //             d3.selectAll(".love_period_svg").select(".love_period_tooltips_g")
            //                 .remove()

            //             d3.selectAll(".love_period_svg").select(".love_period_tooltips_tri")
            //                 .remove();
            //         });

            //     //样式待定
            // }else{
            //画circle 手机版
            var PM25 = love_period_group[i].values[j].PM25;
            var PM10 = love_period_group[i].values[j].PM10;
            var O3 = love_period_group[i].values[j].O3;
            var SO2 = love_period_group[i].values[j].SO2;
            var NO2 = love_period_group[i].values[j].NO2;
            var CO = love_period_group[i].values[j].CO;

            circle(".love_period_circle_g_" + i, (circle_r / 2) * 0.9, "love_period_circle_" + i + "_" + j, colors[5 + (i)], colors[8 + (i)],PM25, PM10, O3, SO2,NO2,CO)
            // }



        }

    }


}


function love_period_transition_2() {

    // var padding = {
    //     left: 10,
    //     top: 10,
    //     right: 10,
    //     bottom: 50,
    // }

    // if (UA.isMobile) {
    //     var love_period_svg_width = $(window).width(),
    //         period_width = love_period_svg_width / 3,
    //         period_values = 10,
    //         circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
    //         love_period_svg_height = circle_r*Math.ceil(435/period_values)+50+padding.top+padding.bottom;
    // } else {
    //     var love_period_svg_width = 750,
    //         love_period_svg_height = 400,
    //         period_width = love_period_svg_width / 3,
    //         period_values = 20,
    //         circle_r = Math.floor(period_width - padding.left - padding.right) / period_values;
    // }




    // if (UA.isMobile) {
    var padding = {
        left: 5,
        top: 10,
        right: 5,
        bottom: 10,
    }
    var love_period_svg_width = $(window).width(),
        period_width = love_period_svg_width / 2.3,
        period_values = 15,
        circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
        love_period_svg_height = circle_r * Math.ceil(435 / period_values) + padding.top + padding.bottom + padding.bottom * 4.5;
    // } else {

    //     var padding = {
    //         left: 5,
    //         top: 10,
    //         right: 5,
    //         bottom: 70,
    //     }
    //     var love_period_svg_width = 600,
    //         // love_period_svg_height = 400,
    //         period_width = love_period_svg_width / 3,
    //         period_values = 15,
    //         circle_r = Math.floor(period_width - padding.left - padding.right) / period_values
    //         love_period_svg_height = circle_r*Math.ceil(435/period_values)+padding.top+padding.bottom+padding.bottom*1;
    // }

    var love_period_group = d3.nest()
        .key(function (d) {
            return d.standard
        })
        .entries(love_period_data)

    var love_period_group = love_period_group.filter(function (d) {
        return d.key == "1" || d.key == "0"
    });

    // var love_period_group = d3.nest()
    //     .key(function (d) {
    //         console.log(d);
    //         return d.love_period
    //     })
    //     .entries(love_period_data)

    // var love_period_group = love_period_group.filter(function (d) {
    //     return d.key == "前" || d.key == "中" || d.key == "后"
    // });
    for (var i = 0; i < love_period_group.length; i++) {
        var min = 500;
        var max = 0;
        var values = love_period_group[i].values;
        values.forEach(d => {
            if (d.no > max) max = d.no;
            if (d.no < min) min = d.no;
        });

        love_period_group[i].min = min;
        love_period_group[i].max = max;
        love_period_group[i].num = max - min + 1;

        d3.select(".love_period_values_" + i)
            // .attr("transform", "translate(" + (period_width / 2) + ", " + (-20) + ")")
            // .style("opacity",0)
            .transition()
            .duration(800)
            .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values + 120 * period_values)
            .style("opacity", 0.5)
            // .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) - 10) + ")");   
            .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - (Math.floor(love_period_group[i].values.length / period_values) * circle_r * 2) - 10) + ")" + ")");
        // d3.select(".love_period_img_" + i)
        //     .transition()
        //     .duration(800)
        //     .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values+120*period_values)
        //     .style("opacity",1)        

        for (var j = 0; j < love_period_group[i].values.length; j++) {
            d3.select(".love_period_circle_" + i + "_" + j)
                .attr("transform", "translate(" + (j % period_values * circle_r) + ", " + (-circle_r) + ")")
                // .attr("transform","translate(" + (period_width/2) + ", " + (-circle_r) + ")")
                .transition()
                .duration(800 + Math.random() * 10) //加速版
                // .duration(800)//正常速度
                // .easeBounce()
                // .ease(d3.easeBounceOut)
                // .delay(j*100)
                .delay(200 * Math.floor(j % period_values) + Math.floor(j / period_values) * period_values)
                // .attr("transform", "translate(" + (j % period_values * circle_r) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")
                .attr("transform", "translate(" + (j % period_values * circle_r) + ", " + (i * 250 + love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")
        }

    }
    // for (var i = 0; i < love_period_group.length; i++) {

    //     // d3.select(".love_period_values_" + i)
    //     //     // .attr("transform", "translate(" + (period_width / 2) + ", " + (-20) + ")")
    //     //     // .style("opacity",0)
    //     //     .transition()
    //     //     .duration(800)
    //     //     .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values+120*period_values)
    //     //     .style("opacity",0.5)
    //     //     // .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) - 10) + ")");   

    //     // d3.select(".love_period_img_" + i)
    //     //     .transition()
    //     //     .duration(800)
    //     //     .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values+120*period_values)
    //     //     .style("opacity",1)     
    //     console.log(window.innerWidth);
    //     console.log(window.innerHeight); 
    //     console.log((love_period_group[i]));

    //     for (var j = 0; j < love_period_group[i].values.length; j++) {
    //         d3.select(".love_period_circle_"+i +"_" + j)
    //         .attr("transform", "translate(" + (j % period_values * circle_r + circle_r / 4) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")
    //             // .attr("transform","translate(" + (period_width/2) + ", " + (-circle_r) + ")")
    //             .transition()
    //             .duration(800 + Math.random() * 10) //加速版
    //             // .duration(800)//正常速度
    //             // .easeBounce()
    //             // .ease(d3.easeBounceOut)
    //             // .delay(j*100)
    //             .delay(200 * Math.floor(j % period_values) + Math.floor(j / period_values) * period_values)
    //             // .attr("transform", "translate(" + (j % period_values * circle_r) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")
    //             // .attr("transform", "translate(" + (i == 0 ? 0 : window.innerWidth) + ", "  + (j* (window.innerHeight / love_period_group[i].num)) + ")")
    //             .attr("transform", "translate(" + (Math.random() * window.innerWidth) + ", "  + (Math.random() * window.innerHeight) + ")")
    //             .style("opacity",0);
    //     }

    // }
}

// circle(需要绑定的夫元素,半径,圆的class_g,填充颜色,描边颜色)
function circle(DivName, cr, className, fill_color, stroke_color, PM25, PM10, O3, SO2, NO2, CO) {
    // console.log('circle');
    // console.log('PM25:'+PM25);


    //比例尺
    var xScale = d3.scaleTime()
        .domain([0, cr * 2])
        .range([0, cr * 1.9])

    var yScale = d3.scaleLinear()
        .domain([0, cr * 2])
        .range([0, cr * 1.9])


    // var r = 15;
    var cx = cr;
    var cy = cr;

    //计算90度的位置
    // Math.sin()
    // 解决思路：根据三角形的正玄、余弦来得值；

    // 假设一个圆的圆心坐标是(a,b)，半径为r，

    // 则圆上每个点的X坐标=a + Math.sin(2*Math.PI / 360) * r ；Y坐标=b + Math.cos(2*Math.PI / 360) * r ；
    // var circle_pie = 4;
    var circle_data = [];
    // for(var i = 0;i<circle_pie;i++){
    //     var angle = (2*Math.PI / 360) * (360/circle_pie)*i;
    //     var new_x = cx + Math.sin(angle) * cr;
    //     var new_y = cy + Math.cos(angle) * cr ;
    //     circle_data.push([new_x,new_y])
    //     // console.log(i,new_x,new_y);
    // }
    var new_x = cx - cr;
    var new_y = cy - cr;
    circle_data.push([new_x, new_y])

    new_x = cx + cr;
    new_y = cy - cr;
    circle_data.push([new_x, new_y])

    new_x = cx + cr;
    new_y = cy + cr;
    circle_data.push([new_x, new_y])

    new_x = cx - cr;
    new_y = cy + cr;
    circle_data.push([new_x, new_y])


    function drawlineRadial(ctx) {
        var data = drawlineRadial.data;
        ctx.translate(250, 250)
        var lineRadial = d3.lineRadial();
        lineRadial.context(ctx);
        lineRadial.angle(function (d) {
            return d[0]
        });
        lineRadial.radius(function (d) {
            return d[1]
        })
        ctx.beginPath();
        lineRadial(data);
        ctx.closePath();
        ctx.stroke();
    }
    // drawlineRadial.data=d3.zip(d3.range(0,Math.PI*2,Math.PI*2/36),d3.range(0,100,100/36).map(function(){
    //      return 50;
    // }));
    drawlineRadial.data = d3.zip(d3.ticks(0, Math.PI * 2, 3), d3.ticks(0, Math.PI * 2, 3).map(function () {
        return 50;
    }));
    //   drawlineRadial.data=[[0,100],[Math.PI/6,100],[Math.PI/5,100],[Math.PI/4,100],[Math.PI/3,100],[Math.PI/2,100],[Math.PI,100]];
    drawlineRadial.svg = function (svg) {
        var data = drawlineRadial.data;
        var lineRadial = d3.lineRadial();
        lineRadial.angle(function (d) {
            return d[0]
        });
        lineRadial.radius(function (d) {
            return d[1]
        })
        svg.append('g').attr('transform', 'translate(250,250)').append('path').attr('fill', 'none').attr('stroke', '#000').attr('d', lineRadial(data))
    }
    // 顺序从x1 y1 再倒序从x y
    function drawArea(ctx) {
        var area = d3.area().context(ctx);
        var x = area.x(function (v) {
            return v[2];
        })
        var y = area.y(function (v) {
            return v[3];
        });
        var x2 = area.x1(function (v) {
            return v[0];
        })
        var y2 = area.y1(function (v) {
            return v[1];
        });
        var data = [
            [100, 100, 200, 150],
            [200, 100, 100, 150]
        ];
        ctx.beginPath();
        ctx.fillStyle = 'red';
        // 当前存
        area(data);
        ctx.stroke();
        // ctx.fill();
    }

    var linePath = d3.line()
        .x(function (d) {
            // console.log("d0:"+d[0]);
            return xScale(d[0]);
        })
        .y(function (d) {
            // console.log("d1:"+d[1]);
            return xScale(d[1]);
        });
    // .curve(d3.curveLinear)


    //  var linePath = d3.line()
    //     .x(function(d){
    //         return xScale(d[0])+Math.random()*(Math.random>0.5?1:-1)*(cr/circle_pie)*2;
    //     })
    //     .y(function(d){
    //         return yScale(d[1])+Math.random()*(Math.random>0.5?1:-1)*(cr/circle_pie)*2;
    //     })
    //     // .curve(d3.curveBasisClosed) 
    //     .curve(d3.curveLinear)

    // d3.selectAll(DivName)
    //     .append("g") 
    //     .attr("class",className+" "+className+"_"+circle_id)

    // className += ' PM25_' + PM25;

    // console.log('className:'+className)
    
    d3.select(DivName).select("." + className)
        .append("path")
        .attr("transform", function (d, i) {
            return "translate(" + (0) + "," + (0) + ")";
        })
        .attr("d", linePath(circle_data))
        .attr("class", "circle_fill " + className + "_fill" + ' PM25_' + PM25  + ' PM10_' + PM10 + ' O3_' + O3 + ' SO2_' + SO2+ ' NO2_' + NO2+ ' CO_' + CO)
        .attr("fill", fill_color);

    // d3.select(DivName).select("."+className)
    //     .append("path")
    //     .attr("transform", "translate(" + (-1) + "," + (-1) + ")")
    //     .attr("d",linePath(circle_data))
    //     .attr("class","circle_stroke "+className+"_stroke")
    //     .style("stroke",stroke_color)
    //     .style("stroke-width",2)
    //     .style("fill","none")
    //     .style("stroke-width", 0.5)




}