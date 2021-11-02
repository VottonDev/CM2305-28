<?php

class FibonacciTestCase extends PHPUnit_Framework_TestCase
{
    public function testTask1()
    {
        $this->assertEquals(
            array(1, 1, 1, 3, 5, 9),
            fib(array(1, 1, 1), 6)
        );
    }
}