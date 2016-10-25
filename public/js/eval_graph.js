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

// TODO
// Does not work with partials, only runs during full refresh
$(document).ready(() => {
  let data = init();
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

  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis);

  svg.append("path")
      .datum(data)
      .attr("fill","#26C6DA")
      .attr("stroke", "#000")
      .attr("d", line);

  let mcScore = 100;
  let waisScore = 80;
  let wiatScore = 122;

  //MC circle
  svg.append("circle")
    .attr("fill", "red" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("cx", setLegendLocation(mcScore, 55, 145) * width)
    .attr("cy", 100)
    .attr("r", "15");
  //WAIS circle
  svg.append("circle")
    .attr("fill", "green" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("cx", setLegendLocation(waisScore, 55, 145) * width)
    .attr("cy", 100)
    .attr("r", "15");
  //WIAT circle
  svg.append("circle")
    .attr("fill", "orange" )
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("cx", setLegendLocation(wiatScore, 55, 145) * width)
    .attr("cy", 100)
    .attr("r", "15");

  d3.select("#save").on("click", function(){
    //generates the html markup
    // containing the svg path attribs
    var html = d3.select("svg")
    .attr("version", 1.1)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .node().parentNode.innerHTML;

    // Encodes the svg markup
    // to a base64 String object
    // and appaneds it to a data uri
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img src="'+imgsrc+'">';
    // d3.select("#svgdataurl").html(img);

    //Get context to the canvas element
    var canvas = document.querySelector("canvas");
    canvas.width = width;
    canvas.height = 600;
    var context = canvas.getContext("2d");

    // Create new image
    var image = new Image;
    image.src = imgsrc;
    image.onload = function() {
      context.drawImage(image, 0, 0);
      //save and serve it as an actual filename
      binaryblob();
      var a = document.createElement("a");
      a.download = "eval.png";
      a.href = canvas.toDataURL("image/png");
      var pngimg = '<img src="'+a.href+'">';
      d3.select("#pngdataurl").html(pngimg);
      a.click();
    };

  });

  function binaryblob() {
    var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, ""));
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var dataView = new DataView(ab);
    var blob = new Blob([dataView], {type: "image/png"});
    var DOMURL = self.URL || self.webkitURL || self;
    var newurl = DOMURL.createObjectURL(blob);
    var img = '<img src="'+newurl+'">';
    d3.select("#img").html(img);
}

  function setLegendLocation(score, min, max) {
    return (((score - min) / (max-min)) * 100) * 0.01;
  }

});
