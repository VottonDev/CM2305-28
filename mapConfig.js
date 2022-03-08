mapboxgl.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';

setupMap()

function setupMap(){
     const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 2, //loads map with no zoom
        center: [0,30]
      });
     const nav = new mapboxgl.NavigationControl() //adds zoom and rotate btns
     map.addControl(nav)

     map.on('load', () => {
          map.addSource('sampleData', {
              type: 'geojson',
              data: './sampleData2.geojson', //temp data file. Wider spread of data 
              cluster: true, //enable clustering
              clusterMaxZoom: 15,
              clusterRadius: 40
             
              
          });
          
          map.addLayer({ //add clusters and set radius based on no. of data points
               id: 'clusters',
               type: 'circle',
               source: 'sampleData',
               filter: ['has', 'point_count'],
               paint:{
                    'circle-color': '#f1f075',
                    'circle-radius': ['step', ['get', 'point_count'], 10, 100, 15, 500, 20]                   
               }
          });

          map.addLayer({ //add data count for each cluster
               id: 'cluster-count',
               type: 'symbol',
               source: 'sampleData',
               filter: ['has', 'point_count'],
               layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 15
               }
          });

          map.addLayer({ //add unclustered points (might remove depending on heatmap config)
               id: 'unclustered_point',
               type: 'circle',
               source: 'sampleData',
               filter: ['!', ['has', 'point_count']],
               paint: {
                    'circle-color': '#f1f075',
                    'circle-radius': 3,
                    'circle-stroke-width': 0.5,
                    'circle-stroke-color': '#ffffff'
               }
          });

          
       }
     )
}