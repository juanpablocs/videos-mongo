const FormData = require('form-data');

module.exports.formData = (params) => {
    const form = new FormData();
    for (key in params) {
        form.append(key, params[key]);
    }
    return form;
}