(function() {
  
  var data = []; //Array of x,y coordinates to plot the graph
  getData(); 

  //For Debug purposes
  //Get student's final scores for all three exams
  var mcScore = $('.mc-score').text();
  var waisScore = $('.wais').text();
  var wiatScore = $('.wiat').text();
  // line chart based on http://bl.ocks.org/mbostock/3883245
  var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
      },
  width = $('.main-content').width() - margin.left - margin.right;
  height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .domain([55,145])
      .range([margin.left, width-margin.right]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickValues([-3,-2,-1,0,1,2,3])
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)

  var line = d3.svg.line()
      .x(function(d) {
          return x(d.q);
      })
      .y(function(d) {
          return y(d.p);
      });

  var svg = d3.select("#eval-graph").append("svg")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + margin.top + ")");

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
      .attr("d", line);

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
})();

d3.select("#save").on("click", function(){
  var html = d3.select("svg")
  .attr("version", 1.1)
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .node().parentNode.innerHTML;

  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
  var img = '<img src="'+imgsrc+'">';
  d3.select("#svgdataurl").html(img);
  var canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d");

  var image = new Image;
  image.src = imgsrc;
  image.onload = function() {
    context.drawImage(image, 0, 0);
    //save and serve it as an actual filename
    binaryblob();
    var a = document.createElement("a");
    a.download = "sample.png";
    a.href = canvas.toDataURL("image/png");
    var pngimg = '<img src="'+a.href+'">';
    d3.select("#pngdataurl").html(pngimg);
    a.click();
  };

})();

function binaryblob(){
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