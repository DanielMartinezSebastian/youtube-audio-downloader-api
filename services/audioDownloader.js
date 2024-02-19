// services/audioDownloader.js
import youtubedl from "youtube-dl-exec";
import fs from "fs";
import path from "path";
import https from "https";
import { exec } from "child_process";

async function downloadAudio(url, res, outputFileName = null) {
  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    });

    function removeEmojis(str) {
      // Eliminar emojis
      return str.replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}]/gu,
        ""
      );
    }
    const title = removeEmojis(info.title);

    // Definir la ruta de la carpeta "cache"
    const cacheFolder = path.join(process.cwd(), "cache");

    // Crear la carpeta "cache" si no existe
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder, { recursive: true });
    }

    // Definir las rutas de los archivos weba y mp3 dentro de la carpeta "cache"
    const webaFilePath = path.join(
      cacheFolder,
      `${title.replace(/[\\/:*?"<>|,.]/g, "").replace(/\s+/g, "-")}.weba`
    );
    const mp3FilePath = path.join(
      cacheFolder,
      outputFileName ||
        `${title.replace(/[\\/:*?"<>|,.]/g, "").replace(/\s+/g, "-")}.mp3`
    );

    // Obtener la URL del archivo de audio
    const audioUrl = info.requested_formats[1].url;

    console.log(`Descargando ♦ ${webaFilePath}`);
    // Descargar el archivo usando https.get
    https.get(audioUrl, (response) => {
      // Crear un flujo de escritura para guardar el archivo weba
      const webaWriter = fs.createWriteStream(webaFilePath);

      // Manejar eventos de error en el flujo de escritura
      webaWriter.on("error", (err) => {
        console.error("Error al guardar el archivo weba:", err);
      });

      // Piping el flujo de la respuesta de https.get al flujo de escritura del archivo weba
      response.pipe(webaWriter);

      // Manejar eventos de finalización del flujo de escritura
      webaWriter.on("finish", () => {
        console.log(`Descarga completa: ${webaFilePath}`);
        // Convertir archivo weba a mp3 usando ffmpeg
        console.log(`Convirtiendo a MP3: ${mp3FilePath}`);
        exec(
          `ffmpeg -i "${webaFilePath}" "${mp3FilePath}"`,
          (err, stdout, stderr) => {
            if (err) {
              console.error("Error al convertir a MP3:", err);
              console.log("Continuando con la siguiente descarga...");
              return;
            }
            console.log(`Conversión completa: ${mp3FilePath}`);
            // Eliminar el archivo weba después de la conversión a mp3
            fs.unlinkSync(webaFilePath);

            // Obtener el nombre del archivo MP3 generado
            const fileName = path.basename(mp3FilePath);

            // Envía el nombre del archivo MP3 al cliente como parte de la respuesta
            res.json({ fileName: fileName });
          }
        );
      });
    });
  } catch (err) {
    console.error("Error al procesar la URL:", err);
    throw err;
  }
}

export default downloadAudio;
