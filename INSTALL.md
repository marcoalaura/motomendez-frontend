# Instalación de la Aplicación (FRONTEND)


## Configuración del Servidor

Para una correcta instalación, el servidor debe tener las siguientes configuraciones obligatoriamente:

> [SERVER.md](SERVER.md)


Después recién llevar a cabo los siguientes pasos, que son necesarios para instalar la aplicación.


## Instalación del proyecto para Desarrollo

### Clonación

Clonarlo:

**Opción 1:** Si se generó llave SSH: (En los pasos del archivo SERVER.md)
```sh
$ git clone git@gitlab.geo.gob.bo:agetic/centralizador-pcd-frontend.git
```
**Opción 2:** Si se quiere clonar el proyecto por HTTPS:
```sh
$ git clone https://gitlab.geo.gob.bo/agetic/centralizador-pcd-frontend.git
```
Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:
```sh
Cloning into 'nombre-del-proyecto'...
fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
```
```sh
$ git config --global http.sslverify false
$ git clone https://usuario@gitlab.geo.gob.bo/agetic/centralizador-pcd-frontend.git
```

**Después de clonar con cualquiera de las opciones anteriores:**

Ingresar a la carpeta:
```sh
$ cd centralizador-pcd-frontend
```
Podemos verificar que estamos en el branch master:
```sh
$ git status
```
Nos devolverá:
```sh
- On branch master
```

`(Opcional)` Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es nombre_del_branch) ejecutamos:
```sh
$ git checkout nombre_del_branch
```

Al volver a verificar con git status:
```sh
$ git status
```
Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```sh
- On branch nombre_del_branch
```
Para instalar la aplicación, se tienen las siguientes opciones:

#### Instalando dependencias npm
```sh
$ npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

Toda la configuración para los archivos del frontend se encuentra en el archivo **`config.json.sample`**, su servidor de producción y su servidor de desarrollo con web pack, el mismo se encuentra en la raíz del proyecto.

Copiar dicho archivo y renombrarlo bajo el nombre **`config.json`** en la raiz del proyecto

A continuación se describe la configuración:

`**¡NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

```js
{
  "server": "http://localhost:4000",
  "timeSessionExpired": 30,
  "debug": true,
  "onbeforeunload": false,
  "port": 3100,
  "subDomain": "/",
  "portDev": 8080
};
```
- **server**: Servidor del backend donde apunta el frontend
  - Ejemplos
    - "server": "http://localhost:4000"
    - "server": "http://192.168.15.15:4000"
    - "server": "http://test.local.agetic.gob.bo/proyecto-api"
- **timeSessionExpired**: Tiempo en minutos para que la sesión se cierre automáticamente por inactividad
- **debug**: Habilita los console.log (this.$log.log) para su visualización para producción es necesario deshabilitarlo con: false
- **onbeforeunload**: abre un alerta de confirmación cuando se intente cerrar o actualizar la pestaña del navegador
- **port**: Puerto para el servidor de producción
- **portDev**: Puerto para el servidor de desarrollo con webpack
- **subDomain**: Sub dominio donde iniciará el frontend, por defecto inicia en la raíz de la carpeta dist
  - Ejemplos:
    - "subDomain": "/"
    - "subDomain": "/proyecto/"


#### DESARROLLO - Iniciar el proyecto en modo desarrollo
```sh
$ npm start
```
#### TEST -  Iniciar el proyecto en modo test
```sh
$ npm start-test
```
#### test unitarios
```sh
$ npm run test
```
#### Iniciar servidor de autenticación fake (OPCIONAL)
```sh
$ npm run server
```
### Notas.-
- El proyecto ya no require de bower, sólo de npm para la gestión de dependencias
- Si el **Watch** de webpack no funciona debe ejecutar los siguientes comandos para ampliar el número de watch que permite el sistema operativo en linux:

```sh
$ echo fs.inotify.max_user_watches=1048576 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p
```

Visitar la web para más información `https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers`


- Si al iniciar con ***npm start*** u otro comando se tiene el puerto ocupado executar el comando para detener el servicio:

```sh
$ sudo fuser -k [puerto]/tcp
```
Ejemplo:
```sh
$ sudo fuser -k 8080/tcp
```

## PRODUCCION
## Instalación del proyecto para Producción

Para asegurarse de que se instalen todas las librerías necesarias hay que configurar el ambiente en modo desarrollo. 

#### Instalando dependencias npm
```sh
$ npm install
```

#### Configurar los datos de conexión a los servicios REST del backend

Seguir los pasos de `Configurar los datos de conexión a los servicios REST del backend`.

### Configurar entorno de producción

#### Iniciar el proyecto en modo desarrollo
```sh
$ npm start
```

#### Crear los archivos minificados
```sh
$ npm run build
```

#### Iniciar el servidor para los archivos minificados
```sh
$ npm run server
```

### ¡Importante!
Use siempre la anotación 'ngInject' en los constructores o donde se requiera inyectar una dependencia angular para que el minificado sea exitoso.

Ejemplo:

```
// En los constructores que requieran dependencias
constructor(Dependencia1, Dependencia2, ...) {
    'ngInject';

    ...
}

// En los config de angular que requieran dependencias
angular.config((Dependencia1, Dependencia2, ...) => {
    'ngInject';

    ...
})
```

## Configuración de **supervisor**
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
$ cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de frontend, en este ejemplo, se definirá el archivo bajo el nombre de `centralizadorPcdFrontendDEV`:
```sh
$ sudo touch centralizadorPcdFrontendDEV.conf
```
**Para hacer correr la versión comprimida, colocar en el archivo el siguiente contenido:**
##### Sin variable de entorno
```sh
[program:centralizadorPcdFrontendDEV]
directory=/home/usuario/rutaProyecto/centralizador-pcd-frontend
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm run server
autostart=true
autorestart=true
stderr_logfile=/var/log/centralizadorPcdFrontendDEV.err.log
stdout_logfile=/var/log/centralizadorPcdFrontendDEV.out.log
user=usuario
```
##### Con variable de entorno = producción
```sh
[program:centralizadorPcdFrontendDEV]
directory=/home/usuario/rutaProyecto/centralizador-pcd-frontend
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm run server
autostart=true
autorestart=true
environment=NODE_ENV=production
stderr_logfile=/var/log/centralizadorPcdFrontendDEV.err.log
stdout_logfile=/var/log/centralizadorPcdFrontendDEV.out.log
user=usuario
```


Considerar que el nombre del usuario del equipo puede variar.

Considerar que la ruta real en la que se encuentra la aplicación puede variar.
