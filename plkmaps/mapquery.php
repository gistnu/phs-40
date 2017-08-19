<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
	<title>PHS 4.0</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
	<!-- External lib: ExtJS -->
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" title="gray" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/xtheme-gray.css" />

	<!-- External lib: Proj4JS (reproject lib) -->
   	<!--script src="http://cdnjs.cloudflare.com/ajax/libs/proj4js/1.1.0/proj4js-compressed.js" type="text/javascript"></script-->
		<script type="text/javascript" src="resources/proj4js/lib/proj4js-compressed.js"></script>
		<script type="text/javascript" src="resources/proj4js/lib/defs/EPSG3857.js"></script>
		<script type="text/javascript" src="resources/proj4js/lib/defs/EPSG4326.js"></script>
		<script type="text/javascript" src="resources/proj4js/lib/defs/EPSG32647.js"></script>
	<!-- script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script -->
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyB2EX6KhAr-gvvFzBLpF4OZ1zY8edGyc1s"></script>

	<!-- External lib: OpenLayers -->
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/theme/default/style.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/OpenLayers.js"></script>

	<!-- External lib: GeoExt -->
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/geoext/1.1/script/GeoExt.js"></script>
	<script type="text/javascript" src="../heron-1.0.6/ux/gxp/gxp.js"></script>

	<!-- application -->
	<link rel="stylesheet" type="text/css" href="../heron-1.0.6/resources/css/default.css"/>
    <link rel="stylesheet" type="text/css" href="../heron-1.0.6/resources/css/default-theme-gray.css"/>
    <link rel="stylesheet" type="text/css" href="../heron-1.0.6/ux/gxp/git/src/theme/all.css"/>
	<link rel="stylesheet" type="text/css" href="../heron-1.0.6/resources/css/portal.css"/>
	<script type="text/javascript" src="../heron-1.0.6/lib/i18n/en_US.js"></script>
	<!--[if IE]>
	<link rel="stylesheet" type="text/css" href="../heron-1.0.3/resources/css/portal-ie.css"/>
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="resources/App.css"/>

</head>
<style type="text/css">
	.x-slider-vert, .x-slider-vert .x-slider-end, .x-slider-vert .x-slider-inner {
		display: none;
	};
	.element.style {
		width: auto;
	}
	.x-btn .icon-chartbar {
    background-image: url("cwr.png") !important;
	}
	.icon-chartbar {
	    background: url("cwr.png") no-repeat 0 0 !important;
	    margin: 0 !important;
	    width: 30px !important;
	    height: 16px !important;
	}

</style>
<body>
<?php

$setDefault = '<script>var center = "11140015,1901789";
		var zoom = 8;
		var filter_pro = null;
		var filter_amp = null;
		var filter_tam = null;
		var lyrvisible_pro = true;
		var lyrvisible_amp = true;
		var lyrvisible_tam = true;
		var lyrvisible_vill = true;
		var lyrvisible_alr = true; </script>';

include "../../libs/sel_config.php";
conndb();

function getdat($getVal, $getFiedlName) {
    $getsql = '';
    if (strlen($getVal) == 2) {
        $getsql = "SELECT prov_nam_t as n, st_x(st_transform(st_centroid(geom),3857)) as x, st_y(st_transform(st_centroid(geom),3857)) as y, ST_Extent(geom) as b FROM ln9p_prov WHERE prov_code = '$getVal' group by n,x,y";
        $row = pg_fetch_array(pg_query($getsql));
        $sendname = $row[$getFiedlName];
        return $sendname;
    }
    elseif(strlen($getVal) == 4) {
        $getsql = "SELECT amp_nam_t as n, st_x(st_transform(st_centroid(geom),3857)) as x, st_y(st_transform(st_centroid(geom),3857)) as y, ST_Extent(geom) as b FROM ln9p_amp WHERE amp_code = '$getVal' group by n,x,y";
        $row = pg_fetch_array(pg_query($getsql));
        $sendname = $row[$getFiedlName];
        return $sendname;
    }
    elseif(strlen($getVal) == 6) {
        $getsql = "SELECT tam_nam_t as n, st_x(st_transform(st_centroid(geom),3857)) as x, st_y(st_transform(st_centroid(geom),3857)) as y, ST_Extent(geom) as b FROM ln9p_tam WHERE tam_code = '$getVal' group by n,x,y";
        $row = pg_fetch_array(pg_query($getsql));
        $sendname = $row[$getFiedlName];
        return $sendname;
    }
};

