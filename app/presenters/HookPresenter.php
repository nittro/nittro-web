<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 16:52
 */

namespace App\Presenters;


class HookPresenter extends BasePresenter {

    public function actionDefault() {
        $reposPath = $this->context->parameters['reposPath'];

        $event = $this->getHttpRequest()->getHeader('X-GitHub-Event');

        switch ($event) {
            case 'gollum':
                exec('cd ' . escapeshellarg($reposPath . '/wiki') . ' && git reset --hard && git pull', $output);
                break;

            case 'create':
                exec('cd ' . escapeshellarg($reposPath . '/nittro.git') . ' && git fetch');
                break;

            case 'push':
                $path = $this->context->parameters['appDir'] . '/..';
                exec(escapeshellarg($path . '/bin/deploy.sh') . ' > ' . escapeshellarg($path . '/log/deploy.log') . ' 2>&1');
                break;
        }

        $this->terminate();

    }

}
