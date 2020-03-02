<?php
// Code By Cryental (https://github.com/Cryental)

//Define Header
header('Content-Type: application/json');

//Define Cached File URL
$cache_file = './cached.json';

//Define API Key
$apiKey = '';

//If cache file is existed and created before 30 minutes, it will cache new response. Otherwise, load the cached file and output.
if (file_exists($cache_file) && (filemtime($cache_file) > (time() - 60 * 30 ))) {
   $file = file_get_contents($cache_file);
} else {
   $file = file_get_contents('https://api-modern.cryental.dev/ohys/timetable.so?api=' . $apiKey);
   file_put_contents($cache_file, $file, LOCK_EX);
}

//Final Output
echo $file;
exit;