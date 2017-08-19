<!doctype html>
<html lang="en">
<head>  <?php
include('../libs/config.php');
?>
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="assets/img/logo_phitsanulok.gif">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

	<title>พิษณุโลก 4.0 ระบบสนุบสนุนการตัดสินใจรายครัวเรือน</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">

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
                <li class="active">
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
                    <a class="navbar-brand" href="#"><b>พิษณุโลก 4.0</b></a>
                </div>
                <div class="collapse navbar-collapse">
                </div>
            </div>
        </nav>


        <div class="content">
            <div class="container-fluid">
                <div class="row">
                   
                    <div class="row">
                    <div class="col-md-12">
                        <div class="card ">
                            <div class="header">
                                <h4 class="title">ข้อมูลจังหวัดพิษณุโลก</h4>
                            </div>
                            <div class="content">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="table-responsive">

  <?php 


        $result1 = pg_query($db,"select sum(p_mf_total) as sum_mf , sum(p_f_total) as sum_f ,  sum(p_m_total) as sum_m
        from  raw_tam where year_pop = '2559' and pv_name = 'พิษณุโลก' ; ");
        $arr1 = pg_fetch_array($result1);


         $result2 = pg_query($db,"select year_pop,sum(p_mf_total)
                                    from raw_tam 
                                    where year_pop = 2559 and pv_name = 'พิษณุโลก'
                                    group by year_pop ; ");
         $result3 = pg_query($db,"select year_pop,sum(p_mf_total)
                                    from raw_tam 
                                    where year_pop = 2558 and pv_name = 'พิษณุโลก'
                                    group by year_pop ; ");
        $arr3 = pg_fetch_array($result2);
        $arr4 = pg_fetch_array($result3);


        $num = number_format($arr1[sum_mf]);
        $num2 = number_format($arr1[sum_f]);
        $num3 = number_format($arr1[sum_m]);
                                    

                                 ?>                                         
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src="assets/img/001.png" alt="">
                                                        </td>
                                                        <td><b>จำนวนประชากรทั้งหมด</td>
                                                        <td class="text-right">
                                                            <b><?php echo $num;?> คน
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flag">
                                                            <img src="assets/img/002.png" alt="">
                                                            </div>
                                                        </td>
                                                        <td><b>ประชากรเพศชาย</td>
                                                        <td class="text-right">
                                                            <b><?php echo $num3;?> คน
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flag">
                                                            <img src="assets/img/003.png" alt="">
                                                            </div>
                                                        </td>
                                                        <td><b>ประชากรเพศหญิง</td>
                                                        <td class="text-right">
                                                            <b><?php echo $num2;?> คน
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flag">
                                                            <img src="assets/img/004.png" alt="">
                                                            </div>
                                                        </td>
                                                        <td><b>พื้นที่จังหวัด</td>
                                                        <td class="text-right">
                                                            <b>10,815 ตร.กม.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flag">
                                                            <img src="assets/img/005.png" alt="">
                                                            </div>
                                                        </td>
                                                        <td><b>ความหนาแน่นของประชากร</td>
                                                        <td class="text-right">
                                                            <b><?php echo round ($arr1[sum_mf]/ 10815,1); ?> คน/ตร.กม.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="flag">
                                                            <img src="assets/img/006.png" alt="">
                                                            </div>
                                                        </td>
                                                        <td><b>อัตราการเปลี่ยนแปลงประชากร</td>
                                                        <td class="text-right">
                                                            <b> + <?php echo round(($arr3[sum]-$arr4[sum] )*100/$arr3[sum] , 2) ; ?> %
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-md-offset-1">
                                        <iframe name="my_iframe3" src="map_index.php" style="width: 100%; height: 300px" frameborder="0" scrolling="no"></iframe>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">ปริมาณน้ำฝนรายสัปดาห์</h4>
                                <p class="category">ข้อมูล ณ ปัจจุบัน</p>
                            </div>
                            <div class="content">
                                <div id="container1" style="min-width: 310px; height: 390px; margin: 0 auto"></div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6">
                        <div class="card ">
                            <div class="header">
                                <h4 class="title">สถานการณ์ไข้เลือดออกรายเดือน</h4>
                                <p class="category">ข้อมูล ณ ปัจจุบัน</p>
                            </div>
                            <div class="content">
                                <div class="table-full-width">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td><center><b>หมู่บ้าน</b></center></td>
                                                <td><center><b>ตำบล</b></center></td>
                                                <td><center><b>อำเภอ</b></center></td>
                                                <td><center><b>จำนวนผู้ป่วย / คน</b></center></td>
                                            </tr>
  <?php 
        $result4 = pg_query($db3,"select tam_nam_t,amp_nam_t,vill_nam_t,sum(patient) 
from v_all_dengue_timslider a 
full join  dpc9_tambon_4326 b ON  a.tam_code = b.tam_code 
where a.prov_code = '65' 
group by tam_nam_t,amp_nam_t,vill_nam_t
order by sum desc
limit 8; ");
    while($arr4 = pg_fetch_array($result4))    {
?>     
                                            <tr>
                                                <td class="td-actions text-center"><?php echo $arr4[vill_nam_t];?></td>
                                                <td class="td-actions text-center"><?php echo $arr4[tam_nam_t];?></td>
                                                <td class="td-actions text-center"><?php echo $arr4[amp_nam_t];?></td>
                                                <td class="td-actions text-center"><?php echo $arr4[sum];?></td>
                                            </tr>
<?php } ?>
                                        </tbody>
                                    </table>
                                </div>
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

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>


<script>
    Highcharts.chart('container1', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: [<?php $result = pg_query($db2, "select ap_tn,avg(rain_average) as rain_average from raintam 
where pv_code = '65' group by ap_tn order by rain_average desc"); while ($arr = pg_fetch_array($result))  { ?>
                '<?php echo $arr[ap_tn]; ?>',
                <?php } ?>]
        },
        yAxis: {
            title: {
                text: 'ปริมาณน้ำฝน'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' mm'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'ปริมาณน้ำฝน',
            data: [<?php $result = pg_query($db2, "select ap_tn,avg(rain_average) as rain_average from raintam 
where pv_code = '65' group by ap_tn order by rain_average desc"); while ($arr2 = pg_fetch_array($result))  { ?>
                <?php echo round($arr2[rain_average],2); ?>,
                <?php } ?>],
            color: '#802b00'
        }]
    });
</script>

</html>
