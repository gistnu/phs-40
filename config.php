<?php
$hostname_db1 = "localhost";
$database_db1 = "plk40";
$username_db1 = "postgres";
$password_db1 = "HerculeS";

$db = pg_connect("host=$hostname_db1 user=$username_db1 password=$password_db1 dbname=$database_db1") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'"); 
?>


<?php
$hostname_db2 = "192.168.5.30";
$database_db2 = "rain";
$username_db2 = "postgres";
$password_db2 = "TRF2cn2010";

$db2 = pg_connect("host=$hostname_db2 user=$username_db2 password=$password_db2 dbname=$database_db2") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'"); 
?>


<?php
$hostname_db3 = "192.168.5.30";
$database_db3 = "hgis";
$username_db3 = "postgres";
$password_db3 = "TRF2cn2010";

$db3 = pg_connect("host=$hostname_db3 user=$username_db3 password=$password_db3 dbname=$database_db3") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'"); 
?>


<?php
$hostname_db4 = "localhost";
$database_db4 = "elder";
$username_db4 = "postgres";
$password_db4 = "HerculeS";

$db4 = pg_connect("host=$hostname_db4 user=$username_db4 password=$password_db4 dbname=$database_db4") or die("Can't Connect Server");

pg_query("SET client_encoding = 'utf-8'"); 
?>