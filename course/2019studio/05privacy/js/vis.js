const people = [{
    "name":"csj",
    "png": "images/zibaoziqi_r.png"
},{
    "name":"jkl",
    "png":"images/shenbuyouji_r.png"
},{
    "name":"ponda",
    "png":"images/jinxiaoshengwei_r.png"
}];
const period = ["9","12","15","18","21","24"];
const ticks = ["0","9","12","15","18","21","24"];
const person2app = {
    "csj":["微信", "微博","支付宝", "高德地图", "QQ", "手机淘宝", 
        "知乎", "快应用中心","虾米音乐", "网易云音乐"],
    "jkl":[ "微信", "支付宝", "第一弹泰日韩剧","微博","西瓜视频","知乎","高德地图",
             "哈啰出行", "QQ", "网易云音乐",],
    "ponda":["微信", "QQ", "手机淘宝",
        "高德地图","支付宝", "小红书","交通银行","全能扫描王","微博国际版","大麦" ],
};

const lengthPerTime = 3.6;
const lineHeight = 200,
    blockWidth = 120,
    lineHeight_app = lineHeight / 2;

const overview2detailScale = 1.4;

let loadData = function(){
    
    d3.csv("data/app.csv", function(data){console.log("begin")
        data.forEach(d => {
            d.authority = parseInt(d.authority);
            d.times = parseInt(d.times);
        });
        dataSet = data;

        people.forEach(p => {
            let origindata = data.filter(d => d.name === p.name);

            p["data"] = period.map(time => {
                return origindata.filter(d => d.time === time);
            });
            
            p["periodData"] = p["data"].map((d) => {
                let sizeTree = {
                    "name": "root",
                    "children": []
                }

                Authority.forEach((d) => {
                    sizeTree.children.push({
                        "name": d.name,
                        "children": []
                    });
                });

                let count = 0;
                d.forEach(l => {
                    count += l.times;
                    sizeTree.children[l.authority].children.push(l);
                });

                let treemap = d3.treemap()          
                    .size([Math.sqrt(count) * lengthPerTime, Math.sqrt(count) * lengthPerTime])
                    .padding(1);
                
                let root = d3.hierarchy(sizeTree)
                let nodes = treemap(root
                        .sum(function(d) { return d.times; })) 
                        .descendants();
                nodes.shift();
                return nodes;
            });

            let apps = person2app[p.name];
            p["appData"] = p["data"].map(d => {
                return apps.map(appName => {
                    let appnodes = d.filter(d0 => d0.app === appName);
                    let sizeTree = {
                        "name": "root",
                        "children": []
                    }

                    let count = 0;
                    appnodes.forEach((appnode) => {
                        count += appnode.times;
                        sizeTree.children.push(appnode);
                    });
                    
                    let treemap = d3.treemap()
                        .size([Math.sqrt(count) * lengthPerTime * overview2detailScale, Math.sqrt(count) * lengthPerTime * overview2detailScale])
                        .padding(1);

                    let root = d3.hierarchy(sizeTree)
                    let nodes = treemap(root
                            .sum(function(d) { return d.times; }))
                            .leaves();

                    return nodes;
                });
            });    
        });
        
    });
}

