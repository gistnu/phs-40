<!DOCTYPE html>
<html>
<head><?php
include('config.php');

$lyrBase = $_GET['lyrBase'];
$lyrImagery = $_GET['lyrImagery'];
$lyrWater = $_GET['lyrWater'];
$lyrLand = $_GET['lyrLand'];
$lyrLandUse = $_GET['lyrLandUse'];
$lyrClimate = $_GET['lyrClimate'];
$lyrSoil = $_GET['lyrSoil'];
$lyrDisaster = $_GET['lyrDisaster'];
$lyrHealth = $_GET['lyrHealth'];
$amp = $_GET['amphoe_name'];
$tam = $_GET['tambon_name'];


?>
  <meta charset="utf-8">
  <title>พิษณุโลก 4.0 ระบบสนับสนุนการตัดสินใจรายครัวเรือน</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="css/normal.css">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" href="css/animation.css">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>



    <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
  <script>
    if (/mobile/i.test(navigator.userAgent)) document.documentElement.className += ' w-mobile';
  </script>
  <link rel="shortcut icon" type="image/x-icon" href="img/earth.png">



</head>
<body>
  <div class="fix-header" id="home">
    <div class="w-container">
      <div class="w-nav" data-collapse="medium" data-animation="default" data-duration="400"></div>
    </div>
  </div>
  <div class="fixed-header">
    <div class="w-container container">
      <div class="w-row">

       <!--///////////////////////////////////////////////////////
       // Logo section 
       //////////////////////////////////////////////////////////-->


        <div class="w-col w-col-3 logo">
          <a href="#"><img class="logo" src="http://www.cgistln.nu.ac.th/gistweb_2013/images/logo_gistv1.png" style=" margin-top: 10px;" ></a>
        </div>

        <!--///////////////////////////////////////////////////////
       // End Logo section 
       //////////////////////////////////////////////////////////-->

        <div class="w-col w-col-9">

       <!--///////////////////////////////////////////////////////
       // Menu section 
       //////////////////////////////////////////////////////////-->


          <div class="w-nav navbar" data-collapse="medium" data-animation="default" data-duration="400" data-contain="1">
            <div class="w-container nav">
              <nav class="w-nav-menu nav-menu" role="navigation">

                <a class="w-nav-link menu-li" href="" onclick="goBack()"><font color="Black">กลับหน้าแรก</font></a>
              </nav>

            </div>
          </div>


          <!--///////////////////////////////////////////////////////
       // End Menu section 
       //////////////////////////////////////////////////////////-->


        </div>
      </div>
    </div>
  </div>



  <!--///////////////////////////////////////////////////////
       //  Slider section 
       //////////////////////////////////////////////////////////-->


  <div class="slidersection">
    <div class="sp-slideshow">
        <div class="sp-content">
                <iframe name="my_iframe" src="plkmaps/mapquery.php?province2=65&amphoe2=<?php echo $amp;?>&tambon2=<?php echo $tam;?>&module=siteRegister&lyrAdmin=1<?php echo $lyrBase,$lyrImagery,$lyrWater,$lyrLand,$lyrLandUse,$lyrClimate,$lyrSoil,$lyrDisaster,$lyrHealth ; ?>" style="width: 100%; height: 650px" frameborder="0" scrolling="no" ></iframe>

        </div><!-- sp-content -->
        
      </div><!-- sp-slideshow -->
  </div>


<!--///////////////////////////////////////////////////////
       // End slider section 
       //////////////////////////////////////////////////////////-->



  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/normal.js"></script>
  <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="js/carousels.js"></script>
  <script type="text/javascript" src="js/slider-modernizr.js"></script>
  <script src="js/classie.js"></script>
  <script src="js/portfolio-effects.js"></script>
  <script src="js/toucheffects.js"></script>
  <script src="js/modernizr.js"></script>
  <script src="js/animation.js"></script>
<script>
function goBack() {
    window.history.back();
}
</script>  
</body>
</html>