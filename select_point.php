<?php
include('config.php');

    // Retrieve start point
    // Connect to database

      $sql = "select * ,ST_AsGeoJSON(geom) AS geojson from list_house2";
   


   // Perform database query
   $query = pg_query($db,$sql);   
   //echo $sql;
    // Return route as GeoJSON
   $geojson = array(
      'type'      => 'FeatureCollection',
      'features'  => array()
   ); 
  
   // Add geom to GeoJSON array
   while($edge=pg_fetch_assoc($query)) {  
      $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($edge['geojson'], true),
         'crs' => array(
            'type' => 'EPSG',
            'properties' => array('code' => '4326')
         ),
            'properties' => array(
            'gid' => $edge['id_list'],
            'prov_nam' => $edge['prov_nam'],
            'amp_nam' => $edge['amp_nam'],
            'tam_nam' => $edge['tam_nam'],
            'name_house' => $edge['name_house'],
            'no_house' => $edge['no_house'],
            'moo_house' => $edge['moo_house'],
            'id_house' => $edge['id_house']
         )
      );
      
      // Add feature array to feature collection array
      array_push($geojson['features'], $feature);
   }
   // Close database connection
   
   // Return routing result
   // header('Content-type: application/json',true);
  echo json_encode($geojson);

?>