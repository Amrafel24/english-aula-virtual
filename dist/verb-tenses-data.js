'use strict';
// Original teaching material for English. Reference links accompany the lessons.
(function(root){
const sources={
  phrases:{title:'British Council · Verb phrases',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/verb-phrases'},
  present:{title:'British Council · Present tense',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-tense'},
  past:{title:'British Council · Past tense',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/past-tense'},
  perfect:{title:'British Council · Present perfect simple and continuous',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous'},
  pastPerfect:{title:'British Council · Past perfect',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect'},
  future:{title:'British Council · Talking about the future',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-future'},
  futurePerfect:{title:'British Council · Future continuous and future perfect',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-continuous-future-perfect'},
  futureForms:{title:'British Council · Will, be going to and present continuous',url:'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous'}
};
const lessons=[
{
 id:'present-simple',group:'present',title:'Present Simple',spanish:'Presente simple',summary:'Rutinas, hechos generales y estados.',
 definition:['Presenta una situación como habitual, general o estable: lo que haces normalmente, lo que sabes o lo que es cierto. No significa necesariamente que una acción esté ocurriendo justo ahora.','La forma afirmativa cambia con he, she e it. En preguntas y negaciones de la mayoría de los verbos usamos do o does; el verbo be tiene sus propias formas: am, is y are.'],
 timeline:['Antes: se repite','Ahora: sigue siendo habitual','Después: puede repetirse'],
 uses:[
  ['Hábitos y rutinas','Describe acciones repetidas, aunque no estén sucediendo al hablar.','I practice English after dinner.','Practico inglés después de cenar.'],
  ['Hechos y estados','Expresa conocimientos, gustos y situaciones que consideramos estables.','My sister likes adventure movies.','A mi hermana le gustan las películas de aventuras.'],
  ['Horarios establecidos','Se usa también para horarios de transporte, clases y otros programas.','The English class starts at six tomorrow.','La clase de inglés empieza mañana a las seis.']
 ],
 forms:[
  ['Afirmativa','Sujeto + verbo base / verbo con -s o -es','Luis watches anime on Fridays.','Luis ve anime los viernes.'],
  ['Negativa','Sujeto + do not / does not + verbo base','Luis does not watch TV at work.','Luis no ve televisión en el trabajo.'],
  ['Pregunta','Do / Does + sujeto + verbo base?','Does Luis watch anime?','¿Luis ve anime?'],
  ['Pregunta con WH','WH + do / does + sujeto + verbo base?','When does Luis watch anime?','¿Cuándo ve anime Luis?']
 ],
 agreement:[['I / you / we / they','work · do not work'],['he / she / it','works · does not work']],
 shortAnswers:['Does she study English?','Yes, she does.','No, she does not. / No, she doesn’t.','Repite do o does en la respuesta corta. Con be: Is she ready? Yes, she is. / No, she isn’t.'],
 rules:[
  ['Tercera persona','Normalmente añade -s: read → reads. Tras -s, -sh, -ch, -x y en formas como go y do se usa -es: watch → watches; go → goes. Con consonante + y: study → studies; con vocal + y: play → plays. Have cambia a has.'],
  ['El auxiliar lleva la marca','Does ya indica tercera persona: Does he play? y He doesn’t play. No añadas otra -s al verbo principal. Don’t = do not; doesn’t = does not.'],
  ['El caso de be','I am; you/we/they are; he/she/it is. Niega con not y cambia el orden para preguntar: She is not tired. / Is she tired? No uses do con be en estas preguntas.'],
  ['Adverbios de frecuencia','Usually y often suelen ir antes del verbo principal: I usually read. Con be van después: I am usually busy. En preguntas de sujeto no necesitas do: Who lives here?']
 ],
 markers:[['every day','cada día'],['usually / often','normalmente / a menudo'],['sometimes / never','a veces / nunca'],['on Mondays','los lunes']],
 contrast:{id:'present-continuous',title:'Present Simple o Present Continuous',pairs:[['I read after lunch.','Leo después del almuerzo.','Hábito.'],['I am reading now.','Estoy leyendo ahora.','Acción en curso.']],note:'Decide si presentas una costumbre o una actividad que está desarrollándose. La palabra now ayuda, pero lo decisivo es el significado.'},
 mistakes:[['She work at home.','She works at home.','He, she e it necesitan la terminación de tercera persona en afirmativa.'],['Does he likes music?','Does he like music?','Después de does, usa la forma base.']],
 practice:[
  {prompt:'Completa la rutina: Ana ___ English every morning.',choices:['study','studies','studying'],answer:1,explanation:'Ana equivale a she. Study termina en consonante + y: studies.'},
  {prompt:'Elige la negación correcta.',choices:['He doesn’t likes coffee.','He not like coffee.','He doesn’t like coffee.'],answer:2,explanation:'Doesn’t va seguido de la forma base like.'},
  {prompt:'Completa la pregunta: ___ your friends play football?',choices:['Does','Do','Are'],answer:1,explanation:'Your friends equivale a they. Usa do + sujeto + play.'},
  {prompt:'Escribe en negativo: She works on Sundays.',answers:['She does not work on Sundays.','She doesn’t work on Sundays.'],explanation:'Cambia works por does not work o doesn’t work.'}
 ],sources:['present','phrases']
},
{
 id:'present-continuous',group:'present',title:'Present Continuous',spanish:'Presente continuo',summary:'Acciones en curso, situaciones temporales y planes acordados.',
 definition:['Describe una actividad que está desarrollándose ahora o alrededor del momento actual. Puede durar segundos o varias semanas: lo importante es verla como un proceso temporal.','Se construye con am, is o are y la forma -ing. También permite hablar de planes futuros ya organizados cuando el contexto deja clara la fecha.'],
 timeline:['La actividad empieza','Ahora: está en curso','Su final no se especifica'],
 uses:[
  ['En este momento','Cuenta lo que está pasando mientras hablas.','The students are listening to the teacher.','Los estudiantes están escuchando al profesor.'],
  ['Situación temporal o cambio','No tiene que ocurrir en el segundo exacto en que hablas.','I am taking an English course this month.','Estoy haciendo un curso de inglés este mes.'],
  ['Plan organizado','Una fecha futura y un acuerdo permiten interpretar la acción como un plan.','We are meeting our teacher tomorrow.','Nos reuniremos con nuestro profesor mañana.']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + verbo-ing','She is reading a comic.','Ella está leyendo un cómic.'],
  ['Negativa','Sujeto + am / is / are + not + verbo-ing','She is not reading the news.','Ella no está leyendo las noticias.'],
  ['Pregunta','Am / Is / Are + sujeto + verbo-ing?','Is she reading a comic?','¿Está leyendo un cómic?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + verbo-ing?','What is she reading?','¿Qué está leyendo?']
 ],
 agreement:[['I','am studying'],['he / she / it','is studying'],['you / we / they','are studying']],
 shortAnswers:['Are they studying?','Yes, they are.','No, they are not. / No, they aren’t.','Contesta con be. En afirmativa corta no termines con una contracción: Yes, I am; no Yes, I’m.'],
 rules:[
  ['Formar -ing','Añade -ing: read → reading. Normalmente elimina la -e final muda: make → making. Cambia -ie por -y: lie → lying. Conserva -ee: see → seeing.'],
  ['Duplicar consonantes','En verbos cortos con vocal breve y consonante final suele duplicarse: run → running; sit → sitting. Con varias sílabas depende del acento: begin → beginning. No dupliques w, x o y: play → playing.'],
  ['No omitas be','I studying no es una oración completa en este tiempo. Usa I am studying. I’m, she’s y they’re son contracciones de be en esta estructura.'],
  ['Verbos de estado','Know, believe y own normalmente no van en continuo con su significado de estado. I know the answer. Algunos cambian según el sentido: I think significa opino; I am thinking significa estoy reflexionando.']
 ],
 markers:[['now / right now','ahora / justo ahora'],['at the moment','en este momento'],['this week','esta semana, si es temporal'],['tomorrow','mañana, con un plan acordado']],
 contrast:{id:'present-simple',title:'Temporal o habitual',pairs:[['He works in Santiago.','Trabaja en Santiago.','Presenta su situación habitual.'],['He is working in Santiago this week.','Está trabajando en Santiago esta semana.','Presenta una situación temporal.']],note:'El continuo destaca el proceso o la temporalidad; el simple presenta la situación de manera general.'},
 mistakes:[['They playing outside.','They are playing outside.','La estructura necesita are antes del verbo-ing.'],['I am knowing the answer.','I know the answer.','Know, con el sentido de saber, normalmente se usa en forma simple.']],
 practice:[
  {prompt:'Completa: Listen! The children ___ singing.',choices:['is','are','be'],answer:1,explanation:'The children equivale a they: are singing.'},
  {prompt:'Elige la forma -ing de run.',choices:['runing','run','running'],answer:2,explanation:'Run duplica la n antes de añadir -ing.'},
  {prompt:'Para expresar conocimiento, elige la forma habitual.',choices:['I am knowing her name.','I know her name.','I knowing her name.'],answer:1,explanation:'Know expresa un estado y normalmente se usa en simple.'},
  {prompt:'Convierte en pregunta: She is studying.',answers:['Is she studying?'],explanation:'Pon is antes del sujeto: Is she studying?'}
 ],sources:['present','futureForms']
},
{
 id:'present-perfect',group:'present',title:'Present Perfect',spanish:'Presente perfecto',summary:'Experiencias, resultados actuales y situaciones que llegan hasta ahora.',
 definition:['Relaciona algo anterior con el presente: una experiencia de tu vida, un resultado relevante ahora o una situación que empezó antes y continúa. Su punto de referencia es el momento actual.','Se forma con have o has + participio. No siempre describe algo terminado: I have known Luis for years expresa un estado que todavía continúa. En español puede traducirse con he hecho, hice o llevo, según el contexto y la variedad.'],
 timeline:['Algo empieza o sucede antes','Llega al presente','Ahora: conexión o resultado'],
 uses:[
  ['Experiencia hasta ahora','Importa que ocurrió, sin situarla en un momento pasado terminado.','I have watched that series twice.','He visto esa serie dos veces.'],
  ['Resultado actual','El hecho pasado explica la situación presente.','I have lost my classroom code.','He perdido el código de mi aula.'],
  ['Situación que continúa','Con verbos de estado, expresa duración hasta ahora.','She has known Luis since school.','Ella conoce a Luis desde la escuela.']
 ],
 forms:[
  ['Afirmativa','Sujeto + have / has + participio','She has finished the exercise.','Ella ha terminado el ejercicio.'],
  ['Negativa','Sujeto + have / has + not + participio','She has not finished the exercise yet.','Ella todavía no ha terminado el ejercicio.'],
  ['Pregunta','Have / Has + sujeto + participio?','Has she finished the exercise?','¿Ha terminado el ejercicio?'],
  ['Pregunta con WH','WH + have / has + sujeto + participio?','How many exercises has she finished?','¿Cuántos ejercicios ha terminado?']
 ],
 agreement:[['I / you / we / they','have finished'],['he / she / it','has finished']],
 shortAnswers:['Have you seen this movie?','Yes, I have.','No, I have not. / No, I haven’t.','Usa have o has como auxiliar. No respondas Yes, I do a una pregunta con Have you…?'],
 rules:[
  ['Participio, no pasado simple','En regulares suelen coincidir: worked / worked. En irregulares pueden diferir: see → saw → seen; go → went → gone; write → wrote → written. Consulta Verbos para repasar.'],
  ['For y since','For indica duración: for three years. Since indica el punto de inicio: since 2023, since Monday. Si la situación sigue ahora, no traduzcas literalmente llevo tres años con un presente simple inglés.'],
  ['Tiempo terminado','Para ubicar una acción en yesterday, last year o in 2020, normalmente usa pasado simple. Today y this week pueden acompañar al perfecto si ves el período como todavía abierto.'],
  ['Already, yet, ever y never','Already suele ir entre have y el participio; yet, al final de preguntas o negaciones. Ever pregunta por experiencias; never ya niega. Been to suele indicar visita y regreso; gone to suele indicar que alguien todavía está fuera.']
 ],
 markers:[['already / just','ya / acabar de'],['yet','ya en preguntas; todavía en negativas'],['ever / never','alguna vez / nunca'],['for / since','duración / punto de inicio']],
 contrast:{id:'past-simple',title:'Conexión presente o momento pasado terminado',pairs:[['I have visited Puerto Plata.','He visitado Puerto Plata.','Experiencia de mi vida hasta ahora.'],['I visited Puerto Plata last year.','Visité Puerto Plata el año pasado.','Sitúo la visita en un período terminado.']],note:'Para continuar el relato y decir cuándo ocurrió una experiencia, normalmente cambias al pasado simple.'},
 mistakes:[['She has went home.','She has gone home.','Después de has necesitas gone, el participio de go.'],['I have seen him yesterday.','I saw him yesterday.','Yesterday sitúa el encuentro en un día pasado terminado.']],
 practice:[
  {prompt:'Completa: He has ___ three books this month.',choices:['wrote','written','write'],answer:1,explanation:'El participio de write es written.'},
  {prompt:'Completa: I have lived here ___ 2021.',choices:['for','since','ago'],answer:1,explanation:'2021 es el punto de inicio: since 2021.'},
  {prompt:'Elige la oración que sitúa correctamente una acción ayer.',choices:['I have visited her yesterday.','I visit her yesterday.','I visited her yesterday.'],answer:2,explanation:'Con yesterday para una acción terminada usamos pasado simple.'},
  {prompt:'Escribe en negativo: She has finished.',answers:['She has not finished.','She hasn’t finished.'],explanation:'Añade not después de has, o usa hasn’t; conserva finished.'}
 ],sources:['present','perfect']
},
{
 id:'present-perfect-continuous',group:'present',title:'Present Perfect Continuous',spanish:'Presente perfecto continuo',summary:'Duración de una actividad hasta ahora o huellas de una actividad reciente.',
 definition:['Enfoca el proceso de una actividad que empezó antes y llega hasta ahora, o que acaba de terminar y deja una consecuencia visible. Combina conexión con el presente y atención a la duración o al esfuerzo.','Se forma con have/has + been + verbo-ing. No garantiza que la actividad siga ocurriendo en este segundo: alguien puede decir I have been running justo después de detenerse.'],
 timeline:['La actividad empieza antes','Se desarrolla durante un tiempo','Ahora: continúa o deja una huella'],
 uses:[
  ['Duración hasta ahora','Destaca cuánto tiempo llevas haciendo algo.','I have been practicing English for an hour.','Llevo una hora practicando inglés.'],
  ['Evidencia reciente','Una actividad reciente explica lo que ves o sientes.','Her hands are dirty because she has been gardening.','Tiene las manos sucias porque ha estado trabajando en el jardín.'],
  ['Actividad repetida o temporal','Describe una práctica reciente dentro de una etapa.','We have been watching documentaries lately.','Últimamente hemos estado viendo documentales.']
 ],
 forms:[
  ['Afirmativa','Sujeto + have / has + been + verbo-ing','Luis has been studying all afternoon.','Luis ha estado estudiando toda la tarde.'],
  ['Negativa','Sujeto + have / has + not + been + verbo-ing','Luis has not been sleeping well.','Luis no ha estado durmiendo bien.'],
  ['Pregunta','Have / Has + sujeto + been + verbo-ing?','Has Luis been studying?','¿Ha estado estudiando Luis?'],
  ['Pregunta con WH','WH + have / has + sujeto + been + verbo-ing?','How long has Luis been studying?','¿Cuánto tiempo lleva estudiando Luis?']
 ],
 agreement:[['I / you / we / they','have been working'],['he / she / it','has been working']],
 shortAnswers:['Have they been practicing?','Yes, they have.','No, they have not. / No, they haven’t.','La respuesta corta conserva el primer auxiliar: have o has.'],
 rules:[
  ['Conserva las tres piezas','Have/has aporta la conexión presente; been es el participio de be; -ing señala la actividad. Has been study y has studying no forman este tiempo.'],
  ['Duración y cantidad','Para destacar una actividad durante dos horas, suele encajar el continuo. Para contar tres capítulos terminados, normalmente se elige el perfecto simple. No es una prohibición absoluta: decide qué quieres destacar.'],
  ['Estados','Con know, own o believe en sentido de estado se prefiere el perfecto simple: I have known her for years. El continuo es natural con actividades como study, wait y practice.'],
  ['For, since y lately','For expresa cuánto tiempo; since, desde cuándo. Lately y recently pueden presentar actividad repetida. No uses ago para expresar una duración que llega hasta ahora.']
 ],
 markers:[['for two hours','durante dos horas / llevo dos horas'],['since Monday','desde el lunes'],['all morning','toda la mañana'],['lately / recently','últimamente / recientemente']],
 contrast:{id:'present-perfect',title:'Actividad o resultado contado',pairs:[['I have been reading for two hours.','Llevo dos horas leyendo.','Destaco el proceso y la duración.'],['I have read two chapters.','He leído dos capítulos.','Destaco una cantidad completada.']],note:'Ambas formas conectan con el presente. La diferencia principal es la perspectiva sobre la actividad.'},
 mistakes:[['She has been study.','She has been studying.','Después de been, este continuo necesita studying.'],['I have been knowing him for years.','I have known him for years.','Know, como estado, normalmente usa perfecto simple.']],
 practice:[
  {prompt:'Completa: They have ___ waiting since noon.',choices:['be','been','being'],answer:1,explanation:'La estructura es have been + verbo-ing.'},
  {prompt:'¿Cuál destaca cuánto tiempo lleva la actividad?',choices:['She has written four emails.','She wrote yesterday.','She has been writing for an hour.'],answer:2,explanation:'Has been writing for an hour enfoca el proceso y su duración.'},
  {prompt:'Completa: He ___ been working all morning.',choices:['have','has','is'],answer:1,explanation:'Con he se usa has been working.'},
  {prompt:'Convierte en pregunta: They have been studying.',answers:['Have they been studying?'],explanation:'Coloca have antes de they y conserva been studying.'}
 ],sources:['perfect','phrases']
},
{
 id:'past-simple',group:'past',title:'Past Simple',spanish:'Pasado simple',summary:'Acciones y situaciones situadas en un pasado terminado.',
 definition:['Presenta una acción, un estado o una costumbre dentro de un período pasado que ves como terminado. El momento puede decirse directamente o entenderse por el contexto de la conversación.','Los verbos regulares suelen terminar en -ed; los irregulares tienen formas propias. En preguntas y negaciones con did, el verbo principal vuelve a su forma base. Be se comporta de forma diferente: was y were.'],
 timeline:['Antes: ocurrió la situación','El período termina','Ahora: la contamos'],
 uses:[
  ['Acción terminada','Ubica una acción en un momento pasado concreto.','We visited the museum on Saturday.','Visitamos el museo el sábado.'],
  ['Secuencia de hechos','Cuenta los acontecimientos de una historia en orden.','She opened the app and completed the lesson.','Abrió la aplicación y completó la lección.'],
  ['Estado o hábito pasado','Describe cómo era una etapa que ya terminó.','I played football every afternoon when I was ten.','Jugaba al fútbol todas las tardes cuando tenía diez años.']
 ],
 forms:[
  ['Afirmativa','Sujeto + verbo en pasado','Ana watched a movie yesterday.','Ana vio una película ayer.'],
  ['Negativa','Sujeto + did not + verbo base','Ana did not watch the final episode.','Ana no vio el episodio final.'],
  ['Pregunta','Did + sujeto + verbo base?','Did Ana watch the movie?','¿Ana vio la película?'],
  ['Pregunta con WH','WH + did + sujeto + verbo base?','What did Ana watch yesterday?','¿Qué vio Ana ayer?']
 ],
 agreement:[['Todos los sujetos, salvo be','worked / went · did not work / go'],['I / he / she / it, con be','was · was not'],['you / we / they, con be','were · were not']],
 shortAnswers:['Did you finish the lesson?','Yes, I did.','No, I did not. / No, I didn’t.','Con be responde con was/were: Were you tired? Yes, I was.'],
 rules:[
  ['Escritura de -ed','Añade -ed: watch → watched. Si termina en -e, añade -d: live → lived. Con consonante + y: study → studied. Algunos verbos duplican consonante: stop → stopped; en palabras largas influye el acento: prefer → preferred.'],
  ['Pronunciación de -ed','Según el sonido final del verbo, -ed se pronuncia /t/ (worked), /d/ (played) o /ɪd/ (wanted, needed). No añadas una sílaba extra a todos los verbos.'],
  ['Irregulares y did','Go → went, see → saw, buy → bought. Pero pregunta Did she go? y niega She didn’t go. Did ya marca el pasado.'],
  ['Be y preguntas de sujeto','I was ready. / I wasn’t ready. / Was I ready? No uses did con be en estas formas. Who called you? pregunta por el sujeto y normalmente no lleva did.']
 ],
 markers:[['yesterday','ayer'],['last week','la semana pasada'],['two days ago','hace dos días'],['in 2020','en 2020, un período terminado']],
 contrast:{id:'past-continuous',title:'Hecho completo o actividad en curso',pairs:[['I cooked dinner at seven.','Preparé la cena a las siete.','Presento la acción como un hecho.'],['I was cooking dinner at seven.','Estaba preparando la cena a las siete.','A esa hora la actividad estaba en curso.']],note:'Simple no significa necesariamente breve. Una acción de muchos años también puede presentarse como un período terminado.'},
 mistakes:[['Did you went to class?','Did you go to class?','Después de did se usa go, no went.'],['They was tired.','They were tired.','Con they, la forma pasada de be es were.']],
 practice:[
  {prompt:'Completa: Last night, we ___ a new movie.',choices:['see','seen','saw'],answer:2,explanation:'El pasado simple irregular de see es saw.'},
  {prompt:'Elige la pregunta correcta.',choices:['Did he worked?','Did he work?','Does he worked?'],answer:1,explanation:'Usa did + sujeto + verbo base.'},
  {prompt:'Completa: They ___ at school yesterday.',choices:['was','were','be'],answer:1,explanation:'Con they, be cambia a were en pasado.'},
  {prompt:'Escribe en negativo: She watched the movie.',answers:['She did not watch the movie.','She didn’t watch the movie.'],explanation:'Usa did not watch o didn’t watch, sin -ed en el verbo principal.'}
 ],sources:['past','phrases']
},
{
 id:'past-continuous',group:'past',title:'Past Continuous',spanish:'Pasado continuo',summary:'Una actividad en curso en un momento pasado.',
 definition:['Muestra una acción mientras estaba desarrollándose en un punto del pasado. Nos sitúa dentro de la actividad, sin presentar necesariamente su principio o su final.','Se forma con was o were + verbo-ing. Es útil para describir el contexto de una historia, dos actividades simultáneas o una acción durante la cual sucedió otra.'],
 timeline:['La actividad ya había empezado','Punto pasado: estaba en curso','Ahora: miramos ese momento'],
 uses:[
  ['Un momento pasado','Describe qué estaba pasando a cierta hora.','At nine last night, I was reviewing my notes.','Anoche a las nueve estaba repasando mis apuntes.'],
  ['Contexto e interrupción','La acción en curso sirve de fondo a otro acontecimiento.','We were watching a match when the lights went out.','Estábamos viendo un partido cuando se fue la luz.'],
  ['Actividades simultáneas','Dos procesos ocurrían al mismo tiempo.','I was cooking while Luis was setting the table.','Yo estaba cocinando mientras Luis ponía la mesa.']
 ],
 forms:[
  ['Afirmativa','Sujeto + was / were + verbo-ing','She was reading at eight.','Ella estaba leyendo a las ocho.'],
  ['Negativa','Sujeto + was / were + not + verbo-ing','She was not sleeping at eight.','Ella no estaba durmiendo a las ocho.'],
  ['Pregunta','Was / Were + sujeto + verbo-ing?','Was she reading at eight?','¿Estaba leyendo a las ocho?'],
  ['Pregunta con WH','WH + was / were + sujeto + verbo-ing?','What was she reading?','¿Qué estaba leyendo?']
 ],
 agreement:[['I / he / she / it','was working'],['you / we / they','were working']],
 shortAnswers:['Were they studying?','Yes, they were.','No, they were not. / No, they weren’t.','Repite was o were según el sujeto de la respuesta.'],
 rules:[
  ['No mezcles auxiliares','Was/were ya construyen la pregunta y la negación. No añadas did: Were you working? y You weren’t working.'],
  ['When y while','When suele introducir un suceso y while una situación simultánea, pero no obligan por sí solos a elegir un tiempo. Elige simple o continuo según quieras presentar un hecho o un proceso.'],
  ['No significa que se detuvo','En I was reading when she arrived, la llegada ocurre durante la lectura; no sabemos si la lectura se interrumpió definitivamente.'],
  ['Forma -ing y estados','Mantén las reglas de -ing: make → making; sit → sitting. Los verbos de estado suelen ir en simple: I knew the answer, no I was knowing the answer.']
 ],
 markers:[['at eight yesterday','ayer a las ocho'],['at that moment','en ese momento'],['while','mientras'],['when','cuando, según el contexto']],
 contrast:{id:'past-simple',title:'Contexto y acontecimiento',pairs:[['I was walking home.','Estaba caminando a casa.','Actividad que ya estaba en curso.'],['It started to rain.','Empezó a llover.','Suceso ocurrido durante ese contexto.']],note:'Puedes unirlas: I was walking home when it started to rain. El continuo aporta el fondo; el simple introduce el hecho.'},
 mistakes:[['Did you were studying?','Were you studying?','Invierte were y you; no añadas did.'],['She was cook when I arrived.','She was cooking when I arrived.','Después de was necesitas la forma -ing para este continuo.']],
 practice:[
  {prompt:'Completa: At ten last night, they ___ playing.',choices:['was','were','did'],answer:1,explanation:'They requiere were; playing aporta la forma continua.'},
  {prompt:'Completa: I ___ when the phone rang. Presenta dormir como actividad en curso.',choices:['was sleeping','sleep','have slept'],answer:0,explanation:'Was sleeping expresa la acción que estaba desarrollándose.'},
  {prompt:'Elige la pregunta correcta.',choices:['Did she was reading?','Was she read?','Was she reading?'],answer:2,explanation:'Usa was + sujeto + verbo-ing.'},
  {prompt:'Escribe en negativo: They were studying.',answers:['They were not studying.','They weren’t studying.'],explanation:'Añade not después de were o usa weren’t.'}
 ],sources:['past','phrases']
},
{
 id:'past-perfect',group:'past',title:'Past Perfect',spanish:'Pasado perfecto',summary:'Algo anterior a otro punto del pasado.',
 definition:['Mira hacia atrás desde un momento pasado. Presenta una situación que ya había sucedido, o que llevaba cierto tiempo existiendo, cuando llegamos a ese punto de referencia.','Se forma con had + participio para todos los sujetos. Es útil para aclarar qué ocurrió primero; no se utiliza simplemente porque un hecho ocurrió hace mucho tiempo.'],
 timeline:['Primero: había ocurrido algo','Después: otro punto del pasado','Ahora: contamos la relación'],
 uses:[
  ['Orden de acontecimientos','Aclara que un hecho fue anterior a otro.','The movie had started when we arrived.','La película había empezado cuando llegamos.'],
  ['Causa de una situación pasada','Explica por qué alguien estaba en cierta situación.','I could not enter because I had forgotten my code.','No pude entrar porque había olvidado mi código.'],
  ['Estado hasta un punto pasado','Expresa cuánto tiempo existía una situación entonces.','By 2024, she had known Luis for five years.','En 2024, ella ya conocía a Luis desde hacía cinco años.']
 ],
 forms:[
  ['Afirmativa','Sujeto + had + participio','Ana had finished before dinner.','Ana había terminado antes de la cena.'],
  ['Negativa','Sujeto + had not + participio','Ana had not finished when I called.','Ana no había terminado cuando llamé.'],
  ['Pregunta','Had + sujeto + participio?','Had Ana finished before dinner?','¿Ana había terminado antes de la cena?'],
  ['Pregunta con WH','WH + had + sujeto + participio?','What had Ana finished before dinner?','¿Qué había terminado Ana antes de la cena?']
 ],
 agreement:[['Todos los sujetos','had worked / had gone']],
 shortAnswers:['Had you eaten before class?','Yes, I had.','No, I had not. / No, I hadn’t.','La respuesta corta usa had; el verbo principal no se repite.'],
 rules:[
  ['Busca el punto de referencia','Puede estar en la misma oración o en el relato anterior. Sin una relación con otro punto pasado, el pasado simple suele ser suficiente.'],
  ['Had no cambia','I had, she had y they had usan el mismo auxiliar. El verbo principal va en participio: had seen, had written, had taken.'],
  ['Contracción ’d','I’d finished significa I had finished. I’d finish significa I would finish. La forma del verbo que sigue permite distinguir had de would.'],
  ['No es obligatorio en toda secuencia','Cuando before o after ya aclaran el orden, a menudo también puede usarse pasado simple. El perfecto hace explícita la anterioridad o resalta su importancia.']
 ],
 markers:[['already','ya en ese momento pasado'],['by the time','para cuando'],['before / after','antes de / después de'],['until then','hasta entonces']],
 contrast:{id:'present-perfect',title:'El punto de referencia cambia',pairs:[['She has left.','Ella se ha ido.','Referencia: ahora.'],['She had left when I arrived.','Ella se había ido cuando llegué.','Referencia: mi llegada, en el pasado.']],note:'Present perfect conecta con el presente; past perfect conecta una situación anterior con otro momento pasado.'},
 mistakes:[['She had went home.','She had gone home.','Had requiere el participio gone.'],['Had he ate already?','Had he eaten already?','El participio de eat es eaten, no ate.']],
 practice:[
  {prompt:'Completa: The class ___ already started when I arrived.',choices:['has','had','was'],answer:1,explanation:'La clase empezó antes de mi llegada, que también está en el pasado.'},
  {prompt:'Completa: We had ___ the instructions.',choices:['readed','reading','read'],answer:2,explanation:'Read mantiene su escritura en pasado y participio; en estas formas se pronuncia /red/.'},
  {prompt:'En “The bus had left when we arrived”, ¿qué ocurrió primero?',choiceLang:'es',choices:['Nuestra llegada','La salida del autobús','No se puede establecer el orden'],answer:1,explanation:'Had left marca la salida anterior a arrived.'},
  {prompt:'Convierte en pregunta: She had finished.',answers:['Had she finished?'],explanation:'Invierte had y she; conserva el participio finished.'}
 ],sources:['pastPerfect','past']
},
{
 id:'past-perfect-continuous',group:'past',title:'Past Perfect Continuous',spanish:'Pasado perfecto continuo',summary:'Duración de una actividad antes de otro momento pasado.',
 definition:['Destaca una actividad que venía desarrollándose antes de un punto pasado. Puede seguir hasta ese punto o terminar poco antes y explicar una consecuencia que existía entonces.','La estructura es had + been + verbo-ing. A diferencia del pasado continuo, invita a mirar hacia el tiempo que la actividad llevaba ocurriendo antes de la referencia pasada.'],
 timeline:['La actividad comienza','Se prolonga hasta un punto pasado','Ahora: contamos cuánto llevaba'],
 uses:[
  ['Duración anterior','Expresa cuánto tiempo se llevaba haciendo algo.','We had been waiting for forty minutes when the bus arrived.','Llevábamos cuarenta minutos esperando cuando llegó el autobús.'],
  ['Causa visible entonces','Explica una condición que observamos en el pasado.','Luis was exhausted because he had been training.','Luis estaba agotado porque había estado entrenando.'],
  ['Actividad repetida antes de un cambio','Presenta una práctica que se venía repitiendo.','She had been taking evening classes before she changed jobs.','Ella había estado tomando clases nocturnas antes de cambiar de trabajo.']
 ],
 forms:[
  ['Afirmativa','Sujeto + had + been + verbo-ing','He had been studying for two hours.','Él llevaba dos horas estudiando.'],
  ['Negativa','Sujeto + had not + been + verbo-ing','He had not been sleeping well.','Él no había estado durmiendo bien.'],
  ['Pregunta','Had + sujeto + been + verbo-ing?','Had he been studying before the test?','¿Había estado estudiando antes del examen?'],
  ['Pregunta con WH','WH + had + sujeto + been + verbo-ing?','How long had he been studying?','¿Cuánto tiempo llevaba estudiando?']
 ],
 agreement:[['Todos los sujetos','had been working']],
 shortAnswers:['Had they been waiting long?','Yes, they had.','No, they had not. / No, they hadn’t.','Responde con had. No necesitas repetir been waiting.'],
 rules:[
  ['Tres piezas necesarias','Had been working combina anterioridad y proceso. No omitas been ni sustituyas working por worked.'],
  ['La referencia está en el pasado','En I had been studying when she arrived, arrived fija la referencia. Si la actividad llega hasta ahora, normalmente usarías have/has been studying.'],
  ['Proceso o cantidad terminada','Had been reading destaca actividad y duración; had read five chapters destaca capítulos completados. No siempre sabemos si la actividad continua terminó definitivamente.'],
  ['Estados y duración','Con know u own suele preferirse had known o had owned. For indica duración; since, inicio: He had been working since dawn. La duración se calcula hasta el punto pasado, no hasta hoy.']
 ],
 markers:[['for an hour','desde hacía una hora'],['since dawn','desde el amanecer'],['before','antes de otro punto pasado'],['when / by the time','cuando / para cuando']],
 contrast:{id:'past-continuous',title:'Estaba ocurriendo o llevaba tiempo ocurriendo',pairs:[['I was studying when she called.','Estaba estudiando cuando llamó.','Sitúo la actividad en ese momento.'],['I had been studying for two hours when she called.','Llevaba dos horas estudiando cuando llamó.','Destaco su duración anterior a la llamada.']],note:'El continuo pasado enfoca el momento; el perfecto continuo pasado enfoca el recorrido hasta ese momento.'},
 mistakes:[['They had working all day.','They had been working all day.','Falta been entre had y working.'],['She had been studied.','She had been studying.','Had been studied es una forma pasiva con otro significado; para decir que ella estudiaba, usa studying.']],
 practice:[
  {prompt:'Completa: I had been ___ for an hour when he arrived.',choices:['wait','waited','waiting'],answer:2,explanation:'Después de had been se usa -ing en este tiempo.'},
  {prompt:'Completa: She was tired because she ___ been running.',choices:['has','had','is'],answer:1,explanation:'Was tired sitúa la consecuencia en el pasado; had been running explica la actividad anterior.'},
  {prompt:'¿Qué destaca “We had been practicing for months before the concert”?',choiceLang:'es',choices:['Una actividad futura','La duración de la práctica antes del concierto','Una costumbre actual'],answer:1,explanation:'La duración se mide hasta el concierto, un punto pasado.'},
  {prompt:'Escribe en negativo: They had been working.',answers:['They had not been working.','They hadn’t been working.'],explanation:'La negación se coloca después de had; been working permanece igual.'}
 ],sources:['past','phrases']
},
{
 id:'future-simple',group:'future',title:'Future Simple',spanish:'Futuro con will',summary:'Predicciones, decisiones del momento, promesas y ofrecimientos.',
 definition:['Usa will + verbo base para presentar una predicción, una decisión tomada al hablar, una promesa o una disposición a actuar. La intención comunicativa importa más que memorizar una traducción única de futuro.','En la enseñanza suele llamarse Future Simple. El inglés también habla del futuro con be going to, presente continuo y presente simple: will no es la única opción.'],
 timeline:['Ahora: predigo, decido o prometo','El hecho se sitúa después','Futuro: se espera la acción'],
 uses:[
  ['Predicción u opinión','Expresa lo que piensas que sucederá.','I think our team will win the next match.','Creo que nuestro equipo ganará el próximo partido.'],
  ['Decisión al hablar','Responde a una necesidad que surge en ese momento.','You need help? I will explain the exercise.','¿Necesitas ayuda? Te explicaré el ejercicio.'],
  ['Promesa u ofrecimiento','Manifiesta voluntad o compromiso.','I will send you my notes tonight.','Te enviaré mis apuntes esta noche.']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + verbo base','She will join the class.','Ella se unirá a la clase.'],
  ['Negativa','Sujeto + will not + verbo base','She will not miss the lesson.','Ella no se perderá la lección.'],
  ['Pregunta','Will + sujeto + verbo base?','Will she join the class?','¿Se unirá a la clase?'],
  ['Pregunta con WH','WH + will + sujeto + verbo base?','When will she join the class?','¿Cuándo se unirá a la clase?']
 ],
 agreement:[['Todos los sujetos','will work · will not work']],
 shortAnswers:['Will you be there?','Yes, I will.','No, I will not. / No, I won’t.','En una respuesta afirmativa corta, usa will completo: Yes, I will; no Yes, I’ll.'],
 rules:[
  ['Verbo base sin to','Will no cambia según el sujeto. Escribe she will work, no she will works ni she will to work. Con be: She will be ready.'],
  ['Contracciones','I’ll = I will; she’ll = she will; we’ll = we will. La contracción negativa es won’t, no willn’t.'],
  ['Cláusulas de tiempo','En referencias futuras con when, after, before, until y as soon as se usa normalmente presente en esa cláusula: I will call when I arrive. Distingue la pregunta When will you arrive?, que sí lleva will.'],
  ['Will y going to','Will suele encajar en decisiones espontáneas; going to suele presentar intenciones anteriores o evidencia actual. En predicciones y otros contextos pueden coincidir: no son categorías absolutamente excluyentes.']
 ],
 markers:[['tomorrow','mañana'],['next week','la semana que viene'],['I think / probably','creo que / probablemente'],['soon','pronto']],
 contrast:{id:'be-going-to',title:'Decisión del momento o intención previa',pairs:[['The phone is ringing. I’ll answer it.','Está sonando el teléfono. Yo contesto.','Decido responder ahora.'],['I’m going to call Luis tonight.','Voy a llamar a Luis esta noche.','Presento una intención que ya tenía.']],note:'Estas formas también pueden expresar predicciones. La diferencia depende de cómo presentas la situación, no solo de si aparece tomorrow.'},
 mistakes:[['She will studies tonight.','She will study tonight.','Después de will se usa la forma base sin -s.'],['I will call you when I will arrive.','I will call you when I arrive.','En esta cláusula temporal futura con when se usa presente simple.']],
 practice:[
  {prompt:'Completa: He will ___ us tomorrow.',choices:['helps','help','to help'],answer:1,explanation:'Will va seguido del verbo base help.'},
  {prompt:'Elige la contracción de will not.',choices:['willn’t','won’t','wouldn’t'],answer:1,explanation:'Won’t significa will not. Wouldn’t significa would not.'},
  {prompt:'Completa: I will text you when I ___ home.',choices:['will get','getting','get'],answer:2,explanation:'La cláusula temporal introducida por when usa presente con significado futuro.'},
  {prompt:'Escribe en negativo: She will come.',answers:['She will not come.','She won’t come.'],explanation:'Coloca not después de will o usa won’t.'}
 ],sources:['future','futureForms']
},
{
 id:'future-continuous',group:'future',title:'Future Continuous',spanish:'Futuro continuo',summary:'Una actividad que estará en curso en un momento futuro.',
 definition:['Te sitúa dentro de una actividad en un punto futuro: qué estarás haciendo mañana a cierta hora o qué ocurrirá mientras sucede otra cosa. El foco está en el desarrollo, no en contar la acción como terminada.','Se forma con will + be + verbo-ing para todos los sujetos. También puede presentar el curso esperado de los acontecimientos y preguntar de forma neutral por planes.'],
 timeline:['Ahora: imaginamos una situación','Punto futuro: estará en curso','Su final no se especifica'],
 uses:[
  ['Una hora futura','Describe lo que estará pasando entonces.','At eight tomorrow, I will be studying English.','Mañana a las ocho estaré estudiando inglés.'],
  ['Curso esperado de los hechos','Presenta una actividad prevista dentro de una rutina o un plan.','We will be using the virtual classroom next week.','La semana que viene estaremos usando el aula virtual.'],
  ['Pregunta sobre planes','Puede preguntar por una actividad prevista sin presentarla como una orden.','Will you be using the computer tonight?','¿Estarás usando la computadora esta noche?']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + be + verbo-ing','They will be traveling at noon.','Ellos estarán viajando al mediodía.'],
  ['Negativa','Sujeto + will not + be + verbo-ing','They will not be working at noon.','Ellos no estarán trabajando al mediodía.'],
  ['Pregunta','Will + sujeto + be + verbo-ing?','Will they be traveling at noon?','¿Estarán viajando al mediodía?'],
  ['Pregunta con WH','WH + will + sujeto + be + verbo-ing?','Where will they be traveling?','¿Por dónde estarán viajando?']
 ],
 agreement:[['Todos los sujetos','will be working']],
 shortAnswers:['Will you be studying at six?','Yes, I will.','No, I will not. / No, I won’t.','El primer auxiliar, will, basta para la respuesta corta.'],
 rules:[
  ['Will be, no will am/is/are','Después de will va be en forma base, incluso con he o they. El verbo principal lleva -ing.'],
  ['En curso no significa terminado','I will be reading at nine dice que a las nueve estaré dentro de la actividad. No garantiza que haya acabado el libro a esa hora.'],
  ['Dos acciones futuras','Puedes combinarlo con presente en una cláusula temporal: I will be studying when you arrive. En esta cláusula con when no necesitas will.'],
  ['Estados y contracciones','Normalmente evita continuos con know u own: I will know the result. I’ll be working y I won’t be working son formas naturales en conversación.']
 ],
 markers:[['this time tomorrow','mañana a esta misma hora'],['at nine tomorrow','mañana a las nueve'],['when you arrive','cuando llegues'],['all afternoon','toda la tarde, según el contexto']],
 contrast:{id:'future-perfect',title:'En progreso o ya terminado',pairs:[['At nine, I will be reading the report.','A las nueve estaré leyendo el informe.','La actividad estará en curso.'],['By nine, I will have read the report.','Para las nueve habré leído el informe.','La lectura estará completada para entonces.']],note:'At sitúa un momento; by expresa un límite. El significado de la oración completa decide la forma verbal.'},
 mistakes:[['She will is working.','She will be working.','Después de will se usa be, no is.'],['They will be work at six.','They will be working at six.','El continuo necesita working después de be.']],
 practice:[
  {prompt:'Completa: This time tomorrow, we will ___ flying.',choices:['are','be','been'],answer:1,explanation:'La estructura es will be + verbo-ing.'},
  {prompt:'¿Qué expresa “At ten, I will be taking the test”?',choiceLang:'es',choices:['El examen ya habrá terminado a las diez','El examen ocurrió ayer','A las diez estaré realizando el examen'],answer:2,explanation:'El futuro continuo nos sitúa dentro de la actividad.'},
  {prompt:'Completa: She will be waiting when you ___.',choices:['arrive','will arrive','arriving'],answer:0,explanation:'En esta cláusula temporal futura, when va seguido de presente simple.'},
  {prompt:'Convierte en pregunta: They will be working.',answers:['Will they be working?'],explanation:'Coloca will antes de they y conserva be working.'}
 ],sources:['futurePerfect','future']
},
{
 id:'future-perfect',group:'future',title:'Future Perfect',spanish:'Futuro perfecto',summary:'Un resultado o una duración acumulada para un punto futuro.',
 definition:['Mira hacia atrás desde un punto futuro: algo ya estará hecho para entonces o una situación habrá alcanzado cierta duración. Primero imaginas el límite futuro y después lo que será anterior a él.','Se forma con will + have + participio. No exige que la acción empiece en el futuro: puede haber empezado ya y completarse antes del límite indicado.'],
 timeline:['La acción ocurre antes del límite','Punto futuro: ya estará hecha','La miramos desde ese punto'],
 uses:[
  ['Meta o fecha límite','Presenta un resultado completado para cierto momento.','By Friday, I will have finished the course.','Para el viernes habré terminado el curso.'],
  ['Antes de otro hecho futuro','Relaciona una acción con otra que sucederá después.','They will have left by the time we arrive.','Ya se habrán ido para cuando lleguemos.'],
  ['Duración acumulada de un estado','Expresa cuánto tiempo habrá existido una situación.','Next June, I will have known Luis for ten years.','El próximo junio hará diez años que conozco a Luis.']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + have + participio','She will have finished by six.','Ella habrá terminado para las seis.'],
  ['Negativa','Sujeto + will not + have + participio','She will not have finished by six.','Ella no habrá terminado para las seis.'],
  ['Pregunta','Will + sujeto + have + participio?','Will she have finished by six?','¿Habrá terminado para las seis?'],
  ['Pregunta con WH','WH + will + sujeto + have + participio?','How many lessons will she have finished by six?','¿Cuántas lecciones habrá terminado para las seis?']
 ],
 agreement:[['Todos los sujetos','will have worked / will have gone']],
 shortAnswers:['Will they have arrived by noon?','Yes, they will.','No, they will not. / No, they won’t.','Responde con will, el primer auxiliar de la pregunta.'],
 rules:[
  ['Have no cambia a has','Después de will siempre se usa have: She will have finished. El sujeto no modifica esta pieza.'],
  ['Participio correcto','Write → written; take → taken; do → done. No uses el pasado simple después de will have.'],
  ['By no es until','By Friday establece un límite: como muy tarde, el viernes. Until Friday suele indicar que una actividad o estado continúa hasta el viernes. No son intercambiables automáticamente.'],
  ['Referencia futura clara','La referencia puede estar en otra oración. Con by the time, la cláusula temporal suele ir en presente: By the time you arrive, I will have cooked dinner. La forma no equivale siempre a certeza absoluta: el contexto puede expresar una estimación.']
 ],
 markers:[['by Friday','para el viernes / a más tardar el viernes'],['by then','para entonces'],['by the time','para cuando'],['before the end of…','antes de que termine…']],
 contrast:{id:'future-continuous',title:'Resultado o actividad',pairs:[['At six, I will be writing my essay.','A las seis estaré escribiendo mi ensayo.','Actividad en curso a esa hora.'],['By six, I will have written my essay.','Para las seis habré escrito mi ensayo.','Resultado completado para esa hora.']],note:'El perfecto sitúa algo antes de un punto de referencia. No significa que todos sus usos describan una acción breve.'},
 mistakes:[['She will has finished.','She will have finished.','Will requiere have en forma base.'],['I will have wrote the report.','I will have written the report.','Written es el participio; wrote es el pasado simple.']],
 practice:[
  {prompt:'Completa: By noon, she will ___ finished.',choices:['has','have','had'],answer:1,explanation:'Después de will se mantiene have con todos los sujetos.'},
  {prompt:'Completa: By tomorrow, I will have ___ the report.',choices:['wrote','writing','written'],answer:2,explanation:'El futuro perfecto requiere el participio written.'},
  {prompt:'¿Qué significa “I will have finished by Friday”?',choiceLang:'es',choices:['Estaré terminando exactamente durante todo el viernes','Habré terminado como muy tarde el viernes','Terminé el viernes pasado'],answer:1,explanation:'By Friday fija un límite futuro para la finalización.'},
  {prompt:'Escribe en negativo: They will have finished.',answers:['They will not have finished.','They won’t have finished.'],explanation:'La negación se coloca después de will, antes de have.'}
 ],sources:['futurePerfect','future']
},
{
 id:'future-perfect-continuous',group:'future',title:'Future Perfect Continuous',spanish:'Futuro perfecto continuo',summary:'Cuánto tiempo llevará desarrollándose una actividad en un punto futuro.',
 definition:['Proyecta una actividad hacia un punto futuro y destaca cuánto tiempo llevará ocurriendo cuando alcancemos ese punto. Combina una perspectiva futura con duración previa y atención al proceso.','Se forma con will + have + been + verbo-ing. Es una estructura menos frecuente en conversación cotidiana; resulta útil cuando la duración acumulada es precisamente lo que quieres comunicar.'],
 timeline:['La actividad comienza','Se prolonga durante un período','Punto futuro: llevará ese tiempo'],
 uses:[
  ['Duración acumulada','Calcula cuánto tiempo llevará una actividad para una fecha futura.','By December, I will have been studying English for two years.','En diciembre llevaré dos años estudiando inglés.'],
  ['Antes de un acontecimiento futuro','Mide la duración hasta el momento de otro hecho.','When you arrive, we will have been waiting for an hour.','Cuando llegues, llevaremos una hora esperando.'],
  ['Explicar una consecuencia futura','La actividad prolongada explica cómo estará alguien entonces.','He will be tired because he will have been driving for six hours.','Estará cansado porque llevará seis horas conduciendo.']
 ],
 forms:[
  ['Afirmativa','Sujeto + will + have + been + verbo-ing','She will have been working for five hours by noon.','Al mediodía llevará cinco horas trabajando.'],
  ['Negativa','Sujeto + will not + have + been + verbo-ing','She will not have been working for long when we arrive.','No llevará mucho tiempo trabajando cuando lleguemos.'],
  ['Pregunta','Will + sujeto + have + been + verbo-ing?','Will she have been working for five hours by noon?','¿Llevará cinco horas trabajando al mediodía?'],
  ['Pregunta con WH','WH + will + sujeto + have + been + verbo-ing?','How long will she have been working by noon?','¿Cuánto tiempo llevará trabajando al mediodía?']
 ],
 agreement:[['Todos los sujetos','will have been working']],
 shortAnswers:['Will you have been studying for a year by June?','Yes, I will.','No, I will not. / No, I won’t.','Aunque la pregunta tenga varios auxiliares, la respuesta corta usa will.'],
 rules:[
  ['Orden de los auxiliares','Mantén este orden: will → have → been → verbo-ing. Have y been no cambian por el sujeto.'],
  ['No obliga a terminar','La actividad puede continuar después del punto futuro. By June, I will have been working here for a year no dice que dejaré el empleo en junio.'],
  ['Actividad frente a estado','Con estados como know se usa normalmente el futuro perfecto simple: I will have known her for ten years. Con work o study puedes elegir continuo para destacar el proceso.'],
  ['Punto y duración son distintos','By next May es la referencia futura; for three years es la duración acumulada. Con when usamos normalmente presente en la cláusula temporal: when you arrive.']
 ],
 markers:[['by… + for…','para cierto momento + duración'],['by then','para entonces'],['when you arrive','cuando llegues'],['how long…?','¿cuánto tiempo llevará…?']],
 contrast:{id:'future-perfect',title:'Duración de la actividad o cantidad conseguida',pairs:[['By Friday, I will have been studying for a month.','Para el viernes llevaré un mes estudiando.','Destaco cuánto durará la actividad hasta entonces.'],['By Friday, I will have completed ten lessons.','Para el viernes habré completado diez lecciones.','Destaco la cantidad terminada.']],note:'Ambas formas miran hacia atrás desde el futuro. La continua enfoca el recorrido de la actividad.'},
 mistakes:[['He will have been work for hours.','He will have been working for hours.','Después de been usa working para expresar la actividad continua.'],['She will has been studying for a year.','She will have been studying for a year.','Después de will se usa have, no has.']],
 practice:[
  {prompt:'Completa: By June, she will have ___ studying for a year.',choices:['be','being','been'],answer:2,explanation:'El orden correcto es will have been studying.'},
  {prompt:'¿La frase “By June, I will have been working here for a year” obliga a dejar el trabajo en junio?',choiceLang:'es',choices:['Sí, siempre','No, puede continuar después','Dice que el trabajo terminó ayer'],answer:1,explanation:'La forma mide la duración hasta junio; no establece necesariamente el final.'},
  {prompt:'Completa: By noon, they will have been ___ for two hours.',choices:['run','running','ran'],answer:1,explanation:'Running es la forma -ing de run; duplica la consonante n.'},
  {prompt:'Convierte en pregunta: They will have been studying.',answers:['Will they have been studying?'],explanation:'Pon will antes de they; conserva have been studying.'}
 ],sources:['phrases','future']
},
{
 id:'be-going-to',group:'extra',title:'Be Going To',spanish:'Planes y predicciones con evidencia',summary:'Una construcción esencial para hablar del futuro.',
 definition:['Be going to + verbo base presenta con frecuencia una intención ya formada o una predicción basada en lo que observas ahora. Es una construcción de futuro, no un tiempo verbal adicional dentro del esquema de doce.','Am, is y are cambian según el sujeto; going to permanece igual. Aunque contenga going, la construcción no exige desplazarse físicamente a ningún lugar.'],
 timeline:['Ahora: hay un plan o una evidencia','Se anuncia lo que ocurrirá','Futuro: acción prevista'],
 uses:[
  ['Intención previa','Presenta algo que ya has decidido hacer.','I am going to practice English after work.','Voy a practicar inglés después del trabajo.'],
  ['Evidencia presente','Anticipa un resultado a partir de lo que observas.','That glass is near the edge. It is going to fall.','Ese vaso está cerca del borde. Se va a caer.'],
  ['Preguntar por planes','Pregunta por una intención futura.','What are you going to study next semester?','¿Qué vas a estudiar el próximo semestre?']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + going to + verbo base','She is going to start a new course.','Ella va a empezar un curso nuevo.'],
  ['Negativa','Sujeto + am / is / are + not + going to + verbo base','She is not going to miss the first class.','Ella no va a faltar a la primera clase.'],
  ['Pregunta','Am / Is / Are + sujeto + going to + verbo base?','Is she going to start a new course?','¿Va a empezar un curso nuevo?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + going to + verbo base?','When is she going to start?','¿Cuándo va a empezar?']
 ],
 agreement:[['I','am going to work'],['he / she / it','is going to work'],['you / we / they','are going to work']],
 shortAnswers:['Are you going to study tonight?','Yes, I am.','No, I am not. / No, I’m not.','Contesta con be: am, is o are. No uses do o will para esta respuesta corta.'],
 rules:[
  ['No omitas be ni to','I going to study pierde el auxiliar. I am going study pierde to. La estructura completa es I am going to study.'],
  ['Después de to va la forma base','She is going to work, no she is going to works ni she is going to working.'],
  ['Plan y acuerdo','Going to puede expresar una intención. El presente continuo suele destacar una cita o arreglo ya organizado: I am meeting Luis at six. En bastantes contextos ambas formas son posibles.'],
  ['Going to y movimiento','I am going to study expresa intención. I am going to school contiene un destino, school. Gonna representa una pronunciación informal de going to para el futuro; aprende y usa going to en escritura formal.']
 ],
 markers:[['tonight / tomorrow','esta noche / mañana'],['next month','el mes que viene'],['Look!','¡Mira!, puede introducir evidencia'],['this weekend','este fin de semana']],
 contrast:{id:'future-simple',title:'Plan previo o reacción al momento',pairs:[['I’m going to buy a new notebook.','Voy a comprar un cuaderno nuevo.','Presento mi intención.'],['You forgot your notebook? I’ll lend you mine.','¿Olvidaste tu cuaderno? Te presto el mío.','Hago un ofrecimiento en ese momento.']],note:'No memorices que will siempre es inseguro y going to siempre es seguro. El contexto, la evidencia y la intención comunicativa son lo importante.'},
 mistakes:[['She going to study.','She is going to study.','Falta is, la forma de be para she.'],['Are you going to studying?','Are you going to study?','Después de going to usa study, la forma base.']],
 practice:[
  {prompt:'Completa: They ___ going to visit us.',choices:['is','are','will'],answer:1,explanation:'They requiere are en esta construcción.'},
  {prompt:'Completa: She is going to ___ a new course.',choices:['starts','starting','start'],answer:2,explanation:'Después de going to se usa la forma base start.'},
  {prompt:'Elige la pregunta correcta.',choices:['Do you going to study?','Are you going to study?','Will you are going to study?'],answer:1,explanation:'Invierte are y you, sin añadir do o will.'},
  {prompt:'Escribe en negativo: He is going to study.',answers:['He is not going to study.','He isn’t going to study.','He’s not going to study.'],explanation:'La negación se coloca después de is, antes de going to.'}
 ],sources:['futureForms','future']
}
];
root.ENGLISH_TENSES={sources,lessons};
if(typeof module!=='undefined'&&module.exports)module.exports=root.ENGLISH_TENSES;
})(globalThis);
