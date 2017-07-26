<?php
include('config.php');


$prov_nam = $_POST['prov_nam'];
$amp_nam = $_POST['amp_nam'];
$tam_nam = $_POST['tam_nam'];
$name_house = $_POST['name_house'];
$no_house = $_POST['no_house'];
$moo_house = $_POST['moo_house'];
$id_house = $_POST['id_house'];
$lat = $_POST['lat'];
$longi = $_POST['longi'];


$objQuery = pg_query("INSERT INTO list_house2 (prov_nam, amp_nam, tam_nam, name_house, no_house, moo_house, id_house, lat, longi, geom) VALUES ('$prov_nam', '$amp_nam', '$tam_nam', '$name_house', '$no_house', '$moo_house', '$id_house', '$lat', '$longi', ST_GeomFromText('POINT($longi $lat)',4326));");

$db = NULL;

?>