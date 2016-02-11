<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 01:45
 */

namespace App\Libs;
use Nette\Utils\Finder;



class Wiki {

    /** @var Parsedown */
    private $parsedown;

    private $wikiPath;

    public function __construct(Parsedown $parsedown, $wikiPath) {
        $this->parsedown = $parsedown;
        $this->wikiPath = $wikiPath;

    }

    public function getTOC() {
        $files = Finder::findFiles('*.md')->from($this->wikiPath);
        $pages = [];
        $offset = strlen($this->wikiPath);

        foreach ($files as $file) {
            $path = trim(substr($file->getPath(), $offset), '/');
            $file = $file->getBasename('.md');
            $page = str_replace('-', ' ', $file);
            $cursor = & $pages;

            if ($path) {
                foreach (explode('/', $path) as $dir) {
                    $cursor = &$cursor[$dir];

                }
            }

            $cursor[$file] = $page;

        }

        unset($cursor);

        return $pages;

    }

    public function renderPage($path) {
        $path = $this->wikiPath . '/' . $path . '.md';

        if (!file_exists($path)) {
            throw new \Exception('File not found');

        }

        $html = $this->parsedown->parse(file_get_contents($path));
        return $html;

    }

    public function getPageName($path) {
        return str_replace('-', ' ', basename($path, '.md'));
    }

}
