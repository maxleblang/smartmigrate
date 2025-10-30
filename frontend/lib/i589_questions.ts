import type { Question, QuestionGroup } from "./types"

// I-589 Part A.I — Information About You (aligned with PDF field mapping and AI_1..AI_25 keys)
const ai_questions: Question[] = [
  // 1. Alien Registration Number (A-Number)
  {
    id: "a1",
    name: { en: "Alien Registration Number (A-Number)", es: "Número A (si tiene)", fr: "Numéro A (le cas échéant)" },
    type: "text",
    text: {
      en: "Alien Registration Number (A-Number) (if any)",
      es: "Número de Registro de Extranjero (Número A) (si tiene)",
      fr: "Numéro d'enregistrement d'étranger (Numéro A) (le cas échéant)",
    },
    entryFields: [
      { key: "AI_1", placeholder: { en: "A-Number", es: "Número A", fr: "Numéro A" } },
    ],
  },

  // 2. U.S. Social Security Number (if any)
  {
    id: "a2",
    name: { en: "U.S. Social Security Number", es: "Número de Seguro Social (si tiene)", fr: "Numéro de sécurité sociale US (le cas échéant)" },
    type: "text",
    text: {
      en: "U.S. Social Security Number (if any)",
      es: "Número de Seguro Social de EE. UU. (si tiene)",
      fr: "Numéro de sécurité sociale des États-Unis (le cas échéant)",
    },
    entryFields: [
      { key: "AI_2", placeholder: { en: "___-__-____", es: "___-__-____", fr: "___-__-____" }, inputType: "ssn" },
    ],
  },

  // 3. USCIS Online Account Number (if any)
  {
    id: "a3",
    name: { en: "USCIS Online Account Number", es: "Número de cuenta en línea de USCIS", fr: "Numéro de compte en ligne USCIS" },
    type: "text",
    text: {
      en: "USCIS Online Account Number (if any)",
      es: "Número de cuenta en línea de USCIS (si tiene)",
      fr: "Numéro de compte en ligne USCIS (le cas échéant)",
    },
    entryFields: [
      { key: "AI_3", placeholder: { en: "Enter number", es: "Ingrese número", fr: "Saisir le numéro" } },
    ],
  },

  // 4–6. Names
  {
    id: "a4",
    name: { en: "Complete Last Name", es: "Apellido completo", fr: "Nom de famille complet" },
    type: "text",
    text: {
      en: "Complete Last Name",
      es: "Apellido completo",
      fr: "Nom de famille complet",
    },
    entryFields: [
      { key: "AI_4", placeholder: { en: "Last name", es: "Apellido", fr: "Nom de famille" } },
    ],
  },
  {
    id: "a5",
    name: { en: "Given Name (First Name)", es: "Nombre (de pila)", fr: "Prénom" },
    type: "text",
    text: {
      en: "Given Name (First Name)",
      es: "Nombre (de pila)",
      fr: "Prénom",
    },
    entryFields: [
      { key: "AI_5", placeholder: { en: "First name", es: "Nombre", fr: "Prénom" } },
    ],
  },
  {
    id: "a6",
    name: { en: "Middle Name", es: "Segundo nombre", fr: "Deuxième prénom" },
    type: "text",
    text: {
      en: "Middle Name",
      es: "Segundo nombre",
      fr: "Deuxième prénom",
    },
    entryFields: [
      { key: "AI_6", placeholder: { en: "Middle name", es: "Segundo nombre", fr: "Deuxième prénom" } },
    ],
  },

  // 7. Other names used
  {
    id: "a7",
    name: { en: "Other Names Used", es: "Otros nombres usados", fr: "Autres noms utilisés" },
    type: "text",
    text: {
      en: "Other Names Used (include maiden name and aliases)",
      es: "Otros nombres usados (incluya apellido de soltera y alias)",
      fr: "Autres noms utilisés (inclure nom de jeune fille et alias)",
    },
    entryFields: [
      { key: "AI_7", placeholder: { en: "List names", es: "Liste los nombres", fr: "Lister les noms" } },
    ],
  },

  // 8. U.S. Mailing Address (with phone)
  {
    id: "a8",
    name: { en: "U.S. Mailing Address", es: "Dirección postal en EE. UU.", fr: "Adresse postale aux États-Unis" },
    type: "repeatable",
    text: {
      en: "Provide your U.S. mailing address",
      es: "Proporcione su dirección postal en EE. UU.",
      fr: "Fournissez votre adresse postale aux États-Unis",
    },
    maxEntries: 1,
    entryLabel: { en: "Mailing address", es: "Dirección postal", fr: "Adresse postale" },
    entryFields: [
      { key: "AI_8_street", label: { en: "Street number and name", es: "Número y nombre de la calle", fr: "Numéro et nom de rue" } },
      { key: "AI_8_apt", label: { en: "Apt number", es: "N.º de apto.", fr: "Nº d'appt" } },
      { key: "AI_8_city", label: { en: "City", es: "Ciudad", fr: "Ville" } },
      { key: "AI_8_state", label: { en: "State", es: "Estado", fr: "État" } },
      { key: "AI_8_zip", label: { en: "ZIP Code", es: "Código postal", fr: "Code postal" } },
      { key: "AI_8_phone", label: { en: "Telephone number", es: "Número de teléfono", fr: "Numéro de téléphone" }, inputType: "phone" },
    ],
  },

  // 9. Residence address (if different) — order per request
  {
    id: "a9",
    name: { en: "Residence Address (if different)", es: "Dirección de residencia (si es diferente)", fr: "Adresse de résidence (si différente)" },
    type: "repeatable",
    text: {
      en: "Residence address in the U.S. (if different from mailing)",
      es: "Dirección de residencia en EE. UU. (si es diferente a la postal)",
      fr: "Adresse de résidence aux États-Unis (si différente de la postale)",
    },
    maxEntries: 1,
    entryLabel: { en: "Residence address", es: "Dirección de residencia", fr: "Adresse de résidence" },
    entryFields: [
      { key: "AI_9_in", label: { en: "In care of", es: "A cargo de", fr: "Aux bons soins de" } },
      { key: "AI_9_phone", label: { en: "Telephone number", es: "Número de teléfono", fr: "Numéro de téléphone" }, inputType: "phone" },
      { key: "AI_9_street", label: { en: "Street number and name", es: "Número y nombre de la calle", fr: "Numéro et nom de rue" } },
      { key: "AI_9_apt", label: { en: "Apt number", es: "N.º de apto.", fr: "Nº d'appt" } },
      { key: "AI_9_city", label: { en: "City", es: "Ciudad", fr: "Ville" } },
      { key: "AI_9_state", label: { en: "State", es: "Estado", fr: "État" } },
      { key: "AI_9_zip", label: { en: "ZIP Code", es: "Código postal", fr: "Code postal" } },
    ],
  },

  // 10. Sex
  {
    id: "a10",
    name: { en: "Sex", es: "Sexo", fr: "Sexe" },
    type: "multipleChoice",
    text: { en: "Sex", es: "Sexo", fr: "Sexe" },
    options: {
      en: ["male", "female"],
      es: ["masculino", "femenino"],
      fr: ["homme", "femme"],
    },
    entryFields: [
      { key: "AI_10" },
    ],
  },

  // 11. Marital Status
  {
    id: "a11",
    name: { en: "Marital Status", es: "Estado civil", fr: "État civil" },
    type: "multipleChoice",
    text: { en: "Marital Status", es: "Estado civil", fr: "État civil" },
    options: {
      en: ["single", "married", "divorced", "widowed"],
      es: ["soltero", "casado", "divorciado", "viudo"],
      fr: ["célibataire", "marié", "divorcé", "veuf"],
    },
    entryFields: [
      { key: "AI_11" },
    ],
  },

  // 12–17. Birth and identity
  {
    id: "a12",
    name: { en: "Date of Birth", es: "Fecha de nacimiento", fr: "Date de naissance" },
    type: "text",
    text: { en: "Date of Birth (MM/DD/YYYY)", es: "Fecha de nacimiento (MM/DD/AAAA)", fr: "Date de naissance (JJ/MM/AAAA)" },
    entryFields: [
      { key: "AI_12", placeholder: { en: "MM/DD/YYYY", es: "MM/DD/AAAA", fr: "JJ/MM/AAAA" }, inputType: "date" },
    ],
  },
  {
    id: "a13",
    name: { en: "City and Country of Birth", es: "Ciudad y país de nacimiento", fr: "Ville et pays de naissance" },
    type: "text",
    text: { en: "City and Country of birth", es: "Ciudad y país de nacimiento", fr: "Ville et pays de naissance" },
    entryFields: [
      { key: "AI_13", placeholder: { en: "City, Country", es: "Ciudad, País", fr: "Ville, Pays" } },
    ],
  },
  {
    id: "a14",
    name: { en: "Present Nationality (Citizenship)", es: "Nacionalidad actual (ciudadanía)", fr: "Nationalité actuelle (citoyenneté)" },
    type: "text",
    text: { en: "Present Nationality (Citizenship)", es: "Nacionalidad actual (ciudadanía)", fr: "Nationalité actuelle (citoyenneté)" },
    entryFields: [
      { key: "AI_14", placeholder: { en: "Country", es: "País", fr: "Pays" } },
    ],
  },
  {
    id: "a15",
    name: { en: "Nationality at Birth", es: "Nacionalidad al nacer", fr: "Nationalité à la naissance" },
    type: "text",
    text: { en: "Nationality at Birth", es: "Nacionalidad al nacer", fr: "Nationalité à la naissance" },
    entryFields: [
      { key: "AI_15", placeholder: { en: "Country", es: "País", fr: "Pays" } },
    ],
  },
  {
    id: "a16",
    name: { en: "Race, Ethnic, or Tribal Group", es: "Raza, grupo étnico o tribal", fr: "Race, groupe ethnique ou tribal" },
    type: "text",
    text: { en: "Race, Ethnic, or Tribal Group", es: "Raza, grupo étnico o tribal", fr: "Race, groupe ethnique ou tribal" },
    entryFields: [
      { key: "AI_16" },
    ],
  },
  {
    id: "a17",
    name: { en: "Religion", es: "Religión", fr: "Religion" },
    type: "text",
    text: { en: "Religion", es: "Religión", fr: "Religion" },
    entryFields: [
      { key: "AI_17" },
    ],
  },

  // 18. Current U.S. immigration status (three options a/b/c)
  {
    id: "a18",
    name: { en: "Immigration Court proceedings", es: "Procedimientos de la corte de inmigración", fr: "Procédures judiciaires en matière d'immigration" },
    type: "multipleChoice",
    text: { en: "Check the box, a through c, that applies:", es: "Marque la casilla, a a c, que aplique:", fr: "Cochez la case, a à c, qui s'applique:" },
    options: {
      en: [
        "a. I have never been in Immigration Court proceedings.",
        "b. I am now in Immigration Court proceedings.",
        "c. I am not now in Immigration Court proceedings, but I have been in the past."
      ],
      es: [
        "a. Nunca he estado en procedimientos de la Corte de Inmigración.",
        "b. Actualmente estoy en procedimientos de la Corte de Inmigración.",
        "c. No estoy actualmente en procedimientos de la Corte de Inmigración, pero lo he estado en el pasado."
      ],
      fr: [
        "a. Je n'ai jamais participé à des procédures judiciaires en immigration.",
        "b. Je suis actuellement dans des procédures judiciaires en immigration.",
        "c. Je ne suis pas actuellement dans des procédures judiciaires en immigration, mais je l'ai été dans le passé."
      ]
    },
    entryFields: [
      { key: "AI_18" },
    ],
  },

  // 19. Arrival information
  {
    id: "a19a",
    name: { en: "Date of last arrival", es: "Fecha de la última llegada", fr: "Date de la dernière arrivée" },
    type: "text",
    text: { en: "Date of last arrival (MM/DD/YYYY)", es: "Fecha de la última llegada (MM/DD/AAAA)", fr: "Date de la dernière arrivée (JJ/MM/AAAA)" },
    entryFields: [
      { key: "AI_19_a", inputType: "date" },
    ],
  },
  {
    id: "a19b",
    name: { en: "I-94 Number", es: "Número I-94", fr: "Numéro I-94" },
    type: "text",
    text: { en: "I-94 Number", es: "Número I-94", fr: "Numéro I-94" },
    entryFields: [
      { key: "AI_19_b" },
    ],
  },
  {
    id: "a19c",
    name: { en: "Previous entries to the U.S.", es: "Entradas previas a EE. UU.", fr: "Entrées antérieures aux É.-U." },
    type: "repeatable",
    text: { en: "If you entered the U.S. more than once, list each entry", es: "Si ingresó a EE. UU. más de una vez, enumere cada entrada", fr: "Si vous êtes entré aux É.-U. plus d'une fois, listez chaque entrée" },
    entryLabel: { en: "Entry", es: "Entrada", fr: "Entrée" },
    entryFields: [
      { key: "AI_19_c_date", label: { en: "Date (MM/DD/YYYY)", es: "Fecha (MM/DD/AAAA)", fr: "Date (JJ/MM/AAAA)" }, inputType: "date" },
      { key: "AI_19_c_place", label: { en: "Place", es: "Lugar", fr: "Lieu" } },
      { key: "AI_19_c_status", label: { en: "Status at entry", es: "Estatus al entrar", fr: "Statut à l'entrée" } },
      { key: "AI_19_c_exp", label: { en: "Expiration (MM/DD/YYYY)", es: "Vencimiento (MM/DD/AAAA)", fr: "Expiration (JJ/MM/AAAA)" }, inputType: "date" },
    ],
  },

  // 20–25. Passport/travel and language
  {
    id: "a20",
    name: { en: "Issuing country (last passport/travel document)", es: "País emisor (último pasaporte/documento de viaje)", fr: "Pays émetteur (dernier passeport/document de voyage)" },
    type: "text",
    text: { en: "What country issued your last passport or travel document?", es: "¿Qué país emitió su último pasaporte o documento de viaje?", fr: "Quel pays a délivré votre dernier passeport ou document de voyage ?" },
    entryFields: [
      { key: "AI_20" },
    ],
  },
  {
    id: "a21",
    name: { en: "Passport/Travel document numbers", es: "Números de pasaporte/documento de viaje", fr: "Numéros de passeport/document de voyage" },
    type: "repeatable",
    text: { en: "Provide your document numbers", es: "Proporcione sus números de documentos", fr: "Fournissez vos numéros de documents" },
    maxEntries: 1,
    entryLabel: { en: "Document numbers", es: "Números de documentos", fr: "Numéros de documents" },
    entryFields: [
      { key: "AI_21_passport", label: { en: "Passport number", es: "Número de pasaporte", fr: "Numéro de passeport" } },
      { key: "AI_21_travel", label: { en: "Travel document number", es: "Número del documento de viaje", fr: "Numéro du document de voyage" } },
    ],
  },
  {
    id: "a22",
    name: { en: "Expiration date", es: "Fecha de vencimiento", fr: "Date d'expiration" },
    type: "text",
    text: { en: "Expiration date (MM/DD/YYYY)", es: "Fecha de vencimiento (MM/DD/AAAA)", fr: "Date d'expiration (JJ/MM/AAAA)" },
    entryFields: [
      { key: "AI_22", inputType: "date" },
    ],
  },
  {
    id: "a23",
    name: { en: "Native language", es: "Idioma nativo", fr: "Langue maternelle" },
    type: "text",
    text: { en: "What is your native language (include dialect, if applicable)", es: "¿Cuál es su idioma nativo (incluya dialecto, si corresponde)?", fr: "Quelle est votre langue maternelle (inclure le dialecte, le cas échéant)" },
    entryFields: [
      { key: "AI_23" },
    ],
  },
  {
    id: "a24",
    name: { en: "Fluent in English?", es: "¿Habla inglés con fluidez?", fr: "Parlez-vous couramment l'anglais ?" },
    type: "multipleChoice",
    text: { en: "Are you fluent in English?", es: "¿Es usted fluido en inglés?", fr: "Êtes-vous à l'aise en anglais ?" },
    options: {
      en: ["yes", "no"],
      es: ["sí", "no"],
      fr: ["oui", "non"],
    },
    entryFields: [
      { key: "AI_24" },
    ],
  },
  {
    id: "a25",
    name: { en: "Other languages spoken fluently", es: "Otros idiomas que habla con fluidez", fr: "Autres langues parlées couramment" },
    type: "text",
    text: { en: "What other languages do you speak fluently?", es: "¿Qué otros idiomas habla con fluidez?", fr: "Quelles autres langues parlez-vous couramment ?" },
    entryFields: [
      { key: "AI_25" },
    ],
  },
]

// Grouped questions structure for I-589 form
export const i589_questions: Record<string, QuestionGroup> = {
  "A.I": {
    name: "A.I",
    questions: ai_questions,
  },
}
