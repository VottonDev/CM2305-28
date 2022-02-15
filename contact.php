<?php include_once 'header.php' ?>

<div class="enquiry-form-container">
<h1 style="text-align:center;"> Contact Us </h1>
<form class="enquiry-form" action="contact.php" method="post">
<div>
  <input type="text" name="name" placeholder="Enter your name" >
</div>

<div>
  <input type="email" name="email" placeholder="Enter your email address" >
</div>

<div>
  <input type="text" name="subject" placeholder="Subject">
</div>

<div>
  <textarea style="margin-top:2em; font-family:Century Gothic;" name="message" placeholder="Enter your message here" cols="30" rows="15"></textarea>
</div>

<div>
<input type="submit" class="submit-btn" style="border: 2px solid black;"  name="submit_query" value="Submit">
</div>
</form>
</div>

<?php
$receiver_email = "jgroom122@gmail.com"; //will replace with dedicated enquiry email
if (isset($_POST['submit'])){
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  $message_body = "Name".$name."\n".$email.".\n\n".$message;

  $headers = array(
    "Authorization: Bearer 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",
    'Content-Type: application/json'
  );

  $data = array(
    "personalizations" => array(
      array(
        "to" => array(
          array(
            "email" => $receiver_email, //receiver email
            "name" => "User_Enquiry"
          )
        )
      )
    ),
    "from" => array(
      "email" => $receiver_email //sender email
    ),
    "subject" => $subject,
    "content" => array(
      array(
        "type" => "text/html",
        "value" => $message_body
      )
    )
  );
  $ch = curl_init();
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://api.sendgrid.com/v3/mail/send");
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
  $response = curl_exec($ch);
  curl_close($ch); 
  echo $response; 
}
?>

<?php include_once 'footer.php' ?>
