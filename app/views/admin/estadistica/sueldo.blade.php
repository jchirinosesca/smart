<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Normal Plot</title>
    <meta name="description" content="">
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <style type="text/css">
    body {
        font: 10px sans-serif;
    }
    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }
    /*.x.axis path {
        display: none;
    }*/
    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 1.5px;
    }
    </style>
</head>

<body>

</body>

<script type="text/javascript">
//setting up empty data array
var data = [];

getData(); // popuate data 

// line chart based on http://bl.ocks.org/mbostock/3883245
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) {
        return x(d.q);
    })
    .y(function(d) {
        return y(d.p);
    });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(data, function(d) {
    return d.q;
}));
y.domain(d3.extent(data, function(d) {
    return d.p;
}));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

function getData() {

// loop to populate data array with 
// probabily - quantile pairs
for (var i = 0; i < 100000; i++) {
    q = normal() // calc random draw from normal dist
    p = gaussian(q) // calc prob of rand draw
    el = {
        "q": q,
        "p": p
    }
    data.push(el)
};

// need to sort for plotting
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
data.sort(function(x, y) {
    return x.q - y.q;
}); 
}

// from http://bl.ocks.org/mbostock/4349187
// Sample from a normal distribution with mean 0, stddev 1.
function normal() {
    var x = 0,
        y = 0,
        rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c; // throw away extra sample y * c
}

//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
    var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
        mean = 0,
        sigma = 1;

    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};
</script>

</html>