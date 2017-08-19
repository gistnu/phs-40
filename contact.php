<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="assets/img/logo_phitsanulok.gif">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>พิษณุโลก 4.0 ระบบสนุบสนุนการตัดสินใจรายครัวเรือน</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />


    <!-- Bootstrap core CSS     -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Animation library for notifications   -->
    <link href="assets/css/animate.min.css" rel="stylesheet"/>

    <!--  Light Bootstrap Table core CSS    -->
    <link href="assets/css/light-bootstrap-dashboard.css" rel="stylesheet"/>


    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="assets/css/demo.css" rel="stylesheet" />


    <!--     Fonts and icons     -->
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
    <link href="assets/css/pe-icon-7-stroke.css" rel="stylesheet" />
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
    </script>
</head>
<body>

<div class="wrapper">
    <div class="sidebar"  data-image="assets/img/sidebar-1.jpg">

    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->

    	<div class="sidebar-wrapper">
            <div class="logo">
                <a href="http://www2.cgistln.nu.ac.th/phs40/index.php" class="simple-text">
                    <img src="assets/img/logo_gist_260px_white.png" width="80%" alt="">
                </a>
            </div>

            <ul class="nav">
                <li>
                    <a href="index.php">
                        <i class="pe-7s-home"></i>
                        <p>หน้าแรก</p>
                    </a>
                </li>
                <li>
                    <a href="gis_phs.php">
                        <i class="pe-7s-map-2"></i>
                        <p>ข้อมูลภูมิสารสนเทศ</p>
                    </a>
                </li>
                <li>
                    <a href="add_point.php">
                        <i class="pe-7s-map-marker"></i>
                        <p>เพิ่มตำแหน่งครัวเรือน</p>
                    </a>
                </li>
                <li>
                    <a href="pop_phs.php">
                        <i class="pe-7s-note2"></i>
                        <p>ประชากร</p>
                    </a>
                </li>
                <li>
                    <a href="elders.php">
                        <i class="pe-7s-users"></i>
                        <p>ผู้สูงอายุ</p>
                    </a>
                </li>
                <li>
                    <a href="dengue.php">
                        <i class="pe-7s-radio"></i>
                        <p>สถานการณ์ไข้เลือดออก</p>
                    </a>
                </li>
                <li>
                    <a href="rain_phs.php">
                        <i class="pe-7s-umbrella"></i>
                        <p>สถานการณ์น้ำฝน</p>
                    </a>
                </li>
                <li>
                    <a href="fire_phs.php">
                        <i class="pe-7s-speaker"></i>
                        <p>สถานการณ์ไฟป่า</p>
                    </a>
                </li>
                <li class="active-pro">
                    <a href="contact.php">
                        <i class="pe-7s-user"></i>
                        <p>ติดต่อหน่วยงาน</p>
                    </a>
                </li>
            </ul>
    	</div>
    </div>

    <div class="main-panel">
        <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse">
                </div>
            </div>
        </nav>


        <div class="content">
            <div class="container-fluid">
                <div class="row">

                    <div class="col-md-7">
                        <div class="card">
                            <div class="content">
                                <div class="row">
                                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.1348726358638!2d100.19216939705213!3d16.741998267646192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30dfbea2ae8ac66d%3A0xbd6f8f18a85e7f27!2z4Liq4LiW4Liy4LiZ4Lig4Li54Lih4Li04Lig4Liy4LiE4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lit4Lin4LiB4Liy4Lio4LmB4Lil4Liw4Lig4Li54Lih4Li04Liq4Liy4Lij4Liq4LiZ4LmA4LiX4LioIOC4oOC4suC4hOC5gOC4q-C4meC4t-C4reC4leC4reC4meC4peC5iOC4suC4hw!5e1!3m2!1sen!2sth!4v1502251658090" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-5">
                        <div class="card card-user">
                            <div class="image">
                                <img src="http://www.cgistln.nu.ac.th/cgistln/wp-content/uploads/2017/04/00002.jpg" alt="..."/>
                            </div>
                            <div class="content">
                                <div class="author">
                                     <a href="#">
                                    <img  src="http://www.cgistln.nu.ac.th/gistweb_2013/images/logo_gistv1.png" width="50%">

                                      <h5 class="title">สถานภูมิภาคเทคโนโลยีอวกาศและภูมิสารสนเทศ ภาคเหนือตอนล่าง มหาวิทยาลัยนเรศวร<br />
                                         <small>Regional Center of Geo-Informatics and Space Technology, Lower Northern Region,
Naresuan University</small>
                                      </h5>
                                    </a>
                                </div>
                                <p class="description text-center"><hr> ที่ตั้ง<br>
                                                    ชั้น 4 ตึก A อาคารมหาธรรมราชา มหาวิทยาลัยนเรศวร อำเภอเมือง จังหวัดพิษณุโลก 65000<br>
                                                    <hr>โทรศัพท์ 055-968707<br>
                                                    โทรสาร  055-968807<br>
                                                    E-Mail :  cgistln@nu.ac.th
                                </p>
                            </div>
                            <hr>
                            <div class="text-center">
                                <a href="https://www.facebook.com/Gistlnnu" class="btn btn-simple"><i class="fa fa-facebook-square"></i></a>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>


        <footer class="footer">
            <div class="container-fluid">
                <p class="copyright pull-right">
                    &copy; 2017 <a href="http://www.cgistln.nu.ac.th/">GISTNU, </a> Regional Center of Geo-Informatics and Space Technology, Lower Northern Region, Naresuan University
                </p>
            </div>
        </footer>

    </div>
</div>


</body>

    <!--   Core JS Files   -->
    <script src="assets/js/jquery-1.10.2.js" type="text/javascript"></script>
	<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>

	<!--  Checkbox, Radio & Switch Plugins -->
	<script src="assets/js/bootstrap-checkbox-radio-switch.js"></script>

	<!--  Charts Plugin -->
	<script src="assets/js/chartist.min.js"></script>

    <!--  Notifications Plugin    -->
    <script src="assets/js/bootstrap-notify.js"></script>


    <!-- Light Bootstrap Table Core javascript and methods for Demo purpose -->
	<script src="assets/js/light-bootstrap-dashboard.js"></script>

	<!-- Light Bootstrap Table DEMO methods, don't include it in your project! -->
	<script src="assets/js/demo.js"></script>


</html>
