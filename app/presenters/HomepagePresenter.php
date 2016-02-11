<?php

namespace App\Presenters;


class HomepagePresenter extends BasePresenter {

    public function renderDefault() {

    }

    public function renderDownload() {
        $this->title = 'Download';
        $this->tab = 'download';
        $this->template->currentVersion = $this->context->parameters['netteJsVersion'];

    }

}