function getbound($fetArr) {
    $arr = preg_split('/[\s,()]+/', $fetArr);
    $xyMin = $arr[1].','.$arr[2];
    $xyMax = $arr[3].','.$arr[4];
    $bbox = array($xyMin, $xyMax);
    return $bbox;
};

function dataLoad($prov_id, $amp_id, $tam_id){
    $prov_n = getdat($prov_id, 'n');
    $prov_x = getdat($prov_id, 'x');
    $prov_y = getdat($prov_id, 'y');
    $prov_b = getdat($prov_id, 'b');
    $prov_bb = getbound(getdat($prov_id, 'b'));

    $amp_n = getdat($amp_id, 'n');
    $amp_x = getdat($amp_id, 'x');
    $amp_y = getdat($amp_id, 'y');
    //$amp_bb = getbound(getdat('amp_4326','amp_nam_t', 'amp_code',$amp_id,'b'));

    $tam_n = getdat($tam_id, 'n');
    $tam_x = getdat($tam_id, 'x');
    $tam_y = getdat($tam_id, 'y');
    //$tam_bb = getbound(getdat('tam_4326','tam_nam_t', 'tam_code',$tam_id,'b'));

    //echo $prov_n.'-'.$prov_x.'-'.$prov_y.'-'.$prov_b.'-'.$prov_bb[0].'-'.$prov_bb[1];

    //echo '<script>var selectSource = "http://map.nu.ac.th/gs-alr2/ows?";</script>';
    // select area
    if ($tam_id > 0) {
        echo "<script>var queryTool='query_test3.php?pro=$prov_id&amp=$amp_id&tam=$tam_id'</script>";
        echo "<script>var queryLu='query_lu.php?pro=$prov_id&amp=$amp_id&tam=$tam_id'</script>";

        echo '<script>var filter_pro = "prov_code='.$prov_id.'";</script>';
        echo '<script>var filter_amp = "amp_code='.$amp_id.'";</script>';
        echo '<script>var filter_tam = "tam_code='.$tam_id.'";</script>';
        echo '<script>var center = "'.$tam_x.','.$tam_y.'";</script>';
        echo '<script>var zoom = 12;</script>';
        echo '<script>var lyrvisible_pro = false;</script>';
        echo '<script>var lyrvisible_amp = false;</script>';
        echo '<script>var lyrvisible_tam = true;</script>';
        echo '<script>var lyrvisible_vill = true;</script>';
        echo '<script>var lyrvisible_alr = true;</script>';
    }
    elseif($amp_id > 0) {
        echo "<script>var queryTool='query_test3.php?pro=$prov_id&amp=$amp_id'</script>";
        echo "<script>var queryLu='query_lu.php?pro=$prov_id&amp=$amp_id'</script>";

        echo '<script>var filter_pro = "prov_code='.$prov_id.'";</script>';
        echo '<script>var filter_amp = "amp_code='.$amp_id.'";</script>';
        echo '<script>var filter_tam = "amp_code='.$amp_id.'";</script>';
        echo '<script>var center = "'.$amp_x.','.$amp_y.'";</script>';
        echo '<script>var zoom = 11;</script>';
        echo '<script>var lyrvisible_pro = false;</script>';
        echo '<script>var lyrvisible_amp = true;</script>';
        echo '<script>var lyrvisible_tam = false;</script>';
        echo '<script>var lyrvisible_vill = true;</script>';
        echo '<script>var lyrvisible_alr = true;</script>';
    }
    elseif($prov_id > 0) {
        echo "<script>var queryTool='query_test3.php?pro=$prov_id'</script>";
        echo "<script>var queryLu='query_lu.php?pro=$prov_id'</script>";
        echo '<script>var filter_pro = "prov_code='.$prov_id.'";</script>';
        echo '<script>var filter_amp = "prov_code='.$prov_id.'";</script>';
        echo '<script>var filter_tam = "prov_code='.$prov_id.'";</script>';
        echo '<script>var center = "'.$prov_x.','.$prov_y.'";</script>';
        echo '<script>var zoom = 9;</script>';
        echo '<script>var lyrvisible_pro = true;</script>';
        echo '<script>var lyrvisible_amp = false;</script>';
        echo '<script>var lyrvisible_tam = false;</script>';
        echo '<script>var lyrvisible_vill = true;</script>';
        echo '<script>var lyrvisible_alr = true;</script>';
    } else {
        echo $setDefault;
    }
};

