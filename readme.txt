CONSIDERACIONES DEL CÓDIGO

shortUrl.js

  Módulo fs:
    > Para trabajar con el file system del servidor.
    > Es de caracter asíncrono. Por lo tanto, se utiliza su versión
    > promise para asegurar su lectura antes de continuar con la ejecución
    > del código.

  Función readJson():
    > Creada para leer los datos alojados en archivo data.json
    > es de caracter async para trabajar con await, para trabajar
    > con la promesa de fs y poder leer el json que aloja los datos
    > antes de continuar con la ejecución del código.
  
  