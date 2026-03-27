type FieldValues = Record<string, string>;

function formatDate(dateStr: string): string {
  if (!dateStr) return "_______________";
  const date = new Date(dateStr + "T00:00:00");
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatCurrency(amount: string, currency: string = "Bs."): string {
  if (!amount) return "_______________";
  const num = parseFloat(amount);
  return `${currency} ${num.toLocaleString("es-BO")}.-`;
}

function numberToWords(num: number): string {
  const units = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const teens = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const hundreds = ["", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  if (num === 0) return "cero";
  if (num < 0) return "menos " + numberToWords(-num);

  let result = "";

  if (num >= 1000000) {
    const millions = Math.floor(num / 1000000);
    result += (millions === 1 ? "un millón" : numberToWords(millions) + " millones") + " ";
    num %= 1000000;
  }

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    result += (thousands === 1 ? "mil" : numberToWords(thousands) + " mil") + " ";
    num %= 1000;
  }

  if (num >= 100) {
    if (num === 100) {
      result += "cien";
      return result.trim();
    }
    result += hundreds[Math.floor(num / 100)] + " ";
    num %= 100;
  }

  if (num >= 20) {
    result += tens[Math.floor(num / 10)];
    if (num % 10 !== 0) result += " y " + units[num % 10];
  } else if (num >= 10) {
    result += teens[num - 10];
  } else if (num > 0) {
    result += units[num];
  }

  return result.trim();
}

function v(fields: FieldValues, key: string, fallback: string = "_______________"): string {
  return fields[key]?.trim() || fallback;
}

function partyBlock(f: FieldValues, prefix: string, role: string): string {
  return `el/la Sr(a). ${v(f, `${prefix}_nombre`)}, mayor de edad, de nacionalidad ${v(f, `${prefix}_nacionalidad`)}, de estado civil ${v(f, `${prefix}_estado_civil`)}, de profesión ${v(f, `${prefix}_profesion`)}, hábil por derecho, con Cédula de Identidad No. ${v(f, `${prefix}_ci`)}, con domicilio en ${v(f, `${prefix}_domicilio`)}, quien en adelante se denominará "${role}"`;
}

function addEndDate(startDate: string, months: number): string {
  if (!startDate) return "_______________";
  const date = new Date(startDate + "T00:00:00");
  date.setMonth(date.getMonth() + months);
  return formatDate(date.toISOString().split("T")[0]);
}

function tipoInmuebleLabel(tipo: string): string {
  const map: Record<string, string> = {
    casa: "casa", departamento: "departamento", local_comercial: "local comercial",
    oficina: "oficina", terreno: "terreno", garaje: "garaje", habitacion: "habitación",
  };
  return map[tipo] || tipo;
}

export function generateContractText(contractId: string, fields: FieldValues): string {
  switch (contractId) {
    case "alquiler":
      return generateAlquiler(fields);
    case "anticretico":
      return generateAnticretico(fields);
    case "compraventa-inmueble":
      return generateCompraventaInmueble(fields);
    case "compraventa-vehiculo":
      return generateCompraventaVehiculo(fields);
    case "prestamo":
      return generatePrestamo(fields);
    case "trabajo":
      return generateTrabajo(fields);
    case "servicios":
      return generateServicios(fields);
    case "confidencialidad":
      return generateConfidencialidad(fields);
    case "comodato":
      return generateComodato(fields);
    case "permuta":
      return generatePermuta(fields);
    case "donacion":
      return generateDonacion(fields);
    case "fianza":
      return generateFianza(fields);
    case "sociedad":
      return generateSociedad(fields);
    case "obra":
      return generateObra(fields);
    case "poder":
      return generatePoder(fields);
    default:
      return "Tipo de contrato no encontrado.";
  }
}

function generateAlquiler(f: FieldValues): string {
  const duracion = parseInt(f.duracion_meses || "12");
  const fechaFin = addEndDate(f.fecha_inicio, duracion);
  const canon = parseFloat(f.canon_mensual || "0");
  const garantia = parseFloat(f.garantia || "0");

  return `CONTRATO DE ALQUILER / ARRENDAMIENTO DE BIEN INMUEBLE

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo requerimiento de cualquiera de las partes, el siguiente CONTRATO DE ALQUILER DE BIEN INMUEBLE, que se suscribe al tenor de las siguientes cláusulas y condiciones:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "arrendador", "EL/LA ARRENDADOR(A)")}.

Por otra parte, ${partyBlock(f, "arrendatario", "EL/LA ARRENDATARIO(A)")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

EL/LA ARRENDADOR(A) da en calidad de alquiler a favor de EL/LA ARRENDATARIO(A), un bien inmueble consistente en ${tipoInmuebleLabel(f.tipo_inmueble || "")}, ubicado en ${v(f, "direccion_inmueble")}, de la ciudad de ${v(f, "ciudad")}, Estado Plurinacional de Bolivia.

CLÁUSULA TERCERA.- (DEL PLAZO)

El presente contrato tendrá una duración de ${duracion} meses, computables a partir del ${formatDate(f.fecha_inicio)} hasta el ${fechaFin}, fecha en que EL/LA ARRENDATARIO(A) deberá devolver el inmueble en las mismas condiciones en que lo recibió, salvo el deterioro normal por el uso.

En caso de que ninguna de las partes manifieste su voluntad de dar por terminado el contrato con al menos treinta (30) días de anticipación al vencimiento, el mismo se entenderá renovado por un período igual.

CLÁUSULA CUARTA.- (DEL CANON DE ALQUILER)

EL/LA ARRENDATARIO(A) se obliga a pagar a EL/LA ARRENDADOR(A) la suma de ${formatCurrency(f.canon_mensual)} (${numberToWords(canon)} bolivianos) mensuales, en calidad de canon de alquiler.

El pago se realizará los primeros ${v(f, "dia_pago")} días de cada mes, de forma puntual e improrrogable. El retraso en el pago por más de quince (15) días generará una penalidad del 10% sobre el monto del canon mensual.

CLÁUSULA QUINTA.- (DE LA GARANTÍA)

EL/LA ARRENDATARIO(A) entrega a EL/LA ARRENDADOR(A) la suma de ${formatCurrency(f.garantia)} (${numberToWords(garantia)} bolivianos) en calidad de garantía, misma que será devuelta a la finalización del contrato, previa verificación del buen estado del inmueble y cumplimiento de todas las obligaciones contractuales.

En caso de existir daños al inmueble imputables a EL/LA ARRENDATARIO(A) o deudas pendientes por servicios, EL/LA ARRENDADOR(A) podrá deducir los montos correspondientes de la garantía.

CLÁUSULA SEXTA.- (DE LOS SERVICIOS)

${f.servicios_incluidos ? `Los servicios se distribuirán de la siguiente manera: ${f.servicios_incluidos}` : "Los servicios básicos (agua, luz, gas) serán cubiertos por EL/LA ARRENDATARIO(A) durante la vigencia del contrato."}

CLÁUSULA SÉPTIMA.- (DE LAS OBLIGACIONES DEL ARRENDATARIO)

EL/LA ARRENDATARIO(A) se obliga a:
a) Utilizar el inmueble exclusivamente para el fin convenido.
b) Mantener el inmueble en buen estado de conservación.
c) No realizar modificaciones estructurales sin autorización escrita de EL/LA ARRENDADOR(A).
d) No subarrendar total ni parcialmente el inmueble sin consentimiento previo y escrito de EL/LA ARRENDADOR(A).
e) Permitir las inspecciones de EL/LA ARRENDADOR(A), previo aviso con al menos 24 horas de anticipación.
f) Devolver el inmueble a la finalización del contrato en las mismas condiciones en que fue recibido.

CLÁUSULA OCTAVA.- (DE LAS OBLIGACIONES DEL ARRENDADOR)

EL/LA ARRENDADOR(A) se obliga a:
a) Entregar el inmueble en condiciones habitables y de uso.
b) Garantizar el goce pacífico del inmueble durante la vigencia del contrato.
c) Realizar las reparaciones mayores y estructurales que sean necesarias.
d) Respetar los términos y plazos del presente contrato.

CLÁUSULA NOVENA.- (DE LA RESOLUCIÓN DEL CONTRATO)

El presente contrato podrá ser resuelto por las siguientes causales:
a) Por mutuo acuerdo de las partes.
b) Por incumplimiento de cualquiera de las cláusulas del presente contrato.
c) Por falta de pago de dos (2) o más mensualidades consecutivas.
d) Por uso indebido del inmueble.
e) Por subarriendo no autorizado.

La parte que desee resolver el contrato antes del plazo pactado deberá comunicar su decisión por escrito con al menos treinta (30) días de anticipación.

CLÁUSULA DÉCIMA.- (DE LA JURISDICCIÓN)

Para la interpretación y cumplimiento del presente contrato, las partes se someten a la jurisdicción y competencia de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderles.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA PRIMERA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad y aceptación, ambas partes suscriben el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL/LA ARRENDADOR(A)                      EL/LA ARRENDATARIO(A)
${v(f, "arrendador_nombre")}              ${v(f, "arrendatario_nombre")}
C.I. ${v(f, "arrendador_ci")}             C.I. ${v(f, "arrendatario_ci")}`;
}

function generateAnticretico(f: FieldValues): string {
  const duracionAnos = parseInt(f.duracion_anos || "2");
  const fechaFin = addEndDate(f.fecha_inicio, duracionAnos * 12);
  const monto = parseFloat(f.monto_anticretico || "0");

  return `CONTRATO DE ANTICRÉTICO

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo requerimiento de cualquiera de las partes, el siguiente CONTRATO DE ANTICRÉTICO, que se suscribe al tenor de las siguientes cláusulas y condiciones:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "propietario", "EL/LA PROPIETARIO(A)")}.

Por otra parte, ${partyBlock(f, "anticresista", "EL/LA ANTICRESISTA")}.

CLÁUSULA SEGUNDA.- (ANTECEDENTES)

EL/LA PROPIETARIO(A) declara ser legítimo(a) propietario(a) de un bien inmueble consistente en ${tipoInmuebleLabel(f.tipo_inmueble || "")}, ubicado en ${v(f, "direccion_inmueble")}, de la ciudad de ${v(f, "ciudad")}, Estado Plurinacional de Bolivia.

Descripción del inmueble: ${v(f, "descripcion_inmueble")}

EL/LA PROPIETARIO(A) declara que el inmueble se encuentra libre de todo gravamen, hipoteca, litis pendiente y cualquier otra carga que pudiera afectar el derecho de uso del ANTICRESISTA.

CLÁUSULA TERCERA.- (DEL OBJETO)

Por el presente contrato, EL/LA PROPIETARIO(A) entrega en calidad de anticrético el inmueble descrito en la cláusula segunda, a favor de EL/LA ANTICRESISTA, quien a su vez entrega al PROPIETARIO(A) la suma de ${formatCurrency(String(monto), "$us.")} (${numberToWords(monto)} dólares americanos), monto que deberá ser devuelto íntegramente a la finalización del presente contrato.

CLÁUSULA CUARTA.- (DEL PLAZO)

El presente contrato tendrá una vigencia de ${duracionAnos} año(s), computables desde el ${formatDate(f.fecha_inicio)} hasta el ${fechaFin}.

Al vencimiento del plazo, EL/LA PROPIETARIO(A) deberá devolver el monto total del anticrético a EL/LA ANTICRESISTA en un plazo máximo de treinta (30) días calendario. De no producirse la devolución, EL/LA ANTICRESISTA podrá continuar en el uso del inmueble hasta que se produzca la devolución total del monto.

CLÁUSULA QUINTA.- (DE LAS OBLIGACIONES DEL ANTICRESISTA)

EL/LA ANTICRESISTA se obliga a:
a) Utilizar el inmueble como vivienda familiar / para el uso convenido.
b) Mantener el inmueble en buen estado de conservación y limpieza.
c) Cubrir los servicios básicos (agua, luz, gas) durante la vigencia del contrato.
d) No realizar modificaciones estructurales sin autorización escrita del PROPIETARIO(A).
e) No subarrendar ni ceder el uso del inmueble a terceros.
f) Devolver el inmueble en las mismas condiciones en que fue recibido, salvo el deterioro natural por el uso.

CLÁUSULA SEXTA.- (DE LAS OBLIGACIONES DEL PROPIETARIO)

EL/LA PROPIETARIO(A) se obliga a:
a) Entregar el inmueble en condiciones habitables y de uso.
b) Garantizar el goce pacífico del inmueble durante la vigencia del contrato.
c) Devolver el monto total del anticrético al vencimiento del plazo pactado.
d) Realizar las reparaciones mayores y estructurales del inmueble.
e) No gravar ni enajenar el inmueble durante la vigencia del contrato sin previo conocimiento y acuerdo con EL/LA ANTICRESISTA.

CLÁUSULA SÉPTIMA.- (DE LA DEVOLUCIÓN DEL DINERO)

A la finalización del contrato, EL/LA PROPIETARIO(A) devolverá a EL/LA ANTICRESISTA la totalidad del monto recibido, es decir ${formatCurrency(String(monto), "$us.")} (${numberToWords(monto)} dólares americanos), en el mismo tipo de moneda, sin ninguna deducción.

En caso de daños al inmueble imputables a EL/LA ANTICRESISTA, los costos de reparación podrán ser deducidos del monto a devolver, previa evaluación y acuerdo de ambas partes.

CLÁUSULA OCTAVA.- (DE LA RESOLUCIÓN)

El presente contrato podrá ser resuelto por:
a) Mutuo acuerdo de las partes.
b) Incumplimiento grave de cualquiera de las obligaciones contractuales.
c) Vencimiento del plazo pactado.

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Para la interpretación y cumplimiento del presente contrato, las partes se someten a la jurisdicción y competencia de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}, renunciando a cualquier otro fuero que pudiera corresponderles.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes suscriben el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL/LA PROPIETARIO(A)                     EL/LA ANTICRESISTA
${v(f, "propietario_nombre")}             ${v(f, "anticresista_nombre")}
C.I. ${v(f, "propietario_ci")}            C.I. ${v(f, "anticresista_ci")}`;
}

function generateCompraventaInmueble(f: FieldValues): string {
  const precio = parseFloat(f.precio_venta || "0");
  const formasPago: Record<string, string> = {
    contado: "al contado, en un solo pago",
    cuotas: "en cuotas mensuales según acuerdo de las partes",
    mixto: "de forma mixta, con un anticipo y el saldo en cuotas",
  };

  return `MINUTA DE CONTRATO DE COMPRAVENTA DE BIEN INMUEBLE

Señor Notario de Fe Pública:

En el registro de escrituras públicas a su cargo, sírvase insertar la presente MINUTA DE COMPRAVENTA DE BIEN INMUEBLE, con las siguientes cláusulas y condiciones:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "vendedor", "EL/LA VENDEDOR(A)")}.

Por otra parte, ${partyBlock(f, "comprador", "EL/LA COMPRADOR(A)")}.

CLÁUSULA SEGUNDA.- (ANTECEDENTES DE DOMINIO)

EL/LA VENDEDOR(A) declara ser legítimo(a) propietario(a) de un bien inmueble consistente en ${tipoInmuebleLabel(f.tipo_inmueble || "")}, ubicado en ${v(f, "direccion_inmueble")}, de la ciudad de ${v(f, "ciudad")}, con una superficie de ${v(f, "superficie")} metros cuadrados, registrado en Derechos Reales bajo el Folio Real / Matrícula No. ${v(f, "numero_folio_real")}.

Descripción del inmueble: ${v(f, "descripcion_inmueble")}

EL/LA VENDEDOR(A) declara que el inmueble se encuentra libre de todo gravamen, hipoteca, litis pendiente, embargo, anotación preventiva y cualquier otra carga o limitación que pudiera impedir la libre disposición y transferencia del mismo.

CLÁUSULA TERCERA.- (DEL OBJETO)

Por el presente instrumento, EL/LA VENDEDOR(A) transfiere la propiedad del inmueble descrito en la cláusula segunda a favor de EL/LA COMPRADOR(A), quien acepta la transferencia en los términos y condiciones del presente contrato.

CLÁUSULA CUARTA.- (DEL PRECIO Y FORMA DE PAGO)

El precio de la presente compraventa es de ${formatCurrency(String(precio), "$us.")} (${numberToWords(precio)} dólares americanos), que EL/LA COMPRADOR(A) se obliga a pagar ${formasPago[f.forma_pago] || "según acuerdo de las partes"}.

EL/LA VENDEDOR(A) declara recibir el monto señalado a su entera satisfacción, otorgando el más amplio finiquito que en derecho corresponde.

CLÁUSULA QUINTA.- (DE LA TRADICIÓN Y ENTREGA)

EL/LA VENDEDOR(A) se obliga a hacer la entrega material y la tradición del inmueble a EL/LA COMPRADOR(A) una vez perfeccionada la presente transferencia y cancelado el precio total.

CLÁUSULA SEXTA.- (DE LA EVICCIÓN Y SANEAMIENTO)

EL/LA VENDEDOR(A) se obliga a la evicción y saneamiento de ley, conforme a lo establecido en los Artículos 624 al 638 del Código Civil Boliviano, garantizando la posesión legal, pacífica y libre de vicios del inmueble transferido.

CLÁUSULA SÉPTIMA.- (DE LOS IMPUESTOS Y GASTOS)

Los impuestos de transferencia, gastos notariales y de inscripción en Derechos Reales serán cubiertos por ${f.forma_pago === "contado" ? "EL/LA COMPRADOR(A)" : "ambas partes en partes iguales"}, salvo acuerdo contrario.

CLÁUSULA OCTAVA.- (DE LA CONFORMIDAD)

Ambas partes declaran su plena conformidad con las cláusulas precedentes, comprometiéndose a su fiel cumplimiento.

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Para la resolución de cualquier controversia derivada del presente contrato, las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

Usted, Señor Notario, se servirá agregar las demás formalidades de estilo y ley.

Es cuanto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio || new Date().toISOString().split("T")[0])}.



_______________________________          _______________________________
EL/LA VENDEDOR(A)                        EL/LA COMPRADOR(A)
${v(f, "vendedor_nombre")}                ${v(f, "comprador_nombre")}
C.I. ${v(f, "vendedor_ci")}               C.I. ${v(f, "comprador_ci")}`;
}

function generateCompraventaVehiculo(f: FieldValues): string {
  const precio = parseFloat(f.precio_venta || "0");

  return `CONTRATO DE COMPRAVENTA DE VEHÍCULO AUTOMOTOR

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo requerimiento de cualquiera de las partes, el siguiente CONTRATO DE COMPRAVENTA DE VEHÍCULO AUTOMOTOR, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "vendedor", "EL/LA VENDEDOR(A)")}.

Por otra parte, ${partyBlock(f, "comprador", "EL/LA COMPRADOR(A)")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

EL/LA VENDEDOR(A) transfiere en calidad de venta real y enajenación perpetua a favor de EL/LA COMPRADOR(A), un vehículo automotor con las siguientes características:

- Marca: ${v(f, "marca")}
- Modelo: ${v(f, "modelo")}
- Año de fabricación: ${v(f, "anio")}
- Color: ${v(f, "color")}
- Número de placa: ${v(f, "placa")}
- Número de motor: ${v(f, "numero_motor")}
- Número de chasis (VIN): ${v(f, "numero_chasis")}

CLÁUSULA TERCERA.- (DE LA PROPIEDAD)

EL/LA VENDEDOR(A) declara ser legítimo(a) propietario(a) del vehículo descrito, el cual se encuentra libre de todo gravamen, prenda, embargo, litis pendiente y cualquier otra carga que pudiera afectar la libre disposición del mismo.

Asimismo declara que el vehículo no tiene multas pendientes de tránsito, impuestos adeudados, ni se encuentra reportado como robado o con restricción de circulación.

CLÁUSULA CUARTA.- (DEL PRECIO Y FORMA DE PAGO)

El precio de la presente compraventa se fija en ${formatCurrency(String(precio), "$us.")} (${numberToWords(precio)} dólares americanos), que EL/LA COMPRADOR(A) paga ${f.forma_pago === "contado" ? "al contado en este acto" : "en cuotas según acuerdo de las partes"}.

EL/LA VENDEDOR(A) declara recibir dicho monto a su entera satisfacción.

CLÁUSULA QUINTA.- (DE LA ENTREGA)

EL/LA VENDEDOR(A) hace entrega del vehículo en el estado en que se encuentra, conjuntamente con la siguiente documentación:
a) RUAT (Registro Único para la Administración Tributaria del vehículo)
b) SOAT vigente
c) Inspección técnica vehicular vigente
d) Llaves del vehículo (juego completo)

EL/LA COMPRADOR(A) declara haber revisado el vehículo y recibirlo a su entera conformidad.

CLÁUSULA SEXTA.- (DE LA TRANSFERENCIA)

EL/LA VENDEDOR(A) se compromete a realizar todos los trámites necesarios para la transferencia legal del vehículo ante las autoridades competentes, incluyendo el cambio de nombre en el RUAT. Los gastos de transferencia serán cubiertos por EL/LA COMPRADOR(A).

CLÁUSULA SÉPTIMA.- (DE LA EVICCIÓN Y SANEAMIENTO)

EL/LA VENDEDOR(A) se obliga a la evicción y saneamiento de ley, garantizando la posesión legal y pacífica del vehículo transferido.

CLÁUSULA OCTAVA.- (DE LA JURISDICCIÓN)

Para la resolución de controversias, las partes se someten a los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA NOVENA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes suscriben el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio || new Date().toISOString().split("T")[0])}.



_______________________________          _______________________________
EL/LA VENDEDOR(A)                        EL/LA COMPRADOR(A)
${v(f, "vendedor_nombre")}                ${v(f, "comprador_nombre")}
C.I. ${v(f, "vendedor_ci")}               C.I. ${v(f, "comprador_ci")}`;
}

function generatePrestamo(f: FieldValues): string {
  const monto = parseFloat(f.monto_prestamo || "0");
  const interes = parseFloat(f.interes_mensual || "0");
  const moneda = f.moneda === "dolares" ? "$us." : "Bs.";
  const monedaTexto = f.moneda === "dolares" ? "dólares americanos" : "bolivianos";

  return `CONTRATO DE PRÉSTAMO DE DINERO

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo requerimiento de cualquiera de las partes, el siguiente CONTRATO DE PRÉSTAMO DE DINERO, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "prestamista", "EL/LA PRESTAMISTA\" o \"ACREEDOR(A)")}.

Por otra parte, ${partyBlock(f, "prestatario", "EL/LA PRESTATARIO(A)\" o \"DEUDOR(A)")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

Por el presente contrato, EL/LA PRESTAMISTA entrega en calidad de préstamo a EL/LA PRESTATARIO(A) la suma de ${formatCurrency(String(monto), moneda)} (${numberToWords(monto)} ${monedaTexto}), cantidad que EL/LA PRESTATARIO(A) declara recibir a su entera conformidad.

CLÁUSULA TERCERA.- (DEL PLAZO)

EL/LA PRESTATARIO(A) se obliga a devolver el monto total del préstamo en un plazo de ${v(f, "plazo_meses")} meses, computables a partir del ${formatDate(f.fecha_prestamo)}.

CLÁUSULA CUARTA.- (DEL INTERÉS)

${interes > 0
    ? `El presente préstamo devengará un interés del ${interes}% mensual sobre el saldo adeudado. El interés total a lo largo del plazo será calculado sobre el capital pendiente de pago.`
    : "El presente préstamo es otorgado sin interés, debiendo EL/LA PRESTATARIO(A) devolver únicamente el monto del capital recibido."
}

CLÁUSULA QUINTA.- (DE LA FORMA DE PAGO)

${f.forma_pago === "mensual"
    ? "EL/LA PRESTATARIO(A) realizará pagos mensuales que incluirán capital e intereses (si corresponde), los primeros cinco (5) días de cada mes."
    : f.forma_pago === "trimestral"
    ? "EL/LA PRESTATARIO(A) realizará pagos trimestrales que incluirán capital e intereses (si corresponde)."
    : "EL/LA PRESTATARIO(A) devolverá el monto total del préstamo más los intereses acumulados (si corresponde) al vencimiento del plazo establecido."
}

CLÁUSULA SEXTA.- (DE LA MORA)

En caso de incumplimiento en el pago, EL/LA PRESTATARIO(A) incurrirá en mora automática sin necesidad de requerimiento judicial o extrajudicial alguno, debiendo pagar un interés moratorio adicional del 3% mensual sobre el monto adeudado.

CLÁUSULA SÉPTIMA.- (DE LA GARANTÍA)

${f.garantia
    ? `Como garantía del cumplimiento de la obligación, EL/LA PRESTATARIO(A) ofrece lo siguiente: ${f.garantia}`
    : "El presente préstamo se otorga sin garantía específica, respondiendo EL/LA PRESTATARIO(A) con todos sus bienes presentes y futuros."
}

CLÁUSULA OCTAVA.- (DEL VENCIMIENTO ANTICIPADO)

El préstamo se considerará de plazo vencido en los siguientes casos:
a) Falta de pago de dos (2) o más cuotas consecutivas.
b) Falsedad en la información proporcionada por EL/LA PRESTATARIO(A).
c) Deterioro significativo de la garantía (si la hubiere).

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_prestamo)}.



_______________________________          _______________________________
EL/LA PRESTAMISTA                        EL/LA PRESTATARIO(A)
${v(f, "prestamista_nombre")}             ${v(f, "prestatario_nombre")}
C.I. ${v(f, "prestamista_ci")}            C.I. ${v(f, "prestatario_ci")}`;
}

function generateTrabajo(f: FieldValues): string {
  const salario = parseFloat(f.salario_mensual || "0");
  const tipoContratoTexto: Record<string, string> = {
    indefinido: "a PLAZO INDEFINIDO",
    fijo: "a PLAZO FIJO",
    eventual: "de carácter EVENTUAL",
  };

  return `CONTRATO DE TRABAJO

Conste por el presente documento, el siguiente CONTRATO DE TRABAJO suscrito ${tipoContratoTexto[f.tipo_contrato] || ""}, al tenor de las siguientes cláusulas y condiciones, conforme a la Ley General del Trabajo y su Decreto Reglamentario:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

EMPLEADOR: ${v(f, "empleador_empresa")}, con NIT No. ${v(f, "empleador_nit")}, representada legalmente por el/la Sr(a). ${v(f, "empleador_representante")}, con Cédula de Identidad No. ${v(f, "empleador_ci")}, con domicilio en ${v(f, "empleador_direccion")}, de la ciudad de ${v(f, "ciudad")}, quien en adelante se denominará "EL EMPLEADOR".

TRABAJADOR(A): ${v(f, "trabajador_nombre")}, mayor de edad, de nacionalidad ${v(f, "trabajador_nacionalidad")}, de estado civil ${v(f, "trabajador_estado_civil")}, de profesión ${v(f, "trabajador_profesion")}, hábil por derecho, con Cédula de Identidad No. ${v(f, "trabajador_ci")}, con domicilio en ${v(f, "trabajador_domicilio")}, quien en adelante se denominará "EL/LA TRABAJADOR(A)".

CLÁUSULA SEGUNDA.- (DEL OBJETO)

EL EMPLEADOR contrata los servicios de EL/LA TRABAJADOR(A) para desempeñar el cargo de ${v(f, "cargo")}, comprometiéndose a cumplir las funciones inherentes al puesto y aquellas que le sean asignadas por su inmediato superior.

CLÁUSULA TERCERA.- (DE LAS FUNCIONES)

Las funciones principales de EL/LA TRABAJADOR(A) serán las siguientes:
${v(f, "descripcion_funciones")}

CLÁUSULA CUARTA.- (DE LA REMUNERACIÓN)

EL EMPLEADOR pagará a EL/LA TRABAJADOR(A) un salario mensual de ${formatCurrency(String(salario))} (${numberToWords(salario)} bolivianos), sujeto a las deducciones de ley (aportes a las AFPs y al Sistema de Seguro Social de corto plazo).

El pago se realizará de forma mensual, los últimos días hábiles de cada mes, mediante transferencia bancaria o la modalidad acordada.

CLÁUSULA QUINTA.- (DE LA JORNADA LABORAL)

La jornada laboral de EL/LA TRABAJADOR(A) será: ${v(f, "horario")}.

La jornada máxima de trabajo es de ocho (8) horas diarias y cuarenta y ocho (48) horas semanales, conforme a la Ley General del Trabajo. Las horas extraordinarias serán remuneradas con el recargo legal correspondiente (100% en días hábiles, 200% en domingos y feriados).

CLÁUSULA SEXTA.- (DEL PERÍODO DE PRUEBA)

El presente contrato contempla un período de prueba de ${v(f, "periodo_prueba")} días, durante el cual cualquiera de las partes podrá rescindir el contrato sin obligación de indemnización ni preaviso.

CLÁUSULA SÉPTIMA.- (DEL PLAZO)

${f.tipo_contrato === "indefinido"
    ? "El presente contrato es por tiempo indefinido, iniciando sus efectos a partir del " + formatDate(f.fecha_inicio) + "."
    : "El presente contrato inicia el " + formatDate(f.fecha_inicio) + " y su duración será definida según las necesidades del cargo y el acuerdo entre las partes."
}

CLÁUSULA OCTAVA.- (DE LOS BENEFICIOS SOCIALES)

EL/LA TRABAJADOR(A) gozará de todos los derechos y beneficios establecidos por la Ley General del Trabajo y disposiciones complementarias, incluyendo:
a) Aguinaldo de Navidad (un salario mensual).
b) Vacaciones anuales conforme a escala legal (15 días el primer año, con incrementos).
c) Prima anual (si la empresa genera utilidades).
d) Afiliación al Sistema de Seguro Social (Caja Nacional de Salud u otra).
e) Aportes a las Administradoras de Fondos de Pensiones (AFPs).
f) Subsidios de natalidad, lactancia y otros establecidos por ley.
g) Segundo aguinaldo "Esfuerzo por Bolivia" (cuando corresponda según normativa vigente).

CLÁUSULA NOVENA.- (DE LAS OBLIGACIONES DEL TRABAJADOR)

EL/LA TRABAJADOR(A) se obliga a:
a) Cumplir fielmente sus funciones con diligencia y responsabilidad.
b) Observar el reglamento interno de la empresa.
c) Guardar reserva sobre información confidencial del empleador.
d) Cuidar los bienes, equipos y herramientas proporcionados.
e) Comunicar cualquier impedimento para cumplir sus funciones.

CLÁUSULA DÉCIMA.- (DE LA TERMINACIÓN)

La relación laboral podrá concluir por:
a) Mutuo acuerdo de las partes.
b) Vencimiento del plazo (en contratos a plazo fijo).
c) Despido justificado conforme a las causales del Art. 16 de la LGT.
d) Retiro voluntario del trabajador, con preaviso de treinta (30) días.
e) Otras causales establecidas por ley.

En caso de despido injustificado, EL/LA TRABAJADOR(A) tendrá derecho a la indemnización y desahucio conforme a ley (tres meses de salario por desahucio más indemnización por años de servicio).

CLÁUSULA DÉCIMA PRIMERA.- (DE LA JURISDICCIÓN)

Para la resolución de conflictos laborales, las partes se someten a la jurisdicción de las autoridades del trabajo y los juzgados laborales de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA SEGUNDA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes suscriben el presente contrato en tres ejemplares de un mismo tenor y efecto (uno para el empleador, uno para el trabajador y uno para el Ministerio de Trabajo), en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL EMPLEADOR                             EL/LA TRABAJADOR(A)
${v(f, "empleador_empresa")}              ${v(f, "trabajador_nombre")}
Rep. Legal: ${v(f, "empleador_representante")}
NIT: ${v(f, "empleador_nit")}             C.I. ${v(f, "trabajador_ci")}`;
}

function generateServicios(f: FieldValues): string {
  const monto = parseFloat(f.monto_total || "0");
  const formasPago: Record<string, string> = {
    total: "en un solo pago al finalizar la prestación del servicio",
    parcial: "en dos pagos: 50% al inicio del servicio y 50% a la entrega final",
    mensual: "en pagos mensuales iguales durante la vigencia del contrato",
    hitos: "por hitos o entregables, según el avance del servicio",
  };

  return `CONTRATO DE PRESTACIÓN DE SERVICIOS

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo requerimiento de cualquiera de las partes, el siguiente CONTRATO DE PRESTACIÓN DE SERVICIOS, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "contratante", "EL/LA CONTRATANTE")}.

Por otra parte, ${partyBlock(f, "prestador", "EL/LA PRESTADOR(A) DE SERVICIOS")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

EL/LA PRESTADOR(A) DE SERVICIOS se compromete a realizar los siguientes servicios a favor de EL/LA CONTRATANTE:

${v(f, "descripcion_servicio")}

CLÁUSULA TERCERA.- (DEL PLAZO)

El presente contrato tendrá vigencia desde el ${formatDate(f.fecha_inicio)} hasta el ${formatDate(f.fecha_fin)}.

CLÁUSULA CUARTA.- (DE LA RETRIBUCIÓN)

EL/LA CONTRATANTE pagará a EL/LA PRESTADOR(A) DE SERVICIOS la suma total de ${formatCurrency(String(monto))} (${numberToWords(monto)} bolivianos) por los servicios prestados, ${formasPago[f.forma_pago] || "según acuerdo de las partes"}.

CLÁUSULA QUINTA.- (DE LA NATURALEZA DEL CONTRATO)

Queda expresamente establecido que el presente contrato es de naturaleza CIVIL y NO genera relación de dependencia laboral entre las partes. EL/LA PRESTADOR(A) DE SERVICIOS actúa de manera independiente y autónoma, siendo responsable del pago de sus propios impuestos y obligaciones tributarias.

CLÁUSULA SEXTA.- (DE LAS OBLIGACIONES DEL PRESTADOR)

EL/LA PRESTADOR(A) DE SERVICIOS se obliga a:
a) Ejecutar el servicio con profesionalismo, diligencia y calidad.
b) Cumplir con los plazos establecidos.
c) Informar periódicamente sobre el avance del servicio.
d) Guardar confidencialidad sobre la información del CONTRATANTE.
${f.entregables ? `e) Entregar los siguientes productos/entregables:\n${f.entregables}` : ""}

CLÁUSULA SÉPTIMA.- (DE LAS OBLIGACIONES DEL CONTRATANTE)

EL/LA CONTRATANTE se obliga a:
a) Proporcionar la información necesaria para la prestación del servicio.
b) Realizar los pagos en los plazos acordados.
c) Facilitar el acceso a las instalaciones o recursos necesarios.

CLÁUSULA OCTAVA.- (DE LA RESOLUCIÓN)

El presente contrato podrá ser resuelto por:
a) Mutuo acuerdo de las partes.
b) Incumplimiento de las obligaciones contractuales.
c) Caso fortuito o fuerza mayor.

En caso de resolución anticipada por voluntad unilateral, la parte que la solicite deberá comunicar su decisión con al menos quince (15) días de anticipación.

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL/LA CONTRATANTE                        EL/LA PRESTADOR(A) DE SERVICIOS
${v(f, "contratante_nombre")}             ${v(f, "prestador_nombre")}
C.I. ${v(f, "contratante_ci")}            C.I. ${v(f, "prestador_ci")}`;
}

