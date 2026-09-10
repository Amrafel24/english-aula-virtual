# English · Aula virtual

La interfaz sigue escrita en HTML, CSS y JavaScript puro. Se añadió un servidor
porque las aulas, las identidades, las entregas y las conversaciones deben
compartirse entre dispositivos. El frontend no decide los permisos ni las notas.

## Ejecutar el proyecto

1. Instala Node 24 o posterior y extrae el ZIP completo.
2. Abre una terminal en la carpeta que contiene `servidor.js`.
3. Ejecuta `node servidor.js` y visita `http://localhost:8080`.
4. En Aula virtual → Profesores, crea una cuenta y un aula.
5. Desde otro perfil de navegador, crea otra cuenta en Estudiantes e introduce
   el código. Para otros dispositivos usa la dirección de tu servidor y HTTPS.

No se necesitan dependencias npm para ejecutar el servidor Node. `dist/index.html`
también permite usar los materiales y juegos sin servidor; el aula requiere el servidor.

## Lo que incluye

| Área | Profesor | Estudiante |
|---|---|---|
| Inicio | Clases preparadas, entregas y agenda | Actividades pendientes, entregas y agenda |
| Acceso | Nombre, código aleatorio, rotación y cierre de inscripciones | Incorporación por código, acceso posterior con su cuenta |
| Clases | Texto, material de English, borrador/publicación, archivos y fecha límite | Lectura, respuesta escrita y archivos antes del plazo |
| Integrantes | Nombre, correo, ingreso y suspensión/restablecimiento | Sin acceso a la lista privada de correos |
| Vocabularios | Compartir categorías existentes | Traducciones, audio lento y tarjetas para practicar |
| Chats | Crear grupos y habilitarlos | Mensajes entre integrantes del aula |
| Foros | Publicar temas e instrucciones | Respuestas al tema |
| Exámenes | Fuente, 5–30 preguntas, instrucciones, publicación y fecha límite | Un intento; resultado calculado en el servidor |
| Revisión | Nota de 0 a 100 y comentario por entrega | Solo sus propias notas, archivos y comentarios |
| Videoconferencia | Crear y finalizar salas | Entrar a salas activas; ver historial de finalizadas |
| Configuración | Habilitar o deshabilitar cada área | Solo áreas habilitadas y recursos publicados |

Los permisos se aplican al aula. El catálogo educativo original sigue siendo
público dentro de English y comparte el mismo archivo `english-data.js`.
Los exámenes sirven para evaluación de aprendizaje; no son exámenes supervisados
ni cuentan con un sistema de vigilancia. Las preguntas se generan al crear el
examen y quedan fijadas. La clave de corrección del examen no se envía al estudiante.

## Almacenamiento y acceso

| Ejecución | Identidad | Datos estructurados | Archivos privados |
|---|---|---|---|
| Node | Cuenta con correo y contraseña | SQLite en `datos/aula.sqlite` | `datos/archivos/` |
| Sites | Sign in with ChatGPT del dispatcher | D1, binding `DB` | R2, binding `BUCKET` |

Ambos usan `server/aula-core.mjs`, con consultas preparadas, comprobaciones de
pertenencia y rol en cada operación y las mismas reglas de entregas y exámenes.
El correo de las cuentas Node es declarado por el usuario; no hay verificación
de correo ni recuperación por email conectada. Conserva las contraseñas durante
esta fase. La modalidad Sites usa la recuperación de la cuenta de la plataforma.
No existe migración automática de identidades entre estas dos modalidades.

En Node las contraseñas se derivan con scrypt y una sal aleatoria. Las sesiones
usan tokens aleatorios almacenados como hashes, cookies HttpOnly y SameSite,
Secure al usar HTTPS, y expiración a los siete días. No se confía en cabeceras de
identidad enviadas por el navegador. En Sites la identidad viene del dispatcher
de la plataforma; este Worker debe ejecutarse detrás de ese mecanismo de acceso.

Las escrituras exigen mismo origen y una cabecera propia. Hay límites de intentos
de acceso, envío de mensajes y señalización. Los archivos se descargan como
adjuntos tras comprobar permisos; no se ejecuta HTML subido. Se admite PDF, TXT,
PNG, JPG, MP3, MP4, DOCX y PPTX, con 15 MB y cinco archivos por persona y clase.
No hay análisis antivirus integrado. Si falla una subida, el formulario conserva
la selección y el texto para volver a intentarlo.

## Videoconferencias

Se implementó WebRTC entre navegadores: cámara, micrófono, silenciamiento, cierre
de pistas al salir y negociación de conexiones. La señalización se transmite por
la API del aula, con consultas periódicas y comprobaciones de pertenencia.
El profesor inicia y termina la sala; al finalizar, los participantes se
desconectan y la sesión queda en el historial. Solo se admite una sala activa por
aula y una conexión por cuenta en una misma conferencia.

