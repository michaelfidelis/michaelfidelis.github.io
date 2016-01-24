---
layout: post
title: "Construindo uma aplicação básica com AngularJs"
date: 2016-01-24 01:30:00
categories: AngularJs
---

AngularJs é um framework da Google que eu tenho utilizado bastante ultimamente. Ele facilita o desenvolvimento e é fácil de aprender. 

## Estrutura inicial

A estrutura da página é praticamente a mesma. Puro HTML, com a inclusão de algumas diretivas.

Diretivas são "propriedades" que podemos adicionar à tag. Você pode criar as suas, mas por enquanto usaremos as que o framework oferece. Algumas delas são *ng-app*, *ng-model*, *ng-view*, *ng-show*, *ng-repeat*, veremos o funcionamento delas em outros posts.

A estrutura que iremos utilizar inicialmente é essa:

```html
<!DOCTYPE html>
<html>

<head>
    <title>AngularJs</title>
</head>

<body>
  
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
</body>

</html>

```

## Conceitos 

Para que possamos fazer algo com angular em nossa página devemos inicializar a aplicação atravez da diretiva ```ng-app```.

Normalmente é inserida na tag html: 

```html
<html ng-app>
```

Pronto! Nossa aplicação foi inicializada. Agora podemos indicar os campos pela diretiva ```ng-model```


```html
    <input type="text" name="nome" placeholder="Digite seu nome..." ng-model="nome">
```

A diretiva ```ng-model='nome'``` quer dizer que nosso campo apontando para a váriavel **nome** no angular que, se não existir, é criada automaticamente. 

Podemos mostrar o valor da variável na tela, usando o par de colchetes **\{\{ \}\}**, veja: 

```html
<h1>Olá \{\{nome\}\}</h1>
```

Juntando tudo temos algo parecido com o código abaixo: 

```html
<!DOCTYPE html>
<html ng-app>

<head>
    <title>AngularJs</title>
</head>

<body>
    <label for="nome">
        <input type="text" name="nome" placeholder="Digite seu nome..." ng-model="nome">
    </label>
    <h1 class="text-center">Olá \{\{nome\}\}!</h1>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
</body>

</html>
```

Digite alguma coisa e veja o que acontece. O texto da váriavel `nome` muda automaticamente!

Como? O Angular faz **bind** automático de suas variáveis, ou seja, se o valor for alterado, todas as suas referências são atualizadas.

## Plus: Estilizando a página com TwitterBootstrap

O resultado ficou legal, mas o visual não ajudou muito? O Bootstrap é um framework CSS com um monte de classes para estilizar os componentes da página. 

```html
<!DOCTYPE html>
<html lang="pt-br" ng-app>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>AngularJs</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <h1 class="text-center">Olá {% raw %}{{nome}}{% endraw %}!</h1>

    <div class="form-group col-md-offset-3 col-md-6">
        <input class="form-control" type="text" name="nome" ng-model="nome" placeholder="Digite seu nome...">
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
</body>

</html>
```

Você pode conferir o [resultado aqui]({{ site.baseurl }}demos/2016-01-24-aplicacao-basica-angularjs.html).

## Não acaba por aqui!
O Angular possui muitas outras coisas bem legais, *controllers*, *services*, *routes* e por aí vai. Nos próximos posts iremos mais a fundo nesses assuntos. Enquanto isso, dê uma olhada no [site do AngularJs](http://angularjs.org), tem um guia de refêrencia bem completo.

Se preferir outros blogs recomendo o [Tableless](http://tableless.com.br) ou [Scoth.io](scotch.io).

O [Bootstrap](http://getbootstrap.com) ajuda muito se você não quiser perder tempo mexendo no estilo da página (ou for ruim de design, assim como eu). Assim como ele há outros, como o [Material Design Lite](www.getmdl.io) da Google ou [Foundation Zurb](http://foundation.zurb.com).

Espero que tenham gostado. Peço que comentem para que eu possa melhorar nos próximos posts =)