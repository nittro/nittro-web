<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 11/02/16
 * Time: 16:16
 */

namespace App\Presenters;
use Nittro\Bridges\NittroUI\Presenter;

class BasePresenter extends Presenter {

    /** @var string */
    protected $title = null;

    /** @var string */
    protected $tab = 'home';


    protected function afterRender() {
        parent::afterRender();

        $this->template->title = $this->title;
        $this->template->tab = $this->tab;

        if ($this->isAjax()) {
            $this->payload->title = $this->title;
            $this->payload->tab = $this->tab;
        }
    }


}
