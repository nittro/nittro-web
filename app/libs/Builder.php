<?php


namespace App\Libs;


use Nette\Application\Application;
use Nette\Http\FileUpload;
use Nette\Neon\Neon;
use Nette\Utils\Finder;
use Nette\Utils\Random;
use Symfony\Component\Process\ProcessBuilder;

class Builder {

    /** @var Application */
    private $application;

    /** @var string */
    private $rootDir;

    /** @var string */
    private $tempDir;

    /** @var array */
    private $dependencies = null;

    /**
     * @param Application $application
     * @param string $rootDir
     * @param string $tempDir
     */
    public function __construct(Application $application, $rootDir, $tempDir) {
        $this->application = $application;
        $this->rootDir = realpath($rootDir);
        $this->tempDir = realpath($tempDir);
        @mkdir($this->tempDir, 0755, true);
    }


    public function build(array $config) {
        $tempDir = $this->allocateTempDir();
        $config = $this->prepareConfig($tempDir, $config);
        file_put_contents($tempDir . '/nittro.json', json_encode($config, JSON_PRETTY_PRINT));

        $builder = new ProcessBuilder();
        $builder->setPrefix($this->rootDir . '/node_modules/.bin/gulp');
        $builder->setWorkingDirectory($this->rootDir);
        $builder->add('--gulpfile');
        $builder->add('gulpfile-builder.js');
        $builder->add('--job-dir');
        $builder->add($tempDir);

        $builder->getProcess()->mustRun();

        return $tempDir . '/nittro.zip';
    }

    private function allocateTempDir() {
        do {
            $tempDir = $this->tempDir . '/' . Random::generate();
        } while (@mkdir($tempDir, 0700, false) === false);

        $this->application->onShutdown[] = function () use ($tempDir) {
            $this->cleanupTempDir($tempDir);
        };

        return $tempDir;
    }

    private function prepareConfig($tempDir, array $config) {
        $config['base'] = array_fill_keys($config['base'], true);
        $config['extras'] = array_fill_keys($config['extras'], true);

        if ($config['bootstrap'] === 'auto') {
            if (!empty($config['bootstrap_options'])) {
                $config['bootstrap'] = Neon::decode($config['bootstrap_options']);
            } else {
                $config['bootstrap'] = true;
            }
        } else if ($config['bootstrap'] === 'custom') {
            $config['custom_bootstrap']->move($tempDir . '/bootstrap.js');
            $config['bootstrap'] = 'bootstrap.js';
        } else {
            $config['bootstrap'] = false;
        }

        unset($config['bootstrap_options'], $config['custom_bootstrap']);

        foreach (['vendor', 'libraries'] as $section) {
            if (!empty($config[$section])) {
                foreach (['js', 'css'] as $kind) {
                    if (!empty($config[$section][$kind])) {
                        mkdir($tempDir . '/' . $section . '/' . $kind, 0700, true);
                        $files = [];

                        /** @var FileUpload $file */
                        foreach ($config[$section][$kind] as $file) {
                            $files[] = $name = $section . '/' . $kind . '/' . $file->getSanitizedName();
                            $file->move($tempDir . '/' . $name);
                        }

                        $config[$section][$kind] = $files;
                    }
                }
            }
        }

        return $config;
    }

    /**
     * @return array
     */
    public function getDependencies() {
        if ($this->dependencies === null) {
            $this->dependencies = $this->loadDependencies();
        }

        return $this->dependencies;
    }

    /**
     * @return array
     */
    private function loadDependencies() {
        $modules = Finder::findDirectories('nittro-*')->in($this->rootDir . '/node_modules');
        $dependencies = [];

        foreach ($modules as $module) {
            if (is_file($module->getRealPath() . '/package.json')) {
                $package = json_decode(file_get_contents($module->getRealPath() . '/package.json'), true);
                list ($type, $name) = $this->extractTypeAndName($package['name']);

                if (!empty($package['dependencies'])) {
                    foreach ($package['dependencies'] as $dependency => $version) {
                        if (strncmp($dependency, 'nittro-', 7) === 0) {
                            list ($t, $n) = $this->extractTypeAndName($dependency);
                            $dependencies[$type][$name][$t][] = $n;
                        }
                    }
                }
            }
        }

        return $dependencies;
    }

    private function extractTypeAndName($package) {
        $i = strrpos($package, '-');
        $type = substr($package, 0, $i) === 'nittro-extras' ? 'extras' : 'base';
        $name = substr($package, $i + 1);
        return [$type, $name];
    }

    private function cleanupTempDir($tempDir) {
        $files = Finder::find('**')->from($tempDir)->childFirst();

        foreach ($files as $file) {
            if ($file->isDir()) {
                rmdir($file->getRealPath());
            } else {
                unlink($file->getRealPath());
            }
        }

        rmdir($tempDir);
    }
}
