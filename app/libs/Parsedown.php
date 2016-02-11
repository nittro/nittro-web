<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 02:14
 */

namespace App\Libs;


use Nette\Application\LinkGenerator;

class Parsedown extends \Parsedown {

    /** @var LinkGenerator */
    private $linkGenerator;


    public function __construct(LinkGenerator $linkGenerator) {
        $this->linkGenerator = $linkGenerator;
        $this->InlineTypes['['][] = 'WikiLink';

    }



    protected function blockHeader($Line) {
        $header = parent::blockHeader($Line);

        if (preg_match('/^###(?!#)/', $Line['text'])) {
            $hash = trim($Line['text'], '# ');
            $hash = preg_replace('/[^a-z\s]+/', '', strtolower($hash));
            $hash = trim(preg_replace('/\s+/', '-', $hash), '-');
            $header['element']['attributes']['id'] = $hash;

        }

        return $header;

    }

    protected function inlineWikiLink($Excerpt) {
        if (preg_match('/^\[\[([^]|]+)(?:\|([^]]+))?\]\]/', $Excerpt['text'], $m)) {
            $page = explode('#', @$m[2] ?: $m[1], 2);
            $url = $this->linkGenerator->link('Wiki:', ['path' => str_replace(' ', '-', $page[0])]);

            if (isSet($page[1])) {
                $url .= '#' . $page[1];

            }

            return [
                'extent' => strlen($m[0]),
                'element' => [
                    'name' => 'a',
                    'handler' => 'line',
                    'text' => $m[1],
                    'attributes' => [
                        'href' => $url,
                    ],
                ],
            ];
        }
    }
}
