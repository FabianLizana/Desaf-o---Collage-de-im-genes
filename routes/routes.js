import { Router } from "express";
import {
  renderHome,
  crearImagen,
  deleteImagen,
  renderCollage,
  render404,
  resetData,
} from "../controllers/index.js";

const router = Router();

router.get("/", renderHome);

// 4. Crear una ruta POST /imagen que reciba y almacene una imagen en una carpeta pública del servidor. 
// Considerar que el formulario envía un payload con una propiedad “position”,
//  que indica la posición del collage donde se deberá mostrar la imagen. (3 Puntos)
// ---paso 1---He creado la siguiente ruta post que cumple con lo solicitado:
router.post("/imagen", crearImagen);

router.delete("/imagen/:nombre", deleteImagen);

router.get("/imagen", renderCollage);

router.get("/reset", resetData);

router.get("/*", render404);

export default router;
