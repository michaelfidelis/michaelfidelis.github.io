---
layout: post
title: "Construindo uma aplicação básica com AngularJs"
date: 2016-01-23 23:00:00
categories: Web AngularJs Bootstrap Develop

---


#Construindo uma aplicação básica com AngularJs

AngularJs é um framework da Google que eu tenho utilizado bastante ultimamente. Ele facilita o desenvolvimento e é fácil de aprender.

A estrutura da página continua a mesma. Puro HTML, com a inclusão de algumas diretivas que o framework oferece.

##Estrutua inicial

A estrutura que iremos utilizar inicialmente é essa:

{% highlight html %}
<!DOCTYPE html>
<html ng-app>

<head>
    <title>AngularJs</title>
</head>

<body>
  
    <!-- SCRIPTS -->
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

Podemos mostrar o valor da variável na tela, usando o par de colchetes `{{ }}`, veja: 

{% highlight html %}
<h1>Olá {{nome}}!</h1>
{% endhighlight %}

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
    <h1 class="text-center">Olá {{nome}}!</h1>
    <!-- SCRIPTS -->
    <script src="assets/js/angular.min.js"></script>
</body>

</html>
{% endhighlight %}

Acesse a página por seu navegador e veja funcionando!