<!DOCTYPE html>
<html lang="en">
  <head>

  <?php
include('config.php');


$prov = $_GET['prov_name'];
$amp = $_GET['amphoe_name'];
$tam = $_GET['tambon_name'];

?>
    <meta charset="utf-8">
    <title>Leaflet Users Map</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <!-- Le styles -->
    <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Norican">
    <link type="text/css" rel="stylesheet" href="assets/bootstrap/css/bootstrap.css">
    <link type="text/css" rel="stylesheet" href="assets/leaflet/leaflet.css" />
    <!--[if lte IE 8]><link type="text/css" rel="stylesheet" href="assets/leaflet/leaflet.ie.css" /><![endif]-->
    <link type="text/css" rel="stylesheet" href="assets/leaflet/plugins/leaflet.markercluster/MarkerCluster.css" />
    <link type="text/css" rel="stylesheet" href="assets/leaflet/plugins/leaflet.markercluster/MarkerCluster.Default.css" />
    <style type="text/css">
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        overflow:hidden;
      }
      #map {
        margin-top:40px;
        width:100%;
        height:100%;
      }
      #loading {
        position: absolute;
        width: 220px;
        height: 19px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -110px;
        z-index: 20001;
      }
      #loading .loading-indicator {
        height: auto;
        margin: 0;
      }
      .navbar .brand {
        font-size: 25px;
        font-family: 'Norican', serif;
        font-weight: bold;
        color: white;
      }
      .navbar .nav > li > a {
        padding: 13px 10px 11px;
      }
      .navbar .btn, .navbar .btn-group {
        margin-top: 8px;
      }
      .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        background: #f7f7f7;
      }
      .leaflet-control-geoloc {
        background-image: url(img/location.png);
        -webkit-border-radius: 5px 5px 5px 5px;
        border-radius: 5px 5px 5px 5px;
      }
    </style>





  </head>

  <body>



    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <div class="nav-collapse">
            <form class="navbar-form pull-left">
               <span style="padding-left: 20px;"><a class='btn btn-primary ' data-toggle="modal" href="#addmeModal"><i class="icon-plus-sign icon-white"></i> เพิ่มตำแหน่งบ้าน</a></span>
            </form>
          </div>
        </div>
      </div>
    </div>



    <div class="modal hide fade" id="addmeModal">
      <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>เพิ่มตำแหน่งบ้านลงบนแผนที่!</h3>
      </div>
      <div class="modal-body">
        <p>เลื่อนเมาส์ไปยังตำแหน่งหลังคาบ้าน</p>
        <p>กรอกข้อมูลพื้นฐานครัวเรือนตามจริง</p>
      </div>
      <div class="modal-footer">
        <a href="#" onclick="$('#addmeModal').modal('hide'); initRegistration(); return false;"class="btn btn-primary">เริ่ม!</a>
      </div>
    </div>

    <div class="modal hide fade" id="insertSuccessModal">
      <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>Success!</h3>
      </div>
      <div class="modal-body">
        <p>Thanks for joining the Leaflet Users Map!</p>
        <p>You should receive an email shortly with instructions on how to edit your information.</p>
      </div>
    </div>


    <div class="modal hide fade" id="removeSuccessModal">
      <div class="modal-header">
        <a class="close" data-dismiss="modal">×</a>
        <h3>You have been removed</h3>
      </div>
      <div class="modal-body">
        <p>You have been removed from the Leaflet User Map.</p>
        <p>Thanks for your interest and feel free to add youself back at any time.</p>
      </div>
    </div>

    <div id="map"></div>
    <div id="loading-mask" class="modal-backdrop" style="display:none;"></div>
    <div id="loading" style="display:none;">
        <div class="loading-indicator">
            <img src="img/ajax-loader.gif">
        </div>
    </div>

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="assets/leaflet/leaflet.js"></script>
    <script type="text/javascript" src="assets/leaflet/plugins/leaflet.markercluster/leaflet.markercluster.js"></script>
    <script type="text/javascript" src="http://calvinmetcalf.github.io/leaflet-ajax/example/leaflet-src.js"></script>
    <script type="text/javascript" src="http://calvinmetcalf.github.io/leaflet-ajax/dist/leaflet.ajax.js"></script>
    <script type="text/javascript" src="http://calvinmetcalf.github.io/leaflet-ajax/example/spin.js"></script>
    <script type="text/javascript" src="http://calvinmetcalf.github.io/leaflet-ajax/example/leaflet.spin.js"></script>

    <script type="text/javascript">



    <?php
  $lat = 14.391688;
  $longi = 101.137494;
  $zoom = 6;
if ($prov != ''  and  $amp == '') {
  $result = pg_query( "select * from province_centroids where pv_tn like '%$prov'");
  $arr = pg_fetch_array($result);
  $lat = $arr[pv_lat];
  $longi =  $arr[pv_lon];
  $zoom = 10;
}elseif ( $prov != '' and  $amp != '' and  $tam == '') {
  $result = pg_query( "select * from amphoe_centroids where ap_tn like '%$amp'");
  $arr = pg_fetch_array($result);
  $lat = $arr[ap_lat];
  $longi =  $arr[ap_lon];
  $zoom = 13;
}elseif ( $prov != '' and  $amp != '' and  $tam != '') {
  $result = pg_query( "select * from tambon_centroids where tb_tn like '%$tam'");
  $arr = pg_fetch_array($result);
  $lat = $arr[tb_lat];
  $longi =  $arr[tb_lon];
  $zoom = 16;
}



 ?> 


      var map, newUser, users, mapquest, firstLoad;

      firstLoad = true;

      users = new L.FeatureGroup();
      //users = new L.MarkerClusterGroup({spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true});
      newUser = new L.LayerGroup();

      mapquest = new L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

      map = new L.Map('map', {
        center: new L.LatLng(16.986083, 100.556657),
        zoom: 9,
        layers: [mapquest, users, newUser]
      });
	  



