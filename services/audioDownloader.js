// services/audioDownloader.js
import youtubedl from "youtube-dl-exec";
import fs from "fs";
import https from "https";
import { exec } from "child_process";

async function downloadAudio(url) {
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

    const webaFileName = `${title
      .replace(/[\\/:*?"<>|,.]/g, "")
      .replace(/\s+/g, "-")}.weba`;
    const mp3FileName = `${title
      .replace(/[\\/:*?"<>|,.]/g, "")
      .replace(/\s+/g, "-")}.mp3`;

    // Obtener la URL del archivo de audio
    const audioUrl = info.requested_formats[1].url;

    console.log(`Descargando ♦ ${webaFileName}`);
    // Descargar el archivo usando https.get
    https.get(audioUrl, (response) => {
      // Crear un flujo de escritura para guardar el archivo weba
      const webaWriter = fs.createWriteStream(webaFileName);

      // Manejar eventos de error en el flujo de escritura
      webaWriter.on("error", (err) => {
        console.error("Error al guardar el archivo weba:", err);
      });

      // Piping el flujo de la respuesta de https.get al flujo de escritura del archivo weba
      response.pipe(webaWriter);

      // Manejar eventos de finalización del flujo de escritura
      webaWriter.on("finish", () => {
        console.log(`Descarga completa: ${webaFileName}`);
        // Convertir archivo weba a mp3 usando ffmpeg
        console.log(`Convirtiendo a MP3: ${mp3FileName}`);
        exec(
          `ffmpeg -i "${webaFileName}" "${mp3FileName}"`,
          (err, stdout, stderr) => {
            if (err) {
              console.error("Error al convertir a MP3:", err);
              console.log("Continuando con la siguiente descarga...");
              return;
            }
            console.log(`Conversión completa: ${mp3FileName}`);
            // Eliminar el archivo weba después de la conversión a mp3
            fs.unlinkSync(webaFileName);
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
