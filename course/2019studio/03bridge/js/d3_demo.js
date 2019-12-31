document.onreadystatechange = function () {
    console.log(document.readyState);
    console.log(document.body.clientHeight);
    console.log(document.getElementById("skrollr-body").clientHeight);
    document.body.clientHeight = document.getElementById("skrollr-body").clientHeight;
    console.log(document.body.clientHeight);
    if (document.readyState == "complete") {
        item = document.getElementById("loading").remove();
        // document.body.clientHeight = document.getElementById("skrollr-body").clientHeight;
        if (location.href.indexOf("#reloaded") == -1) {
            location.href = location.href + "#reloaded";
            location.reload();
        }
    }
}

drawPoints();

// 使用MutationObserver监听css变化以实现skrollr与d3的结合
var options = {
    'childList': true,
    'attributes': true,
    'attributeOldValue': true
}

var data;
var category = ["梁式桥", "桁架桥", "拱桥", "悬索桥", "斜拉桥", "隧道"];
// var category = [];

var color;
var current = {};
var observer = {};
var arc_position = [];
var arc_data = [];

var forward_func = {
    'bridge_building': bridgeBuilding,
    'bridge_category': bridgeCategory,
    'bridge_length': bridgeLength,
    'bridge_liang': bridgeLiang,
    'bridge_hengjia': bridgeHengjia,
    'bridge_gong': bridgeGong,
    'bridge_xuansuo': bridgeXuansuo,
    'bridge_xiela': bridgeXiela,
} // 向下滑动时的回调函数
var backward_func = {
    'bridge_building': deBridgeBuilding,
    'bridge_category': deBridgeCategory,
    'bridge_length': deBridgeLength,
    'bridge_liang': deBridgeLiang,
    'bridge_hengjia': deBridgeHengjia,
    'bridge_gong': deBridgeGong,
    'bridge_xuansuo': deBridgeXuansuo,
    'bridge_xiela': deBridgeXiela,
} // 向上滑动时的回调函数

var part = ['bridge_building', 'bridge_category', 'bridge_liang', 'bridge_hengjia', 'bridge_gong', 'bridge_xuansuo', 'bridge_xiela']

part.forEach(function (item) {
    // 如果current状态为false,opacity变为1,则开始出现的动画
    // 如果current状态为true,opacity变为0,则开始消失的动画
    current[item] = false;
    // 用回调函数初始化observer
    observer[item] = new MutationObserver(function (mutations, observer) {
        mutations.map(function (mutation) {
            if (current[item] == false && mutation.target.style.cssText == "opacity: 1;") {
                forward_func[item]();
                current[item] = true;
            } else if (current[item] == true && mutation.target.style.cssText == "opacity: 0;") {
                backward_func[item]();
                current[item] = false;
            }
        })
    });
    observer[item].observe(document.querySelector("#" + item), options);
});

function bridgeBuilding() {
    showPoints();
}

function deBridgeBuilding() {
    clearPoints();
}

function bridgeCategory() {
    d3.select("#year").remove();
    colorPoints();
    setTimeout(gatherCategory, 500);
}

function deBridgeCategory() {
    decolorPoints();
    setTimeout(degatherCategory, 500);
}

function bridgeXiela() {
    decolorPoints();
    colorOneCategory("斜拉桥");
}

function deBridgeXiela() {
    // decolorOneCategory();
    // decolorPoints();
    bridgeXuansuo();
}

function bridgeGong() {
    decolorPoints();
    colorOneCategory("拱桥");
}

function deBridgeGong() {
    // decolorOneCategory()
    // decolorPoints();
    bridgeHengjia();
}

function bridgeXuansuo() {
    decolorPoints()
    colorOneCategory("悬索桥");
}

function deBridgeXuansuo() {
    // decolorPoints();
    bridgeGong();
}

function bridgeLength() {
    lengthPoints();
}

function deBridgeLength() {
    delengthPoints();
}

function bridgeLiang() {
    decolorPoints();
    colorOneCategory("梁式桥");
}

function deBridgeLiang() {
    // decolorOneCategory();
    // decolorPoints();
    colorPoints();
}

function bridgeHengjia() {
    decolorPoints();
    colorOneCategory("桁架桥");
}

function deBridgeHengjia() {
    // colorPoints();
    bridgeLiang();
}

