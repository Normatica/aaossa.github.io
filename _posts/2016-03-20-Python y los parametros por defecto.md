---
layout: post
title:  'Python y los parámetros por defecto'
date:   2016-03-20
categories: python
---

Es posible que al usar funciones con parámetros por defecto se encuentren con cierto comportamiento inesperado o poco intuitivo de Python. Por estas cosas siempre hay que revisar el código, conocerlo lo mejor posible y saber responder cuando las cosas no funcionan como uno espera.

Veamos el comportamiento de los parámetros por defecto en funciones:

```python
def funcion(lista=[]):
    lista.append(1)
    print("La lista vale: {}".format(lista))
```

Si llamamos a la función una vez...

{% highlight python %}
>> funcion()
La lista vale: [1]
{% endhighlight %} 

... todo funciona como lo suponemos, pero y si probamos otra vez...

{% highlight python %}
>> funcion()
La lista vale: [1, 1]
>> funcion()
La lista vale: [1, 1, 1]
{% endhighlight %}

... ok? No funciona como lo supondríamos.

Esto también podemos extenderlo a clases, donde es común usar parámetros por defecto:

{% highlight python %}
class Clase:

    def __init__(self, lista=[]):
        self.lista = lista
        self.lista.append(1)
        print("Lista de la clase: {}".format(self.lista))
{% endhighlight %}

Vamos al código: 

{% highlight python %}
# Instanciamos dos objetos
>> A = Clase()
Lista de la clase: [1]
>> B = Clase()
Lista de la clase: [1, 1]

# Modificamos el parametro en una de las instancias
>> A.lista.append(5)

# What??
>> print(A.lista)
[1, 1, 5]
>> print(B.lista)
[1, 1, 5]
{% endhighlight %}

# Investigando nuestro código

Veamos un poco qué está pasando en nuestro código:

{% highlight python %}
# Instanciemos algunos objetos
>> A = Clase()
Lista de la clase: [1, 1, 5, 1]
>> B = Clase()
Lista de la clase: [1, 1, 5, 1, 1]
>> C = Clase(lista=["GG"]) # Usaremos esta instancia como control
Lista de la clase: ['GG', 1]

# Los objetos son distintos!
>> id(A)
72497248 
>> id(B)
72497192 
>> id(C)
68790472

# Pero la lista es la misma para A y para B :O
>> id(A.lista)
72545608 
>> id(B.lista)
72545608 
>> id(C.lista)
68790472
{% endhighlight %}

# ¿Qué está pasando? D:

En Python, las funciones son objetos del tipo `callable`, es decir, que son "llamables", ejecutan una operación.

{% highlight python %}
# De hecho, tienen atributos...
def funcion(lista=[]):
    lista.append(5)
{% endhighlight %}
{% highlight python %}
# En la funcion "funcion"...
>> funcion.__defaults__
([],)

# ... si la invocamos...
>> funcion()

# ahora tenemos...
>> funcion.__defaults__
([5],)

# Si vemos como quedo el metodo "__init__" de la clase Clase...
>> Clase.__init__.__defaults__
([1, 1, 5, 1, 1],)
{% endhighlight %}

El código que define a función es evaluado **una vez** y dicho valor evaluado es el que se usa en cada llamado posterior. Por lo tanto, **al modificar el valor de un parámetro por defecto que es mutable** (`list`, `dict`, etc.) **se modifica el valor por defecto para el siguiente llamado**.

# ¿Cómo evitar esto? 

Una solución simple es **usar `None`** como el valor predeterminado para los parámetros por defecto. Otra solución es la declaración de variables condicionales:


{% highlight python %}
class Clase:
    
    def __init__(self, lista=None):
        # Version "one-liner":
        self.lista = lista if lista is not None else list()
        
        # En su version extendida:
        if lista is not None:
            self.lista = lista
        else:
            self.lista = list()
{% endhighlight %}

**Importante:** Esto no es un bug/error/magia negra... Es Python. En Python *todo es un objeto*, incluso las funciones...

### Recursos sobre el tema:

* StackOverflow - “Least Astonishment” in Python: The Mutable Default Argument [[link]](http://stackoverflow.com/questions/1132941/least-astonishment-in-python-the-mutable-default-argument)
* Effbot.org - Default Parameter Values in Python [[link]](http://effbot.org/zone/default-values.htm)
* Python Docs - Compound statements > Function definitions [[link]](https://docs.python.org/3.4/reference/compound_stmts.html#def)
* Python Docs - Data model > The standard type hierarchy [[link]](https://docs.python.org/3.4/reference/datamodel.html#types)