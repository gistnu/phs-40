<!DOCTYPE html>

<?php 
include('config.php');

?>


<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>MAP_FIRE</title>

    <!-- Font Awesome -->
    <!-- Custom Theme Style -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
    <style>
        body {
            font-family: "th sarabunpsk", Georgia, Serif;
            font-size: 30px;
        }
        
        #map {
            width: 100%;
            height: 650px;
        }
        
        .info {
            padding: 6px 8px;
            font: 14px/16px Arial, Helvetica, sans-serif;
            background: white;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
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
            opacity: 1;
        }
        
        h1 {
            font-family: "th sarabunpsk", Georgia, Serif;
            font-size: 24px;
        }
        
        h7 {
            font-family: "th sarabunpsk", Georgia, Serif;
            font-size: 18px;
        }
    </style>


    <?php 
	$prov_name = $_POST[prov_name];
	$amphoe_name = $_POST[amphoe_name];
	$tambon_name = $_POST[tambon_name];
	$start = $_POST[start_date];
	$ste = $_POST[ste];
	$point = $_POST[point_z];
	
	
	
	$current_date = new DateTime();
	$end = $current_date->format('m/d/Y');

	$current_date = new DateTime();
$current_date -> modify ("-1 day");
$check_date= $current_date->format('m/d/Y');
	
?>



</head>

