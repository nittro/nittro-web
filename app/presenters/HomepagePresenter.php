<?php

namespace App\Presenters;


class HomepagePresenter extends BasePresenter {

    public function renderDefault($tut = null) {
        if ($tut) {
            $this->postGet('this', ['tut' => null]);
            $this->redrawControl('tutorial');

        }
    }

    public function renderDownload() {
        $this->title = 'Download';
        $this->tab = 'download';

        $reposPath = escapeshellarg($this->context->parameters['reposPath'] . '/nittro.git');
        $latest = trim(`cd $reposPath && git tag --sort=-v:refname | head -n 1`);
        $this->template->currentVersion = $latest;

    }

    public function renderTutorial($step) {
        $this->setView('tutorial' . (int) $step);

        if ($this->isAjax()) {
            $this->redrawControl('tutorial');

        }
    }

}
