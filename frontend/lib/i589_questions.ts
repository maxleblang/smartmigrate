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

// A.II — Spouse Information
const aii_spouse_questions: Question[] = [
  // 1. Are you married?
  {
    id: "a_ii_spouse",
    name: { en: "Marital Status", es: "Estado civil", fr: "État civil" },
    type: "multipleChoice",
    text: { en: "Are you married?", es: "¿Está casado?", fr: "Êtes-vous marié ?" },
    options: {
      en: ["yes", "no"],
      es: ["sí", "no"],
      fr: ["oui", "non"],
    },
    entryFields: [
      { key: "AII_spouse" },
    ],
  },

  // 2. Alien Registration Number (A-Number)
  {
    id: "a_ii_spouse_1",
    name: { en: "Spouse Alien Registration Number", es: "Número A del cónyuge", fr: "Numéro A du conjoint" },
    type: "text",
    text: { en: "Alien Registration Number (A-Number) (if any)", es: "Número de Registro de Extranjero (Número A) (si tiene)", fr: "Numéro d'enregistrement d'étranger (Numéro A) (le cas échéant)" },
    entryFields: [
      { key: "AII_spouse_1", placeholder: { en: "A-Number", es: "Número A", fr: "Numéro A" } },
    ],
  },

  // 3. Passport/ID Card Number
  {
    id: "a_ii_spouse_2",
    name: { en: "Spouse Passport/ID Card Number", es: "Número de pasaporte/cédula del cónyuge", fr: "Numéro de passeport/carte d'identité du conjoint" },
    type: "text",
    text: { en: "Passport/ID Card Number (if any)", es: "Número de pasaporte/cédula de identidad (si tiene)", fr: "Numéro de passeport/carte d'identité (le cas échéant)" },
    entryFields: [
      { key: "AII_spouse_2" },
    ],
  },

  // 4. Date of Birth
  {
    id: "a_ii_spouse_3",
    name: { en: "Spouse Date of Birth", es: "Fecha de nacimiento del cónyuge", fr: "Date de naissance du conjoint" },
    type: "text",
    text: { en: "Date of Birth (mm/dd/yyyy)", es: "Fecha de nacimiento (mm/dd/yyyy)", fr: "Date de naissance (mm/dd/yyyy)" },
    entryFields: [
      { key: "AII_spouse_3", placeholder: { en: "mm/dd/yyyy", es: "mm/dd/yyyy", fr: "mm/dd/yyyy" }, inputType: "date" },
    ],
  },

  // 5. U.S. Social Security Number
  {
    id: "a_ii_spouse_4",
    name: { en: "Spouse U.S. Social Security Number", es: "Número de Seguro Social del cónyuge", fr: "Numéro de sécurité sociale US du conjoint" },
    type: "text",
    text: { en: "U.S. Social Security Number (if any)", es: "Número de Seguro Social de EE. UU. (si tiene)", fr: "Numéro de sécurité sociale des États-Unis (le cas échéant)" },
    entryFields: [
      { key: "AII_spouse_4", placeholder: { en: "___-__-____", es: "___-__-____", fr: "___-__-____" }, inputType: "ssn" },
    ],
  },

  // 6. Complete Last Name
  {
    id: "a_ii_spouse_5",
    name: { en: "Spouse Last Name", es: "Apellido del cónyuge", fr: "Nom de famille du conjoint" },
    type: "text",
    text: { en: "Complete Last Name", es: "Apellido completo", fr: "Nom de famille complet" },
    entryFields: [
      { key: "AII_spouse_5", placeholder: { en: "Last name", es: "Apellido", fr: "Nom de famille" } },
    ],
  },

  // 7. First Name
  {
    id: "a_ii_spouse_6",
    name: { en: "Spouse First Name", es: "Nombre del cónyuge", fr: "Prénom du conjoint" },
    type: "text",
    text: { en: "First Name", es: "Nombre (de pila)", fr: "Prénom" },
    entryFields: [
      { key: "AII_spouse_6", placeholder: { en: "First name", es: "Nombre", fr: "Prénom" } },
    ],
  },

  // 8. Middle Name
  {
    id: "a_ii_spouse_7",
    name: { en: "Spouse Middle Name", es: "Segundo nombre del cónyuge", fr: "Deuxième prénom du conjoint" },
    type: "text",
    text: { en: "Middle Name", es: "Segundo nombre", fr: "Deuxième prénom" },
    entryFields: [
      { key: "AII_spouse_7", placeholder: { en: "Middle name", es: "Segundo nombre", fr: "Deuxième prénom" } },
    ],
  },

  // 9. Other names used
  {
    id: "a_ii_spouse_8",
    name: { en: "Spouse Other Names Used", es: "Otros nombres del cónyuge", fr: "Autres noms utilisés par le conjoint" },
    type: "text",
    text: { en: "Other names used (include maiden name and aliases)", es: "Otros nombres usados (incluya apellido de soltera y alias)", fr: "Autres noms utilisés (inclure nom de jeune fille et alias)" },
    entryFields: [
      { key: "AII_spouse_8", placeholder: { en: "List names", es: "Liste los nombres", fr: "Lister les noms" } },
    ],
  },

  // 10. Date of Marriage
  {
    id: "a_ii_spouse_9",
    name: { en: "Date of Marriage", es: "Fecha de matrimonio", fr: "Date du mariage" },
    type: "text",
    text: { en: "Date of Marriage (mm/dd/yyyy)", es: "Fecha de matrimonio (mm/dd/yyyy)", fr: "Date du mariage (mm/dd/yyyy)" },
    entryFields: [
      { key: "AII_spouse_9", placeholder: { en: "mm/dd/yyyy", es: "mm/dd/yyyy", fr: "mm/dd/yyyy" }, inputType: "date" },
    ],
  },

  // 11. Place of Marriage
  {
    id: "a_ii_spouse_10",
    name: { en: "Place of Marriage", es: "Lugar del matrimonio", fr: "Lieu du mariage" },
    type: "text",
    text: { en: "Place of Marriage", es: "Lugar del matrimonio", fr: "Lieu del mariage" },
    entryFields: [
      { key: "AII_spouse_10" },
    ],
  },

  // 12. City and Country of Birth
  {
    id: "a_ii_spouse_11",
    name: { en: "Spouse City and Country of Birth", es: "Ciudad y país de nacimiento del cónyuge", fr: "Ville et pays de naissance du conjoint" },
    type: "text",
    text: { en: "City and Country of Birth", es: "Ciudad y país de nacimiento", fr: "Ville et pays de naissance" },
    entryFields: [
      { key: "AII_spouse_11", placeholder: { en: "City, Country", es: "Ciudad, País", fr: "Ville, Pays" } },
    ],
  },

  // 13. Nationality (Citizenship)
  {
    id: "a_ii_spouse_12",
    name: { en: "Spouse Nationality", es: "Nacionalidad del cónyuge", fr: "Nationalité du conjoint" },
    type: "text",
    text: { en: "Nationality (Citizenship)", es: "Nacionalidad (Ciudadanía)", fr: "Nationalité (Citoyenneté)" },
    entryFields: [
      { key: "AII_spouse_12", placeholder: { en: "Country", es: "País", fr: "Pays" } },
    ],
  },

  // 14. Race, Ethnic, or Tribal Group
  {
    id: "a_ii_spouse_13",
    name: { en: "Spouse Race, Ethnic, or Tribal Group", es: "Raza, grupo étnico o tribal del cónyuge", fr: "Race, groupe ethnique ou tribal du conjoint" },
    type: "text",
    text: { en: "Race, Ethnic, or Tribal Group", es: "Raza, grupo étnico o tribal", fr: "Race, groupe ethnique ou tribal" },
    entryFields: [
      { key: "AII_spouse_13" },
    ],
  },

  // 15. Sex
  {
    id: "a_ii_spouse_14",
    name: { en: "Spouse Sex", es: "Sexo del cónyuge", fr: "Sexe du conjoint" },
    type: "multipleChoice",
    text: { en: "Sex", es: "Sexo", fr: "Sexe" },
    options: {
      en: ["male", "female"],
      es: ["masculino", "femenino"],
      fr: ["homme", "femme"],
    },
    entryFields: [
      { key: "AII_spouse_14" },
    ],
  },

  // 16. Is this person in the U.S.?
  {
    id: "a_ii_spouse_15",
    name: { en: "Is spouse in the U.S.?", es: "¿Está el cónyuge en EE. UU.?", fr: "Le conjoint est-il aux É.-U. ?" },
    type: "multipleChoice",
    text: { en: "Is this person in the U.S.?", es: "¿Está esta persona en EE. UU.?", fr: "Cette personne est-elle aux É.-U. ?" },
    options: {
      en: ["Yes (Complete Blocks 16 to 24.)", "No (Specify location):"],
      es: ["Sí (Complete los bloques 16 al 24.)", "No (Especifique ubicación):"],
      fr: ["Oui (Remplissez les cases 16 à 24.)", "Non (Précisez l'emplacement):"],
    },
    entryFields: [
      { key: "AII_spouse_15" },
    ],
  },

  // 17. Place of last entry into the U.S.
  {
    id: "a_ii_spouse_16",
    name: { en: "Spouse Place of last entry into U.S.", es: "Lugar de la última entrada del cónyuge a EE. UU.", fr: "Lieu de la dernière entrée du conjoint aux É.-U." },
    type: "text",
    text: { en: "Place of last entry into the U.S.", es: "Lugar de la última entrada a EE. UU.", fr: "Lieu de la dernière entrée aux É.-U." },
    entryFields: [
      { key: "AII_spouse_16" },
    ],
  },

  // 18. Date of last entry into the U.S.
  {
    id: "a_ii_spouse_17",
    name: { en: "Spouse Date of last entry into U.S.", es: "Fecha de la última entrada del cónyuge a EE. UU.", fr: "Date de la dernière entrée du conjoint aux É.-U." },
    type: "text",
    text: { en: "Date of last entry into the U.S. (mm/dd/yyyy)", es: "Fecha de la última entrada a EE. UU. (mm/dd/yyyy)", fr: "Date de la dernière entrée aux É.-U. (mm/dd/yyyy)" },
    entryFields: [
      { key: "AII_spouse_17", placeholder: { en: "mm/dd/yyyy", es: "mm/dd/yyyy", fr: "mm/dd/yyyy" }, inputType: "date" },
    ],
  },

  // 19. I-94 Number
  {
    id: "a_ii_spouse_18",
    name: { en: "Spouse I-94 Number", es: "Número I-94 del cónyuge", fr: "Numéro I-94 du conjoint" },
    type: "text",
    text: { en: "I-94 Number (if any)", es: "Número I-94 (si tiene)", fr: "Numéro I-94 (le cas échéant)" },
    entryFields: [
      { key: "AII_spouse_18" },
    ],
  },

  // 20. Status when last admitted
  {
    id: "a_ii_spouse_19",
    name: { en: "Spouse Status when last admitted", es: "Estatus al ser admitido el cónyuge", fr: "Statut lors de la dernière admission du conjoint" },
    type: "text",
    text: { en: "Status when last admitted (Visa type, if any)", es: "Estatus al ser admitido (tipo de visa, si tiene)", fr: "Statut lors de la dernière admission (type de visa, le cas échéant)" },
    entryFields: [
      { key: "AII_spouse_19" },
    ],
  },

  // 21. What is your spouse's current status?
  {
    id: "a_ii_spouse_20",
    name: { en: "Spouse's current status", es: "Estatus actual del cónyuge", fr: "Statut actuel du conjoint" },
    type: "text",
    text: { en: "What is your spouse's current status?", es: "¿Cuál es el estatus actual de su cónyuge?", fr: "Quel est le statut actuel de votre conjoint ?" },
    entryFields: [
      { key: "AII_spouse_20" },
    ],
  },

  // 22. What is the expiration date of his/her authorized stay, if any?
  {
    id: "a_ii_spouse_21",
    name: { en: "Spouse expiration date of authorized stay", es: "Fecha de vencimiento de la estancia autorizada del cónyuge", fr: "Date d'expiration du séjour autorisé du conjoint" },
    type: "text",
    text: { en: "What is the expiration date of his/her authorized stay, if any? (mm/dd/yyyy)", es: "¿Cuál es la fecha de vencimiento de su estancia autorizada, si tiene? (mm/dd/yyyy)", fr: "Quelle est la date d'expiration de son séjour autorisé, le cas échéant ? (mm/dd/yyyy)" },
    entryFields: [
      { key: "AII_spouse_21", placeholder: { en: "mm/dd/yyyy", es: "mm/dd/yyyy", fr: "mm/dd/yyyy" }, inputType: "date" },
    ],
  },

  // 23. Is your spouse in Immigration Court proceedings?
  {
    id: "a_ii_spouse_22",
    name: { en: "Is spouse in Immigration Court proceedings?", es: "¿Está el cónyuge en procedimientos de la corte de inmigración?", fr: "Le conjoint est-il dans des procédures judiciaires en immigration ?" },
    type: "multipleChoice",
    text: { en: "Is your spouse in Immigration Court proceedings?", es: "¿Está su cónyuge en procedimientos de la Corte de Inmigración?", fr: "Votre conjoint est-il dans des procédures judiciaires en immigration ?" },
    options: {
      en: ["yes", "no"],
      es: ["sí", "no"],
      fr: ["oui", "non"],
    },
    entryFields: [
      { key: "AII_spouse_22" },
    ],
  },

  // 24. If previously in the U.S., date of previous arrival
  {
    id: "a_ii_spouse_23",
    name: { en: "Spouse If previously in U.S., date of previous arrival", es: "Si estuvo anteriormente en EE. UU., fecha de llegada anterior del cónyuge", fr: "Si le conjoint a été précédemment aux É.-U., date de l'arrivée précédente" },
    type: "text",
    text: { en: "If previously in the U.S., date of previous arrival (mm/dd/yyyy)", es: "Si estuvo anteriormente en EE. UU., fecha de llegada anterior (mm/dd/yyyy)", fr: "Si précédemment aux É.-U., date d'arrivée précédente (mm/dd/yyyy)" },
    entryFields: [
      { key: "AII_spouse_23", placeholder: { en: "mm/dd/yyyy", es: "mm/dd/yyyy", fr: "mm/dd/yyyy" }, inputType: "date" },
    ],
  },

  // 25. If in the U.S., is your spouse to be included in this application?
  {
    id: "a_ii_spouse_24",
    name: { en: "Is spouse to be included in this application?", es: "¿Está el cónyuge en la solicitud?", fr: "Le conjoint est-il inclus dans cette demande ?" },
    type: "multipleChoice",
    text: { en: "If in the U.S., is your spouse to be included in this application? (Check the appropriate box.)", es: "Si está en EE. UU., ¿está su cónyuge a ser incluido en esta solicitud? (Marque la casilla apropiada.)", fr: "S'il est aux É.-U., votre conjoint doit-il être inclus dans cette demande ? (Cochez la case appropriée.)" },
    options: {
      en: ["yes", "no"],
      es: ["sí", "no"],
      fr: ["oui", "non"],
    },
    entryFields: [
      { key: "AII_spouse_24" },
    ],
  },
]

// A.II — Children Information
const aii_children_questions: Question[] = [
  // 1. How many children do you have?
  {
    id: "a_ii_children_1",
    name: { en: "Number of Children", es: "Número de hijos", fr: "Nombre d'enfants" },
    type: "text",
    text: { en: "How many children do you have?", es: "¿Cuántos hijos tiene?", fr: "Combien d'enfants avez-vous ?" },
    entryFields: [
      { key: "AII_Children_1", placeholder: { en: "Number", es: "Número", fr: "Nombre" } },
    ],
  },
]

// Grouped questions structure for I-589 form
export const i589_questions: Record<string, QuestionGroup> = {
  "A.I": {
    name: {
      en: "A.I",
      es: "A.I",
      fr: "A.I",
    },
    questions: ai_questions,
  },
  "A.II Spouse": {
    name: {
      en: "A.II Spouse",
      es: "A.II Cónyuge",
      fr: "A.II Conjoint",
    },
    questions: aii_spouse_questions,
  },
  "A.II Children": {
    name: {
      en: "A.II Children",
      es: "A.II Hijos",
      fr: "A.II Enfants",
    },
    questions: aii_children_questions,
  },
}
