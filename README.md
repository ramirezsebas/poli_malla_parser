# Malla Parser de Politecnica

Este proyecto fue creado con el objetivo de facilitar el acceso a los datos de la malla de las carreras de la facultad Politécnica de la Universidad Nacional de Asunción. Una forma sencilla de obtener el la malla (Que fue creada a mano) y usarla en otras aplicaciones.

## TODO

[] Responsive

[] Mejorar el diseño

## El mismo fue desarrollado utilizando las siguientes tecnologías

- Next.js
- Material UI
- React
- Node.js
- TypeScript

## Tabla de Contenidos

1. Instalación
2. Uso
3. API
4. Contribuciones
5. Licencia
6. Contacto

### Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto: cd nombre-del-proyecto.
3. Instala las dependencias utilizando Yarn: yarn install.
4. Inicia el servidor de desarrollo: yarn dev.
5. Accede a la aplicación en tu navegador: <http://localhost:3000>.

### Uso

Para poder obtener la informacion de la malla solo se subir el archivo de excel que contiene la malla de todas las carreras y luego presionar el boton de `Descargar la malla en formato JSON`.

Si no tienes el excel, podrás descargarlo desde el boton de `Descargar el excel de la malla`.

### API

1. Obtener todas las carreras de la facultad Politécnica según sus siglas
Endpoint: /api/malla-excel

Método: GET

Descripción: Este servicio devuelve el enlace del excel de la malla, se puede cambiar para que se obtenga de la base de datos

Response:

```json
{
    "ultima_fecha_actualizacion": "22/06/2023",
    "link": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRnT07rxbfF1PqhPSNa4uXZ9qE8TB_7CMFG9DQ75IUESNVwnrG7T2tkklqUD5tcjYCd8c44mmliArQr/pub?output=xlsx"
}
```

2. Obtener la malla en formato JSON extrayend del excel, por carrera, semestre, materia y una lista de prerequisitos de esa materia

Endpoint: /api/mallas

Método: POST

form-data: file (Tipo Excel)

Response:

```json
[
    {
        "carrera": "IIN",
        "malla": [
            {
                "semestre": 1,
                "materias": [
                    {
                        "nombre": "Algoritmos y Estructura de Datos 1",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Emprendedorismo",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Expresion Oral y Escrita",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Fundamentos de Matematica",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Matematica Discreta",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Organizacion y Arquitectura de Computadoras 1",
                        "prerequisitos": []
                    }
                ]
            },
            {
                "semestre": 2,
                "materias": [
                    {
                        "nombre": "Ingles",
                        "prerequisitos": []
                    },
                    {
                        "nombre": "Algebra Lineal",
                        "prerequisitos": [
                            "Fundamentos de Matematica",
                            "Matematica Discreta"
                        ]
                    },
                    {
                        "nombre": "Algoritmos y Estructura de Datos 2",
                        "prerequisitos": [
                            "Algoritmos y Estructura de Datos 1"
                        ]
                    },
                    {
                        "nombre": "Calculo 1",
                        "prerequisitos": [
                            "Fundamentos de Matematica"
                        ]
                    },
                    {
                        "nombre": "Lenguajes de Programacion 1",
                        "prerequisitos": [
                            "Matematica Discreta",
                            "Algoritmos y Estructura de Datos 1"
                        ]
                    },
                    {
                        "nombre": "Organizacion y Arquitectura de Computadoras 2",
                        "prerequisitos": [
                            "Organizacion y Arquitectura de Computadoras 1"
                        ]
                    }
                ]
            },
        ]
    }
]
```

Descripción: Este servicio convierte el archivo enviado (Excel) en formato JSON para facilitar su visualización y procesamiento.

### Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución: git checkout -b nombre-rama.
3. Realiza los cambios y haz commits: git commit -m "Descripción de los cambios".
4. Haz push a tu rama: git push origin nombre-rama.
5. Crea una solicitud de extracción (pull request) en GitHub.

Obs: No olvides actualizar la documentación si es necesario. (Ya sea en el README.md o en el CHANGELOG.md)

### Licencia

MIT License

Copia (c) [2023] [Matias Ramirez]

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para utilizar el Software sin restricciones, incluyendo, entre otras, las siguientes acciones:

- Usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, con sujeción a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADA A GARANTÍAS DE COMERCIALIZACIÓN, ADECUACIÓN PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN RELACIÓN CON EL SOFTWARE O EL USO U OTROS TRATOS EN EL SOFTWARE.

### Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

Correo electrónico: <ramirezmatias946@gmail.com>
LinkedIn: Matias Sebastian Ramirez Brizuela
