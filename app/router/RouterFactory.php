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
	public static function createRouter()
	{
		$router = new RouteList;
		$router[] = new Route('wiki/<path .+>', 'Wiki:default');
		$router[] = new Route('hook', 'Hook:default');
		$router[] = new Route('<action>', 'Homepage:default');
		return $router;
	}

}
