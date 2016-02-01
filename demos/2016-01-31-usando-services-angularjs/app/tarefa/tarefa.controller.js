angular.module('app')
    .controller('TarefaController', TarefaController);

TarefaController.$inject = ['TarefaService'];

function TarefaController(TarefaService) {
    var vm = this;
    vm.tarefas = [];

    vm.adicionarTarefa = adicionarTarefa;
    vm.listarTarefas = listarTarefas;
    vm.alterarStatusTarefa = alterarStatusTarefa;

    vm.listarTarefas();

    function listarTarefas() {
        vm.tarefas = TarefaService.listarTarefas();
    }

    function adicionarTarefa() {
        TarefaService.adicionarTarefa(vm.tarefa);
        vm.tarefa = {};
    }

    function alterarStatusTarefa(index) {
        TarefaService.alterarStatusTarefa(index);
    }
}