if (!isset($_GET) || empty($_GET)) {
    echo $setDefault;
}else{
	foreach($_GET as $key => $value) {
    	if($key == 'province'){

            if($value==0){
                echo $setDefault;
            }else{
                $prov_id = $_GET['province'];
                $amp_id = $_GET['amphoe'];
                $tam_id = $_GET['tambon'];
                //echo "$key: $value<br/>";
                dataLoad($prov_id,$amp_id,$tam_id);
            }

    	}elseif($key == 'province2'){

            if($value==0){
                echo $setDefault;
            }else{
                $prov_id = $_GET['province2'];
                $amp_id = $_GET['amphoe2'];
                $tam_id = $_GET['tambon2'];
                //echo "$key: $value<br/>";
                dataLoad($prov_id,$amp_id,$tam_id);
            }
    	}
	}
};

echo '<script>var mapLayer = [];</script>';
foreach($_GET as $key => $value) {
    //echo "$key: $value<br/>";
    if ($key == 'lyrPlace') {
        echo "<script>mapLayer.push('lyrPlace');</script>";
    }
    elseif($key == 'lyrAdmin') {
        echo "<script>mapLayer.push('lyrAdmin');</script>";
    }
    elseif($key == 'lyrBase') {
        echo "<script>mapLayer.push('lyrBase');</script>";
    }
	elseif($key == 'lyrImagery') {
        echo "<script>mapLayer.push('lyrImagery');</script>";
    }	
	elseif($key == 'lyrHealth') {
        echo "<script>mapLayer.push('lyrHealth');</script>";
    }	
    elseif($key == 'lyrWater') {
        echo "<script>mapLayer.push('lyrWater');</script>";
    }
    elseif($key == 'lyrSoil') {
        echo "<script>mapLayer.push('lyrSoil');</script>";
    }
    elseif($key == 'lyrLandUse') {
        echo "<script>mapLayer.push('lyrLandUse');</script>";
    }	
    elseif($key == 'lyrDisaster') {
        echo "<script>mapLayer.push('lyrDisaster');</script>";
    }
	elseif($key == 'lyrClimate') {
		echo "<script>mapLayer.push('lyrClimate');</script>";
	}
	elseif($key == 'lyrLand') {
		echo "<script>mapLayer.push('lyrLand');</script>";
	}
	elseif($key == 'lyrForest') {
		echo "<script>mapLayer.push('lyrForest');</script>";
	}
	elseif($key == 'lyrTerain') {
		echo "<script>mapLayer.push('lyrTerain');</script>";
	}
		///end
    elseif($key == 'module') {
        echo "<script>var module = '".$value."';</script>";
    }
};
closedb();
?>

<script type="text/javascript" src="Heron-alr.js"></script>
<script type="text/javascript" src="layersQuery.js"></script>
<script type="text/javascript" src="plugin.js"></script>
<script type="text/javascript" src="field.js"></script>
<script type="text/javascript" src="layoutQuery.js"></script>

</html>
