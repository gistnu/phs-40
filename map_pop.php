<?php
include('../libs/config.php');
?>


<?php


$prov = พิษณุโลก;
$amphoe_name = $_GET[amphoe];
$tambol_name = $_GET[tambon];

$year = $_GET[year];

if ($year == ''){
	$year = 2559;
}
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

 if ($tambol_name != '') {
    
     $result1 = pg_query($db,"select *  from age_0_5_tm where pro_name like '%$prov%'  and amp_name like '%$amphoe_name' and tam_name like '%$tambol_name%' and  year_pop =  $year ; "); 
    $chart_index = pg_fetch_array($result1);

 }elseif ($amphoe_name != '') {
     $result1 = pg_query($db,"select *  from age_0_5_ap where  pro_name like '%$prov%'  and amp_name like '%$amphoe_name' and  year_pop =  $year   ; "); 
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
	<div class="col-md-12 ">
			<div class="x_panel">
				<div id="map" style="width: 100%; height: 550px;" ></div>
            </div>
	   </div>	
 				<div class="col-md-12">
					<h2 class="page-head-line">กราฟแสดงข้อมูลประชากร</h2>
					<div id="container"  style="width: 100%; height: 550px;"></div>
                </div>
                <div class="col-md-12">
				
					<table class="table table-striped table-hover ">
							<thead>
							    <tr>
							      <th width="70%"></th>
							      <th></th>
							    </tr>
							</thead>
						  <tbody>
							<tr>
							  <td>จำนวนประชากรทั้งหมด</td>
							  <td  style="text-align: center"><?php echo number_format($chart_index[p_mf_total]); ?> คน</td>
							</tr>
							<tr>
							  <td>ประชากรเพศชายทั้งหมด</td>
							  <td  style="text-align: center"><?php echo number_format($chart_index[p_m_total]); ?> คน</td>
							</tr>
							<tr>
							  <td>ประชากรเพศหญิงทั้งหมด</td>
							  <td  style="text-align: center"><?php echo number_format($chart_index[p_f_total]); ?> คน</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงอายุ 0 - 4 ปี </td>
							  <td  style="text-align: center"><?php echo round($chart_index[mf4] *100 / $chart_index[p_mf_total],2)  ; ?> %</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงอายุ 5 - 44 ปี </td>
							  <td  style="text-align: center"><?php echo round( ($chart_index[mf9] + $chart_index[mf14] + $chart_index[mf19] + $chart_index[mf24] + $chart_index[mf29] + $chart_index[mf34]  + $chart_index[mf39] + $chart_index[mf44]) * 100 / $chart_index[p_mf_total],2  ) ; ?> %</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงอายุ 45 เป็นต้นไป </td>
							  <td  style="text-align: center"><?php echo round( ($chart_index[mf49] + $chart_index[mf54] + $chart_index[mf59] + $chart_index[mf64] + $chart_index[mf69] + $chart_index[mf74]  + $chart_index[mf79] + $chart_index[mf84] + $chart_index[mf89] + $chart_index[mf94] + $chart_index[mf99] + $chart_index[mf100]) * 100 / $chart_index[p_mf_total],2  ) ; ?> %</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงวัยเด็ก (อายุต่ำกว่า 15 ปี) </td>
							  <td  style="text-align: center"><?php echo round( ($chart_index[mf4] + $chart_index[mf9] + $chart_index[mf14]) * 100 / $chart_index[p_mf_total],2  ) ; ?> %</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงวัยแรงงาน (อายุ 15 - 59 ปี) </td>
							  <td  style="text-align: center"><?php echo round( ($chart_index[mf19] + $chart_index[mf24] + $chart_index[mf29] + $chart_index[mf34]  + $chart_index[mf39] + $chart_index[mf44] + $chart_index[mf49] + $chart_index[mf54] + $chart_index[mf59]) * 100 / $chart_index[p_mf_total],2  ) ; ?> %</td>
							</tr>
							<tr>
							  <td>ร้อยละของประชากรที่อยู่ช่วงวัยสูงอายุ (60 ปี ขึ้นไป) </td>
							  <td  style="text-align: center"><?php echo round( ($chart_index[mf64] + $chart_index[mf69] + $chart_index[mf74]  + $chart_index[mf79] + $chart_index[mf84] + $chart_index[mf89] + $chart_index[mf94] + $chart_index[mf99] + $chart_index[mf100]) * 100 / $chart_index[p_mf_total],2  ) ; ?> %</td>
							</tr>
							<tr>
							  <td>ดัชนีผู้สูงอายุ</td>
							  <td  style="text-align: center"><?php echo  round( (($chart_index[mf64] + $chart_index[mf69] + $chart_index[mf74]  + $chart_index[mf79] + $chart_index[mf84] + $chart_index[mf89] + $chart_index[mf94] + $chart_index[mf99] + $chart_index[mf100]) * 100 / $chart_index[p_mf_total]) /  (($chart_index[mf4] + $chart_index[mf9] + $chart_index[mf14]) * 100 / $chart_index[p_mf_total]) *100, 2)   ; ?> %</td>
							</tr>
						  </tbody>
						</table> 

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
	



    <script>
        var categories = ['0-4', '5-9', '10-14', '15-19',
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-79', '80-84', '85-89', '90-94',
        '95-99', '100 + '];
$(document).ready(function () {
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value) ;
                }
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', อายุ ' + this.point.category + '</b><br/>' +
                    'จำนวน: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
            }
        },
        credits: {
            enabled: false
        },

        series: [{
            name: 'ชาย',
            data: [<?php echo -$chart_index[m4],' , ',-$chart_index[m9] ,' , ',-$chart_index[m14],' , ',-$chart_index[m19],' , ',-$chart_index[m24],' , ',-$chart_index[m29],' , ',-$chart_index[m34],' , ',-$chart_index[m39],' , ',-$chart_index[m44],' , ',-$chart_index[m49],' , ',-$chart_index[m54],' , ',-$chart_index[m59],' , ',-$chart_index[m64],' , ',-$chart_index[m69],' , ',-$chart_index[m74],' , ',-$chart_index[m79],' , ',-$chart_index[m84],' , ',-$chart_index[m89],' , ',-$chart_index[m94],' , ',-$chart_index[m99],' , ',-$chart_index[m100]  ; ?>]
        }, {
            name: 'หญิง',
            data: [<?php echo $chart_index[f4],' , ',$chart_index[f9] ,' , ',$chart_index[f14],' , ',$chart_index[f19],' , ',$chart_index[f24],' , ',$chart_index[f29],' , ',$chart_index[f34],' , ',$chart_index[f39],' , ',$chart_index[f44],' , ',$chart_index[f49],' , ',$chart_index[f54],' , ',$chart_index[f59],' , ',$chart_index[f64],' , ',$chart_index[f69],' , ',$chart_index[f74],' , ',$chart_index[f79],' , ',$chart_index[f84],' , ',$chart_index[f89],' , ',$chart_index[f94],' , ',$chart_index[f99],' , ',$chart_index[f100]  ; ?>]
        }]
    });
});
    </script>






	<script type="text/javascript">
    var statesData =    <?php
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

       $sql = "select *,ST_AsGeoJSON(geom) AS geojson from age_0_5_tm a inner join pop_plk40sim b on a.tam_code = b.tam_code where b.tam_name like '%$tambol_name' and  b.amp_name like '%$amphoe_name' and b.pro_name = 'พิษณุโลก' and a.year_pop = $year;";
   


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
            'value_sum' => $edge['p_mf_total'],
            'value' => number_format($edge['p_mf_total'])
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
    
 <?php   
