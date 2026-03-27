export interface ContractField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "select" | "currency";
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  helperText?: string;
  group?: string;
}

export interface ContractType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: "civil" | "laboral" | "comercial" | "inmobiliario";
  icon: string;
  tier: "free" | "premium";
  fields: ContractField[];
  legalBasis: string;
}

export const CATEGORIES = {
  inmobiliario: {
    label: "Inmobiliario",
    description: "Contratos relacionados con bienes inmuebles",
    icon: "🏠",
  },
  civil: {
    label: "Civil",
    description: "Contratos civiles y personales",
    icon: "📋",
  },
  laboral: {
    label: "Laboral",
    description: "Contratos de trabajo y servicios",
    icon: "💼",
  },
  comercial: {
    label: "Comercial",
    description: "Contratos comerciales y empresariales",
    icon: "🏢",
  },
};

export const DEPARTAMENTOS_BOLIVIA = [
  { value: "La Paz", label: "La Paz" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Cochabamba", label: "Cochabamba" },
  { value: "Oruro", label: "Oruro" },
  { value: "Potosí", label: "Potosí" },
  { value: "Tarija", label: "Tarija" },
  { value: "Sucre", label: "Sucre" },
  { value: "Beni", label: "Beni" },
  { value: "Pando", label: "Pando" },
];

const COMMON_PARTY_FIELDS = (
  prefix: string,
  label: string
): ContractField[] => [
  {
    name: `${prefix}_nombre`,
    label: `Nombre completo - ${label}`,
    type: "text",
    placeholder: "Ej: Juan Carlos Pérez Mamani",
    required: true,
    group: label,
  },
  {
    name: `${prefix}_ci`,
    label: `Cédula de Identidad (CI) - ${label}`,
    type: "text",
    placeholder: "Ej: 1234567 LP",
    required: true,
    helperText: "Número de CI seguido de la extensión (LP, SC, CB, OR, PT, TJ, CH, BE, PA). Puede incluir complemento: 1234567-1A SC",
    group: label,
  },
  {
    name: `${prefix}_nacionalidad`,
    label: `Nacionalidad - ${label}`,
    type: "text",
    placeholder: "Ej: boliviana",
    required: true,
    group: label,
  },
  {
    name: `${prefix}_estado_civil`,
    label: `Estado civil - ${label}`,
    type: "select",
    options: [
      { value: "soltero(a)", label: "Soltero(a)" },
      { value: "casado(a)", label: "Casado(a)" },
      { value: "viudo(a)", label: "Viudo(a)" },
      { value: "divorciado(a)", label: "Divorciado(a)" },
      { value: "unión libre", label: "Unión libre" },
    ],
    required: true,
    group: label,
  },
  {
    name: `${prefix}_profesion`,
    label: `Profesión u oficio - ${label}`,
    type: "text",
    placeholder: "Ej: Ingeniero Civil, Comerciante, Abogado",
    required: true,
    group: label,
  },
  {
    name: `${prefix}_domicilio`,
    label: `Domicilio - ${label}`,
    type: "text",
    placeholder: "Ej: Calle Comercio No. 123, Zona Central",
    required: true,
    group: label,
  },
];

export const CONTRACT_TYPES: ContractType[] = [
  // ============ INMOBILIARIO ============
  {
    id: "alquiler",
    name: "Contrato de Alquiler / Arrendamiento",
    shortName: "Alquiler",
    description:
      "Contrato para el arrendamiento de bienes inmuebles (casas, departamentos, locales comerciales, terrenos).",
    category: "inmobiliario",
    icon: "🏠",
    tier: "free",
    legalBasis: "Código Civil Boliviano, Arts. 685-714; Ley de Inquilinato",
    fields: [
      ...COMMON_PARTY_FIELDS("arrendador", "Arrendador (Propietario)"),
      ...COMMON_PARTY_FIELDS("arrendatario", "Arrendatario (Inquilino)"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "Propiedad",
      },
      {
        name: "direccion_inmueble",
        label: "Dirección del inmueble",
        type: "text",
        placeholder: "Ej: Av. 6 de Agosto No. 456, Zona Sopocachi",
        required: true,
        group: "Propiedad",
      },
      {
        name: "tipo_inmueble",
        label: "Tipo de inmueble",
        type: "select",
        options: [
          { value: "casa", label: "Casa" },
          { value: "departamento", label: "Departamento" },
          { value: "local_comercial", label: "Local Comercial" },
          { value: "oficina", label: "Oficina" },
          { value: "terreno", label: "Terreno" },
          { value: "garaje", label: "Garaje" },
          { value: "habitacion", label: "Habitación" },
        ],
        required: true,
        group: "Propiedad",
      },
      {
        name: "canon_mensual",
        label: "Canon de alquiler mensual (Bs.)",
        type: "currency",
        placeholder: "Ej: 2500",
        required: true,
        group: "Condiciones",
      },
      {
        name: "garantia",
        label: "Garantía / Depósito (Bs.)",
        type: "currency",
        placeholder: "Ej: 5000",
        required: true,
        helperText: "Generalmente equivale a 2 meses de alquiler",
        group: "Condiciones",
      },
      {
        name: "dia_pago",
        label: "Día de pago mensual",
        type: "select",
        options: Array.from({ length: 28 }, (_, i) => ({
          value: String(i + 1),
          label: `Día ${i + 1}`,
        })),
        required: true,
        group: "Condiciones",
      },
      {
        name: "fecha_inicio",
        label: "Fecha de inicio del contrato",
        type: "date",
        required: true,
        group: "Plazo",
      },
      {
        name: "duracion_meses",
        label: "Duración (meses)",
        type: "select",
        options: [
          { value: "6", label: "6 meses" },
          { value: "12", label: "12 meses (1 año)" },
          { value: "24", label: "24 meses (2 años)" },
          { value: "36", label: "36 meses (3 años)" },
        ],
        required: true,
        group: "Plazo",
      },
      {
        name: "servicios_incluidos",
        label: "Servicios incluidos en el alquiler",
        type: "textarea",
        placeholder: "Ej: Agua, gas natural. Los servicios de luz, internet y cable son por cuenta del arrendatario.",
        required: false,
        group: "Condiciones",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        placeholder: "Ingrese cláusulas adicionales que desee incluir...",
        required: false,
        group: "Adicional",
      },
    ],
  },
  {
    id: "anticretico",
    name: "Contrato de Anticrético",
    shortName: "Anticrético",
    description:
      "Contrato típico boliviano donde se entrega una suma de dinero a cambio del uso de un inmueble por un plazo determinado.",
    category: "inmobiliario",
    icon: "🏘️",
    tier: "free",
    legalBasis:
      "Código Civil Boliviano, Arts. 1429-1440; derecho real de garantía",
    fields: [
      ...COMMON_PARTY_FIELDS("propietario", "Propietario del Inmueble"),
      ...COMMON_PARTY_FIELDS("anticresista", "Anticresista"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "Propiedad",
      },
      {
        name: "direccion_inmueble",
        label: "Dirección del inmueble",
        type: "text",
        placeholder: "Ej: Calle Murillo No. 789, Zona Central",
        required: true,
        group: "Propiedad",
      },
      {
        name: "tipo_inmueble",
        label: "Tipo de inmueble",
        type: "select",
        options: [
          { value: "casa", label: "Casa" },
          { value: "departamento", label: "Departamento" },
          { value: "local_comercial", label: "Local Comercial" },
        ],
        required: true,
        group: "Propiedad",
      },
      {
        name: "monto_anticretico",
        label: "Monto del anticrético ($us.)",
        type: "currency",
        placeholder: "Ej: 15000",
        required: true,
        helperText: "Monto en dólares americanos que se entrega al propietario",
        group: "Condiciones",
      },
      {
        name: "fecha_inicio",
        label: "Fecha de inicio",
        type: "date",
        required: true,
        group: "Plazo",
      },
      {
        name: "duracion_anos",
        label: "Duración (años)",
        type: "select",
        options: [
          { value: "1", label: "1 año" },
          { value: "2", label: "2 años" },
          { value: "3", label: "3 años" },
          { value: "5", label: "5 años" },
        ],
        required: true,
        group: "Plazo",
      },
      {
        name: "descripcion_inmueble",
        label: "Descripción del inmueble",
        type: "textarea",
        placeholder:
          "Ej: Departamento de 3 ambientes con 2 dormitorios, sala, cocina, 1 baño, ubicado en el segundo piso...",
        required: true,
        group: "Propiedad",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        placeholder: "Ingrese cláusulas adicionales...",
        required: false,
        group: "Adicional",
      },
    ],
  },
  {
    id: "compraventa-inmueble",
    name: "Contrato de Compraventa de Inmueble",
    shortName: "Compraventa Inmueble",
    description:
      "Contrato para la transferencia de propiedad de bienes inmuebles (casas, terrenos, departamentos).",
    category: "inmobiliario",
    icon: "🏗️",
    tier: "free",
    legalBasis: "Código Civil Boliviano, Arts. 584-618; Ley INRA (para terrenos rurales)",
    fields: [
      ...COMMON_PARTY_FIELDS("vendedor", "Vendedor"),
      ...COMMON_PARTY_FIELDS("comprador", "Comprador"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "Propiedad",
      },
      {
        name: "direccion_inmueble",
        label: "Dirección del inmueble",
        type: "text",
        placeholder: "Ej: Urbanización Los Pinos, Manzana 5, Lote 12",
        required: true,
        group: "Propiedad",
      },
      {
        name: "tipo_inmueble",
        label: "Tipo de inmueble",
        type: "select",
        options: [
          { value: "casa", label: "Casa" },
          { value: "departamento", label: "Departamento" },
          { value: "terreno", label: "Terreno" },
          { value: "local_comercial", label: "Local Comercial" },
        ],
        required: true,
        group: "Propiedad",
      },
      {
        name: "superficie",
        label: "Superficie (m²)",
        type: "number",
        placeholder: "Ej: 250",
        required: true,
        group: "Propiedad",
      },
      {
        name: "numero_folio_real",
        label: "Número de Folio Real / Matrícula",
        type: "text",
        placeholder: "Ej: 2.01.1.01.0012345",
        required: true,
        helperText: "Registro en Derechos Reales",
        group: "Propiedad",
      },
      {
        name: "precio_venta",
        label: "Precio de venta ($us.)",
        type: "currency",
        placeholder: "Ej: 85000",
        required: true,
        group: "Condiciones",
      },
      {
        name: "forma_pago",
        label: "Forma de pago",
        type: "select",
        options: [
          { value: "contado", label: "Al contado" },
          { value: "cuotas", label: "En cuotas" },
          { value: "mixto", label: "Mixto (anticipo + cuotas)" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "descripcion_inmueble",
        label: "Descripción detallada del inmueble",
        type: "textarea",
        placeholder:
          "Describa las características del inmueble, colindancias, etc.",
        required: true,
        group: "Propiedad",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },

  // ============ CIVIL ============
  {
    id: "compraventa-vehiculo",
    name: "Contrato de Compraventa de Vehículo",
    shortName: "Compraventa Vehículo",
    description:
      "Contrato para la transferencia de propiedad de vehículos automotores.",
    category: "civil",
    icon: "🚗",
    tier: "free",
    legalBasis: "Código Civil Boliviano, Arts. 584-618; normativa de tránsito",
    fields: [
      ...COMMON_PARTY_FIELDS("vendedor", "Vendedor"),
      ...COMMON_PARTY_FIELDS("comprador", "Comprador"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "General",
      },
      {
        name: "marca",
        label: "Marca del vehículo",
        type: "text",
        placeholder: "Ej: Toyota",
        required: true,
        group: "Vehículo",
      },
      {
        name: "modelo",
        label: "Modelo",
        type: "text",
        placeholder: "Ej: Hilux SRV",
        required: true,
        group: "Vehículo",
      },
      {
        name: "anio",
        label: "Año de fabricación",
        type: "number",
        placeholder: "Ej: 2020",
        required: true,
        group: "Vehículo",
      },
      {
        name: "color",
        label: "Color",
        type: "text",
        placeholder: "Ej: Blanco",
        required: true,
        group: "Vehículo",
      },
      {
        name: "placa",
        label: "Número de placa",
        type: "text",
        placeholder: "Ej: 1234-ABC",
        required: true,
        group: "Vehículo",
      },
      {
        name: "numero_motor",
        label: "Número de motor",
        type: "text",
        placeholder: "Número de motor del vehículo",
        required: true,
        group: "Vehículo",
      },
      {
        name: "numero_chasis",
        label: "Número de chasis (VIN)",
        type: "text",
        placeholder: "Número de chasis/VIN",
        required: true,
        group: "Vehículo",
      },
      {
        name: "precio_venta",
        label: "Precio de venta ($us.)",
        type: "currency",
        placeholder: "Ej: 25000",
        required: true,
        group: "Condiciones",
      },
      {
        name: "forma_pago",
        label: "Forma de pago",
        type: "select",
        options: [
          { value: "contado", label: "Al contado" },
          { value: "cuotas", label: "En cuotas" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },
  {
    id: "prestamo",
    name: "Contrato de Préstamo de Dinero",
    shortName: "Préstamo",
    description:
      "Contrato para formalizar un préstamo de dinero entre personas, con o sin interés.",
    category: "civil",
    icon: "💰",
    tier: "free",
    legalBasis: "Código Civil Boliviano, Arts. 872-902; normativa sobre usura",
    fields: [
      ...COMMON_PARTY_FIELDS("prestamista", "Prestamista (Acreedor)"),
      ...COMMON_PARTY_FIELDS("prestatario", "Prestatario (Deudor)"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "General",
      },
      {
        name: "monto_prestamo",
        label: "Monto del préstamo (Bs.)",
        type: "currency",
        placeholder: "Ej: 10000",
        required: true,
        group: "Condiciones",
      },
      {
        name: "moneda",
        label: "Moneda",
        type: "select",
        options: [
          { value: "bolivianos", label: "Bolivianos (Bs.)" },
          { value: "dolares", label: "Dólares Americanos ($us.)" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "interes_mensual",
        label: "Interés mensual (%)",
        type: "number",
        placeholder: "Ej: 1.5 (dejar en 0 si es sin interés)",
        required: true,
        helperText: "Tasa de interés mensual. 0 para préstamos sin interés.",
        group: "Condiciones",
      },
      {
        name: "fecha_prestamo",
        label: "Fecha del préstamo",
        type: "date",
        required: true,
        group: "Plazo",
      },
      {
        name: "plazo_meses",
        label: "Plazo de devolución (meses)",
        type: "select",
        options: [
          { value: "1", label: "1 mes" },
          { value: "3", label: "3 meses" },
          { value: "6", label: "6 meses" },
          { value: "12", label: "12 meses" },
          { value: "24", label: "24 meses" },
          { value: "36", label: "36 meses" },
        ],
        required: true,
        group: "Plazo",
      },
      {
        name: "forma_pago",
        label: "Forma de pago",
        type: "select",
        options: [
          { value: "mensual", label: "Cuotas mensuales" },
          { value: "trimestral", label: "Cuotas trimestrales" },
          { value: "vencimiento", label: "Al vencimiento del plazo" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "garantia",
        label: "Garantía ofrecida",
        type: "textarea",
        placeholder:
          "Ej: Vehículo marca Toyota, placa 1234-ABC / Sin garantía",
        required: false,
        helperText: "Describa la garantía si la hay, o deje en blanco",
        group: "Condiciones",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },

  // ============ LABORAL ============
  {
    id: "trabajo",
    name: "Contrato de Trabajo",
    shortName: "Trabajo",
    description:
      "Contrato laboral conforme a la Ley General del Trabajo de Bolivia. Para relaciones de dependencia laboral.",
    category: "laboral",
    icon: "👔",
    tier: "free",
    legalBasis:
      "Ley General del Trabajo (D.L. 24/05/1939); D.R. de la LGT; Constitución Política del Estado, Art. 46-55",
    fields: [
      {
        name: "empleador_empresa",
        label: "Nombre de la empresa / Empleador",
        type: "text",
        placeholder: "Ej: Empresa Constructora Boliviana S.R.L.",
        required: true,
        group: "Empleador",
      },
      {
        name: "empleador_nit",
        label: "NIT del empleador",
        type: "text",
        placeholder: "Ej: 1234567890",
        required: true,
        group: "Empleador",
      },
      {
        name: "empleador_representante",
        label: "Representante legal",
        type: "text",
        placeholder: "Ej: María González Flores",
        required: true,
        group: "Empleador",
      },
      {
        name: "empleador_ci",
        label: "CI del representante legal",
        type: "text",
        placeholder: "Ej: 9876543 SC",
        required: true,
        group: "Empleador",
      },
      {
        name: "empleador_direccion",
        label: "Dirección de la empresa",
        type: "text",
        placeholder: "Ej: Av. Camacho No. 1234, Zona Central",
        required: true,
        group: "Empleador",
      },
      ...COMMON_PARTY_FIELDS("trabajador", "Trabajador"),
      {
        name: "ciudad",
        label: "Ciudad del lugar de trabajo",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "Puesto",
      },
      {
        name: "cargo",
        label: "Cargo / Puesto de trabajo",
        type: "text",
        placeholder: "Ej: Contador General",
        required: true,
        group: "Puesto",
      },
      {
        name: "descripcion_funciones",
        label: "Descripción de funciones",
        type: "textarea",
        placeholder: "Describa las funciones principales del puesto...",
        required: true,
        group: "Puesto",
      },
      {
        name: "salario_mensual",
        label: "Salario mensual (Bs.)",
        type: "currency",
        placeholder: "Ej: 4500",
        required: true,
        helperText: "Salario mínimo nacional vigente: Bs. 2,500",
        group: "Remuneración",
      },
      {
        name: "tipo_contrato",
        label: "Tipo de contrato",
        type: "select",
        options: [
          { value: "indefinido", label: "Plazo indefinido" },
          { value: "fijo", label: "Plazo fijo" },
          { value: "eventual", label: "Eventual / Por obra" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "fecha_inicio",
        label: "Fecha de inicio",
        type: "date",
        required: true,
        group: "Condiciones",
      },
      {
        name: "periodo_prueba",
        label: "Período de prueba",
        type: "select",
        options: [
          { value: "30", label: "30 días" },
          { value: "60", label: "60 días" },
          { value: "90", label: "90 días (máximo legal)" },
        ],
        required: true,
        helperText: "Máximo 90 días según la Ley General del Trabajo",
        group: "Condiciones",
      },
      {
        name: "horario",
        label: "Horario de trabajo",
        type: "text",
        placeholder: "Ej: Lunes a Viernes de 08:00 a 12:00 y de 14:30 a 18:30",
        required: true,
        helperText: "Máximo 8 horas diarias / 48 horas semanales",
        group: "Condiciones",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },
  {
    id: "servicios",
    name: "Contrato de Prestación de Servicios",
    shortName: "Servicios",
    description:
      "Contrato para la prestación de servicios profesionales independientes (consultorías, trabajos freelance).",
    category: "laboral",
    icon: "🛠️",
    tier: "free",
    legalBasis: "Código Civil Boliviano, Arts. 732-756",
    fields: [
      ...COMMON_PARTY_FIELDS("contratante", "Contratante"),
      ...COMMON_PARTY_FIELDS("prestador", "Prestador de Servicios"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "General",
      },
      {
        name: "descripcion_servicio",
        label: "Descripción del servicio",
        type: "textarea",
        placeholder:
          "Describa detalladamente los servicios a prestar...",
        required: true,
        group: "Servicio",
      },
      {
        name: "monto_total",
        label: "Monto total del servicio (Bs.)",
        type: "currency",
        placeholder: "Ej: 15000",
        required: true,
        group: "Condiciones",
      },
      {
        name: "forma_pago",
        label: "Forma de pago",
        type: "select",
        options: [
          { value: "total", label: "Pago único al finalizar" },
          { value: "parcial", label: "50% inicio - 50% final" },
          { value: "mensual", label: "Pagos mensuales" },
          { value: "hitos", label: "Por hitos/entregables" },
        ],
        required: true,
        group: "Condiciones",
      },
      {
        name: "fecha_inicio",
        label: "Fecha de inicio",
        type: "date",
        required: true,
        group: "Plazo",
      },
      {
        name: "fecha_fin",
        label: "Fecha de finalización",
        type: "date",
        required: true,
        group: "Plazo",
      },
      {
        name: "entregables",
        label: "Entregables / Productos esperados",
        type: "textarea",
        placeholder: "Liste los productos o entregables del servicio...",
        required: false,
        group: "Servicio",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },

  // ============ COMERCIAL ============
  {
    id: "confidencialidad",
    name: "Acuerdo de Confidencialidad (NDA)",
    shortName: "Confidencialidad",
    description:
      "Acuerdo para proteger información confidencial entre partes en una relación comercial o laboral.",
    category: "comercial",
    icon: "🔒",
    tier: "premium",
    legalBasis: "Código Civil Boliviano; Código de Comercio, Arts. 54-63",
    fields: [
      ...COMMON_PARTY_FIELDS("parte_reveladora", "Parte Reveladora"),
      ...COMMON_PARTY_FIELDS("parte_receptora", "Parte Receptora"),
      {
        name: "ciudad",
        label: "Ciudad",
        type: "select",
        options: DEPARTAMENTOS_BOLIVIA,
        required: true,
        group: "General",
      },
      {
        name: "proposito",
        label: "Propósito del acuerdo",
        type: "textarea",
        placeholder:
          "Ej: Evaluación de una posible relación comercial para distribución de productos...",
        required: true,
        group: "Condiciones",
      },
      {
        name: "tipo_informacion",
        label: "Tipo de información confidencial",
        type: "textarea",
        placeholder:
          "Ej: Información técnica, financiera, listas de clientes, estrategias comerciales...",
        required: true,
        group: "Condiciones",
      },
      {
        name: "duracion_anos",
        label: "Duración del acuerdo (años)",
        type: "select",
        options: [
          { value: "1", label: "1 año" },
          { value: "2", label: "2 años" },
          { value: "3", label: "3 años" },
          { value: "5", label: "5 años" },
        ],
        required: true,
        group: "Plazo",
      },
      {
        name: "penalidad",
        label: "Penalidad por incumplimiento ($us.)",
        type: "currency",
        placeholder: "Ej: 10000",
        required: false,
        group: "Condiciones",
      },
      {
        name: "clausulas_adicionales",
        label: "Cláusulas adicionales",
        type: "textarea",
        required: false,
        group: "Adicional",
      },
    ],
  },
];

export function getContractById(id: string): ContractType | undefined {
  return CONTRACT_TYPES.find((c) => c.id === id);
}

export function getContractsByCategory(
  category: ContractType["category"]
): ContractType[] {
  return CONTRACT_TYPES.filter((c) => c.category === category);
}
