const campos = document.querySelectorAll('[required]')

function validacaoCampo(campo) {
    //logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for (let error in campo.validity) {

            // Verifica se existem erros
            if (campo.validity[error] && !campo.validity.valid) {
                foundError = error;
            }
        }
        return foundError;
    }


    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: 'É Obrigatório'
            },
            tel: {
                valueMissing: 'É Obrigatório'
            }
        }
        return messages[campo.type][typeError];
    }

    function setCustomMessage(message) {
        const spanError = campo.parentNode.querySelector('span.error')
        const spanSuccess = campo.parentNode.querySelector('span.success')

        if (message) {
            spanSuccess.classList.remove('active')
            spanSuccess.innerHTML = ''
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else {
            spanError.classList.remove('active')
            spanError.innerHTML = ''
            spanSuccess.classList.add('active')
            spanSuccess.innerHTML = 'Sucesso!'
        }
    }

    return function() {
        const error = verifyErrors()

        if (error) {
            const message = customMessage(error)

            campo.style.borderColor = 'red'
            setCustomMessage(message)
        } else {
            campo.style.borderColor = 'green'
            setCustomMessage()
        }
    }
}

//Ocorre validacao quando clicar
function customValidation(event) {
    const campo = event.target
    const validation = validacaoCampo(campo)

    validation()
}

for (campo of campos) {

    //Ocorre INVALIDO quando falta campo preenchido
    campo.addEventListener('invalid', evento => {

        event.preventDefault()

        customValidation(event)
    })
    campo.addEventListener('blur', customValidation)
}


document.querySelector("form").addEventListener('submit', evento => {
    console.log('enviar o formulario')

    //nao vai enviar formulário
    event.preventDefault()
})