function generateConfidencialidad(f: FieldValues): string {
  const duracion = parseInt(f.duracion_anos || "2");

  return `ACUERDO DE CONFIDENCIALIDAD (NDA)

Conste por el presente documento privado, el siguiente ACUERDO DE CONFIDENCIALIDAD, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "parte_reveladora", "LA PARTE REVELADORA")}.

Por otra parte, ${partyBlock(f, "parte_receptora", "LA PARTE RECEPTORA")}.

CLÁUSULA SEGUNDA.- (DEL PROPÓSITO)

El presente acuerdo se celebra con el siguiente propósito: ${v(f, "proposito")}

CLÁUSULA TERCERA.- (DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL)

Se considerará "Información Confidencial" toda información, ya sea oral, escrita, electrónica o en cualquier otro formato, que incluya pero no se limite a:

${v(f, "tipo_informacion")}

No se considerará confidencial la información que:
a) Sea de dominio público al momento de su revelación.
b) Se convierta en pública sin culpa de la PARTE RECEPTORA.
c) Sea recibida legítimamente de terceros sin restricciones de confidencialidad.
d) Sea desarrollada independientemente por la PARTE RECEPTORA.

CLÁUSULA CUARTA.- (DE LAS OBLIGACIONES)

LA PARTE RECEPTORA se obliga a:
a) Mantener estricta reserva sobre la Información Confidencial.
b) No revelar, publicar ni difundir la información a terceros.
c) Utilizar la información únicamente para el propósito descrito en este acuerdo.
d) Proteger la información con el mismo grado de cuidado que emplea para su propia información confidencial.
e) Limitar el acceso a la información solo a personas que necesiten conocerla.
f) Devolver o destruir toda la información confidencial al término del acuerdo.

CLÁUSULA QUINTA.- (DEL PLAZO)

El presente acuerdo tendrá una vigencia de ${duracion} año(s) a partir de la fecha de firma. Las obligaciones de confidencialidad se mantendrán vigentes por un período adicional de dos (2) años después del vencimiento del acuerdo.

CLÁUSULA SEXTA.- (DE LA PENALIDAD)

${f.penalidad
    ? `En caso de incumplimiento del presente acuerdo, LA PARTE RECEPTORA deberá pagar a LA PARTE REVELADORA una penalidad de ${formatCurrency(f.penalidad, "$us.")} (${numberToWords(parseFloat(f.penalidad))} dólares americanos), sin perjuicio de las acciones legales que pudieran corresponder por daños y perjuicios.`
    : "En caso de incumplimiento del presente acuerdo, la parte afectada podrá iniciar las acciones legales correspondientes para el resarcimiento de daños y perjuicios."
}

CLÁUSULA SÉPTIMA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA OCTAVA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente acuerdo en dos ejemplares, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(new Date().toISOString().split("T")[0])}.



_______________________________          _______________________________
LA PARTE REVELADORA                      LA PARTE RECEPTORA
${v(f, "parte_reveladora_nombre")}        ${v(f, "parte_receptora_nombre")}
C.I. ${v(f, "parte_reveladora_ci")}       C.I. ${v(f, "parte_receptora_ci")}`;
}

