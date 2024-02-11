document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.feedback__form');
    const inputs = form.querySelectorAll('.feedback__form-input');
    const labels = form.querySelectorAll('label');
    const button = form.querySelector('.feedback__form-btn');
    
    const clickBtn = (button, inputs, labels, form) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            checkIfInputEmpty(inputs, labels);
            checkValidation(inputs, labels, 'email', 'feedback__form-input--error', 'feedback__form-label--error', 'email указан некоректно');
            checkValidation(inputs, labels, 'website', 'feedback__form-input--error', 'feedback__form-label--error', 'сайт указан некоректно');
            
            if (checkValidation(inputs, labels, 'email', 'feedback__form-input--error', 'feedback__form-label--error', 'email указан некоректно') && checkValidation(inputs, labels, 'website', 'feedback__form-input--error', 'feedback__form-label--error', 'сайт указан некоректно')) {
                form.reset();
            }
        })
    }

    const checkIfInputEmpty = (inputs, labels) => {
        inputs.forEach((input, i) => {
            input.classList.remove('feedback__form-input--error');
            labels[i].classList.remove('feedback__form-label--error');
            if (!input.value) {
                labels[i].innerText = 'Поле обязательное для заполнения';
                input.classList.add('feedback__form-input--error');
                labels[i].classList.add('feedback__form-label--error');
            }
        })
    }

    const checkValidation = (inputs, labels, identificator, inputErrorClass, labelErrorClass, wrongText) => {
        const emailValidator = (input) => {
            const validator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;;
            return validator.test(input)
        }
        const siteValidator = (input) => {
            const validator = /^([\wёa-я-]{2,}\.)+[\wёa-я-]{2,}$/i;
            return validator.test(input)
        }
        let labelElem;
        let inputElem;
        labels.forEach(label => {
            if (label.htmlFor == identificator) {
                return labelElem = label
            }
        })
        inputs.forEach(input => {
            if (input.name == identificator) {
                return inputElem = input
            }
        })
        if (inputElem.value.length > 0) {
            inputElem.classList.remove(inputErrorClass);
            labelElem.classList.remove(labelErrorClass);
            if (identificator == 'email') {
                emailValidator(inputElem.value);
                if (emailValidator(inputElem.value) == false) {
                    inputElem.classList.add(inputErrorClass);
                    labelElem.innerText = wrongText;
                    labelElem.classList.add(labelErrorClass);
                    return false
                } else {
                    return true
                }
            }
            if (identificator == 'website') {
                siteValidator(inputElem.value);
                if (siteValidator(inputElem.value) == false) {
                    inputElem.classList.add(inputErrorClass);
                    labelElem.innerText = wrongText;
                    labelElem.classList.add(labelErrorClass);
                    return false
                } else {
                    return true
                }
            }
            
        }
    }



    clickBtn(button, inputs, labels, form);
})