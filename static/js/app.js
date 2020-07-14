function metaDATA(sample) {
  d3.json("samples.json").then(function(data) {
      var metadata = data.metadata;
      var Array1 = metadata.filter(m => m.id == sample);
      var panelData = Array1[0];
      
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(panelData).forEach(([key, value]) => {
        panel
        .append("h5")
        .text(`${key}: ${value}`);
      });
    
      // BONUS: Build the Gauge Chart
    // buildGauge(data.wfreq);

});
}

function Charts(sample) {
  d3.json("samples.json").then(function(data) {
    var Data1 = data.samples;
    var Array1 = Data1.filter(m => m.id == sample);
    var sampleValues = Array1[0].sample_values.slice(0,10).reverse();
    var sampleId = Array1[0].otu_ids.slice(0,10).reverse();
    var sampleLabels = Array1[0].otu_labels.slice(0,10).reverse();
    // console.log(sampleLabels);
    // console.log(sampleId);
    
    var yValues = sampleId.map(d => `OTU :${d}`);
    console.log(yValues)
    var BarTrace = [{
    y: yValues,
    x: sampleValues,
    type: 'bar',
    orientation:'h',
    name: sampleLabels,
    hovertemplate: '%{y}<br>' + 'Sample Value: %{x}<br>',
    text: sampleId,
    }];
    
  
    Plotly.newPlot("bar", BarTrace);

    var BubTrace = [{
      x: sampleId,
      y: sampleValues,
      text: sampleLabels,
      mode: 'markers',
      hovertemplate: 'OTU ID:: %{x}<br>' 
                      + 'Sample Value: %{y}<br>'
                      + 'OTU Labels: %{text}<br>',
      marker: {
        size: sampleValues,
        color: sampleId
      }
    }];
    var layout2 = {
      title: `Test Subject ID:${sample}`,
     
    };
    Plotly.newPlot("bubble", BubTrace, layout2);

  });
}


function init() {
    d3.json("samples.json").then(function(data) {
      var names = data.names;
      var dropdown = d3.select("#selDataset");
      names.forEach((name) => {
            dropdown
              .append("option")
              .text(name)
              .property("value", name);
          });
    var firstValue = names[0];
  
    metaDATA(firstValue);
    Charts(firstValue);
//   console.log(firstValue);
  });
}

function optionChanged(Sample) {
  metaDATA(Sample);
  Charts(Sample);
 }
init();