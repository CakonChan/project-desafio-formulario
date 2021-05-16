$(document).ready(function() {

    //limpar formulario
    function limpa_formulario_cep() {
        $('#endereco').val('');
        $('#bairro').val('');
        $('#cidade').val('');
        $('#uf').val('');
    }

    //quando o campo cep está errado
    $('#cep').blur(function() {

        //Variavel Criada para cep somente digitos
        var cep = $(this).val().replace(/\D/g, '');

        //Campo Informado Exige Validação
        if (cep != '') {

            //Validar CEP precisa remover simbolos
            var validacaoCep = /^[0-9]{8}$/;

            //Validação CEP
            if (validacaoCep.test(cep)) {

                //Preenche campo "..." enquanto busca servidor
                $('#endereco').val('...');
                $('#bairro').val('...');
                $('#cidade').val('...');
                $('#uf').val('...');

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {

                    if (!('erro' in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $('#endereco').val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } else {
                        //CEP não encontrado...
                        limpa_formulario_cep();
                        alert("CEP não encontrado e Tente novamente ou Digite manualmente");
                    }
                });

            } else {
                //CEP Invalida
                limpa_formulario_cep();
                alert("CEP Inválido! Tente novamente!");
            }
        }
    });
});