function clearPoints() {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .attr("cx", function (d) {
            return 1080 + 77.50559635997251 * parseFloat(d["latitude"]) - 2867.123671576876 - 64.6;
        })
        .attr("cy", function (d) {
            result = 59.30918915865678 * parseFloat(d["longitude"]) - 5342.349618255932;
            return result;
        });

    d3.select("#points")
        .selectAll("circle")
        .transition()
        .duration(500)
        .attr("r", 0)

    // d3.select("#arcs")
    //     .selectAll("path")
    //     .attr("opacity", 0);
}

function showPoints() {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .delay(function (d) {
            return (d["year"] - 1957) * 100;
        })
        .duration(500)
        .attr("r", 20);

    year_number = d3.select("#main_svg")
        .append("g")
        .append("text")
        .attr("id", "year")
        .attr("x", 460)
        .attr("y", 160)
        .attr("font-size", 96);

    for (var i = 1957; i <= 2019; i++) {
        year_number.transition()
            .delay((i - 1957) * 100)
            .duration(500)
            .text(i);
    }
}

function drawPoints() {
    var svg = d3.select("#main_svg").select("#test_points");
    d3.csv("bridge_info.csv", function (d) {
        color = d3.scaleOrdinal()
            .domain(category)
            .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']);

        return d;
    }).then(function (d) {
        data = d;

        // draw points
        svg.append("g")
            .attr("id", "points")
            .selectAll("circle")
            .data(d)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return 1080 + 77.50559635997251 * parseFloat(d["latitude"]) - 2867.123671576876 - 64.6;
            })
            .attr("cy", function (d) {
                return 59.30918915865678 * parseFloat(d["longitude"]) - 5342.349618255932;
            })
            .attr("r", 0)
            .style("fill", "gray");

        // draw legends
        var leg = d3.select("#main_svg").append("g").attr("id", "legends");
        var temp_g;
        category.forEach(function (d, i) {
            temp_g = leg.append("g");
            temp_g.append("rect")
                .attr("x", 280 + (i % 3) * 200)
                .attr("y", 960 + parseInt(i / 3) * 80)
                .attr("width", 30)
                .attr("height", 30)
                .attr("fill", color(d))

            temp_g.append("text")
                .text(d)
                .attr("x", 320 + (i % 3) * 200)
                .attr("y", 985 + parseInt(i / 3) * 80)
                .attr("font-size", 32);

            temp_g.attr("opacity", 0);
        });

        // arcs = d3.select("#main_svg")
        //     .append("g")
        //     .attr("id", "arcs")

        // draw arcs
        // data.forEach(function (item) {
        //     if (item["category"].indexOf("+") != -1) {
        //         arc_data.push(item);
        //         arc_data.push(item);

        //         categories = item["category"].split("+")
        //         arcGenerator = d3.arc();

        //         arc_first = arcGenerator({
        //             innerRadius: 0,
        //             outerRadius: 20,
        //             startAngle: 0,
        //             endAngle: Math.PI,
        //         })

        //         arc_second = arcGenerator({
        //             innerRadius: 0,
        //             outerRadius: 20,
        //             startAngle: Math.PI,
        //             endAngle: Math.PI * 2,
        //         })

        //         arcs.append("path")
        //             .attr("d", arc_first)
        //             .attr("transform", function () {
        //                 result = "translate(" +
        //                     String(1080 + 77.50559635997251 * parseFloat(item["latitude"]) - 2867.123671576876 - 64.6) +
        //                     "," + String(59.30918915865678 * parseFloat(item["longitude"]) - 5342.349618255932) + ")";

        //                 arc_position.push(result);
        //                 arc_position.push(result);
        //                 return result;
        //             })
        //             // .attr("fill", color(categories[0]))
        //             .attr("opacity", 0)
        //             .attr("fill", "gray");

        //         arcs.append("path")
        //             .attr("d", arc_second)
        //             .attr("transform", function () {
        //                 return "translate(" +
        //                     String(1080 + 77.50559635997251 * parseFloat(item["latitude"]) - 2867.123671576876 - 64.6) +
        //                     "," + String(59.30918915865678 * parseFloat(item["longitude"]) - 5342.349618255932) + ")"
        //             })
        //             // .attr("fill", color(categories[1]))
        //             .attr("opacity", 0)
        //             .attr("fill", "gray");
        //     }
        // });
    }).catch(function (error) {
        console.log(error);
    });
}

