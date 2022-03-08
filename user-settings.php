<?php include_once 'header.php'; ?>

<h1 class="usersetting">User Settings</h1>

<div class="usersetting_container">
    <div class="usersetting_form">
        <form method="post" action="user-settings.php" onsubmit="return checkForm()">
            <labal>Username</labal>&nbsp&nbsp
            <input type="text" id="username" name="username" style="width: 300px;">
            <span id="username" class="error">*</span><br><br>

            <labal>New password</labal>&nbsp&nbsp
            <input type="password" name="new_password" id="new_password" placeholder="Please set the new password." style="width: 300px;">
            <span id="new_password" class="error">*</span><br><br>

            <labal>Confirming password</labal>&nbsp&nbsp
            <input type="password" name="confirming_password" id="confirming_password" placeholder="Please enter the password again." style="width: 300px;">
            <span id="confirming_password" class="error">*</span><br><br>

            <labal>Email</labal>&nbsp&nbsp
            <input type="text" id="email" name="email" style="width: 300px;">
            <span id="email" class="error">*</span><br><br>
            
            <input class="usersetting_btn" type="submit" name="usersettings" value="Confirm">
        </form>
    </div>  
</div>

<?php include_once 'footer.php'; ?>