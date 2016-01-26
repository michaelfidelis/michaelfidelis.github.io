---
layout: post
title: "Usando Controllers no AngularJs"
date: 2016-01-25 20:30:00
categories: AngularJs
demo: 2016-01-25-usando-controllers-angularjs/
description: Que tal a sua página e o javascript se conhecerem? Crie controllers para que possam conversar melhor!
keywords: AngularJs, Bootstrap, controllers, ngController, javascript
---

No post anterior vimos a aplicação mais básica que podemos construir com angular. Agora faremos algo um pouco mais bacana, vamos conhecer os controllers. Com eles podemos manipular componentes da tela, acessar serviços etc. 

No fim desse tutorial teremos uma lista de contatos com as opções de adicionar e remover.

## Estrutura do projeto
Faça o download dos arquivos necessários :

    Bootstrap (bootstrap.min.css): http://getbootstrap.com/ 

    AngularJs (angular.min.js): http://angularjs.org/
    
E crie o arquivo **app.js**, dentro da pasta **/app**, veremos para que serve mais a frente.

    index.html
    assets/
    |   js/ 
    |     angular.min.js
    |   css/
    |     bootstrap.min.css
    app/
      app.js

## Página inicial


```html
<!DOCTYPE html>
<html ng-app="app">

<head>
    <title>Usando Controllers</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    
    <script src="assets/js/angular.min.js"></script>
    <script src="app/app.js"></script>
</body>

</html>
```

Na tag HTML inicializamos a aplicação e dizemos o nome do módulo que o Angular deve buscar. Neste caso **app**:

```html
<html ng-app="app">
```

## Criando o módulo
No arquivo **app.js** criaremos o módulo:

```javascript
angular.module('app', [])
```

E adicionaremos o controller que irá interagir com a tela:

```javascript
angular.module('app', [])
    .controller('ContatoController', ContatoController);

function ContatoController() {
    //Nosso código 
}
```
Podemos ter quantos controllers forem necessários, mas hoje só precisamos de um, *ContatoController*.

Por convenção colocamos *Controller* no sufixo dos controllers, assim facilitamos a compreensão do código. **Evite usar nomes como ContatoCtrl ou somente Contato.**

### Montando o formulário de contatos
Vamos colocar dois campos na tela, `nome` e `telefone`.

Dentro da tag ```<section>``` inserimos a diretiva ```ng-controller```, com o valor `ContatoController as contato`, assim atribuimos o "apelido" **contatoController** ao nosso controller.

```html
<section class="container" ng-controller="ContatoController as contatoController">
```

Veja como fica nosso formulário:

```html
<section class="container" ng-controller="ContatoController as contatoController">
    <h1>Contatos</h1>
    <form>
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" placeholder="José Silva" ng-model="contatoController.contato.nome">
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" class="form-control" placeholder="(11) 91234-5678" ng-model="contatoController.contato.telefone">
        </div>

        <button type="submit" class="btn btn-primary" ng-click="contatoController.adicionarContato()">Salvar</button>
    </form>
</section>

```

#### Classes utilizadas: 
* `container`: Deixa uma margem na página, para que os componentes não fiquem "encostados" nas bordas.
* `form-group`: Separa os componentes de um formulário, mantendo um espaçamento melhor entre eles.
* `form-control` Estiliza determinado campo do formulário. 
* `btn-primary`: Deixa botão azul, com bordas arredondadas 

### Incluindo contatos 
Vamos criar a função para incluir os contatos:

```javascript
function ContatoController() {
   var vm = this; //Guardamos o escopo em uma variável
   vm.contato = {}; //Contato do formulário
   vm.contatos = []; //Nossa lista de contatos
   
   vm.adicionarContato = adicionarContato;
   
   function adicionarContato() {
    //Incluimos o contato na lista
    vm.contatos.push({
        nome: vm.contato.nome,
        telefone: vm.contato.telefone
    });
        
    //Resetamos o contato do formulário
    vm.contato = {};
   }
}

```

E incluir a funçao de `adicionarContato()` ao botão do formulário:

```html
<button type="submit" class="btn btn-primary" ng-click="contato.adicionarContato()">Salvar</button>

```

