<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 16:52
 */

namespace App\Presenters;


use Nette\Neon\Neon;

class HookPresenter extends BasePresenter {

    public function actionDefault() {
        $reposPath = $this->context->parameters['reposPath'];

        $event = $this->getHttpRequest()->getHeader('X-Github-Event');

        switch ($event) {
            case 'gollum':
                exec('cd ' . escapeshellarg($reposPath . '/wiki') . ' && git pull');
                break;

            case 'release':
                $reposPath = escapeshellarg($reposPath . '/nettejs.git');
                exec('cd ' . $reposPath . ' && git fetch');
                $latest = trim(`cd $reposPath && git tag --sort=-v:refname | head -n 1`);
                file_put_contents($this->context->parameters['appDir'] . '/config/repo-version.neon', Neon::encode(['parameters' => ['netteJsVersion' => $latest]]));
                break;

            case 'push':
                $path = $this->context->parameters['appDir'] . '/..';
                exec('cd ' . escapeshellarg($path) . ' && git pull && composer install');
                break;
        }

        $this->terminate();

    }

}