function generateComodato(f: FieldValues): string {
  return `CONTRATO DE COMODATO (PRÉSTAMO DE USO GRATUITO)

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo reconocimiento de firmas y rúbricas, el siguiente CONTRATO DE COMODATO, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "comodante", "EL/LA COMODANTE")}.

Por otra parte, ${partyBlock(f, "comodatario", "EL/LA COMODATARIO(A)")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

Por el presente contrato, EL/LA COMODANTE entrega a EL/LA COMODATARIO(A), en calidad de préstamo de uso gratuito, el siguiente bien:

${v(f, "descripcion_bien")}

Tipo de bien: ${v(f, "tipo_bien")}

EL/LA COMODATARIO(A) declara recibir el bien en el siguiente estado: ${v(f, "estado_bien")}

CLÁUSULA TERCERA.- (DE LA GRATUIDAD)

Queda expresamente establecido que el presente préstamo es GRATUITO, no existiendo contraprestación económica alguna a cargo de EL/LA COMODATARIO(A). En caso de establecerse cualquier tipo de pago, el presente contrato se considerará como arrendamiento y se regirá por las normas aplicables.

CLÁUSULA CUARTA.- (DEL USO AUTORIZADO)

EL/LA COMODATARIO(A) se compromete a utilizar el bien exclusivamente para: ${v(f, "uso_autorizado")}.

Queda prohibido destinar el bien a un uso distinto al autorizado, so pena de resolución inmediata del contrato y responsabilidad por daños y perjuicios.

CLÁUSULA QUINTA.- (DEL PLAZO)

El presente contrato tendrá vigencia desde el ${formatDate(f.fecha_inicio)} hasta el ${formatDate(f.fecha_devolucion)}, fecha en que EL/LA COMODATARIO(A) deberá devolver el bien en las mismas condiciones en que lo recibió, salvo el deterioro normal por el uso.

CLÁUSULA SEXTA.- (DE LAS OBLIGACIONES DEL COMODATARIO)

EL/LA COMODATARIO(A) se obliga a:
a) Conservar y cuidar el bien con la diligencia de un buen padre de familia.
b) Utilizar el bien únicamente para el uso autorizado.
c) Asumir los gastos ordinarios de conservación y mantenimiento.
d) No prestar ni ceder el uso del bien a terceros sin autorización escrita del COMODANTE.
e) Devolver el bien en el plazo acordado y en el mismo estado, salvo el deterioro natural.
f) Comunicar inmediatamente al COMODANTE cualquier daño o deterioro del bien.

CLÁUSULA SÉPTIMA.- (DE LA RESPONSABILIDAD)

EL/LA COMODATARIO(A) será responsable de la pérdida o deterioro del bien cuando:
a) Lo destine a un uso distinto al convenido.
b) Lo conserve por más tiempo del acordado.
c) No lo cuide con la diligencia debida.
d) Pudiendo salvar el bien prestado, prefiera salvar el propio.

Conforme al Art. 864 del Código Civil, el comodatario responde incluso del caso fortuito cuando ha destinado el bien a un uso no autorizado.

CLÁUSULA OCTAVA.- (DE LA DEVOLUCIÓN ANTICIPADA)

EL/LA COMODANTE podrá exigir la devolución anticipada del bien en caso de necesidad urgente e imprevista, o cuando EL/LA COMODATARIO(A) incumpla cualquiera de sus obligaciones.

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL/LA COMODANTE                          EL/LA COMODATARIO(A)
${v(f, "comodante_nombre")}               ${v(f, "comodatario_nombre")}
C.I. ${v(f, "comodante_ci")}              C.I. ${v(f, "comodatario_ci")}`;
}

