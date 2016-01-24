---
layout: post
title: "Construindo uma aplicação básica com AngularJs"
date: 2016-01-23 23:00:00
categories: Web AngularJs Develop

---

AngularJs é um framework da Google que eu tenho utilizado bastante ultimamente. Ele facilita o desenvolvimento e é fácil de aprender.

A estrutura da página é praticamente a mesma. Puro HTML, com a inclusão de algumas diretivas.

Diretivas são "propriedades" que podemos adicionar à tag. Você pode criar as suas, mas por enquanto usaremos as que o framework oferece.
Algumas delas são `ng-app`, `ng-model`, `ng-view`, `ng-show`, `ng-repeat` e muitas outras  
##Estrutua inicial

A estrutura que iremos utilizar inicialmente é essa:

{% highlight html %}
<!DOCTYPE html>
<html ng-app>

<head>
    <title>AngularJs</title>
</head>

<body>
  
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
</body>

</html>
{% endhighlight %}

##Conceitos 

Para que possamos fazer algo com angular em nossa página devemos inicializar a aplicação atravez da diretiva `ng-app`.
Normalmente é inserida na tag html: 

{% highlight html %}
<html ng-app>
{% endhighlight %}

Pronto! Nossa aplicação foi inicializada. Agora podemos indicar os campos pela diretiva `ng-model`


{% highlight html %}
    <input type="text" name="nome" placeholder="Digite seu nome..." ng-model="nome">
{% endhighlight %}

A diretiva `ng-model='nome'` quer dizer que nosso campo da página está apontando para a váriavel `nome` no angular que, se não existir, é criada automaticamente.

Podemos mostrar o valor da variável na tela, usando o par de colchetes `\{\{ \}\}`, veja: 

{% highlight html %}
<h1>Olá {{nome}}!</h1>
{% endhighlight %}

Juntando tudo temos algo parecido com o código abaixo: 

{% highlight html %}
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
{% endhighlight %}

Digite alguma coisa e veja o que acontece. O texto da váriavel `nome` muda automaticamente!

Como? O Angular faz bind automático de suas variáveis, ou seja, se o valor for alterado, todas as suas referências são atualizadas.

### Plus: Estilizando a página com TwitterBootstrap

O resultado ficou legal, mas o visual não ajudou muito? O Bootstrap é um framework CSS com um monte de classes para estilizar os componentes da página. 

{% highlight html %}
<!DOCTYPE html>
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
    <h1 class="text-center">Olá \{\{nome\}\}!</h1>

    <div class="form-group col-md-offset-3 col-md-6">
        <input class="form-control" type="text" name="nome" ng-model="nome" placeholder="Digite seu nome...">
    </div>

    <!-- SCRIPTS -->
    <script src="assets/js/angular.min.js"></script>
</body>

</html>
{% endhighlight %}

Espero que tenham gostado. Peço que comentem para que eu possa melhorar nos próximos posts =)