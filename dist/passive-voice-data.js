'use strict';
// Original bilingual lessons. Shared layout and practice engine: verb-tenses.js.
(function(root){
const sources={
 basics:{title:'British Council · Passives',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives'},
 reference:{title:'British Council · Active and passive voice',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/active-passive-voice'},
 get:{title:'Cambridge Dictionary · Get passive',url:'https://dictionary.cambridge.org/grammar/british-grammar/passive'},
 infinitive:{title:'Cambridge Dictionary · Infinitive: active or passive?',url:'https://dictionary.cambridge.org/uk/grammar/british-grammar/infinitive-active-or-passive'}
};
const lessons=[
{
 id:'active-and-passive',group:'foundations',title:'Active & Passive Voice',spanish:'Voz activa y voz pasiva',summary:'Elige si enfocas a quien actúa o a quien recibe la acción.',
 definition:['La voz indica cómo organizamos a los participantes de una acción. En la activa, el sujeto realiza la acción: Ana writes the story. En la pasiva, el sujeto recibe esa acción: The story is written by Ana. El hecho básico se mantiene, pero cambia el punto de partida.','La voz pasiva no es un tiempo verbal. Puede combinarse con presente, pasado o futuro. Su patrón habitual es un sujeto que recibe la acción + be en la forma necesaria + participio pasado del verbo principal. El agente, introducido por by, solo se añade cuando aporta información.'],
 timeline:['Identifica quién actúa','Identifica qué recibe la acción','Elige qué quieres destacar'],
 uses:[
  ['Agente desconocido','Cuando no sabes quién hizo algo, puedes hablar de la persona o cosa afectada.','My backpack was stolen on the bus.','Me robaron la mochila en el autobús.'],
  ['Acción o resultado relevante','En instrucciones y descripciones de procesos suele importar más lo que ocurre que quién lo hace.','The uniforms are washed every evening.','Los uniformes se lavan todas las tardes.'],
  ['Continuidad del tema','Empieza por el tema del que ya estabas hablando y añade información sobre él.','This comic was illustrated by my cousin.','Este cómic fue ilustrado por mi primo.']
 ],
 forms:[
  ['Afirmativa','Receptor + be conjugado + participio (+ by + agente)','The posters are designed by Ana.','Los carteles son diseñados por Ana.'],
  ['Negativa','Receptor + primer auxiliar + not + resto del verbo','The posters are not designed by Luis.','Los carteles no son diseñados por Luis.'],
  ['Pregunta','Primer auxiliar + receptor + resto del verbo?','Are the posters designed by Ana?','¿Los carteles son diseñados por Ana?'],
  ['Pregunta con WH','WH + primer auxiliar + receptor + resto del verbo?','Where are the posters designed?','¿Dónde se diseñan los carteles?']
 ],
 agreement:[['Sujeto singular','The poster is designed.'],['Sujeto plural','The posters are designed.'],['Participio invariable','designed: igual con singular y plural']],
 shortAnswers:['Are the posters designed here?','Yes, they are.','No, they are not. / No, they aren’t.','Responde con el primer auxiliar y el pronombre que representa al sujeto pasivo. The posters se sustituye por they.'],
 rules:[
  ['El sujeto no siempre actúa','Sujeto es una función gramatical. En The song was recorded yesterday, the song es el sujeto, aunque alguien más grabó la canción.'],
  ['El participio no es siempre el pasado','Los regulares suelen terminar en -ed: paint → painted. En los irregulares memoriza la tercera forma: write → wrote → written; make → made → made.'],
  ['Cuándo incluir by','Úsalo si el autor importa: The mural was painted by Ana. Puedes omitir un agente genérico como someone o people. By no es obligatorio para reconocer una pasiva.'],
  ['Traducción natural al español','La pasiva inglesa puede traducirse con ser + participio, con se o con una oración activa impersonal: The clothes are washed here → Aquí se lava la ropa.'],
  ['Acción y estado','Be + una palabra terminada en -ed no garantiza una pasiva verbal. The door is closed puede describir un estado; The door is closed by the guard at eight describe una acción habitual. El contexto decide.']
 ],
 markers:[['by the teacher','por el profesor: agente'],['be + past participle','patrón de la pasiva con be'],['active voice','el sujeto realiza la acción'],['passive voice','el sujeto recibe la acción']],
 contrast:{id:'building-the-passive',title:'Un hecho, dos enfoques',pairs:[['Ana designs the posters.','Ana diseña los carteles.','Activa: empezamos por la diseñadora.'],['The posters are designed by Ana.','Los carteles son diseñados por Ana.','Pasiva: empezamos por los carteles.']],note:'Cambiar la voz no obliga a cambiar el tiempo. Designs y are designed están en presente simple.'},
 mistakes:[['The posters designed by Ana.','The posters are designed by Ana.','Para que sea una oración completa en presente simple, necesitas are antes del participio.'],['The story is wrote by Luis.','The story is written by Luis.','Wrote es pasado simple; written es el participio que necesita la pasiva.']],
 practice:[
  {prompt:'En The bridge was built in 2010, ¿qué recibe la acción?',choiceLang:'es',choices:["El año 2010","El puente","Los constructores"],answer:1,explanation:'The bridge es el sujeto pasivo: alguien construyó el puente.'},
  {prompt:'Elige la oración en voz pasiva.',choices:["Ana is writing the email.","The email is written by Ana.","Ana writes the email."],answer:1,explanation:'Is written une be y el participio; the email recibe la acción.'},
  {prompt:'¿Es obligatorio añadir by + agente en toda pasiva?',choiceLang:'es',choices:["Solo en presente","Sí, siempre","No, puede omitirse si no aporta información"],answer:2,explanation:'La pasiva puede omitir al agente cuando es desconocido, evidente o poco relevante.'},
  {prompt:'Pasa a pasiva y conserva by Ana: Ana paints the wall.',answers:['The wall is painted by Ana.'],explanation:'The wall pasa a ser el sujeto. Conserva el presente con is y añade painted + by Ana.'}
 ],sources:['basics','reference']
},
{
 id:'building-the-passive',group:'foundations',title:'Building the Passive',spanish:'Transformación, agente y participios',summary:'Convierte activa en pasiva conservando el tiempo y el significado.',
 definition:['Para transformar una oración activa, localiza el verbo y el objeto que recibe su acción. Ese objeto pasa a ser sujeto de la pasiva. Construye be con el mismo tiempo y aspecto, cambia el verbo principal a participio y decide si necesitas mencionar al agente.','Por ejemplo, They repaired the computers pasa a The computers were repaired. El pasado de repaired se conserva en were; el plural computers determina were, no was. Las referencias de tiempo y lugar también se conservan.'],
 timeline:['Objeto activo → sujeto pasivo','Mismo tiempo de be + participio','Conserva complementos y decide si añades by'],
 uses:[
  ['Conservar la información','Mantén el tiempo, la negación y los detalles que sean importantes para el mensaje.','The computers were repaired yesterday.','Las computadoras fueron reparadas ayer.'],
  ['Destacar a una persona receptora','Con verbos como give, send y offer, el receptor puede convertirse en sujeto.','Ana was given a certificate.','A Ana le entregaron un certificado.'],
  ['Conservar partículas','Las partículas y preposiciones que forman parte del verbo permanecen en la pasiva.','The match was called off because of the rain.','El partido fue cancelado por la lluvia.']
 ],
 forms:[
  ['Afirmativa','Objeto activo → sujeto + be del mismo tiempo + participio','The files were checked by him.','Los archivos fueron revisados por él.'],
  ['Negativa','Sujeto + be + not + participio','The files were not checked by him.','Los archivos no fueron revisados por él.'],
  ['Pregunta','Be + sujeto + participio?','Were the files checked by him?','¿Los archivos fueron revisados por él?'],
  ['Pregunta con WH','WH + be + sujeto + participio?','When were the files checked?','¿Cuándo se revisaron los archivos?']
 ],
 agreementTitle:'Pronombres al cambiar de función',
 agreement:[['Objeto → sujeto','me → I; him → he; her → she; us → we; them → they'],['Después de by','I → by me; he → by him; she → by her; we → by us; they → by them'],['Formas que coinciden','you → you; it → it']],
 shortAnswers:['Were the files checked?','Yes, they were.','No, they were not. / No, they weren’t.','La concordancia se calcula con el nuevo sujeto: the files → they → were.'],
 rules:[
  ['Verbos que permiten la transformación','El patrón básico requiere un objeto. Arrive, happen y sleep, en sus usos habituales sin objeto, no se convierten así en pasiva: The guests arrived. Tener objeto tampoco garantiza un uso pasivo natural en todos los sentidos de un verbo.'],
  ['Dos objetos','They gave Ana a certificate permite Ana was given a certificate o A certificate was given to Ana. Con give y send, conserva to si empiezas por la cosa; no añadas to antes del nuevo sujeto.'],
  ['By frente a with','By presenta al agente; with suele presentar el instrumento: The paper was cut by Ana with scissors. Ana corta; las tijeras son el instrumento.'],
  ['No cambies el tiempo','They are checking it → It is being checked; They have checked it → It has been checked. Being marca el proceso; been aparece en la cadena perfecta.'],
  ['Verbos con partículas','Look after → be looked after; turn off → be turned off. No elimines after u off: cambiarías o perderías el significado.']
 ],
 markers:[['by me / by them','por mí / por ellos'],['with a brush','con un cepillo: instrumento'],['to Ana','a Ana: receptor con ciertos verbos'],['written / built / sent','participios de write / build / send']],
 contrast:{id:'past-simple',title:'Dos objetos: dos sujetos posibles',pairs:[['Ana was sent a message.','A Ana le enviaron un mensaje.','Foco en la persona que lo recibió.'],['A message was sent to Ana.','Se envió un mensaje a Ana.','Foco en el mensaje; conserva to antes del receptor.']],note:'Ambas formas pueden corresponder a They sent Ana a message. Este patrón depende del verbo: no lo apliques automáticamente a todos.'},
 mistakes:[['The guests were arrived at noon.','The guests arrived at noon.','Arrive es intransitivo en este uso. No hay objeto que pueda convertirse en sujeto pasivo.'],['The files were checked by he.','The files were checked by him.','Después de la preposición by se usa el pronombre de objeto him.']],
 practice:[
  {prompt:'They invited me. Elige la pasiva correcta.',choices:["I was invited.","I were invited.","Me was invited."],answer:0,explanation:'Me pasa a I al funcionar como sujeto. Con I en pasado usamos was.'},
  {prompt:'Completa: The picture was drawn ___ Ana ___ a pencil.',choices:["by / with","with / by","by / by"],answer:0,explanation:'Ana es la agente: by Ana. El lápiz es el instrumento: with a pencil.'},
  {prompt:'¿Cuál mantiene correctamente el significado de They looked after the child?',choices:["The child was looked.","The child was looked after.","The child was looking after."],answer:1,explanation:'Look after significa cuidar. La preposición after forma parte de la construcción y se conserva.'},
  {prompt:'Pasa a pasiva empezando por Ana y omite al agente: They gave Ana a book.',answers:['Ana was given a book.'],explanation:'Ana es el receptor y pasa a sujeto. El participio de give es given.'}
 ],sources:['reference','basics']
},
{
 id:'present-simple',group:'present',title:'Present Simple Passive',spanish:'Pasiva en presente simple',summary:'Hábitos, procesos y hechos generales centrados en el receptor.',activeId:'present-simple',
 definition:['Usa el presente simple pasivo para describir lo que normalmente se hace con algo o lo que se considera un hecho general. El sujeto recibe la acción: The classroom is cleaned every day. No dice necesariamente que se esté limpiando ahora.','Se construye con am, is o are + participio pasado. El nuevo sujeto determina la forma de be; el participio permanece igual. Para negar o preguntar se modifica be, sin añadir do ni does.'],
 timeline:['La acción es habitual','El receptor es el tema','Am / is / are + participio'],
 uses:[
  ['Rutinas','Describe servicios o tareas que se repiten.','The towels are washed after each use.','Las toallas se lavan después de cada uso.'],
  ['Procesos','Explica cómo se fabrica o prepara algo.','The bread is baked before sunrise.','El pan se hornea antes del amanecer.'],
  ['Normas y organización','Indica qué se permite o cómo se organiza una actividad.','English is taught in this classroom.','En esta aula se enseña inglés.']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + participio','The uniforms are washed here.','Los uniformes se lavan aquí.'],
  ['Negativa','Sujeto + am / is / are + not + participio','The uniforms are not washed here.','Los uniformes no se lavan aquí.'],
  ['Pregunta','Am / Is / Are + sujeto + participio?','Are the uniforms washed here?','¿Los uniformes se lavan aquí?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + participio?','Where are the uniforms washed?','¿Dónde se lavan los uniformes?']
 ],
 agreement:[['I','am invited'],['he / she / it / singular','is invited'],['you / we / they / plural','are invited']],
 shortAnswers:['Is the classroom cleaned every day?','Yes, it is.','No, it is not. / No, it isn’t.','Usa am, is o are. En una respuesta afirmativa corta no termines con la contracción: Yes, it is, no Yes, it’s.'],
 rules:[
  ['El participio no lleva -s de tercera persona','The cake is made, no is makes. La concordancia se expresa en is o are; made no cambia.'],
  ['Negación con be','Is not = isn’t; are not = aren’t; I am not = I’m not. No uses doesn’t be para construir esta pasiva.'],
  ['Preguntas por el sujeto','Who is invited? pregunta por el receptor que es sujeto. En Who are the invitations sent to?, who pregunta por el destinatario y the invitations sigue siendo el sujeto.'],
  ['Hecho habitual frente a proceso','The shirts are washed every morning describe una rutina. The shirts are being washed now presenta una acción en curso.']
 ],
 markers:[['every morning','cada mañana'],['usually / often','normalmente / a menudo'],['here / in this school','aquí / en esta escuela'],['once a week','una vez por semana']],
 contrast:{id:'present-continuous',title:'Rutina o actividad en curso',pairs:[['The room is cleaned every morning.','La habitación se limpia todas las mañanas.','Presente simple: rutina.'],['The room is being cleaned now.','La habitación se está limpiando ahora.','Presente continuo: proceso actual.']],note:'El verbo principal sigue siendo cleaned. Being cambia la perspectiva de rutina a proceso.'},
 mistakes:[['The uniforms is washed here.','The uniforms are washed here.','Uniforms es plural; necesita are.'],['Does the room cleaned every day?','Is the room cleaned every day?','La pregunta pasiva se construye con is + sujeto + participio.']],
 practice:[
  {prompt:'Completa: The windows ___ cleaned every Friday.',choices:["be","is","are"],answer:2,explanation:'The windows es plural: are cleaned.'},
  {prompt:'Completa: This juice is ___ from fresh oranges.',choices:["make","making","made"],answer:2,explanation:'Made es el participio irregular de make.'},
  {prompt:'Elige la pregunta pasiva correcta.',choices:["Is the classroom cleaned daily?","Is cleaned the classroom daily?","Does the classroom cleaned daily?"],answer:0,explanation:'Invierte is y el sujeto: Is the classroom cleaned…?'},
  {prompt:'Escribe en negativo: The shirts are washed here.',answers:['The shirts are not washed here.','The shirts aren’t washed here.'],explanation:'Añade not después de are o usa aren’t. Conserva washed.'}
 ],sources:['basics','reference']
},
{
 id:'present-continuous',group:'present',title:'Present Continuous Passive',spanish:'Pasiva en presente continuo',summary:'Acciones que se están realizando ahora o durante este período.',activeId:'present-continuous',
 definition:['Presenta al receptor de una acción que está en desarrollo ahora o durante un período actual. The bridge is being repaired enfoca el puente mientras alguien lo repara; no afirma que la reparación haya terminado.','La estructura es am, is o are + being + participio. El primer be se conjuga según el sujeto; being señala el aspecto continuo y el participio expresa la acción recibida. No sustituyas being por been.'],
 timeline:['Alguien inicia la acción','Ahora afecta al receptor','El proceso sigue en marcha'],
 uses:[
  ['Acción en este momento','Describe lo que se está haciendo justo ahora.','The lesson is being recorded now.','La clase se está grabando ahora.'],
  ['Trabajo temporal','El proceso puede extenderse por días aunque no ocurra en cada segundo.','New classrooms are being built this year.','Este año se están construyendo aulas nuevas.'],
  ['Cambios en desarrollo','Presenta mejoras o revisiones que todavía están en curso.','The school rules are being reviewed this month.','Este mes se están revisando las normas de la escuela.']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + being + participio','The video is being edited.','El video se está editando.'],
  ['Negativa','Sujeto + am / is / are + not + being + participio','The video is not being edited.','El video no se está editando.'],
  ['Pregunta','Am / Is / Are + sujeto + being + participio?','Is the video being edited?','¿Se está editando el video?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + being + participio?','Why is the video being edited again?','¿Por qué se está editando el video otra vez?']
 ],
 agreement:[['I','am being interviewed'],['he / she / it / singular','is being interviewed'],['you / we / they / plural','are being interviewed']],
 shortAnswers:['Are the videos being edited?','Yes, they are.','No, they are not. / No, they aren’t.','La respuesta corta repite are, el primer auxiliar. No necesitas repetir being edited.'],
 rules:[
  ['Being conserva el proceso','Is repaired puede expresar un hecho o una rutina. Is being repaired presenta la reparación como una actividad en curso.'],
  ['El verbo principal va en participio','Usa is being written, no is being writing. La marca continua ya está en being.'],
  ['Negación e inversión','Not se coloca después de am, is o are. En preguntas solo ese primer auxiliar pasa delante del sujeto.'],
  ['Activa y pasiva tienen distinto sujeto','The editor is editing the video → The video is being edited. El editor actúa; el video recibe el trabajo.']
 ],
 markers:[['now / right now','ahora / ahora mismo'],['at the moment','en este momento'],['this week','esta semana'],['currently','actualmente']],
 contrast:{id:'present-perfect',title:'Proceso actual o resultado hasta ahora',pairs:[['The video is being edited.','El video se está editando.','El trabajo está en marcha.'],['The video has been edited.','El video ha sido editado.','La edición ya se realizó y el resultado importa ahora.']],note:'Being y been no son intercambiables: is being edited y has been edited tienen estructuras y enfoques diferentes.'},
 mistakes:[['The video is been edited now.','The video is being edited now.','En el continuo pasivo se usa being. Been aparece después de have en formas perfectas.'],['The video is being editing.','The video is being edited.','Después de being usa el participio edited.']],
 practice:[
  {prompt:'Completa: The road is ___ repaired right now.',choices:["been","being","be"],answer:1,explanation:'Is being repaired es presente continuo pasivo.'},
  {prompt:'Completa: The invitations are being ___.',choices:["writing","written","write"],answer:1,explanation:'El participio de write es written.'},
  {prompt:'¿Cuál presenta una acción en curso?',choices:["The towels were washed yesterday.","The towels are washed daily.","The towels are being washed now."],answer:2,explanation:'Are being washed now presenta la acción mientras se realiza.'},
  {prompt:'Convierte en pregunta: The car is being repaired.',answers:['Is the car being repaired?'],explanation:'Mueve is delante de the car y conserva being repaired.'}
 ],sources:['basics','reference']
},
{
 id:'present-perfect',group:'present',title:'Present Perfect Passive',spanish:'Pasiva en presente perfecto',summary:'Acciones recibidas con conexión al presente.',activeId:'present-perfect',
 definition:['Conecta una acción anterior con el presente desde la perspectiva de su receptor. The results have been published comunica que la publicación ya ocurrió y que los resultados están disponibles ahora.','Se forma con have o has + been + participio. Have o has concuerda con el sujeto; been es el participio de be. Esta forma también puede describir acciones repetidas o situaciones que continúan hasta ahora, según el contexto.'],
 timeline:['La acción ocurre antes de ahora','El receptor sigue siendo el foco','El resultado o período conecta con el presente'],
 uses:[
  ['Resultado presente','Destaca algo que ya se hizo y afecta la situación actual.','The link has been updated.','El enlace ha sido actualizado.'],
  ['Experiencia hasta ahora','Expresa cuántas veces alguien ha recibido una acción.','She has been invited to the festival twice.','La han invitado al festival dos veces.'],
  ['Período que llega al presente','Describe una práctica o situación mantenida durante un período abierto.','These books have been used in our classes for years.','Estos libros se han usado en nuestras clases durante años.']
 ],
 forms:[
  ['Afirmativa','Sujeto + have / has + been + participio','The homework has been checked.','La tarea ha sido revisada.'],
  ['Negativa','Sujeto + have / has + not + been + participio','The homework has not been checked yet.','La tarea todavía no ha sido revisada.'],
  ['Pregunta','Have / Has + sujeto + been + participio?','Has the homework been checked?','¿La tarea ha sido revisada?'],
  ['Pregunta con WH','WH + have / has + sujeto + been + participio?','Why has the homework been checked twice?','¿Por qué se ha revisado la tarea dos veces?']
 ],
 agreement:[['he / she / it / singular','has been invited'],['I / you / we / they / plural','have been invited'],['Con ambos auxiliares','been + participio: no cambian']],
 shortAnswers:['Has the homework been checked?','Yes, it has.','No, it has not. / No, it hasn’t.','La respuesta usa has, no is. El primer auxiliar de has been checked es has.'],
 rules:[
  ['Dos participios en la cadena','En has been written, been pertenece a be y written a write. No omitas ninguno.'],
  ['Yet, already y just','Yet suele ir al final de preguntas y negativas. Already y just suelen aparecer después de have o has: has just been sent.'],
  ['Un momento pasado terminado','Para indicar que algo ocurrió yesterday o last Monday, normalmente usa pasado simple: The email was sent yesterday.'],
  ['Preguntas por el sujeto','En How many exercises have been checked?, how many exercises es el sujeto completo. No añadas otro sujeto ni inviertas have con una parte de esa expresión.']
 ],
 markers:[['already / just','ya / acabar de'],['yet','ya en preguntas; todavía en negativas'],['so far','hasta ahora'],['for / since','duración / inicio del período']],
 contrast:{id:'past-simple',title:'Conexión con ahora o momento pasado',pairs:[['The invitations have been sent.','Las invitaciones han sido enviadas.','Importa el resultado actual; no se da una fecha terminada.'],['The invitations were sent yesterday.','Las invitaciones fueron enviadas ayer.','La acción se sitúa en un momento pasado terminado.']],note:'La diferencia temporal es la misma que estudiaste en Verb Tenses; la pasiva añade el enfoque en las invitaciones.'},
 mistakes:[['The homework has checked.','The homework has been checked.','Sin been, la estructura sería activa; aquí la tarea recibe la revisión.'],['The message has been wrote.','The message has been written.','Usa written, el participio, después de been.']],
 practice:[
  {prompt:'Completa: The files ___ been uploaded.',choices:["have","are","has"],answer:0,explanation:'The files es plural: have been uploaded.'},
  {prompt:'Completa: The classroom has ___ cleaned.',choices:["been","being","be"],answer:0,explanation:'Have/has va seguido de been para formar el perfecto pasivo.'},
  {prompt:'Elige la oración adecuada con yesterday.',choices:["The email has been sent yesterday.","The email was sent yesterday.","The email is been sent yesterday."],answer:1,explanation:'Yesterday sitúa el envío en un período terminado: was sent.'},
  {prompt:'Escribe en negativo: The homework has been checked.',answers:['The homework has not been checked.','The homework hasn’t been checked.'],explanation:'Añade not después de has; conserva been checked.'}
 ],sources:['basics','reference']
},
{
 id:'past-simple',group:'past',title:'Past Simple Passive',spanish:'Pasiva en pasado simple',summary:'Hechos terminados y acciones recibidas en un momento pasado.',activeId:'past-simple',
 definition:['Cuenta una acción terminada desde el punto de vista de quien la recibió. En The school was built in 1998, school es el sujeto y built expresa lo que alguien hizo con ese sujeto en una fecha pasada.','Usa was o were + participio. La información de pasado está en was o were; el verbo principal debe tener su forma de participio incluso si esta es distinta del pasado simple, como wrote → written.'],
 timeline:['Sitúa un momento pasado','La acción se realizó entonces','Describe al receptor con was / were + participio'],
 uses:[
  ['Hechos fechados','Presenta acontecimientos con una fecha o época terminada.','The library was opened in 2015.','La biblioteca fue inaugurada en 2015.'],
  ['Relatos de lo sucedido','Cuenta lo que les pasó a objetos o personas.','My keys were found near the door.','Mis llaves fueron encontradas cerca de la puerta.'],
  ['Autores y creadores','Menciona quién hizo una obra cuando esa información importa.','The school song was written by our music teacher.','La canción de la escuela fue escrita por nuestro profesor de música.']
 ],
 forms:[
  ['Afirmativa','Sujeto + was / were + participio','The classroom was cleaned yesterday.','El aula fue limpiada ayer.'],
  ['Negativa','Sujeto + was / were + not + participio','The classroom was not cleaned yesterday.','El aula no fue limpiada ayer.'],
  ['Pregunta','Was / Were + sujeto + participio?','Was the classroom cleaned yesterday?','¿El aula fue limpiada ayer?'],
  ['Pregunta con WH','WH + was / were + sujeto + participio?','When was the classroom cleaned?','¿Cuándo se limpió el aula?']
 ],
 agreement:[['I / he / she / it / singular','was invited'],['you / we / they / plural','were invited']],
 shortAnswers:['Were the keys found?','Yes, they were.','No, they were not. / No, they weren’t.','Responde con was o were, no con did: el verbo que se invierte en la pregunta es be.'],
 rules:[
  ['Was y were concuerdan con el receptor','They repaired the bike → The bike was repaired. Aunque they sea plural, bike es singular y necesita was.'],
  ['Participios irregulares','Build → built; find → found; write → written; choose → chosen; break → broken. No todos coinciden con el pasado simple.'],
  ['Negaciones y preguntas','Was not = wasn’t y were not = weren’t. No añadas did: Was the message sent? / The message wasn’t sent.'],
  ['Preguntar por el agente','Who was the song written by? es habitual en conversación. By whom was the song written? es una alternativa más formal. En ambos casos the song sigue siendo el sujeto.']
 ],
 markers:[['yesterday','ayer'],['last week','la semana pasada'],['in 2015','en 2015'],['two days ago','hace dos días']],
 contrast:{id:'past-continuous',title:'Hecho terminado o proceso en un momento pasado',pairs:[['The room was painted yesterday.','La habitación fue pintada ayer.','Se presenta la pintura como un hecho terminado.'],['The room was being painted when I arrived.','La habitación se estaba pintando cuando llegué.','El trabajo estaba en marcha en ese momento.']],note:'Was painted relata el hecho; was being painted permite observar su desarrollo.'},
 mistakes:[['The song was wrote by Ana.','The song was written by Ana.','Después de was necesitas el participio written.'],['Did the windows cleaned yesterday?','Were the windows cleaned yesterday?','Usa were con el sujeto plural y conserva cleaned.']],
 practice:[
  {prompt:'Completa: The bridge ___ built in 1998.',choices:["did","were","was"],answer:2,explanation:'The bridge es singular: was built.'},
  {prompt:'Completa: The letter was ___ by Luis.',choices:["wrote","writing","written"],answer:2,explanation:'Written es el participio de write; wrote es pasado simple.'},
  {prompt:'Elige la pregunta correcta por el agente.',choices:["Who was the mural painted by?","Who was painted the mural by?","Who did the mural painted by?"],answer:0,explanation:'Was se coloca antes de the mural. By introduce al agente por el que preguntamos.'},
  {prompt:'Pasa a pasiva, empieza por The window y conserva by Ana: Ana broke the window.',answers:['The window was broken by Ana.'],explanation:'The window es singular. Conserva el pasado con was y usa el participio broken.'}
 ],sources:['basics','reference']
},
{
 id:'past-continuous',group:'past',title:'Past Continuous Passive',spanish:'Pasiva en pasado continuo',summary:'Lo que se estaba haciendo con algo en un momento anterior.',activeId:'past-continuous',
 definition:['Muestra una acción que estaba afectando al sujeto durante un momento pasado. The food was being prepared when we arrived indica que la preparación estaba en curso al llegar; no indica por sí sola cuándo terminó.','Se forma con was o were + being + participio. Was o were sitúa el proceso en el pasado y concuerda con el sujeto; being mantiene el aspecto continuo y el participio expresa la acción recibida.'],
 timeline:['El proceso ya había comenzado','En ese momento seguía en curso','Su final queda fuera del enfoque'],
 uses:[
  ['Acción en una hora pasada','Describe una actividad que se estaba realizando en un momento concreto.','The classroom was being cleaned at six.','El aula se estaba limpiando a las seis.'],
  ['Contexto de otro evento','Da el trasfondo durante el cual ocurrió otra acción.','The match was being recorded when the power went out.','El partido se estaba grabando cuando se fue la luz.'],
  ['Procesos simultáneos','Presenta actividades que se desarrollaban a la vez.','The tables were being arranged while the food was being prepared.','Las mesas se estaban organizando mientras se preparaba la comida.']
 ],
 forms:[
  ['Afirmativa','Sujeto + was / were + being + participio','The computers were being repaired.','Las computadoras se estaban reparando.'],
  ['Negativa','Sujeto + was / were + not + being + participio','The computers were not being repaired.','Las computadoras no se estaban reparando.'],
  ['Pregunta','Was / Were + sujeto + being + participio?','Were the computers being repaired?','¿Se estaban reparando las computadoras?'],
  ['Pregunta con WH','WH + was / were + sujeto + being + participio?','Where were the computers being repaired?','¿Dónde se estaban reparando las computadoras?']
 ],
 agreement:[['I / he / she / it / singular','was being interviewed'],['you / we / they / plural','were being interviewed']],
 shortAnswers:['Was the classroom being cleaned?','Yes, it was.','No, it was not. / No, it wasn’t.','Repite solo was o were. Being y el participio no se necesitan en la respuesta corta.'],
 rules:[
  ['Being no cambia','Usa was being y were being. No escribas was been ni conviertas being en un pasado.'],
  ['Un proceso no garantiza finalización','The car was being repaired at noon no asegura que terminaran de repararlo. Para afirmar el resultado necesitas otra información.'],
  ['When y while','When suele introducir un evento de referencia y while suele conectar procesos. El contexto, no la palabra aislada, determina el tiempo adecuado.'],
  ['Orden de auxiliares','En Were the invitations being printed?, únicamente were se mueve delante del sujeto; being printed permanece unido.']
 ],
 markers:[['at that moment','en ese momento'],['at six yesterday','ayer a las seis'],['when I arrived','cuando llegué'],['while','mientras']],
 contrast:{id:'past-perfect',title:'En desarrollo o ya realizado antes',pairs:[['The room was being cleaned when I arrived.','La habitación se estaba limpiando cuando llegué.','La limpieza seguía en curso.'],['The room had been cleaned when I arrived.','La habitación había sido limpiada cuando llegué.','La limpieza ya se había realizado.']],note:'Elige was being para el proceso y had been para una acción anterior al punto pasado de referencia.'},
 mistakes:[['The computers were been repaired.','The computers were being repaired.','La cadena del pasado continuo es were being + participio.'],['The car was being repair.','The car was being repaired.','El verbo principal va en participio: repaired.']],
 practice:[
  {prompt:'Completa: The stage was ___ prepared when we arrived.',choices:["been","being","be"],answer:1,explanation:'Was being prepared presenta la preparación en curso.'},
  {prompt:'Completa: The tickets ___ being checked at the entrance.',choices:["did","were","was"],answer:1,explanation:'Tickets es plural: were being checked.'},
  {prompt:'The car was being repaired at noon significa que…',choiceLang:'es',choices:["El auto se repara todos los días","La reparación había terminado necesariamente","La reparación estaba en curso al mediodía"],answer:2,explanation:'El continuo enfoca el proceso; no asegura que haya terminado.'},
  {prompt:'Convierte en pregunta: The computers were being repaired.',answers:['Were the computers being repaired?'],explanation:'Mueve were delante del sujeto y conserva being repaired.'}
 ],sources:['basics','reference']
},
{
 id:'past-perfect',group:'past',title:'Past Perfect Passive',spanish:'Pasiva en pasado perfecto',summary:'Acciones que ya se habían realizado antes de otro momento pasado.',activeId:'past-perfect',
 definition:['Relaciona una acción recibida con un punto de referencia posterior en el pasado. The files had been deleted before I opened the folder indica que primero se borraron los archivos y después abrí la carpeta.','La estructura es had + been + participio para todos los sujetos. Had sitúa la mirada en el pasado y la construcción perfecta presenta algo anterior a ese punto; el sujeto sigue siendo quien recibe la acción.'],
 timeline:['Primero: se realiza la acción','Después: otro momento pasado','Ahora: contamos esa relación'],
 uses:[
  ['Orden de dos acontecimientos','Aclara qué acción se completó primero.','The tickets had been sold before we arrived.','Las entradas se habían vendido antes de que llegáramos.'],
  ['Explicar una situación pasada','Da la causa anterior de un resultado que encontraste.','We could not open the door because the lock had been changed.','No pudimos abrir la puerta porque habían cambiado la cerradura.'],
  ['Estado de una tarea en un plazo pasado','Mira lo que ya se había realizado hasta cierta hora.','By noon, all the essays had been graded.','Para el mediodía, todos los ensayos habían sido calificados.']
 ],
 forms:[
  ['Afirmativa','Sujeto + had + been + participio','The lesson had been recorded before Monday.','La clase había sido grabada antes del lunes.'],
  ['Negativa','Sujeto + had + not + been + participio','The lesson had not been recorded before Monday.','La clase no había sido grabada antes del lunes.'],
  ['Pregunta','Had + sujeto + been + participio?','Had the lesson been recorded before Monday?','¿La clase había sido grabada antes del lunes?'],
  ['Pregunta con WH','WH + had + sujeto + been + participio?','Why had the lesson been recorded early?','¿Por qué se había grabado la clase antes de tiempo?']
 ],
 agreement:[['Todos los sujetos','had been invited'],['Negativa','had not been invited / hadn’t been invited']],
 shortAnswers:['Had the tickets been sold?','Yes, they had.','No, they had not. / No, they hadn’t.','Had es el primer auxiliar y no cambia entre singular y plural.'],
 rules:[
  ['Identifica el punto de referencia','Necesitas un contexto pasado al que la acción sea anterior. No uses past perfect solo para decir que algo ocurrió hace mucho tiempo.'],
  ['Been es imprescindible','Had sent es activa. Had been sent es pasiva: The message had been sent.'],
  ['Hadn’t y la forma corta de had','Had not se contrae como hadn’t. Con pronombres también puedes contraer had: They had been invited → They’d been invited. En este patrón, ’d significa had.'],
  ['By the time','By the time we arrived, the doors had been locked relaciona la llegada con una acción anterior. No confundas este by temporal con by + agente.']
 ],
 markers:[['before','antes de'],['by the time','para cuando'],['already','ya'],['by noon','para el mediodía']],
 contrast:{id:'present-perfect',title:'Anterior a ahora o anterior a otro pasado',pairs:[['The files have been uploaded.','Los archivos han sido subidos.','El resultado conecta con el presente.'],['The files had been uploaded before the class started.','Los archivos habían sido subidos antes de que empezara la clase.','La subida es anterior al inicio pasado de la clase.']],note:'Have/has been mira hacia ahora; had been mira hacia otro punto pasado.'},
 mistakes:[['The room had cleaned before we arrived.','The room had been cleaned before we arrived.','La habitación recibe la limpieza: necesitas been.'],['The files had been deleting.','The files had been deleted.','Después de been en esta pasiva usa el participio deleted.']],
 practice:[
  {prompt:'Completa: The seats ___ been reserved before we called.',choices:["had","were","have"],answer:0,explanation:'La reserva ocurrió antes de otra acción pasada: had been reserved.'},
  {prompt:'Completa: The documents had ___ signed.',choices:["been","being","be"],answer:0,explanation:'La cadena correcta es had been signed.'},
  {prompt:'The tickets had been sold before we arrived. ¿Qué ocurrió primero?',choiceLang:'es',choices:["Llegamos","Se vendieron las entradas","Ocurrieron necesariamente a la vez"],answer:1,explanation:'Had been sold presenta la venta como anterior a nuestra llegada.'},
  {prompt:'Escribe en negativo: The door had been locked.',answers:['The door had not been locked.','The door hadn’t been locked.'],explanation:'Añade not después de had; conserva been locked.'}
 ],sources:['basics','reference']
},
{
 id:'future-simple',group:'future',title:'Future Simple Passive',spanish:'Pasiva de futuro con will',summary:'Lo que se hará, se enviará o se completará en el futuro.',activeId:'future-simple',
 definition:['Expresa una predicción, una promesa o un anuncio sobre algo que el sujeto recibirá en el futuro. The results will be announced tomorrow se centra en los resultados y en su anuncio, sin necesidad de decir quién los anunciará.','Se forma con will + be + participio. Will no cambia con el sujeto y va seguido de be en forma base. Para negar, coloca not después de will; para preguntar, lleva will delante del sujeto.'],
 timeline:['Ahora: anuncio o predicción','Después: se realizará la acción','El receptor será el foco'],
 uses:[
  ['Anuncios','Informa de algo que se hará más adelante.','The results will be published tomorrow.','Los resultados se publicarán mañana.'],
  ['Promesas','Expresa un compromiso sobre un servicio o resultado.','Your message will be answered today.','Tu mensaje será respondido hoy.'],
  ['Predicciones','Anticipa un cambio o un resultado.','More classes will be offered next year.','El próximo año se ofrecerán más clases.']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + be + participio','The packages will be delivered tomorrow.','Los paquetes se entregarán mañana.'],
  ['Negativa','Sujeto + will + not + be + participio','The packages will not be delivered tomorrow.','Los paquetes no se entregarán mañana.'],
  ['Pregunta','Will + sujeto + be + participio?','Will the packages be delivered tomorrow?','¿Se entregarán los paquetes mañana?'],
  ['Pregunta con WH','WH + will + sujeto + be + participio?','When will the packages be delivered?','¿Cuándo se entregarán los paquetes?']
 ],
 agreement:[['Todos los sujetos','will be invited'],['Forma negativa','will not be invited / won’t be invited']],
 shortAnswers:['Will the packages be delivered tomorrow?','Yes, they will.','No, they will not. / No, they won’t.','En la respuesta corta repite will. En afirmativa no termines con they’ll: escribe Yes, they will.'],
 rules:[
  ['Be permanece en forma base','Usa will be sent, no will is sent ni will are sent. El plural del sujeto no cambia esta cadena.'],
  ['Will not = won’t','La contracción negativa es won’t. Conserva be después: The exam won’t be cancelled.'],
  ['El participio expresa la acción','Will be writing sería una forma continua activa. Para pasiva usa will be written.'],
  ['Cláusulas de tiempo','Después de when, before o as soon as, una referencia futura suele usar presente: The files will be sent when the lesson is finished. No añadas will de manera automática a ambas partes.']
 ],
 markers:[['tomorrow','mañana'],['next week','la próxima semana'],['soon','pronto'],['in a few days','dentro de unos días']],
 contrast:{id:'be-going-to',title:'Anuncio con will o plan con going to',pairs:[['The classroom will be painted tomorrow.','El aula será pintada mañana.','Anuncio o predicción sobre el futuro.'],['The classroom is going to be painted tomorrow.','El aula se va a pintar mañana.','Plan previo que presentamos como decidido.']],note:'Las dos formas pueden coincidir en algunos contextos. Going to suele destacar una intención previa o evidencia presente; will también sirve para anuncios y promesas.'},
 mistakes:[['The files will sent tomorrow.','The files will be sent tomorrow.','La pasiva necesita be entre will y sent.'],['The result will is announced.','The result will be announced.','Después de will se usa be en forma base.']],
 practice:[
  {prompt:'Completa: The exam will ___ checked tomorrow.',choices:["been","is","be"],answer:2,explanation:'Will va seguido de be + participio.'},
  {prompt:'Completa: The winners will be ___.',choices:["choose","chose","chosen"],answer:2,explanation:'Chosen es el participio de choose.'},
  {prompt:'Elige la negación correcta.',choices:["The class won’t be cancelled.","The class won’t is cancelled.","The class won’t cancelled."],answer:0,explanation:'Won’t reemplaza will not; be sigue siendo necesario.'},
  {prompt:'Convierte en pregunta: The results will be published tomorrow.',answers:['Will the results be published tomorrow?'],explanation:'Coloca will delante del sujeto y conserva be published tomorrow.'}
 ],sources:['basics','reference']
},
{
 id:'be-going-to',group:'future',title:'Be Going To Passive',spanish:'Pasiva de futuro con going to',summary:'Planes previos y predicciones sobre acciones que alguien recibirá.',activeId:'be-going-to',
 definition:['Usa esta construcción para presentar un plan ya decidido o una predicción apoyada en la situación actual, enfocando a la persona o cosa que recibirá la acción. The classroom is going to be painted indica que se prevé pintar el aula.','La cadena es am, is o are + going to + be + participio. Hay dos formas de be con tareas diferentes: la primera concuerda con el sujeto; la segunda va después de to y permanece en forma base para construir la pasiva.'],
 timeline:['Hay una intención o evidencia actual','Se anticipa una acción futura','El sujeto recibirá esa acción'],
 uses:[
  ['Planes de trabajo','Habla de una acción prevista antes de este momento.','The library is going to be renovated next month.','La biblioteca se va a renovar el próximo mes.'],
  ['Cambios decididos','Presenta medidas que ya se han organizado.','New computers are going to be installed in the lab.','Se van a instalar computadoras nuevas en el laboratorio.'],
  ['Predicción con evidencia','La situación actual permite anticipar lo que sucederá.','Look at the water level! The road is going to be flooded.','¡Mira el nivel del agua! La carretera se va a inundar.']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + going to + be + participio','The classroom is going to be painted.','El aula se va a pintar.'],
  ['Negativa','Sujeto + am / is / are + not + going to + be + participio','The classroom is not going to be painted.','El aula no se va a pintar.'],
  ['Pregunta','Am / Is / Are + sujeto + going to + be + participio?','Is the classroom going to be painted?','¿Se va a pintar el aula?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + going to + be + participio?','When is the classroom going to be painted?','¿Cuándo se va a pintar el aula?']
 ],
 agreement:[['I','am going to be invited'],['he / she / it / singular','is going to be invited'],['you / we / they / plural','are going to be invited']],
 shortAnswers:['Is the classroom going to be painted?','Yes, it is.','No, it is not. / No, it isn’t.','Responde con la primera forma de be: is en esta pregunta. Going to no funciona como auxiliar independiente.'],
 rules:[
  ['No omitas el segundo be','Is going to paint es activa: el sujeto pintará. Is going to be painted es pasiva: alguien pintará al sujeto o lo representado por él.'],
  ['Concordancia al principio','The room is going to be cleaned / The rooms are going to be cleaned. Solo cambia is o are.'],
  ['Negación y preguntas','The room isn’t going to be cleaned equivale a The room is not going to be cleaned. Para preguntar mueve is, no going.'],
  ['El plan visto desde el pasado','Was/were going to be + participio expresa algo previsto desde un momento pasado: The meeting was going to be recorded. La frase sola no confirma que el plan se cumpliera.']
 ],
 markers:[['next month','el próximo mes'],['this weekend','este fin de semana'],['according to the plan','según el plan'],['look at…','mira…: puede introducir evidencia']],
 contrast:{id:'future-simple',title:'En qué pones el énfasis al hablar del futuro',pairs:[['The chairs are going to be replaced next week.','Las sillas se van a reemplazar la próxima semana.','Plan previo.'],['The chairs will be replaced next week.','Las sillas serán reemplazadas la próxima semana.','Anuncio o compromiso.']],note:'No son categorías cerradas: en muchos anuncios ambas formas resultan naturales, con una diferencia de enfoque.'},
 mistakes:[['The room is going to cleaned.','The room is going to be cleaned.','La pasiva después de going to requiere be + participio.'],['The books is going to be donated.','The books are going to be donated.','Books es plural y necesita are al inicio de la cadena.']],
 practice:[
  {prompt:'Completa: The computers ___ going to be replaced.',choices:["is","are","be"],answer:1,explanation:'Computers es plural: are going to be replaced.'},
  {prompt:'Completa: The class is going to ___ recorded.',choices:["being","be","been"],answer:1,explanation:'Después de going to se usa be + participio para esta pasiva.'},
  {prompt:'Elige la pregunta correcta.',choices:["Going to is the class be recorded?","Does the class going to be recorded?","Is the class going to be recorded?"],answer:2,explanation:'Is es el auxiliar que va delante del sujeto.'},
  {prompt:'Escribe en negativo: The classroom is going to be painted.',answers:['The classroom is not going to be painted.','The classroom isn’t going to be painted.','The classroom’s not going to be painted.'],explanation:'Niega la primera forma de be: is not, isn’t o la contracción del sujeto con is seguida de not.'}
 ],sources:['reference','infinitive']
},
{
 id:'future-perfect',group:'future',title:'Future Perfect Passive',spanish:'Pasiva en futuro perfecto',summary:'Acciones que ya se habrán completado para un punto futuro.',activeId:'future-perfect',
 definition:['Imagina un momento futuro y mira hacia lo que ya estará realizado para entonces. By Friday, the report will have been completed indica que el informe estará terminado a más tardar el viernes. El sujeto recibe la acción de completar.','La estructura es will + have + been + participio para todos los sujetos. Will expresa la perspectiva futura, have been construye el perfecto pasivo y el participio identifica la acción recibida.'],
 timeline:['Ahora: proyectamos una meta','Se realiza la acción','Para el punto futuro: ya estará hecha'],
 uses:[
  ['Plazos','Expresa lo que ya se habrá realizado antes de una fecha límite.','The uniforms will have been delivered by Monday.','Los uniformes se habrán entregado para el lunes.'],
  ['Otro evento futuro como referencia','Relaciona una acción terminada con un acontecimiento futuro.','The room will have been cleaned by the time the guests arrive.','La habitación habrá sido limpiada para cuando lleguen los huéspedes.'],
  ['Balance acumulado','Cuenta resultados que se habrán alcanzado en un punto futuro.','By December, fifty lessons will have been recorded.','Para diciembre, se habrán grabado cincuenta clases.']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + have + been + participio','The report will have been completed by Friday.','El informe se habrá completado para el viernes.'],
  ['Negativa','Sujeto + will + not + have + been + participio','The report will not have been completed by Friday.','El informe no se habrá completado para el viernes.'],
  ['Pregunta','Will + sujeto + have + been + participio?','Will the report have been completed by Friday?','¿El informe se habrá completado para el viernes?'],
  ['Pregunta con WH','WH + will + sujeto + have + been + participio?','When will the report have been completed?','¿Para cuándo se habrá completado el informe?']
 ],
 agreement:[['Todos los sujetos','will have been invited'],['Negativa','will not have been invited / won’t have been invited']],
 shortAnswers:['Will the report have been completed by Friday?','Yes, it will.','No, it will not. / No, it won’t.','La respuesta corta repite will, aunque la cadena verbal completa contenga have y been.'],
 rules:[
  ['Have, nunca has después de will','The report will have been completed. Will exige la forma base have incluso con sujeto singular.'],
  ['By indica el límite temporal','By Friday significa a más tardar el viernes. No significa durante todo el viernes. Until Friday suele marcar hasta cuándo continúa algo.'],
  ['Conserva been','Will have completed es activa. Will have been completed es pasiva: el informe recibe la acción.'],
  ['By the time + presente','Para una referencia futura usa By the time the class starts, the files will have been uploaded. Starts tiene forma presente aunque se refiera al futuro.']
 ],
 markers:[['by Friday','para el viernes / a más tardar el viernes'],['by then','para entonces'],['by the time','para cuando'],['before the deadline','antes de la fecha límite']],
 contrast:{id:'future-simple',title:'Acción futura o resultado ya alcanzado',pairs:[['The report will be completed on Friday.','El informe se completará el viernes.','Sitúa la realización en ese día.'],['The report will have been completed by Friday.','El informe se habrá completado para el viernes.','Mira el resultado que ya estará alcanzado para entonces.']],note:'La forma perfecta relaciona la finalización con un punto futuro. No basta con añadir palabras: elige el enfoque que quieres comunicar.'},
 mistakes:[['The report will has been completed.','The report will have been completed.','Después de will se usa have para cualquier sujeto.'],['The report will have completed by Friday.','The report will have been completed by Friday.','Como el informe recibe la acción, hace falta been.']],
 practice:[
  {prompt:'Completa: The task will ___ been finished by noon.',choices:["have","had","has"],answer:0,explanation:'Will va seguido de have en forma base.'},
  {prompt:'Completa: The documents will have ___ signed by then.',choices:["been","being","be"],answer:0,explanation:'La cadena es will have been signed.'},
  {prompt:'By Friday en una fecha límite significa…',choiceLang:'es',choices:["Solo después del viernes","A más tardar el viernes","Durante todo el viernes"],answer:1,explanation:'By marca el límite para la finalización: ese día o antes.'},
  {prompt:'Escribe en negativo: The report will have been completed by Friday.',answers:['The report will not have been completed by Friday.','The report won’t have been completed by Friday.'],explanation:'Añade not después de will o usa won’t; conserva have been completed.'}
 ],sources:['reference','basics']
},
{
 id:'modal-passives',group:'advanced',title:'Modal Passives',spanish:'Pasiva con verbos modales',summary:'Posibilidad, obligación, permiso y recomendaciones.',
 definition:['Los modales permiten indicar cómo valoramos una acción: posible con can, necesaria con must, aconsejable con should o incierta con may y might. En pasiva, esa valoración se aplica a algo que el sujeto recibe: The file can be downloaded.','El patrón es modal + be + participio. Los modales centrales no llevan -s de tercera persona y van seguidos de be en forma base. Expresiones relacionadas como have to necesitan su propia conjugación: The form has to be signed.'],
 timeline:['Decide el significado del modal','Elige el receptor como sujeto','Añade modal + be + participio'],
 uses:[
  ['Posibilidad o permiso','Can permite expresar que una acción es posible o está permitida.','The lessons can be downloaded.','Las clases se pueden descargar.'],
  ['Obligación y prohibición','Must expresa una exigencia; must not indica prohibición.','The instructions must be followed.','Se deben seguir las instrucciones.'],
  ['Consejo o posibilidad incierta','Should aconseja; may y might presentan posibilidades sin asegurar el resultado.','The meeting might be postponed.','La reunión podría ser pospuesta.']
 ],
 forms:[
  ['Afirmativa','Sujeto + modal + be + participio','The form must be signed.','El formulario debe firmarse.'],
  ['Negativa','Sujeto + modal + not + be + participio','The form must not be changed.','El formulario no debe modificarse.'],
  ['Pregunta','Modal + sujeto + be + participio?','Can the form be signed online?','¿Se puede firmar el formulario en línea?'],
  ['Pregunta con WH','WH + modal + sujeto + be + participio?','Where should the form be sent?','¿A dónde debería enviarse el formulario?']
 ],
 agreement:[['Todos los sujetos con can / must / should','can be invited; must be invited; should be invited'],['Have to con singular','has to be signed'],['Have to con I / you / we / they','has cambia a have: have to be signed']],
 shortAnswers:['Can the form be signed online?','Yes, it can.','No, it cannot. / No, it can’t.','Responde con el modal de la pregunta. May y might no se usan de forma idéntica a can en todos los contextos de permiso.'],
 rules:[
  ['Be después del modal','Escribe should be checked, no should is checked. El participio conserva la misma forma con cualquier sujeto.'],
  ['Prohibición frente a falta de obligación','Must not be printed significa que imprimirlo está prohibido. Does not have to be printed indica que no hace falta imprimirlo, aunque se puede.'],
  ['Have to se comporta de otra manera','Does the form have to be signed? usa does para preguntar por have to. No apliques do a los modales centrales: Can it be signed?, no Does it can be signed?'],
  ['Pasiva con would','Would be + participio puede presentar un resultado hipotético: The trip would be cancelled if it rained. Would no cambia con el sujeto.']
 ],
 markers:[['can / could','posibilidad; depende del contexto'],['must / have to','obligación en estos ejemplos'],['should','recomendación'],['may / might','posibilidad incierta']],
 contrast:{id:'modal-perfect-passives',title:'Recomendación actual o evaluación del pasado',pairs:[['The answer should be checked.','La respuesta debería revisarse.','La revisión se recomienda ahora o para después.'],['The answer should have been checked.','La respuesta debería haberse revisado.','Se evalúa una revisión que correspondía al pasado.']],note:'Añadir have been sitúa la acción recibida antes del punto de evaluación.'},
 mistakes:[['The file can downloaded.','The file can be downloaded.','La pasiva después de can requiere be + participio.'],['Does the form can be signed?','Can the form be signed?','Can ya es auxiliar y se coloca delante del sujeto; no añadas does.']],
 practice:[
  {prompt:'Completa: The instructions must ___ followed.',choices:["are","been","be"],answer:2,explanation:'Los modales centrales van seguidos de be en forma base.'},
  {prompt:'Elige la forma que expresa que imprimir NO es obligatorio.',choices:["The file must not be printed.","The file cannot be printed.","The file does not have to be printed."],answer:2,explanation:'Does not have to expresa ausencia de obligación. Must not expresa prohibición.'},
  {prompt:'Elige la pregunta correcta.',choices:["Can the file be shared?","Can be the file shared?","Does the file can be shared?"],answer:0,explanation:'El orden es can + sujeto + be + participio.'},
  {prompt:'Pasa a pasiva y omite al agente: You must follow the rules.',answers:['The rules must be followed.'],explanation:'The rules pasa a sujeto. Conserva must y añade be followed.'}
 ],sources:['reference','infinitive']
},
{
 id:'modal-perfect-passives',group:'advanced',title:'Modal Perfect Passives',spanish:'Modales perfectos en pasiva',summary:'Deducciones, posibilidades y críticas sobre acciones anteriores.',
 definition:['Combina un modal con have been + participio para valorar una acción recibida en el pasado. The file might have been deleted plantea una posibilidad; The file must have been deleted presenta una deducción fuerte a partir de lo que sabes ahora.','No todos los modales significan lo mismo. Should have been checked suele expresar una revisión que habría sido deseable y no se realizó. Must have been checked normalmente es una deducción sobre el pasado, no una obligación pasada.'],
 timeline:['La acción pertenece al pasado','Ahora observas o evalúas lo ocurrido','Modal + have + been + participio'],
 uses:[
  ['Posibilidad pasada','May, might y could permiten plantear explicaciones posibles según el contexto.','The message might have been sent to the wrong address.','El mensaje podría haber sido enviado a la dirección equivocada.'],
  ['Deducción fuerte','Must have been expresa una conclusión sobre algo anterior.','The lock must have been changed; my key no longer works.','Deben de haber cambiado la cerradura; mi llave ya no funciona.'],
  ['Crítica o expectativa incumplida','Should have been puede señalar lo que era recomendable hacer.','The students should have been informed earlier.','Se debería haber informado antes a los estudiantes.']
 ],
 forms:[
  ['Afirmativa','Sujeto + modal + have + been + participio','The email might have been deleted.','Es posible que el correo haya sido borrado.'],
  ['Negativa','Sujeto + modal + not + have + been + participio','The email might not have been deleted.','Es posible que el correo no haya sido borrado.'],
  ['Pregunta','Modal + sujeto + have + been + participio?','Could the email have been deleted?','¿Podría haber sido borrado el correo?'],
  ['Pregunta con WH','WH + modal + sujeto + have + been + participio?','How could the email have been deleted?','¿Cómo podría haber sido borrado el correo?']
 ],
 agreement:[['Todos los sujetos','might have been invited; should have been invited'],['Have después del modal','He must have been invited; They must have been invited']],
 shortAnswers:['Could the email have been deleted?','Yes, it could have.','No, it could not have. / No, it couldn’t have.','Puedes mantener have en la respuesta corta para hacer clara la referencia al pasado. La pregunta plantea una posibilidad, no confirma que el borrado ocurriera.'],
 rules:[
  ['Nunca modal + has','Incluso con he, she o it, escribe must have been, no must has been.'],
  ['Could have no siempre confirma un hecho','The letter could have been sent plantea una posibilidad o una oportunidad, según el contexto. No demuestra por sí sola que se enviara.'],
  ['Deducción frente a obligación pasada','The form must have been signed suele ser una deducción. Para una obligación pasada usa The form had to be signed.'],
  ['Negaciones con sentidos distintos','Might not have been sent deja abierta la posibilidad de que no se enviara. Cannot/can’t have been sent expresa una conclusión de imposibilidad sobre ese envío pasado.']
 ],
 markers:[['might have been','podría haber sido / es posible que haya sido'],['must have been','debe de haber sido: deducción'],['should have been','debería haber sido'],['can’t have been','no puede haber sido: deducción negativa']],
 contrast:{id:'modal-passives',title:'Deducción sobre el pasado u obligación',pairs:[['The form must have been signed.','El formulario debe de haber sido firmado.','Deducción acerca de una acción pasada.'],['The form must be signed today.','El formulario debe firmarse hoy.','Obligación en este contexto.']],note:'El contexto y la cadena verbal determinan si must expresa una deducción o una exigencia.'},
 mistakes:[['The files should have checked.','The files should have been checked.','Los archivos reciben la revisión: necesitas been.'],['The letter might has been sent.','The letter might have been sent.','Después de might se usa have, nunca has.']],
 practice:[
  {prompt:'Completa: The room must ___ been cleaned; it looks spotless.',choices:["has","have","had"],answer:1,explanation:'Must va seguido de have. Aquí expresa una deducción basada en el aspecto de la habitación.'},
  {prompt:'Completa: The students should have ___ informed.',choices:["be","been","being"],answer:1,explanation:'La pasiva perfecta con should es should have been informed.'},
  {prompt:'The file might have been deleted significa…',choiceLang:'es',choices:["Hay obligación de borrarlo mañana","Sabemos con certeza que se borró","Es posible que se haya borrado"],answer:2,explanation:'Might have been presenta una posibilidad sobre una acción pasada.'},
  {prompt:'Pasa a pasiva y omite al agente: They should have checked the files.',answers:['The files should have been checked.'],explanation:'The files pasa a sujeto y should have checked se transforma en should have been checked.'}
 ],sources:['reference','infinitive']
},
{
 id:'get-passive',group:'advanced',title:'Get Passive',spanish:'La pasiva con get',summary:'Sucesos y cambios que afectan al sujeto, especialmente al conversar.',
 definition:['Además de be, algunos contextos permiten get + participio para destacar que algo le ocurre al sujeto: My phone got damaged. Esta construcción es común en conversación y suele enfocar el suceso o a la persona afectada.','Get puede usarse con sucesos negativos, como got hurt, o positivos, como got promoted. No reemplaza a be en cualquier pasiva. Para describir un hecho estable, The island is surrounded by water resulta natural; gets surrounded sugeriría un evento o cambio.'],
 timeline:['El sujeto está en una situación','Ocurre algo que lo afecta','Get + participio destaca el suceso'],
 uses:[
  ['Percances','Cuenta sucesos que afectan a una persona u objeto.','My headphones got damaged in my bag.','Mis audífonos se dañaron dentro de mi mochila.'],
  ['Noticias positivas','Expresa cambios favorables recibidos por alguien.','Ana got promoted last month.','A Ana la ascendieron el mes pasado.'],
  ['Eventos repetidos','Describe lo que suele pasarle a alguien.','He often gets interrupted during class.','A menudo lo interrumpen durante la clase.']
 ],
 forms:[
  ['Afirmativa','Sujeto + get / gets / got + participio','Luis got invited to the event.','Luis recibió una invitación al evento.'],
  ['Negativa','Sujeto + do / does / did + not + get + participio','Luis did not get invited to the event.','Luis no recibió una invitación al evento.'],
  ['Pregunta','Do / Does / Did + sujeto + get + participio?','Did Luis get invited to the event?','¿Luis recibió una invitación al evento?'],
  ['Pregunta con WH','WH + do / does / did + sujeto + get + participio?','When did Luis get invited to the event?','¿Cuándo recibió Luis una invitación al evento?']
 ],
 agreement:[['I / you / we / they en presente','get invited'],['he / she / it en presente','gets invited'],['Todos en pasado simple','got invited'],['Después de do / does / did','get invited']],
 shortAnswers:['Did Luis get invited?','Yes, he did.','No, he did not. / No, he didn’t.','Aquí se usa did porque get funciona como verbo léxico. Es diferente de Was Luis invited? → Yes, he was.'],
 rules:[
  ['Get usa do en el presente y pasado simples','Does he get invited? / He didn’t get invited. Con el auxiliar did, got vuelve a get.'],
  ['La forma del verbo principal','Usa got chosen, no got chose. Después de get necesitas el participio.'],
  ['Registro y significado','En informes formales suele preferirse be. Get destaca el evento y puede hacer más visible cómo afecta al sujeto, pero no implica necesariamente que este sea responsable.'],
  ['Distingue la construcción causativa','My phone got repaired enfoca lo que le pasó al teléfono. I got my phone repaired indica que conseguí o encargué su reparación: get + objeto + participio es otra construcción.'],
  ['No todo get + adjetivo es pasiva','Get tired puede describir el cambio a estar cansado. Para reconocer la pasiva, examina si el sujeto recibe una acción y no solo el aspecto de la palabra.']
 ],
 markers:[['get invited','recibir una invitación'],['get promoted','ser ascendido'],['get damaged','resultar dañado'],['get interrupted','ser interrumpido']],
 contrast:{id:'past-simple',title:'Be y get para contar un suceso',pairs:[['Ana was promoted last month.','Ana fue ascendida el mes pasado.','Be: presenta el hecho de forma neutral.'],['Ana got promoted last month.','A Ana la ascendieron el mes pasado.','Get: tono conversacional y foco en el cambio que le ocurrió.']],note:'Ambas son naturales aquí. Get no puede sustituir automáticamente a be en todos sus usos pasivos.'},
 mistakes:[['Did Luis got invited?','Did Luis get invited?','Did ya marca el pasado; usa get en forma base.'],['Ana got promote last month.','Ana got promoted last month.','La pasiva con get requiere el participio promoted.']],
 practice:[
  {prompt:'Completa: Luis ___ invited to the event yesterday.',choices:["got","gets","get"],answer:0,explanation:'Yesterday indica pasado simple: got invited.'},
  {prompt:'Elige la pregunta correcta.',choices:["Did she get promoted?","Did she got promoted?","Was she get promoted?"],answer:0,explanation:'Después de did, get vuelve a la forma base.'},
  {prompt:'¿Get passive se usa solo para sucesos negativos?',choiceLang:'es',choices:["Sí, siempre","No; got promoted puede ser una noticia positiva","Solo con objetos"],answer:1,explanation:'Get passive también puede describir cambios favorables.'},
  {prompt:'Escribe en negativo usando get: Luis got invited.',answers:['Luis did not get invited.','Luis didn’t get invited.'],explanation:'Usa did not get o didn’t get; no conserves got después de did.'}
 ],sources:['get','reference']
},
{
 id:'passive-infinitives-gerunds',group:'advanced',title:'Passive Infinitives & Gerunds',spanish:'Infinitivos y formas -ing en pasiva',summary:'To be invited y being invited dentro de otras construcciones.',
 definition:['La pasiva también aparece en formas no personales del verbo, dentro de una oración más amplia. El infinitivo pasivo se forma con to be + participio: She hopes to be chosen. La forma -ing pasiva se forma con being + participio: She enjoys being included.','Estas formas no expresan por sí solas todo el tiempo de la oración. En She wanted to be invited, wanted sitúa el deseo en el pasado y to be invited expresa la acción que ella deseaba recibir. El verbo o la preposición anterior determina qué patrón necesitas.'],
 timeline:['Identifica la palabra que introduce el verbo','Elige to be o being según el patrón','Añade el participio de la acción recibida'],
 uses:[
  ['Después de verbos con infinitivo','Want y hope pueden ir seguidos de to be + participio.','She hopes to be selected for the team.','Ella espera ser seleccionada para el equipo.'],
  ['Después de verbos con -ing','Enjoy, avoid y otros verbos requieren patrones con -ing.','He avoids being photographed.','Él evita que lo fotografíen.'],
  ['Después de una preposición','Tras una preposición, una acción suele expresarse con una forma -ing.','She left without being noticed.','Ella se fue sin que nadie la notara.']
 ],
 forms:[
  ['Afirmativa','Sujeto + verbo compatible + to be + participio','She wants to be invited.','Ella quiere que la inviten.'],
  ['Negativa','Sujeto + do / does + not + want + to be + participio','She does not want to be invited.','Ella no quiere que la inviten.'],
  ['Pregunta','Do / Does + sujeto + want + to be + participio?','Does she want to be invited?','¿Ella quiere que la inviten?'],
  ['Pregunta con WH','WH + do / does + sujeto + want + to be + participio?','Why does she want to be invited?','¿Por qué quiere que la inviten?']
 ],
 agreementTitle:'El patrón depende de la palabra anterior',
 agreement:[['Infinitivo después de want / hope','to be invited'],['Forma -ing después de enjoy / avoid','being invited'],['Preposición + forma -ing','without being seen; after being invited'],['Infinitivo perfecto pasivo','to have been invited']],
 shortAnswers:['Does she want to be invited?','Yes, she does.','No, she does not. / No, she doesn’t.','La pregunta se construye alrededor de wants, el verbo principal conjugado. To be invited permanece como complemento.'],
 rules:[
  ['To be y being no se eligen libremente','Practica el patrón de la palabra anterior: wants to be invited; enjoys being invited. No escribas enjoys to be invited.'],
  ['Being no siempre implica un tiempo continuo','En Being invited made her happy, being invited funciona como sujeto. En She is being invited, is being invited es una forma verbal continua pasiva.'],
  ['Negar el infinitivo','Not puede preceder al infinitivo o a la forma -ing: She hopes not to be interrupted. Compara el alcance de la negación con She does not hope to be interrupted.'],
  ['Anterioridad con formas perfectas','She was pleased to have been chosen presenta la selección como anterior a su satisfacción. Having been invited, she made travel plans presenta una invitación anterior a sus planes.'],
  ['Después de modales','Can be invited usa un infinitivo sin to. No escribas can to be invited. La lección de modales desarrolla ese patrón.']
 ],
 markers:[['hope to be chosen','esperar ser elegido'],['enjoy being included','disfrutar de que te incluyan'],['without being seen','sin ser visto'],['to have been selected','haber sido seleccionado']],
 contrast:{id:'modal-passives',title:'Quién actúa en el infinitivo',pairs:[['She wants to invite Luis.','Ella quiere invitar a Luis.','To invite es activo: ella quiere realizar la invitación.'],['She wants to be invited by Luis.','Ella quiere que Luis la invite.','To be invited es pasivo: ella quiere recibir la invitación.']],note:'El verbo conjugado wants se mantiene. La voz del infinitivo cambia quién realiza y quién recibe la acción de invitar.'},
 mistakes:[['She wants to invited.','She wants to be invited.','El infinitivo pasivo necesita to be + participio.'],['He left without be noticed.','He left without being noticed.','Después de without, usa la forma -ing pasiva being noticed.']],
 practice:[
  {prompt:'Completa: Ana hopes ___ chosen for the team.',choices:["be","being","to be"],answer:2,explanation:'Hope admite un infinitivo con to: hopes to be chosen.'},
  {prompt:'Completa: He left without ___ seen.',choices:["to be","be","being"],answer:2,explanation:'Tras la preposición without se usa being + participio.'},
  {prompt:'Elige la construcción correcta después de enjoys.',choices:["She enjoys being included.","She enjoys be included.","She enjoys to be included."],answer:0,explanation:'Enjoy va seguido de una forma -ing; su forma pasiva es being included.'},
  {prompt:'Corrige añadiendo la palabra que falta: She wants to invited.',answers:['She wants to be invited.'],explanation:'Añade be entre to e invited para formar el infinitivo pasivo.'}
 ],sources:['infinitive','reference']
},
{
 id:'reporting-passives',group:'advanced',title:'Reporting Passives',spanish:'Pasivas para comunicar creencias e informes',summary:'It is said that… y He is believed to…',
 definition:['Estas construcciones presentan lo que se dice, cree o informa sobre algo sin empezar por la persona que comunica la información. People believe that he lives here puede reformularse como It is believed that he lives here o He is believed to live here.','En It is believed that…, it ocupa la posición de sujeto gramatical y la información aparece en la oración con that. En He is believed to…, la persona de la que hablamos pasa al principio y se añade un infinitivo. Se usan en noticias y escritura formal, pero no prueban que la información sea verdadera.'],
 timeline:['Alguien comunica una idea','Elige it + that o sujeto + infinitivo','Ajusta el infinitivo a la relación temporal'],
 uses:[
  ['Informar de una creencia','Permite centrar el mensaje en la información comunicada.','It is believed that the painting is very old.','Se cree que la pintura es muy antigua.'],
  ['Destacar a la persona o cosa','Empieza por aquello sobre lo que se informa.','The author is said to live near the coast.','Se dice que el autor vive cerca de la costa.'],
  ['Referirse a un hecho anterior','El infinitivo perfecto marca una acción anterior al momento del informe.','The artist is believed to have left the city.','Se cree que el artista ha abandonado la ciudad.']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + participio de reporte + to + verbo','He is believed to live here.','Se cree que él vive aquí.'],
  ['Negativa','Sujeto + am / is / are + not + participio de reporte + to + verbo','He is not believed to live here.','No se cree que él viva aquí.'],
  ['Pregunta','Am / Is / Are + sujeto + participio de reporte + to + verbo?','Is he believed to live here?','¿Se cree que él vive aquí?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + participio de reporte + to + verbo?','Where is he believed to live?','¿Dónde se cree que vive?']
 ],
 agreementTitle:'Dos estructuras y su concordancia',
 agreement:[['Impersonal: sujeto it','It is said that… / It was believed that…'],['Personal: singular','She is believed to…'],['Personal: plural','They are believed to…'],['Acción anterior al informe','is believed to have left']],
 shortAnswers:['Is he believed to live here?','Yes, he is.','No, he is not. / No, he isn’t.','La respuesta confirma o niega que exista esa creencia; no confirma por sí sola dónde vive realmente.'],
 rules:[
  ['Patrones según el verbo','Say, believe, think y report admiten estos patrones en usos habituales. No los extiendas automáticamente a cualquier verbo: cada verbo puede exigir complementos distintos.'],
  ['Infinitivo simple y perfecto','He is believed to live here presenta una situación simultánea a la creencia actual. He is believed to have lived here presenta una residencia anterior.'],
  ['El tiempo del informe también cambia','He was believed to live here sitúa la creencia en el pasado. He was believed to have left indica que la salida era anterior a esa creencia pasada.'],
  ['Dos capas de voz','En The painting is believed to have been stolen, is believed es la pasiva del reporte y to have been stolen es un infinitivo perfecto pasivo: la pintura recibió la acción de robar.'],
  ['La negación puede cambiar de alcance','It is not believed that he lives here niega la creencia; It is believed that he does not live here comunica una creencia negativa sobre su residencia. No borres esa diferencia.']
 ],
 markers:[['it is said that','se dice que'],['is believed to','se cree que'],['is reported to','se informa que'],['to have + participio','anterioridad respecto al informe']],
 contrast:{id:'passive-infinitives-gerunds',title:'El mismo informe con dos puntos de partida',pairs:[['It is believed that the artist left the city.','Se cree que el artista abandonó la ciudad.','Estructura impersonal con that.'],['The artist is believed to have left the city.','Se cree que el artista abandonó la ciudad.','Estructura personal; to have left conserva la anterioridad.']],note:'No uses to leave si necesitas mantener el significado de una salida anterior al informe actual.'},
 mistakes:[['He is said live here.','He is said to live here.','La estructura personal con is said requiere un infinitivo con to.'],['It is believed he to live here.','It is believed that he lives here.','Con el sujeto it, usa una oración con verbo conjugado; no mezcles he to live con la estructura impersonal.']],
 practice:[
  {prompt:'Completa: It is believed ___ the bridge is safe.',choices:["to","that","being"],answer:1,explanation:'En el patrón impersonal, that introduce una oración completa.'},
  {prompt:'People believe that she left earlier. Elige la transformación que conserva el pasado.',choices:["She is believed leaving earlier.","She is believed to have left earlier.","She is believed to leave earlier."],answer:1,explanation:'To have left indica que la salida es anterior a la creencia actual.'},
  {prompt:'En The painting is believed to have been stolen, la pintura…',choiceLang:'es',choices:["Será robada necesariamente mañana","Realizó un robo","Recibió la acción de robar"],answer:2,explanation:'To have been stolen es un infinitivo perfecto pasivo: se cree que alguien la robó.'},
  {prompt:'Empieza por He y conserva el significado: People believe that he lives here.',answers:['He is believed to live here.'],explanation:'He pasa al inicio; is believed va seguido de to live para la situación simultánea a la creencia.'}
 ],sources:['reference','infinitive']
},
];
const data={sources,lessons};
root.ENGLISH_PASSIVE=data;
if(typeof module!=='undefined'&&module.exports)module.exports=data;
})(globalThis);