if ($tambol_name != '') {
 	 $result5 = pg_query($db,"select *  from tambon_centroids where tb_tn like '%$tambol_name' and ap_tn like '%$amphoe_name' and pv_tn = 'พิษณุโลก' ; "); 
	$dd = pg_fetch_array($result5);
	$lat = $dd[tb_lat]; 
	$longi = $dd[tb_lon]; 
	$zoom = 11;

 }elseif ($amphoe_name != '') {

 	 $result5 = pg_query($db,"select *  from amphoe_centroids where ap_tn like '%$amphoe_name' and pv_tn = 'พิษณุโลก' ; "); 
	$dd = pg_fetch_array($result5);
	$lat = $dd[ap_lat]; 
	$longi = $dd[ap_lon]; 
	$zoom = 10;

 }elseif ($prov != '') {
 	$lat = 16.986083; 
	$longi = 100.556657;
	$zoom = 9;
 }else{
 	$lat = 16.986083; 
	$longi = 100.556657;
	$zoom = 9;
 }
?>

OpenStreetMap_BlackAndWhite.addTo(map);
map.setView([<?php echo $lat ?>, <?php echo $longi ?>], <?php echo $zoom ?>);
	
	

		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		
		info.update = function (props) {
			this._div.innerHTML = '<h3>แผนที่แสดงจำนวนประชากรปี <?php echo $year; ?></h3>' +  (props ?
				'<b><center>ต. ' + props.prov_nam_t + '</b><br />' + props.value + ' คน'
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
			 var popupContent =  feature.properties.value_sum  ;
            layer.bindPopup(popupContent);
             layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
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
