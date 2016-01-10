---
layout: post
title:  "Mudandome a Jekyll"
date:   2016-01-10
categories: jekyll
---

Conocer una nueva librería, o lenguaje siempre es complicado al inicio, pero al menos con [**Jekyll**](http://jekyllrb.com/) todo ha sido bastante directo e intuitivo. 

Las primeras complicaciones vinieron por parte de mi sistema operativo: querido Windows. Al menos siempre hay gente que se acuerda del "caso especial" y es ahí donde nacen recursos como [**Run Jekyll on Windows**](http://jekyll-windows.juthilo.com/), que hacen el proceso mucho mas entendible y menos doloroso para los usuarios del producto de Microsoft (en mi caso Windows 7).

> Si eres usuario de Windows, y estás instalando Ruby: El instalador de Ruby en Windows no agrega Ruby al PATH, es decir, hay que hacerlo manualmente. Esto es importante.

Una vez que todo estuvo instalado y funcionando, todo fue sencillo. Gracias a que **GitHub gentilmente hostea** estas páginas y a que **Jekyll genera el proyecto automáticamente**. Así de simple es Jekyll (ejemplo tomado de su página oficial):

{% highlight console %}
~ $ gem install jekyll
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ jekyll serve
# Ir a http://localhost:4000
{% endhighlight %}

Además, para conectarlo con **GitHub Pages** tan solo tienes que crear un repo con el formato: `usuario.github.io` (`usuario` debe ser tu usuario de GitHub) y luego subir el contenido que quieras, por lo que simplemente usé el proyecto generado por **Jekyll**.

Gracias a la flexibilidad de **Jekyll** el proceso de iniciar tu página web es mucho mas rápido y menos doloroso. Un inicio rápido es editar los contenidos por defecto y agregar los tuyos, luego puedes empezar una personalización mas profunda. Yo al menos estoy acostumbrandome a la disposición de los archivos y pronto espero agregar mi estilo a la página, para diferenciarlo del generado por **Jekyll**.

En unas horas añadiré otros comentarios a esta entrada sobre los aspectos que descubierto de **Jekyll** y que he ido aplicando en mi página.



