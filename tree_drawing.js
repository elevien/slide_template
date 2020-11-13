
// this is the function used to make the layout
layout = d3.flextree().nodeSize(node => [1,node.data.time-node.data.birth_time])
function draw_tree(svg,root_layout,x,y,line,color) {

     const links = root_layout.links()
   // get the leaves since these are not included when we draw the links
    const leaves =root_layout.leaves()
   for (var i = 0; i < links.length; i++) {
     svg = d3.select('#d3-canvas').append("path")
      .datum([links[i].source,links[i].target])
      .attr("fill", "none")
      .attr("stroke",color)
      .attr("stroke-width",2.)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round").attr("d", line)
    }

  for (var i = 0; i < leaves.length; i++) {
     svg.append("path")
      .datum([{x:leaves[i].x,y:leaves[i].data.birth_time},{x:leaves[i].x,y:leaves[i].data.time}])
      .attr("fill", "none")
      .attr("stroke",color)
      .attr("stroke-width",2.)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round").attr("d", line)
    }
}


function update_bellman_harris(root,dt,t,dist){
    const lvs  = layout.hierarchy(root).leaves()
    for (var i = 0; i < lvs.length; i++)
      // determine if this cell should divide
      if (lvs[i].data.birth_time+lvs[i].data.tau<t){
        const tauL = dist();
        const tauR = dist();
        lvs[i].data.time = t
        lvs[i].data.children = [
          {tau:tauL,
           birth_time:t,
           time:t,
           children:[]},
          {tau:tauR,
           birth_time:t,
           time:t,
           children:[]}
        ]
      } else {
        lvs[i].data.time = t;
      }
    t = t+dt;
    if (t>7){// reset
      root.children = []
      root.birth_time = 0
      root.time = 0
      root.tau = dist()
      t = 0
    }
    return {root:root,t:t}
  }
