<?php
include('../libs/config.php');
?>


<?php


$prov = พิษณุโลก;
$amphoe_name = $_GET[amphoe];
$tambol_name = $_GET[tambon];


$P_HT = $_GET[P_HT];
$P_DM = $_GET[P_DM];
$P_HF = $_GET[P_HF];
$P_COPD = $_GET[P_COPD];
$P_asthma = $_GET[P_asthma];
$P_TB = $_GET[P_TB];
$P_GC = $_GET[P_GC];
$P_CT = $_GET[P_CT];
$P_CA = $_GET[P_CA];
$P_BPH = $_GET[P_BPH];
$P_GI = $_GET[P_GI];
$P_Gas = $_GET[P_Gas];
$P_OA = $_GET[P_OA];
$P_Gout = $_GET[P_Gout];
$P_RHU = $_GET[P_RHU];
$P_PD = $_GET[P_PD];
$P_Pal = $_GET[P_Pal];
$P_AKD = $_GET[P_AKD];
$P_CKD = $_GET[P_CKD];
$P_AD = $_GET[P_AD];
$P_Bdsor = $_GET[P_Bdsor];
$P_Palli = $_GET[P_Palli];
$P_Dz = $_GET[P_Dz];


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
			height: 800px;
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




</head>
<body>

<img src="" width="100%">
	<div class="col-md-12 ">
		<div id="map" style="width: 100%;" ></div>
    </div>


	<script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>

   
    <!-- JAVASCRIPT AT THE BOTTOM TO REDUCE THE LOADING TIME  -->
    <!-- CORE JQUERY SCRIPTS -->
    <script src="assets/js/jquery-1.11.1.js"></script>
    <!-- BOOTSTRAP SCRIPTS  -->
    <script src="assets/js/bootstrap.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
<link rel="stylesheet" href="https://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://leaflet.github.io/Leaflet.markercluster/dist/MarkerCluster.Default.css" />
<script src="https://leaflet.github.io/Leaflet.markercluster/dist/leaflet.markercluster-src.js"></script>
	


	<script type="text/javascript">

	var map = L.map('map');
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


OpenStreetMap_BlackAndWhite.addTo(map);
map.setView([16.731580,100.235221],13);
	

	var markers = new L.MarkerClusterGroup();

 <?php

$result = pg_query($db4, "select * from elder_case where y_long is not null  and  ( P_HT like '$P_HT' or P_DM like '$P_DM' or P_HF like '$P_HF' or P_COPD like '$P_COPD' or P_asthma like '$P_asthma' or P_TB like '$P_TB' or P_GC like '$P_GC' or P_CT like '$P_CT' or P_CA like '$P_CA' or P_BPH like '$P_BPH' or P_GI like '$P_GI' or P_Gas like '$P_Gas' or P_OA like '$P_OA' or P_Gout like '$P_Gout' or P_RHU like '$P_RHU' or P_PD like '$P_PD' or P_Pal like '$P_Pal' or P_AKD like '$P_AKD' or P_CKD like '$P_CKD' or P_AD like '$P_AD' or P_Bdsor like '$P_Bdsor' or P_Palli like '$P_Palli' or P_Dz like '$P_Dz' ) ");
while ($arr = pg_fetch_array($result)) { ?>
	markers.addLayer(L.marker([<?php echo  $arr[y_long],',',$arr[x_lat];?>]).bindPopup("<?php echo "<table class='table table-striped table-hover'><tbody><tr><td>ชื่อ : </td><td>$arr[name_eld]</td></tr><tr><td>รหัสผู้สูงอายุ : </td><td>$arr[id_eld]</td></tr><tr><td>หมู่ : </td><td>$arr[moo]</td></tr><tr><td>บ้านเลขที่: </td><td>$arr[address]</td></tr><tr><td>จำนวนผู้สูงอายุในครอบครัว : </td><td>$arr[number_eld]</td></tr></tbody></table><table class='table table-striped table-hover'><tbody><tr><td>รูปผู้สูงอายุ : </td><td>บริเวณหน้าบ้าน</td></tr><tr><td><img src='assets/img/pic_elder/$arr[pic_eld].JPG' width='100%'></td><td><img src='assets/img/pic_elder/$arr[pic_home1].JPG' width='100%'></td></tr><tr><td>บริเวณด้านซ้ายของบ้าน</td><td>บริเวณด้านขวาของบ้าน</td></tr><tr><td><img src='assets/img/pic_elder/$arr[pic_home3].JPG' width='100%'></td><td><img src='assets/img/pic_elder/$arr[pic_home4].JPG' width='100%'></td></tr></tbody></table> " ?>") )

		
<?php } ?>


		

map.addLayer(markers);


	</script>
	
	



</body>
</html>
