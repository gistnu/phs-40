<?php
$hostname_db = "192.168.5.30";
$database_db = "hgis";
$username_db = "postgres";
$password_db = "TRF2cn2010";

    function conndb() {
        global $conn;
        global $hostname_db;
        global $username_db;
        global $password_db;
        global $database_db;
        $conn = pg_connect("host=$hostname_db user=$username_db password=$password_db dbname=$database_db") or die("Can't Connect Server");

		pg_query("SET client_encoding = 'utf-8'");
    }

    function closedb() {
      global $conn;
      pg_close($conn);
    }
?>
