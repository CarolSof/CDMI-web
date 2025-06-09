# Guía de Instalación - Proyecto Laravel + React

Este documento explica cómo descargar, instalar y configurar un proyecto que usa Laravel como backend y React como frontend.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/) y npm (incluido con Node.js)
-   [Composer](https://getcomposer.org/)
-   [PHP](https://www.php.net/) (Versión compatible con Laravel)
-   [XAMPP](https://www.apachefriends.org/es/index.html) u otro servidor con MySQL

## Guía de Instalación

1. **Clonar el repositorio desde GitHub/ Descargarlo y extraerlo:**

    ```sh
    git clone https://github.com/usuario/nombre-repositorio.git
    cd nombre-repositorio
    ```

2. **Instalar dependencias:**

    ```sh
    composer install
    npm install
    ```

3. **Iniciar XAMPP** y asegurarte de que Apache y MySQL estén activos.

4. **Ejecutar migraciones y sembrar la base de datos:**

    ```sh
    php artisan migrate --seed
    ```

5. **Iniciar el backend de Laravel:**

    ```sh
    php artisan serve
    ```

    Esto iniciará el backend en `http://localhost:8000`

6. **En otra consola, iniciar el frontend de React:**

    ```sh
    npm run dev
    ```

7. **Abrir el proyecto en el navegador:**

    - Acceder a `http://localhost:8000`

8. **Ultimo paso: Distfrutar 👍**
