<?php
/**
 * @internal
 * @coversNothing
 */
class UserTest extends \Codeception\Test\Unit
{
    public function testValidation()
    {
        $user = new User();

        $user->setName(null);
        $this->assertFalse($user->validate(['username']));

        $user->setName('toolooooongnaaaaaaameeee');
        $this->assertFalse($user->validate(['username']));

        $user->setName('davert');
        $this->assertTrue($user->validate(['username']));
    }
}
