const height = 200;
const width = 500;


margin = ({top: 20, right: 3, bottom: 20, left: 3});

line = d3.line().curve(d3.curveStepAfter)
    .x(d => x(d.y))
    .y(d => y(d.x))
