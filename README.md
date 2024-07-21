# Árbol General de Nodos - Aplicación NestJS

Esta aplicación implementa un servicio RESTful para gestionar un Árbol General de Nodos utilizando NestJS, MongoDB y Docker.

## Requisitos previos

- Docker
- Docker Compose
- Node.js (para desarrollo local)
- npm (para desarrollo local)

## Configuración

1. Clona este repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```

2. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   MONGODB_URI=mongodb://mongodb:27017/prueba-arbol
   ```

## Ejecución con Docker

1. Construye los contenedores:

   ```bash
   docker-compose build
   ```

2. Inicia los servicios:

   ```bash
   docker-compose up
   ```

   Esto iniciará la aplicación, MongoDB, y ejecutará el script de semilla para poblar la base de datos.

3. La aplicación estará disponible en `http://localhost:3000`

## Desarrollo local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia MongoDB (asegúrate de tener MongoDB instalado y ejecutándose localmente).

3. Ejecuta la aplicación en modo de desarrollo:

   ```bash
   npm run start:dev
   ```

4. Para ejecutar el script de semilla:

   ```bash
   npm run seed
   ```

## Endpoints API

- `POST /nodes`: Crea un nuevo nodo
- `GET /nodes/:id`: Obtiene un nodo por su ID
- `PUT /nodes/:id`: Actualiza un nodo existente
- `DELETE /nodes/:id`: Elimina un nodo y sus hijos
- `GET /nodes/root/:id`: Obtiene el nodo raíz a partir de cualquier nodo

## Detener la aplicación

Si estás ejecutando con Docker, puedes detener la aplicación con:

    ```bash
    docker-compose down
    ```
