<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 16:16
 */

namespace App\Presenters;
use Nette\Application\UI\Presenter;

class BasePresenter extends Presenter {

    /** @var string */
    protected $title = null;

    /** @var string */
    protected $tab = 'home';

    /** @var bool */
    private $signalled;



    protected function startup() {
        parent::startup();

        $this->signalled = $this->getSignal() !== null;

    }

    public function isSignalled() {
        return $this->signalled;

    }

    public function postGet($destination, array $args = []) {
        if ($this->isAjax()) {
            $this->payload->postGet = true;
            $this->payload->url = $this->link($destination, $args);

        } else {
            $this->redirect($destination, $args);

        }
    }

    protected function afterRender() {
        parent::afterRender();

        $this->template->title = $this->title;
        $this->template->tab = $this->tab;

        if ($this->isAjax()) {
            if (!$this->isSignalled() && !$this->isControlInvalid()) {
                $this->redrawControl('content');
                $this->payload->title = $this->title;
                $this->payload->tab = $this->tab;

            }
        }
    }


}
