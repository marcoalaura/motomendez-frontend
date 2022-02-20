# Instalación General en el Servidor (FRONTEND)

Se realizaron distintas instalaciones en el servidor de TEST Debian, a continuación las configuraciones realizadas en dicho servidor.

## Otros

En la plantilla de la máquina virtual de producción se tuvieron problemas con los certificados, para resolverlo se instaló lo siguiente:

```sh
$ sudo  apt-get install ca-certificates
```

## Build Essentials
Instalar build essentials
```sh
sudo apt-get install build-essential
```

## GIT
Para la instalación de git se siguieron algunas instrucciones de la siguiente página:
> https://www.digitalocean.com/community/tutorials/how-to-install-git-on-debian-8

```sh
$ sudo apt-get update
$ sudo apt-get install git-core
```

Es posible configurar los nombres de usuarios:
```sh
$ git config --global user.name "usuario"
$ git config --global user.email usuario@agetic.gob.bo
$ git config --list
```

El último comando es para verificar que se haya guardado la configuración realizada.

Para poder clonar el proyecto posteriormente se puede seguir una de las siguientes opciones:

### Opción 1: Generar SSH key

Si aún no se cuenta con una llave SSH para la conexión a GIT, seguir los siguientes pasos:
Para la generación de la llava SSH se siguieron los pasos del siguiente enlace:
> https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

```sh
$ ssh-keygen -t rsa -b 4096 -C "usuario@agetic.gob.bo"
```

Para verificar la creación de la llave SSH navegar al siguiente directorio:
```sh
$ cd /home/nombre_usuario/.ssh/
```

La llave se encontrará en el archivo `id_rsa.pub`;

Copiar el contenido del archivo en la respectiva cuenta del GITLAB para la autenticación.

> **Profile Settings** >> **SSH Keys**

### Opción 2: Descargar por HTTPS:

Si no se desea generar una llave SSH, descargar por HTTPS, según los pasos indicados posteriormente en el achivo INSTALL.md.

## Curl y Wget

Si no se tiene instalado el curl y el wget, instalarlos.

```sh
$ sudo  apt-get install curl
$ sudo  apt-get install wget
```

## Instalación de Nodejs
Visitar la página https://github.com/nodesource/distributions#debinstall para su instalación o para la instalación manual ir a https://github.com/nodesource/distributions#debmanual, se debe instalar la versión 6.9.x (LTS) de Nodejs.

## Automatización de procesos
Para automatizar la ejecución de la aplicación se utilizó **Supervisor**.

```sh
$ sudo apt-get install supervisor
```
Para probar la correcta instalación del servicio se puede ejecutar el siguiente comando:
```sh
$ sudo /etc/init.d/supervisor restart
```
El servicio debería reiniciarse sin problemas.

## Instalación del Proyecto

Para continuar con la instalación del PROYECTO, seguir los pasos del siguiente archivo:

> [INSTALL.md](INSTALL.md)
