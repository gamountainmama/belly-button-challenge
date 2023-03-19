// read in the url json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// retrieve the data from the url
d3.json(url).then(function(data) {
    console.log(data);

    //define the names for the dropdown menu and verify
    var names = data.names;
    console.log(names);

    // define handwashing array and verify
    var wfreq = data.metadata.map(d => d.wfreq);
    console.log(wfreq);

    // define the samples array, get top 10, and verify
    var samples = data.samples.filter(s => s.id)[0];
    console.log(samples);
    
    var otu_ids = samples.otu_ids.slice(0,10).reverse().map(d => 'OTU ' + d);
    console.log(otu_ids);
    
    var sample_values = samples.sample_values.slice(0,10).reverse();
    console.log(sample_values);
    
    var otu_labels = samples.otu_labels.slice(0,10).reverse();
    console.log(otu_labels);
    
    // define the trace for the bar graph
    var bar = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        type: 'bar',
        orientation: 'h'
    };

    var barData = [bar];

    var barLayout = {
        title: 'Top 10 OTUs'
    };

    Plotly.newPlot("bar", barData, barLayout);

    // define the trace for the bubble chart
    var bubble = {
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        marker: {color: samples.otu_ids, size: samples.sample_values}
    };

    // define the trace for the gauge chart
    var gauge = {

    }

  });

  
  