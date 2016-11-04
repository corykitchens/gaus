window.startGraphInit = (evaluations) => {
  var data = init();
  // line chart based on http://bl.ocks.org/mbostock/3883245
  var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
  };

  var width = $("#eval-graph").width() - margin.left - margin.right; //TODO dynamically get width
  var height = 500 - margin.top - margin.bottom;

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

  var svg = d3.select("#eval-graph").append("svg")
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

  svg.append("path")
      .datum(data)
      .attr("fill","#26C6DA")
      .attr("stroke", "#000")
      .attr("d", line);

  // TODO
  // Refactor this into its own function
  var mcScore = evaluations.microcog.final_score.value || 55;
  var waisScore = evaluations.wais.final_score.value || 55;
  var wiatScore = evaluations.wiat.final_score.value || 55;

  //MC circle
  svg.append("rect")
    .attr("fill", "#c0392b" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("x", setLegendLocation(mcScore, 55, 145) * width)
    .attr("y", 0)
    .attr("height", 450)
    .attr("width", 5);

  //WAIS circle
  svg.append("rect")
    .attr("fill", "#27ae60" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("x", setLegendLocation(waisScore, 55, 145) * width)
    .attr("y", 0)
    .attr("height", 450)
    .attr("width", 5);
  //WIAT circle
  svg.append("rect")
    .attr("fill", "#e67e22" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("x", setLegendLocation(wiatScore, 55, 145) * width)
    .attr("y", 0)
    .attr("height", 450)
    .attr("width", 5);

  d3.select('#save').on("click", function() {
    generateImage();
  });
};

const init = () => {
  //setting up empty data array
  var data = [];

  getData(); // popuate data

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

  return data;
}

function generateImage() {
  var html = d3.select("svg")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .node().parentNode.innerHTML;
  canvg('eval-canvas', $('svg').html());
  var canvas = document.getElementById('eval-canvas');
  var img = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.download = "sample.png";
  a.href = img;
  a.click();
}

function setLegendLocation(score, min, max) {
  return (((score - min) / (max-min)) * 100) * 0.01;
}
