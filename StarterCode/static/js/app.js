// read in the url json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// retrieve the data from the url
var data = d3.json(url).then(function(data) {
    console.log(data);

    //define the names for the dropdown menu and verify
    var names = data.names;
    console.log(names);

    // populate the dropdown menu
    var dropdown = d3.select('#selDataset');
    names.forEach(function(name){dropdown.append('option').text(name).property('value')});

    // define the function for the dropdown menu
    function optionChanged(id) {
        plots(id);
        demInfo(id);
    }

    // define the function to create the plots
    function plots(id){

        // define the samples array, get top 10, and verify
        var samples = data.samples.filter(s => s.id)[0];
        console.log(samples);

        var otu_ids = samples.otu_ids.map(d => 'OTU ' + d);
        console.log(top_otu_ids);

        var sample_values = samples.sample_values;
        console.log(top_otu_ids);
    
        var otu_labels = samples.otu_labels;
        console.log(top_otu_ids);

        var top_otu_ids = samples.otu_ids.slice(0,10).reverse().map(d => 'OTU ' + d);
        console.log(top_otu_ids);

        var top_sample_values = samples.sample_values.slice(0,10).reverse();
        console.log(top_otu_ids);
    
        var top_otu_labels = samples.otu_labels.slice(0,10).reverse();
        console.log(top_otu_ids);

        // define handwashing array and verify
        var wfreq = data.metadata.map(d => d.wfreq);
        console.log(wfreq);

        // define data for the bar graph
        var bar = {
            x: top_sample_values,
            y: top_otu_ids,
            text: top_otu_labels,
            type: 'bar',
            orientation: 'h'
        };

        var barData = [bar];

        var barLayout = {
            title: 'Top 10 OTUs'
        };

        // plot the horizontal bar chart
        Plotly.newPlot('bar', barData, barLayout);

        // define the data for the gauge chart
        var gauge = [{
            //domain: {x: [0,9], y: [0,9]},
            value: wfreq[0],
            title: {text: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week'},
            type: 'indicator',
            mode: 'gauge',
            gauge:{
                axis: {range: [null, 9]},
                steps: [
                    {range: [0,1], color: '#F1F8E9', text:'0-1'},
                    {range: [1,2], color: '#DCEDC8', text:'1-2'},
                    {range: [2,3], color: '#C5E1A5', text:'2-3'},
                    {range: [3,4], color: '#AED581', text:'3-4'},
                    {range: [4,5], color: '#9CCC65', text:'4-5'},
                    {range: [5,6], color: '#8BC34A', text:'5-6'},
                    {range: [6,7], color: '#7CB342', text:'6-7'},
                    {range: [7,8], color: '#689F38', text:'7-8'},
                    {range: [8,9], color: '#558B2F', text:'8-9'},
                ]}
        }];

        // plot the gauge chart
        Plotly.newPlot('gauge', gauge);

        // define the data for the bubble chart

        var bubble = [{
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker: {size: sample_values, color: samples.otu_ids},
            text: otu_labels
        }];

        var bubbleLayout = {
            xaxis: {title: 'OTU ID'}
        };

        // plot the bubble chart
        Plotly.newPlot('bubble', bubble, bubbleLayout)
        
    };

    // define the function to populate the demographig info
    function demInfo(id){

        // read in the current demographic info
        var demographicInfo = d3.select('#sample-metadata');

        // reset the demographin info
        demographicInfo.html('');

        // write demographic info for current id
        demographicInfo.append().text(`id: ${id}`),
        demographicInfo.append().text(`ethnicity: ${data.metadata[0].ethnicity}`),
        demographicInfo.append().text(`gender: ${data.metadata[0].gender}`),
        demographicInfo.append().text(`age: ${data.metadata[0].age}`),
        demographicInfo.append().text(`location: ${data.metadata[0].location}`),
        demographicInfo.append().text(`bbtype: ${data.metadata[0].bbtype}`),
        demographicInfo.append().text(`wfreq: ${data.metadata[0].wfreq}`)
    }

    // identify the initial value for the initial plots and info
    var init_id = names[0]
    console.log(init_id)

    // create initial plots
    plots(init_id);

    // write the initial demographic info
    demInfo(init_id);

});