function generatePermuta(f: FieldValues): string {
  const valorA = parseFloat(f.valor_a || "0");
  const valorB = parseFloat(f.valor_b || "0");
  const compensacion = parseFloat(f.compensacion || "0");

  return `CONTRATO DE PERMUTA

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo reconocimiento de firmas y rúbricas, el siguiente CONTRATO DE PERMUTA, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "permutante_a", "EL/LA PRIMER(A) PERMUTANTE")}.

Por otra parte, ${partyBlock(f, "permutante_b", "EL/LA SEGUNDO(A) PERMUTANTE")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

Por el presente contrato, las partes acuerdan realizar la permuta recíproca de los siguientes bienes:

BIEN A (entregado por EL/LA PRIMER(A) PERMUTANTE):
${v(f, "bien_a")}
Valor estimado: ${formatCurrency(String(valorA), "$us.")} (${numberToWords(valorA)} dólares americanos)

BIEN B (entregado por EL/LA SEGUNDO(A) PERMUTANTE):
${v(f, "bien_b")}
Valor estimado: ${formatCurrency(String(valorB), "$us.")} (${numberToWords(valorB)} dólares americanos)

CLÁUSULA TERCERA.- (DE LA COMPENSACIÓN)

${compensacion > 0
    ? `Existiendo una diferencia de valor entre los bienes permutados, ${valorA > valorB ? "EL/LA SEGUNDO(A) PERMUTANTE" : "EL/LA PRIMER(A) PERMUTANTE"} pagará a ${valorA > valorB ? "EL/LA PRIMER(A) PERMUTANTE" : "EL/LA SEGUNDO(A) PERMUTANTE"} la suma de ${formatCurrency(String(compensacion), "$us.")} (${numberToWords(compensacion)} dólares americanos) como compensación por la diferencia de valor.`
    : "Las partes declaran que los bienes permutados tienen un valor equivalente, por lo que no existe compensación monetaria adicional."
}

CLÁUSULA CUARTA.- (DE LA PROPIEDAD)

Cada parte declara ser legítimo(a) propietario(a) del bien que entrega en permuta, el cual se encuentra libre de todo gravamen, embargo, litis pendiente y cualquier otra carga que pudiera impedir la libre disposición del mismo.

CLÁUSULA QUINTA.- (DE LA ENTREGA)

La entrega recíproca de los bienes se realizará a la fecha de suscripción del presente contrato, es decir el ${formatDate(f.fecha_permuta)}, salvo acuerdo diferente entre las partes.

CLÁUSULA SEXTA.- (DE LA EVICCIÓN Y SANEAMIENTO)

Cada parte se obliga a la evicción y saneamiento respecto del bien que entrega, conforme a los Arts. 624-638 del Código Civil Boliviano, en concordancia con el Art. 654 que hace aplicables a la permuta las reglas de la compraventa.

CLÁUSULA SÉPTIMA.- (DE LOS GASTOS E IMPUESTOS)

Los gastos notariales, de registro y los impuestos de transferencia que se generen serán cubiertos por ambas partes en partes iguales, salvo acuerdo diferente.

CLÁUSULA OCTAVA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA NOVENA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_permuta)}.



_______________________________          _______________________________
PRIMER(A) PERMUTANTE                     SEGUNDO(A) PERMUTANTE
${v(f, "permutante_a_nombre")}            ${v(f, "permutante_b_nombre")}
C.I. ${v(f, "permutante_a_ci")}           C.I. ${v(f, "permutante_b_ci")}`;
}

