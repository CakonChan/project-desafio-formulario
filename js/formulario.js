const campos = document.querySelectorAll('[required]')


document.querySelector("form").addEventListener('submit', evento => {
    // NO Console informa que está enviado
    alert('Enviado Formulário.\nParabéns!')

    //nao vai enviar formulário
    event.preventDefault() //Cancela o evento se for cancelável
})

function validacaoCampo(campo) {
    //logica para verificar se existem erros
    function verifyErrors() {
        //variavel recebe falso como se fosse 0 pois não é inteiro
        let foundError = false;

        //for in - observar as propriedades de campo na questao de validacao
        //validity contém propriedades relacionadas à validação de um CAMPO
        for (let error in campo.validity) {

            // Verifica se existem erros e retorno true para exibir resultado no console
            if (campo.validity[error]) {
                foundError = error;
            }
        }
        return foundError;
    }

    //Exibe alerta quando campo obrigatorio em branco
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

    //Do index.html na tag span do error e success comunicação
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

            setCustomMessage(message)
        } else {
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