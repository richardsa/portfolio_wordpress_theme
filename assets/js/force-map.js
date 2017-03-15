// project modeled with help from Interactive Data Visualization for the Web
// http://chimera.labs.oreilly.com/books/1230000000345/ch11.html#_force_layout

var url = "https://raw.githubusercontent.com/richardsa/json-project-files/master/countries.json";

d3.json(url, function(error, dataset) {
 //Width and height
var w = 1200;
var h = 800;

//Initialize a default force layout, using the nodes and edges in dataset
var force = d3.layout.force()
  .nodes(dataset.nodes)
  .links(dataset.links)
  .size([w, h])
  .linkDistance([50])
  .charge([-100])
  .start();


//Create SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//Create edges as lines
var edges = svg.selectAll("line")
  .data(dataset.links)
  .enter()
  .append("line")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

// create nodes
var nodes = svg.selectAll(".node")
  .data(dataset.nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(force.drag);

//Create nodes with transparent image
nodes.append("image")
  .attr("xlink:href", "../wp-content/uploads/2017/01/Transparent.png")
  .attr("x", -8)
  .attr("y", -8)
  .attr("width", 16)
  .attr("height", 11)
.append("title")
 .text(function(d) {
       return d.country;
 });


nodes.append('foreignObject')
     //.attr("xlink:href", "blank.gif")
     .attr("class", function(d, i) {
     return "flag flag-"+d.code;
   })
      .attr("alt", function(d, i) {
     return d.country;
   })
     .attr("x", -8)
     .attr("y", -8)
    .attr("width", 16)
     .attr("height", 11);


//Every time the simulation "ticks", this will be called
force.on("tick", function() {
  edges.attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  nodes.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

});

//closing json call
});
