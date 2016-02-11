<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 01:37
 */

namespace App\Presenters;
use App\Libs\Wiki;


class WikiPresenter extends BasePresenter {

    /** @var Wiki */
    private $wiki;

    public function injectWiki(Wiki $wiki) {
        $this->wiki = $wiki;

    }

    public function renderDefault($path = 'Home') {
        $this->title = $this->wiki->getPageName($path);
        $this->tab = 'wiki';

        try {
            $this->template->contents = $this->wiki->renderPage($path);

        } catch (\Exception $e) {
            $this->error();

        }

        if ($this->getHttpRequest()->getHeader('X-Wiki')) {
            $this->redrawControl('wiki');
            $this->template->toc = [];

        } else {
            $this->template->toc = $this->wiki->getTOC();

        }
    }

    protected function createTemplate() {
        $template = parent::createTemplate();

        $template->addFilter('wikiname', function($value) {
            return $this->wiki->getPageName($value);
        });

        return $template;
    }


}
