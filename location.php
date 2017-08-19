<?php
    header("content-type: text/html; charset=utf-8");
    header ("Expires: Wed, 21 Aug 2013 13:13:13 GMT");
    header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
    header ("Cache-Control: no-cache, must-revalidate");
    header ("Pragma: no-cache");

include('config.php');



	 $data = $_GET['data'];
    $val = $_GET['val'];

       
		
          if ($data=='amphoe_name') {
              echo "<select name='amphoe' class='form-control' onChange=\"dochange('tambon_name', this.value)\">";
              echo "<option value=''>- เลือกอำเภอ -</option>\n";                             
              $result=pg_query($db,"SELECT amp_name,amp_code FROM tambol_up WHERE prov_name= 'พิษณุโลก' GROUP BY amp_name,amp_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[amp_name]\" >$row[amp_name]</option> " ;
              }
         } else if ($data=='tambon_name') {
              echo "<select class='form-control' name='tambon'>\n";
              echo "<option value=''>- เลือกตำบล -</option>\n";
              $result=pg_query($db,"SELECT tam_name,tam_code FROM tambol_up WHERE amp_name = '$val' GROUP BY tam_name,tam_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[tam_name]\" >$row[tam_name]</option> \n" ;
              }
         }


        if ($data=='amphoe_name2') {
              echo "<select name='amphoe2' class='form-control' onChange=\"dochange('tambon_name2', this.value)\">";
              echo "<option value=''>- เลือกอำเภอ -</option>\n";                             
              $result=pg_query($db,"SELECT amp_name,amp_code FROM tambol_up WHERE prov_name= 'พิษณุโลก' GROUP BY amp_name,amp_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[amp_name]\" >$row[amp_name]</option> " ;
              }
         } else if ($data=='tambon_name2') {
              echo "<select class='form-control' name='tambon2'>\n";
              echo "<option value=''>- เลือกตำบล -</option>\n";
              $result=pg_query($db,"SELECT tam_name,tam_code FROM tambol_up WHERE amp_name = '$val' GROUP BY tam_name,tam_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[tam_name]\" >$row[tam_name]</option> \n" ;
              }
         }


        if ($data=='amphoe_name3') {
              echo "<select name='amphoe2' class='form-control' onChange=\"dochange('tambon_name3', this.value)\">";
              echo "<option value=''>- เลือกอำเภอ -</option>\n";                             
              $result=pg_query($db,"SELECT amp_name,amp_code FROM tambol_up WHERE prov_name= 'พิษณุโลก' GROUP BY amp_name,amp_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[amp_code]\" >$row[amp_name]</option> " ;
              }
         } else if ($data=='tambon_name3') {
              echo "<select class='form-control' name='tambon2'>\n";
              echo "<option value=''>- เลือกตำบล -</option>\n";
              $result=pg_query($db,"SELECT tam_name,tam_code FROM tambol_up WHERE amp_code = '$val' GROUP BY tam_name,tam_code");
              while($row = pg_fetch_array($result)){
                   echo "<option value=\"$row[tam_code]\" >$row[tam_name]</option> \n" ;
              }
         }
  
	
         echo "</select>\n";
	
   
?>  