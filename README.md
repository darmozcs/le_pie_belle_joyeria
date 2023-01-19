# ly-acl-juro
### Owner test
Yosmay Morales
### Description
Web app Cliente Le Piu Belle Joyeria

## contacts
* Darmoz Code Solutions (darmozcs@gmail.com)
* drodriguez951239@gmail.com
* carlosmanso12@gmail.com
* soto95r@gmail.com
* yosmaym92@gmail.com


## Levantar Local
# Descargar dependencias
* npm i

* Nota: Borra la carpeta que te creo node_modules y correr comando: npm cache clear —force
Si son errores de compilacion que salen en la pantalla cerrarlo no mas.

# Levantar app
* npm start

## Install firebase
# Descargar dependencias
* npm install firebase

# Descargar herramientas
* npm install firebase-tools

*   Descargando firebase: 
- En macOs: curl -sL firebase.tools | upgrade=true bash

# Logueando en Firebase
* firebase login

# Iniciar el proyecto en Firebase
* firebase init

# Pasos para el deploy a Firebase

0. Compilar nuestra app: **npm run build** esto genera una carpeta optimizada para producción llamada _**build**_

        npm run build
1. Iniciar sesión en la consola de [Firebase](https://console.firebase.google.com), crear un nuevo proyecto, ponerle el nombre deseado, ir a las opciones y habilitar el hosting y la base de datos de firestore. Solo es leer y darle siguiente
2. **npm install -g firebase-tools**

        npm install -g firebase-tools
3. **firebase login**  :esto va a pedir el login de la cuenta de google, que debe ser la misma que se usó en la consola de firebase, si da algun error de que no se permite modo interactivo usar **firebase login --interactive**, te va a preguntar que si quieres enviarle reportes y le puedes dar lo que desees.

        firebase login 
        
    4.1.Seleccionar los servicios **Firestore, Hosting y Storage**
    
    4.2. Seleccionar la opción **Use an existing project** y elegir el proyecto creado en el paso 1
    
    4.3. Configurar **Firestore** solo es leer (Dar enter en "firestore.rules" y Dar enter en "firestore.indexes.json")
    
    4.4. Especificar donde se encuentra la carpeta compilada, solo escribir _**build**_ y dar enter
    
    4.5. Especificar si la aplicación es una SPA (Single Page Application)
    
    4.6. Configurar los despligues automaticos a github (o no jejej)..
    
    4.7. **No** sobreescribir el index.html,**NOOOOO**
    
    4.8. Configurar **Storage** solo es leer (Dar enter en "storage.rules")
    
5. **firebase deploy**

        firebase deploy 
6. Listo
