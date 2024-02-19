# YouTube Audio Downloader API 🎶💾

Este proyecto proporciona una API para extraer audio de videos de YouTube, convertirlos en el servidor y proporcionar una URL para descargarlos en formato MP3.

## Instalación

Para ejecutar esta API localmente, necesitarás tener instalado Node.js en tu sistema. Sigue estos pasos para configurar el proyecto:

1. **Clona el repositorio:**
   ```
   git clone https://github.com/tu-usuario/youtube-audio-downloader-api.git
   ```

2. **Instala las dependencias:**
   ```
   cd youtube-audio-downloader-api
   npm install
   ```

3. **Ejecuta la aplicación:**
   ```
   npm start
   ```

La API estará disponible en `http://localhost:3000` por defecto.


## Endpoints

### Convertir Audio 🔄

Convierte un archivo de audio desde una URL de YouTube en formato MP3.

- **Método:** `POST`
- **Ruta:** `/audio/convert`

#### Parámetros de la solicitud

- `url` (string, requerido): La URL del video de YouTube que se desea convertir a MP3.

#### Ejemplo de Solicitud

```http
POST /audio/convert
Content-Type: application/json

{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

#### Respuesta Exitosa

- **Código de estado:** `200 OK`
- **Cuerpo de respuesta:** JSON que contiene el nombre del archivo convertido y la URL de descarga.

```json
{
  "fileName": "nombre_del_archivo.mp3",
  "url": "http://localhost:3000/download/nombre_del_archivo.mp3"
}
```

#### Respuestas de Error

- **Código de estado:** `400 Bad Request`

```json
{
  "error": "La URL es requerida."
}
```

- **Código de estado:** `500 Internal Server Error`

```json
{
  "error": "Error interno del servidor."
}
```

### Descargar Archivo ⬇️

Descarga el archivo con el nombre especificado.

- **Método:** `GET`
- **Ruta:** `/download/:fileName`

#### Parámetros de la solicitud

- `fileName` (string, requerido): El nombre del archivo que se desea descargar.

#### Ejemplo de Solicitud

```http
GET /download/nombre_del_archivo.mp3
```

#### Respuestas de Error

- **Código de estado:** `404 Not Found`

```json
{
  "error": "Archivo no encontrado."
}
```

- **Código de estado:** `500 Internal Server Error`

```json
{
  "error": "Error al encontrar el archivo."
}
```
