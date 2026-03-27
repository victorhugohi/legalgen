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
