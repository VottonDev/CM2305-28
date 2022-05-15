<?php

class LoginTestCest
{
    public function tryToLogin($I)
    {
        $I->amOnPage('/login.php');
        $I->click('Login');
        $I->see('');
    }
}
