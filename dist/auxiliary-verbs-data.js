'use strict';
// Original bilingual lessons. Shared layout and practice engine: verb-tenses.js.
(function(root){
const sources={
  bcModals:{title:'British Council · Modal verbs',url:'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modal-verbs'},
  bcQuestions:{title:'British Council · Questions and negatives',url:'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/questions-and-negatives'},
  cambridgeAux:{title:'Cambridge Dictionary Grammar · Auxiliary verbs',url:'https://dictionary.cambridge.org/grammar/british-grammar/auxiliary-verbs'},
  cambridgeModality:{title:'Cambridge Dictionary Grammar · Modality: forms',url:'https://dictionary.cambridge.org/grammar/british-grammar/modality-forms'},
  perfect:{title:'British Council · Perfect aspect',url:'https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/perfect-aspect'}
};
const lessons=[
{
 id:'auxiliary-basics',group:'foundations',title:'What Are Auxiliary Verbs?',spanish:'Qué son los verbos auxiliares',summary:'La base para entender be, have, do y los verbos modales.',
 definition:['Un auxiliary verb (verbo auxiliar) ayuda a construir el significado gramatical de otro verbo. Puede marcar tiempo, aspecto, voz, negación, pregunta, énfasis, posibilidad, obligación, permiso y otras ideas. En She is studying, is ayuda a formar el presente continuo; en Do you work here?, do construye la pregunta.','Los auxiliares principales son be, have y do. Además, el inglés usa modal auxiliary verbs como can, could, may, might, must, should, will y would. Los modales tienen un comportamiento especial: normalmente no llevan -s en tercera persona y van seguidos de la forma base del verbo sin to.'],
 timeline:['Identifica si hay un auxiliar','Observa qué función gramatical cumple','Comprueba la forma del verbo que lo sigue'],
 uses:[
  ['Construir tiempos y aspectos','Be forma los continuos y have forma los perfectos.','She is reading and she has finished chapter one.','Ella está leyendo y ha terminado el capítulo uno.'],
  ['Formar preguntas y negativas','Do apoya muchos verbos léxicos en presente y pasado simples.','Do they live here? They do not live here.','¿Viven aquí? No viven aquí.'],
  ['Añadir modalidad','Los modales expresan ideas como habilidad, posibilidad, obligación o consejo.','You should call her.','Deberías llamarla.']
 ],
 forms:[
  ['Afirmativa','Sujeto + auxiliar + verbo / complemento','She is working.','Ella está trabajando.'],
  ['Negativa','Sujeto + auxiliar + not + verbo / complemento','She is not working.','Ella no está trabajando.'],
  ['Pregunta','Auxiliar + sujeto + verbo / complemento?','Is she working?','¿Está ella trabajando?'],
  ['Pregunta con WH','WH + auxiliar + sujeto + verbo / complemento?','Why is she working late?','¿Por qué está trabajando hasta tarde?']
 ],
 agreementTitle:'Familias principales',
 agreement:[['be','am / is / are · was / were · be / been / being'],['have','have / has · had'],['do','do / does · did'],['modales','can, could, may, might, must, should, will, would, shall + verbo base']],
 shortAnswers:['Can they come?','Yes, they can.','No, they cannot. / No, they can’t.','En respuestas cortas normalmente repetimos el auxiliar, no el verbo principal: Yes, they can; no Yes, they come.'],
 rules:[
  ['El primer auxiliar manda','En cadenas como has been working, el primer auxiliar es el que cambia para preguntas y negativas: Has she been working? / She has not been working.'],
  ['No añadas do si ya hay otro auxiliar','Is she ready? y Can she swim? ya tienen auxiliar. No digas Does she is ready? ni Does she can swim?'],
  ['Los modales usan verbo base','He can work, She should study, They might arrive. No uses works, studies o to arrive después del modal.'],
  ['Un mismo verbo puede ser auxiliar o principal','Have es auxiliar en I have finished, pero verbo principal en I have a car. Do es auxiliar en Do you work? y verbo principal en I do my homework.']
 ],
 markers:[['be + -ing','aspecto continuo'],['have + participio','aspecto perfecto'],['do / does / did','apoyo en simples'],['modal + verbo base','modalidad: capacidad, posibilidad, obligación, etc.']],
 contrast:{id:'do-auxiliary',title:'Auxiliar y verbo principal no son lo mismo',pairs:[['Do you work here?','¿Trabajas aquí?','Do es auxiliar; work contiene el significado principal.'],['Do you do your homework here?','¿Haces tu tarea aquí?','El primer do es auxiliar y el segundo do es el verbo principal “hacer”.']],note:'La función depende de la estructura, no solo de la palabra que ves.'},
 mistakes:[['Does she can swim?','Can she swim?','Can ya funciona como auxiliar y se coloca delante del sujeto.'],['He can studies tonight.','He can study tonight.','Después de un modal usa la forma base del verbo.']],
 practice:[
  {prompt:'En She has finished the lesson, ¿cuál es el auxiliar?',choiceLang:'es',choices:['She','has','finished'],answer:1,explanation:'Has ayuda a formar el present perfect con finished.'},
  {prompt:'Elige la pregunta correcta.',choices:['Does she can drive?','Can she drive?','Can she drives?'],answer:1,explanation:'Can se invierte con el sujeto y el verbo principal queda en forma base.'},
  {prompt:'Completa: They ___ not working today.',choices:['are','do','have'],answer:0,explanation:'El presente continuo usa be + verbo-ing: are working; la negación es are not working.'},
  {prompt:'Corrige: He should studies more.',answers:['He should study more.'],explanation:'Después de should usa la forma base study.'}
 ],sources:['cambridgeAux','bcModals']
},
{
 id:'be-auxiliary',group:'primary',title:'BE as an Auxiliary',spanish:'BE como auxiliar',summary:'Am, is, are, was y were en continuos y voz pasiva.',
 definition:['Be funciona como auxiliar cuando acompaña a otra forma verbal. Con verbo-ing construye los tiempos continuos: She is studying. Con participio pasado puede construir la voz pasiva: The door was opened.','Be cambia según el sujeto y el tiempo: am, is, are en presente; was, were en pasado; be después de modales o to; been en perfectos y being en ciertas construcciones continuas o pasivas. Cuando be es el único verbo, como en She is happy, actúa como verbo principal/copulativo, aunque conserva su propia forma de pregunta y negación sin do.'],
 timeline:['Elige la forma correcta de be','Mira si sigue -ing o participio','Invierte be para preguntar o añade not para negar'],
 uses:[
  ['Tiempos continuos','Be + verbo-ing enfoca una acción o situación en progreso.','They are studying now.','Ellos están estudiando ahora.'],
  ['Voz pasiva','Be + participio centra la oración en quien recibe la acción.','The emails were sent yesterday.','Los correos fueron enviados ayer.'],
  ['Estado con be','Cuando be conecta al sujeto con una descripción, no necesita do para preguntas o negativas.','Is Ana ready?','¿Ana está lista?']
 ],
 forms:[
  ['Afirmativa','Sujeto + am / is / are + verbo-ing','She is studying.','Ella está estudiando.'],
  ['Negativa','Sujeto + am / is / are + not + verbo-ing','She is not studying.','Ella no está estudiando.'],
  ['Pregunta','Am / Is / Are + sujeto + verbo-ing?','Is she studying?','¿Está ella estudiando?'],
  ['Pregunta con WH','WH + am / is / are + sujeto + verbo-ing?','What is she studying?','¿Qué está estudiando?']
 ],
 agreement:[['I','am working · was working'],['he / she / it / singular','is working · was working'],['you / we / they / plural','are working · were working'],['después de un modal','be: will be working / can be seen']],
 shortAnswers:['Are they studying?','Yes, they are.','No, they are not. / No, they aren’t.','La respuesta corta repite la forma de be que aparece en la pregunta.'],
 rules:[
  ['Be se invierte directamente','Are you listening? No uses Do you are listening?'],
  ['Continuous: be + -ing','She is working. Si falta be, Working alone no forma un tiempo verbal finito.'],
  ['Passive: be + participio','The room is cleaned daily. El participio principal no concuerda con singular o plural.'],
  ['Distingue been y being','Been aparece después de have: has been working / has been cleaned. Being aparece en progresivos pasivos: is being cleaned.']
 ],
 markers:[['now / right now','frecuentes con continuos'],['at the moment','en este momento'],['by + agente','puede aparecer en pasiva'],['been / being','formas no finitas de be']],
 contrast:{id:'have-auxiliary',title:'BE y HAVE construyen aspectos diferentes',pairs:[['She is studying.','Ella está estudiando.','Be + -ing presenta el proceso en curso.'],['She has studied.','Ella ha estudiado.','Have + participio conecta la acción con un punto de referencia.']],note:'El auxiliar cambia la manera de presentar la acción.'},
 mistakes:[['Do you are studying?','Are you studying?','Be ya es el auxiliar del presente continuo; no añadas do.'],['The room is clean every day.','The room is cleaned every day.','Si quieres expresar la acción pasiva de limpiar, necesitas el participio cleaned.']],
 practice:[
  {prompt:'Completa: I ___ studying English now.',choices:['am','do','have'],answer:0,explanation:'Con I, el presente continuo usa am + verbo-ing.'},
  {prompt:'Elige la pregunta correcta.',choices:['Do they are working?','Are they working?','Are they work?'],answer:1,explanation:'Invierte are con el sujeto y conserva working.'},
  {prompt:'Completa la pasiva: The windows ___ cleaned yesterday.',choices:['were','did','have'],answer:0,explanation:'The windows es plural y el pasado pasivo usa were + participio.'},
  {prompt:'Escribe en negativo: She is working.',answers:['She is not working.','She isn’t working.'],explanation:'Añade not después de is; también puedes usar isn’t.'}
 ],sources:['cambridgeAux','bcQuestions']
},
{
 id:'have-auxiliary',group:'primary',title:'HAVE as an Auxiliary',spanish:'HAVE como auxiliar',summary:'Have, has y had para construir los tiempos perfectos.',
 definition:['Have funciona como auxiliar delante de un participio pasado para construir el aspecto perfecto: I have finished, She has arrived, They had left. El perfecto relaciona una acción o situación con un punto de referencia presente, pasado o futuro.','En presente, have cambia a has con he, she, it y sujetos singulares. En pasado, todos usan had. Cuando have es auxiliar, las preguntas y negativas se construyen con el propio have: Has she finished? She has not finished. Cuando have significa poseer o experimentar en usos con do, puede comportarse como verbo principal: Do you have a car?'],
 timeline:['Elige have / has / had según tiempo y sujeto','Usa participio pasado después del auxiliar','Mueve el primer auxiliar para preguntas o coloca not después de él'],
 uses:[
  ['Present perfect','Conecta una acción pasada con el presente.','She has finished her homework.','Ella ha terminado su tarea.'],
  ['Past perfect','Sitúa una acción antes de otro punto pasado.','They had left before I arrived.','Ellos se habían ido antes de que yo llegara.'],
  ['Perfectos con más auxiliares','Have puede formar parte de una cadena más larga.','The work will have been completed by Friday.','El trabajo habrá sido completado para el viernes.']
 ],
 forms:[
  ['Afirmativa','Sujeto + have / has + participio','He has finished.','Él ha terminado.'],
  ['Negativa','Sujeto + have / has + not + participio','He has not finished.','Él no ha terminado.'],
  ['Pregunta','Have / Has + sujeto + participio?','Has he finished?','¿Ha terminado?'],
  ['Pregunta con WH','WH + have / has + sujeto + participio?','Why has he left?','¿Por qué se ha ido?']
 ],
 agreement:[['I / you / we / they','have finished'],['he / she / it / singular','has finished'],['todos los sujetos en pasado','had finished'],['después de will / modal perfecto','have: will have finished · might have left']],
 shortAnswers:['Has she finished?','Yes, she has.','No, she has not. / No, she hasn’t.','No repitas el participio en la respuesta corta; el auxiliar have basta.'],
 rules:[
  ['Después de have va el participio','She has gone, no She has went. Aprende los participios irregulares.'],
  ['El primer auxiliar recibe not','She has not been working. Not va después de has, no después de been.'],
  ['En pregunta se mueve el primer auxiliar','Has she been studying? No Been she has studying?'],
  ['Have principal puede necesitar do','Do you have time? Aquí have significa “tener” y do construye la pregunta en presente simple.']
 ],
 markers:[['already / just','frecuentes con present perfect'],['yet','preguntas y negativas perfectas'],['before / by the time','relaciones con pasado perfecto'],['for / since','duración conectada con un punto de referencia']],
 contrast:{id:'do-auxiliary',title:'HAVE auxiliar y HAVE principal',pairs:[['Have you finished?','¿Has terminado?','Have es auxiliar delante del participio finished.'],['Do you have enough time?','¿Tienes suficiente tiempo?','Have es verbo principal; do construye la pregunta simple.']],note:'Mira qué viene después de have y qué significa en la oración.'},
 mistakes:[['She has went home.','She has gone home.','Después de has necesitas el participio gone, no el pasado went.'],['Does she has finished?','Has she finished?','Has ya es auxiliar del present perfect; no uses does.']],
 practice:[
  {prompt:'Completa: She ___ already finished.',choices:['has','does','is'],answer:0,explanation:'Present perfect con she: has + participio.'},
  {prompt:'Elige la pregunta correcta.',choices:['Does he have finished?','Has he finished?','Has he finish?'],answer:1,explanation:'El perfecto pregunta invirtiendo has y conserva finished.'},
  {prompt:'Completa: They ___ left before the meeting started.',choices:['had','were','did'],answer:0,explanation:'Past perfect: had + participio.'},
  {prompt:'Escribe en negativo: We have seen it.',answers:['We have not seen it.','We haven’t seen it.'],explanation:'Añade not después de have; seen permanece como participio.'}
 ],sources:['cambridgeAux','perfect']
},
{
 id:'do-auxiliary',group:'primary',title:'DO as an Auxiliary',spanish:'DO como auxiliar',summary:'Do, does y did para preguntas, negativas y énfasis.',
 definition:['Do funciona como auxiliar de apoyo en muchas preguntas y negativas del present simple y past simple cuando no hay otro auxiliar. Do y does se usan en presente; did en pasado. El verbo principal vuelve a su forma base: Does she work? / Did they go?','También puede dar énfasis en afirmativas: I do understand; She did call you. Cuando do significa “hacer”, es verbo principal y puede aparecer junto a un do auxiliar: What do you do after work?'],
 timeline:['Comprueba que no haya otro auxiliar','Elige do / does / did','Deja el verbo principal en forma base'],
 uses:[
  ['Preguntas en presente simple','Do/does aparece antes del sujeto.','Does Ana work here?','¿Ana trabaja aquí?'],
  ['Negativas en presente y pasado simple','Do/does/did + not niega el verbo principal.','They did not arrive on time.','No llegaron a tiempo.'],
  ['Énfasis y contraste','Do puede reforzar una afirmación.','I do want to learn.','Sí quiero aprender / De verdad quiero aprender.']
 ],
 forms:[
  ['Afirmativa','Sujeto + verbo base / -s (énfasis: do / does + verbo base)','She works. / She does work.','Ella trabaja. / Ella sí trabaja.'],
  ['Negativa','Sujeto + do / does / did + not + verbo base','She does not work here.','Ella no trabaja aquí.'],
  ['Pregunta','Do / Does / Did + sujeto + verbo base?','Does she work here?','¿Ella trabaja aquí?'],
  ['Pregunta con WH','WH + do / does / did + sujeto + verbo base?','Where does she work?','¿Dónde trabaja?']
 ],
 agreement:[['I / you / we / they en presente','do + verbo base'],['he / she / it / singular en presente','does + verbo base'],['todos los sujetos en pasado','did + verbo base'],['después de do/does/did','siempre forma base: work, go, study']],
 shortAnswers:['Does he work here?','Yes, he does.','No, he does not. / No, he doesn’t.','En respuestas cortas repetimos do/does/did, no el verbo principal.'],
 rules:[
  ['La -s pasa al auxiliar','She works → Does she work? No Does she works?'],
  ['El pasado pasa al auxiliar','They went → Did they go? No Did they went?'],
  ['No uses do con be o modales','Are you ready? / Can you swim? No Do you be ready? / Do you can swim?'],
  ['Do puede aparecer dos veces','Do you do exercise? El primero es auxiliar; el segundo significa “hacer”.']
 ],
 markers:[['do / does','apoyo del presente simple'],['did','apoyo del pasado simple'],["don't / doesn't / didn't",'contracciones negativas'],['do + verbo en afirmativa','énfasis']],
 contrast:{id:'be-auxiliary',title:'DO-support o inversión directa',pairs:[['Does she work here?','¿Ella trabaja aquí?','Work no es auxiliar: necesitamos does.'],['Is she working here?','¿Ella está trabajando aquí?','Is ya es auxiliar: se invierte directamente.']],note:'Antes de usar do, comprueba si la oración ya contiene be, have auxiliar o un modal.'},
 mistakes:[['Does she works here?','Does she work here?','Does lleva la marca de tercera persona; work vuelve a la forma base.'],['Did they went home?','Did they go home?','Did marca el pasado; go debe quedar en forma base.']],
 practice:[
  {prompt:'Completa: ___ she speak English?',choices:['Does','Is','Has'],answer:0,explanation:'Speak está en present simple sin otro auxiliar: usa does con she.'},
  {prompt:'Completa: They did not ___ yesterday.',choices:['worked','work','working'],answer:1,explanation:'Después de did usa la forma base work.'},
  {prompt:'Elige la oración con énfasis gramatical correcto.',choices:['I do understand you.','I do understands you.','I am understand you.'],answer:0,explanation:'Do + verbo base puede reforzar una afirmación.'},
  {prompt:'Corrige: Did Ana called you?',answers:['Did Ana call you?'],explanation:'Did ya marca pasado; el verbo principal queda en forma base call.'}
 ],sources:['cambridgeAux','bcQuestions']
},
{
 id:'can-could',group:'ability-permission',title:'CAN & COULD',spanish:'Can y could',summary:'Habilidad, posibilidad, permiso y peticiones.',
 definition:['Can y could son auxiliares modales. Can suele expresar capacidad o posibilidad actual y también se usa para pedir o dar permiso. Could puede expresar capacidad pasada general, posibilidad menos segura y peticiones más indirectas o corteses.','Como otros modales, can y could no cambian con he/she/it y van seguidos de un verbo base sin to: She can swim; He could help. Para negar usamos cannot/can’t y could not/couldn’t. Para preguntar, el modal va antes del sujeto.'],
 timeline:['Elige can o could según significado','Coloca el modal antes del verbo base','Para pregunta, mueve el modal antes del sujeto'],
 uses:[
  ['Habilidad','Can habla de capacidad presente; could puede describir capacidad general pasada.','She can drive, and she could swim at five.','Ella sabe conducir y podía nadar a los cinco años.'],
  ['Peticiones y permiso','Can es directo y normal; could suele sonar más indirecto en peticiones.','Could you open the window?','¿Podrías abrir la ventana?'],
  ['Posibilidad','Can expresa posibilidad general; could puede presentar una posibilidad concreta o menos segura.','It could rain later.','Podría llover más tarde.']
 ],
 forms:[
  ['Afirmativa','Sujeto + can / could + verbo base','She can swim.','Ella sabe nadar.'],
  ['Negativa','Sujeto + cannot / can’t / could not / couldn’t + verbo base','She cannot swim.','Ella no sabe nadar.'],
  ['Pregunta','Can / Could + sujeto + verbo base?','Could you help me?','¿Podrías ayudarme?'],
  ['Pregunta con WH','WH + can / could + sujeto + verbo base?','How can I help?','¿Cómo puedo ayudar?']
 ],
 agreement:[['todos los sujetos','can / could + verbo base'],['tercera persona','he can work, no he cans work'],['infinitivo posterior','sin to: can go, could study'],['forma negativa','cannot / can’t · could not / couldn’t']],
 shortAnswers:['Can she drive?','Yes, she can.','No, she cannot. / No, she can’t.','La respuesta corta repite can o could, según la pregunta.'],
 rules:[
  ['Sin -s','He can swim, no He cans swim.'],
  ['Sin to','They could come, no They could to come.'],
  ['No uses do','Can you help? no Do you can help?'],
  ['Capacidad en otros tiempos','Para tiempos donde can no tiene forma adecuada, suele usarse be able to: I will be able to go.']
 ],
 markers:[['can','capacidad, permiso o posibilidad'],['could','capacidad pasada, posibilidad o petición más indirecta'],['can’t','imposibilidad o falta de capacidad; también prohibición según contexto'],['be able to','alternativa para otros tiempos']],
 contrast:{id:'may-might',title:'Capacidad y posibilidad: CAN/COULD frente a MAY/MIGHT',pairs:[['She can solve the problem.','Ella puede resolver el problema.','Can expresa capacidad.'],['She might solve the problem today.','Puede que resuelva el problema hoy.','Might expresa posibilidad, no capacidad.']],note:'La traducción española “poder” puede ocultar funciones distintas en inglés.'},
 mistakes:[['She can to swim.','She can swim.','Can va seguido de verbo base sin to.'],['Does he can come?','Can he come?','Can ya es auxiliar y se invierte con el sujeto.']],
 practice:[
  {prompt:'Completa: He ___ speak three languages.',choices:['can','cans','can to'],answer:0,explanation:'Can no cambia con he y va seguido de la forma base speak.'},
  {prompt:'Elige la petición más indirecta.',choices:['Could you help me?','You help me?','Do you can help me?'],answer:0,explanation:'Could you…? es una forma normal y cortés de hacer una petición.'},
  {prompt:'Completa: When I was six, I ___ read simple stories.',choices:['could','can','could to'],answer:0,explanation:'Could puede describir capacidad general en el pasado.'},
  {prompt:'Corrige: She can drives at night.',answers:['She can drive at night.'],explanation:'Después de can usa drive, sin -s.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'may-might',group:'ability-permission',title:'MAY & MIGHT',spanish:'May y might',summary:'Posibilidad, permiso y grados de seguridad.',
 definition:['May y might son modales que suelen expresar posibilidad. En muchos contextos ambos indican que algo es posible, mientras que might puede sonar más tentativo. May también aparece para pedir o conceder permiso, sobre todo en registros formales.','Van seguidos de verbo base sin to y no usan do para preguntar o negar. May not y might not significan que algo quizá no ocurra. En cambio, must not expresa prohibición; no confundas esos significados.'],
 timeline:['Evalúa si hablas de posibilidad o permiso','Elige may / might según el matiz','Usa verbo base y sin do-support'],
 uses:[
  ['Posibilidad presente o futura','Expresan que algo es posible, no seguro.','We might arrive late.','Puede que lleguemos tarde.'],
  ['Permiso formal','May puede pedir o conceder permiso.','May I come in?','¿Puedo entrar?'],
  ['Posibilidad negativa','May not / might not indican que quizá algo no suceda.','She might not know the answer.','Puede que ella no sepa la respuesta.']
 ],
 forms:[
  ['Afirmativa','Sujeto + may / might + verbo base','It may rain later.','Puede que llueva más tarde.'],
  ['Negativa','Sujeto + may not / might not + verbo base','It might not rain.','Puede que no llueva.'],
  ['Pregunta','May + sujeto + verbo base? (permiso formal)','May I sit here?','¿Puedo sentarme aquí?'],
  ['Pregunta con WH','WH + might + sujeto + verbo base?','When might they arrive?','¿Cuándo podrían llegar?']
 ],
 agreement:[['todos los sujetos','may / might + verbo base'],['sin tercera persona -s','she may come'],['negación','may not · might not'],['permiso formal','May I…?']],
 shortAnswers:['May I come in?','Yes, you may.','No, you may not.','En conversación, las respuestas de permiso pueden variar según el tono; la estructura muestra cómo se comporta el modal.'],
 rules:[
  ['Sin to','It might rain, no It might to rain.'],
  ['Sin do','May I ask? no Do I may ask?'],
  ['May not no es must not','You may not know significa “quizá no sepas”; You must not enter significa “no debes entrar”.'],
  ['El grado de certeza depende del contexto','No existe un porcentaje fijo universal para may o might. El contexto y la entonación importan.']
 ],
 markers:[['perhaps / maybe','pueden acompañar ideas de posibilidad'],['may / might','posibilidad'],['May I…?','permiso formal'],['might not','posibilidad negativa']],
 contrast:{id:'must',title:'Posibilidad o deducción fuerte',pairs:[['She might be at home.','Puede que esté en casa.','La conclusión es posible pero incierta.'],['She must be at home.','Debe de estar en casa.','El hablante presenta una deducción fuerte.']],note:'Must no siempre significa obligación; también puede expresar una conclusión muy segura.'},
 mistakes:[['She might to come later.','She might come later.','Después de might usa verbo base sin to.'],['Do I may leave early?','May I leave early?','May se coloca directamente delante del sujeto en esta pregunta de permiso.']],
 practice:[
  {prompt:'Completa: It ___ rain tonight; take an umbrella.',choices:['might','does','is'],answer:0,explanation:'Might + verbo base expresa posibilidad.'},
  {prompt:'Elige la pregunta formal de permiso.',choices:['May I use your phone?','Do I may use your phone?','May I to use your phone?'],answer:0,explanation:'May I + verbo base es el patrón correcto.'},
  {prompt:'¿Qué significa mejor She might not come?',choiceLang:'es',choices:['Tiene prohibido venir.','Puede que no venga.','No sabe venir.'],answer:1,explanation:'Might not expresa una posibilidad negativa.'},
  {prompt:'Corrige: They may arrives tomorrow.',answers:['They may arrive tomorrow.'],explanation:'Después de may usa la forma base arrive.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'must',group:'obligation-advice',title:'MUST',spanish:'Must',summary:'Obligación fuerte, prohibición y deducciones.',
 definition:['Must es un modal que puede expresar una obligación fuerte o una necesidad que el hablante presenta como importante: You must wear a seat belt. También puede expresar una deducción lógica fuerte: The lights are on; they must be home.','Must no cambia con el sujeto y va seguido de verbo base. La negativa must not / mustn’t normalmente significa prohibición, no ausencia de obligación. Para decir “no es necesario”, se usan estructuras como do not have to o need not.'],
 timeline:['Decide si expresas obligación o deducción','Usa must + verbo base','Distingue mustn’t de don’t have to'],
 uses:[
  ['Obligación fuerte','Presenta una regla, instrucción o necesidad importante.','You must wear your ID card.','Debes llevar tu identificación.'],
  ['Prohibición','Must not indica que una acción no está permitida.','You must not touch this button.','No debes tocar este botón.'],
  ['Deducción lógica','Expresa una conclusión que parece muy probable según la evidencia.','She has the key, so she must be the manager.','Ella tiene la llave, así que debe de ser la gerente.']
 ],
 forms:[
  ['Afirmativa','Sujeto + must + verbo base','You must leave now.','Debes irte ahora.'],
  ['Negativa','Sujeto + must not / mustn’t + verbo base','You must not park here.','No debes estacionarte aquí.'],
  ['Pregunta','Must + sujeto + verbo base?','Must we leave now?','¿Debemos irnos ahora?'],
  ['Pregunta con WH','WH + must + sujeto + verbo base?','Why must we leave?','¿Por qué debemos irnos?']
 ],
 agreement:[['todos los sujetos','must + verbo base'],['negación','must not / mustn’t'],['sin -s','he must go'],['pasado/futuro de obligación','a menudo had to / will have to']],
 shortAnswers:['Must we finish today?','Yes, you must.','No, you do not have to.','Cuando la respuesta significa “no es necesario”, don’t have to evita el sentido de prohibición de mustn’t.'],
 rules:[
  ['Mustn’t = prohibición','You mustn’t enter = está prohibido entrar.'],
  ['Don’t have to = no es necesario','You don’t have to come = puedes venir o no.'],
  ['Deducción negativa','Para una conclusión negativa fuerte sobre el presente suele usarse can’t: He can’t be serious. Mustn’t no suele cumplir esa función.'],
  ['Otros tiempos','Para obligaciones claramente pasadas o futuras, have to suele ser más flexible: I had to leave; I will have to study.']
 ],
 markers:[['must','obligación o deducción fuerte'],['mustn’t','prohibición'],['have to','obligación/necesidad flexible en tiempos'],["don't have to",'ausencia de necesidad']],
 contrast:{id:'have-to-need-to',title:'Prohibición y ausencia de necesidad',pairs:[['You mustn’t leave early.','No debes irte temprano.','Irte temprano está prohibido.'],["You don’t have to leave early.",'No tienes que irte temprano.','No es necesario; puedes quedarte o irte según el contexto.']],note:'Esta diferencia cambia el significado de forma importante.'},
 mistakes:[["You mustn't come if you're busy.","You don't have to come if you're busy.",'Si quieres decir “no es necesario venir”, usa don’t have to; mustn’t sonaría a prohibición.'],['He must goes now.','He must go now.','Después de must usa la forma base go.']],
 practice:[
  {prompt:'Completa una regla fuerte: You ___ wear a helmet.',choices:['must','must to','musts'],answer:0,explanation:'Must + verbo base expresa obligación.'},
  {prompt:'¿Qué expresa You mustn’t enter?',choiceLang:'es',choices:['No es necesario entrar.','Está prohibido entrar.','Quizá no entres.'],answer:1,explanation:'Mustn’t expresa prohibición.'},
  {prompt:'Elige “No tienes que venir mañana” con sentido de que no es necesario.',choices:["You mustn't come tomorrow.","You don't have to come tomorrow.","You don't must come tomorrow."],answer:1,explanation:'Don’t have to expresa ausencia de necesidad.'},
  {prompt:'Corrige: She must to finish today.',answers:['She must finish today.'],explanation:'Must va seguido de la forma base sin to.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'should-ought-to',group:'obligation-advice',title:'SHOULD & OUGHT TO',spanish:'Should y ought to',summary:'Consejos, expectativas y obligaciones menos fuertes.',
 definition:['Should se usa con frecuencia para dar consejos, expresar lo que consideramos correcto o hablar de una expectativa probable: You should rest; The bus should arrive soon. Ought to tiene significados similares, aunque es menos frecuente en muchas conversaciones.','Should va seguido directamente de verbo base. Ought es especial porque conserva to: You ought to rest. Las preguntas con should son comunes; las preguntas con ought to son posibles pero menos habituales y pueden sonar formales.'],
 timeline:['Decide si das consejo o expresas expectativa','Usa should + base u ought to + base','Ajusta la fuerza del mensaje al contexto'],
 uses:[
  ['Consejo','Recomienda una acción sin presentar necesariamente una orden.','You should drink more water.','Deberías beber más agua.'],
  ['Deber moral o conveniencia','Expresa lo que consideramos correcto.','People ought to respect each other.','Las personas deberían respetarse.'],
  ['Expectativa','Indica que algo probablemente ocurrirá según lo esperado.','The package should arrive tomorrow.','El paquete debería llegar mañana.']
 ],
 forms:[
  ['Afirmativa','Sujeto + should + verbo base / ought to + verbo base','You should rest.','Deberías descansar.'],
  ['Negativa','Sujeto + should not / shouldn’t + verbo base','You should not worry.','No deberías preocuparte.'],
  ['Pregunta','Should + sujeto + verbo base?','Should I call her?','¿Debería llamarla?'],
  ['Pregunta con WH','WH + should + sujeto + verbo base?','What should we do?','¿Qué deberíamos hacer?']
 ],
 agreement:[['todos los sujetos','should + verbo base'],['ought','ought to + verbo base'],['negación habitual','should not / shouldn’t'],['sin tercera persona -s','she should study']],
 shortAnswers:['Should I call now?','Yes, you should.','No, you should not. / No, you shouldn’t.','La respuesta corta usa should; no es necesario repetir el verbo principal.'],
 rules:[
  ['Should sin to','You should go, no You should to go.'],
  ['Ought con to','You ought to go. No elimines to en este patrón.'],
  ['Consejo no equivale siempre a obligación legal','Should suele ser más suave que must, aunque el contexto puede aumentar la fuerza.'],
  ['Should también expresa expectativa','The train should be here soon no es un consejo al tren; es una predicción basada en lo esperado.']
 ],
 markers:[['should','consejo o expectativa'],['shouldn’t','consejo negativo'],['ought to','deber / recomendación'],['probably / expected','pueden apoyar el sentido de expectativa']],
 contrast:{id:'must',title:'Consejo o obligación fuerte',pairs:[['You should wear a jacket.','Deberías llevar una chaqueta.','Es una recomendación.'],['You must wear a helmet.','Debes llevar casco.','Se presenta como obligación fuerte.']],note:'La fuerza no depende solo del modal; también del contexto y de quién habla.'},
 mistakes:[['You should to rest.','You should rest.','Should va seguido de forma base sin to.'],['She ought rest.','She ought to rest.','Ought requiere to antes del verbo base.']],
 practice:[
  {prompt:'Completa un consejo: You ___ see a doctor.',choices:['should','should to','shoulds'],answer:0,explanation:'Should + verbo base es el patrón correcto.'},
  {prompt:'Completa: You ought ___ apologize.',choices:['to','for','—'],answer:0,explanation:'Ought se construye con to + verbo base.'},
  {prompt:'Elige la expectativa correcta.',choices:['The bus should arrive soon.','The bus should arrives soon.','The bus should to arrive soon.'],answer:0,explanation:'Should + arrive; aquí expresa expectativa.'},
  {prompt:'Escribe en negativo: You should worry.',answers:['You should not worry.','You shouldn’t worry.'],explanation:'Añade not después de should; shouldn’t es la contracción.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'have-to-need-to',group:'obligation-advice',title:'HAVE TO & NEED TO',spanish:'Have to y need to',summary:'Necesidad y obligación con estructuras que usan do.',
 definition:['Have to y need to expresan necesidad u obligación, pero gramaticalmente no se comportan exactamente como los modales centrales. En presente y pasado simples suelen usar do/does/did para preguntas y negativas: Do you have to go? She doesn’t need to come.','Have to es muy útil porque puede cambiar de tiempo: had to, will have to, have had to. Need to también se conjuga como un verbo ordinario: needs to, needed to. La negativa don’t have to / don’t need to suele expresar que algo no es necesario.'],
 timeline:['Elige have to o need to según el significado','Conjuga have/need según tiempo y sujeto','Usa do-support en preguntas y negativas simples'],
 uses:[
  ['Obligación externa o práctica','Have to suele presentar una exigencia de la situación, regla o circunstancia.','I have to wear a uniform at work.','Tengo que usar uniforme en el trabajo.'],
  ['Necesidad','Need to expresa que una acción es necesaria.','We need to leave early.','Necesitamos salir temprano.'],
  ['Ausencia de necesidad','Don’t have to / don’t need to significa que una acción es opcional.','You don’t have to bring food.','No tienes que traer comida.']
 ],
 forms:[
  ['Afirmativa','Sujeto + have / has to + verbo base','She has to work today.','Ella tiene que trabajar hoy.'],
  ['Negativa','Sujeto + do / does not + have to + verbo base','She does not have to work today.','Ella no tiene que trabajar hoy.'],
  ['Pregunta','Do / Does + sujeto + have to + verbo base?','Does she have to work today?','¿Ella tiene que trabajar hoy?'],
  ['Pregunta con WH','WH + do / does + sujeto + have to + verbo base?','Why does she have to work?','¿Por qué tiene que trabajar?']
 ],
 agreement:[['I / you / we / they','have to / need to'],['he / she / it','has to / needs to'],['pasado','had to / needed to'],['futuro','will have to / will need to']],
 shortAnswers:['Does she have to go?','Yes, she does.','No, she does not. / No, she doesn’t.','La pregunta usa does porque have to aquí se comporta como una construcción léxica, no como must.'],
 rules:[
  ['Después de does vuelve have','Does she have to go? no Does she has to go?'],
  ['Después de did vuelve have/need','Did you have to leave? / Did you need to call?'],
  ['Negativa = no necesidad','You don’t have to go suele significar que ir es opcional, no que esté prohibido.'],
  ['Contrasta con must','Must no usa do-support; have to sí lo usa en presente/pasado simples.']
 ],
 markers:[['have to','obligación/necesidad'],['need to','necesidad'],["don't have to",'no es necesario'],['had to','obligación pasada']],
 contrast:{id:'must',title:'MUST y HAVE TO',pairs:[['You must leave now.','Debes irte ahora.','Modal: no usa to ni do-support.'],['You have to leave now.','Tienes que irte ahora.','Construcción con have to; puede conjugarse con más flexibilidad.']],note:'A menudo los significados se solapan, pero la gramática y algunos matices de fuente de la obligación pueden diferir.'},
 mistakes:[['Does she has to leave?','Does she have to leave?','Después de does usa have, no has.'],["You don't have to enter.","You mustn't enter.",'Si quieres expresar prohibición, don’t have to no basta: significa que no es necesario.']],
 practice:[
  {prompt:'Completa: She ___ to wear a uniform.',choices:['has','have','musts'],answer:0,explanation:'Con she, have to se convierte en has to.'},
  {prompt:'Elige la pregunta correcta.',choices:['Does he has to go?','Does he have to go?','Has he to go?'],answer:1,explanation:'Con does, have vuelve a su forma base.'},
  {prompt:'¿Qué significa You don’t need to come?',choiceLang:'es',choices:['Está prohibido venir.','No es necesario que vengas.','No puedes venir.'],answer:1,explanation:'Don’t need to expresa ausencia de necesidad.'},
  {prompt:'Escribe en pasado: I have to leave early.',answers:['I had to leave early.'],explanation:'El pasado de have to es had to.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'will-would',group:'future-politeness',title:'WILL & WOULD',spanish:'Will y would',summary:'Futuro, voluntad, hábitos pasados, condicionales y cortesía.',
 definition:['Will y would son auxiliares modales con varias funciones. Will aparece con frecuencia para decisiones, predicciones, promesas y disposición. Would se usa en situaciones hipotéticas, condicionales, peticiones corteses y hábitos repetidos del pasado, entre otros usos.','Ambos van seguidos de verbo base y no cambian con el sujeto. Las contracciones comunes son will → ’ll, will not → won’t y would → ’d, would not → wouldn’t. La forma ’d también puede representar had, así que el contexto y la forma verbal siguiente son importantes.'],
 timeline:['Determina si hablas de futuro, voluntad o hipótesis','Elige will / would','Mantén el verbo siguiente en forma base'],
 uses:[
  ['Futuro y decisiones','Will puede expresar una decisión tomada al hablar o una predicción.','I will call you tonight.','Te llamaré esta noche.'],
  ['Hipótesis y condicionales','Would presenta resultados imaginados o condicionados.','I would travel more if I had time.','Viajaría más si tuviera tiempo.'],
  ['Peticiones y hábitos','Would puede sonar cortés y también describir acciones repetidas en el pasado.','Would you help me, please?','¿Me ayudarías, por favor?']
 ],
 forms:[
  ['Afirmativa','Sujeto + will / would + verbo base','She will call later.','Ella llamará más tarde.'],
  ['Negativa','Sujeto + will not / won’t / would not / wouldn’t + verbo base','She won’t call tonight.','Ella no llamará esta noche.'],
  ['Pregunta','Will / Would + sujeto + verbo base?','Would you help me?','¿Me ayudarías?'],
  ['Pregunta con WH','WH + will / would + sujeto + verbo base?','When will they arrive?','¿Cuándo llegarán?']
 ],
 agreement:[['todos los sujetos','will / would + verbo base'],['contracción afirmativa de will',"I’ll / you’ll / he’ll / we’ll / they’ll"],['negación','won’t · wouldn’t'],['would contraído',"I’d / she’d: puede ser would o had según lo que sigue"]],
 shortAnswers:['Will they come?','Yes, they will.','No, they will not. / No, they won’t.','La respuesta corta conserva el modal de la pregunta.'],
 rules:[
  ['Will no lleva to','I will call, no I will to call.'],
  ['Would en condicionales','En un patrón común de segundo condicional, would aparece en el resultado: If I had time, I would travel.'],
  ['Would para hábitos pasados','When we were children, we would play outside every day. Este uso describe acciones repetidas, no estados permanentes.'],
  ['Distingue ’d','She’d finished = She had finished; She’d help = She would help. El verbo siguiente revela la función.']
 ],
 markers:[['will / ’ll','futuro, voluntad, decisión'],['won’t','will not'],['would','hipótesis, cortesía, hábito pasado'],['wouldn’t','would not']],
 contrast:{id:'shall',title:'WILL y SHALL en ofertas y futuro',pairs:[['Will you open the door?','¿Abrirás / puedes abrir la puerta?','Will puede preguntar por voluntad o hacer una petición.'],['Shall I open the door?','¿Abro la puerta?','Shall I…? suele funcionar como oferta o propuesta.']],note:'En el inglés actual, will es mucho más general; shall conserva usos específicos.'},
 mistakes:[['She will goes tomorrow.','She will go tomorrow.','Después de will usa la forma base go.'],['I would to help you.','I would help you.','Would va seguido directamente del verbo base.']],
 practice:[
  {prompt:'Completa: I ___ call you after class.',choices:['will','will to','wills'],answer:0,explanation:'Will + verbo base expresa futuro o decisión.'},
  {prompt:'Elige una petición cortés.',choices:['Would you help me?','Do you would help me?','Would you to help me?'],answer:0,explanation:'Would se invierte con el sujeto y va seguido de help.'},
  {prompt:'Completa el resultado hipotético: If I had more time, I ___ study French.',choices:['would','will to','would to'],answer:0,explanation:'Would + verbo base es una estructura típica en el resultado de un segundo condicional.'},
  {prompt:'Escribe la forma negativa contraída: She will not come.',answers:["She won't come.","She won’t come."],explanation:'Will not se contrae como won’t.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'shall',group:'future-politeness',title:'SHALL',spanish:'Shall',summary:'Ofertas, sugerencias y usos formales.',
 definition:['Shall es un auxiliar modal menos frecuente que will en el inglés cotidiano moderno, pero sigue siendo importante. Shall I…? se usa para ofrecerse a hacer algo y Shall we…? para proponer una acción conjunta.','En textos formales, jurídicos o normativos, shall puede aparecer con sentidos específicos de obligación o disposición futura. Esos usos dependen del registro y no deben trasladarse mecánicamente a la conversación común. Como modal, shall va seguido de verbo base y no usa do-support.'],
 timeline:['Reconoce el registro y la intención','Usa Shall I…? para ofertas o Shall we…? para propuestas','En conversación general, evita sustituir automáticamente will por shall'],
 uses:[
  ['Ofertas','Shall I…? pregunta si el hablante debe hacer algo por otra persona.','Shall I carry your bag?','¿Te llevo la bolsa?'],
  ['Sugerencias conjuntas','Shall we…? propone una acción para el grupo.','Shall we start?','¿Empezamos?'],
  ['Registro formal','Puede aparecer en documentos con significados definidos por ese registro.','The tenant shall pay the rent on the first day of each month.','El arrendatario deberá pagar el alquiler el primer día de cada mes.']
 ],
 forms:[
  ['Afirmativa','Sujeto + shall + verbo base (formal / específico)','We shall continue.','Continuaremos.'],
  ['Negativa','Sujeto + shall not / shan’t + verbo base','We shall not continue.','No continuaremos.'],
  ['Pregunta','Shall + I / we + verbo base?','Shall we begin?','¿Empezamos?'],
  ['Pregunta con WH','WH + shall + I / we + verbo base?','Where shall we meet?','¿Dónde nos encontramos?']
 ],
 agreement:[['oferta frecuente','Shall I + verbo base?'],['sugerencia frecuente','Shall we + verbo base?'],['formal','shall + verbo base'],['negación','shall not; shan’t existe pero es menos común en muchos contextos']],
 shortAnswers:['Shall we start?','Yes, let’s.','No, let’s wait a little.','Las propuestas con Shall we…? suelen responderse de forma natural con expresiones como Let’s…, no necesariamente con una respuesta corta de auxiliar.'],
 rules:[
  ['Sin do-support','Shall we go? no Do we shall go?'],
  ['Sin to','Shall I call? no Shall I to call?'],
  ['Uso moderno específico','No necesitas usar shall para todo el futuro con I/we; will es normal en una gran variedad de contextos.'],
  ['Textos legales','El valor de shall en documentos puede depender de convenciones jurídicas o de estilo; interpreta ese uso dentro de su documento.']
 ],
 markers:[['Shall I…?','oferta'],['Shall we…?','sugerencia'],['shall not','negación formal'],['legal / formal','registro donde puede aparecer con otros matices']],
 contrast:{id:'will-would',title:'Oferta o pregunta sobre voluntad',pairs:[['Shall I close the window?','¿Cierro la ventana?','El hablante ofrece hacer la acción.'],['Will you close the window?','¿Cerrarías / cierras la ventana?','Se pide que la otra persona haga la acción.']],note:'El sujeto y la intención cambian el sentido pragmático.'},
 mistakes:[['Do we shall start?','Shall we start?','Shall ya es auxiliar y se coloca delante del sujeto.'],['Shall we to go now?','Shall we go now?','Después de shall usa verbo base sin to.']],
 practice:[
  {prompt:'Elige una sugerencia conjunta.',choices:['Shall we take a break?','Do we shall take a break?','Shall we to take a break?'],answer:0,explanation:'Shall we + verbo base es una forma típica de sugerencia.'},
  {prompt:'Elige una oferta del hablante.',choices:['Shall I open the door?','Will you open the door?','Do I shall open the door?'],answer:0,explanation:'Shall I…? puede ofrecer que el hablante realice la acción.'},
  {prompt:'Completa: Where ___ we meet?',choices:['shall','do shall','shall to'],answer:0,explanation:'WH + shall + sujeto + verbo base.'},
  {prompt:'Corrige: Shall we to begin?',answers:['Shall we begin?'],explanation:'Elimina to; los modales van seguidos de la forma base.'}
 ],sources:['bcModals','cambridgeModality']
},
{
 id:'modal-questions-negatives',group:'advanced',title:'Modal Questions & Negatives',spanish:'Preguntas y negativas con modales',summary:'Orden de palabras, not, contracciones y respuestas cortas.',
 definition:['Los modales centrales forman preguntas y negativas sin do-support. Para una pregunta, coloca el modal antes del sujeto: Can she come? Para una negativa, coloca not después del modal: She cannot come. Este patrón es una de las diferencias clave entre los modales y la mayoría de los verbos léxicos.','En una cadena verbal, el modal suele ocupar la primera posición auxiliar: She might have been waiting. Ese primer auxiliar es el que se mueve delante del sujeto o recibe not: Might she have been waiting? / She might not have been waiting.'],
 timeline:['Localiza el primer auxiliar modal','Invierte modal + sujeto para preguntar','Coloca not después del modal para negar'],
 uses:[
  ['Preguntas sí/no','El modal se coloca antes del sujeto.','Can they join us?','¿Pueden acompañarnos?'],
  ['Preguntas con WH','La palabra interrogativa va antes del modal, salvo patrones especiales de sujeto.','Why should we wait?','¿Por qué deberíamos esperar?'],
  ['Negativas y respuestas cortas','Not sigue al modal y el modal se reutiliza en la respuesta.','No, they cannot.','No, no pueden.']
 ],
 forms:[
  ['Afirmativa','Sujeto + modal + verbo base','She might come.','Puede que ella venga.'],
  ['Negativa','Sujeto + modal + not + verbo base','She might not come.','Puede que ella no venga.'],
  ['Pregunta','Modal + sujeto + verbo base?','Might she come?','¿Podría venir?'],
  ['Pregunta con WH','WH + modal + sujeto + verbo base?','When might she come?','¿Cuándo podría venir?']
 ],
 agreement:[['can','cannot / can’t'],['could','could not / couldn’t'],['should','should not / shouldn’t'],['will / would','won’t / wouldn’t'],['must','must not / mustn’t']],
 shortAnswers:['Could they help?','Yes, they could.','No, they could not. / No, they couldn’t.','La respuesta corta repite el modal. El significado puede cambiar si sustituyes un modal por otro.'],
 rules:[
  ['No uses do con un modal','Can she come? no Does she can come?'],
  ['El verbo principal permanece base','Should he study? no Should he studies?'],
  ['Not va después del modal','She may not come. En cadenas largas sigue siendo el primer auxiliar: She may not have finished.'],
  ['Preguntas por el sujeto pueden verse diferentes','Who can help? pregunta por el sujeto; no necesitas añadir otro sujeto después de can.']
 ],
 markers:[['modal + subject','orden típico de pregunta'],['modal + not','negación'],['WH + modal + subject','pregunta de información'],['Who + modal + verb','posible pregunta por el sujeto']],
 contrast:{id:'do-auxiliary',title:'Modales frente a DO-support',pairs:[['Can she drive?','¿Sabe conducir?','Can se invierte directamente.'],['Does she drive every day?','¿Conduce todos los días?','Drive necesita does en present simple.']],note:'Nunca combines ambos patrones sin una razón estructural.'},
 mistakes:[['Does she might come?','Might she come?','Might ya es el auxiliar interrogativo.'],['Why he should leave?','Why should he leave?','En una pregunta directa, should va antes del sujeto he.']],
 practice:[
  {prompt:'Elige la pregunta correcta.',choices:['Does she can help?','Can she help?','Can she helps?'],answer:1,explanation:'Can se coloca antes del sujeto y help queda en forma base.'},
  {prompt:'Completa la negativa: They ___ not be ready.',choices:['might','do might','might to'],answer:0,explanation:'Modal + not + verbo base.'},
  {prompt:'Elige la pregunta con WH correcta.',choices:['Why should we wait?','Why we should wait?','Why do we should wait?'],answer:0,explanation:'En pregunta directa: WH + modal + sujeto + verbo base.'},
  {prompt:'Corrige: He could not to come.',answers:['He could not come.','He couldn’t come.'],explanation:'Después de could (y not) el verbo principal sigue en forma base sin to.'}
 ],sources:['bcQuestions','cambridgeAux']
},
{
 id:'modal-perfect',group:'advanced',title:'Modal Perfects',spanish:'Modales perfectos',summary:'Should have, could have, might have y must have + participio.',
 definition:['Un modal perfect combina un modal con have + participio para mirar una situación anterior desde el presente u otro punto de referencia: should have called, might have left, must have forgotten. El modal aporta evaluación, posibilidad, deducción o crítica; have + participio sitúa la situación antes.','La estructura básica es modal + have + participio. Have no cambia a has después de un modal: She must have left, no must has left. Para negar, not va después del modal: She might not have seen it.'],
 timeline:['El hecho o posibilidad está en el pasado','El modal expresa la actitud actual hacia ese pasado','Usa modal + have + participio'],
 uses:[
  ['Consejo o crítica retrospectiva','Should have presenta algo que habría sido recomendable.','You should have called me.','Deberías haberme llamado.'],
  ['Posibilidad pasada','Could have / might have presentan posibilidades sobre el pasado.','They might have missed the bus.','Puede que hayan perdido el autobús.'],
  ['Deducción sobre el pasado','Must have expresa una conclusión fuerte sobre lo que ocurrió.','She must have forgotten the meeting.','Debe de haberse olvidado de la reunión.']
 ],
 forms:[
  ['Afirmativa','Sujeto + modal + have + participio','He must have left.','Debe de haberse ido.'],
  ['Negativa','Sujeto + modal + not + have + participio','He might not have left.','Puede que no se haya ido.'],
  ['Pregunta','Modal + sujeto + have + participio?','Could she have known?','¿Podría haberlo sabido?'],
  ['Pregunta con WH','WH + modal + sujeto + have + participio?','What should we have done?','¿Qué deberíamos haber hecho?']
 ],
 agreement:[['should have + participio','consejo/evaluación pasada'],['could have + participio','posibilidad/capacidad no realizada según contexto'],['might have + participio','posibilidad pasada'],['must have + participio','deducción fuerte pasada']],
 shortAnswers:['Could she have known?','Yes, she could have.','No, she could not have. / No, she couldn’t have.','En respuestas elípticas puede mantenerse have para representar la construcción perfecta.'],
 rules:[
  ['Siempre have, no has','He must have gone, no He must has gone.'],
  ['Participio, no pasado simple','Could have gone, no could have went.'],
  ['Should have no cambia el pasado real','You should have called evalúa una acción anterior; no afirma automáticamente que la llamada ocurrió.'],
  ['Could have tiene varios matices','Puede hablar de posibilidad pasada o de una oportunidad/capacidad que no se realizó; el contexto decide.']
 ],
 markers:[['should have','recomendación o crítica retrospectiva'],['might / may have','posibilidad pasada'],['must have','deducción fuerte pasada'],['could have','posibilidad u oportunidad pasada']],
 contrast:{id:'should-ought-to',title:'Consejo actual o evaluación pasada',pairs:[['You should call her.','Deberías llamarla.','Consejo sobre ahora o el futuro.'],['You should have called her.','Deberías haberla llamado.','Evaluación de una acción anterior.']],note:'La inserción de have + participio desplaza la referencia hacia el pasado.'},
 mistakes:[['She must has left.','She must have left.','Después del modal usa have, no has.'],['They might have went home.','They might have gone home.','Después de have usa el participio gone.']],
 practice:[
  {prompt:'Completa: You should ___ called me.',choices:['have','has','had'],answer:0,explanation:'Modal perfect: should + have + participio.'},
  {prompt:'Completa: She must have ___ the message.',choices:['saw','seen','see'],answer:1,explanation:'Después de have necesitas el participio seen.'},
  {prompt:'Elige una posibilidad pasada.',choices:['They might have missed the train.','They might missed the train.','They might has missed the train.'],answer:0,explanation:'Might + have + participio expresa posibilidad pasada.'},
  {prompt:'Corrige: He could have went earlier.',answers:['He could have gone earlier.'],explanation:'El participio de go es gone.'}
 ],sources:['bcModals','cambridgeModality','perfect']
},
{
 id:'semi-modal-alternatives',group:'advanced',title:'Modal Alternatives',spanish:'Alternativas a los modales',summary:'Be able to, be allowed to y be supposed to para ampliar tiempo y significado.',
 definition:['El inglés usa construcciones que comparten significados con los modales pero se conjugan de manera más flexible. Be able to expresa capacidad; be allowed to expresa permiso; be supposed to puede expresar expectativa, obligación acordada o lo que se espera que ocurra.','Estas construcciones contienen be y, por tanto, cambian según tiempo y sujeto: am/is/are able to, was/were allowed to, will be able to. A diferencia de los modales centrales, aquí sí aparece to antes del verbo principal.'],
 timeline:['Elige la idea: capacidad, permiso o expectativa','Conjuga be en el tiempo necesario','Usa able/allowed/supposed + to + verbo base'],
 uses:[
  ['Capacidad en distintos tiempos','Be able to permite expresar capacidad cuando can/could no encaja.','I will be able to travel next month.','Podré viajar el próximo mes.'],
  ['Permiso en distintos tiempos','Be allowed to expresa que una acción está permitida.','We were allowed to leave early.','Nos permitieron salir temprano.'],
  ['Expectativas y deber acordado','Be supposed to expresa lo que se espera según una regla, plan o conocimiento compartido.','You are supposed to submit the form today.','Se supone que debes entregar el formulario hoy.']
 ],
 forms:[
  ['Afirmativa','Sujeto + be + able / allowed / supposed + to + verbo base','She is able to help.','Ella puede ayudar.'],
  ['Negativa','Sujeto + be + not + able / allowed / supposed + to + verbo base','She is not allowed to enter.','Ella no tiene permitido entrar.'],
  ['Pregunta','Be + sujeto + able / allowed / supposed + to + verbo base?','Are we allowed to park here?','¿Se nos permite estacionar aquí?'],
  ['Pregunta con WH','WH + be + sujeto + supposed + to + verbo base?','When are we supposed to arrive?','¿Cuándo se supone que debemos llegar?']
 ],
 agreement:[['presente singular','is able / allowed / supposed to'],['presente plural / you','are able / allowed / supposed to'],['pasado','was / were able / allowed / supposed to'],['futuro','will be able / allowed / supposed to']],
 shortAnswers:['Are we allowed to enter?','Yes, you are.','No, you are not. / No, you aren’t.','La respuesta corta repite be, porque be es el verbo finito de esta construcción.'],
 rules:[
  ['Aquí sí hay to','Can swim, pero be able to swim. No mezcles los patrones.'],
  ['Preguntas con be','Are you allowed to go? No Do you are allowed to go?'],
  ['Flexibilidad temporal','Will be able to y have been able to cubren tiempos que can no forma por sí solo.'],
  ['Supposed to no significa exactamente should en todos los casos','Puede describir una expectativa, un plan o una obligación entendida; el contexto determina el matiz.']
 ],
 markers:[['be able to','capacidad'],['be allowed to','permiso'],['be supposed to','expectativa / deber acordado'],['will be / have been','permiten ampliar el tiempo']],
 contrast:{id:'can-could',title:'Modal central o construcción alternativa',pairs:[['She can swim.','Ella sabe nadar.','Can es breve y directo para capacidad presente.'],['She will be able to swim after therapy.','Podrá nadar después de la terapia.','Be able to permite expresar capacidad futura de forma clara.']],note:'No son intercambiables en absolutamente todos los contextos, pero estas alternativas cubren huecos útiles.'},
 mistakes:[['She will can come.','She will be able to come.','Dos modales centrales no suelen acumularse así; be able to permite expresar capacidad futura.'],['Do we are allowed to leave?','Are we allowed to leave?','La construcción ya contiene be, así que la pregunta invierte are.']],
 practice:[
  {prompt:'Completa una capacidad futura: I will ___ able to help tomorrow.',choices:['be','am','can'],answer:0,explanation:'Después de will usa be: will be able to.'},
  {prompt:'Elige la pregunta de permiso correcta.',choices:['Are we allowed to enter?','Do we are allowed to enter?','Are we allowed enter?'],answer:0,explanation:'Be se invierte con el sujeto y allowed va seguido de to + verbo.'},
  {prompt:'Completa: You are supposed ___ arrive at nine.',choices:['to','for','—'],answer:0,explanation:'Be supposed to + verbo base.'},
  {prompt:'Corrige: She will can drive next year.',answers:['She will be able to drive next year.'],explanation:'Usa will be able to para expresar capacidad futura.'}
 ],sources:['bcModals','cambridgeModality','cambridgeAux']
}
];
const data={sources,lessons};
root.ENGLISH_AUXILIARY=data;
if(typeof module!=='undefined'&&module.exports)module.exports=data;
})(globalThis);
