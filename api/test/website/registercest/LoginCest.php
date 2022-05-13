<?php

class RegisterTestCest
{
    public function tryToRegister($I)
    {
        $I->amOnPage('/register.php');
        $I->click('Register');
        $I->see('');
    }
}
