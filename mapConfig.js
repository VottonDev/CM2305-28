mapboxgl.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';

dataPoints = " ";

setupMap()

function setupMap(){
     const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 1, //loads map with no zoom
        center: [0,30]
      });

      function addImages(map, images) {  //load in custom markers
          const addImage = (map, id, url) => {
            return new Promise((resolve, reject) => {
              map.loadImage(url, (error, image) => {
                if(error) {
                  reject(error);
                  return;
                }
                map.addImage(id, image);
                resolve(image);
              });
            });
          }
          const promises = images.map( imageData => addImage(map, imageData.id, imageData.url) );
          return Promise.all(promises);
        }



     const nav = new mapboxgl.NavigationControl() //adds zoom and rotate btns
     map.addControl(nav)

     map.on('load', () => {

          addImages(map, [
               {url: "static/images/xbox-marker.png", id: 'xbox'},
               {url: "static/images/ps4-marker.png", id: 'ps4'},
             ]).then(() => {
                  
          //add 2 data sources (1 for clusters, 1 for heatmap)
          map.addSource('sampleDataCluster', {
              type: 'geojson',
              data: 'api\\mapData.geojson', //temp data file. Wider spread of data 
              cluster: true, //enable clustering
              clusterMaxZoom: 9,
              clusterRadius: 50,
              clusterMinPoints: 5    
              
          });

          map.addSource('sampleDataHeat', {
               type: 'geojson',
               data: 'api\\mapData.geojson',
               cluster:false
          });

/*
          // Add markers to map for each point in the source data 
          map.addLayer({
               id: 'markers',
                    type: 'symbol',
                         source: 'sampleData',
                         layout: {
                              'icon-image': 'marker-15',
                              'text-field': '{title}',
                              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                              'text-offset': [0, 0.6],
                              'text-anchor': 'top'
                         }
          });


         // For plotting marker
 
           map.addLayer({
                id: 'markers',
                source: 'sampleDataCluster',
                type: 'symbol',
                filter: ['has', 'point_count'],
                layout: {
                     'icon-image': 'marker-15',
                     'text-field': '{title}',
                     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                     'text-offset': [0,0.6],
                     'text-anchor': 'top'
                }
           });
         

          map.addLayer({
               id: 'clusters',
               type: 'circle',
               source: 'sampleData',
               filter: ['has', 'point_count'],
               paint:{
                    'circle-color': '#f1f075',
                    'circle-radius': ['step', ['get', 'point_count'], 10, 100, 15, 500, 20]       
               }                   
          });
          
 
          map.addLayer({
               id: 'clusters',
               type: 'symbol',
               source: 'sampleData',
               layout: {
                    'icon-image': 'marker-15',
                    'text-field': '{title}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
               }
          });
          
     */
          
          map.addLayer({ //add data count for each cluster
               id: 'cluster-count',
               type: 'symbol',
               source: 'sampleDataCluster',
               filter: ['has', 'point_count'],
               layout: { 
                    'icon-image': 'ps4' //add custom marker to the clusters
               }      
          });


          //perform action on cluster click (zoom in and popup)
          map.on('click', 'cluster-count', (e) => {

               const features = map.queryRenderedFeatures(e.point, {
                    layers: ['cluster-count']
               });
               var totalPosts = features[0].properties.point_count;  //get total points in cluster
               console.log('cluster: ' +features[0].properties)

               var clusterId = features[0].properties.cluster_id;
               clusterSource = map.getSource('sampleDataCluster');
               var clusterLoc = e.features[0].geometry.coordinates;

               function createPopUp(clusterLoc, clusterId, clusterSource, totalPosts){
                    
               //variables to hold no. of posts for both products in clicked cluster
               var product =0;
               var competitor = 0;

               prod_pos=0;
               compet_pos=0;

               //get cluster leaves (all data points under clicked cluster)
               clusterSource.getClusterLeaves(clusterId, totalPosts, 0, (error,features) => {
                    console.log('cluster leaves', features);
                    console.log('cluster loc', clusterLoc );
                    const dataPoints = features; //get list of data points in a cluster

                    //get total product and competitor counts per cluster (for popup)
                    
                    for (let i in dataPoints){
                         if(dataPoints[i].properties.product == "Fanta"){
                              product++;
                              if(dataPoints[i].properties.sentiment == "positive"){
                                   prod_pos++;
                              }
                         } else {
                              competitor++;
                              if(dataPoints[i].properties.sentiment == "positive"){
                                   compet_pos++;
                              }
                         }
                    }

                    prod_pos = Math.round((prod_pos/product)*100);
                    compet_pos = Math.round((compet_pos/competitor)*100);

                    console.log('product:' + product + ' compet:' + competitor);
                    
                    map.getSource('sampleDataCluster').getClusterExpansionZoom(
                         clusterId,
                         (err, zoom) => {
                              if (err) return;
     
                              map.easeTo({
                                   center: features[0].geometry.coordinates, zoom: zoom
                              });
                         }
                    ); 
     
                    //popup on cluster click (display total point count)
                    new mapboxgl.Popup()
                     .setLngLat(clusterLoc)
                     .setHTML(`<strong>Total Tweets in Area:</strong> ` + totalPosts + '<br>Product Posts: ' + product + ' (' + prod_pos + '% positive)' +  '<br> Competitor Posts: ' + competitor + ' (' + compet_pos + '% positive)')
                     .addTo(map);
               });
                    
               }
               createPopUp(clusterLoc, clusterId, clusterSource, totalPosts);
          });
             

          //--------------HEATMAP LAYERS-----------------
          map.addLayer({
               'id': 'heatmap_layer',
               'type': 'heatmap',
               'source': 'sampleDataHeat',
               'maxzoom': 15,
               'paint': {
                    'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 12, 1],
                    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                    'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(14,196,126)',
                    0.6, 'rgb(229,225,21)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(239,96,78)'
               ],
               'heatmap-radius': ['interpolate', ['linear'], ['zoom'],0, 6, 2, 16],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
               }
          });

          map.addLayer({  //unclustered point
               'id': 'data-point',
               'type': 'circle',
               'source': 'sampleDataHeat',
               'minzoom': 5,

               'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
     
                    'circle-color': 
                    ['match', ['get', 'sampleDataHeat'],
                         'Fanta',
                         '#0000ff', //e.g. color if xbox
                          //other e.g. ps4
                         '#00ff00' 
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    'circle-opacity': ['interpolate', ['linear'],['zoom'], 7, 0, 8, 1]
               }
          });

           // click on unclustered data point to display popup showing magnitude
          map.on('click', 'data-point', (event) => {
             new mapboxgl.Popup()
               .setLngLat(event.features[0].geometry.coordinates)
               .setHTML(`<strong>Product:</strong> ${event.features[0].properties.product}, <br> <strong>Sentiment:</strong> ${event.features[0].properties.sentiment}, <br> <strong>Tweet: </strong> ${event.features[0].properties.text} `)
               .addTo(map);
          });

          map.moveLayer('cluster-count');  //move icons to top layer
          
          /*
          //filters points by product cocacola
          map.setFilter('heatmap_layer', ['==', 'product', 'Coca-cola']); 

          //filters points by product fanta
          map.setFilter('heatmap_layer', ['==', 'product', 'Fanta']); 

          */

     });
});

}

