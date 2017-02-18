<?php


namespace App\Libs;


use Nette\Forms\IControl;

class FormRules {

    const CONTAINS = 'App\Libs\FormRules::validateContains',
        DOES_NOT_CONTAIN = 'App\Libs\FormRules::validateDoesNotContain';

    public static function validateContains(IControl $control, $item) {
        $value = $control->getValue();
        return is_array($value) && in_array($item, $value, true);
    }

    public static function validateDoesNotContain(IControl $control, $item) {
        return !static::validateContains($control, $item);
    }

}
