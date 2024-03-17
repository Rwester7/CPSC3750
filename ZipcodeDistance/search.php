<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your PHP Page</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
<?php
function getCoordinates($zipcode, $filePath) {
    $file = fopen($filePath, 'r');

    while (($line = fgets($file)) !== false) {
        $data = explode(',', $line);
        if ($data[0] == $zipcode) {
            fclose($file);
            return array('latitude' => trim($data[1]), 'longitude' => trim($data[2]));
        }
    }

    fclose($file);
    return null;
}

function readFileContent($filePath) {
    $file = fopen($filePath, 'r');
    if ($file) {
        echo "<h1 id='z'>Reading the Zip Code File:</h1>";
        for ($i = 0; $i < 6; $i++) {
            $line = fgets($file);
            echo "<h2 id='z'>" . $line . "<br></h2>";
        }
        fclose($file);
    } else {
        echo "Error opening the file.";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['calculate'])) {
    $zip1 = $_POST["zip1"];
    $zip2 = $_POST["zip2"];

    $coords1 = getCoordinates($zip1, 'zipcodes.txt');
    $coords2 = getCoordinates($zip2, 'zipcodes.txt');

    if ($coords1 && $coords2) {
        if (isset($_POST['debug']) && $_POST['debug'] == 'on') {
            echo "<h1 id='z'>Debugging Info:</h1>";
            
            echo "<h1 id='z'>Coordinates for Zip Code 1 ($zip1):<br></h1>";
            echo "<h2 id='z'>Latitude: " . $coords1['latitude'] . "<br>";
            echo "Longitude: " . $coords1['longitude'] . "</h2>";
            
            echo "<h1 id='z'>Coordinates for Zip Code 2 ($zip2):<br>";
            echo "<h2 id='z'>Latitude: " . $coords2['latitude'] . "<br>";
            echo "Longitude: " . $coords2['longitude'] . "</h2>";

            readFileContent('zipcodes.txt');
        }

        function getDistance($lat1, $lon1, $lat2, $lon2) {
            $kmDistance = acos(sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($lon2 - $lon1))) * 6371;
            $milesDistance = $kmDistance * 0.621371;
            return $milesDistance;
        }

        $distance = getDistance($coords1['latitude'], $coords1['longitude'], $coords2['latitude'], $coords2['longitude']);
        echo "<h1 id='z'>Distance Calculation:</h1>";
        echo "<h2 id='z'> " . $distance . " miles</h2>";
        if (isset($_POST['debug']) && $_POST['debug'] == 'on') {
            echo "<h1 id='z'>Double Check: <a href='https://www.freemaptools.com/distance-between-usa-zip-codes.htm' target='_blank'>Other Distance Calculator</a></h1>";
            echo ".";    
        }
        echo "<h1 id='z'><a href='https://rwester.com/ZipcodeDistance/search.html'>Back</a></h1>";
    } else {
        echo "<p>Coordinates not found for one or both of the entered zip codes.</p>";
    }
}
?>
</body>
</html>
