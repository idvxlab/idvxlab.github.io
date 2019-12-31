function drawing_cover() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let singleText = width < 400 ? 14: 20;

    let treemap = d3.treemap()
        .size([width, height])

    let root = d3.hierarchy(data);

    let nodes = treemap(root.sum(function (d) { return d.size }))
        .leaves();

    nodes.forEach(node => {
        let dx = node.x1 - node.x0;
        let dy = node.y1 - node.y0
        
        node.x0 = Math.max(0, node.x0 - Math.floor(Math.random()*30+1));
        node.y0 = Math.max(0, node.y0 - Math.floor(Math.random()*30+1));
        node.x1 = Math.min(width, node.x1 + Math.floor(Math.random()*30+1));
        node.y1 = Math.min(height, node.y1 + Math.floor(Math.random()*30+1));

        return node
    });

    let svg_load = d3.selectAll('.cover').select("svg")

    const leaf = svg_load.selectAll("g")
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('opacity', 0)
        .attr("transform", d => `translate(${width / 2},${height / 2})`);

    const class_choice = [0, 1, 2];

    leaf.append("rect")
        .attr('class', d=>{
            var temp = (Math.random()*class_choice.length) >> 0;
            return 'cover_' + class_choice[temp];
        })
        .attr("stroke-width", 2)
        .attr('rx', 2)
        .attr('ry', 2)
        .attr("width", d => d.x1 - d.x0) 
        .attr("height", d => d.y1 - d.y0);

    leaf.append("text")
        .attr('y', 0)
        .attr("fill", function(d){
            let cla = d3.select(this.parentNode).select('rect').attr('class');
            if (cla == 'cover_0' || cla == 'cover_1')   return "#1f073e";
            else  return "#ffffff";
        }) 
        .attr('font-size', width < 400 ? 12: 18)
        .selectAll("tspan")
        .data(d => {
            let temp = [];
            let wrapWidth = d.x1 - d.x0 - 20 >= 20 ? d.x1 - d.x0 - 20 : d.x1 - d.x0;
            const perLine = Math.floor(wrapWidth / singleText); 
            for(let index=0; index<d['data']['size'] ; index+=perLine ){
                temp.push(d['data']['text'].slice(index,index+perLine));
            }   
            return temp;
        })
        .enter()
        .append('tspan')
        .attr('x', 0)
        .attr("dy", width < 400 ? 15: 20)
        .text(d => d);

    leaf.selectAll('text')
        .attr('transform', function(d) {
            let bbox = d3.select(this).node().getBBox();
            return "translate(" + (d.x1 - d.x0 - bbox.width) / 2  + "," + (d.y1 - d.y0 - bbox.height - bbox.y) / 2 + ")";
        })

    leaf.transition()
        .delay((d,i) => 200 * (i%15))
        .duration(1000)
        .attr('opacity', 1)
        .attr("transform", d => `translate(${d.x0},${d.y0})`);


    setTimeout(function(){
        if (width > height) {
            var img = svg_load.append("svg:image")
                .attr("xlink:href", "images/cover.png")
                .attr("width", width * 0.5)
                .attr("height", width * 0.5 * 4984 / 3480)
                .attr("x", (width - width * 0.5) / 2)
                .attr("y",(height - width * 0.5 * 4984 / 3480 ) / 2);
        }
        else {
            var img = svg_load.append("svg:image")
                .attr("xlink:href", "images/cover.png")
                .attr("width", width * 0.85)
                .attr("height", width * 0.85 * 4984 / 3480)
                .attr("x", (width - width * 0.85) / 2)
                .attr("y",(height - width * 0.85 * 4984 / 3480) / 2);
        } 
    }, 200*16);

}