<?php


require_once __DIR__ . '/../vendor/autoload.php';

$packageName = $_SERVER['argv'][1];
$packageVersion = $_SERVER['argv'][2];

$config = Nette\Neon\Neon::decode(file_get_contents(__DIR__ . '/config/config.local.neon'));
$config['parameters']['builds'][$packageName] = $packageVersion;
file_put_contents(__DIR__ . '/config/config.local.neon', Nette\Neon\Neon::encode($config, Nette\Neon\Neon::BLOCK));
