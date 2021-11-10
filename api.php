<?php
// Request function to call the NodeJS API
function request($route, $post_params = null, $get_params = null, $username = "root", $password = "root")
{
    $req_url = "localhost:3001" . $route;

    if ($post_params != null) {
        $query = http_build_query($post_params, '', '&');
        $data_json = json_encode($_POST);
    }

    if ($get_params != null) {
        $query = http_build_query($get_params, '', '&');
        $req_url = $req_url . "/" . $query;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $req_url);
    if ($post_params != null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/x-www-form-urlencoded'
        ));
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    $response = json_decode($result);
    curl_close($ch);

    return $response;
}

// Register a new user
if (isset($_POST['register']) && !empty($_POST['register'])) {

    $params = array(
        'username' => $_POST['username'],
        'password' => $_POST['password'],
        'confirm_password' => $_POST['confirm_password']
    );
    $response = request("/auth/register", $post_params = $params);
    
   if ($response == "success") {
        header("Location: login.php");
        echo "Account created succesfully.";
    } else {
        echo "Failed to register.";
    } 
}

// Login a user
if(isset($_POST['login']) && !empty($_POST['login'])){
    $params = array(
        'username' => $_POST['username'],
        'password' => $_POST['password']
    );
    $response = request("/auth/login", $post_params = $params);

    $_SESSION['username'] = $response=['username'];

    if ($response == "success") {
        header("Location: dashboard.php");
        echo "Login succesful.";
    } else {
        echo "Login failed.";
    }
}

?>