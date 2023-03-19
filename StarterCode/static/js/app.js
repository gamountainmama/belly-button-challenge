// read in the url json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define the data from the url
const data = d3.json(url).then(function(data) {
    console.log(data)

    // define the metadata array and check
    var metadata = data.metadata
    console.log(metadata[0].id)

    //define the names array and check
    var names = data.names
    console.log(names[0])

    // define the samples array, get top 10, and check
    var samples = data.samples
    var top10 = samples[0].sample_values.slice(0,10);
    console.log(top10)
    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");

      // Initialize x and y arrays
    let x = [];
    let y = [];

     if (dataset === 'dataset1') {
        x = [1, 2, 3, 4, 5];
        y = [1, 2, 4, 8, 16];
        }

    else if (dataset === 'dataset2') {
        x = [10, 20, 30, 40, 50];
        y = [1, 10, 100, 1000, 10000];
        }

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
        }

init();




  });

  
  