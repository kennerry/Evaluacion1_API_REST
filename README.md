# API REST - Sistema de Gestión de Incidencias

API REST desarrollada con **Node.js** y **Express** para la gestión del ciclo de vida de incidencias técnicas en memoria. 
El proyecto implementa una arquitectura modular (MVC) que separa el servidor, las capas de enrutamiento, la lógica de negocio y las validaciones auxiliares.

---

## Integrantes del Equipo

* **Kenneth Iván Ramos Majano 00308726**
* **William Enrique Hernandez Rodriguez 00095725**

---

## Tecnologías Utilizadas

* **Entorno:** Node.js
* **Framework:** Express (^5.2.1)
* **Arquitectura:** Patrón Modular Controlador - Enrutador (MVC)
* **Persistencia:** Estructura de datos en memoria volátil (`Array`)

---

## Estructura del Proyecto

```text
Evaluacion1_API_REST/
├── app.js                          # Configuración de Express, middlewares y puerto
├── package.json                    # Metadatos y dependencias del proyecto
├── controllers/
│   └── incidenciasControllers.js   # Manejo de estado en memoria y lógica de negocio
├── routes/
│   └── incidencias.js              # Definición y mapeo de endpoints
└── utils/
    └── helpers.js                  # Validaciones y utilidades de saneamiento
