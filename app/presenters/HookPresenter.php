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
        $payload = $this->getHttpRequest()->getPost();

        file_put_contents($reposPath . '/hook.json', json_encode($payload));

        $this->terminate();

    }

}
