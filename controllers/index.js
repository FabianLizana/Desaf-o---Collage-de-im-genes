import path from "path";
import { promises as fs } from "fs";

export function renderHome(req, res) {
  res.render("index");
}

// 2. Definir que el límite para la carga de imágenes es de 5MB. (2 Puntos)
// Con la intención de renderizar una vista personalizada he manipulado el tamaño en el 
// siguiente middleware (se muestra una vista personalizada cuando el tamaño del archivo es mayor a 5 MB):
export function crearImagen(req, res) {
  const { target_file } = req.files;
  const { posicion } = req.body;

  if (Object.keys(target_file).length === 0) {
    res.status(400).send("Ningun archivo ha sido subido");
    return;
  }
  if (target_file.size > 5 * 1024 * 1024) {
    res.status(413).render("pages/413");
    return;
  }
  target_file.mv(
    path.resolve("assets", "imagenes", `imagen-${posicion}.jpg`),
    (err) => {
      if (err) {
        console.log("Error77", err);
        res.send("Error");
        return;
      }
      console.log("Imagen guardada con exito");
      res.render("pages/collage");
    }
  );
}

// 5. Crear una ruta DELETE /imagen/:nombre que reciba como parámetro el nombre de una imagen y 
// la elimine de la carpeta en donde están siendo alojadas las imágenes. Considerar que esta 
// interacción se ejecuta al hacer click en alguno de los números del collage. (2 Puntos)
// He creado la siguiente ruta delete que cumple con lo solicitado:
export async function deleteImagen(req, res) {
  try {
    const { nombre } = req.params;
    if (nombre) {
      console.log("Eliminada con exito ", nombre);
      await fs.unlink(path.resolve("assets", "imagenes", nombre));

      res
        .status(200)
        .set("Cache-Control", "no-cache, no-store, must-revalidate")
        .send("exito");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export function renderCollage(req, res) {
  res.render("pages/collage");
}

export function render404(req, res) {
  res.render("pages/404");
}
// Borrado de data
export async function resetData(req, res) {
  const carpeta = path.resolve("assets", "imagenes");
  try {
    const archivos = await fs.readdir(carpeta);
    for (const archivo of archivos) {
      const rutaArchivo = path.join(carpeta, archivo);
      await fs.unlink(rutaArchivo);
    }
    console.log("Data reseteada con exito");
    res.send("Data reseteada con exito 😄");
  } catch (error) {
    res.send("Error al resetear la data");
  }
}
