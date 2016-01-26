angular.module('app', [])
    .controller('ContatoController', ContatoController);


function ContatoController() {
    var vm = this; //Guardamos o escopo em uma variável
    vm.contato = {}; //Contato do formulário
    vm.contatos = []; //Nossa lista de contatos

    vm.adicionarContato = adicionarContato;
    vm.removerContato = removerContato;

    function adicionarContato() {
        //Incluimos o contato na lista
        vm.contatos.push({
            nome: vm.contato.nome,
            telefone: vm.contato.telefone
        });

        //Resetamos o contato do formulário
        vm.contato = {};
    }

    function removerContato(index) {
        //Removemos o contato da lista
        vm.contatos.splice(index, 1);
    }
}
