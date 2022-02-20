# Actualización de los servidores de Producción
## Frontend

#### - Actualizar la rama master.

```
git checkout master
git pull origin master
```


#### - Minificar los archivos en un nodo

Construir los archivos minificados del proyecto. Este comando generará una nueva carpeta `dist`.

```
npm run build
```

Reemplazar la carpeta generada 'dist', por el directorio donde se encuentra publicado el proyecto.

Reiniciar el servidor de aplicaciones.