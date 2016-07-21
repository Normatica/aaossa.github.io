---
layout: post
title:  'Python and default parameters'
date:   2016-03-20
lang: en
ref: Python y los parámetros por defecto
categories: python
---

When working with functions with default parameters is possible that you find an unexpected or "non-intuitive" behavior in Python. This is one of the reasons to always review and be familiar with your code, to know what to do when things work different than expected.

Let's write some code:

```python
def function(a_list=[]):
    a_list.append(1)
    print("My list is: {}".format(a_list))
```

If we call this function once...

```python
>> function()
My list is: [1]
```

... everything works as expected, but if we call `function` again...

```python
>> function()
My list is: [1, 1]
>> function()
My list is: [1, 1, 1]
```

... ok? This is not how any of this should work.

We could also extend this to classes, where default parameters are commonly used:

```python
class MyClass:

    def __init__(self, a_list=[]):
        self.my_list = a_list
        self.my_list.append(1)
        print("Intance list: {}".format(self.my_list))
```

Now, we are going to use this class and see what happens: 

```python
# Create two instances
>> A = MyClass()
Intance list: [1]
>> B = MyClass()
Intance list: [1, 1]

# Modify my_list in one of the instances
>> A.my_list.append(5)

# What??
>> print(A.my_list)
[1, 1, 5]
>> print(B.my_list)
[1, 1, 5]
```

# Reviewing our code

```python
# Create some instances
>> A = MyClass()
Intance list: [1, 1, 5, 1]
>> B = MyClass()
Intance list: [1, 1, 5, 1, 1]
>> C = MyClass(lista=["GG"]) # A "control instance"
Intance list: ['GG', 1]

# Our instances are not the same ...
>> id(A)
72497248 
>> id(B)
72497192 
>> id(C)
68790472

# But the list is shared! :O
>> id(A.my_list)
72545608 
>> id(B.my_list)
72545608 
>> id(C.my_list)
68790472
```

# What's going on? D:

In Python, functions are objects of type `callable` and, when called, execute an operation

```python
# Also, have attributes...
def function(a_list=[]):
    a_list.append(5)
```
```python
# In the function named `function`...
>> function.__defaults__
([],)

# ... if we invoke it...
>> function()

# now we have...
>> function.__defaults__
([5],)

# So, what happened in `MyClass.__init__`?...
>> MyClass.__init__.__defaults__
([1, 1, 5, 1, 1],)
```

The code that defines a function is evaluated **once** and such value is the one used in every call. So, **modify the value of a mutable default parameter** (`list`, `dict`, ...)**, modifies the value for every later call**

# How to avoid this? 

A simple solution is **use `None` as default value** for default parameters. Also, you could use a conditional variable declaration:


```python
class MyClass:
    
    def __init__(self, a_list=None):
        # One-liner
        self.my_list = a_list if a_list is not None else list()
        
        # Extended
        if a_list is not None:
            self.my_list = a_list
        else:
            self.my_list = list()
```

**Important:** This is not a bug/error/black magic/whatever... Is Python. Always remember that, in Python, **everything is an object**, even functions.

### More resources about this:

* StackOverflow - “Least Astonishment” in Python: The Mutable Default Argument [[link]](http://stackoverflow.com/questions/1132941/least-astonishment-in-python-the-mutable-default-argument)
* Effbot.org - Default Parameter Values in Python [[link]](http://effbot.org/zone/default-values.htm)
* Python Docs - Compound statements > Function definitions [[link]](https://docs.python.org/3.4/reference/compound_stmts.html#def)
* Python Docs - Data model > The standard type hierarchy [[link]](https://docs.python.org/3.4/reference/datamodel.html#types)