Esta primera arquitectura conecta a cada participante con los demás. El límite
es **seis personas simultáneas**, incluido el profesor. Para clases de mayor
tamaño hará falta integrar un servidor de conferencias con SFU o un proveedor.
No graba clases ni comparte pantalla.

La cámara y el micrófono requieren **HTTPS o localhost**. Para conexiones fiables
entre redes distintas debe configurarse un servidor **TURN**. Sin configuración
ICE, la sala se presenta como preparada para la misma red. El proyecto no contiene
credenciales ni un servicio TURN contratado. Los ejemplos de configuración tienen
dominios de ejemplo, no servidores activos.

`configuracion.example.txt` contiene las variables:

- `ENGLISH_ICE_SERVERS`: array JSON de servidores ICE, según tu proveedor.
- `ENGLISH_TURN_URLS` y `ENGLISH_TURN_SECRET`: alternativa con credenciales TURN
  temporales compatibles con el mecanismo REST de coturn. Se generan por cuenta,
  válidas durante una hora y renovadas cada 30 minutos durante la llamada;
  el secreto permanece en el servidor.

En Sites se configuran en el entorno del Site. En Node puedes copiar el ejemplo
a `configuracion.env` y usar `node --env-file=configuracion.env servidor.js`.

La señalización se consulta aproximadamente cada 1,2 segundos, los mensajes cada
3 segundos y la disponibilidad de conferencias/permisos cada 10 segundos.
Una pestaña sin responder pierde su plaza de video después de 45 segundos.
Los mensajes de señalización antiguos se eliminan a los dos minutos; las clases,
entregas, conversaciones e historial de salas permanecen almacenados.

## Publicación y operación

Esta entrega guarda el proyecto actualizado; no publica una web nueva.
Para el despliegue Node, configura `NODE_ENV=production`, `ENGLISH_ORIGIN` con la
dirección HTTPS real y `ENGLISH_DATA_DIR` apuntando a un volumen persistente
privado. Si hay un proxy inverso, configura su IP exacta con `ENGLISH_PROXY_IP` y
haz que reemplace `X-Forwarded-For` por la IP real, sin confiar en valores del
cliente. La carpeta `datos/` nunca se sirve como contenido estático.

Conserva una copia de seguridad de la base de datos y los archivos. Para una
copia manual consistente, detén el proceso, copia toda la carpeta `datos/` y
vuelve a iniciarlo. Comprueba la restauración en otra carpeta antes de depender
de esa copia. Las actualizaciones no deben sustituir ni borrar `datos/`.

En Sites se prepararon los bindings D1/R2 y una migración generada con Drizzle.
La publicación aplica las migraciones antes de cargar el Worker; la aplicación
no crea ni altera tablas D1 durante las solicitudes. La migración inicial fue
verificada en SQLite, pero D1/R2 y el inicio de sesión alojado requieren su
comprobación final en el entorno publicado. La configuración de audiencia del
Site es independiente de la pertenencia a las aulas.

Antes del lanzamiento oficial quedan la configuración del alojamiento y del
TURN, decidir la modalidad de acceso público y recuperación de cuentas, y una
prueba de cámara/audio entre dispositivos y redes reales. Esta entrega no afirma
que se haya hecho una prueba audiovisual real ni una prueba de carga a escala.

## Comprobaciones y desarrollo

Ejecuta `node --test tests/*.test.cjs`. Las pruebas cubren roles, incorporación
por código, aislamiento entre aulas, publicación, fechas límite, privacidad de
entregas y archivos, corrección de exámenes, chats, foros, señalización y sesiones
persistentes. Se conservan las pruebas de English game y Match the Pairs.

Para herramientas de desarrollo usa `npm ci`. Para construir el Worker:
`npm run build`. El empaquetado incluye los recursos públicos dentro del módulo
del Worker y no depende de una CDN ni de frameworks de interfaz. La distribución
Node ejecuta directamente el código fuente.

El esquema está en `db/schema.js`. Para ampliarlo, ejecuta `npm run db:generate`
y revisa la migración en `drizzle/`. No cambies una migración ya aplicada.
Node registra el hash de cada migración para detectar modificaciones accidentales.

Referencias de implementación: [SQLite de Node](https://nodejs.org/api/sqlite.html),
[negociación WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation),
[servidores TURN](https://webrtc.org/getting-started/turn-server) y
[credenciales temporales de coturn](https://github.com/coturn/coturn/wiki/turnserver#turn-rest-api).
