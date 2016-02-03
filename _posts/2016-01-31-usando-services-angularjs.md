---
layout: post
title: "Usando Services no AngularJs"
date: 2016-01-31 20:30:00
categories: AngularJs
demo: 2016-01-31-usando-services-angularjs/
description: Aprenda a usar services para separar as responsabilidades em sua aplicação
keywords: AngularJs, Bootstrap, services, ngServices, ngFactory, javascript
---

Services são os "provedores" de informação, aqueles que encapsulam o acesso aos dados, deixando aos `controllers` somente a tarefa de exibi -los. Ainda não sabe o que são controllers? Recomendo que dê uma olhada [nesse post]({{site.url}}/angularjs/usando-controllers-angularjs/) antes de continuar.

Você tambem pode aprender bastante na [documentação oficial](https://docs.angularjs.org/guide/), lá tem exemplos bem bacanas de [controllers](https://docs.angularjs.org/guide/controllers) e [services](https://docs.angularjs.org/guide/services).

## Estrutura do projeto
Antes de  criar as pastas do projeto, baixe as bibliotecas necessárias:

    Bootstrap (bootstrap.min.css): http://getbootstrap.com/ 

    AngularJs (angular.min.js): http://angularjs.org/
    
Vamos separar os arquivos de forma que cada componente fique em uma pasta separada. Assim saberemos que cada arquivo tem uma responsabilidade e facilitamos a manutenção.

```bash
    ListaDeTarefas
    ├── index.html
    ├── app/
    |    └── app.js
    ├── assets/
    |   ├── css/
    |   |   └── bootstrap.min.css
    |   └── js/
    |        └── angular.min.js
    └── tarefa/
        ├── tarefa.controller.js
        └── tarefa.service.js
```

## Página inicial


```html
<!DOCTYPE html>
<html lang="pt-br" ng-app="app">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">

    <title>Aprendendo Services |MF Blog</title>
</head>

<body>

    <section class="container">
        <!-- Nosso código -->
    </section>
    
    <!-- Carregamos os scripts necessários -->
    <script src="assets/js/angular.min.js"></script>
    <script src="app/app.js"></script>
    <script src="app/tarefa/tarefa.service.js"></script>
    <script src="app/tarefa/tarefa.controller.js"></script>
</body>

</html>
```

## Inicializando nosso módulo
No arquivo **app.js** colocamos a seguinte linha para instanciar nossa aplicação **app**:

```js
angular.module('app', []);
```

## Construindo o service

Inclua o seguinte código no arquivo **tarefa.service.js**: 

```js
angular.module('app')
    .service('TarefaService', TarefaService);

function TarefaService() {
    //Lista de tarefas que usaremos na aplicação
    var tarefas = [];
    
    //Mapeamos as funções primeiro
    var service = {
        listarTarefas: listarTarefas,
        adicionarTarefa: adicionarTarefa,
        alterarStatusTarefa: alterarStatusTarefa
    };
    return service;

    //Criamos elas depois
    function listarTarefas() {
        return tarefas;
    }

    function adicionarTarefa(tarefa) {
        //Inserimos a tarefa na lista com o comando *push*
        tarefas.push({
            descricao: tarefa.descricao,
            concluido: false
        });    
    }
    
    
    function alterarStatusTarefa(index) {
        //Invertemos o status da tarefa
        tarefas[index].concluido = !tarefas[index].concluido;
    }
}
```

**Dica:** Mantenha seu código separado! Crie as variaveis necessárias, mapeie as funções e depois as construa. 

## Por último, o controller

Inclua o seguinte código no arquivo **tarefa.controller.js**: 

```js
angular.module('app')
    .controller('TarefaController', TarefaController);

//Aqui injetamos a dependencia do TarefaService
TarefaController.$inject = ['TarefaService'];

//Depois de injetado é só passar como paramêtro para usar
function TarefaController(TarefaService) {
    //Criamos as variáveis
    var vm = this;
    vm.tarefas = [];
   
   //Mapeamos as funções
    vm.adicionarTarefa = adicionarTarefa;
    vm.listarTarefas = listarTarefas;
    vm.alterarStatusTarefa = alterarStatusTarefa;
    
    vm.listarTarefas();
    
    
    //Construímos as funções
    function listarTarefas() {
        //A lógica para listar as tarefas fica no service
        vm.tarefas = TarefaService.listarTarefas();
    }
    
    function adicionarTarefa() {
        TarefaService.adicionarTarefa(vm.tarefa);
        
        //E limpamos a tarefa do formulário
        vm.tarefa = {};
    }
    
    function alterarStatusTarefa(index) {
        //Chamamos o service para concluir a tarefa
        TarefaService.alterarStatusTarefa(index);
    }
}
```

Pronto! A lógica da aplicação já pode ser incorporada à tela. 
Coloque a diretiva `ng-controller` na tag `<section>`, da seguinte forma:

```html
 <section class="container" ng-controller="TarefaController as tarefaController">
```

Indicamos um controller para a nossa tela e demos o apelido `tarefaController` à ele.

Vamos inserir uma campo de texto e uma lista em nossa página.
Vou usar algumas classes do [bootstrap](http://getbootstrap.com/css/) para estilizar os componentes. 

```html
 <section class="container" ng-controller="TarefaController as tarefaController">
    <form name="tarefaForm" novalidate>
        <div class="form-group col-md-12">
            <h1 class="text-center">Tarefas</h1>
        </div>
        <div class="form-group col-md-offset-2 col-md-7">
            <input class="form-control" type="text" name="tarefa" 
                placeholder="Tarefa..." ng-model="tarefaController.tarefa.descricao" required>
        </div>
        <div class="form-group col-md-1">
             <button class="btn btn-primary" ng-click="tarefaController.adicionarTarefa()" 
                ng-disabled="tarefaForm.tarefa.$error.required">Add</button>
        </div>

        <div class="form-group col-md-offset-2 col-md-8">
        {% raw %}
            <ul class="list-group">
                <li class="list-group-item" 
                    ng-class="{'list-group-item-success': tarefa.concluido}" 
                    ng-repeat="tarefa in tarefaController.tarefas">
                    {{tarefa.descricao}}
                    <a href="#" ng-click="tarefaController.alterarStatusTarefa($index)" 
                        class="pull-right">{{tarefa.concluido ? 'Retomar':'Concluir'}}</a>
                </li>
            </ul>
        {% endraw %}
        </div>
    </form>
</section>
```

## PLUS: Validando o preenchimento da tarefa

Para impedir que seja inserida uma tarefa em branco você pode inserir a diretiva `ng-disabled` no botão:

```html
<button class="btn btn-primary" ng-click="tarefaController.adicionarTarefa()" 
                ng-disabled="tarefaForm.tarefa.$error.required">Add</button>
```

O que significa **tarefaForm.tarefa.$error.required**?

```bash
  tarefaForm    .   tarefa          .   $error                .   required
 [nome do form] .  [nome do campo]  .  [tipo de verificação]  . [verificação]
```

### Diretivas utilizadas

Maiores explicações das diretivas podem ser encontradas na [documentação do angular](https://docs.angularjs.org/guide/directive)

* `ng-controller`: Indica o controller para determinada região da tela. 
* `ng-model`: Mapeia nosso campo para o controller. 
* `ng-class`: Se a condição passada for verdadeira ele adiciona uma classe CSS ao componente.
* `ng-repeat`: Itera sobre uma lista no controller.
* `ng-click`: É executada uma função assim que o componente é clicado.
* `ng-disabled`: O componente é desabilitado caso a condição verificada seja verdadeira.

## Vamos testar? 
[Clique aqui]({{site.url}}/demos/2016-01-31-usando-services-angularjs/) e veja nossa aplicação funcionando.
Confira o código final do post [nesse link](https://github.com/michaelfidelis/michaelfidelis.github.io/tree/master/demos/2016-01-31-usando-services-angularjs).
