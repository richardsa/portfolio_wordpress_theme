//  interactive data visualization for the web used for this project
//  specifially the following two chapters:
//  chapter 12 - geomapping (http://chimera.labs.oreilly.com/books/1230000000345/ch12.html)
//  chapter 10 - interactivity (http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips)


//  Width and height
var w = 1200;
var h = 900;
// colors for meteor points
var colors = d3.scale.category10();
//Define map projection
var projection = d3.geo.mercator()
  //  .center([0, 5])
  .translate([w / 2, h / 2])
  .scale(150);
  // .rotate([-180, 0]);


  //Define path generator
var path = d3.geo.path()
  .projection(projection);


//Create SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
//Load in GeoJSON data
d3.json("https://raw.githubusercontent.com/richardsa/json-project-files/master/countries.geo.json", function(json) {

  //Bind data and create one path per GeoJSON feature
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", "#006200");
  d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(data) {
    svg.selectAll("circle")
      .data(data.features)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        if (d.geometry !== null) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
        }
      })
      .attr("cy", function(d) {
        if (d.geometry !== null) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
        }
      })
      .attr("r", function(d) {
        if (d.properties.mass !== null) {
          var radius = Math.sqrt(parseInt(d.properties.mass) * 0.0002);
          if (radius < 8) {
            return 2;
          } else {
            return radius;
          }
        }

      })
      .style("fill", function(d, i) {
        return colors(i);
      })
      .style("opacity", 0.75)
      .on("mouseover", function(d) {
        //Get this bar's x/y values, then augment for the tooltip
        var xPosition = parseFloat(d3.select(this).attr("cx") + 800);
        var yPosition = parseFloat(d3.select(this).attr("cy") / 2);
        //Update the tooltip position and value
        d3.select("#tooltip")
          .style("left", xPosition + "px")
          .style("top", yPosition + "px")
          .select("#value")
          .html("<strong>Name: </strong>" + d.properties.name + "<br /><strong>Mass: </strong> " + d.properties.mass + "<br /><strong>Fall: </strong> " + d.properties.fall + "<br /><strong>Nametype: </strong>" + d.properties.nametype + "<br /><strong>recclass: </strong>" + d.properties.recclass + "<br /><strong>reclat: </strong>" + d.properties.reclat + "<br /><strong>Year:</strong> " + d.properties.year.substring(0, 4));

        //Show the tooltip
        d3.select("#tooltip").classed("hidden", false);
      })
      .on("mouseout", function() {

        //Hide the tooltip
        d3.select("#tooltip").classed("hidden", true);

      });
 // closing meteorite json call
  });
// closing geo country data json call
});
