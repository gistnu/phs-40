<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
$hostname_db = "localhost";
$database_db = "poprate";
$username_db = "postgres";
$password_db = "1234";

$db = pg_connect("host=$hostname_db user=$username_db password=$password_db dbname=$database_db") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'"); 

$prov = พิษณุโลก;
$amphoe = $_POST[amphoe_name];
$tambol = $_POST[tambon_name];
$year = 2559;

?>



    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
	

		
    <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <![endif]-->
    <title></title>
    <!-- BOOTSTRAP CORE STYLE  -->
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


	
</head>

 <?php 

 if ($tambol != '') {
 	
	 $result1 = pg_query("select *  from age_0_5_tm where tam_name like '%$tambol%' and  year_pop =  $year ; "); 
	$chart_index = pg_fetch_array($result1);

 }elseif ($amphoe != '') {
 	 $result1 = pg_query("select *  from age_0_5_ap where amp_name like '%$amphoe%' and  year_pop =  $year   ; "); 
	$chart_index = pg_fetch_array($result1);
 }elseif ($prov != '') {
 	 $result1 = pg_query("select *  from age_0_5_pv where pro_name like '%$prov%'  and  year_pop =  $year  ; "); 
	$chart_index = pg_fetch_array($result1);
 }else{
 	$result1 = pg_query("select *  from age_0_5_th where  year_pop =  $year ; "); 
	$chart_index = pg_fetch_array($result1);
 }


 ?>  



<body>
    <div class="content-wrapper">
	
            <div class="row">
			 
                <div class="col-md-12">
					<h2 class="page-head-line">กราฟแสดงข้อมูลประชากร</h2>
					<div id="container" style="min-width: 450px; max-width: 800px; height: 550px; margin: 0 auto"></div>
                </div>

            </div>
			
            <div class="row">
                <div class="col-md-10">
				
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
			
        </div>
    </div>
	
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


</body>
</html>
