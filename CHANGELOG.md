# Registro de cambios

Todas las modificaciones notables a la API se documentarán en este archivo.

## [0.1.0] - 2023-07-22

### Agregado

* Backend

    1. Endpoint: /api/malla-excel
        * Método: GET
        * Descripción: Retorna el enlace del excel de la malla.
    2. Endpoint: /api/mallas
        * Método: POST
        * Enviar excel como: form-data
        * Descripción: Convierte el archivo enviado (Excel) en formato JSON para facilitar su visualización y procesamiento. Este JSON contiene las carreras, semestres, materias y sus respectivos prerequisitos.

* Frontend

    1. Página principal
        * Seleccionar el archivo de excel que contiene el horario.
        * Botón de para descargar malla en formato Excel.
        * Botón para descargar malla en formato JSON.

Ten en cuenta que los endpoints están sujetos a cambios en futuras versiones, por lo que es esencial mantener la documentación actualizada con cualquier modificación.
