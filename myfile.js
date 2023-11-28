"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var filePath = path_1.default.join(__dirname, 'ruta', 'del', 'archivo.txt');
fs_1.default.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    console.log('Contenido del archivo:', data);
});
// Crea un archivo .ts (por ejemplo, miArchivo.ts) e importa tus dependencias de Node.js utilizando la sintaxis de TypeScript.
// Para compilar tu archivo .ts a JavaScript, utiliza el siguiente comando:
// bash
// tsc miArchivo.ts
