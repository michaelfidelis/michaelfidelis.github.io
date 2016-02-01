angular.module('app')
    .service('TarefaService', TarefaService);

function TarefaService() {
    var tarefas = [];
    var service = {
        listarTarefas: listarTarefas,
        adicionarTarefa: adicionarTarefa,
        alterarStatusTarefa: alterarStatusTarefa
    };
    return service;

    function listarTarefas() {
        return tarefas;
    }

    function adicionarTarefa(tarefa) {
        tarefas.push({
            descricao: tarefa.descricao,
            concluido: false
        })

    }

    function alterarStatusTarefa(index) {
        tarefas[index].concluido = !tarefas[index].concluido;
    }
}
