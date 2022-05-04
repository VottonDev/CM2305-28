mapboxgl.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';


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
                  
/*
          map.loadImage(
               'static\\images\\xbox-marker.png',  
               (error, image) =>{
                    if (error) throw error;
                    map.addImage('xbox-marker', image);
         */

          //add 2 data sources (1 for clusters, 1 for heatmap)
          map.addSource('sampleDataCluster', {
              type: 'geojson',
              data: './geo.json', //temp data file. Wider spread of data 
              cluster: true, //enable clustering
              clusterMaxZoom: 9,
              clusterRadius: 50,
              clusterMinPoints: 5    
              
          });

          map.addSource('sampleDataHeat', {
               type: 'geojson',
               data: './geo.json',
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
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 10,
                    'icon-image': 'ps4' //add custom marker to the clusters
               }      
          });

          //perform action on cluster point click (zoom in and popup)
          map.on('click', 'cluster-count', (e) => {
               const features = map.queryRenderedFeatures(e.point, {
                    layers: ['cluster-count']
               });
               const clusterId = features[0].properties.cluster_id;
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
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(`<strong>SOME POPUP:</strong> {}`)
                .addTo(map);
            
                 
          });



          //--------------HEATMAP LAYERS-----------------
          map.addLayer({
               'id': 'heatmap',
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
               'heatmap-radius': ['interpolate', ['linear'], ['zoom'],0, 2, 9, 20],
                    // Transition from heatmap to circle layer by zoom level
                    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
               }
          });

          map.addLayer({  //unclustered point
               'id': 'data-point',
               'type': 'circle',
               'source': 'sampleDataHeat',
               'minzoom': 7,

               'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
     
                    'circle-color': [
                         'match', 
                         ['get', 'felt'],
                         '3',
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
            .setHTML(`<strong>Magnitude:</strong> ${event.features[0].properties.mag}, <br> ${event.features[0].properties.time}`)
            .addTo(map);
        });

            map.moveLayer('cluster-count');  


     });
});

}