Pronto! Já estamos adicionando contatos. Falta só exibi -los na tela.
Pra isso irei incluir uma tabela abaixo do formulário:

```html
<table class="table">
    <thead>
        <tr>
            <th>Nome</th>
            <th>Telefone</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="contato in contatoController.contatos">
            <td>{% raw %}{{contato.nome}}{% endraw %}</td>
            <td>{% raw %}{{contato.telefone}}{% endraw %}</td>
        </tr>    
    </tbody> 
</table>
```

Note, usamos a diretiva `ng-repeat` para iterar sobre a lista, então, para cada contato inserido será exibida uma linha na tabela.

Acesse a página do navegador e veja nossa agenda em funcionamento.

### Removendo contatos

Agora que já conseguimos incluir, vamos aprender a remover contatos de uma lista.

Criamos uma função no nosso controller chamada `removerContato(index)`, onde o **index** é a posição do contato na lista:

```javascript
function ContatoController() {
    var vm = this; //Guardamos o escopo em uma variável
    vm.contato = {}; //Contato do formulário
    vm.contatos = []; //Nossa lista de contatos

    vm.adicionarContato = adicionarContato;
    //Função adicionar contato suprimida...
    
    vm.removerContato = removerContato;
    
    function removerContato(index) {
        //Removemos o contato da lista
        vm.contatos.splice(index, 1);
    }
}
```

Vamos adicionar uma coluna na tabela para que possamos excluir o contato:

```html
<table class="table">
    <thead>
        <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ação</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="contato in contatoController.contatos">
            <td>{% raw %}{{contato.nome}}{% endraw %}</td>
            <td>{% raw %}{{contato.telefone}}{% endraw %}</td>
            <td><button class="btn btn-danger btn-xs" ng-click="contatoController.removerContato($index)">remover</button></td>
        </tr>    
    </tbody> 
</table>
```
### Plus: Esconder a lista caso não haja contatos cadastrados.

Uma das diretias que o Angular nos oferece é a `ng-show`. Com ela podemos exibir/esconder um elemento dada uma condição.

Para esconder a tabela é preciso adicionar a diretiva `ng-show` na tag `<table>`: 

```html
<table class="table" ng-show="contatoController.contatos.length > 0">
```
Também podemos mostrar uma mensagem caso não haja contatos cadastrados. Basta inserir um `<h3>` com a diretiva `ng-show`, da mesma forma que foi feito na tabela:

```html
<h3 class="text-center" ng-show="contatoController.contatos.length == 0">Não há contatos cadastrados.</h3>
```

## Resultado
#### index.html

```html
<!DOCTYPE html>
<html lang="pt-br" ng-app="app">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Usando Controllers</title>
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

<section class="container" ng-controller="ContatoController as contatoController">
    <h1>Contatos</h1>
    <form>
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" placeholder="José Silva" ng-model="contatoController.contato.nome">
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" class="form-control" placeholder="(11) 91234-5678" ng-model="contatoController.contato.telefone">
        </div>

        <button type="submit" class="btn btn-primary" ng-click="contatoController.adicionarContato()">Salvar</button>
    </form>
    <h3 class="text-center" ng-show="contatoController.contatos.length == 0">Não há contatos cadastrados.</h3>

    <table class="table" ng-show="contatoController.contatos.length > 0">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="contato in contatoController.contatos">
                <td>{% raw %}{{contato.nome}}{% endraw %}</td>
                <td>{% raw %}{{contato.telefone}}{% endraw %}</td>
                <td>
                    <button class="btn btn-danger btn-xs" ng-click="contatoController.removerContato($index)">remover</button>
                </td>
            </tr>
        </tbody>
    </table>
</section>

    <script src="../assets/js/angular.min.js"></script>
    <script src="app/app.js"></script>
</body>

</html>

```

#### app.js

```javascript
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

```
Acabamos nossa lista de contatos! Hoje aprendemos a adicionar e remover itens de uma lista usando controllers do angular e, de quebra, aprendemos a utilizar o `ng-show`. Bacana não? Deixe sua opinião nos comentários.  