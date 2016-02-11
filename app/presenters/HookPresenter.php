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

        $event = $this->getHttpRequest()->getHeader('X-GitHub-Event');

        switch ($event) {
            case 'gollum':
                exec('cd ' . escapeshellarg($reposPath . '/wiki') . ' && git reset --hard && git pull', $output);
                break;

            case 'release':
                $reposPath = escapeshellarg($reposPath . '/nettejs.git');
                exec('cd ' . $reposPath . ' && git fetch');
                break;

            case 'push':
                $path = $this->context->parameters['appDir'] . '/..';
                exec('cd ' . escapeshellarg($path) . ' && git reset --hard && git pull && composer install');
                exec('cd ' . escapeshellarg($path . '/temp/cache') . ' && rm -rf ./*');
                break;
        }

        $this->terminate();

    }

}
