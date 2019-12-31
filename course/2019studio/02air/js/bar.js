var colors2 = ['#8dd3c7','#Fdb462','#Bebada','#Fb8072','#80b1d3','#b3de69'];

// love_period_2(".figure");
// love_period_transition_2(".figure");

function love_period_3(DivName, Gass) {
    // var overSandard = bar_data.filter(function (d) {
    //     return d.standard == 1;
    // });

    // var gass = Gass;
    // console.log(gass);

    var love_period_group = d3.nest()
        .key(function (d) {
            return d.types;
        })
        .entries(bar_data)

    var love_period_group = love_period_group.filter(function (d) {
        return d.key == "1" || d.key == "2" || d.key == "3" || d.key == "4" || d.key == "5" || d.key == "6";
    });

    // console.log(love_period_group);

    var padding = {
        left: 5,
        top: 10,
        right: 5,
        bottom: 10,
    }
    var love_period_svg_width = $(window).width(),
        period_width = love_period_svg_width / 8,
        love_period_svg_margin = 0,
        period_values = 5,
        circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
        love_period_svg_height = $(window).height();


    var svg = d3.select(DivName)
        .select(".love_period_svg");
        // .attr("width", love_period_svg_width + love_period_svg_margin * 2)
        // .attr("height", love_period_svg_height)
        // .attr("class", "bar_svg")
        // // .style("background","black")
        // // .style("pointer-events","none")
        // .attr("transform", function (d, i) {
        //     return "translate(" + (28) + ", " + (-700) + ")"
        // });

    // if(UA.isMobile){
    // d3.select(".bar_svg")
    //     .style("pointer-events", "none")
    // }else{
    //     // d3.select(DivName)
    //     //     .append("div")
    //     //     .attr("class","tooltips_div")

    // }

    var cr = (circle_r / 2) * 0.9

    //比例尺
    var xScale = d3.scaleTime()
        .domain([0, cr * 2])
        .range([0, cr * 1.8])

    var yScale = d3.scaleLinear()
        .domain([0, cr * 2])
        .range([0, cr * 1.8])


    for (var i = 0; i < love_period_group.length; i++) {


        svg.append("g")
            .attr("class", "bar bar_" + i)
            .attr("margin-right","30px")
            // .attr("transform", "translate(" + (window.innerWidth / 2 - ( circle_r  * period_values -2 * (circle_r - xScale(cr) * 2)) /2 + ", " + (0) + ")"));
            .attr("transform", "translate(" + (i *(period_width+8)+love_period_svg_margin+40+ ", " + (-20) + ")"));


        d3.select(".bar_" + i)
            .append("g")
            .attr("class", "bar_circle_g bar_circle_g_" + i)
            .attr("transform", "translate(" + (0) + ", " + (0) + ")");


        //填充icon
        // if(UA.isMobile){
        //image 加图 svg (append特殊用法)
        // d3.select(".bar_" + i)
        //     .append("svg:image")
        //     .attr("class", "love_period_img love_period_img_" + i)
        //     .attr("xlink:href", "./assets/love_period_" + i + ".svg")
        //     .attr("width", period_width * 0.7 + "px")
        //     .attr("height", padding.bottom * 2 + "px")
        //     .attr("x", period_width * 0.15)
        //     .attr("y", love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) - padding.bottom * 4)
        //     .style("opacity", 0)

        //text 加文字
        // d3.select(".bar_" + i)
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
        //     .style("font-style", "italic")
        //     .text(love_period_group[i].values.length)
        //     .attr("text-anchor", "middle")
        //     .attr("dominant-baseline", "middle")
        //     .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r + padding.bottom)) + ")")
        //     .style("opacity", 0);

        //g circle集

        for (var j = 0; j < love_period_group[i].values.length; j++) {


            //每个bar建组
            d3.select(".bar_circle_g_" + i)
                .append("g")
                .attr("class", "bar_circle_" + i + " bar_circle_" + i + "_" + j)
                .attr("transform", "translate(" + (0) + ", " + (-circle_r) + ")")

            //画circle 手机版
            circle2(".bar_circle_g_" + i, (circle_r / 2) * 0.9, "bar_circle_" + i + "_" + j, colors2[(i)], colors[8 + (i)])
            // }



        }

    }


}


function love_period_transition_3(Gass) {

    // if (UA.isMobile) {
    var padding = {
        left: 5,
        top: 10,
        right: 5,
        bottom: 10,
    }
    var love_period_svg_width = $(window).width(),
        period_width = love_period_svg_width / 8,
        period_values = 5,
        circle_r = Math.floor(period_width - padding.left - padding.right) / period_values,
        love_period_svg_height = circle_r * Math.ceil(435 / period_values) + padding.top + padding.bottom + padding.bottom * 4.5;


     var love_period_group = d3.nest()
        .key(function (d) {
            return d.types;
        })
        .entries(bar_data)

    var love_period_group = love_period_group.filter(function (d) {
        return d.key == "1" || d.key == "2" || d.key == "3" || d.key == "4" || d.key == "5" || d.key == "6";
    });

    // console.log(love_period_group);

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

        // d3.select(".love_period_values_" + i)
        //     // .attr("transform", "translate(" + (period_width / 2) + ", " + (-20) + ")")
        //     // .style("opacity",0)
        //     .transition()
        //     .duration(800)
        //     .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values + 120 * period_values)
        //     .style("opacity", 0.5)
        //     // .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(love_period_group[i].values.length / period_values) * circle_r) - 10) + ")");   
        //     .attr("transform", "translate(" + (period_width / 2) + ", " + (love_period_svg_height - (Math.floor(love_period_group[i].values.length / period_values) * circle_r * 2) - 10) + ")" + ")");
        // d3.select(".love_period_img_" + i)
        //     .transition()
        //     .duration(800)
        //     .delay(200 * Math.floor(love_period_group[1].values.length % period_values) + Math.floor(love_period_group[1].values.length / period_values) * period_values+120*period_values)
        //     .style("opacity",1)        

        for (var j = 0; j < love_period_group[i].values.length; j++) {
            d3.select(".bar_circle_" + i + "_" + j)
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
                .attr("transform", "translate(" + (j % period_values * circle_r +  circle_r / 4) + ", " + (love_period_svg_height - padding.top - padding.bottom - (Math.floor(j / period_values) * circle_r)) + ")")
        }

    }
}

// circle(需要绑定的夫元素,半径,圆的class_g,填充颜色,描边颜色)
function circle2(DivName, cr, className, fill_color, stroke_color, PM25, PM10, O3, SO2, NO2, CO) {


    //比例尺
    var xScale = d3.scaleTime()
        .domain([0, cr * 2])
        .range([0, cr * 1.8])

    var yScale = d3.scaleLinear()
        .domain([0, cr * 2])
        .range([0, cr * 1.8])


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
        .attr("class", "circle_fill " + className + "_fill")
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