function generateDonacion(f: FieldValues): string {
  const valor = parseFloat(f.valor_bien || "0");

  return `CONTRATO DE DONACIÓN

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo reconocimiento de firmas y rúbricas, el siguiente CONTRATO DE DONACIÓN, suscrito al tenor de las siguientes cláusulas:

${f.tipo_bien === "inmueble" ? "NOTA IMPORTANTE: La donación de bienes inmuebles DEBE realizarse mediante escritura pública ante Notario de Fe Pública e inscribirse en Derechos Reales para su validez legal (Art. 667 del Código Civil).\n" : ""}
CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "donante", "EL/LA DONANTE")}.

Por otra parte, ${partyBlock(f, "donatario", "EL/LA DONATARIO(A)")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

Por el presente contrato, EL/LA DONANTE, de libre y espontánea voluntad, transfiere a título GRATUITO a favor de EL/LA DONATARIO(A), el siguiente bien:

${v(f, "descripcion_bien")}
Tipo de bien: ${v(f, "tipo_bien")}
Valor estimado: ${formatCurrency(String(valor), "$us.")} (${numberToWords(valor)} dólares americanos)

CLÁUSULA TERCERA.- (DE LA ACEPTACIÓN)

EL/LA DONATARIO(A) declara expresamente que ACEPTA la presente donación en los términos y condiciones establecidos en este contrato, manifestando su agradecimiento al DONANTE.

CLÁUSULA CUARTA.- (DE LA PROPIEDAD Y LIBRE DISPOSICIÓN)

EL/LA DONANTE declara ser legítimo(a) propietario(a) del bien donado, el cual se encuentra libre de todo gravamen, embargo, litis pendiente y cualquier otra carga. Asimismo declara que la presente donación no afecta la legítima que por ley corresponde a sus herederos forzosos, conforme al Art. 1059 del Código Civil.

CLÁUSULA QUINTA.- (DE LA ENTREGA)

La entrega del bien donado se realizará en la fecha de suscripción del presente contrato, es decir el ${formatDate(f.fecha_donacion)}.
${f.reserva_usufructo === "si" ? `\nSin embargo, EL/LA DONANTE se reserva el derecho de usufructo vitalicio sobre el bien donado, pudiendo continuar con su uso y goce durante toda su vida. EL/LA DONATARIO(A) adquiere la nuda propiedad.` : ""}

CLÁUSULA SEXTA.- (DE LAS CONDICIONES)

${f.condiciones ? `La presente donación se realiza con las siguientes condiciones (cargos):\n\n${f.condiciones}\n\nEl incumplimiento de las condiciones señaladas faculta a EL/LA DONANTE a solicitar la revocación de la donación conforme al Art. 679 del Código Civil.` : "La presente donación se realiza de forma pura y simple, sin condición ni cargo alguno."}

CLÁUSULA SÉPTIMA.- (DE LA IRREVOCABILIDAD)

La presente donación es irrevocable, salvo las causales previstas por ley:
a) Ingratitud del donatario (Art. 673 CC).
b) Superveniencia de necesidad del donante (Art. 676 CC).
c) Incumplimiento de los cargos impuestos (Art. 679 CC).

CLÁUSULA OCTAVA.- (DE LOS GASTOS)

Los gastos notariales, de registro e impuestos que se generen por la presente donación serán cubiertos por EL/LA DONATARIO(A).

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_donacion)}.



_______________________________          _______________________________
EL/LA DONANTE                            EL/LA DONATARIO(A)
${v(f, "donante_nombre")}                 ${v(f, "donatario_nombre")}
C.I. ${v(f, "donante_ci")}                C.I. ${v(f, "donatario_ci")}`;
}

