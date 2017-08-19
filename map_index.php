<?php
include('../libs/config.php');
?>


<?php


$prov = พิษณุโลก;
$year = 2559;

$amphoe_name = $_GET[amphoe_name2];
?>

<!DOCTYPE html>
<html>
<head>
	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MAP_FIRE</title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FONT AWESOME ICONS  -->
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <!-- CUSTOM STYLE  -->
    <link href="assets/css/style.css" rel="stylesheet" />
     <!-- HTML5 Shiv and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<style type="text/css">
${demo.css}
		</style>
	<style>
	h1 {
			font-family: "th sarabunpsk", Georgia, Serif;
			font-size : 30px;
		}
		#map {
			width: 100%;
			height: 650px;
		}

		.info {
			padding: 6px 8px;
			font: 14px/16px Arial, Helvetica, sans-serif;
			background: white;
			background: rgba(255,255,255,0.8);
			box-shadow: 0 0 15px rgba(0,0,0,0.2);
			border-radius: 5px;
		}
		.info h4 {
			margin: 0 0 5px;
			color: #777;
		}

		.legend {
			text-align: left;
			line-height: 30px;
			color: #555;
		}
		.legend i {
			width: 18px;
			height: 18px;
			float: left;
			margin-right: 8px;
			opacity: 0.9;
		}
	</style>



 <?php 

 if ($tambol != '') {
 	
	 $result1 = pg_query($db,"select *  from age_0_5_tm where tam_name like '%$tambol%' and  year_pop =  $year ; "); 
	$chart_index = pg_fetch_array($result1);

 }elseif ($amphoe_name != '') {
 	 $result1 = pg_query($db,"select *  from age_0_5_ap where amp_name like '%$amphoe_name%' and  year_pop =  $year   ; "); 
	$chart_index = pg_fetch_array($result1);
 }elseif ($prov != '') {
 	 $result1 = pg_query($db,"select *  from age_0_5_pv where pro_name like '%$prov%'  and  year_pop =  $year  ; "); 
	$chart_index = pg_fetch_array($result1);
 }else{
 	$result1 = pg_query($db,"select *  from age_0_5_th where  year_pop =  $year ; "); 
	$chart_index = pg_fetch_array($result1);
 }


 ?>  
</head>
<body>

	<div class="col-md-12 ">
			<div class="x_panel">
				<div id="map" style="width: 100%; height: 300px;" ></div>
            </div>
	   </div>	

	<script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>

   
    <!-- JAVASCRIPT AT THE BOTTOM TO REDUCE THE LOADING TIME  -->
    <!-- CORE JQUERY SCRIPTS -->
    <script src="assets/js/jquery-1.11.1.js"></script>
    <!-- BOOTSTRAP SCRIPTS  -->
    <script src="assets/js/bootstrap.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
	





	<script type="text/javascript">
	var statesData =	<?php
//-------------------------------------------------------------
// * Name: PHP-PostGIS2GeoJSON  
// * Purpose: GIST@NU (www.cgistln.nu.ac.th)
// * Date: 2016/10/13
// * Author: Chingchai Humhong (chingchaih@nu.ac.th)
// * Acknowledgement: 
//-------------------------------------------------------------
// Database connection settings


    // Retrieve start point
    // Connect to database

      $sql = "select *,ST_AsGeoJSON(geom) AS geojson from pop_plk40sim where amp_name like '%$amphoe_name';";
   


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
			'gid' => $edge['gid'],
            'pv_code' => $edge['tam_code'],
            'prov_nam_t' => $edge['tam_name'],
            'value_sum' => $edge['y59'],
            'value' => number_format($edge['y59'])
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
	
	
	</script>
	
	
	
	<script type="text/javascript">

	var map = L.map('map');
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
    
OpenStreetMap_BlackAndWhite.addTo(map);
map.setView([17.049115, 100.883500], 8);
	
	

		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		
		info.update = function (props) {
			this._div.innerHTML = (props ?
				'<h5>แผนที่แสดงจำนวนประชากรปี 2559</h5><b><center>ต. ' + props.prov_nam_t + '</b><br />' + props.value + ' คน'
				: '');
		};
		info.addTo(map);



		// get color depending on population PROV_CODE value
		function getColor(d) {
				return d > 50000  ? '#1f0033' :
					   d > 30000  ? '#5c0099' :
					   d > 10000  ? '#9900ff' :
					   d > 5000  ? '#b84dff' :
					   d > 1000  ? '#d699ff' :
					   d > 0  ? '#f5e6ff' :
								  '#ebccff';
		}

		function style(feature) {
			return {
				weight: 1,
				opacity: 0.5,
				color: '#000000',
				dashArray: '1',
				fillOpacity: 0.9,
				fillColor: getColor(feature.properties.value_sum)
			};
		}

		function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 3,
				color: '#ffffff',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			 var popupContent =  '<center>ต. ' +feature.properties.prov_nam_t + '</b><br />' + feature.properties.value_sum + ' คน'  ;
            layer.bindPopup(popupContent);
             layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
		}

		geojson = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);



		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0,1000,5000,10000, 30000,50000],
				labels = [],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1] - 1;

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+')+ ' คน');
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);


		
	</script>
	
	



</body>
</html>
