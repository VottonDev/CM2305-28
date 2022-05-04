<?php

session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Request function to call the NodeJS API
function request($route, $post_params = null, $get_params = null)
{
    $req_url = 'localhost:3001'.$route;

    if (null != $post_params) {
        $query = http_build_query($post_params, '', '&');
        $data_json = json_encode($_POST);
    }

    if (null != $get_params) {
        $query = http_build_query($get_params, '', '&');
        $req_url = $req_url.'/'.$query;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $req_url);
    if (null != $post_params) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
        ]);
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);
    $response = json_decode($result);
    curl_close($ch);

    return $response;
}

// Register a new user
if (isset($_POST['register']) && !empty($_POST['register'])) {
    $params = [
        'username' => $_POST['username'],
        'email' => $_POST['email'],
        'password' => $_POST['password'],
        'confirm_password' => $_POST['confirm_password'],
    ];
    $response = request('/auth/register', $post_params = $params);

    if (1 == $response->success) {
        header('Location: login.php');
        echo 'Account created succesfully. Check your e-mail for verification code.';
    } else {
        echo 'Failed to register.';
    }
}

// Login a user
if (isset($_POST['login']) && !empty($_POST['login'])) {
    $params = [
        'username' => $_POST['username'],
        'password' => $_POST['password'],
    ];
    $response = request('/auth/login', $post_params = $params);

    if (1 == $response->success) {
        session_start();
        $_SESSION['username'] = $response = ['username'];
        header('Location: dashboard.php');
        echo 'Login succesful.';
    } else {
        echo 'Login failed.';
    }
}

// Contact us form
if (isset($_POST['contact']) && !empty($_POST['contact'])) {
    $params = [
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'subject' => $_POST['subject'],
        'message' => $_POST['message'],
    ];
    $response = request('/mail/contact', $post_params = $params);

    if (1 == $response->success) {
        header('Location: contact.php');
        echo 'Message sent succesfully.';
    } else {
        echo 'Failed to send message.';
    }
}

// Change username
if (isset($_POST['usersettings']) && !empty($_POST['usersettings'])) {
    $params = [
        'new_username' => $_POST['new_username'],
    ];
    $response = request('/profile/change_username', $post_params = $params);

    if (1 == $response->success) {
        header('Location: user-settings.php');
        echo 'Username changed succesfully.';
    } else {
        echo 'Failed to change username.';
    }
}

// Change email address
if (isset($_POST['usersettings']) && !empty($_POST['usersettings'])) {
    $params = [
        'email' => $_POST['email'],
    ];
    $response = request('/profile/change_email', $post_params = $params);

    if (1 == $response->success) {
        header('Location: user-settings.php');
        echo 'Email changed succesfully.';
    } else {
        echo 'Failed to change email.';
    }
}

// Change password
if (isset($_POST['usersettings']) && !empty($_POST['usersettings'])) {
    $params = [
        'new_password' => $_POST['new_password'],
        'confirming_password' => $_POST['confirm_password'],
    ];
    $response = request('/profile/change_password', $post_params = $params);

    if (1 == $response->success) {
        header('Location: user-settings.php');
        echo 'Password changed succesfully.';
    } else {
        echo 'Failed to change password.';
    }
}
