<?php

require __DIR__ . '/../vendor/autoload.php';

$configurator = new Nette\Configurator;

$configurator->setDebugMode(strncmp($_SERVER['REMOTE_ADDR'], '172.20.10.', 10) === 0);
$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTempDirectory(__DIR__ . '/../temp');

$configurator->createRobotLoader()
	->addDirectory(__DIR__)
	->register();

$configurator->addConfig(__DIR__ . '/config/config.neon');
$configurator->addConfig(__DIR__ . '/config/config.local.neon');

if (file_exists(__DIR__ . '/config/repo-version.neon')) {
    $configurator->addConfig(__DIR__ . '/config/repo-version.neon');

}

$container = $configurator->createContainer();

return $container;
