<?php

namespace App;

use Nette;
use Nette\Application\Routers\RouteList;
use Nette\Application\Routers\Route;


class RouterFactory
{

	/**
	 * @return Nette\Application\IRouter
	 */
	public static function createRouter($productionMode)
	{
        $flag = $productionMode ? Route::SECURED : 0;

		$router = new RouteList;
        $router[] = new Route('index.php', 'Homepage:default', Route::ONE_WAY | $flag);
		//$router[] = new Route('wiki[/<path .+>]', 'Wiki:default', $flag);
		$router[] = new Route('<action>[/<step \d+>]', 'Homepage:default', $flag);
		return $router;
	}

}