function generateFianza(f: FieldValues): string {
  const monto = parseFloat(f.monto_garantizado || "0");

  return `CONTRATO DE FIANZA

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo reconocimiento de firmas y rúbricas, el siguiente CONTRATO DE FIANZA, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

${partyBlock(f, "acreedor", "EL/LA ACREEDOR(A)")}.

${partyBlock(f, "deudor", "EL/LA DEUDOR(A) PRINCIPAL")}.

${partyBlock(f, "fiador", "EL/LA FIADOR(A)")}.

CLÁUSULA SEGUNDA.- (DE LA OBLIGACIÓN PRINCIPAL)

EL/LA DEUDOR(A) PRINCIPAL tiene a su cargo la siguiente obligación frente a EL/LA ACREEDOR(A):

${v(f, "obligacion_principal")}

CLÁUSULA TERCERA.- (DEL OBJETO)

Por el presente contrato, EL/LA FIADOR(A) se constituye en garante de la obligación descrita en la cláusula segunda, comprometiéndose a cumplirla en caso de que EL/LA DEUDOR(A) PRINCIPAL no lo haga.

El monto garantizado asciende a ${formatCurrency(String(monto))} (${numberToWords(monto)} bolivianos), que no excede el monto de la obligación principal, conforme al Art. 920 del Código Civil.

CLÁUSULA CUARTA.- (DEL TIPO DE FIANZA)

${f.tipo_fianza === "solidaria"
    ? "La presente fianza es de carácter SOLIDARIO. EL/LA FIADOR(A) renuncia expresamente al beneficio de excusión previsto en el Art. 930 del Código Civil, por lo que EL/LA ACREEDOR(A) podrá dirigirse directamente contra EL/LA FIADOR(A) sin necesidad de agotar primero los recursos contra EL/LA DEUDOR(A) PRINCIPAL."
    : "La presente fianza es de carácter SIMPLE. EL/LA FIADOR(A) goza del beneficio de excusión conforme al Art. 930 del Código Civil, por lo que EL/LA ACREEDOR(A) deberá dirigirse primero contra el patrimonio de EL/LA DEUDOR(A) PRINCIPAL antes de requerir el pago a EL/LA FIADOR(A)."
}

CLÁUSULA QUINTA.- (DEL PLAZO)

${f.duracion === "obligacion"
    ? "La presente fianza tendrá vigencia hasta el cumplimiento total de la obligación principal garantizada."
    : `La presente fianza tendrá una vigencia de ${f.duracion} año(s) a partir de la fecha de suscripción del presente contrato.`
}

CLÁUSULA SEXTA.- (DEL DERECHO DE SUBROGACIÓN)

En caso de que EL/LA FIADOR(A) pague la obligación garantizada, se subrogará en los derechos de EL/LA ACREEDOR(A) contra EL/LA DEUDOR(A) PRINCIPAL, pudiendo reclamar el reembolso total de lo pagado, más los intereses, gastos y daños que hubiere sufrido, conforme a los Arts. 938-940 del Código Civil.

CLÁUSULA SÉPTIMA.- (DE LAS OBLIGACIONES DEL FIADOR)

EL/LA FIADOR(A) declara:
a) Ser mayor de edad, hábil por derecho y con capacidad económica suficiente para responder por la obligación garantizada.
b) Tener domicilio en la jurisdicción del presente contrato.
c) Que su patrimonio es suficiente para cubrir el monto garantizado.
d) Que se obliga a comunicar cualquier cambio de domicilio a las demás partes.

CLÁUSULA OCTAVA.- (DE LA EXTINCIÓN)

La presente fianza se extinguirá por:
a) Pago total de la obligación principal por parte del DEUDOR.
b) Extinción de la obligación principal por cualquier causa legal.
c) Vencimiento del plazo de la fianza.
d) Liberación expresa por parte del ACREEDOR.
e) Cualquier otra causa prevista por ley (Arts. 941-949 CC).

CLÁUSULA NOVENA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, las tres partes firman el presente contrato en tres ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_fianza)}.



_______________________________
EL/LA ACREEDOR(A)
${v(f, "acreedor_nombre")}
C.I. ${v(f, "acreedor_ci")}

_______________________________
EL/LA DEUDOR(A) PRINCIPAL
${v(f, "deudor_nombre")}
C.I. ${v(f, "deudor_ci")}

_______________________________
EL/LA FIADOR(A)
${v(f, "fiador_nombre")}
C.I. ${v(f, "fiador_ci")}`;
}