let overview = function(){
    if(!dataSet) return;
    
    authority_g.attr("opacity", 0);
    if(vis_g && svg.select('.vis_g').nodes().length){
        vis_g.attr("opacity", 1);
        return;
    }
    
    vis_g = svg.append("g")
        .attr("transform", `translate(40,240)`)
        .attr("class", "vis_g");

    
    let ticks_g = vis_g.append("g")
        .attr("transform", `translate(0,0)`)
        .selectAll("g")
        .data(ticks)
        .enter().append("g")
        .attr("class", "tick");

    ticks_g.append('text')
        .attr("x", (d, i) => i * blockWidth)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", 26)
        .text(d => d);

    ticks_g.append('circle')
        .attr("cx", (d, i) => i * blockWidth)
        .attr("cy", 40)
        .attr("r", 5);

    
    people_groups = vis_g.selectAll("people_groups")
        .data(people)
        .enter().append("g")
        .attr("class", "people_groups")
        .attr("transform", (d , i) => `translate(0 ,`+ (i * lineHeight + 40) +`)`);
    
    let back = people_groups.append("g").attr("class", "back");

    back.append("line")
        .attr("class", "decoration")
        .attr("x1", 0)
        .attr("x2", blockWidth * 6)
        .attr("y1", lineHeight / 2)
        .attr("y2", lineHeight / 2)
        .attr("stroke", "#333")
        .attr("stroke-width", '1');

    back.selectAll("circle")
        .data(ticks)
        .enter().append("circle")
        .attr("class", "decoration")
        .attr("cx", (d, i) => i * blockWidth)
        .attr("cy", lineHeight / 2)
        .attr("r", 3);

    back.append("svg:image")
        .attr("class", "decoration")
        .attr("xlink:href", d => d.png)
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", -25)
        .attr("y", lineHeight / 2 - 25);

    let blocks = people_groups.selectAll(".block")
        .data(d => d.periodData, (d,i) => i)
        .enter().append("g")
        .attr("class",(d , i) => "block block_"+ i)
        .attr("transform", (d , i) => {
            return `translate(`+ (i * blockWidth + (blockWidth - d[0].parent.x1 + d[0].parent.x0) / 2) +`,`+ (lineHeight - d[0].parent.y1 + d[0].parent.y0) / 2 +`)`
        });
    
    blocks.append("rect")
        .attr("fill", "#fff")
        .attr("class", "decoration")
        .attr("x", d => d[0].parent.x0)
        .attr("y", d => d[0].parent.y0)
        .attr("width", d => d[0].parent.x1 - d[0].parent.x0)
        .attr("height", d => d[0].parent.y1 - d[0].parent.y0);

    blocks.selectAll(".node")
        .data(d => d.filter(d => d.depth === 2), d => d.data.app + d.data.time + d.data.authority)
        .enter().append("rect")
        .attr("class", "node")
        .attr("fill", d => {
            if(d.data.status === "allow") return Authority[d.data.authority].color;
            else return texturelist[Authority[d.data.authority].name].url();
        })
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("opacity", 0);

    blocks.selectAll(".cluster")
        .data(d => d.filter(d => d.depth === 1))
        .enter().append("rect")
        .attr("class", "cluster")
        .attr("fill", (d,i) => {
            if(d.value){
                return Authority[d.children[0].data.authority].color;
            }
        })
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("opacity", 1);

    let legends = svg.append('g')
        .attr('class', 'legends')
        .attr('transform', `translate(125,1100)`)
        .selectAll('.legend')
        .data(Authority, d => d.name)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(`+ (i) * 100 +`,` + 0 + `)`);

    legends.append("rect")
        .attr("width", circle_r)
        .attr("height", circle_r)
        .attr("rx", circle_r / 2)
        .attr("ry", circle_r / 2)
        .attr("fill", d => d.color);

    legends.append("path")
        .attr("fill", "#fff")
        .attr("transform", "translate(9.5,9.5) scale(0.04, 0.04)")
        .attr("d", d => d.icon);
}

let overview_back = function(){
    authority_g.attr("opacity", 1);
    authority_g
        .attr("transform", `translate(` + (800 - 3 * circle2rectScale * circle_r)/2 + `,`+ (1200 - 3 * circle2rectScale * circle_r)/2 +`)`);
    authority_groups.selectAll("rect")
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", d => d.size.width * 1.5 * circle2rectScale * circle_r - padding)
        .attr("height", d => d.size.height * circle2rectScale * circle_r - padding);

    authority_groups
    .attr("transform", (d) => `translate(`+ (d.size.x0 * 1.5 * circle2rectScale * circle_r - padding) +`,` + (d.size.y0 * circle2rectScale * circle_r  - padding) + `)`);
    vis_g.attr("opacity", 0);
}

let highlightTime = function(){
    vis_g.selectAll(".tick")
        .transition()
        .delay((d, i) => i * 100)
        .duration(100)
        .attr("transform", (d,i) => "translate(-"+ i * blockWidth +", -20) scale(2)")
        .transition()
        .delay(120)
        .duration(200)
        .attr("transform", "translate(0, 0)");
}

let highlightTime_back = function(){
    
}

let highlightLocation = function(){
    vis_g.selectAll(".cluster")
        .filter(d => d.data.name !== "读取位置信息")
        .transition()
        .duration(1000)
        .attr("opacity", 0.3);
}

let highlightLocation_back = function(){
    vis_g.selectAll(".cluster")
        .transition()
        .duration(1000)
        .attr("opacity", 1);
}

let highlightID = function(){
    vis_g.selectAll(".cluster")
        .attr("opacity", 1)
        .filter(d => d.data.name !== "读取设备通话状态和识别码")
        .transition()
        .duration(1000)
        .attr("opacity", 0.3);
}

let highlightID_back = function(){
    vis_g.selectAll(".cluster")
        .attr("opacity", 1)
        .filter(d => d.data.name !== "读取位置信息")
        .transition()
        .duration(1000)
        .attr("opacity", 0.3);    
}

let highlightPerson = function(){
    vis_g.selectAll(".cluster")
        .attr("opacity", 1);

    let duration = 60;
    people_groups.filter(d => d.name === "ponda")
        .transition()
        .duration(duration)
        .attr("transform", `translate(-40 ,`+ (2 * lineHeight + 40)+") scale(1.2)")
        .transition()
        .delay(duration)
        .duration(duration)
        .attr("transform", `translate(0 ,`+ (2 * lineHeight + 40)+")")
        .transition()
        .delay(2 * duration)
        .duration(duration)
        .attr("transform", `translate(-40 ,`+ (2 * lineHeight + 40)+") scale(1.2)")
        .transition()
        .delay(3 * duration)
        .duration(duration)
        .attr("transform", `translate(0 ,`+ (2 * lineHeight + 40)+")")
}

let highlightPerson_back = function(){
    highlightID();
}

let showDetail = {
    "csj": false,
    "jkl": false,
    "panda":false
}
let detail = function(name){
    if(showDetail[name]){
        return detail_back(name);
    }
    showDetail[name] = true;
    let person;
    vis_g.selectAll(".node")
        .attr("opacity", 1);
    people_groups.each(function(d){
        if(d.name === name){
            vis_g.selectAll(".app_decoration").remove();

            vis_g.attr("transform", (d , i) => `translate(40 ,`+ (0) +`)`);
            person = d3.select(this)
                .attr("opacity", 1)
                .attr("transform", (d , i) => `translate(0 ,`+ (20) +`)`);
            
            person.selectAll(".node").filter(d => person2app[name].indexOf(d.data.app) === -1)
                .remove();
            person.selectAll(".decoration")
                .transition()
                .delay(0)
                .duration(600)
                .attr("opacity", 0);
            
            person.selectAll(".cluster")
                .transition()
                .delay(0)
                .duration(800)
                .attr("opacity", 0);

            let blocks = person.selectAll(".block")
                .data(d => d.appData, (d,i) => i)
                .transition()
                .delay(600)
                .duration(700)
                .attr("transform", (d , i) => {
                    return `translate(`+ 0 +`,`+ 0 +`)`//
                });

            blocks.nodes().forEach(function(block, i_time){
                block = d3.select(block);
                let blockData = block.data()[0];
                blockData.forEach((appBlockData, i_app)=> {
                    block.selectAll(".node")
                        .data(appBlockData.filter(d => d.depth !== 0), d => d.data.app + d.data.time + d.data.authority)
                        .transition()
                        .delay(600)
                        .duration(700)
                        .attr("x", d => d.x0 + i_time * blockWidth + (blockWidth - d.parent.x1 + d.parent.x0) / 2)
                        .attr("y", d => d.y0 + (i_app + 0)* lineHeight_app + 50 + (lineHeight_app - d.parent.y1 + d.parent.y0) / 2)
                        .attr("width", d => d.x1 - d.x0)
                        .attr("height", d => d.y1 - d.y0);
                });
            });

            let back = people_groups.select('.back');
            person2app[name].forEach(function(appName, i){
                back.append("line")
                    .attr("class", "app_decoration")
                    .attr("x1", 0)
                    .attr("x2", blockWidth * 0)
                    .attr("y1", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("y2", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("stroke", "#333")
                    .attr("stroke-width", '1')
                    .transition()
                    .delay(1300)
                    .duration(600)
                    .attr("x2", blockWidth * 6);

                back.selectAll(".circle")
                    .data(ticks, d => appName)
                    .enter().append("circle")
                    .attr("class", "app_decoration")
                    .attr("cx", (d, i) => i * blockWidth)
                    .attr("cy", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("r", 3)
                    .attr("opacity", 0)
                    .transition()
                    .delay(1900)
                    .duration(300)
                    .attr("opacity", 1);   

                back.append("svg:image")
                    .attr("class", "app_decoration")
                    .attr("xlink:href", "images/"+ appName +'.jpg')
                    .attr("width", 50)
                    .attr("height", 50)
                    .attr("x", -25)
                    .attr("y", lineHeight_app / 2 + (i + 0)* lineHeight_app + 25)
                    .attr("opacity", 0)
                    .transition()
                    .delay(1800)
                    .duration(300)
                    .attr("opacity", 1);   
            });
        }else{
            d3.select(this)
                .attr("opacity", 1)
                .transition()
                .delay(0)
                .duration(400)
                .attr("opacity", 0);
        }
    });
    person.selectAll('.nodes');
}

let detail_back = function(name){
    let person;
    vis_g.selectAll(".node")
        .attr("opacity", 1);
    people_groups.each(function(d){
        if(d.name === name){
            vis_g.selectAll(".app_decoration").remove();

            vis_g.attr("transform", (d , i) => `translate(40 ,`+ (0) +`)`);
            person = d3.select(this)
                .attr("opacity", 1)
                .attr("transform", (d , i) => `translate(0 ,`+ (20) +`)`);
            
            person.selectAll(".node").filter(d => person2app[name].indexOf(d.data.app) === -1)
                .remove();
            person.selectAll(".decoration")
                .attr("opacity", 0);
            
            person.selectAll(".cluster")
                .attr("opacity", 0);

            let blocks = person.selectAll(".block")
                .data(d => d.appData, (d,i) => i)
                .attr("transform", (d , i) => {
                    return `translate(`+ 0 +`,`+ 0 +`)`//
                });

            blocks.nodes().forEach(function(block, i_time){
                block = d3.select(block);
                let blockData = block.data()[0];
                blockData.forEach((appBlockData, i_app)=> {
                    block.selectAll(".node")
                        .data(appBlockData.filter(d => d.depth !== 0), d => d.data.app + d.data.time + d.data.authority)
                        .attr("x", d => d.x0 + i_time * blockWidth + (blockWidth - d.parent.x1 + d.parent.x0) / 2)
                        .attr("y", d => d.y0 + (i_app + 0)* lineHeight_app + 50 + (lineHeight_app - d.parent.y1 + d.parent.y0) / 2)
                        .attr("width", d => d.x1 - d.x0)
                        .attr("height", d => d.y1 - d.y0);
                });
            });

            let back = people_groups.select('.back');
            person2app[name].forEach(function(appName, i){
                back.append("line")
                    .attr("class", "app_decoration")
                    .attr("x1", 0)
                    .attr("x2", blockWidth * 0)
                    .attr("y1", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("y2", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("stroke", "#333")
                    .attr("stroke-width", '1')
                    .attr("x2", blockWidth * 6);

                back.selectAll(".circle")
                    .data(ticks, d => appName)
                    .enter().append("circle")
                    .attr("class", "app_decoration")
                    .attr("cx", (d, i) => i * blockWidth)
                    .attr("cy", lineHeight_app / 2 + (i + 0)* lineHeight_app + 50)
                    .attr("r", 3)
                    .attr("opacity", 1);   

                back.append("svg:image")
                    .attr("class", "app_decoration")
                    .attr("xlink:href", "images/"+ appName +'.jpg')
                    .attr("width", 50)
                    .attr("height", 50)
                    .attr("x", -25)
                    .attr("y", lineHeight_app / 2 + (i + 0)* lineHeight_app + 25)
                    .attr("opacity", 1);   
            });
        }else{
            d3.select(this)
                .attr("opacity", 0);
        }
    });
    person.selectAll('.nodes');
}

let detail1 = function(){
    detail("csj");
}

let detail1_back = function(){
    vis_g.remove();
    vis_g = null;
    overview();
}

let higlightNight = function(){
    let animation_g = people_groups.filter(d => d.name === "csj")
        .selectAll(".block_0")
        .append("g")
        .attr("class", "animation")
    let duration = 400,
        padding_i = 27;

    animation_g.append("line")
        .attr("stroke", "rgb(27, 12, 59)")
        .attr("stroke-width", 3)
        .attr("x1", padding_i)
        .attr("y1", lineHeight / 2 - 50)
        .attr("x2", padding_i)
        .attr("y2", lineHeight / 2 - 50)
        .transition()
        .duration(duration)
        .attr("x2", blockWidth - padding_i);
    animation_g.append("line")
        .attr("stroke", "rgb(27, 12, 59)")
        .attr("stroke-width", 3)
        .attr("x1", blockWidth - padding_i)
        .attr("y1", lineHeight / 2 - 50)
        .attr("x2", blockWidth - padding_i)
        .attr("y2", lineHeight / 2 - 50)
        .transition()
        .delay(duration)
        .duration(duration)
        .attr("y2", 11 * lineHeight / 2 - 50);
    animation_g.append("line")
        .attr("stroke", "rgb(27, 12, 59)")
        .attr("stroke-width", 3)
        .attr("x1", blockWidth - padding_i)
        .attr("y1", 11 * lineHeight / 2 - 50)
        .attr("x2", blockWidth - padding_i)
        .attr("y2", 11 * lineHeight / 2 - 50)
        .transition()
        .delay(2 * duration)
        .duration(duration)
        .attr("x2", padding_i);
    animation_g.append("line")
        .attr("stroke", "rgb(27, 12, 59)")
        .attr("stroke-width", 3)
        .attr("x1", padding_i)
        .attr("y1", 11 * lineHeight / 2 - 50)
        .attr("x2", padding_i)
        .attr("y2", 11 * lineHeight / 2 - 50)
        .transition()
        .delay(3 * duration)
        .duration(duration)
        .attr("y1", lineHeight / 2 - 50);
}

let higlightNight_back = function(){
    vis_g.selectAll(".animation").remove();
}

let detail2 = function(){
    vis_g.selectAll(".animation").remove();
    detail("jkl");
}

let detail2_back = function(){
    detail_back("csj");
    higlightNight();
}

let detail3 = function(){
    detail("ponda");
}

let detail3_back = function(){
    detail_back("jkl");
}

let empty = function(){

}
