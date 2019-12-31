const circle_r = 60,
    padding = 2;

const circle2rectScale = 3;

let initAuthority = function(){
    svg = d3.select("#vis-container")
        .append("svg")
        .attr("viewBox", "0 0 800 1200");

    Authority.forEach(d => {
        let texture = textures
            .lines()
            .thicker()
            .stroke("#666")
            .background(d.color)
        texturelist[d.name] = texture;
        svg.call(texture);
    });

    authority_g = svg.append("g")
        .attr("transform", `translate(190,195)`);
    authority_groups = authority_g.selectAll(".authority_circle")
        .data(Authority, d => d.name)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(`+ (i % 2) * 300 +`,` + parseInt(i / 2) * 300 + `)`);

    authority_groups.append("rect")
        .attr("width", 2 * circle_r)
        .attr("height", 2 * circle_r)
        .attr("rx", circle_r)
        .attr("ry", circle_r)
        .attr("fill", d => d.color);

    authority_groups.append("path")
        .attr("fill", "#fff")
        .attr("transform", "translate(19,19) scale(0.08, 0.08)")
        .attr("d", d => d.icon);

    authority_groups.append("text")
        .attr("fill", "#333")
        .attr("font-size", 28)
        .attr("transform", "translate(60,180)")
        .attr("text-anchor", "middle")
        .html(d => d.text || d.name)
        .each(function(d){
            if(d.text){
                let nodes = d3.select(this).selectAll("tspan").nodes();
                if(d.name === "读取设备通话状态和识别码")
                    d3.select(nodes[1]).attr("dx", - nodes[0].getComputedTextLength());
                else d3.select(nodes[1]).attr("dx", - nodes[0].getComputedTextLength()/3*2);
            }
        });
}

let initAuthority_back = function(){
    d3.select("#vis-container").html("");
}

let introColor = function(){
    authority_groups.selectAll("text").remove();
    authority_groups.selectAll("path").remove();

    authority_g
        .transition()
        .attr("transform", `translate(` + (800 - 3 * circle2rectScale * circle_r)/2 + `,`+ (1200 - 3 * circle2rectScale * circle_r)/2 +`)`);

    authority_groups
        .transition()
        .attr("transform", (d, i) => `translate(`+ ((i % 2) * 1.5 * circle2rectScale * circle_r - padding)+`,` + (parseInt(i / 2) * circle2rectScale * circle_r - padding)+ `)`);
    authority_groups.selectAll("rect")
        .transition()
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", 1.5 * circle2rectScale * circle_r - padding)
        .attr("height", circle2rectScale * circle_r - padding);
}

let introColor_back = function(){
    d3.select("#vis-container").html("");
    initAuthority();
}

let introSize = function(){
    authority_groups.selectAll("rect")
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", 1.5 * circle2rectScale * circle_r - padding)
        .attr("height", circle2rectScale * circle_r - padding);

    authority_groups
        .transition()
        .attr("transform", (d) => `translate(`+ (d.size.x0 * 1.5 * circle2rectScale * circle_r - padding) +`,` + (d.size.y0 * circle2rectScale * circle_r  - padding) + `)`);
    authority_groups.selectAll("rect")
        .transition()
        .attr("width", d => d.size.width * 1.5 * circle2rectScale * circle_r - padding)
        .attr("height", d => d.size.height * circle2rectScale * circle_r - padding);
}

let introSize_back = function(){
    authority_groups
        .transition()
        .attr("transform", (d, i) => `translate(`+ ((i % 2) * 1.5 * circle2rectScale * circle_r - padding)+`,` + (parseInt(i / 2) * circle2rectScale * circle_r - padding)+ `)`);
    authority_groups.selectAll("rect")
        .transition()
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", 1.5 * circle2rectScale * circle_r - padding)
        .attr("height", circle2rectScale * circle_r - padding);
}

let introTexture = function(){
    d3.select(authority_groups.nodes()[2]).select("rect")
        .transition()
        .attr("fill", d => texturelist[d.name].url());
}

let introTexture_back = function(){
    d3.select(authority_groups.nodes()[2]).select("rect")
        .transition()
        .attr("fill", d => d.color);
    authority_groups.selectAll("rect")
        .attr("rx", 0)
        .attr("ry", 0);
}