function generateSociedad(f: FieldValues): string {
  const capital = parseFloat(f.capital_social || "0");
  const aporte1 = parseFloat(f.aporte_socio_1 || "0");
  const aporte2 = parseFloat(f.aporte_socio_2 || "0");
  const pct1 = capital > 0 ? ((aporte1 / capital) * 100).toFixed(1) : "0";
  const pct2 = capital > 0 ? ((aporte2 / capital) * 100).toFixed(1) : "0";
  const cuotas = capital > 0 ? Math.floor(capital / 100) : 0;
  const cuotas1 = capital > 0 ? Math.floor(aporte1 / 100) : 0;
  const cuotas2 = capital > 0 ? Math.floor(aporte2 / 100) : 0;

  return `MINUTA DE CONSTITUCIÓN DE SOCIEDAD DE RESPONSABILIDAD LIMITADA

Señor Notario de Fe Pública:

En el registro de escrituras públicas a su cargo, sírvase insertar la presente MINUTA DE CONSTITUCIÓN DE SOCIEDAD DE RESPONSABILIDAD LIMITADA, con las siguientes cláusulas y condiciones:

NOTA: Este documento DEBE ser protocolizado mediante escritura pública ante Notario de Fe Pública y registrado en FUNDEMPRESA (Registro de Comercio) para su validez legal.

CLÁUSULA PRIMERA.- (DE LAS PARTES / SOCIOS FUNDADORES)

Intervienen como socios fundadores:

PRIMER SOCIO: ${v(f, "socio_1_nombre")}, de nacionalidad ${v(f, "socio_1_nacionalidad")}, de estado civil ${v(f, "socio_1_estado_civil")}, de profesión ${v(f, "socio_1_profesion")}, con Cédula de Identidad No. ${v(f, "socio_1_ci")}, con domicilio en ${v(f, "socio_1_domicilio")}.

SEGUNDO SOCIO: ${v(f, "socio_2_nombre")}, de nacionalidad ${v(f, "socio_2_nacionalidad")}, de estado civil ${v(f, "socio_2_estado_civil")}, de profesión ${v(f, "socio_2_profesion")}, con Cédula de Identidad No. ${v(f, "socio_2_ci")}, con domicilio en ${v(f, "socio_2_domicilio")}.

CLÁUSULA SEGUNDA.- (DE LA CONSTITUCIÓN)

Los socios fundadores, de libre y espontánea voluntad, acuerdan constituir una SOCIEDAD DE RESPONSABILIDAD LIMITADA, la cual se regirá por el Código de Comercio (D.L. 14379), las disposiciones del presente contrato y las leyes aplicables del Estado Plurinacional de Bolivia.

CLÁUSULA TERCERA.- (DE LA DENOMINACIÓN)

La sociedad girará bajo la denominación o razón social: "${v(f, "razon_social")}".

CLÁUSULA CUARTA.- (DEL OBJETO SOCIAL)

La sociedad tendrá por objeto las siguientes actividades:

${v(f, "objeto_social")}

La sociedad podrá realizar todas las actividades lícitas conexas y complementarias al objeto social descrito.

CLÁUSULA QUINTA.- (DEL DOMICILIO)

El domicilio legal de la sociedad se fija en ${v(f, "domicilio_legal")}, de la ciudad de ${v(f, "ciudad")}, Estado Plurinacional de Bolivia. La sociedad podrá establecer sucursales, agencias u oficinas en cualquier lugar del territorio nacional o en el exterior, por decisión de la junta de socios.

CLÁUSULA SEXTA.- (DEL CAPITAL SOCIAL)

El capital social es de ${formatCurrency(String(capital))} (${numberToWords(capital)} bolivianos), dividido en ${cuotas} cuotas de capital de Bs. 100.- (cien bolivianos) cada una, totalmente suscrito y pagado de la siguiente forma:

- ${v(f, "socio_1_nombre")}: Aporta ${formatCurrency(String(aporte1))} (${numberToWords(aporte1)} bolivianos), equivalente a ${cuotas1} cuotas (${pct1}% del capital social).
- ${v(f, "socio_2_nombre")}: Aporta ${formatCurrency(String(aporte2))} (${numberToWords(aporte2)} bolivianos), equivalente a ${cuotas2} cuotas (${pct2}% del capital social).

Los aportes han sido realizados en dinero efectivo, quedando depositados en la cuenta bancaria de la sociedad.

CLÁUSULA SÉPTIMA.- (DE LA DURACIÓN)

La sociedad tendrá una duración de ${f.duracion_sociedad === "indefinida" ? "tiempo INDEFINIDO" : f.duracion_sociedad + " años"}, computables a partir de la fecha de inscripción en el Registro de Comercio (FUNDEMPRESA).

CLÁUSULA OCTAVA.- (DE LA ADMINISTRACIÓN Y REPRESENTACIÓN LEGAL)

La administración y representación legal de la sociedad estará a cargo de un Gerente General, quien será: ${v(f, "gerente")}.

El Gerente General tendrá las siguientes facultades:
a) Representar legalmente a la sociedad ante terceros, entidades públicas y privadas.
b) Administrar los negocios sociales.
c) Suscribir contratos, convenios y obligaciones en nombre de la sociedad.
d) Abrir, manejar y cerrar cuentas bancarias.
e) Otorgar poderes especiales.
f) Contratar y despedir personal.
g) Realizar todas las gestiones necesarias para el cumplimiento del objeto social.

Las operaciones que comprometan el patrimonio social en un monto superior al 25% del capital social requerirán aprobación previa de la junta de socios.

CLÁUSULA NOVENA.- (DE LAS JUNTAS DE SOCIOS)

La junta de socios es el órgano supremo de la sociedad. Las decisiones se tomarán por mayoría de votos computados en proporción a las cuotas de capital de cada socio.

Se requerirá unanimidad para:
a) Modificación del contrato social.
b) Cambio del objeto social.
c) Aumento o reducción del capital social.
d) Disolución anticipada de la sociedad.

CLÁUSULA DÉCIMA.- (DE LA DISTRIBUCIÓN DE UTILIDADES Y PÉRDIDAS)

Las utilidades netas de cada gestión se distribuirán entre los socios en proporción a sus cuotas de capital, previa deducción de la reserva legal del 5% (hasta alcanzar el 50% del capital social, conforme al Art. 170 del Código de Comercio).

Las pérdidas se asumirán en la misma proporción.

CLÁUSULA DÉCIMA PRIMERA.- (DE LA CESIÓN DE CUOTAS)

La cesión de cuotas de capital requerirá el consentimiento de los demás socios. En caso de cesión, los demás socios tendrán derecho de preferencia en la adquisición.

CLÁUSULA DÉCIMA SEGUNDA.- (DE LA DISOLUCIÓN Y LIQUIDACIÓN)

La sociedad se disolverá por las causales previstas en el Art. 378 del Código de Comercio:
a) Por acuerdo de los socios.
b) Por vencimiento del plazo.
c) Por cumplimiento o imposibilidad del objeto social.
d) Por pérdida de más de la mitad del capital social.
e) Por reducción del número de socios a uno solo (por más de 6 meses).
f) Por las demás causales previstas por ley.

La liquidación se realizará conforme a los Arts. 384-404 del Código de Comercio.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA TERCERA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

Usted, Señor Notario, se servirá agregar las demás formalidades de estilo y ley.

Es cuanto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_constitucion)}.



_______________________________          _______________________________
PRIMER SOCIO                             SEGUNDO SOCIO
${v(f, "socio_1_nombre")}                 ${v(f, "socio_2_nombre")}
C.I. ${v(f, "socio_1_ci")}                C.I. ${v(f, "socio_2_ci")}`;
}

function generateObra(f: FieldValues): string {
  const precio = parseFloat(f.precio_total || "0");
  const anticipo = parseFloat(f.anticipo || "0");
  const multa = parseFloat(f.multa_diaria || "0");
  const formasPago: Record<string, string> = {
    avance: "según el avance de obra verificado por el propietario o su representante",
    mensual: "en pagos mensuales iguales durante el plazo de ejecución",
    hitos: "por hitos o etapas de la obra, conforme al cronograma acordado",
    final: "en un solo pago al finalizar y recibir la obra conforme",
  };
  const materialesTexto: Record<string, string> = {
    contratista: "EL/LA CONTRATISTA se compromete a proveer todos los materiales necesarios, los cuales están incluidos en el precio total de la obra",
    propietario: "EL/LA PROPIETARIO(A) proveerá todos los materiales necesarios para la ejecución de la obra. EL/LA CONTRATISTA es responsable únicamente de la mano de obra",
    mixto: "Los materiales serán provistos de forma compartida entre ambas partes, según acuerdo detallado que se adjuntará como anexo al presente contrato",
  };

  return `CONTRATO DE OBRA / CONSTRUCCIÓN

Conste por el presente documento privado, que podrá ser elevado a instrumento público a solo reconocimiento de firmas y rúbricas, el siguiente CONTRATO DE OBRA, suscrito al tenor de las siguientes cláusulas:

CLÁUSULA PRIMERA.- (DE LAS PARTES)

Por una parte, ${partyBlock(f, "propietario", "EL/LA PROPIETARIO(A) o COMITENTE")}.

Por otra parte, ${partyBlock(f, "contratista", "EL/LA CONTRATISTA")}.

CLÁUSULA SEGUNDA.- (DEL OBJETO)

EL/LA CONTRATISTA se compromete a ejecutar la siguiente obra:

${v(f, "descripcion_obra")}

Ubicación de la obra: ${v(f, "ubicacion_obra")}, ciudad de ${v(f, "ciudad")}.

CLÁUSULA TERCERA.- (DEL PRECIO)

El precio total de la obra se fija en ${formatCurrency(String(precio))} (${numberToWords(precio)} bolivianos), monto que incluye ${f.materiales === "contratista" ? "materiales y " : ""}mano de obra${f.materiales === "contratista" ? "" : " (sin materiales)"}.

CLÁUSULA CUARTA.- (DE LA FORMA DE PAGO)

EL/LA PROPIETARIO(A) realizará los pagos de la siguiente manera:

a) Anticipo: ${formatCurrency(String(anticipo))} (${numberToWords(anticipo)} bolivianos) al momento de la firma del presente contrato.
b) Saldo: ${formatCurrency(String(precio - anticipo))} (${numberToWords(precio - anticipo)} bolivianos), que serán pagados ${formasPago[f.forma_pago] || "según acuerdo de las partes"}.

CLÁUSULA QUINTA.- (DE LOS MATERIALES)

${materialesTexto[f.materiales] || materialesTexto.contratista}.

Los materiales utilizados deberán ser de buena calidad y cumplir con las especificaciones técnicas acordadas.

CLÁUSULA SEXTA.- (DEL PLAZO DE EJECUCIÓN)

La obra deberá iniciarse el ${formatDate(f.fecha_inicio)} y concluirse en un plazo máximo de ${v(f, "plazo_dias")} días calendario.

Las ampliaciones de plazo solo procederán por caso fortuito, fuerza mayor o por modificaciones solicitadas por EL/LA PROPIETARIO(A), debiendo documentarse por escrito.

CLÁUSULA SÉPTIMA.- (DE LAS PENALIDADES POR RETRASO)

${multa > 0
    ? `En caso de retraso imputable a EL/LA CONTRATISTA, se aplicará una multa de ${formatCurrency(String(multa))} (${numberToWords(multa)} bolivianos) por cada día calendario de retraso, la cual podrá ser deducida del saldo pendiente de pago. La multa acumulada no podrá exceder el 10% del precio total de la obra.`
    : "En caso de retraso imputable a EL/LA CONTRATISTA, las partes acordarán las penalidades correspondientes."
}

CLÁUSULA OCTAVA.- (DE LAS OBLIGACIONES DEL CONTRATISTA)

EL/LA CONTRATISTA se obliga a:
a) Ejecutar la obra conforme a las especificaciones técnicas, planos y normas de construcción aplicables.
b) Emplear personal calificado y cumplir con las normas de seguridad laboral.
c) Cumplir con los plazos establecidos.
d) Obtener los permisos municipales de construcción necesarios.
e) Mantener el orden y limpieza del área de trabajo.
f) Afiliar a su personal al sistema de seguridad social.
g) Responder por la calidad de los materiales y la mano de obra.

CLÁUSULA NOVENA.- (DE LA RECEPCIÓN DE LA OBRA)

Al finalizar la obra, se realizará una recepción provisional donde EL/LA PROPIETARIO(A) verificará el cumplimiento de las especificaciones. EL/LA CONTRATISTA tendrá un plazo de quince (15) días para subsanar las observaciones que se formulen.

La recepción definitiva se realizará treinta (30) días después de la recepción provisional, previo pago del saldo pendiente.

CLÁUSULA DÉCIMA.- (DE LA RESPONSABILIDAD POR DEFECTOS)

Conforme al Art. 745 del Código Civil, EL/LA CONTRATISTA y el director de la obra (si lo hubiere) son responsables solidariamente por la ruina total o parcial de la construcción por defectos de la misma, durante un plazo de DIEZ (10) AÑOS contados desde la fecha de conclusión de la obra.

EL/LA CONTRATISTA otorga además una garantía de UN (1) AÑO por defectos ocultos y acabados.

CLÁUSULA DÉCIMA PRIMERA.- (DE LA RESOLUCIÓN)

El presente contrato podrá ser resuelto por:
a) Mutuo acuerdo de las partes.
b) Incumplimiento grave de las obligaciones contractuales.
c) Abandono de la obra por más de quince (15) días consecutivos.
d) Caso fortuito o fuerza mayor que imposibilite la continuación de la obra.

CLÁUSULA DÉCIMA SEGUNDA.- (DE LA JURISDICCIÓN)

Las partes se someten a la jurisdicción de los juzgados ordinarios de la ciudad de ${v(f, "ciudad")}.
${f.clausulas_adicionales ? `\nCLÁUSULA DÉCIMA TERCERA.- (CLÁUSULAS ADICIONALES)\n\n${f.clausulas_adicionales}` : ""}

En señal de conformidad, ambas partes firman el presente contrato en dos ejemplares de un mismo tenor y efecto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_inicio)}.



_______________________________          _______________________________
EL/LA PROPIETARIO(A)                     EL/LA CONTRATISTA
${v(f, "propietario_nombre")}             ${v(f, "contratista_nombre")}
C.I. ${v(f, "propietario_ci")}            C.I. ${v(f, "contratista_ci")}`;
}

