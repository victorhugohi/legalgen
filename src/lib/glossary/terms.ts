import { GlossaryTerm, GlossaryCategory } from "./types";

export const GLOSSARY_TERMS: GlossaryTerm[] = ([
  // ===== A =====
  {
    id: "accion-pauliana",
    term: "Acción Pauliana",
    category: "obligaciones",
    simpleDefinition:
      "Recurso legal que permite a un acreedor anular actos del deudor que perjudiquen su capacidad de cobro, como cuando el deudor regala o vende sus bienes para no pagar.",
    legalDefinition:
      "Acción de impugnación que corresponde a los acreedores para obtener la revocación de los actos realizados por el deudor en fraude de sus derechos, cuando dichos actos disminuyen su patrimonio en perjuicio de los acreedores.",
    example:
      "El acreedor interpuso acción pauliana contra la donación que el deudor realizó a favor de su hermano, por considerar que fue realizada en fraude a sus derechos crediticios.",
    etymology: "Del latín 'actio Pauliana', atribuida al pretor romano Paulo.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["1446", "1447", "1448", "1449", "1450"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 15, articles: ["366"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 5, articles: ["1489"] },
    ],
    relatedTerms: ["fraude", "simulacion", "nulidad"],
  },
  {
    id: "alevosía",
    term: "Alevosía",
    category: "penal",
    simpleDefinition:
      "Actuar de forma traicionera, atacando a alguien que no puede defenderse o cuando no lo espera, lo que agrava un delito.",
    legalDefinition:
      "Circunstancia agravante que consiste en emplear medios, modos o formas en la ejecución del delito que tiendan directa y especialmente a asegurar su consumación, sin riesgo para el autor proveniente de la defensa de la víctima.",
    example:
      "Se calificó como homicidio agravado por alevosía, ya que el imputado atacó a la víctima mientras dormía, asegurando la ejecución del hecho sin posibilidad de defensa.",
    etymology: "Del árabe 'al-waziyya', que significa traición o perfidia.",
    lawPresence: [
      { law: "Código Penal", shortName: "CP", percentage: 90, articles: ["252", "40"] },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 10 },
    ],
    relatedTerms: ["dolo", "culpa"],
  },
  {
    id: "anticretico",
    term: "Anticrético / Anticresis",
    category: "derechos_reales",
    simpleDefinition:
      "Contrato típico boliviano donde una persona entrega dinero al propietario de un inmueble y a cambio puede vivir en él sin pagar alquiler. Al finalizar el plazo, se devuelve todo el dinero.",
    legalDefinition:
      "Derecho real de garantía por el cual el deudor entrega un inmueble a su acreedor para que este perciba los frutos del bien en compensación de los intereses del capital adeudado. En la práctica boliviana, funciona como un préstamo donde el uso del inmueble sustituye el pago de intereses.",
    example:
      "Por el presente contrato de anticrético, el propietario entrega el inmueble al anticresista, quien deposita la suma de $us. 15,000, monto que deberá ser devuelto íntegramente a la finalización del plazo de 2 años.",
    etymology: "Del griego 'anti' (en lugar de) y 'chresis' (uso). Literalmente: 'uso en lugar de' — el uso del inmueble reemplaza el pago de intereses.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 85, articles: ["1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1438", "1439", "1440"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 5 },
    ],
    relatedTerms: ["hipoteca", "prenda", "derecho-real"],
  },
  {
    id: "anulabilidad",
    term: "Anulabilidad",
    category: "obligaciones",
    simpleDefinition:
      "Un contrato o acto jurídico tiene un defecto que puede hacerlo inválido, pero solo si la persona afectada lo pide ante un juez. Mientras nadie lo impugne, el acto sigue siendo válido.",
    legalDefinition:
      "Sanción civil que afecta a los actos jurídicos que, reuniendo los elementos esenciales de validez, presentan algún vicio del consentimiento (error, dolo, violencia) o incapacidad relativa. A diferencia de la nulidad, el acto anulable produce efectos hasta que sea declarado inválido por sentencia judicial.",
    example:
      "El contrato de compraventa es anulable por haber sido celebrado bajo violencia moral ejercida sobre el vendedor, quien podrá demandar la anulabilidad dentro del plazo de cinco años conforme al Art. 556 del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["554", "555", "556", "557", "558"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15, articles: ["820"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["nulidad", "rescision", "resolucion", "dolo", "error-esencial"],
  },
  // ===== C =====
  {
    id: "caducidad",
    term: "Caducidad",
    category: "procesal",
    simpleDefinition:
      "Pérdida automática de un derecho o acción legal por no haberlo ejercido dentro del plazo fijado por ley. A diferencia de la prescripción, no se puede interrumpir ni suspender.",
    legalDefinition:
      "Extinción de un derecho o facultad por el transcurso del plazo perentorio e improrrogable establecido por ley para su ejercicio. Opera de pleno derecho, no admite interrupción ni suspensión, y puede ser declarada de oficio por el juez.",
    example:
      "La acción de anulabilidad caduca a los cinco años desde la celebración del contrato. Al haber transcurrido dicho plazo, el juez declaró la caducidad de la acción de oficio.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 40, articles: ["1514", "1515", "1516", "1517"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 35, articles: ["247", "248"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15 },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 10 },
    ],
    relatedTerms: ["prescripcion", "plazo", "perencion"],
  },
  {
    id: "caso-fortuito",
    term: "Caso Fortuito",
    category: "obligaciones",
    simpleDefinition:
      "Un evento imprevisto e inevitable, generalmente de origen humano (como un accidente industrial, una guerra), que impide cumplir una obligación. Exime de responsabilidad al deudor.",
    legalDefinition:
      "Acontecimiento imprevisto e irresistible, no imputable al deudor, que hace imposible el cumplimiento de la obligación. Junto con la fuerza mayor, constituye una causa de exoneración de responsabilidad civil.",
    example:
      "El contratista quedó eximido de la multa por retraso en la entrega de la obra, al demostrarse que el caso fortuito del bloqueo de caminos impidió el transporte de materiales durante 45 días.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 60, articles: ["577", "578", "579"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20, articles: ["942"] },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 10 },
      { law: "Código Penal", shortName: "CP", percentage: 10 },
    ],
    relatedTerms: ["fuerza-mayor", "mora", "culpa"],
  },
  {
    id: "clausula-penal",
    term: "Cláusula Penal",
    category: "contratos",
    simpleDefinition:
      "Una multa o penalidad que se establece en un contrato para el caso de que una de las partes no cumpla. Es un monto acordado de antemano como indemnización.",
    legalDefinition:
      "Pacto accesorio por el cual las partes fijan anticipadamente el monto de la indemnización que deberá pagar quien incumpla la obligación principal. Puede ser reducida judicialmente si resulta excesiva conforme al Art. 534 del Código Civil.",
    example:
      "En caso de resolución anticipada del contrato por voluntad unilateral del arrendatario, este deberá pagar la cláusula penal equivalente a tres meses de canon de alquiler.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 70, articles: ["530", "531", "532", "533", "534", "535", "536", "537"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["mora", "resolucion", "incumplimiento"],
  },
  {
    id: "colacion",
    term: "Colación",
    category: "sucesiones",
    simpleDefinition:
      "Obligación de los herederos de traer a la masa hereditaria las donaciones o beneficios que recibieron en vida del difunto, para que se divida todo equitativamente.",
    legalDefinition:
      "Obligación que tienen los herederos forzosos de reintegrar a la masa hereditaria el valor de las liberalidades recibidas del causante en vida, a fin de igualar las cuotas hereditarias y proteger la legítima de los coherederos.",
    example:
      "El heredero Juan deberá colacionar la suma de $us. 20,000 que recibió de su padre en vida como anticipo de herencia, para que la división entre todos los herederos sea equitativa.",
    etymology: "Del latín 'collatio', acción de reunir o juntar.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 90, articles: ["1254", "1255", "1256", "1257", "1258", "1259"] },
      { law: "Código de las Familias", shortName: "CF", percentage: 10 },
    ],
    relatedTerms: ["legitima", "herencia", "donacion"],
  },
  {
    id: "cosa-juzgada",
    term: "Cosa Juzgada",
    category: "procesal",
    simpleDefinition:
      "Cuando un juez ya dictó sentencia firme sobre un caso, ese mismo asunto no puede volver a ser juzgado. La decisión es definitiva e inamovible.",
    legalDefinition:
      "Efecto que produce la sentencia firme que impide que el mismo asunto sea nuevamente objeto de proceso judicial entre las mismas partes. Tiene dos manifestaciones: formal (inimpugnabilidad de la resolución) y material (imposibilidad de un nuevo proceso sobre el mismo objeto).",
    example:
      "El demandado opuso la excepción de cosa juzgada, demostrando que el mismo litigio entre las mismas partes ya fue resuelto por sentencia ejecutoriada dictada por el Juzgado Tercero Civil.",
    etymology: "Del latín 'res iudicata', cosa juzgada o decidida.",
    lawPresence: [
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 50, articles: ["228", "229"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 20, articles: ["117"] },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 20, articles: ["4"] },
      { law: "Código Civil", shortName: "CC", percentage: 10 },
    ],
    relatedTerms: ["litispendencia", "prescripcion", "sentencia"],
  },
  {
    id: "culpa",
    term: "Culpa",
    category: "obligaciones",
    simpleDefinition:
      "Causar un daño por negligencia, imprudencia o descuido, sin haberlo querido hacer. Es diferente del dolo, donde sí hay intención de dañar.",
    legalDefinition:
      "Omisión de la diligencia debida en el cumplimiento de una obligación o en la realización de un acto. Se clasifica en culpa grave (negligencia extrema), culpa leve (falta de diligencia ordinaria) y culpa levísima (falta de diligencia máxima). El grado de culpa determina la extensión de la responsabilidad.",
    example:
      "El médico fue declarado responsable por culpa grave, al haberse demostrado que omitió los procedimientos mínimos de diagnóstico establecidos por el protocolo, causando daño irreversible al paciente.",
    etymology: "Del latín 'culpa', falta o negligencia.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 45, articles: ["984", "985", "986", "987"] },
      { law: "Código Penal", shortName: "CP", percentage: 35, articles: ["15", "270"] },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 10 },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
    ],
    relatedTerms: ["dolo", "caso-fortuito", "fuerza-mayor", "responsabilidad-civil"],
  },
  // ===== D =====
  {
    id: "derecho-real",
    term: "Derecho Real",
    category: "derechos_reales",
    simpleDefinition:
      "Poder directo que tiene una persona sobre una cosa (un terreno, una casa, un auto). A diferencia de un derecho personal, se puede hacer valer contra cualquier persona, no solo contra alguien específico.",
    legalDefinition:
      "Poder jurídico que se ejerce directa e inmediatamente sobre una cosa, oponible erga omnes (frente a todos). Los derechos reales reconocidos por el Código Civil boliviano son: propiedad, usufructo, uso y habitación, servidumbre, hipoteca, prenda y anticresis.",
    example:
      "La inscripción en Derechos Reales confiere al comprador un derecho real de propiedad oponible frente a terceros, conforme al Art. 1538 del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["74", "75", "100", "1538"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 15, articles: ["56", "57"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
    ],
    relatedTerms: ["anticretico", "hipoteca", "prenda", "usufructo", "usucapion"],
  },
  {
    id: "desahucio",
    term: "Desahucio",
    category: "laboral",
    simpleDefinition:
      "Indemnización de 3 meses de salario que el empleador debe pagar al trabajador cuando lo despide sin una causa justificada por ley.",
    legalDefinition:
      "Indemnización equivalente a tres meses de salario que corresponde al trabajador en caso de despido injustificado, conforme a la Ley General del Trabajo. Es independiente y acumulable con la indemnización por tiempo de servicios.",
    example:
      "Al haber sido despedido sin justa causa después de 5 años de servicio, el trabajador tiene derecho al desahucio de tres meses de salario más la indemnización por los cinco años trabajados.",
    lawPresence: [
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 70, articles: ["12", "13"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 20, articles: ["49"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["indemnizacion", "despido"],
  },
  {
    id: "dolo",
    term: "Dolo",
    category: "obligaciones",
    simpleDefinition:
      "Engaño deliberado o intención de causar daño. En contratos, es cuando alguien engaña a la otra parte para que firme. En lo penal, es actuar con plena intención de cometer el delito.",
    legalDefinition:
      "En materia civil: artificio o maquinación empleada para engañar a una persona e inducirla a celebrar un acto jurídico que no habría realizado de conocer la verdad (vicio del consentimiento). En materia penal: voluntad deliberada de cometer un delito a sabiendas de su ilicitud.",
    example:
      "El contrato de compraventa fue anulado por dolo, al demostrarse que el vendedor ocultó deliberadamente los vicios estructurales del inmueble que hacían inhabitable la propiedad.",
    etymology: "Del latín 'dolus', engaño o fraude.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 40, articles: ["482", "483", "484"] },
      { law: "Código Penal", shortName: "CP", percentage: 40, articles: ["14", "15"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["culpa", "error-esencial", "anulabilidad", "fraude"],
  },
  {
    id: "donacion",
    term: "Donación",
    category: "contratos",
    simpleDefinition:
      "Dar algo gratis a otra persona, de forma voluntaria. Para bienes inmuebles, debe hacerse ante notario. Puede revocarse si el que recibió es ingrato.",
    legalDefinition:
      "Contrato por el cual una persona (donante) transfiere gratuitamente a otra (donatario) la propiedad de un bien o derecho. Requiere la aceptación expresa del donatario. La donación de inmuebles debe realizarse por escritura pública bajo pena de nulidad.",
    example:
      "La donación del terreno a favor de la hija fue registrada mediante escritura pública No. 245/2025, requiriéndose la aceptación expresa de la donataria conforme al Art. 667 del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["655", "656", "657", "658", "659", "660", "661", "667", "673", "676", "679", "684"] },
      { law: "Código de las Familias", shortName: "CF", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10 },
    ],
    relatedTerms: ["colacion", "legitima", "herencia"],
  },
  // ===== E =====
  {
    id: "endoso",
    term: "Endoso",
    category: "comercial",
    simpleDefinition:
      "Firmar al reverso de un cheque, pagaré o letra de cambio para transferirlo a otra persona. Es como 'pasar' el documento de cobro a alguien más.",
    legalDefinition:
      "Acto formal de transmisión de un título valor (letra de cambio, cheque, pagaré) mediante la firma del endosante en el reverso del documento, transfiriendo al endosatario todos los derechos emergentes del título.",
    example:
      "El beneficiario endosó la letra de cambio a favor de su proveedor, quien se constituyó en nuevo tenedor legítimo del título con todos los derechos de cobro.",
    etymology: "Del latín 'in dorsum', en la espalda/reverso del documento.",
    lawPresence: [
      { law: "Código de Comercio", shortName: "CCom", percentage: 85, articles: ["534", "535", "536", "537", "538", "539", "540"] },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
      { law: "Código Civil", shortName: "CC", percentage: 5 },
    ],
    relatedTerms: ["protesto", "titulo-valor", "letra-de-cambio"],
  },
  {
    id: "error-esencial",
    term: "Error Esencial",
    category: "obligaciones",
    simpleDefinition:
      "Equivocación grave sobre un aspecto fundamental del contrato (por ejemplo, creer que compras oro cuando en realidad es cobre). Puede causar la anulación del contrato.",
    legalDefinition:
      "Vicio del consentimiento que recae sobre la naturaleza del contrato, la identidad del objeto o las cualidades esenciales de la cosa o persona, de modo tal que, de haber conocido la verdad, la parte no habría celebrado el acto. Debe ser determinante y excusable.",
    example:
      "El comprador solicitó la anulabilidad del contrato por error esencial, al demostrarse que la superficie real del terreno era de 150 m² y no de 300 m² como se declaró en el contrato.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 85, articles: ["474", "475", "476", "477", "478"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["anulabilidad", "dolo", "nulidad"],
  },
  {
    id: "eviccion",
    term: "Evicción",
    category: "contratos",
    simpleDefinition:
      "Cuando un tercero reclama con éxito la propiedad del bien que te vendieron. El vendedor está obligado a responderte y compensarte por la pérdida.",
    legalDefinition:
      "Garantía legal por la cual el vendedor responde frente al comprador cuando este es privado total o parcialmente del bien adquirido, en virtud de un derecho anterior de un tercero reconocido judicialmente. Incluye la obligación de saneamiento.",
    example:
      "El vendedor queda obligado a la evicción y saneamiento de ley, garantizando al comprador la posesión legal, pacífica y útil del inmueble transferido, conforme a los Arts. 624 al 638 del Código Civil.",
    etymology: "Del latín 'evictio', de 'evincere', vencer en juicio.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["624", "625", "626", "627", "628", "629", "630", "631", "632", "633", "634", "635", "636", "637", "638"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15, articles: ["858"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["saneamiento", "vicios-ocultos", "compraventa"],
  },
  // ===== F =====
  {
    id: "fraude",
    term: "Fraude a los Acreedores",
    category: "obligaciones",
    simpleDefinition:
      "Cuando un deudor hace trampas para no pagar, como regalar sus bienes o venderlos a precios ridículos para quedarse 'sin nada' y así no poder ser cobrado.",
    legalDefinition:
      "Conducta del deudor que, mediante actos dispositivos de su patrimonio, busca colocarse en estado de insolvencia o agravar su situación patrimonial en perjuicio de sus acreedores. Legitima la interposición de la acción pauliana.",
    example:
      "Se demostró el fraude a los acreedores cuando el deudor transfirió todos sus inmuebles a familiares por un precio simbólico, tres días antes del vencimiento de su obligación crediticia.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 60, articles: ["1446", "1447", "1448"] },
      { law: "Código Penal", shortName: "CP", percentage: 25, articles: ["335", "336"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15, articles: ["1489", "1490"] },
    ],
    relatedTerms: ["accion-pauliana", "simulacion", "dolo"],
  },
  {
    id: "fuerza-mayor",
    term: "Fuerza Mayor",
    category: "obligaciones",
    simpleDefinition:
      "Un evento extraordinario e imposible de resistir, generalmente de la naturaleza (terremoto, inundación), que impide cumplir una obligación. Libera al deudor de responsabilidad.",
    legalDefinition:
      "Acontecimiento extraordinario, imprevisible e irresistible, generalmente proveniente de la naturaleza o de la autoridad pública, que imposibilita el cumplimiento de una obligación. Exonera al deudor de responsabilidad civil y penal.",
    example:
      "La empresa de transporte fue eximida de responsabilidad por la pérdida de la mercadería durante el derrumbe del camino, al calificarse como fuerza mayor por el deslizamiento causado por las lluvias extraordinarias.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 55, articles: ["577", "578", "579"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20, articles: ["942", "943"] },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 15, articles: ["16"] },
      { law: "Código Penal", shortName: "CP", percentage: 10 },
    ],
    relatedTerms: ["caso-fortuito", "mora", "culpa"],
  },
  // ===== H =====
  {
    id: "herencia",
    term: "Herencia",
    category: "sucesiones",
    simpleDefinition:
      "El conjunto de bienes, derechos y deudas que deja una persona al fallecer y que pasan a sus herederos. Incluye todo lo positivo y lo negativo.",
    legalDefinition:
      "Patrimonio del causante que se transmite por causa de muerte a sus sucesores. Comprende el activo (bienes y derechos) y el pasivo (deudas y obligaciones). La aceptación puede ser pura y simple o con beneficio de inventario.",
    example:
      "Los herederos aceptaron la herencia con beneficio de inventario, limitando así su responsabilidad por las deudas del causante al valor de los bienes recibidos.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 70, articles: ["1000", "1001", "1002", "1003", "1024", "1025"] },
      { law: "Código de las Familias", shortName: "CF", percentage: 15 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10, articles: ["56"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["legitima", "colacion", "donacion"],
  },
  {
    id: "hipoteca",
    term: "Hipoteca",
    category: "derechos_reales",
    simpleDefinition:
      "Garantía que se pone sobre un inmueble para respaldar una deuda. Si no se paga, el acreedor puede pedir que se remate el inmueble para cobrar. El dueño sigue usando el bien mientras paga.",
    legalDefinition:
      "Derecho real de garantía constituido sobre bienes inmuebles que permanecen en poder del deudor, para asegurar el cumplimiento de una obligación. Otorga al acreedor los derechos de persecución y preferencia sobre el bien hipotecado. Debe constituirse por escritura pública e inscribirse en Derechos Reales.",
    example:
      "Se constituyó hipoteca de primer grado sobre el inmueble del deudor, inscrita bajo la Partida No. 456 del Registro de Derechos Reales, en garantía del préstamo de $us. 80,000.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 65, articles: ["1360", "1361", "1362", "1363", "1364", "1378", "1393"] },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 20, articles: ["80", "81"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["anticretico", "prenda", "derecho-real", "eviccion"],
  },
  // ===== I =====
  {
    id: "incumplimiento",
    term: "Incumplimiento",
    category: "obligaciones",
    simpleDefinition:
      "No hacer lo que se prometió en un contrato. Puede ser total (no se hizo nada) o parcial (se hizo mal o incompleto). Genera derecho a exigir el cumplimiento o una indemnización.",
    legalDefinition:
      "Falta de ejecución de la prestación debida por el deudor, ya sea total o parcial, definitiva o temporal. Constituye el presupuesto fundamental para la resolución del contrato, la ejecución forzada o la indemnización de daños y perjuicios.",
    example:
      "Ante el incumplimiento del contratista que no concluyó la obra en el plazo pactado, el propietario ejerció la resolución del contrato conforme al Art. 568 del Código Civil, exigiendo además la indemnización por daños y perjuicios.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 55, articles: ["291", "339", "568", "569"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 15, articles: ["16"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["mora", "resolucion", "clausula-penal", "responsabilidad-civil"],
  },
  {
    id: "indemnizacion",
    term: "Indemnización",
    category: "obligaciones",
    simpleDefinition:
      "Dinero que se paga para compensar un daño causado. Puede ser por daño material (lo que se perdió económicamente) y por daño moral (sufrimiento emocional).",
    legalDefinition:
      "Resarcimiento económico al que tiene derecho quien ha sufrido un daño injusto, ya sea derivado del incumplimiento contractual (daño emergente y lucro cesante) o de un hecho ilícito extracontractual (responsabilidad civil). En materia laboral, comprende la indemnización por tiempo de servicios.",
    example:
      "El juez ordenó el pago de indemnización por daños y perjuicios que comprende el daño emergente de Bs. 50,000 y el lucro cesante de Bs. 30,000, más la actualización de valor a la fecha de pago.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 35, articles: ["344", "345", "984", "994"] },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 30, articles: ["13"] },
      { law: "Código Penal", shortName: "CP", percentage: 15, articles: ["38"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10, articles: ["113"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["incumplimiento", "responsabilidad-civil", "desahucio"],
  },
  // ===== L =====
  {
    id: "legitima",
    term: "Legítima",
    category: "sucesiones",
    simpleDefinition:
      "Porción de la herencia que por ley está reservada para los herederos forzosos (hijos, padres, cónyuge). El difunto no puede disponer libremente de esa parte, ni siquiera por testamento.",
    legalDefinition:
      "Porción de la herencia de la cual no puede disponer libremente el testador cuando tiene herederos forzosos (descendientes, ascendientes y cónyuge). En Bolivia, la legítima constituye las cuatro quintas partes (4/5) del patrimonio hereditario cuando existen herederos forzosos.",
    example:
      "La donación fue declarada inoficiosa por exceder la porción disponible, afectando la legítima de los herederos forzosos, quienes ejercieron la acción de reducción conforme al Art. 1059 del Código Civil.",
    etymology: "Del latín 'legitima portio', porción legítima.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 85, articles: ["1059", "1060", "1061", "1062", "1063", "1064", "1065", "1066"] },
      { law: "Código de las Familias", shortName: "CF", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 5 },
    ],
    relatedTerms: ["herencia", "colacion", "donacion"],
  },
  {
    id: "litispendencia",
    term: "Litispendencia",
    category: "procesal",
    simpleDefinition:
      "Cuando ya existe un juicio en curso sobre el mismo asunto entre las mismas personas. Si alguien intenta iniciar un segundo juicio igual, se puede pedir que se rechace.",
    legalDefinition:
      "Excepción procesal que procede cuando existe identidad de partes, objeto y causa entre un proceso en curso y otro que se pretende iniciar. Su finalidad es evitar la duplicidad de procesos y posibles sentencias contradictorias.",
    example:
      "El demandado opuso excepción de litispendencia al acreditar que el mismo cobro de deuda ya estaba siendo tramitado ante el Juzgado Segundo de Partido en lo Civil.",
    etymology: "Del latín 'lis pendens', litigio pendiente.",
    lawPresence: [
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 70, articles: ["128"] },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 20 },
      { law: "Código Civil", shortName: "CC", percentage: 10 },
    ],
    relatedTerms: ["cosa-juzgada", "prescripcion"],
  },
  // ===== M =====
  {
    id: "mora",
    term: "Mora",
    category: "obligaciones",
    simpleDefinition:
      "Retraso en cumplir una obligación después de que venció el plazo. Desde que alguien está 'en mora', empieza a correr intereses y puede generar responsabilidad por daños.",
    legalDefinition:
      "Retardo culpable en el cumplimiento de la obligación exigible. La mora del deudor (mora solvendi) se constituye mediante intimación o requerimiento judicial o extrajudicial, salvo los casos de mora automática previstos por ley. Genera la obligación de pagar intereses moratorios y responder por los daños sobrevenidos.",
    example:
      "El deudor fue constituido en mora mediante carta notariada, a partir de cuya fecha deberá pagar el interés moratorio del 3% mensual establecido en el contrato.",
    etymology: "Del latín 'mora', retraso o demora.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 60, articles: ["340", "341", "342", "343"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["incumplimiento", "clausula-penal", "prescripcion"],
  },
  // ===== N =====
  {
    id: "novacion",
    term: "Novación",
    category: "obligaciones",
    simpleDefinition:
      "Reemplazar una obligación vieja por una nueva. Es como borrar la deuda anterior y crear una completamente nueva, con condiciones diferentes.",
    legalDefinition:
      "Modo de extinción de las obligaciones por el cual una obligación anterior se sustituye por otra nueva, que la extingue y reemplaza. Puede ser objetiva (cambia la prestación), subjetiva (cambian las partes) o mixta. Requiere voluntad inequívoca de novar (animus novandi).",
    example:
      "Las partes acordaron la novación de la obligación original, sustituyendo el préstamo de $us. 10,000 con interés del 2% mensual, por un nuevo préstamo de $us. 8,000 sin interés pagadero en 12 cuotas.",
    etymology: "Del latín 'novatio', renovación o sustitución.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 85, articles: ["352", "353", "354", "355", "356", "357", "358"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 5 },
    ],
    relatedTerms: ["subrogacion", "cesion", "prescripcion"],
  },
  {
    id: "nulidad",
    term: "Nulidad",
    category: "obligaciones",
    simpleDefinition:
      "Un contrato o acto jurídico es completamente inválido desde el principio porque le falta algo esencial (por ejemplo, fue firmado por un menor o tiene un objeto ilícito). No puede ser 'arreglado'.",
    legalDefinition:
      "Sanción civil que priva de efectos jurídicos a un acto que carece de alguno de sus elementos esenciales o que transgrede una norma imperativa. A diferencia de la anulabilidad, la nulidad opera de pleno derecho, es imprescriptible y puede ser declarada de oficio por el juez.",
    example:
      "El contrato de compraventa fue declarado nulo por tener objeto ilícito, al haberse pactado la transferencia de un bien de dominio público que no es susceptible de apropiación privada.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 65, articles: ["546", "547", "548", "549", "550", "551", "552", "553"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 15, articles: ["105", "106", "107"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10 },
    ],
    relatedTerms: ["anulabilidad", "rescision", "resolucion"],
  },
  // ===== P =====
  {
    id: "perencion",
    term: "Perención de Instancia",
    category: "procesal",
    simpleDefinition:
      "Cuando un juicio se 'muere' porque ninguna de las partes lo impulsa durante un tiempo determinado. El juicio se archiva y se pierde lo avanzado en esa instancia.",
    legalDefinition:
      "Modo anormal de terminación del proceso por el transcurso del tiempo sin que las partes realicen actos procesales válidos que impulsen el procedimiento. Extingue la instancia pero no el derecho sustantivo, que podrá ejercerse en un nuevo proceso.",
    example:
      "Se declaró la perención de instancia del proceso ejecutivo, al haber transcurrido más de seis meses sin que el demandante realizara actuación procesal alguna para impulsar la causa.",
    lawPresence: [
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 85, articles: ["247", "248", "249", "250"] },
      { law: "Código Civil", shortName: "CC", percentage: 10 },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 5 },
    ],
    relatedTerms: ["caducidad", "prescripcion", "cosa-juzgada"],
  },
  {
    id: "plazo",
    term: "Plazo",
    category: "obligaciones",
    simpleDefinition:
      "El tiempo que se establece para que se cumpla o termine una obligación. Puede ser un plazo que beneficia al deudor, al acreedor, o a ambos.",
    legalDefinition:
      "Modalidad del acto jurídico que subordina la exigibilidad o la extinción de una obligación al vencimiento de un término cierto y futuro. Se distingue del término, que es el momento exacto de vencimiento, y de la condición, que depende de un evento incierto.",
    example:
      "El plazo para el pago del préstamo se fijó en 24 meses, computables desde la fecha de suscripción del contrato. El deudor podrá realizar pagos anticipados sin penalidad.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 55, articles: ["315", "316", "317", "318", "319"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 15 },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 10 },
    ],
    relatedTerms: ["caducidad", "prescripcion", "mora"],
  },
  {
    id: "prenda",
    term: "Prenda",
    category: "derechos_reales",
    simpleDefinition:
      "Entregar un bien mueble (joya, vehículo, maquinaria) como garantía de una deuda. Si no se paga, el acreedor puede vender el bien para cobrar.",
    legalDefinition:
      "Derecho real de garantía constituido sobre bienes muebles del deudor o de un tercero, que se entregan al acreedor o quedan en poder del constituyente (prenda sin desplazamiento), para asegurar el cumplimiento de una obligación. Otorga al acreedor prendario los derechos de retención y preferencia.",
    example:
      "El deudor constituyó prenda sobre su vehículo marca Toyota, placa 1234-ABC, inscrita en el RUAT, como garantía del préstamo de Bs. 50,000 otorgado por el acreedor.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 50, articles: ["1398", "1399", "1400", "1401", "1402", "1403", "1404"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 30, articles: ["876", "877", "878", "879"] },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 15 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["hipoteca", "anticretico", "derecho-real"],
  },
  {
    id: "prescripcion",
    term: "Prescripción",
    category: "obligaciones",
    simpleDefinition:
      "Pérdida o adquisición de derechos por el paso del tiempo. Si alguien no cobra una deuda en 5 años, pierde el derecho de cobrar (prescripción extintiva). Si alguien posee un terreno por 10 años, puede hacerse dueño (prescripción adquisitiva).",
    legalDefinition:
      "Institución jurídica por la cual el transcurso del tiempo produce la extinción de acciones y derechos (prescripción extintiva o liberatoria) o la adquisición de derechos reales (prescripción adquisitiva o usucapión). A diferencia de la caducidad, admite interrupción y suspensión.",
    example:
      "La acción de cobro de la deuda prescribió por haber transcurrido cinco años desde la fecha de vencimiento sin que el acreedor realizara acto alguno de interrupción, conforme al Art. 1507 del Código Civil.",
    etymology: "Del latín 'praescriptio', acción de escribir al inicio (referencia a la excepción que se anteponía en el derecho romano).",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 45, articles: ["1492", "1493", "1507", "1508", "1509", "1510", "1511", "1512", "1513"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 15 },
      { law: "Código Penal", shortName: "CP", percentage: 10, articles: ["101", "102"] },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 10, articles: ["120"] },
    ],
    relatedTerms: ["caducidad", "usucapion", "plazo", "mora"],
  },
  {
    id: "protesto",
    term: "Protesto",
    category: "comercial",
    simpleDefinition:
      "Acto formal que se hace ante notario cuando un cheque, letra de cambio o pagaré no es pagado. Es como dejar constancia oficial de que no te pagaron.",
    legalDefinition:
      "Acto solemne realizado mediante intervención notarial por el cual el tenedor de un título valor deja constancia del incumplimiento de la obligación contenida en el documento (falta de aceptación o falta de pago). Es requisito para conservar las acciones de regreso.",
    example:
      "El protesto de la letra de cambio fue levantado ante la Notaría de Fe Pública No. 15, al haber sido rechazado el pago por el librado al vencimiento del título.",
    lawPresence: [
      { law: "Código de Comercio", shortName: "CCom", percentage: 85, articles: ["564", "565", "566", "567", "568", "569", "570", "571"] },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["endoso", "titulo-valor", "letra-de-cambio"],
  },
  // ===== R =====
  {
    id: "rescision",
    term: "Rescisión",
    category: "contratos",
    simpleDefinition:
      "Dejar sin efecto un contrato válido porque una de las partes sufrió un perjuicio excesivo (por ejemplo, vendió algo a un precio muy inferior a su valor real).",
    legalDefinition:
      "Remedio jurídico que permite dejar sin efecto un contrato válidamente celebrado cuando produce una lesión patrimonial grave a una de las partes (lesión enorme). Procede cuando la desproporción entre las prestaciones excede la mitad del valor justo al tiempo del contrato.",
    example:
      "El vendedor demandó la rescisión del contrato de compraventa por lesión, al haberse demostrado que el precio pagado de $us. 15,000 era inferior a la mitad del valor real del inmueble tasado en $us. 80,000.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["561", "562", "563", "564", "565", "566", "567"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["nulidad", "anulabilidad", "resolucion"],
  },
  {
    id: "resolucion",
    term: "Resolución",
    category: "contratos",
    simpleDefinition:
      "Terminar un contrato porque la otra parte no cumplió con su obligación. Es diferente de la rescisión (que es por perjuicio) y de la nulidad (que es por defecto de origen).",
    legalDefinition:
      "Extinción del contrato bilateral por incumplimiento de una de las partes, que opera retroactivamente devolviendo las cosas al estado anterior a la celebración del contrato. Puede ser judicial (declarada por sentencia) o convencional (pactada mediante cláusula resolutoria expresa).",
    example:
      "El arrendador demandó la resolución del contrato de alquiler por falta de pago de tres mensualidades consecutivas, conforme a la cláusula novena del contrato y el Art. 568 del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 70, articles: ["568", "569", "570", "571", "572", "573"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 5 },
    ],
    relatedTerms: ["rescision", "nulidad", "incumplimiento", "clausula-penal"],
  },
  {
    id: "responsabilidad-civil",
    term: "Responsabilidad Civil",
    category: "obligaciones",
    simpleDefinition:
      "La obligación de reparar el daño que causaste a otra persona. Puede ser contractual (no cumpliste un contrato) o extracontractual (causaste daño sin contrato de por medio).",
    legalDefinition:
      "Obligación de reparar el daño causado a otro, ya sea por incumplimiento de una obligación contractual (responsabilidad contractual) o por un hecho ilícito no vinculado a un contrato (responsabilidad extracontractual o aquiliana). Comprende el daño emergente, el lucro cesante y, en su caso, el daño moral.",
    example:
      "Se declaró la responsabilidad civil extracontractual del conductor, condenándolo al pago de Bs. 120,000 por daño emergente y Bs. 80,000 por lucro cesante, conforme al Art. 984 del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 55, articles: ["984", "985", "986", "987", "988", "989", "994", "995"] },
      { law: "Código Penal", shortName: "CP", percentage: 15, articles: ["36", "37", "38", "39"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10, articles: ["113", "225"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 10 },
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 10 },
    ],
    relatedTerms: ["culpa", "dolo", "indemnizacion", "incumplimiento"],
  },
  // ===== S =====
  {
    id: "saneamiento",
    term: "Saneamiento",
    category: "contratos",
    simpleDefinition:
      "Obligación del vendedor de garantizar que el bien vendido no tiene defectos ocultos y que nadie va a reclamar su propiedad. Si falla, debe compensar al comprador.",
    legalDefinition:
      "Obligación legal del enajenante que comprende dos garantías: el saneamiento por evicción (garantía de posesión pacífica) y el saneamiento por vicios ocultos (garantía de utilidad del bien). Es una obligación inherente a todo contrato oneroso traslativo de dominio.",
    example:
      "El vendedor se obliga al saneamiento de ley, garantizando al comprador la posesión legal, pacífica y útil del inmueble, libre de vicios ocultos que disminuyan su valor o aptitud para el uso.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["624", "625", "629", "630", "639", "640", "641", "642", "643", "644", "645"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["eviccion", "vicios-ocultos", "compraventa"],
  },
  {
    id: "sentencia",
    term: "Sentencia",
    category: "procesal",
    simpleDefinition:
      "La decisión final del juez que resuelve un caso. Cuando ya no se puede apelar, se convierte en 'sentencia ejecutoriada' y es de cumplimiento obligatorio.",
    legalDefinition:
      "Resolución judicial que pone fin al proceso, pronunciándose sobre el fondo de la controversia, acogiendo o rechazando las pretensiones de las partes. Puede ser de primera instancia, de apelación o de casación. Cuando adquiere firmeza, produce el efecto de cosa juzgada.",
    example:
      "La sentencia de primera instancia declaró probada la demanda de resolución del contrato, ordenando la restitución del inmueble y el pago de daños y perjuicios por la suma de Bs. 45,000.",
    lawPresence: [
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 50, articles: ["210", "211", "212", "213", "214", "228"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 20, articles: ["115", "117", "180"] },
      { law: "Código de Procedimiento Penal", shortName: "CPP", percentage: 20, articles: ["360", "361", "362", "363"] },
      { law: "Código Civil", shortName: "CC", percentage: 10 },
    ],
    relatedTerms: ["cosa-juzgada", "litispendencia", "prescripcion"],
  },
  {
    id: "simulacion",
    term: "Simulación",
    category: "obligaciones",
    simpleDefinition:
      "Cuando se hace un contrato falso para engañar a terceros. Por ejemplo, hacer una 'venta' a un amigo que en realidad es ficticia, solo para esconder bienes de los acreedores.",
    legalDefinition:
      "Vicio del acto jurídico que se produce cuando las partes celebran un contrato aparente que no refleja su voluntad real. Puede ser absoluta (el contrato es completamente ficticio) o relativa (el contrato real se oculta tras uno aparente). Los terceros perjudicados pueden demandar la declaración de simulación.",
    example:
      "Se declaró la simulación absoluta del contrato de compraventa, al demostrarse que nunca existió precio real ni intención de transferir la propiedad, siendo el acto una maniobra para sustraer el inmueble de la acción de los acreedores.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["543", "544", "545"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Código Penal", shortName: "CP", percentage: 10, articles: ["335"] },
    ],
    relatedTerms: ["accion-pauliana", "fraude", "nulidad"],
  },
  {
    id: "subrogacion",
    term: "Subrogación",
    category: "obligaciones",
    simpleDefinition:
      "Cuando alguien paga la deuda de otro y adquiere todos los derechos que tenía el acreedor original. Es como 'ponerse en los zapatos' del acreedor.",
    legalDefinition:
      "Sustitución de una persona (subrogación personal) o de una cosa (subrogación real) en una relación jurídica. En la subrogación personal por pago, quien paga la deuda ajena se coloca en la posición del acreedor, adquiriendo todos sus derechos, acciones y garantías contra el deudor.",
    example:
      "El fiador que pagó la deuda quedó subrogado en los derechos del acreedor, pudiendo exigir al deudor principal el reembolso de la totalidad del monto pagado más los intereses y gastos.",
    etymology: "Del latín 'subrogatio', colocar en lugar de otro.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["363", "364", "365", "366", "367", "368", "369"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
    ],
    relatedTerms: ["novacion", "cesion", "fianza"],
  },
  // ===== T =====
  {
    id: "titulo-valor",
    term: "Título Valor",
    category: "comercial",
    simpleDefinition:
      "Documento que representa un derecho de cobro: cheques, pagarés, letras de cambio. El que tiene el documento, tiene el derecho de cobrar.",
    legalDefinition:
      "Documento necesario para ejercer el derecho literal y autónomo que en él se consigna. Los principales títulos valores son: la letra de cambio, el cheque, el pagaré, el bono, la acción societaria y el certificado de depósito. Se rigen por los principios de incorporación, literalidad, autonomía y legitimación.",
    example:
      "El pagaré constituye un título valor que otorga a su tenedor la acción ejecutiva para el cobro del monto consignado, conforme a los Arts. 541 y siguientes del Código de Comercio.",
    lawPresence: [
      { law: "Código de Comercio", shortName: "CCom", percentage: 80, articles: ["491", "492", "493", "494", "495", "496", "541"] },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
    ],
    relatedTerms: ["endoso", "protesto", "letra-de-cambio"],
  },
  // ===== U =====
  {
    id: "usucapion",
    term: "Usucapión",
    category: "derechos_reales",
    simpleDefinition:
      "Adquirir la propiedad de un terreno o inmueble por haberlo poseído de forma continua y pacífica durante muchos años (10 años en Bolivia). Es la forma de hacerse dueño por 'antigüedad'.",
    legalDefinition:
      "Modo originario de adquisición de la propiedad y otros derechos reales por la posesión continuada, pública, pacífica e ininterrumpida durante el tiempo establecido por ley. En Bolivia, la usucapión ordinaria requiere 5 años con justo título y buena fe; la extraordinaria requiere 10 años sin necesidad de título.",
    example:
      "El demandante acreditó haber poseído el terreno de manera continua, pacífica y de buena fe durante más de 10 años, por lo que el juez declaró la usucapión extraordinaria a su favor, ordenando la inscripción de su derecho propietario en Derechos Reales.",
    etymology: "Del latín 'usucapio', de 'usus' (uso) y 'capere' (tomar). Literalmente: adquirir por el uso.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["134", "135", "136", "137", "138"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10, articles: ["56", "57"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10, articles: ["375"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 5 },
    ],
    relatedTerms: ["prescripcion", "derecho-real", "posesion"],
  },
  {
    id: "usufructo",
    term: "Usufructo",
    category: "derechos_reales",
    simpleDefinition:
      "Derecho de usar un bien ajeno y disfrutar de sus beneficios (como cobrar alquileres o cosechar frutos), sin ser el dueño. Debe conservar el bien y devolverlo al final.",
    legalDefinition:
      "Derecho real de goce que confiere al usufructuario el uso y disfrute de un bien ajeno, con la obligación de conservar su forma y sustancia, salvo disposición contraria. Puede recaer sobre bienes muebles e inmuebles, y puede ser vitalicio o por plazo determinado.",
    example:
      "El padre donó la nuda propiedad del inmueble a su hijo, reservándose el usufructo vitalicio, de modo que podrá seguir habitando el departamento y percibiendo los alquileres durante toda su vida.",
    etymology: "Del latín 'usus fructus', uso de los frutos.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 85, articles: ["216", "217", "218", "219", "220", "221", "222", "223", "224", "242"] },
      { law: "Código de las Familias", shortName: "CF", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 5 },
    ],
    relatedTerms: ["derecho-real", "donacion", "herencia"],
  },
  // ===== V =====
  {
    id: "vicios-ocultos",
    term: "Vicios Ocultos",
    category: "contratos",
    simpleDefinition:
      "Defectos escondidos de un bien que no se pueden ver a simple vista al momento de la compra, pero que hacen que el bien no sirva o valga mucho menos de lo que se pagó.",
    legalDefinition:
      "Defectos materiales de la cosa vendida, existentes al momento de la venta pero no perceptibles mediante un examen ordinario, que la hacen impropia para su destino o disminuyen su utilidad de tal manera que el comprador no la habría adquirido o habría pagado un precio menor de haberlos conocido.",
    example:
      "El comprador ejerció la acción redhibitoria por vicios ocultos del inmueble, al descubrirse que la estructura presentaba daño estructural severo no visible en la inspección previa a la compra.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 80, articles: ["629", "630", "631", "632", "633", "634", "635", "636"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15, articles: ["858", "859"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["eviccion", "saneamiento", "compraventa"],
  },
  // ===== Additional terms =====
  {
    id: "cesion",
    term: "Cesión de Derechos",
    category: "obligaciones",
    simpleDefinition:
      "Transferir un derecho (como un crédito) a otra persona. Por ejemplo, si alguien te debe dinero, puedes ceder ese derecho de cobro a un tercero.",
    legalDefinition:
      "Contrato por el cual el acreedor (cedente) transfiere a un tercero (cesionario) el crédito u otro derecho que tiene contra su deudor (cedido). La cesión surte efectos frente al cedido desde que se le notifica o desde que este la acepta.",
    example:
      "El acreedor cedió su crédito de Bs. 100,000 a favor de la empresa financiera, notificándose al deudor conforme al Art. 384 del Código Civil para que el pago sea realizado al nuevo acreedor.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 70, articles: ["384", "385", "386", "387", "388", "389", "390"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
    ],
    relatedTerms: ["subrogacion", "novacion", "endoso"],
  },
  {
    id: "compraventa",
    term: "Compraventa",
    category: "contratos",
    simpleDefinition:
      "El contrato más básico y común: uno vende, otro compra. El vendedor entrega la cosa y el comprador paga el precio.",
    legalDefinition:
      "Contrato por el cual el vendedor se obliga a transferir la propiedad de una cosa o un derecho al comprador, quien se obliga a pagar un precio en dinero. Es un contrato consensual, bilateral, oneroso y conmutativo. La transferencia de inmuebles requiere escritura pública e inscripción en Derechos Reales.",
    example:
      "Las partes celebran el presente contrato de compraventa, por el cual el vendedor transfiere la propiedad del inmueble al comprador por el precio de $us. 85,000, conforme a los Arts. 584 y siguientes del Código Civil.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 65, articles: ["584", "585", "586", "587", "588", "596", "611", "618"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 20, articles: ["825", "826", "827"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 5 },
    ],
    relatedTerms: ["eviccion", "saneamiento", "vicios-ocultos"],
  },
  {
    id: "despido",
    term: "Despido",
    category: "laboral",
    simpleDefinition:
      "Cuando el empleador termina la relación laboral. Si es sin justa causa, debe pagar desahucio (3 meses) e indemnización. Si es con causa legal (robo, faltas graves), no paga desahucio.",
    legalDefinition:
      "Extinción de la relación laboral por decisión unilateral del empleador. Puede ser justificado (cuando concurre alguna de las causales del Art. 16 de la LGT) o injustificado (cuando no existe causa legal). El despido injustificado genera derecho a desahucio, indemnización por antigüedad y reincorporación en ciertos casos.",
    example:
      "Al haber sido despedido sin causa justificada, el trabajador demandó el pago del desahucio de tres meses de salario más la indemnización por sus siete años de servicio, conforme a la Ley General del Trabajo.",
    lawPresence: [
      { law: "Ley General del Trabajo", shortName: "LGT", percentage: 60, articles: ["12", "13", "16"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 25, articles: ["46", "48", "49"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Código Penal", shortName: "CP", percentage: 5 },
    ],
    relatedTerms: ["desahucio", "indemnizacion"],
  },
  {
    id: "fianza",
    term: "Fianza",
    category: "obligaciones",
    simpleDefinition:
      "Cuando una tercera persona (el fiador) se compromete a pagar la deuda si el deudor no lo hace. Es como ser 'garante' de alguien.",
    legalDefinition:
      "Contrato accesorio por el cual el fiador se obliga frente al acreedor a cumplir la obligación del deudor principal en caso de que este no lo haga. Puede ser simple (con beneficio de excusión) o solidaria (sin beneficio de excusión, permitiendo al acreedor cobrar directamente al fiador).",
    example:
      "El fiador se constituyó en garante solidario de la obligación, renunciando al beneficio de excusión, por lo que el acreedor podrá dirigirse directamente contra él sin agotar primero la vía contra el deudor principal.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 70, articles: ["916", "917", "918", "919", "920", "930", "938", "941"] },
      { law: "Código de Comercio", shortName: "CCom", percentage: 15 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 10 },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 5 },
    ],
    relatedTerms: ["subrogacion", "hipoteca", "prenda"],
  },
  {
    id: "letra-de-cambio",
    term: "Letra de Cambio",
    category: "comercial",
    simpleDefinition:
      "Documento donde una persona ordena a otra que pague una cantidad de dinero a un tercero en una fecha determinada. Es uno de los títulos valores más usados en el comercio.",
    legalDefinition:
      "Título valor por el cual el librador da la orden incondicional al librado de pagar una suma determinada de dinero al tenedor o beneficiario, en la fecha y lugar indicados. Es un instrumento de crédito y de pago regulado por el Código de Comercio.",
    example:
      "El librador giró letra de cambio por Bs. 25,000 a cargo del librado, pagadera a los 90 días de su presentación, a la orden del beneficiario, conforme a los requisitos del Art. 541 del Código de Comercio.",
    lawPresence: [
      { law: "Código de Comercio", shortName: "CCom", percentage: 85, articles: ["541", "542", "543", "544", "545", "546", "547", "563"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Ley de Servicios Financieros", shortName: "LSF", percentage: 5 },
    ],
    relatedTerms: ["endoso", "protesto", "titulo-valor"],
  },
  {
    id: "posesion",
    term: "Posesión",
    category: "derechos_reales",
    simpleDefinition:
      "Tener un bien bajo tu control y actuar como si fueras el dueño, aunque no lo seas legalmente. Es diferente de la tenencia (como cuando alquilas, sabes que no eres el dueño).",
    legalDefinition:
      "Poder de hecho ejercido sobre una cosa mediante actos que denotan la intención de tenerla como propia (animus domini) y el ejercicio efectivo de ese poder (corpus). Se distingue de la tenencia o detentación, donde falta el ánimo de dueño. La posesión de buena fe y continuada puede dar lugar a la usucapión.",
    example:
      "El poseedor demostró haber ejercido posesión pacífica, continua y de buena fe durante más de 10 años, cultivando el terreno, pagando impuestos y siendo reconocido como propietario por los vecinos.",
    lawPresence: [
      { law: "Código Civil", shortName: "CC", percentage: 75, articles: ["87", "88", "89", "90", "91", "92", "93", "134"] },
      { law: "Constitución Política del Estado", shortName: "CPE", percentage: 10, articles: ["56", "57"] },
      { law: "Código Procesal Civil", shortName: "CPC", percentage: 10 },
      { law: "Código Penal", shortName: "CP", percentage: 5 },
    ],
    relatedTerms: ["usucapion", "derecho-real", "usufructo"],
  },
] as const satisfies ReadonlyArray<Omit<GlossaryTerm, 'category'> & { category: string }>).map(t => ({ ...t, category: t.category as GlossaryCategory })).sort((a, b) => a.term.localeCompare(b.term, "es"));