var geojson_layer = new L.GeoJSON.AJAX("select_point.php", { onEachFeature: onEachFeature}).addTo(map);


    function onEachFeature(feature, layer) {
      layer.bindPopup('จังหวัด : '+ feature.properties.prov_nam  + '<br>' + 'อำเภอ : '+ feature.properties.amp_nam + '<br>' + 'ตำบล : '+ feature.properties.tam_nam + '<br>' + 'ชื่อหมู่บ้าน : '+ feature.properties.name_house + '<br>' + 'บ้านเลขที่ : '+ feature.properties.no_house +'<br>' + 'หมู่ที่ : '+ feature.properties.moo_house +'<br>' +'รหัสบ้าน : ' + feature.properties.id_house + '<br>' );
    }





      // GeoLocation Control

      geolocControl.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-control');
        div.innerHTML = '<a class="leaflet-control-geoloc" href="#" onclick="geoLocate(); return false;" title="My location"></a>';
        return div;
      };
      
      map.addControl(geolocControl);
      map.addControl(new L.Control.Scale());

      //map.locate({setView: true, maxZoom: 3});

      $(document).ready(function() {
        $.ajaxSetup({cache:false});
        $('#map').css('height', ($(window).height() - 40));
        getUsers();
      });

      $(window).resize(function () {
        $('#map').css('height', ($(window).height() - 40));
      }).resize();

      function geoLocate() {
        map.locate({setView: true, maxZoom: 17});
      }

      function initRegistration() {
        map.addEventListener('click', onMapClick);
        $('#map').css('cursor', 'crosshair');
        return false;
      }

      function cancelRegistration() {
        newUser.clearLayers();
        $('#map').css('cursor', '');
        map.removeEventListener('click', onMapClick);
      }
  
    

      function insertUser() {
        $("#loading-mask").show();
        $("#loading").show();
        var prov_nam = $("#prov_nam").val();
        var amp_nam = $("#amp_nam").val();
        var tam_nam = $("#tam_nam").val();
        var name_house = $("#name_house").val();
        var no_house = $("#no_house").val();
        var moo_house = $("#moo_house").val();
        var id_house = $("#id_house").val();
        var lat = $("#lat").val();
        var longi = $("#longi").val();
        var dataString = 'prov_nam='+ prov_nam + '&amp_nam=' + amp_nam + '&tam_nam=' + tam_nam + '&name_house=' + name_house + '&no_house=' + no_house + '&moo_house=' + moo_house + '&id_house=' + id_house + '&lat=' + lat + '&longi=' + longi;
        $.ajax({
          type: "POST",
          url: "insert_user.php",
          data: dataString,
          success: function() {
            cancelRegistration();
            $("#loading-mask").hide();
            $("#loading").hide();
            $('#insertSuccessModal').modal('show');
            geojson_layer.refresh();
          },
          error:function() {
            ('#removemeModal').modal('show');
          }

        });
        return false;
      }



      function onMapClick(e) {
        var markerLocation = new L.LatLng(e.latlng.lat, e.latlng.lng);
        var marker = new L.Marker(markerLocation);
        newUser.clearLayers();
        newUser.addLayer(marker);
        var form =  '<form id="inputform"  method="post" enctype="multipart/form-data" class="well">'+
              '<label><strong>จังหวัด:</strong> </label>'+
              '<input type="text" class="span3" placeholder="" id="prov_nam"  name="prov_nam" value="<?php echo $prov; ?>" />'+
              '<label><strong>อำเภอ:</strong> </label>'+
              '<input type="text" class="span3" placeholder="" id="amp_nam"  name="amp_nam" value="<?php echo $amp; ?>"  />'+
              '<label><strong>ตำบล:</strong></label>'+
              '<input type="text" class="span3" placeholder="" id="tam_nam"  name="tam_nam" value="<?php echo $tam; ?>"  />'+
              '<label><strong>ชื่อหมู่บ้าน:</strong></label>'+
              '<input type="text" class="span3" placeholder=""  id="name_house" name="name_house"  />'+
              '<label><strong>บ้านเลขที่:</strong></label>'+
              '<input type="text" class="span3" placeholder="" id="no_house"  name="no_house"/>'+
              '<label><strong>หมู่ที่:</strong></label>'+
              '<input type="text" class="span3" placeholder="" id="moo_house"  name="moo_house"  />'+
              '<label><strong>รหัสบ้าน:</strong></label>'+
              '<input type="number" class="span3" placeholder="" id="id_house"  name="id_house" />'+

              '<input style="display: none;" type="text" id="lat" name="lat" value="'+e.latlng.lat.toFixed(6)+'" />'+
              '<input style="display: none;" type="text" id="longi" name="longi" value="'+e.latlng.lng.toFixed(6)+'" /><br><br>'+
              '<div class="row-fluid">'+
                '<div class="span6" style="text-align:center;"><button type="button" class="btn" onclick="cancelRegistration()">ยกเลิก</button></div>'+
                '<div class="span6" style="text-align:center;"><button type="button" class="btn btn-primary" onclick="insertUser()">ยืนยัน</button></div>'+
              '</div>'+
              '</form>';
        marker.bindPopup(form).openPopup();
      }
    </script>

  </body>
</html>
