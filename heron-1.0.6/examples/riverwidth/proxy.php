<?php
$url=$_GET["url"];
$res = file_get_contents($url);
echo $res;
?>

-----
<?php
 $ch = curl_init($_GET['url']);
 curl_setopt($ch, CURLOPT_HEADER, 0);
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 $output = curl_exec($ch);
 curl_close($ch);
 echo $output;
?>

------OK----
<?php
$url=$_GET["url"];
$res = file_get_contents($url);
echo $res;
?>
## ref: https://khayer.wordpress.com/2010/07/14/open-layer-with-geosever/

--------
## https://github.com/acanimal/Openlayers-Cookbook/blob/master/utils/proxy.php