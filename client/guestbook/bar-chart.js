// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%m-%Y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
.scale(x)
.orient("bottom")
.ticks(d3.time.months)
.tickSize(10, 2)
.tickFormat(d3.time.format("%b"));

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// Adds the svg canvas
var svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var data = [
  {time: "01-01-2019", value:2},
  {time: "02-01-2019", value:1},
  {time: "03-01-2019", value:3},
  {time: "04-01-2019", value:1},
  {time: "05-01-2019", value:5},
  {time: "06-01-2019", value:10},
  {time: "07-01-2019", value:3},
  {time: "08-01-2019", value:5},
  {time: "01-02-2019", value:0},
  {time: "02-02-2019", value:2},
  {time: "03-05-2019", value:1},
  {time: "04-05-2019", value:2},
  {time: "05-05-2019", value:4},

];

// Get the data
        data.forEach(function(d) {
            d.date = parseDate(d.time);
            d.close = +d.value;
        });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
