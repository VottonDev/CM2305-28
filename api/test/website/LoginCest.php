<?php
class LoginCest
{
    function _before(AcceptanceTester $I)
    {
    }
    
    public function _after(AcceptanceTester $I)
    {        
    }

    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->see('Sign In');
    }
}
?>