<body>
    <div>
        <div>
            <!-- page content -->


            <div class="col-md-12 ">
                <div class="x_panel">
                    <h1>
                        <center>
                            <?php 
				   if ($prov_name == ''){
					   echo "รายงานสถานการณ์จุดความร้อนทั่วประเทศ ภายในวันที่่  ",$start,"  ถึงวันที่ ",$end;
				   }if ($prov_name != '' and $amphoe_name == ''){
					     echo "รายงานสถานการณ์จุดความร้อน ในเขตจังหวัด ",$prov_name,"<br> ภายในวันที่ ",$start,"  ถึงวันที่ ",$end;
				   }if ($prov_name != '' and $amphoe_name != '' and $tambon_name == '') {
					     echo "รายงานสถานการณ์จุดความร้อน ในเขตจังหวัด ",$prov_name," อำเภอ ",$amphoe_name,"<br> ภายในวันที่ ",$start,"  ถึงวันที่ ",$end;
				    }if ($prov_name != '' and $amphoe_name != '' and $tambon_name != '') {
					     echo "รายงานสถานการณ์จุดความร้อน ในเขตจังหวัด ",$prov_name," อำเภอ ",$amphoe_name," ตำบล ",$tambon_name,"<br> ภายในวันที่ ",$start,"  ถึงวันที่ ",$end;
				   }
				?>
                        </center>
                    </h1>
                </div>
            </div>

            <div class="col-md-12 ">
                <div class="x_panel">
                    <center>
                        <div id="map" style="height:650px; width:100%"></div>
                    </center>
                </div>
            </div> <br>


            <div class="x_panel">
                <center>
                    <div id="echart_line2" style="height:350px;width:100%"></div>
                </center>
            </div>




            <p style="page-break-after:always;"></p><br>


            <div class="col-md-12 ">
                <div class="x_panel">
                    <center>
                        <div id="mainb" style="height:350px;width:100%"></div>
                    </center>
                </div>
            </div>
            <div class="col-md-12 ">
                <div class="x_panel">
                    <div class="col-md-10">
                        <table style="width:100%" class="table table-striped">
                            <?php 
				   if ($prov_name == ''){
					   echo " <thead>
							<tr>
							  <th align='left'><h1> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp รายชื่อ 10 จังหวัด ที่มีจุดความร้อนมากที่สุด</th>
							  <th><center><h1>จำนวนจุดความร้อน</th>
							</tr>
						  </thead>";
				   }if ($prov_name != '' and $amphoe_name == ''){
					     echo " <thead>
							<tr>
							  <th align='left'><h1> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp รายชื่ออำเภอ</th>
							  <th><center><h1>จำนวนจุดความร้อน</th>
							</tr>
						  </thead>";
				   }if ($prov_name != '' and $amphoe_name != '') {
					     echo " <thead>
							<tr>
							  <th align='left'><h1> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp รายชื่อตำบล</th>
							  <th><center><h1>จำนวนจุดความร้อน</th>
							</tr>
						  </thead>";
				   }
				?>
                            <tbody>

                                <?php 
						   if ($prov_name == ''){
				
										$sql = pg_query($db, "
							SELECT pv_tn as name,count(*) as sumpoint 
							FROM $ste 
							where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' 
							group by pv_tn
							order by sumpoint DESC limit 10;");
										
										}if ($prov_name != '' and $amphoe_name == ''){
											
										$sql = pg_query($db, "
							SELECT ap_tn as name,count(*) as sumpoint 
							FROM $ste 
							where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
							group by ap_tn
							order by sumpoint DESC ;");
										
										}if ($prov_name != '' and $amphoe_name != '') {
											
										$sql = pg_query($db, "
							SELECT tb_tn as name,count(*) as sumpoint 
							FROM $ste 
							where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
							group by tb_tn
							order by sumpoint DESC;");
										
										}
		  

				while ($arr = pg_fetch_array($sql))
										
										{ ?>

                                <tr>
                                    <td><h7>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                        <?php echo $arr[name]; ?>
                                    </td>
                                    <td>
                                        <center><h7>
                                            <?php echo $arr[sumpoint]; ?>
                                    </td>
                                </tr>

                                <?php } ?>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
			
			 <p style="page-break-after:always;"></p><br>
			 
			
				<div class="col-md-12 ">
					<div class="x_panel">
					  <div class="x_content">

						<div id="echart_pie" style="height:350px;"></div>

					  </div>
					</div>
				</div> <br>
			
				<div class="col-md-12 ">
                <div class="x_panel">
                    <div class="col-md-10">
                        <table style="width:100%" class="table table-striped">
							<thead>
								<tr>
								  <th align='left'><h1> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp พื้นที่การใช้ประโยชน์ที่ดิน</th>
								  <th><center><h1>จำนวนจุดความร้อน</th>
								</tr>
							</thead>
                            <tbody>

                                <?php 
										$sql = pg_query($db, "
							SELECT desc_use as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by desc_use
order by sumpoint DESC;");
							while ($arr = pg_fetch_array($sql))
										{ ?>

                                <tr>
                                    <td><h7>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                        <?php echo $arr[name_bar]; ?>
                                    </td>
                                    <td>
                                        <center><h7>
                                            <?php echo $arr[sumpoint]; ?>
                                    </td>
                                </tr>

                                <?php } ?>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
				
			
			
			
			
            <!-- /page content -->

        </div>
    </div>

    <!-- jQuery -->
    <script src="vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- FastClick -->
    <script src="vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="vendors/nprogress/nprogress.js"></script>
    <!-- ECharts -->
    <script src="vendors/echarts/dist/echarts.min.js"></script>
    <script src="vendors/echarts/map/js/world.js"></script>
    <script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>
    <!-- Custom Theme Scripts -->
    <script src="js/custom.js"></script>

    <script>
        var theme = {
            color: [
                '#993333', '#996666', '#BDC3C7', '#3498DB',
                '#8abb6f', '#759c6a', '#bfd3b7', '#9B59B6',
				'#66cdaa', '#ba4f58', '#8b3626', '#424211'
            ],

            title: {
                itemGap: 8,
                textStyle: {
                    fontWeight: 'normal',
                    color: '#408829'
                }
            },

            dataRange: {
                color: ['#1f610a', '#97b58d']
            },

            toolbox: {
                color: ['#408829', '#408829', '#408829', '#408829']
            },

            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#408829',
                        type: 'dashed'
                    },
                    crossStyle: {
                        color: '#408829'
                    },
                    shadowStyle: {
                        color: 'rgba(200,200,200,0.3)'
                    }
                }
            },

            dataZoom: {
                dataBackgroundColor: '#eee',
                fillerColor: 'rgba(64,136,41,0.2)',
                handleColor: '#408829'
            },
            grid: {
                borderWidth: 0
            },

            categoryAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#408829'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#eee']
                    }
                }
            },

            valueAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#408829'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#eee']
                    }
                }
            },
            timeline: {
                lineStyle: {
                    color: '#408829'
                },
                controlStyle: {
                    normal: {
                        color: '#408829'
                    },
                    emphasis: {
                        color: '#408829'
                    }
                }
            },

            k: {
                itemStyle: {
                    normal: {
                        color: '#68a54a',
                        color0: '#a9cba2',
                        lineStyle: {
                            width: 1,
                            color: '#408829',
                            color0: '#86b379'
                        }
                    }
                }
            },
            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: '#ddd'
                        },
                        label: {
                            textStyle: {
                                color: '#c12e34'
                            }
                        }
                    },
                    emphasis: {
                        areaStyle: {
                            color: '#99d2dd'
                        },
                        label: {
                            textStyle: {
                                color: '#c12e34'
                            }
                        }
                    }
                }
            },
            force: {
                itemStyle: {
                    normal: {
                        linkStyle: {
                            strokeColor: '#408829'
                        }
                    }
                }
            },
            chord: {
                padding: 4,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        },
                        chordStyle: {
                            lineStyle: {
                                width: 1,
                                color: 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    },
                    emphasis: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        },
                        chordStyle: {
                            lineStyle: {
                                width: 1,
                                color: 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    }
                }
            },
            gauge: {
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [
                            [0.2, '#86b379'],
                            [0.8, '#68a54a'],
                            [1, '#408829']
                        ],
                        width: 8
                    }
                },
                axisTick: {
                    splitNumber: 10,
                    length: 12,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 18,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    length: '90%',
                    color: 'auto'
                },
                title: {
                    textStyle: {
                        color: '#333'
                    }
                },
                detail: {
                    textStyle: {
                        color: 'auto'
                    }
                }
            },
            textStyle: {
                fontFamily: 'Arial, Verdana, sans-serif'
            }
        };




        var echartLine2 = echarts.init(document.getElementById('echart_line2'), theme);

        echartLine2.setOption({
            title: {
                text: 'จำนวนจุดความร้อนรายวัน และจำนวนจุดความร้อนสะสม',
                subtext: 'ตามช่วงเวลาที่เลือก'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 220,
                y: 40,
                data: ['จำนวนจุดความร้อนรายวัน', 'จำนวนจุดความร้อนสะสม']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        title: {
                            line: 'Line',
                            bar: 'Bar'
                        },
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true,
                        title: "Restore"
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: true,

            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: [<?php 
		  
				$result = pg_query($db, "with cte as (
SELECT acq_date,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by acq_date
order by acq_date asc
 )
SELECT acq_date,sumpoint,sum(sumpoint) over (order by acq_date) 
from cte
order by acq_date asc;");
				while ($arr = pg_fetch_array($result))
										
										{ ?>
                    '<?php echo $arr[acq_date]; ?>',
                    <?php } ?>
                ]
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'จำนวนจุดความร้อนรายวัน',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [

                    <?php 
				$result = pg_query($db, "with cte as (
SELECT acq_date,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by acq_date
order by acq_date asc
 )
SELECT acq_date,sumpoint,sum(sumpoint) over (order by acq_date) 
from cte
order by acq_date asc; ");
				while ($arr = pg_fetch_array($result))
										
										{ ?>
                    '<?php echo $arr[sumpoint]; ?>',
                    <?php } ?>

                ]
            }, {
                name: 'จำนวนจุดความร้อนสะสม',
                type: 'line',
                smooth: true,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [

                    <?php 
				$result = pg_query($db, "with cte as (
SELECT acq_date,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by acq_date
order by acq_date asc
 )
SELECT acq_date,sumpoint,sum(sumpoint) over (order by acq_date) 
from cte
order by acq_date asc; ");
				while ($arr = pg_fetch_array($result))
										
										{ ?>
                    '<?php echo $arr[sum]; ?>',
                    <?php } ?>

                ]
            }]
        });


        var echartBar = echarts.init(document.getElementById('mainb'), theme);

        echartBar.setOption({
            title: {
                text: 'จำนวนจุดความแยกตามพื้นที่',
                subtext: 'ตามจำนวนวันที่เลือก'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['จำนวนจุดความร้อน']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        title: {
                            bar: 'Bar'
                        },
                        type: ['bar']
                    },
                    restore: {
                        show: true,
                        title: "Restore"
                    },
                    saveAsImage: {
                        show: true,
                        title: "Save Image"
                    }
                }
            },
            calculable: false,
            xAxis: [{
                type: 'category',
                data: [<?php 
		  
					if ($prov_name == ''){
						
					   $result = pg_query($db, "
SELECT pv_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' 
group by pv_tn
order by sumpoint DESC limit 10;");
					   
				   }if ($prov_name != '' and $amphoe_name == ''){
					   
					      $result = pg_query($db, "
SELECT ap_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' 
group by ap_tn
order by sumpoint DESC;");
						 
				   }if ($prov_name != '' and $amphoe_name != '' and $tambon_name == '') {
					   
					      $result = pg_query($db, "
SELECT tb_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by tb_tn
order by sumpoint DESC;");
						 
				    }if ($prov_name != '' and $amphoe_name != '' and $tambon_name != '') {
						
					      $result = pg_query($db, "
SELECT tb_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by tb_tn
order by sumpoint DESC;");
						 
				   }
		  
				while ($arr = pg_fetch_array($result))
										
										{ ?>
                    '<?php echo $arr[name_bar]; ?>',
                    <?php } ?>
                ]
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'จำนวนจุดความร้อน',
                type: 'bar',
                data: [<?php 
			if ($prov_name == ''){
						
					   $result = pg_query($db, "
SELECT pv_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' 
group by pv_tn
order by sumpoint DESC limit 10;");
					   
				   }if ($prov_name != '' and $amphoe_name == ''){
					   
					      $result = pg_query($db, "
SELECT ap_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' 
group by ap_tn
order by sumpoint DESC;");
						 
				   }if ($prov_name != '' and $amphoe_name != '' and $tambon_name == '') {
					   
					      $result = pg_query($db, "
SELECT tb_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by tb_tn
order by sumpoint DESC;");
						 
				    }if ($prov_name != '' and $amphoe_name != '' and $tambon_name != '') {
						
					      $result = pg_query($db, "
SELECT tb_tn as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by tb_tn
order by sumpoint DESC;");
						 
				   }
				while ($arr = pg_fetch_array($result))
										
										{ ?>
                    '<?php echo $arr[sumpoint]; ?>',
                    <?php } ?>
                ],
                markPoint: {
                    data: [{
                        type: 'max',
                        name: 'มากที่สุด'
                    }, {
                        type: 'min',
                        name: 'น้อยที่สุด'
                    }]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        name: 'เฉลี่ย'
                    }]
                }
            }]
        });

		
		var echartPie = echarts.init(document.getElementById('echart_pie'), theme);

      echartPie.setOption({ 
	  title: {
                text: 'พื้นที่ที่มีจุดความร้อนเกิดขึ้น',
                subtext: 'ตามจำนวนวันที่เลือก'
            },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: [  <?php 
					      $result = pg_query($db, "
SELECT desc_use as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by desc_use
order by sumpoint DESC;");
				while ($arr = pg_fetch_array($result)) { ?>
				'<?php echo $arr[name_bar]; ?>', 
				<?php } ?>
				]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {
              show: true,
              title: "Restore"
            },
            saveAsImage: {
              show: true,
              title: "Save Image"
            }
          }
        },
        calculable: true,
        series: [{
          name: 'พื้นที่ที่มีจุดความร้อนเกิดขึ้น',
          type: 'pie',
          radius: '55%',
          center: ['50%', '48%'],
          data: [
		  <?php 
					      $result = pg_query($db, "
SELECT desc_use as name_bar,count(*) as sumpoint 
FROM $ste 
where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name'
group by desc_use
order by sumpoint DESC;");
				while ($arr = pg_fetch_array($result)) { ?>
		  {
            value: <?php echo $arr[sumpoint]; ?>,
            name: '<?php echo $arr[name_bar]; ?>'
          },
										<?php } ?>
		  ]
        }]
      });




        var dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
    </script>


   

    <script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>




    <script type="text/javascript">
        var statesData = <?php
//-------------------------------------------------------------
// * Name: PHP-PostGIS2GeoJSON  
// * Purpose: GIST@NU (www.cgistln.nu.ac.th)
// * Date: 2016/10/13
// * Author: Chingchai Humhong (chingchaih@nu.ac.th)
// * Acknowledgement: 
//-------------------------------------------------------------
// Database connection settings
    // Retrieve start point
    // Connect to database
	
	
	if( $ste == "npp_viirsgeo" and $check_date == $start){
		$ste = "vnpp_viirsgeo24hr";
	}if( $ste == "npp_viirsgeo" and $check_date != $start){
		$ste = "npp_viirsgeo";
	}if( $ste == "modisgeo" and $check_date == $start){
		$ste = "vmodisgeo24hr";
	}if( $ste == "modisgeo" and $check_date != $start){
		$ste = "modisgeo";
	}
	
	
	
	
	if ($prov_name == ''){
		
		
		$sql = "with tt as (
select  pv_code,pv_tn,count(*) as value_sum from $ste where acq_date between  '$start' and '$end' group by pv_code,pv_tn
)
select value_sum,gid,pv_code,prov_nam_t as name_text,ST_AsGeoJSON(geom) AS geojson from prov_new 
Full join tt on prov_new.prov_code = tt.pv_code; ";
		
    
    }if ($prov_name != '' and $amphoe_name == ''){
		

		$sql = "with tt as (
select  ap_code,ap_tn,count(*) as value_sum from $ste where acq_date between  '$start' and '$end' and pv_tn like '%$prov_name' group by ap_code,ap_tn
)
select value_sum,gid,amphoe.ap_code,amphoe.ap_tn as name_text,pv_tn,ST_AsGeoJSON(geom) AS geojson from amphoe 
Full join tt on amphoe.ap_code = tt.ap_code
where  amphoe.pv_tn like '%$prov_name'  ; ";
		
		
	}if ($prov_name != '' and $amphoe_name != '') {
		
		
		$sql = "with tt as (
select tb_code,tb_tn,count(*) as value_sum from $ste where acq_date between '$start' and '$end' and pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' group by tb_code,tb_tn
)
select value_sum,gid,tambon.tb_code,tambon.ap_tn,tambon.pv_tn,tambon.tb_tn as name_text,ST_AsGeoJSON(geom) AS geojson 
from tambon 
Full join tt on tambon.tb_code = tt.tb_code
where  tambon.pv_tn like '%$prov_name' and tambon.ap_tn like '%$amphoe_name' ; ";
		
		
	}if ($prov_name != '' and $amphoe_name != '' and $tambon_name != '') {
		$sql = "with tt as (
select tb_code,tb_tn,count(*) as value_sum from $ste where acq_date between '%$start' and '%$end' and  pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name' group by tb_code,tb_tn
)
select value_sum,gid,tambon.tb_code,tambon.ap_tn,tambon.pv_tn,tambon.tb_tn as name_text,ST_AsGeoJSON(geom) AS geojson 
from tambon 
Full join tt on tambon.tb_code = tt.tb_code
where  tambon.pv_tn like '%$prov_name' and tambon.ap_tn like '%$amphoe_name' and tambon.tb_tn like '%$tambon_name' ; ";
	}
	
	
	
	
   // Perform database query
   $query = pg_query($db,$sql);   
   //echo $sql;
    // Return route as GeoJSON
   $geojson = array(
      'type'      => 'FeatureCollection',
      'features'  => array()
   ); 
  
   // Add geom to GeoJSON array
   while($edge=pg_fetch_assoc($query)) {  
      $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($edge['geojson'], true),
         'crs' => array(
            'type' => 'EPSG',
            'properties' => array('code' => '4326')
         ),
            'properties' => array(
			'gid' => $edge['gid'],
			'name' => $edge['name_text'],
            'value_sum' => $edge['value_sum']
         )
      );
      
      // Add feature array to feature collection array
      array_push($geojson['features'], $feature);
   }
   // Close database connection
   // Return routing result
   // header('Content-type: application/json',true);
  echo json_encode($geojson);
	?>
    </script>



    <script type="text/javascript">// Add MAP_FIRE
	 
        var map = L.map('map').setView(<?php
		if ($prov_name == ''){
			$result5 = pg_query($db,"SELECT ST_Y(ST_Centroid(geom)) as lat, ST_X(ST_Centroid(geom)) as long , pv_tn FROM province  where pv_tn like '%$prov_name'  ;");
			$row5 = pg_fetch_array($result5); 
			echo "[","$row5[lat]",",","$row5[long]","]",",","6";
		}if ($prov_name != '' and $amphoe_name == ''){
			$result5 = pg_query($db,"SELECT ST_Y(ST_Centroid(geom)) as lat, ST_X(ST_Centroid(geom)) as long , pv_tn FROM province  where pv_tn like '%$prov_name'  ;");
			$row5 = pg_fetch_array($result5); 
			echo "[","$row5[lat]",",","$row5[long]","]",",","9";
		}if ($prov_name != '' and $amphoe_name != '' and $tambon_name == '') {
			$result5 = pg_query($db,"SELECT ST_Y(ST_Centroid(geom)) as lat, ST_X(ST_Centroid(geom)) as long , pv_tn ,ap_tn FROM amphoe  where pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name'  ;");
			$row5 = pg_fetch_array($result5); 
			echo "[","$row5[lat]",",","$row5[long]","]",",","11";
		}if ($prov_name != '' and $amphoe_name != '' and $tambon_name != '') {
			$result5 = pg_query($db,"SELECT ST_Y(ST_Centroid(geom)) as lat, ST_X(ST_Centroid(geom)) as long , pv_tn ,ap_tn,tb_tn FROM tambon  where pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name' ;");
			$row5 = pg_fetch_array($result5); 
			echo "[","$row5[lat]",",","$row5[long]","]",",","12";
		}
			?>);



        <?php if( $point == 1) {} else{echo "/*";}?>

        var redIcon = L.icon({
            iconUrl: 'point.png',
            iconSize: [5, 5],
        });
        var planes = [<?php
			$result5 = pg_query($db,"SELECT latitude,longitude,pv_tn FROM $ste where pv_tn like '%$prov_name' and ap_tn like '%$amphoe_name' and tb_tn like '%$tambon_name' and acq_date between '$start' and '$end'  ;");
			while ($row5 = pg_fetch_array($result5)) { ?> [<?php echo "$row5[latitude]",",","$row5[longitude]"; ?>], <?php } ?>];

        for (var i = 0; i < planes.length; i++) {
            marker = new L.marker([planes[i][0], planes[i][1]], {
                    icon: redIcon
                })
                .addTo(map);
        }

        <?php if( $point == 1) {} else{echo "*/" ;}?>




        L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map);


        // control that shows state info on hover
        var info = L.control();

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function(props) {
            this._div.innerHTML = '<h3>แผนที่แสดงพื้นที่และจำนวนจุดความร้อน</h3>' + (props ?
                '<b>' + props.name + '</b><br />' + props.value_sum + ' จุด' :
                '');
        };

        info.addTo(map);


        // get color depending on population value_sum value
        function getColor(d) {
            return d > 100 ? '#800026' :
                d > 80 ? '#BD0026' :
                d > 60 ? '#E31A1C' :
                d > 40 ? '#FC4E2A' :
                d > 20 ? '#FEB24C' :
                '#FFEDA0';
        }



        function style(feature) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                fillColor: getColor(feature.properties.value_sum)
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#983a3a',
                dashArray: '',
                fillOpacity: 0
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
        }

        var geojson;

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        geojson = L.geoJson(statesData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);




        var legend = L.control({
            position: 'bottomright'
        });

        legend.onAdd = function(map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 20, 40, 60, 80, 100],
                labels = [],
                from, to;

            for (var i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1] - 1;

                labels.push(
                    '<i style="background:' + getColor(from + 1) + '"></i> ' +
                    from + (to ? '&ndash;' + to : '+') + ' จุด');
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);
    </script>



</body>

</html>