<?php include_once 'header.php'; session_start(); ?>

<h1 class="usersetting">User Settings</h1>

<form method="post" action="user-settings.php">
    <table class="usersettingTable">
        <tbody>
            <tr>
                <td align="right">Username &nbsp</td>
                <td align="left">
                    <input type="text" id="username" name="new_username" placeholder="<?php echo $_SESSION['username']; ?>"/>
                </td>
            </tr>
            <tr>
                <td align="right">Email &nbsp</td>
                <td align="left">
                    &nbsp <input type="text" id="email" name="new_email" placeholder="">
                </td>
            </tr>
            <tr>
                <td align="right">Password &nbsp</td>
                <td align="left">
                        &nbsp <input type="radio" name="password" checked="checked">Do not change. <br>
                        &nbsp <input type="radio" name="password">Set new password
                        &nbsp <input type="password" name="new_password" id="new_password">
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2" align="right">
                    <input class="usersetting_btn" type="submit" name="usersettings" value="Confirm"> &nbsp
                </td>
            </tr>
        </tfoot>                                             
    </table>
</form>

<?php include_once 'footer.php'; ?>