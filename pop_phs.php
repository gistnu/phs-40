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
        window.onLoad=dochange('amphoe_name2', -1);    
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
                <li class="active">
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
                    <div class="col-md-12">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">เลือกข้อมูลภูมิสารสนเทศ</h4>
                            </div>
                            <div class="content">
                                <div class="row">
                                <form action="map_pop.php" target="my_iframe3" method="get">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                 <span id="amphoe_name">
                                                    <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                                        <option value='0'>- เลือกอำเภอ -</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                    <span id="tambon_name">
                                                        <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                                          <option value='0'>- เลือกตำบล -</option>
                                                        </select>
                                                    </span>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <select name="year" id="" class="form-control" >
                                                    <option value="2559">2559</option>
                                                    <option value="2558">2558</option>
                                                    <option value="2557">2557</option>
                                                    <option value="2556">2556</option>
                                                    <option value="2555">2555</option>
                                                    <option value="2554">2554</option>
                                                    <option value="2553">2553</option>
                                                    <option value="2552">2552</option>
                                                    <option value="2551">2551</option>
                                                    <option value="2550">2550</option>
                                                    <option value="2549">2549</option>
                                                    <option value="2548">2548</option>
                                                    <option value="2547">2547</option>
                                                    <option value="2546">2546</option>
                                                    <option value="2545">2545</option>
                                                    <option value="2544">2544</option>
                                                    <option value="2543">2543</option>
                                                    <option value="2542">2542</option>
                                                    <option value="2541">2541</option>
                                                    <option value="2540">2540</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-primary  btn-fill ">ค้นหา</button>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="form-group">
                                                <a data-toggle="collapse" data-target="#compare_pop" class="btn btn-success">ดูข้อมูลเปรียบเทียบ</a>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div id="compare_pop" class="collapse">

                                             <div class="col-md-3">
                                            <div class="form-group">
                                                 <span id="amphoe_name2">
                                                    <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                                        <option value='0'>- เลือกอำเภอ -</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                    <span id="tambon_name2">
                                                        <select class="form-control" id="select" data-cip-id="cIPJQ342845642">
                                                          <option value='0'>- เลือกตำบล -</option>
                                                        </select>
                                                    </span>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <select name="year2" id="" class="form-control" >
                                                    <option value="2559">2559</option>
                                                    <option value="2558">2558</option>
                                                    <option value="2557">2557</option>
                                                    <option value="2556">2556</option>
                                                    <option value="2555">2555</option>
                                                    <option value="2554">2554</option>
                                                    <option value="2553">2553</option>
                                                    <option value="2552">2552</option>
                                                    <option value="2551">2551</option>
                                                    <option value="2550">2550</option>
                                                    <option value="2549">2549</option>
                                                    <option value="2548">2548</option>
                                                    <option value="2547">2547</option>
                                                    <option value="2546">2546</option>
                                                    <option value="2545">2545</option>
                                                    <option value="2544">2544</option>
                                                    <option value="2543">2543</option>
                                                    <option value="2542">2542</option>
                                                    <option value="2541">2541</option>
                                                    <option value="2540">2540</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div class="form-group">
                                                <button type="submit" formaction="compare_pop.php" class="btn btn-primary ">เปรียบเทียบข้อมูล</button>
                                            </div>
                                        </div>


                                            </div>
                                        </div>
                                </form>

                                     

                            </div>
                        </div>
                    </div>


                    </div>
                    <div class="col-md-12">
                        <div class="card">
                            <div class="content">
                                <div class="row">
 <iframe name="my_iframe3" src="map_pop.php" style="width: 100%; height: 1600px" frameborder="0" scrolling="no"></iframe>
                            </div>
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