function colorPoints() {
    // 防止在该动画开始时上一个动画还未结束
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(100)
        .attr("r", 20);

    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .attr("r", function (d) {
            // if (d["category"].indexOf("+") != -1)
            //     return 0;
            // else
            //     return 20;
            return 20;
        })
        .transition()
        .duration(500)
        .style("fill", function (d) {
            if (d["category"].indexOf("+") == -1)
                return color(d["category"]);
            else
                return "gray";
        });

    // d3.select("#arcs")
    //     .selectAll("path")
    //     .data(arc_data)
    //     .attr("opacity", 1)
    //     .transition()
    //     .duration(500)
    //     .attr("fill", function (d, i) {
    //         true_type = d["category"].split("+")[i % 2];
    //         return color(true_type);
    //     });
}

function decolorPoints() {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .style("fill", "gray")
        .attr("r", 20);

    // d3.select("#arcs")
    //     .selectAll("path")
    //     .data(arc_data)
    //     .transition()
    //     .duration(500)
    //     .attr("fill", "gray");
}

function colorOneCategory(type) {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .style("fill", function (d) {
            if (d["category"] == type) {
                return color(d["category"].trim());
            } else {
                return "gray";
            }
        });
    // d3.select("#arcs")
    //     .selectAll("path")
    //     .data(arc_data)
    //     .transition()
    //     .duration(500)
    //     .attr("fill", function (d, i) {
    //         true_type = d["category"].split("+")[i % 2];
    //         if (true_type == type) {
    //             // return color(true_type);
    //             return "gray";
    //         } else {
    //             return "gray";
    //         }
    //     })
}

function decolorOneCategory() {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .style("fill", "gray");
}

function gatherCategory() {
    var index_x = {}
    var index_y = {}
    var start_position = {}
    category.forEach(function (type, i) {
        index_x[type] = 0;
        index_y[type] = 0;
        start_position[type] = 100 + 280 * i;
    });

    var current_index = 0;
    var position_x = []
    var position_y = []
    var true_index = []
    var arc_true_index = []

    data.forEach(function () {
        position_x.push(90 + (current_index % 20) * 50);
        position_y.push(300 + parseInt(current_index / 20) * 80);
        true_index.push(0);
        current_index = current_index + 1;
    })

    current_index = 0;

    category.forEach(function (item) {
        data.forEach(function (d, i) {
            if (d["category"] == item) {
                true_index[i] = current_index;
                current_index = current_index + 1;
            }
        })
    });

    data.forEach(function (d, i) {
        if (d["category"].indexOf("+") != -1) {
            true_index[i] = current_index;
            arc_true_index.push(current_index);
            arc_true_index.push(current_index);
            current_index = current_index + 1;
        }
    })

    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .attr("cx", function (d, i) {
            return position_x[true_index[i]];
        })
        .attr("cy", function (d, i) {
            return position_y[true_index[i]];
        });

    // // move arcs
    // d3.select("#arcs").selectAll("path")
    //     .data(arc_true_index)
    //     .transition()
    //     .duration(500)
    //     .attr("transform", function (d) {
    //         return "translate(" + String(position_x[d]) + "," + String(position_y[d]) + ")";
    //     });

    // legends
    d3.select("#legends").selectAll("g")
        .transition()
        .duration(500)
        .attr("opacity", 1);
}

function degatherCategory() {
    d3.select("#points")
        .selectAll("text")
        .remove();

    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .attr("cx", function (d) {
            return 1080 + 77.50559635997251 * parseFloat(d["latitude"]) - 2867.123671576876 - 64.6;
        })
        .attr("cy", function (d) {
            result = 59.30918915865678 * parseFloat(d["longitude"]) - 5342.349618255932;
            return result;
        });

    // d3.select("#arcs").selectAll("path")
    //     .data(arc_position)
    //     .transition()
    //     .duration(500)
    //     .attr("transform", function (d) {
    //         return d;
    //     });

    // legends
    d3.select("#legends").selectAll("g")
        .transition()
        .duration(500)
        .attr("opacity", 0);
}

function lengthPoints() {
    var lengthScale = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
            return parseFloat(d["length"]);
        }))
        .range([10, 100]);

    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .attr("r", function (d) {
            return lengthScale(parseFloat(d["length"]));
        });
}

function delengthPoints() {
    d3.select("#points")
        .selectAll("circle")
        .data(data)
        .transition()
        .duration(500)
        .attr("r", 20);
}