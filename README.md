# Mira-datos

## 1. Introducción
MIRA es una aplicación innovadora que ofrece una experiencia única en la visualización de mapas
geoestadísticos. Con lo que puedes revisar los datos geoespaciales del municipio de Monterrey o de cualquier otro municipio, actualmente solo se consumen datos abiertos que proporciona el municipio de Monterrey, pero se espera que próximamente se puedan consumir de otros municipios.

## 2. Instalación y ejecución

### 2.1 Instalar y Ejecutar mira-datos

### 2.1.1 Instalación de paqueterias

Para comenzar con la instalación del FrontEnd, es necesario acceder a la siguiente ubicación:

mira-datos/

En esta ubicacion se encuentras los componentes y páginas del mira-datos, donde tambien en este apartado se requiere
la instalacion de las dependencias necesarios para el funcionamiento correcto del proyecto, por lo que se solicita
ubicarse en ese apartado en donde una vez dentro de dicha ruta, se debe ejecutar el siguiente comando:

```
npm i
```
Esto instala las dependencias que estan incluids en el *package.json*. Puede optar por instalarlos de manera
global o local. En este caso, se realizará la instalación de forma local en el entorno configurado para el proyecto.

### 2.1.2 Ejecición
Despues de realizar la instalación de las paqueterías, se realizar la ejecución del proyecto con el siguiente
comando para inicializar el frontend en modo desarrollador:

```
npx quasar dev
```

En caso de usar pycharm en el *package.json* se puede dar click en run y también funciona como este comando.
```
"mira": "quasar dev"
```

### 2.2 Ejecución en Firebase

Firebase hosting es una plataforma confiable para alojar tu aplicación web en la infraestructura en la nube
de Google. Adquirirás conocimientos sobre cómo configurar y cargar tu sitio web de manera efectiva.

Para la revision de mas detalles e información de firebase visita: https://firebase.google.com/docs/hosting/quickstart?hl=es-419


Instala Firebase Tools (solo la primera vez que vas a desplegar la plataforma) con el siguiente comando:

```
npm install -g firebase-tools
```

### 2.2.1 Configuración del proyecto

Revisa que las variables configuradas en el archivo axios.ts el cual puedes encontrar en el
path(mira-datos/src/boot/axios.ts) sean las correctas de producción:

```
const baseURL= 'apideproduccion'
```

* Realiza un **PULL** para tener todos los cambios que vas a mandar al hosting.
* Realizar el **BUILD** (Empaquetar el proyecto) con el siguiente comando verificando que te encuentras en la
carpeta raiz del proyecto (mira-datos/):
```
quasar build --modern
```

### 2.2.2 Configuracion firabase

Para iniciar la ejecución con firebase se necesita tener los accesos necesarios del proyecto en firebase para
por lo que se necesita iniciar sesión con nuestra cuenta de firebase:

```
firebase login
```

Utiliza el siguiente comando en la terminal para la configuración inicial del proyecto en el hosting de firebase:

```
firebase init
```

Con las siguientes opciones:

* Elegir la opción de Hosting con GitHub opcional.
* Después seleccionar un proyecto existente.
* Elegir el directorio (aquí ya deberías tener permisos en tu cuenta para el directorio) de acuerdo al proyecto a hostear.
* Escribir la carpeta donde se guardo el dist (dist/spa)
* Configurar como una app de una sola pagina.

> **Nota:** Esto se hace debido a que la app tiene sus propias index.html donde se renderiza la app.vue

* No automatizar los deploys de GitHub.
* No sobreescribir el index.html del dist.

Esperar a que termine el proceso de init. Despues verificar si te encuentras en el proyecto correcto para
evitar conflictos con otros proyectos con el siguiente comando:

```
firebase projects:list
```

> **Nota:** Regularmente te lo indica con un (current) en el proyecto donde te encuentras.

Si todo esta bien, esta viendo al proyecto que corresponda se puede realizar la ejecución del proyecto en firebase
usando el siguiente comando:

```
firebase deploy
```

> **Nota:** El comando anterior se utiliza en casos de no tener mas hostings en el proyecto de lo contraro verfica
>el hosting del proyecto. Esto para evitar conflictos con otros hostings.

Por lo general se recomienda usar el siguiente comando para especificar el hosting:

```
firebase deploy --only hosting:[NOMBRE_DEL_PROYECTO]
```
