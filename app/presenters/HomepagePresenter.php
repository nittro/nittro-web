<?php

namespace App\Presenters;


class HomepagePresenter extends BasePresenter {

    public function renderDefault() {

    }

    public function renderDownload() {
        $this->title = 'Download';
        $this->tab = 'download';

        $reposPath = escapeshellarg($this->context->parameters['reposPath'] . '/nettejs.git');
        $latest = trim(`cd $reposPath && git tag --sort=-v:refname | head -n 1`);
        $this->template->currentVersion = $latest;

    }

}
