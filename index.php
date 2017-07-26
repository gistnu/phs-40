<!DOCTYPE html>
<html>
<head>


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



<script language=Javascript>
        function Inint_AJAX() {
           try { return new ActiveXObject("Msxml2.XMLHTTP");  } catch(e) {} 
           try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {} 
           try { return new XMLHttpRequest();          } catch(e) {}
           alert("XMLHttpRequest not supported");
           return null;
        };

        function dochange(src, val) {
             var req = Inint_AJAX();
             req.onreadystatechange = function () { 
                  if (req.readyState==4) {
                       if (req.status==200) {
                            document.getElementById(src).innerHTML=req.responseText; 
                       } 
                  }
             };
             req.open("GET", "location.php?data="+src+"&val="+val); 
             req.send(null); 
        }
 
        window.onLoad=dochange('amphoe_name', -1);    
        window.onLoad=dochange('amphoe_name2', -1);     
    </script>



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
           
              <div class="w-nav-button">
                <div class="w-icon-nav-menu"></div>
              </div>
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
        <div class="">
      <div class="w-container">
        <div id="">
        <div class="wrap">
          <div class="w-row exp-des">
            <div class="w-col w-col-6 exp-col1">
              <div class="col1-div">
                <div class="experinc-box">
                <h3 class="experinc-box-h3">พิษณุโลก 4.0 </h3>
                    <p><h3><font color="white">ระบบสนับสนุนการตัดสินใจรายครัวเรือน</font></h3></p>
                <div class="buttons">
                <div class="btn-ex-two">
                   <a class="ex-btn-two" href="#pop">เข้าใช้งาน</a>
                </div>
              </div>
              </div>
              </div>
            </div>
            <div class="w-col w-col-6 exp-col2">
              <div class="col2-div">
                <img src="images/kauai.png" width="100%">
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
        </div><!-- sp-content -->
        
      </div><!-- sp-slideshow -->
  </div>


<!--///////////////////////////////////////////////////////
       // End slider section 
       //////////////////////////////////////////////////////////-->








<!--///////////////////////////////////////////////////////
       // Service section 
       //////////////////////////////////////////////////////////-->


  <section class="service-parlex" id="pop">
    <section class="parlex-back">
      <div class="w-container">
        <div class="wrap">
          <div class="service-combo">
            <div class="services">
              <h1 class="service-heading">ข้อมูลพิษณุโลก</h1>
              <div class="sepreater service"></div>
            </div>
            <div class="w-row">


            <ul class="nav nav-tabs">
              <li  class="active"><a data-toggle="tab"   href="#menu1">ข้อมูลภูมิสารสนเทศออนไลน์</a></li>
              <li><a data-toggle="tab"  href="#menu2">ข้อมูลประชากรพิษณุโลก</a></li>
              <li><a data-toggle="tab"  href="#menu3">เพิ่มตำแหน่งครัวเรือน</a></li>
            </ul><hr>
            <div class="tab-content">
                <div id="menu1" class="tab-pane fade in active">
                      <div class="form-group">
<form action="map_q.php" method="get" >
                      <div class="col-lg-12">


                          <div class="col-lg-5">
                           <span id="amphoe_name">
                                        <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                            <option value='0'>- เลือกอำเภอ -</option>
                                        </select>
                                    </span>
                          </div>
                          <div class="col-lg-5">
                           <span id="tambon_name">
                                        <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                          <option value='0'>- เลือกตำบล -</option>
                                        </select>
                                    </span>
                        </div>



                      </div>

                      <div class="col-lg-12">
                       <div class="container">

                                            <div class="col-xs-6 col-md-3">
                                                <input type="hidden" name="module" value="siteRegister">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrBase" value="&lyrBase=1" checked ><font color="white" >กลุ่มข้อมูลพื้นฐาน </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox"  name="lyrImagery" value="&lyrImagery=1"><font color="white">กลุ่มข้อมูลภาพถ่ายทางอากาศและภาพจากดาวเทียม </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox"  name="lyrWater" value="&lyrWater=1"><font color="white">กลุ่มข้อมูลทรัพยากรน้ำ </font></label>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrLand" value="&lyrLand=1"><font color="white">กลุ่มข้อมูลที่ดิน </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrLandUse" value="&lyrLandUse=1"><font color="white">กลุ่มข้อมูลการใช้ที่ดิน </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrClimate" value="&lyrClimate=1"><font color="white">กลุ่มข้อมูลภูมิอากาศ </font></label>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-md-3">
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrSoil" value="&lyrSoil=1"><font color="white">กลุ่มข้อมูลเกษตรกรรม </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrDisaster" value="&lyrDisaster=1"><font color="white">กลุ่มข้อมูลภัยธรรมชาติ </font></label>
                                                </div>
                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="lyrHealth" value="&lyrHealth=1"><font color="white">กลุ่มข้อมูลภัยสุขภาพ </font></label>
                                                </div>
                                            </div>
                                        </div>


                      </div>
                      <div class="col-lg-12">
                          <button type="submit" class="btn btn-success">ค้นหา</button>
                      </div>

</form>




                     

                     </div>
                </div>

                <div id="menu2" class="tab-pane fade">
             
                      <div class="col-lg-12">

<form action="map_pop.php" method="get" target="my_iframe3" >
                          <div class="col-lg-10">
                           <span id="amphoe_name2">
                                        <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                            <option value='0'>- เลือกอำเภอ -</option>
                                        </select>
                                    </span>
                          </div>
                          <div class="col-lg-2">
                            <button type="submit" class="btn btn-success">ค้นหา</button>
                          </div>
</form>

                      </div>
                      <iframe name="my_iframe3" src="map_pop.php" style="width: 100%; height: 1600px" frameborder="0" scrolling="no"></iframe>
                </div>

                <div id="menu3" class="tab-pane fade">
                    <iframe name="my_iframe" src="add_map.php" style="width: 100%; height: 550px" frameborder="0" scrolling="no" ></iframe>
                </div>

              </div>

             

          </div>
        </div>
      </div>
    </section>
  </section>

<!--///////////////////////////////////////////////////////
       // End Service section 
       //////////////////////////////////////////////////////////-->









<!--///////////////////////////////////////////////////////
       // Footer section 
       //////////////////////////////////////////////////////////-->  

  <div class="footer-parlex">
    <div class="parlex9-back">

      <div class="w-container">
        <div class="wrap">
          <img class="footer-logo" src="images/logo.png" width="20%">
          <div>
            <div class="fotter-text"><p class="fotter-quote">“ Regional Center of Geo-Informatics and Space Technology, Lower Northern Region,
Naresuan University”</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>

       <!--///////////////////////////////////////////////////////
       // End Footer section 
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

</body>
</html>