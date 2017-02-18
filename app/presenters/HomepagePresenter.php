<?php

namespace App\Presenters;


use App\Libs\Builder;
use App\Libs\FormRules;
use Nette\Application\Responses\FileResponse;
use Nette\Application\UI\Form;
use Nette\Neon\Neon;

class HomepagePresenter extends BasePresenter {

    /** @var Builder */
    private $builder;


    public function injectHomepage(Builder $builder) {
        $this->builder = $builder;
    }


    public function renderDefault($tut = null) {
        if ($tut) {
            $this->postGet('this', ['tut' => null]);
            $this->redrawControl('tutorial');

        }
    }

    public function renderDownload() {
        $this->title = 'Download';
        $this->tab = 'download';
        $this->template->dependencies = $this->builder->getDependencies();
    }

    public function renderTutorial($step) {
        $this->setView('tutorial' . (int) $step);

        if ($this->isAjax()) {
            $this->redrawControl('tutorial');

        }
    }


    public function doBuild(Form $form, array $values) {
        try {
            $archivePath = $this->builder->build($values);
        } catch (\Exception $e) {
            $form->addError(get_class($e) . ': ' . $e->getMessage());
            return;
        }

        $this->sendResponse(new FileResponse($archivePath));
    }

    public function createComponentBuilderForm() {
        $form = new Form();

        $vendor = $form->addContainer('vendor');

        $vendor->addMultiUpload('js', 'JavaScripts:')
            ->addCondition(Form::FILLED)
            ->addRule(Form::MIME_TYPE, 'Only JavaScript files are allowed', 'text/javascript,application/javascript');

        $vendor->addMultiUpload('css', 'Stylesheets:')
            ->addCondition(Form::FILLED)
            ->addRule(Form::MIME_TYPE, 'Only CSS and LESS files are allowed', 'text/css,text/less');

        $form->addCheckboxList('base', 'Base packages:', [
            'core' => 'Core',
            'datetime' => 'DateTime',
            'neon' => 'Neon',
            'di' => 'DI',
            'ajax' => 'AJAX',
            'forms' => 'Forms',
            'page' => 'Page',
            'flashes' => 'Flashes',
            'routing' => 'Routing',
        ]);

        $form->addCheckboxList('extras', 'Extras:', [
            'checklist' => 'CheckList',
            'dialogs' => 'Dialogs',
            'confirm' => 'Confirm',
            'dropzone' => 'DropZone',
            'paginator' => 'Paginator',
            'keymap' => 'KeyMap',
            'storage' => 'Storage',
        ]);

        $libraries = $form->addContainer('libraries');

        $libraries->addMultiUpload('js', 'JavaScripts:')
            ->addCondition(Form::FILLED)
            ->addRule(Form::MIME_TYPE, 'Only JavaScript files are allowed', 'text/javascript,application/javascript');

        $libraries->addMultiUpload('css', 'Stylesheets:')
            ->addCondition(Form::FILLED)
            ->addRule(Form::MIME_TYPE, 'Only CSS and LESS files are allowed', 'text/css,text/less');

        $form->addRadioList('bootstrap', 'Bootstrap:', [
                'auto' => 'Generate automatically',
                'custom' => 'Upload custom',
                'none' => 'None',
            ])
            ->setRequired()
            ->addConditionOn($form['base'], FormRules::DOES_NOT_CONTAIN, 'di')
            ->addRule(Form::NOT_EQUAL, 'You must include the DI Base package to use an auto-generated bootstrap', 'auto');

        $form->addTextArea('bootstrap_options', 'Bootstrap options:');

        $form->addUpload('custom_bootstrap', 'Custom bootstrap:')
            ->addConditionOn($form['bootstrap'], Form::EQUAL, 'custom')
            ->addRule(Form::FILLED);

        $form->addCheckbox('stack', 'Include _stack library');

        $form->addSubmit('build', 'Build');

        $form->onSuccess[] = [$this, 'doBuild'];

        $form->setDefaults([
            'base' => [
                'core',
                'datetime',
                'neon',
                'di',
                'ajax',
                'forms',
                'page',
                'flashes',
            ],
            'extras' => [
                'dialogs',
                'confirm',
                'keymap',
            ],
            'bootstrap' => 'auto',
            'bootstrap_options' => "params:\nextensions:\nservices:\nfactories:\n",
            'stack' => true,
        ]);

        return $form;
    }
}
