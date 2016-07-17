function graph(data1){

  var margin={top:100, bottom:80, left:100, right:50 },
  width=700-margin.left-margin.right,
  height=570-margin.top-margin.bottom;
  data1.forEach(function(d){

   d.Sugar=+d.Sugar;
   d.Salt=+d.Salt;
 });

  var svg=d3.select("#div2").append("svg")  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");
  svg.append("text")
  .attr("x", (width / 2))
  .attr("y",0- margin.top/2)
  .attr("text-anchor", "middle")
  .style("font-size", "40px")
  .text("Sugar and salt consumption graph");

  svg.append("text")
  .attr("x",350 )
  .attr("y",  440 )
  .style("text-anchor", "middle")
  .style("font-size", "25px")
  .text("Countries");

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x",0 - (height / 2))
  .attr("y",0-(margin.left-30))
  .attr("dy", "1em")
  .style("font-size", "25px")
  .style("text-anchor", "middle")
  .text("values");

  var hr=d3.scale.ordinal().rangeRoundBands([0,width],0.5),
  vr=d3.scale.linear().rangeRound([height,0]);



  var color = d3.scale.category10().range(["blue","black"]);
  var xAxis=d3.svg.axis().scale(hr).orient("bottom");
  var yAxis=d3.svg.axis().scale(vr).orient("left");

  console.log(data1);
  var over=["Sugar","Salt"];
  var interData = over.map(function (c) {
    return data1.map(function (d) {
      return {x: d.country_name, y: d[c]};
    });
  });
  var dLayout = d3.layout.stack()(interData);

  hr.domain(dLayout[0].map(function (d) {
    return d.x;
  }));

  vr.domain([0, d3.max(dLayout[dLayout.length-1],
    function (d) { return d.y0 + d.y;})
  ]);
  var layer = svg.selectAll(".stack")
  .data(dLayout)
  .enter().append("g")
  .attr("class", "stack")
  .style("fill", function (d, i) {
    return color(i);
  });

  layer.selectAll("rect")
  .data(function (d) {
    return d;
  })
  .enter().append("rect")
  .attr("x", function (d) {
    return hr(d.x);
  })
  .attr("y", function (d) {
    return vr(d.y+d.y0);
  })
  .attr("height", function (d) {
    return vr(d.y0) - vr(d.y +d.y0);
  })
  .attr("width", hr.rangeBand());

  svg.append("g")
  .attr({"class":"axis","font-size":"10px"})
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  svg.append("g")
  .attr({"class" :"axis"})
  .call(yAxis);
};