function generatePoder(f: FieldValues): string {
  const tipoPoder: Record<string, string> = {
    general: "PODER GENERAL DE ADMINISTRACIÓN",
    especial: "PODER ESPECIAL",
    especial_irrevocable: "PODER ESPECIAL E IRREVOCABLE",
  };
  const duracionTexto: Record<string, string> = {
    indefinido: "El presente poder tendrá vigencia indefinida, hasta su revocación expresa por parte del PODERDANTE",
    acto: "El presente poder tendrá vigencia hasta la conclusión del acto específico para el cual fue otorgado",
    "1": "El presente poder tendrá una vigencia de un (1) año",
    "2": "El presente poder tendrá una vigencia de dos (2) años",
    "5": "El presente poder tendrá una vigencia de cinco (5) años",
  };

  return `${tipoPoder[f.tipo_poder] || "PODER NOTARIAL"}

Señor Notario de Fe Pública:

En el registro de escrituras públicas a su cargo, sírvase insertar el presente ${tipoPoder[f.tipo_poder] || "PODER NOTARIAL"}, con las siguientes cláusulas:

NOTA: Los poderes notariales DEBEN ser otorgados mediante escritura pública ante Notario de Fe Pública para su validez legal (Art. 811 del Código Civil).

CLÁUSULA PRIMERA.- (DEL PODERDANTE)

${v(f, "poderdante_nombre")}, de nacionalidad ${v(f, "poderdante_nacionalidad")}, de estado civil ${v(f, "poderdante_estado_civil")}, de profesión ${v(f, "poderdante_profesion")}, mayor de edad, hábil por derecho, con Cédula de Identidad No. ${v(f, "poderdante_ci")}, con domicilio en ${v(f, "poderdante_domicilio")}, quien en adelante se denominará "EL/LA PODERDANTE".

CLÁUSULA SEGUNDA.- (DEL APODERADO)

${v(f, "apoderado_nombre")}, de nacionalidad ${v(f, "apoderado_nacionalidad")}, de estado civil ${v(f, "apoderado_estado_civil")}, de profesión ${v(f, "apoderado_profesion")}, mayor de edad, hábil por derecho, con Cédula de Identidad No. ${v(f, "apoderado_ci")}, con domicilio en ${v(f, "apoderado_domicilio")}, quien en adelante se denominará "EL/LA APODERADO(A)".

CLÁUSULA TERCERA.- (DEL OTORGAMIENTO)

EL/LA PODERDANTE, de libre y espontánea voluntad, otorga ${tipoPoder[f.tipo_poder] || "PODER"} amplio y suficiente a favor de EL/LA APODERADO(A), para que en su nombre y representación realice los siguientes actos:

CLÁUSULA CUARTA.- (DE LAS FACULTADES)

Se confieren las siguientes facultades:

${v(f, "facultades")}
${f.acto_especifico ? `\nActo específico: ${f.acto_especifico}` : ""}

${f.tipo_poder === "general" ? `Adicionalmente, EL/LA APODERADO(A) queda facultado(a) para realizar todos los actos de administración ordinaria que sean necesarios en interés del PODERDANTE, incluyendo pero no limitándose a:
a) Representar al PODERDANTE ante entidades públicas y privadas.
b) Suscribir documentos, solicitudes y declaraciones.
c) Realizar trámites administrativos, bancarios y judiciales.
d) Cobrar y recibir sumas de dinero, otorgando los recibos correspondientes.
e) Intervenir en procedimientos administrativos y judiciales.` : ""}

CLÁUSULA QUINTA.- (DE LA REVOCABILIDAD)

${f.revocable === "no"
    ? "El presente poder es IRREVOCABLE, conforme al Art. 831 del Código Civil, por haber sido otorgado en interés del APODERADO(A) o de un tercero. Solo podrá ser revocado por causa justificada reconocida judicialmente."
    : "El presente poder es REVOCABLE, pudiendo EL/LA PODERDANTE dejarlo sin efecto en cualquier momento mediante comunicación escrita al APODERADO(A) y protocolización de la revocación ante Notario de Fe Pública."
}

CLÁUSULA SEXTA.- (DE LA SUSTITUCIÓN)

${f.sustitucion === "si"
    ? "EL/LA APODERADO(A) queda facultado(a) para sustituir el presente poder a favor de otra persona, bajo su responsabilidad."
    : "El presente poder es INTRANSFERIBLE. EL/LA APODERADO(A) NO podrá sustituir ni delegar las facultades conferidas a terceras personas."
}

CLÁUSULA SÉPTIMA.- (DEL PLAZO)

${duracionTexto[f.duracion] || "El presente poder tendrá vigencia hasta su revocación"}, contados desde la fecha de su otorgamiento el ${formatDate(f.fecha_poder)}.

CLÁUSULA OCTAVA.- (DE LAS OBLIGACIONES DEL APODERADO)

EL/LA APODERADO(A) se obliga a:
a) Actuar dentro de los límites de las facultades conferidas.
b) Desempeñar el mandato con la diligencia de un buen administrador.
c) Rendir cuentas de su gestión al PODERDANTE.
d) No utilizar las facultades en beneficio propio o de terceros, salvo autorización expresa.

CLÁUSULA NOVENA.- (DE LA EXTINCIÓN)

El presente poder se extinguirá por:
a) Revocación por parte del PODERDANTE (si es revocable).
b) Renuncia del APODERADO(A).
c) Muerte o incapacidad de cualquiera de las partes.
d) Cumplimiento del acto específico (si es poder especial).
e) Vencimiento del plazo (si se estableció uno).
f) Las demás causales previstas en los Arts. 827-840 del Código Civil.

Usted, Señor Notario, se servirá agregar las demás formalidades de estilo y ley.

Es cuanto, en la ciudad de ${v(f, "ciudad")}, a los ${formatDate(f.fecha_poder)}.



_______________________________          _______________________________
EL/LA PODERDANTE                         EL/LA APODERADO(A)
${v(f, "poderdante_nombre")}              ${v(f, "apoderado_nombre")}
C.I. ${v(f, "poderdante_ci")}             C.I. ${v(f, "apoderado_ci")}`;
}
