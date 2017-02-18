_context.invoke('App', function (Vendor) {

    Vendor.validators.AppLibsFormRules_validateContains = function (elem, arg, value) {
        return Array.isArray(value) && value.indexOf(arg) > -1;
    };

    Vendor.validators.AppLibsFormRules_validateDoesNotContain = function (elem, arg, value) {
        return !Vendor.validators.AppLibsFormRules_validateContains(elem, arg, value);
    };

}, {
    Vendor: 'Nittro.Forms.Vendor'
});
