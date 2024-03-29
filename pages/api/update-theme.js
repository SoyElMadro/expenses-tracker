import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { theme } = req.body;

    // Establecer la cookie con el nuevo tema
    res.setHeader(
      "Set-Cookie",
      serialize("theme", theme, {
        path: "/", // Hace que la cookie esté disponible en toda la aplicación
        maxAge: 60 * 60 * 24 * 7, // Duración de la cookie (en segundos), aquí 7 días
        httpOnly: true, // La cookie solo es accesible en el servidor
        sameSite: "strict", // La cookie no se enviará en solicitudes de origen cruzado
        secure: process.env.NODE_ENV === "production", // La cookie solo se enviará en conexiones HTTPS en producción
      })
    );

    // Enviar una respuesta con el nuevo valor del tema
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ theme });
  } else {
    // Si no es una solicitud POST, enviar una respuesta de método no permitido
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
