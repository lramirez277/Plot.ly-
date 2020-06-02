function createPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (s_data =>{
            console.log(s_data)
            var Values =  s_data.samples[0].sample_values.slice(0,10).reverse();
            // console.log(Values)
            var ids = s_data.samples[0].otu_ids;
            // console.log(ids)

            var labels =  s_data.samples[0].otu_labels.slice(0,10);
            // console.log(labes)

            var OTU = ( s_data.samples[0].otu_ids.slice(0, 10)).reverse();
        
            var OTU_id = OTU.map(lab => "map"+ lab);

            var otu_ids_bubble=s_data.samples[0].otu_ids;

            var sample_values_bubble=s_data.samples[0].sample_values;

            var labels_bubble=s_data.samples[0].otu_labels;
            
         // top 10 labels 
            var labels =  s_data.samples[0].otu_labels.slice(0,10);
        //    plot 
            var trace1 = {
                x: Values,
                y: OTU_id,
                text: labels,
                type:"bar",
                orientation: "h"
            };
            
            var data1 = [trace1];
    
    
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear"
                }
            };

            Plotly.newPlot("bar", data1, layout);

            // bubble chart
            var trace2 = {
                x:otu_ids_bubble,
                y:sample_values_bubble,
                mode: "markers",
                marker: {
                    color: otu_ids_bubble,
                    size: sample_values_bubble,
                    opacity:[1,0.8,0.6,0.4],
                },
                text:  labels_bubble
    
            };

            var data2 = [trace2];
    
            // layout 
            var layout_2 = {
                title: "OTU ID",
                height: 600,
                width: 1300
            };
    
            
    
            Plotly.newPlot("bubble", data2, layout_2); 
        
            });
        }  
    
    // Demographics
    
    function getData(id) {
    
        
        d3.json("samples.json").then((data)=> {
    
            var metadata = data.metadata;
            console.log(metadata)
    
          // Get id
           var dem_id = metadata.filter(da => da.id)[0];
          
           // select div
           var dem_div = d3.select("#sample-metadata");
           dem_div.html("");
    
         // append 
            Object.entries(dem_id).forEach((val) => {   
                dem_div.append("h5").text(val[0] + ": " + val[1]);    
            });
        });
    }
    // funtion change
    function optionChanged(id) {
        createPlots(id);
        getData(id);
    }
    
    // drop down menu
    function init() {
        
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");
     
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // for each
            var final_data=data.names.forEach(function(name) {
                dropdownMenu.append("option").text(name).dataset;
            });
    
            
            createPlots(final_data);
            getData(final_data);
        });
    }
    
    init();
