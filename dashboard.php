<?php include_once 'header.php'; ?>
<?php
  if (!(isset($_SESSION['email']))) {
      header('Location: login.php');
  }
?>
<!DOCTYPE html>
<?php
  # Count how many text fields are in the json file
  $json = file_get_contents('./api/json.json');
  $json_data = json_decode($json, true);
  # Count the number of text fields
  $totalPosts = count($json_data['data']);
?>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <link rel="stylesheet" href="static/style.css">
     <link rel="stylesheet" href="static/bootstrap.min.css">
    <title> Group Project </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css' rel='stylesheet' />
    <script src="mapConfig.js" defer></script>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
    crossorigin="anonymous">
    <link rel="stylesheet" href="static/style.css">

  </head>

  <body style="background-color: #1a1a1a;">
    <article>
      <div class="mappingbox">
        <div class="innerbox">
          <div id="map"></div>
        </div>
      </div>

<div class="container1">
      <div class="grid_container">
        <div class="stat">
          <div class="stat_name"> Total Posts </div>
          <div class="stat_value"> <?php echo $totalPosts; ?> </div>
        </div>

        <div class="stat">
          <div class="stat_name"> Post Share % </div>
        </div>

        <div class="stat">
          <div class="stat_name"> Overall Sentiment </div>
        </div>
      </div>
    </div>

    <div class="container2">
      <div class="db_output">
      <div class="titles">  DB Stats </div>
      </div>

      <div class="chart">
        <div class="titles"> Pie Chart </div>
        <div class="chart-wrapper">
          <canvas id="myChart"></canvas>
        </div>
      </div>

    </div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
<script src="pieChart.js"></script>
</article>
</body>
</html>
