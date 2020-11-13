root = {birth_time:0,
    time:0,
      tau:d3.randomNormal(1,0.01)(),
      children:[]}

      var t = 0;
      while (t<7){
      const update = update_bellman_harris(root,0.,t,d3.randomNormal(1,0.1))
      t = update.t
      root = update.root
    }

    const height = 400
    const width = 1000
    const margin = ({top: 100, right: 200, bottom: 100, left: 200})// these are the margins in pixels
    // take our data and turn it into a tree layout
     const tree_layout = layout(layout.hierarchy(tree_data))
     // get the links (the edges) in the tree
     const links = tree_layout.links()
     // get the leaves since these are not included when we draw the links
     const leaves = tree_layout.leaves()

     const x = d3.scaleLinear()
      .domain([d3.min(leaves,d=>d.x), d3.max(leaves,d=>d.x)])
       .range([margin.left, width-margin.right])

     const y = d3.scaleLinear()
      .domain([0, d3.max(leaves,d=>d.y)])
     .range([height - margin.bottom, margin.top])

     const svg_rec_tree = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    const line = d3.line().curve(d3.curveStepBefore)
      .x(d => x(d.x))
      .y(d => height-y(d.y))
    draw_tree(svg_rec_tree,tree_layout,x,y,line,"gray")
    draw_tree(svg_rec_tree,tree_layout.children[0],x,y,line,"black")
    draw_tree(svg_rec_tree,tree_layout.children[1],x,y,line,"red")
