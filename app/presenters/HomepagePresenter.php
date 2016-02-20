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

        $reposPath = $this->context->parameters['reposPath'];
        $packages = ['core', 'page', 'application', 'nittro'];
        $versions = [];

        foreach ($packages as $package) {
            $repoPath = escapeshellarg($reposPath . '/' . $package . '.git');
            $versions[$package] = trim(`cd $repoPath && git tag --sort=-v:refname | head -n 1`);

        }

        $this->template->versions = $versions;

    }

    public function renderTutorial($step) {
        $this->setView('tutorial' . (int) $step);

        if ($this->isAjax()) {
            $this->redrawControl('tutorial');

        }
    }

}
