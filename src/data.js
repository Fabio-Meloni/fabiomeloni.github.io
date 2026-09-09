/**
 * @fileoverview Static content repository for the application. Exposes a
 * locale-agnostic skill taxonomy and two locale-specific content objects
 * (Italian and English), retrieved through {@link getContent}.
 */

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {string} slug - Icon identifier from https://github.com/tandpfun/skill-icons.
 * @property {string} color - Accent color for the tile highlight, corresponding to the technology's official brand color.
 */

/**
 * @typedef {Object} ThesisAttachment
 * @property {string} label
 * @property {string} filename
 * @property {string} icon - Component name exported by `@lucide/vue`.
 */

/**
 * @typedef {Object} Thesis
 * @property {string} degree
 * @property {string} title
 * @property {string} abstract
 * @property {string} [advisor]
 * @property {string} description
 * @property {string} [grade]
 * @property {string[]} [stack]
 * @property {ThesisAttachment[]} attachments
 */

/**
 * @typedef {Object} TimelineEntry
 * @property {string} slug - Unique, locale-invariant identifier; used as the URL parameter when a thesis is present.
 * @property {string} period
 * @property {string} institution
 * @property {string} role
 * @property {string} description
 * @property {"education"|"work"|"internship"} type - Determines the timeline dot/border accent color.
 * @property {string} [grade]
 * @property {Thesis} [thesis]
 */

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} shortDescription
 * @property {string} description
 * @property {string[]} stack
 * @property {string[]} images
 * @property {string[]} tags
 * @property {string} [icon] - Path/URL to the application's icon, shown on the project card in place of the default glyph.
 * @property {{ width: number, height: number }} [icon_size] - Rendered size (in pixels) of `icon`; defaults to a 64x64 square when omitted. Non-square logos should set this explicitly to avoid being squeezed into the default square slot.
 * @property {string} [thesisSlug] - Slug of a {@link TimelineEntry} with a thesis, linked from the project detail view for further reading.
 */

/**
 * @typedef {Object} Interest
 * @property {string} name
 * @property {string} icon - Component name exported by `@lucide/vue`.
 * @property {string} color - Accent color for the pill's border and icon highlight.
 */

/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} role
 * @property {{ degree: string, institution: string }} university
 * @property {string} email
 * @property {string[]} bio
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} key - Corresponds to an i18n key under `skills.categories.<key>`.
 * @property {Skill[]} items
 */

/**
 * Locale-invariant skill taxonomy, grouped by category. Technology names
 * are identical across locales and therefore require no per-locale
 * duplication. Icon assets are sourced from https://skillicons.dev
 * (https://github.com/tandpfun/skill-icons); as the service does not
 * expose CORS headers, per-icon accent colors cannot be derived at
 * runtime and are instead specified explicitly for each entry.
 *
 * @type {SkillCategory[]}
 */
export const skillCategories = [
  {
    key: "languages",
    items: [
      { name: "Bash", slug: "bash", color: "#4EAA25" },
      { name: "C", slug: "c", color: "#A8B9CC" },
      { name: "C#", slug: "cs", color: "#178600" },
      { name: "C++", slug: "cpp", color: "#00599C" },
      { name: "CSS", slug: "css", color: "#1572B6" },
      { name: "HTML", slug: "html", color: "#E34F26" },
      { name: "Java", slug: "java", color: "#F89820" },
      { name: "JavaScript", slug: "js", color: "#F7DF1E" },
      { name: "Kotlin", slug: "kotlin", color: "#7F52FF" },
      { name: "LaTeX", slug: "latex", color: "#00A98F" },
      { name: "MATLAB", slug: "matlab", color: "#0076A8" },
      { name: "Markdown", slug: "md", color: "#777777" },
      { name: "PHP", slug: "php", color: "#777BB4" },
      { name: "PowerShell", slug: "powershell", color: "#5391FE" },
      { name: "Python", slug: "py", color: "#3776AB" },
      { name: "SVG", slug: "svg", color: "#FFB13B" },
    ],
  },
  {
    key: "frameworks",
    items: [
      { name: "Bootstrap", slug: "bootstrap", color: "#7952B3" },
      { name: ".NET", slug: "dotnet", color: "#512BD4" },
      { name: "FastAPI", slug: "fastapi", color: "#009688" },
      { name: "Flask", slug: "flask", color: "#4B4B4B" },
      { name: "Vue.js", slug: "vue", color: "#4FC08D" },
    ],
  },
  {
    key: "librariesRuntime",
    items: [
      { name: "jQuery", slug: "jquery", color: "#0769AD" },
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
      { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
      { name: "Three.js", slug: "threejs", color: "#049EF4" },
    ],
  },
  {
    key: "devTools",
    items: [
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub", slug: "github", color: "#6E6E6E" },
      { name: "Gradle", slug: "gradle", color: "#02303A" },
      { name: "CMake", slug: "cmake", color: "#064F8C" },
      { name: "npm", slug: "npm", color: "#CB3837" },
      { name: "pnpm", slug: "pnpm", color: "#F69220" },
      { name: "Postman", slug: "postman", color: "#FF6C37" },
      { name: "RegEx", slug: "regex", color: "#FF6B6B" },
    ],
  },
  {
    key: "database",
    items: [
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "MySQL", slug: "mysql", color: "#4479A1" },
      { name: "PostgreSQL", slug: "postgres", color: "#336791" },
      { name: "SQLite", slug: "sqlite", color: "#003B57" },
    ],
  },
  {
    key: "idesEditors",
    items: [
      { name: "Android Studio", slug: "androidstudio", color: "#3DDC84" },
      { name: "CLion", slug: "clion", color: "#2BD5A9" },
      { name: "Eclipse", slug: "eclipse", color: "#2C2255" },
      { name: "Emacs", slug: "emacs", color: "#7F5AB6" },
      { name: "IntelliJ IDEA", slug: "idea", color: "#FE315D" },
      { name: "Neovim", slug: "neovim", color: "#57A143" },
      { name: "Sublime Text", slug: "sublime", color: "#FF9800" },
      { name: "Vim", slug: "vim", color: "#019733" },
      { name: "Visual Studio", slug: "visualstudio", color: "#5C2D91" },
      { name: "VS Code", slug: "vscode", color: "#007ACC" },
    ],
  },
  {
    key: "devopsCloud",
    items: [
      { name: "Arch Linux", slug: "arch", color: "#1793D1" },
      { name: "Cloudflare", slug: "cloudflare", color: "#F38020" },
      { name: "Debian", slug: "debian", color: "#A81D33" },
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "GitHub Actions", slug: "githubactions", color: "#2088FF" },
      { name: "Jenkins", slug: "jenkins", color: "#D33833" },
      { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" },
      { name: "Linux", slug: "linux", color: "#FCC624" },
      { name: "NGINX", slug: "nginx", color: "#009639" },
      { name: "Ubuntu", slug: "ubuntu", color: "#E95420" },
      { name: "Windows", slug: "windows", color: "#0078D6" },
    ],
  },
  {
    key: "designOther",
    items: [
      { name: "After Effects", slug: "ae", color: "#9999FF" },
      { name: "Audition", slug: "au", color: "#00E4B7" },
      { name: "Blender", slug: "blender", color: "#E87D0D" },
      { name: "Discord", slug: "discord", color: "#5865F2" },
      { name: "Figma", slug: "figma", color: "#F24E1E" },
      { name: "Gmail", slug: "gmail", color: "#EA4335" },
      { name: "Notion", slug: "notion", color: "#6E6E6E" },
      { name: "Obsidian", slug: "obsidian", color: "#7C3AED" },
      { name: "Photoshop", slug: "ps", color: "#31A8FF" },
      { name: "Premiere Pro", slug: "pr", color: "#EA77FF" },
      { name: "Stack Overflow", slug: "stackoverflow", color: "#F58025" },
      { name: "WordPress", slug: "wordpress", color: "#21759B" },
    ],
  },
  {
    key: "hardware",
    items: [{ name: "Arduino", slug: "arduino", color: "#00979D" }],
  },
];

/** Italian-language content object. */
const contentIt = {
  /** @type {Profile} */
  profile: {
    name: "Fabio Meloni",
    role: "Full Stack Developer",
    university: { degree: "Laurea in Informatica", institution: "Università di Parma" },
    email: "info@fabiomeloni.net",
    bio: [
      "Sono laureato in Informatica presso l'<span class=\"accent-primary\">Università di Parma</span> con <span class=\"accent-secondary\">110/110 e lode</span>. Il mio percorso accademico si colloca all'intersezione tra ingegneria del software e intelligenza artificiale, ambiti nei quali ho maturato competenze sia metodologiche che operative. Attualmente sono iscritto alla laurea magistrale in Scienze Informatiche, con un curriculum focalizzato su verifica del software e tecniche avanzate di <span class=\"accent-primary\">intelligenza artificiale</span>.",
      "Parallelamente agli studi, ho progettato e sviluppato un <span class=\"accent-primary\">software gestionale per la stampa 3D</span>, orientato all'automazione delle catene di produzione e alla gestione coordinata di sistemi di stampa additiva. Collaboro inoltre alla realizzazione di un <span class=\"accent-secondary\">CMS per dati biologici</span>, pensato come alternativa ai CMS tradizionali nel settore bioinformatico: la piattaforma integra modelli di intelligenza artificiale per l'importazione dei dati, l'esecuzione di algoritmi di analisi e la generazione di interfacce di consultazione dei dataset.",
      "I miei interessi di ricerca e sviluppo comprendono la <span class=\"accent-primary\">stampa 3D</span> e la <span class=\"accent-primary\">progettazione/scansione 3D</span>, ambiti in cui ho competenze tecniche consolidate, oltre all'integrazione di <span class=\"accent-secondary\">modelli di intelligenza artificiale</span> in sistemi software complessi, con particolare attenzione alle applicazioni gestionali e ai flussi di automazione.",
    ],
  },

  /** @type {Interest[]} */
  interests: [
    { name: "Stampa 3D", icon: "Layers3", color: "#FF6B35" },
    { name: "Progettazione 3D", icon: "Rotate3d", color: "#3A7BFF" },
    { name: "Scansione 3D", icon: "ScanSearch", color: "#00BCD4" },
    { name: "Intelligenza Artificiale", icon: "Bot", color: "#7F5BFF" },
    { name: "Automazione Industriale", icon: "Cog", color: "#F59E0B" },
    { name: "Bioinformatica", icon: "Dna", color: "#22C55E" },
    { name: "Ingegneria del Software", icon: "Code2", color: "#EC4899" },
    { name: "Verifica del Software", icon: "CheckCheck", color: "#14B8A6" },
  ],

  /** @type {TimelineEntry[]} */
  education: [
    {
      slug: "laurea-magistrale-informatica",
      period: "2026 — Presente",
      institution: "Università di Parma",
      role: "Laurea Magistrale in Scienze Informatiche",
      description:
        "Corsi principali: Metodi e Modelli per l'Intelligenza Artificiale, Fondamenti dell'Intelligenza Artificiale, Algoritmi per l'Intelligenza Artificiale, Big Data e Data Mining, Laboratorio di Intelligenza Artificiale, Development of Reliable, Safe and Secure Software, Analisi Statica e Verifica del Software, Cybersecurity.",
      type: "education",
    },
    {
      slug: "laurea-triennale-informatica",
      period: "2023 — 2026",
      institution: "Università di Parma",
      role: "Laurea Triennale in Informatica",
      description:
        "Corsi principali: Algoritmi e Strutture Dati, Fondamenti di Programmazione, Metodologie di Programmazione, Sistemi Operativi, Architettura degli Elaboratori, Basi di Dati, Analisi Matematica, Algebra e Geometria, Elementi di Logica e Strutture Discrete, Reti di Calcolatori, Ingegneria del Software.",
      type: "education",
      thesis: {
        degree: "Laurea Triennale in Informatica",
        title: "Un workflow LLM per la creazione interattiva di basi di dati: modulo converter",
        advisor: "Prof. Vincenzo Bonnici",
        grade: "110/110 e lode",
        abstract:
          "L'elaborato presenta la progettazione e lo sviluppo di un'applicazione web concepita per la trasformazione di dati semi-strutturati in dati strutturati, successivamente organizzati all'interno di basi di dati relazionali. Tale processo è realizzato attraverso l'integrazione di modelli di intelligenza artificiale, impiegati per automatizzare le attività di interpretazione, estrazione e normalizzazione delle informazioni. L'applicazione offre inoltre un sistema avanzato per la gestione, la modifica e l'aggiornamento dei dati importati, consentendo agli utenti di intervenire direttamente sulle entità archiviate. A completamento delle funzionalità principali, la piattaforma integra un modulo di file management, destinato all'archiviazione, all'amministrazione e alla consultazione dei documenti e degli allegati associati ai dati elaborati, garantendo così un ambiente coerente e strutturato per la conservazione delle informazioni.",
        description:
          "Il lavoro di tesi ha avuto per oggetto la progettazione e lo sviluppo di bio-cms, un sistema informativo web finalizzato alla conversione automatizzata di dataset semi-strutturati — tipicamente prodotti in ambito microbiologico sotto forma di fogli di calcolo, file CSV o testuali eterogenei — in basi di dati relazionali strutturate, coerenti e interrogabili. L'obiettivo è stato il superamento dei limiti intrinseci dell'archiviazione tabellare (assenza di vincoli di integrità referenziale, mancanza di un audit trail, scarsa scalabilità e controllo degli accessi inadeguato), al fine di fornire ai ricercatori un'infrastruttura solida per la gestione e la tracciabilità dei dati sperimentali.\n\nL'elemento metodologicamente più rilevante del sistema è costituito dal modulo converter, un agente basato su modello linguistico (Qwen2.5-Coder-7B-Instruct, eseguito localmente tramite Ollama) integrato secondo un design pattern agentic: il modello, invocato attraverso un ciclo di orchestrazione iterativo implementato dalla classe ChatEngine, analizza il contenuto dei file caricati avvalendosi di un insieme di strumenti esposti dal backend (campionamento delle righe, inferenza dello schema delle colonne tramite Pandas) e produce, in output, uno schema SQL completo, corredato di una mappatura esplicita tra colonne sorgente e colonne di destinazione, validata strutturalmente tramite modelli Pydantic. Qualora l'informazione disponibile nei dati non sia sufficiente a determinare in modo univoco la struttura — ad esempio in presenza di ambiguità semantiche o di vincoli di chiave non deducibili — il sistema attiva una modalità di elaborazione avanzata, che dà luogo a un dialogo iterativo di chiarimento tra modello e utente, fino alla convergenza verso uno schema completo.\n\nDal punto di vista implementativo, i principali componenti dell'architettura progettati e realizzati sono i seguenti:\n- Servizio LLM (Python/Flask): architettura organizzata in blueprint separati per dominio funzionale (generazione di domande, risposte, nomi di transazione, categorie e grafici); orchestrazione dello streaming dell'output del modello, con filtraggio esplicito delle sezioni di reasoning (delimitate dai tag <think>); meccanismo di caching deterministico degli artefatti, basato sull'hash SHA-256 dei file caricati, per evitare la rielaborazione ridondante di contenuti già analizzati.\n- Pipeline di generazione e inserimento dei dati: classe ResponseProcessor, responsabile della creazione fisica del database a partire dallo schema SQL prodotto dal modello, mediante costruzione del grafo delle dipendenze tra le tabelle e applicazione di un algoritmo di ordinamento topologico per determinarne l'ordine di creazione compatibile con i vincoli di chiave esterna; inserimento dei dati tramite lettura iterator-based (riga per riga) dei file sorgente, che consente di mantenere costante l'occupazione di memoria indipendentemente dalla dimensione del dataset.\n- Gestione delle transazioni dati: modellazione del ciclo di vita di una transazione (creazione, associazione di allegati, elaborazione, modifica, deprecazione), con persistenza ibrida su MariaDB (dati relazionali) e MongoDB (documenti e metadati semi-strutturati); implementazione di un meccanismo di deprecazione atomica e non distruttiva delle transazioni, che ne preserva la storicità mantenendone la tracciabilità.\n- Sistema di autorizzazione discrezionale: componente PermissionManager che regola, a livello di singola transazione, le operazioni consentite a ciascun utente in funzione della proprietà della risorsa e dei permessi esplicitamente concessi, verificato a monte di ogni operazione sensibile esposta dai gateway applicativi.\n- Modulo \"vetrine\": funzionalità per la generazione di proiezioni pubblicabili e condivisibili dei risultati di una transazione (dashboard con widget grafici e tabellari), disaccoppiate dall'ambiente applicativo interno e generabili anche tramite prompt in linguaggio naturale interpretati dal modello linguistico per la produzione di grafici.\n- Infrastruttura di logging: architettura estensibile, fondata su una classe astratta comune (BaseLogger) e su un gestore centrale (LogManager) che seleziona dinamicamente, tramite un tipo enumerato, il logger specializzato appropriato (azioni utente, chiamate REST, operazioni su MySQL/MongoDB, operazioni del modello LLM), a garanzia di un tracciamento uniforme delle operazioni applicative.\n- Containerizzazione dell'ambiente: definizione di un'infrastruttura Docker multi-servizio (Apache, con virtual host dedicati per i tre frontend e per l'API; MariaDB; MongoDB; servizio LLM; ambiente sandbox isolato per l'esecuzione di script), orchestrata tramite Docker Compose, con provisioning automatizzato delle credenziali e delle collezioni/schemi iniziali.\n\nValidazione sperimentale: la valutazione empirica del sistema, condotta su dataset reali, sintetici (mock) e di dimensione crescente (da 1.000 a 1.000.000 di record), ha evidenziato un andamento pressoché lineare dei tempi di elaborazione al crescere del volume dei dati, a conferma della scalabilità della pipeline. L'introduzione del meccanismo di caching e la ristrutturazione dell'analisi incrementale dell'output del modello hanno consentito una riduzione dei tempi medi di elaborazione da circa 3 minuti a circa 1 minuto (oltre il 60%) rispetto alla versione iniziale del sistema.",
        stack: [
          "PHP",
          "Python",
          "Flask",
          "Ollama",
          "Qwen2.5-Coder-1.5B-Instruct",
          "Qwen2.5-Coder-7B-Instruct",
          "Pydantic",
          "Pandas",
          "MariaDB",
          "MongoDB",
          "Docker",
          "Docker Compose",
          "jQuery",
          "Bootstrap",
          "SheetJS",
        ],
        attachments: [
          { label: "Tesi", filename: "Bachelor Degree Thesis.pdf", icon: "FileText" },
          { label: "Presentazione PPTX", filename: "Bachelor Degree Thesis Presentation.pptx", icon: "BarChart3" },
          { label: "Presentazione PDF", filename: "Bachelor Degree Thesis Presentation.pdf", icon: "BarChart3" },
        ],
      },
    },
    {
      slug: "diploma-isii-marconi",
      period: "2018 — 2023",
      institution: "ITIS Guglielmo Marconi, Piacenza",
      role: "Capotecnico Informatica e Telecomunicazione - Articolazione Informatica",
      description: "Focus su programmazione, sviluppo software, reti locali, sistemi operativi, tecnologie web, basi di dati e sicurezza informatica.",
      type: "education",
      grade: "98/100",
    },
  ],

  /** @type {TimelineEntry[]} */
  experience: [
    {
      slug: "tirocinio",
      period: "Feb 2026 — Giu 2026",
      institution: "Università di Parma, Parma",
      role: "Tesista in Informatica - Sviluppo Software (Tesi di Laurea Triennale)",
      description:
        "Progettazione e sviluppo, nell'ambito della tesi di laurea triennale in Informatica presso l'Università di Parma (relatore Prof. Vincenzo Bonnici), di un sistema software web-based per la conversione di dati sperimentali semi-strutturati, tipici del dominio microbiologico, in una base di dati relazionale strutturata (bioCMS), con l'obiettivo di garantirne coerenza, tracciabilità e interoperabilità a supporto dei ricercatori. Il lavoro ha previsto la progettazione dell'architettura multilivello del sistema secondo il design pattern MVP e Gateway-Controller, l'implementazione del frontend con HTML5, jQuery, SheetJS e Bootstrap, e lo sviluppo del backend applicativo con comunicazione client-server tramite API RESTful, gestione della comunicazione chunked e integrazione con database MongoDB (modellazione BSON, replica set e sharding). È stato inoltre progettato e implementato un backend LLM basato su un'architettura agentic, orchestrato tramite Ollama con il modello Qwen2.5-Coder-7B-Instruct, con validazione dei dati tramite Pydantic e manipolazione dei dataset con Pandas, finalizzato alla generazione automatica di vetrine e visualizzazioni grafiche a partire da prompt descrittivi forniti dall'utente. Sono stati infine sviluppati i moduli di gestione utenti, ruoli e permessi, autenticazione tramite Bearer Token, audit trail e logging delle operazioni, oltre a meccanismi di validazione della sicurezza delle query (query safety) e ordinamento topologico per la gestione delle dipendenze tra entità del dominio.",
      type: "internship",
    },
    {
      slug: "junior-fullstack-afcon",
      period: "Apr 2026 — Giu 2026",
      institution: "AFCON SRL, Piacenza",
      role: "Junior Full Stack Developer",
      description:
        "Attività di sviluppo, manutenzione e ampliamento funzionale di software gestionali web-based e applicazioni desktop Windows, svolte inizialmente in ambito PCTO e successivamente tramite contratto di prestazione occasionale. Le attività hanno riguardato la progettazione e l'implementazione di interfacce utente in HTML5, CSS3, JavaScript, jQuery e PHP, la realizzazione di componenti interattivi complessi (diagrammi di Gantt, sistemi di gestione delle risorse, checklist operative e moduli di generazione automatica di documenti PDF), nonché la manutenzione di gestionali aziendali già in uso e l'integrazione con database SQL Server e sistemi software di macchinari industriali. Parallelamente, sono state svolte attività di sviluppo e aggiornamento di applicazioni Windows, produzione di documentazione tecnica e manuali operativi, oltre a compiti di data entry e supporto ai processi aziendali. L'esperienza ha previsto la collaborazione con team tecnici, l'analisi dei requisiti, il testing delle funzionalità implementate e l'utilizzo di strumenti professionali quali Visual Studio, Visual Studio Code, SQL Server Management Studio, FileZilla, TeamViewer e DevExtreme.",
      type: "work",
    },
    {
      "slug": "pcto-5s",
      "period": "Feb 2023 — Feb 2023",
      "institution": "AFCON SNC, Piacenza",
      "role": "Frontend Developer Intern",
      "description": "Svolgimento di attività di sviluppo, manutenzione e ampliamento funzionale di gestionali web-based realizzati con HTML5, CSS3, JavaScript, jQuery e PHP. Le attività hanno riguardato la progettazione e l'implementazione di interfacce grafiche, la creazione di componenti interattivi complessi (come diagrammi di Gantt, checklist operative e sistemi di gestione delle risorse), l'integrazione con database aziendali e la generazione automatizzata di documenti PDF. Il lavoro ha previsto la collaborazione con il team di sviluppo per l'analisi dei requisiti, la pianificazione delle attività, il testing delle funzionalità implementate e la documentazione tecnica dei software, inclusa la redazione di manuali operativi e guide utente. L'esperienza ha inoltre comportato la manutenzione di gestionali già in uso, l'interfacciamento con macchinari industriali tramite database dedicati e l'utilizzo di strumenti professionali quali Visual Studio Code, Microsoft SQL Server Management Studio, FileZilla, TeamViewer e DevExtreme.",
      "type": "internship"
    },
    {
      slug: "pcto-4s",
      period: "Mag 2021 — Giu 2022",
      institution: "AFCON SNC, Piacenza",
      role: "WPF Application Developer Intern",
      description: "Svolgimento di attività di sviluppo, manutenzione e ampliamento funzionale di applicazioni software desktop realizzate in C# e WPF, destinate alla gestione operativa di macchine utensili industriali. Le attività hanno riguardato l'analisi dei requisiti, la progettazione e l'implementazione di interfacce grafiche complesse in XAML, l'integrazione con database Microsoft SQL Server, la gestione di processi concorrenti tramite thread e l'implementazione di logiche automatiche per il monitoraggio dello stato dei componenti, la movimentazione dei pallet e il routing dei flussi produttivi. Il lavoro ha previsto inoltre la collaborazione con il committente per la definizione delle funzionalità, la verifica del corretto funzionamento mediante test manuali e automatici, e la documentazione sistematica delle attività svolte attraverso strumenti dedicati.",
      type: "internship",
    },
  ],

  /** @type {Project[]} */
  projects: [
    {
      id: 1,
      title: "AddressRecognize — Riconoscimento Indirizzi",
      shortDescription: "Applicazione Android per il riconoscimento OCR di indirizzi da fotocamera e l'ottimizzazione di percorsi di consegna multi-tappa.",
      description:
        "AddressRecognize è un'applicazione Android nativa scritta in Kotlin che affronta in un'unica pipeline tre problemi computazionalmente distinti e concettualmente disaccoppiati: l'estrazione di testo da immagine, la geocodifica semantica e l'ottimizzazione combinatoria di un percorso. La prima fase si appoggia a CameraX per l'acquisizione del frame video e a Google ML Kit Text Recognition per l'estrazione OCR del testo grezzo; anziché delegare anche il riconoscimento dell'indirizzo a un secondo modello di machine learning, la scelta progettuale è stata quella di normalizzare l'output OCR tramite un motore di pattern-matching costruito su espressioni regolari calibrate sulla toponomastica italiana (Via, Piazza, Corso, Viale). Questa decisione, apparentemente meno sofisticata di un approccio full-ML, è in realtà motivata da un preciso compromesso ingegneristico: un sistema basato su regex è deterministico, ispezionabile riga per riga, non richiede training né dataset etichettati e produce errori facilmente diagnosticabili, mentre un modello di riconoscimento di entità nominate (NER) addestrato ad hoc avrebbe introdotto una superficie di incertezza sproporzionata rispetto al valore aggiunto, dato il dominio applicativo circoscritto alla lingua italiana. Una volta individuato l'indirizzo testuale, l'applicazione lo risolve in coordinate geografiche tramite l'API Geocoder nativa di Android e lo rende su una mappa OpenStreetMap mediante la libreria osmdroid, evitando così la dipendenza da servizi di mappatura proprietari e i relativi costi di licenza per volumi di richieste elevati. La persistenza dello stato applicativo — tappe (\"stops\") e viaggi (\"trips\") — è affidata a Room su SQLite, garantendo che un giro di consegne in corso possa essere ripreso anche dopo la chiusura accidentale dell'app, un requisito non negoziabile per un caso d'uso operativo sul campo. Il componente architetturalmente più delicato del sistema è il modulo OsrmTripService, che interroga via OkHttp l'infrastruttura pubblica del progetto Open Source Routing Machine (OSRM) per ottenere la matrice delle distanze stradali reali tra tutte le tappe, e risolve successivamente una variante vincolata del problema del commesso viaggiatore — con punto di partenza e di arrivo fissati e sole tappe intermedie libere di essere riordinate — tramite un algoritmo a permutazione esaustiva di complessità O(n!). Si tratta di una scelta implementativa pienamente consapevole del proprio limite asintotico: per il numero di tappe tipico di un giro di consegne locale (generalmente inferiore alla decina) l'esaustività garantisce la soluzione ottima con un costo computazionale trascurabile e un codice trivialmente verificabile, mentre un'euristica come nearest-neighbor o 2-opt, pur scalando meglio, introdurrebbe un margine di sub-ottimalità e una complessità di implementazione non giustificata alla scala attuale del problema; la sostituzione dell'algoritmo resterebbe comunque un intervento localizzato, isolato dietro l'interfaccia del servizio. Sul piano architetturale complessivo, l'applicazione adotta un design single-Activity basato su Fragment orchestrati da Navigation Component, senza uno strato ViewModel esplicito: la logica di dominio rimane quindi concentrata e facilmente tracciabile all'interno dei singoli Fragment, una scelta di pragmatismo coerente con la dimensione contenuta della codebase.",
      stack: ["Kotlin", "Android SDK", "CameraX", "ML Kit OCR", "Room/SQLite", "osmdroid", "OkHttp", "OSRM"],
      images: [
        "/projects/address-recognize/images/01-homepage.png",
        "/projects/address-recognize/images/02-camera-page.png",
        "/projects/address-recognize/images/03-address-validation-modal.png",
        "/projects/address-recognize/images/04-address-list-modal.png",
        "/projects/address-recognize/images/05-start-end-address-page.png",
        "/projects/address-recognize/images/06-computed-trip.png",
      ],
      icon: "/projects/address-recognize/icon/address-recognize.png",
      icon_size: { width: 64, height: 64 },
      tags: ["Android", "Computer Vision", "Geolocalizzazione"],
    },
    {
      id: 2,
      title: "Marlin Ender-3 Pro — Firmware Custom",
      shortDescription: "Firmware Marlin personalizzato per stampante FDM Ender-3 Pro con sonda BLTouch e sensore di filamento.",
      description:
        "Marlin Ender-3 Pro Custom è un progetto di personalizzazione del firmware open source Marlin per la stampante 3D FDM Creality Ender-3 Pro, condotto con una metodologia a matrice di feature flag anziché con un'unica configurazione monolitica onnicomprensiva. Il progetto contiene infatti quattro varianti distinte del firmware — una con la sola sonda di livellamento BLTouch attiva, una con il solo sensore di rilevamento filamento e livellamento automatico disattivato, una con entrambi i sensori attivi contemporaneamente e livellamento bilineare del piano (AUTO_BED_LEVELING_BILINEAR), e infine un porting sul ramo più recente Marlin 2.1.2.5 per la revisione di scheda madre BOARD_CREALITY_V422, mentre le altre tre varianti restano ancorate alla precedente BOARD_CREALITY_V4. Questa scomposizione in build indipendenti e progressivamente più complete non è un dettaglio accessorio, ma riflette una strategia di gestione del rischio propria dello sviluppo firmware embedded: a differenza del software applicativo, un errore di configurazione in un firmware di controllo macchina può tradursi in un danno fisico reale (collisione dell'ugello con il piano, surriscaldamento, cortocircuito), per cui isolare e validare singolarmente ogni componente hardware prima di comporlo in una configurazione finale consente di circoscrivere e diagnosticare rapidamente eventuali malfunzionamenti. Tutte le configurazioni condividono un nucleo di parametri stabili: driver stepper A4988 (senza il ricorso a driver silenziosi della famiglia TMC, scelta più economica e conservativa ma a scapito della silenziosità di funzionamento), area di stampa di 235×235 mm con corsa dell'asse Z pari a 250 mm, singolo estrusore, persistenza dei parametri calibrati in EEPROM tramite i comandi G-code M500/M501, e la funzionalità di Power Loss Recovery abilitata per consentire la ripresa automatica di una stampa in caso di interruzione improvvisa dell'alimentazione elettrica. È significativo notare che il Linear Advance, una funzionalità che compensa la pressione residua nell'estrusore per migliorare la qualità degli angoli di stampa, risulta deliberatamente disattivato in tutte e quattro le varianti: una scelta di stabilità del sistema a scapito di un guadagno qualitativo giudicato marginale rispetto al rischio di introdurre instabilità nella pressione di estrusione con un hardware non specificamente calibrato per tale funzionalità. Le personalizzazioni più rilevanti rispetto al firmware Marlin stock includono un offset della sonda ricalcolato per una staffa di montaggio meccanica interamente progettata e stampata ad hoc, un ciclo di preriscaldo automatico eseguito prima della procedura di livellamento con temperature dedicate per compensare la dilatazione termica differenziale del piano di stampa, un pin elettrico dedicato (PA4, configurato in logica pull-down) per l'acquisizione del segnale dal sensore di rilevamento filamento, e infine la localizzazione completa del menu dell'interfaccia LCD in lingua italiana sul display stock CR10.",
      stack: ["C/C++", "Marlin Firmware 2.x", "PlatformIO", "AVR/ATmega2560", "BLTouch", "A4988"],
      images: [],
      tags: ["Firmware", "Stampa 3D", "Elettronica embedded"],
    },
    {
      id: 3,
      title: "Control Center — Smart Enclosure",
      shortDescription: "Sistema di automazione domestica per un'enclosure di stampanti 3D, con firmware embedded, backend REST e client desktop WPF.",
      description:
        "Control Center è un progetto sviluppato in quattro iterazioni architetturali successive (V1-V4), ciascuna delle quali nasce per superare un limite concreto emerso dalla precedente, piuttosto che come mera riscrittura estetica. La versione iniziale (V1) era costituita da un semplice sketch Arduino monolitico accoppiato a un client Windows Forms, un'architettura adeguata a un controllo diretto e locale ma priva di qualunque disaccoppiamento tra logica di controllo e interfaccia. La V2 ha introdotto un'architettura WPF con backend PHP/MySQL, separando per la prima volta lo stato persistente dall'interfaccia utente e ponendo le basi per un accesso multi-client ai dati. La V3 ha rappresentato il salto qualitativo più rilevante, con l'introduzione di una vera infrastruttura containerizzata basata su Docker (comprendente MySQL, Spoolman per la gestione dell'inventario delle bobine di filamento, FDM-Monster come piattaforma di gestione multi-stampante, e ustreamer per lo streaming video a bassa latenza della camera dell'enclosure) e di più schede di controllo ESP8266 fisicamente indipendenti, ciascuna dedicata a un singolo sottosistema: apertura motorizzata della porta, illuminazione LED interna, sensoristica ambientale, pulsantiera fisica e lettore di badge RFID (tramite la libreria MFRC522) per il controllo degli accessi. Questa decomposizione in nodi hardware indipendenti anticipa, alla scala dell'elettronica embedded, la stessa logica di responsabilità singola che caratterizza un'architettura a microservizi nel software. La V4, la più matura e recente, consolida sia il client desktop sia il servizio server in background su .NET 9, adottando la libreria commerciale Syncfusion per l'interfaccia utente e il pattern architetturale MVVM tramite il pacchetto CommunityToolkit.Mvvm per garantire testabilità e separazione tra logica di presentazione e stato applicativo; integra inoltre il controllo di stampanti di terze parti tramite l'API di OctoPrint (attraverso la libreria OctoPrintSharpApi) e la gestione delle prese elettriche intelligenti TP-Link Tapo (tramite TapoConnect/TapoSharp) per l'automazione remota dell'alimentazione, e riscrive completamente il sito web PHP secondo un pattern Model-View-Presenter lato client in JavaScript puro. La decisione architetturale più significativa dell'intero sistema, mantenuta costante attraverso tutte le versioni più recenti, è la scelta di far comunicare ogni componente distribuito — le schede Arduino/ESP8266, il servizio .NET in background, il client desktop WPF, il sito web PHP — esclusivamente attraverso un unico layer REST condiviso implementato in PHP con accesso dati mysqli, appoggiato a un database MySQL centrale denominato controlcenter, senza mai stabilire connessioni dirette punto-a-punto tra i componenti né ricorrere a un message broker dedicato. Questa topologia hub-and-spoke centralizzata semplifica sensibilmente il debug distribuito, poiché ogni interazione tra componenti transita per un unico punto osservabile, e consente di riavviare o sostituire un singolo nodo senza impatti sugli altri; il costo di questa scelta è una minore reattività in tempo reale rispetto a un'architettura event-driven basata su publish-subscribe, un compromesso ritenuto accettabile per un sistema di automazione domestica dove la latenza di qualche secondo è generalmente tollerabile. A chiusura dell'intera catena di integrazione, il progetto include un fork personalizzato del firmware Marlin 2.0.x/2.1.x con supporto nativo per sonda BLTouch e sensore di rilevamento filamento, a dimostrazione di una gestione coerente dell'intero stack, dall'hardware fisico della stampante fino all'interfaccia utente finale.",
      stack: ["C#/.NET 9", "WPF/Syncfusion", "CommunityToolkit.Mvvm", "PHP 8/mysqli", "MySQL", "Arduino/ESP8266", "Docker Compose", "OctoPrint API", "TP-Link Tapo API"],
      images: [
        "/projects/control-center/images/01-login-page.png",
        "/projects/control-center/images/02-dashboard-page.png",
        "/projects/control-center/images/03-enclosure-page.png",
        "/projects/control-center/images/04-printer-page.png",
        "/projects/control-center/images/05-temperature-page.png",
        "/projects/control-center/images/06-humidity-page.png",
        "/projects/control-center/images/07-air-quality-page.png",
        "/projects/control-center/images/08-smoke-page.png",
        "/projects/control-center/images/09-printer-temperature-page.png",
      ],
      icon: "/projects/control-center/icon/control-center.png",
      icon_size: { width: 80, height: 80 },
      tags: ["IoT/Domotica", "Stampa 3D", "Sistemi embedded"],
    },
    {
      id: 4,
      title: "PolyManage 3D — ERP Produzione Additiva",
      shortDescription: "Piattaforma gestionale (ERP) per un'officina di stampa 3D, con backend PHP transazionale e microservizi Python per slicing e disegno tecnico.",
      description:
        "PolyManage 3D è una piattaforma gestionale (ERP) sviluppata a partire dal medesimo nucleo hardware e REST condiviso con Control Center, evoluto verso un sistema completo pensato per una piccola realtà di produzione additiva. Il sistema comprende moduli per la preventivazione commerciale, la gestione degli ordini di produzione con relativo avanzamento, l'anagrafica di clienti e fornitori arricchita da un sistema di tag personalizzabili, la gestione di magazzino e acquisti, la contabilità aziendale, la gestione delle risorse umane, la manutenzione programmata su un parco macchine multiplo, e il controllo degli accessi RFID all'enclosure fisica. Questo scenario applicativo sovrappone due classi di requisiti storicamente distinte e con esigenze contrastanti: da un lato un dominio di automazione industriale, che richiede reattività in tempo reale sullo stato delle macchine e sulle condizioni di emergenza; dall'altro un dominio di gestione aziendale, che richiede al contrario garanzie forti di consistenza transazionale su operazioni come la fatturazione e la movimentazione di magazzino, dove un'inconsistenza anche temporanea può tradursi in un danno economico concreto. La risposta architetturale a questa tensione è una decomposizione a microservizi containerizzati organizzata per competenza verticale piuttosto che per strato tecnico: un backend REST scritto in PHP 8.2, con autoloading conforme allo standard PSR-4, autenticazione stateless tramite JSON Web Token (libreria Firebase JWT) e accesso ai dati tramite PDO su un database PostgreSQL — una migrazione deliberata rispetto al MySQL utilizzato nel progetto Control Center da cui questo sistema deriva concettualmente, motivata dalla necessità di garanzie transazionali (ACID) più solide e da un supporto nativo più maturo per vincoli di integrità complessi, requisiti imprescindibili una volta introdotti i moduli contabili e di fatturazione — gestisce l'intera logica di business applicativa, generando documenti PDF tramite Dompdf e comunicazioni email tramite PHPMailer. Accanto a questo nucleo centrale operano tre servizi Python del tutto indipendenti, ciascuno responsabile di una singola competenza specialistica: un servizio denominato Control Software che gestisce l'integrazione con OctoPrint e con le prese smart Tapo nonché la rilevazione e la gestione di condizioni di emergenza sulle macchine; un servizio TechnicalDrawing dedicato alla generazione automatica di proiezioni ortografiche tecniche a partire da modelli tridimensionali; e un servizio SlicerAgent che automatizza l'intero processo di slicing, il parsing del G-code prodotto e la gestione della coda dei lavori di stampa. Il frontend, una Single Page Application in JavaScript puro costruita con il bundler Vite, integrato con Bootstrap 5 per i componenti di interfaccia e con Three.js per la visualizzazione tridimensionale interattiva dei modelli, evita deliberatamente un framework reattivo pesante come React o Vue, una scelta che riduce il carico cognitivo di manutenzione e la dimensione del bundle finale a fronte di una minore ergonomia nello sviluppo di interfacce molto dinamiche; la suite di test Vitest garantisce comunque una copertura automatizzata della logica applicativa lato client. L'intero ambiente di sviluppo è containerizzato con Docker e include, un proxy HTTPS locale con una Certification Authority privata dedicata e un server SMTP/IMAP locale, elementi che permettono di riprodurre fedelmente le condizioni dell'ambiente di produzione senza dipendere da servizi esterni durante lo sviluppo e il testing. Il progetto risulta inoltre orientato a funzionalità di business progressivamente più sofisticate quali l'autenticazione a due fattori tramite certificati locali e risoluzione mDNS, e una modalità demo con database popolato da dati fittizi pensata per finalità commerciali e dimostrative.",
      stack: ["PHP 8.2", "PostgreSQL/PDO", "JWT", "JavaScript/Vite", "Bootstrap 5", "Three.js", "Python", "Docker"],
      images: [
        "/projects/polymanage-3d/images/01-dashboard-page.png",
        "/projects/polymanage-3d/images/02-report-page.png",
        "/projects/polymanage-3d/images/03-quotes-page.png",
        "/projects/polymanage-3d/images/04-quotes-editor-page.png",
        "/projects/polymanage-3d/images/05-printers-page.png",
        "/projects/polymanage-3d/images/06-warehouse-items-page.png",
        "/projects/polymanage-3d/images/07-customers-page.png",
        "/projects/polymanage-3d/images/08-projects-page.png",
        "/projects/polymanage-3d/images/09-production-order-editor-page.png",
        "/projects/polymanage-3d/images/10-print-jobs-page.png",
        "/projects/polymanage-3d/images/11-stl-files-page.png",
        "/projects/polymanage-3d/images/12-spools-page.png",
        "/projects/polymanage-3d/images/13-printer-maintenance-page.png",
      ],
      icon: "/projects/polymanage-3d/icon/polymanage-3d.png",
      icon_size: { width: 160, height: 160 },
      tags: ["ERP/Gestionale", "Stampa 3D", "Architettura a microservizi"],
    },
    {
      id: 5,
      title: "Parma Eventi Studenteschi",
      shortDescription: "Piattaforma web per la gestione e la promozione di eventi rivolti alla comunità studentesca dell'Università di Parma.",
      description:
        "Parma Eventi Studenteschi è un progetto realizzato nell'ambito del corso universitario di Ingegneria del Software, e applica un metodo di progettazione software strutturato a un caso d'uso reale con requisiti multi-attore ben definiti. Il sistema distingue tre categorie di utenti con permessi e flussi applicativi differenziati: i partecipanti, che possono iscriversi agli eventi e riceverne notifica; gli organizzatori, appartenenti a organizzazioni studentesche preventivamente verificate; e gli sviluppatori, con accesso a funzionalità di amministrazione tecnica del sistema. Ciascuna di queste categorie è vincolata, in fase di autenticazione, a un dominio email dedicato, un meccanismo di controllo degli accessi semplice ma efficace che evita la necessità di un processo di verifica manuale per ogni singolo utente. Il sistema offre inoltre login protetto da captcha e procedura di reset della password, creazione e gestione completa del ciclo di vita degli eventi, visualizzazione geografica su mappa interattiva tramite la libreria Leaflet.js, un sistema di notifiche, generazione di documenti PDF tramite la libreria FPDF, e upload di allegati multimediali. Sul piano architetturale, il backend è realizzato in PHP puro senza il ricorso ad alcun framework, ma organizzato secondo un pattern a router centrale che analizza ogni richiesta HTTP in ingresso e la smista verso classi denominate \"Gateway\", ciascuna dedicata a un dominio funzionale specifico (eventi, utenti, notifiche): questa separazione delle responsabilità riproduce, pur senza l'ausilio di un framework, i principi fondamentali di un'architettura a livelli, mantenendo la logica di dominio disaccoppiata dal routing e facilmente testabile in isolamento. Il frontend, scritto in JavaScript vanilla, adotta a sua volta il pattern architetturale Model-View-Presenter per disaccoppiare la logica applicativa dalla manipolazione diretta del DOM, una scelta che facilita la manutenibilità dell'interfaccia in assenza di un framework reattivo. L'intero ambiente applicativo è orchestrato tramite Docker Compose e riproduce fedelmente uno stack di produzione realistico e completo, comprendendo non solo i container applicativi Apache/PHP per frontend e backend e un database relazionale MariaDB, ma anche un server FTP (Pure-FTPd) con relativo client web per la gestione dei file, e un intero stack di posta elettronica self-hosted basato su Postfix e Dovecot, completo di interfaccia webmail RainLoop, utilizzato per la verifica end-to-end dei flussi di notifica via email in un ambiente controllato e riproducibile; a completare l'infrastruttura, phpMyAdmin fornisce un'interfaccia di amministrazione del database. Questa scelta infrastrutturale eccede sensibilmente i requisiti minimi tipici di un progetto accademico, e denota l'intenzione esplicita di validare il funzionamento del sistema in condizioni operative complete anziché limitarsi a una dimostrazione superficiale delle funzionalità. La gestione dell'intero ciclo di vita dell'ambiente — avvio, configurazione iniziale e pulizia dei container — è infine automatizzata da uno script bash dedicato (env_controller.sh) dotato di un'interfaccia testuale a menu.",
      stack: ["PHP 8.4", "JavaScript (MVP)", "MariaDB", "Apache", "Docker Compose", "Leaflet.js", "PHPMailer", "FPDF", "Postfix/Dovecot/RainLoop"],
      images: [
        "/projects/parma-eventi-studenteschi/images/01-login-page.png",
        "/projects/parma-eventi-studenteschi/images/02-2fa-page.png",
        "/projects/parma-eventi-studenteschi/images/03-homepage-manager.png",
        "/projects/parma-eventi-studenteschi/images/04-participants-manage-modal.png",
        "/projects/parma-eventi-studenteschi/images/05-analytics-manager-page.png",
        "/projects/parma-eventi-studenteschi/images/06-homepage-user.png",
        "/projects/parma-eventi-studenteschi/images/07-user-event-details-modal.png",
        "/projects/parma-eventi-studenteschi/images/08-user-calendar-page.png",
        "/projects/parma-eventi-studenteschi/images/09-developer-user-actions-page.png",
        "/projects/parma-eventi-studenteschi/images/10-developer-api-page.png",
        "/projects/parma-eventi-studenteschi/images/11-developer-mysql-page.png",
        "/projects/parma-eventi-studenteschi/images/12-developer-ftp-page.png",
      ],
      icon: "/projects/parma-eventi-studenteschi/icon/parma-eventi-studenteschi.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Applicazione web", "Progetto accademico", "Architettura containerizzata"],
    },
    {
      id: 6,
      title: "Print Service",
      shortDescription: "Servizio self-hosted per l'automazione di stampa e scansione documenti per una copisteria, con ricezione lavori via web o email.",
      description:
        "Print Service è un progetto sviluppato in due versioni distinte, con la seconda nata per superare i limiti architetturali della prima anziché estenderla in modo incrementale. Il sistema automatizza la ricezione e l'evasione di lavori di stampa e scansione per un contesto operativo reale di copisteria: i clienti possono inoltrare documenti in formato PDF tramite un'applicazione web dedicata oppure tramite un semplice invio email con un oggetto in formato convenzionale, mentre un demone locale, fisicamente collegato a una stampante e a uno scanner, preleva i lavori dalla coda, li inoltra al sottosistema di stampa fisico e restituisce automaticamente via email le scansioni acquisite in formato PDF. La versione originaria (V1) è stata realizzata in C#/.NET per ambiente Windows, con interfaccia utente in WPF e Windows Forms, persistenza dei dati su database MySQL, integrazione con i protocolli IMAP e SMTP tramite la libreria S22.Imap per la ricezione e l'invio della posta elettronica, logging strutturato tramite log4net, rendering dei documenti PDF tramite PdfiumViewer, e acquisizione delle immagini dallo scanner tramite il driver standard TWAIN mediante il wrapper TwainDotNet; questa versione era inoltre affiancata da un'applicazione client separata realizzata in .NET MAUI, pensata per consentire l'invio remoto dei lavori di stampa da dispositivo mobile. Questa architettura, fortemente centrata sul desktop Windows e sull'ecosistema Microsoft, era coerente con un contesto operativo a singolo punto di erogazione fisica, ma presentava limiti evidenti in termini di costi di licenza del sistema operativo, di portabilità e di possibilità di scalare su hardware più economico. La V2 rappresenta una migrazione strategica dell'intero stack tecnologico verso l'ambiente Linux, riscritta interamente in Python secondo un'architettura a microservizi indipendenti che condividono tuttavia un pacchetto ORM comune basato su SQLAlchemy, una scelta che garantisce la coerenza dello schema dati tra i diversi servizi pur mantenendone l'indipendenza di deployment e di ciclo di vita. Un demone dedicato all'elaborazione delle code di lavoro si interfaccia direttamente con il sottosistema di stampa CUPS tramite il protocollo IPP (utilizzando il binding pycups) e con il sottosistema di acquisizione scanner SANE (tramite l'utility scanimage), mentre due distinte API REST realizzate con il framework FastAPI, servite tramite il server ASGI Uvicorn, separano nettamente la superficie pubblica esposta ai clienti da quella amministrativa e gestionale riservata al personale: questa separazione riduce concretamente la superficie di attacco del servizio esposto direttamente su Internet, poiché un'eventuale vulnerabilità nell'endpoint pubblico non compromette automaticamente le funzionalità amministrative. Il deployment della V2 avviene in modo nativo su Linux, senza containerizzazione, tramite uno script di installazione che configura Apache come reverse proxy verso i servizi FastAPI, registra i servizi applicativi come unit systemd per garantirne il riavvio automatico, predispone un ambiente grafico kiosk per l'interfaccia locale della postazione fisica di lavoro, e installa lo strumento di assistenza remota AnyDesk per la manutenzione a distanza: un insieme di scelte operative motivate dal contesto reale di una piccola impresa, dove affidabilità operativa, semplicità di manutenzione remota e contenimento dei costi di infrastruttura pesano più della portabilità teorica offerta da una soluzione containerizzata.",
      stack: ["C#/.NET 8", "WPF/WinForms/.NET MAUI", "TWAIN/TwainDotNet", "MySQL", "Python", "FastAPI/Uvicorn", "SQLAlchemy", "CUPS/pycups", "SANE", "Apache/systemd"],
      images: [
        "/projects/print-service/images/01-website.png",
        "/projects/print-service/images/02-gestionale.png",
      ],
      icon: "/projects/print-service/icon/print-service.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Automazione documentale", "Architettura a microservizi", "Sistema self-hosted"],
    },
    {
      id: 7,
      title: "WPEHub — Ecosistema Editor Desktop",
      shortDescription: "Ecosistema di prodotti WPEHub: suite desktop WPF con cinque editor di produttività, strumento interno di licensing/supporto e sito web di distribuzione.",
      description:
        "WPEHub è un ecosistema di prodotti collegati tra loro, distribuiti su più sotto-progetti che condividono lo stesso ciclo di vita commerciale: un'applicazione desktop WPF su .NET 7 che riunisce cinque moduli editor funzionalmente eterogenei — codice sorgente con evidenziazione sintattica, documenti in stile Word, immagini, PDF e foglio di calcolo — un'applicazione desktop separata per l'amministrazione interna, e un sito web che ne gestisce la distribuzione e il licensing. L'applicazione principale adotta una rigorosa applicazione del pattern Model-View-ViewModel, con ciascun modulo isolato in una View e un ViewModel propri, così da poter essere sviluppato, testato e sostituito senza effetti collaterali sugli altri quattro. La decisione tecnica più significativa è quella di delegare l'implementazione dei motori di editing, ovvero la parte più onerosa e rischiosa dal punto di vista ingegneristico, alla libreria commerciale Syncfusion Essential Studio for WPF (SfRichTextBoxAdv per il documento, SfImageEditor per le immagini, PdfViewer per i PDF, SfSpreadsheet per i fogli di calcolo, Edit.WPF per il codice): una classica decisione di build-vs-buy, motivata dal fatto che reimplementare da zero editor complessi e maturi comporterebbe un investimento di sviluppo e collaudo sproporzionato rispetto al valore differenziale ottenibile, permettendo al team di concentrarsi sull'integrazione dei moduli, sulla coerenza dei temi (SfSkinManager, con supporto nativo ai temi chiaro/scuro di Windows 11) e su funzionalità trasversali quali la localizzazione multilingua (GTranslate) e la rilevazione delle informazioni hardware del sistema ospite (Hardware.Info). Accanto all'applicazione principale, WPEHub Support è un'applicazione desktop distinta su .NET 8, sviluppata per isolare completamente le operazioni di back-office — generazione dei codici di licenza, pianificazione delle finestre di manutenzione, gestione del ciclo di vita dei ticket di assistenza — dal codice esposto all'utente finale: chi possiede l'installer del prodotto pubblico non ha così alcun accesso alle funzionalità amministrative sensibili, che restano confinate a uno strumento riservato al personale interno, organizzato anch'esso secondo MVVM con classi dedicate (MaintenanceManagement, TicketManagement, CryptoManagement, PhpManagement) e componenti Syncfusion per la UI. Il sito web WPEHub-WebSite, in PHP e MySQL, è il terzo tassello dell'ecosistema: espone la presentazione pubblica del prodotto e persiste su uno schema dedicato le entità necessarie al modello di licenza (appcodes per i codici applicativi, maintenance per le finestre di manutenzione, tickets e tickettypes per il supporto clienti tipizzato). La separazione di questo backend sia dall'applicazione desktop principale sia dallo strumento di amministrazione interna, pur condividendo lo stesso database come unica fonte di verità, consente di aggiornare la logica di licensing o di introdurre nuove tipologie di ticket senza richiedere una nuova build, un nuovo collaudo e una nuova distribuzione del client tramite installer — un vincolo strutturale tipico di ogni prodotto desktop distribuito in forma binaria, dove il costo di un aggiornamento lato client è ordini di grandezza superiore rispetto a un aggiornamento di un servizio web centralizzato. L'intero ecosistema ha una storia evolutiva ampia: la versione più antica del prodotto, denominata WPE-Editor, era realizzata in tecnologia UWP e si proponeva già di consentire l'apertura, la modifica e il commento di file Word, PowerPoint, Excel e PDF in un'unica applicazione, accompagnata da un proprio sito di presentazione altrettanto minimale in PHP. L'abbandono della piattaforma UWP a favore della riscrittura completa su stack WPF è stato motivato dai limiti strutturali di UWP rispetto alle esigenze del prodotto: un ecosistema di librerie commerciali di terze parti assai più ridotto (la stessa Syncfusion offre per WPF una gamma di componenti enterprise molto più estesa e matura), vincoli distributivi più stringenti legati al modello di pubblicazione tramite Microsoft Store, e un modello di sicurezza sandboxed meno adatto a un'applicazione che richiede un accesso ampio al file system per la manipolazione di documenti arbitrari; i moduli di editing PDF e documento del prototipo UWP sono stati infatti concettualmente ripresi, ampliati e consolidati nell'attuale implementazione WPF.",
      stack: ["C#/.NET 7/8", "WPF/MVVM", "Syncfusion Essential Studio", "GTranslate", "Newtonsoft.Json", "PHP", "MySQL", "UWP (legacy)"],
      images: [
        "/projects/wpehub/images/01-presentation-video.mp4",
        "/projects/wpehub/images/02-loading-page.png",
        "/projects/wpehub/images/03-homepage.png",
        "/projects/wpehub/images/04-document-editor-page.png",
        "/projects/wpehub/images/05-spreadsheet-editor-page.png",
        "/projects/wpehub/images/06-pdf-editor-page.png",
        "/projects/wpehub/images/07-image-editor-page.png",
        "/projects/wpehub/images/08-code-editor-page.png",
        "/projects/wpehub/images/09-system-page.png",
      ],
      icon: "/projects/wpehub/icon/wpehub.png",
      icon_size: { width: 128, height: 128 },
      tags: ["Applicazione desktop", "Suite di produttività", "Licensing", "Build-vs-buy"],
    },
    {
      id: 8,
      title: "YouTube Planner",
      shortDescription: "Piattaforma gestionale full-stack per la pianificazione, produzione e post-produzione di contenuti YouTube, con app companion mobile.",
      description:
        "YouTube Planner è un sistema gestionale interno concepito per governare un flusso di produzione video con numerose fasi tra loro interdipendenti — pianificazione editoriale, montaggio, produzione grafica, rendering, pubblicazione sui canali social, comunicazione interna di team — e la sua architettura complessiva riflette in modo diretto questa intrinseca complessità organizzativa. Il portale web, scritto in PHP procedurale privo di un framework MVC formale, è scomposto in decine di moduli funzionali autonomi e debolmente accoppiati tra loro: pianificazione e monitoraggio dello stato di avanzamento dei video, gestione dei post destinati ai social network, produzione delle grafiche accessorie, gestione dell'upload e del rendering dei file video, comunicazioni interne di team con un canale dedicato di integrazione verso Discord, generazione di statistiche aggregate, e uno scheduler automatico per la pubblicazione dei contenuti secondo un calendario editoriale predefinito. Ciascuno di questi moduli, pur in totale assenza di un framework applicativo strutturato, è organizzato secondo una convenzione ricorrente e rigorosamente rispettata in tutta la codebase, composta da un file di ingresso index.php, una classe DataController.php dedicata all'accesso e alla manipolazione dei dati, e un file service.php che ne orchestra la logica applicativa: questa disciplina convenzionale, per quanto non imposta da alcun vincolo tecnico del linguaggio, garantisce una prevedibilità strutturale che facilita sensibilmente la navigazione e la manutenzione di una base di codice altrimenti composta da decine di moduli indipendenti scritti in tempi diversi. Le interfacce a griglia dati che permeano il portale si appoggiano a componenti della libreria commerciale DevExtreme, con classi di supporto dedicate al caricamento lato server dei dati e al calcolo di aggregazioni statistiche, una scelta che sposta sul server, anziché sul client, l'onere computazionale del filtraggio e dell'ordinamento su volumi di dati potenzialmente elevati relativi allo storico dei contenuti pubblicati. Lo schema relazionale del database sottostante è organizzato attorno a entità di dominio ben identificabili (video, tagli di montaggio, post social, elementi grafici, rendering, interventi di manutenzione), ma la scelta di maggiore interesse dal punto di vista dell'efficienza architetturale è l'introduzione di viste di database precalcolate dedicate specificamente alla pianificazione, che aggregano e ordinano automaticamente i video in base all'urgenza, alla settimana di pubblicazione prevista o a statistiche storiche: spostando questa logica di prioritizzazione direttamente a livello di motore database, il sistema evita di replicare la medesima logica di business, potenzialmente soggetta a incoerenze, in più punti dell'applicazione lato server o lato client. Il portale integra infine un sistema di webmail completo basato sul progetto open source Roundcube come canale di comunicazione e notifica interna, una scelta infrastrutturale ambiziosa e non comune in contesti di questa dimensione, che replica un ambiente di collaborazione via email completo anziché limitarsi al semplice invio programmato di messaggi tramite libreria. La componente più interessante dal punto di vista della gestione concreta del flusso di lavoro quotidiano è tuttavia Cut To Do App, un'applicazione companion multipiattaforma sviluppata in .NET MAUI per Android, iOS, macCatalyst e Windows, pensata specificamente per disaccoppiare il lavoro di revisione video e di annotazione dei tagli di montaggio dalla postazione fissa del portale web: l'app riproduce il video tramite il componente CommunityToolkit.Maui.MediaElement e permette all'operatore di annotare in tempo reale, durante la visione, una lista di marker di taglio ciascuno corredato del proprio timestamp esatto, sincronizzando successivamente queste annotazioni con il backend PHP centrale tramite una chiamata REST dedicata e la serializzazione dei dati in formato JSON, chiudendo così in modo efficace il ciclo tra la fase di revisione svolta da dispositivo mobile e la fase di montaggio effettivo condotta sul portale centrale.",
      stack: ["PHP procedurale", "MySQL", "DevExtreme", "C#/.NET MAUI", "Syncfusion.Maui", "Newtonsoft.Json", "FluentFTP", "Roundcube"],
      images: [
        "/projects/youtube-planner/images/01-login-page.png",
        "/projects/youtube-planner/images/02-ai-assistant-modal.png",
        "/projects/youtube-planner/images/03-dashboard-page.png",
        "/projects/youtube-planner/images/04-project-upload-page.png",
        "/projects/youtube-planner/images/05-graphics-request-page.png",
        "/projects/youtube-planner/images/06-settings-page.png",
      ],
      icon: "/projects/youtube-planner/icon/youtube-planner.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Gestione produzione contenuti", "Full-stack", "App companion mobile"],
    },
    {
      id: 9,
      title: "Bio-CMS",
      shortDescription: "Piattaforma per la creazione interattiva di basi di dati a partire da file grezzi, con conversione dei dati assistita da un LLM eseguito in ambiente sandbox isolato.",
      description:
        "bio-cms è una piattaforma per la creazione interattiva di basi di dati a partire da file grezzi (CSV, Excel, TXT), sviluppata nell'ambito di un tirocinio e di una tesi di laurea triennale in Informatica presso l'Università di Parma, incentrata sul modulo di conversione dei dati assistito da un modello linguistico di grandi dimensioni (LLM). Il sistema è organizzato attorno a un backend REST in PHP, tre frontend distinti serviti da altrettanti virtual host Apache — un frontend Explorer per la consultazione dei dati importati, uno di Management per l'amministrazione del sistema, e uno Manual per il manuale degli applicativi precedentemente elencati — e un servizio Python/Flask indipendente (llm_server) dedicato interamente all'orchestrazione delle richieste verso il modello linguistico, eseguito tramite Ollama in modalità locale o su un'istanza remota raggiungibile in rete. Questa separazione netta della componente LLM in un microservizio a sé stante, anziché integrarla direttamente nel backend PHP, disaccoppia il ciclo di vita e lo scaling del componente più oneroso dal punto di vista computazionale — l'inferenza del modello — dal resto dell'applicazione, consentendone il deployment su hardware dedicato indipendentemente dal server web. L'impiego dei modelli linguistici è organizzato secondo una strategia a due livelli: i passi della pipeline che richiedono solo estrazione o classificazione di informazioni (assegnazione delle categorie di transazione, generazione del nome della transazione, produzione della struttura di un grafico, traduzione dei testi dell'interfaccia) vengono affidati a un modello leggero (qwen2.5:1.5b-instruct), mentre i passi che richiedono un ragionamento più articolato — la generazione dello schema del database e della mappatura delle colonne, la generazione e il suggerimento degli script Python di conversione — vengono affidati a un modello più capace ma più oneroso (qwen2.5-coder:7b-instruct), entrambi selezionabili per variabile d'ambiente: una segmentazione del carico di lavoro sui modelli motivata dal contenimento dei costi computazionali di inferenza locale, evitando di invocare il modello più pesante anche per compiti in cui non porterebbe alcun beneficio misurabile. Ogni chiamata al modello è inoltre configurata con una temperatura di campionamento bassa (0.1) e un seed deterministico calcolato dall'hash SHA-256 dell'intera conversazione, cosicché una richiesta identica produca sempre lo stesso output anziché un risultato diverso a ogni esecuzione — una scelta di riproducibilità importante sia in fase di debug sia per la stabilità percepita dall'utente finale, a scapito della varietà nelle risposte che una temperatura più alta offrirebbe. Il motore conversazionale (ChatEngine) implementa un ciclo agentico in cui il modello, anziché ricevere in un colpo solo l'intero contenuto dei file caricati, può invocare un insieme ristretto di tool dedicati (tool_files.read, tool_files.sample, tool_files.infer_schema) per leggere, campionare o dedurre lo schema di un file prima di rispondere; i risultati di questi tool vengono memorizzati in cache sia per hash esatto del contenuto del file sia, per i file non identici ma strutturalmente equivalenti (stesse intestazioni, stessi tipi di colonna, stessa nullabilità), per profilo strutturale, evitando così di ricalcolare uno schema già dedotto per un file analogo caricato in precedenza. La dimensione del budget di iterazioni e della finestra di contesto inviata al modello non è fissa ma scala dinamicamente con il numero di file coinvolti nella richiesta, un accorgimento introdotto dopo aver osservato in produzione che una finestra di contesto fissa andava esaurita a metà risposta con un numero elevato di file allegati, troncando il JSON finale. L'output del modello viene infine validato in due fasi distinte: una validazione strutturale tramite modelli Pydantic dedicati a ciascun tipo di risposta attesa (ad esempio SqlResponse per lo schema del database, con l'insieme dei tipi di colonna ammessi limitato a un vocabolario SQL predefinito), e una successiva validazione semantica (validate_schema) che verifica vincoli non esprimibili in uno schema Pydantic, quali la presenza di un column_mapping per ogni colonna NOT NULL o la coerenza dei riferimenti a chiave esterna tra tabelle. In caso di fallimento di una delle due validazioni, l'errore esatto viene restituito al modello stesso all'interno della stessa conversazione, chiedendogli esplicitamente di ragionare di nuovo sul problema in un blocco di pensiero dedicato prima di produrre una versione corretta della risposta: questo ciclo di autocorrezione (\"self-repair\") è limitato a un numero massimo di tentativi configurabile, oltre il quale la richiesta viene esplicitamente segnalata come fallita anziché restituire all'utente un risultato parziale o silenziosamente errato. Ogni generazione viene infine tracciata in un log dedicato con il numero di round di autocorrezione impiegati, il tasso di cache hit sui file coinvolti, il conteggio di token di prompt e di completamento e la durata complessiva, un livello di osservabilità che consente di misurare nel tempo l'affidabilità e il costo reale dell'integrazione con il modello linguistico. Sul lato PHP, l'intera superficie di interazione con l'LLM è modellata da un'enumerazione di otto tipi di conversazione (risposta generica, domanda, generazione del nome, suggerimento delle categorie, generazione di grafici, traduzione, suggerimento e generazione di script), ciascuno instradato dal servizio LLMService verso l'endpoint Flask dedicato a quel compito specifico: il backend PHP resta quindi puramente un orchestratore stateless che compone cronologia della conversazione e allegati e li inoltra al microservizio corretto, senza replicare al suo interno alcuna logica di prompting o di validazione, che rimane interamente responsabilità del servizio Python. La traduzione dei testi dell'interfaccia è stata invece isolata in un servizio PHP a parte (TranslationLLMService), più semplice del ciclo conversazionale multi-turno e basato su tool: si tratta di una richiesta sincrona a singola stringa verso un endpoint Flask dedicato, il cui esito viene trasmesso al browser una stringa alla volta tramite eventi Server-Sent Events, una scelta che evita di appesantire un compito intrinsecamente semplice con l'infrastruttura pensata per il ciclo agentico più complesso della generazione di schemi e script. L'applicazione effettiva dello schema generato dal modello al database della transazione è infine gestita con due modalità distinte sul lato Flask: in modalità di creazione di una transazione nuova, l'operazione — potenzialmente lunga in presenza di decine di file da caricare — viene eseguita in un thread in background con risposta HTTP 202 immediata, e il progresso viene comunicato in modo asincrono al backend PHP tramite una chiamata di callback autenticata da un segreto condiviso; in modalità di importazione di dati aggiuntivi in uno schema già esistente, l'operazione è invece sufficientemente rapida da essere eseguita in modo sincrono e restituita direttamente nella risposta, evitando la complessità del pattern asincrono quando non è necessaria. La decisione architetturale più delicata riguarda invece l'esecuzione sicura del codice generato dal modello, e dunque intrinsecamente non fidato, per la conversione effettiva dei dati: ogni script di conversione viene eseguito in un container Docker effimero, isolato dalla rete e privo di accesso al filesystem host, il cui unico canale di comunicazione verso l'esterno è un modulo RPC (sandbox_api) che espone esclusivamente query di sola lettura verso il database della specifica transazione, ciascuna ri-validata da un processo worker esterno al sandbox prima di essere eseguita: un modello di sicurezza a più livelli — isolamento di rete, isolamento del filesystem, validazione applicativa lato server — reso necessario dal fatto che il codice da eseguire non è scritto né controllato direttamente da uno sviluppatore, ma prodotto automaticamente da un modello generativo, o manualmente da un utente. La persistenza dei dati è distribuita su due motori di database differenti, MariaDB per i dati strutturati e relazionali dell'applicazione (utenti, permessi, log, transazioni) e MongoDB per i dati importati dall'utente, la cui struttura può variare da un caricamento all'altro: una scelta di polyglot persistence coerente con la natura stessa del prodotto, che deve poter accogliere schemi dati arbitrari definiti dinamicamente dall'utente o dall'LLM. L'intero ambiente è containerizzato tramite Docker Compose e gestito da un insieme di script di automazione per l'avvio, la sospensione, la reinizializzazione e la cancellazione completa, che preservano esplicitamente i dati persistenti salvo cancellazione esplicita richiesta dall'utente.",
      stack: ["PHP", "Python/Flask", "Ollama", "qwen2.5 1.5B/7B-coder", "Pydantic", "Server-Sent Events", "MariaDB", "MongoDB", "Docker Compose", "pandas/numpy"],
      images: [
        "/projects/bio-cms/images/01-environment-start.png",
        "/projects/bio-cms/images/02-admin-user-creation-page.png",
        "/projects/bio-cms/images/03-login-page.png",
        "/projects/bio-cms/images/04-login-page.png",
        "/projects/bio-cms/images/05-transaction-creation-modal.png",
        "/projects/bio-cms/images/06-category-search-modal.png",
        "/projects/bio-cms/images/07-category-creation-modal.png",
        "/projects/bio-cms/images/08-transaction-file-import-modal.png",
        "/projects/bio-cms/images/09-homepage.png",
        "/projects/bio-cms/images/10-transaction-creation-details-modal.png",
        "/projects/bio-cms/images/11-homepage-transaction-details.png",
        "/projects/bio-cms/images/12-er-diagram-page.png",
        "/projects/bio-cms/images/13-table-management-page.png",
        "/projects/bio-cms/images/14-dashboard-page.png",
        "/projects/bio-cms/images/15-script-runner-page.png",
      ],
      icon: "/projects/bio-cms/icon/bio-cms.png",
      icon_size: { width: 62, height: 62 },
      thesisSlug: "laurea-triennale-informatica",
      tags: ["LLM/AI", "Agentic AI", "Data Engineering", "Sandboxing/Sicurezza"],
    },
  ],
};

/** English-language content object. */
const contentEn = {
  /** @type {Profile} */
  profile: {
    name: "Fabio Meloni",
    role: "Full Stack Developer",
    university: { degree: "B.Sc. in Computer Science", institution: "University of Parma, Italy" },
    email: "info@fabiomeloni.net",
    bio: [
      "I hold a Bachelor's degree in Computer Science from the <span class=\"accent-primary\">University of Parma</span>, graduating with full marks and honors (<span class=\"accent-secondary\">110/110 cum laude</span>). My academic path sits at the intersection of software engineering and artificial intelligence, fields in which I've built both methodological and hands-on expertise. I'm currently enrolled in the Master's degree in Computer Science, with a curriculum focused on software verification and advanced <span class=\"accent-primary\">artificial intelligence</span> techniques.",
      "Alongside my studies, I designed and developed <span class=\"accent-primary\">management software for 3D printing</span>, aimed at automating production chains and coordinating additive manufacturing systems. I also contribute to a <span class=\"accent-secondary\">CMS for biological data</span>, conceived as an alternative to traditional CMS platforms in the bioinformatics field: the platform integrates AI models to support data import, execution of analysis algorithms, and generation of dataset browsing interfaces.",
      "My research and development interests span <span class=\"accent-primary\">3D printing</span> and <span class=\"accent-primary\">3D design/scanning</span>, areas where I've built solid technical skills, as well as integrating <span class=\"accent-secondary\">AI models</span> into complex software systems, with particular focus on management applications and automation workflows.",
    ],
  },

  /** @type {Interest[]} */
  interests: [
    { name: "3D Printing", icon: "Layers3", color: "#FF6B35" },
    { name: "3D Design", icon: "Rotate3d", color: "#3A7BFF" },
    { name: "3D Scanning", icon: "ScanSearch", color: "#00BCD4" },
    { name: "Artificial Intelligence", icon: "Bot", color: "#7F5BFF" },
    { name: "Industrial Automation", icon: "Cog", color: "#F59E0B" },
    { name: "Bioinformatics", icon: "Dna", color: "#22C55E" },
    { name: "Software Engineering", icon: "Code2", color: "#EC4899" },
    { name: "Software Testing", icon: "CheckCheck", color: "#14B8A6" },
  ],

  /** @type {TimelineEntry[]} */
  education: [
    {
      slug: "laurea-magistrale-informatica",
      period: "2026 — Present",
      institution: "University of Parma",
      role: "Master's Degree in Computer Science",
      description:
        "Core courses: Methods and Models for Artificial Intelligence, Fundamentals of Artificial Intelligence, Algorithms for Artificial Intelligence, Big Data and Data Mining, Artificial Intelligence Laboratory, Development of Reliable, Safe and Secure Software, Static Analysis and Software Verification, Cybersecurity.",
      type: "education",
    },
    {
      slug: "laurea-triennale-informatica",
      period: "2023 — 2026",
      institution: "University of Parma",
      role: "Bachelor's Degree in Computer Science",
      description:
        "Core courses: Algorithms and Data Structures, Fundamentals of Programming, Programming Methodologies, Operating Systems, Computer Architecture, Databases, Mathematical Analysis, Algebra and Geometry, Elements of Logic and Discrete Structures, Computer Networks, Software Engineering.",
      type: "education",
      thesis: {
        degree: "Bachelor's Degree in Computer Science",
        title: "An LLM Workflow for Interactive Database Creation: the Converter Module",
        advisor: "Prof. Vincenzo Bonnici",
        grade: "110/110 cum laude",
        abstract:
          "This thesis presents the design and development of a web application built to transform semi-structured data into structured data, subsequently organized within relational databases. This process is achieved through the integration of artificial intelligence models, used to automate the tasks of interpreting, extracting, and normalizing information. The application also offers an advanced system for managing, editing, and updating imported data, letting users intervene directly on the stored entities. Rounding out the core functionality, the platform integrates a file management module for storing, administering, and browsing the documents and attachments associated with the processed data, ensuring a coherent, structured environment for preserving information.",
        description:
          "This thesis focused on the design and development of bio-cms, a web-based information system aimed at the automated conversion of semi-structured datasets — typically produced in the microbiology domain as spreadsheets, CSV files, or heterogeneous text files — into structured, consistent, and queryable relational databases. The goal was to overcome the intrinsic limitations of tabular storage (lack of referential integrity constraints, absence of an audit trail, poor scalability, and inadequate access control), so as to provide researchers with a solid infrastructure for managing and tracking experimental data.\n\nThe most methodologically significant part of the system is constituted by the converter module, an agent based on a language model (Qwen2.5-Coder-7B-Instruct, run locally via Ollama) integrated following an agentic design pattern: the model, invoked through an iterative orchestration loop implemented by the ChatEngine class, analyzes the content of the uploaded files using a set of tools exposed by the backend (row sampling, column schema inference via Pandas) and produces a complete SQL schema as output, accompanied by an explicit mapping between source and destination columns, structurally validated through Pydantic models. Where the information available in the data is not sufficient to unambiguously determine the structure — for example in the presence of semantic ambiguity or non-inferable key constraints — the system activates an advanced processing mode, which gives rise to an iterative clarification dialogue between the model and the user, until convergence on a complete schema.\n\nFrom an implementation standpoint, the main architectural components designed and built are as follows:\n- LLM service (Python/Flask): architecture organized into separate blueprints per functional domain (question generation, answers, transaction names, categories, charts); orchestration of the model's output streaming, with explicit filtering of reasoning sections (delimited by <think> tags); a deterministic artifact-caching mechanism, based on the SHA-256 hash of uploaded files, to avoid redundant reprocessing of already-analyzed content.\n- Data generation and insertion pipeline: a ResponseProcessor class, responsible for physically creating the database from the SQL schema produced by the model, by building the dependency graph between tables and applying a topological sorting algorithm to determine a creation order compatible with foreign-key constraints; data insertion via iterator-based (row-by-row) reading of source files, keeping memory usage constant regardless of dataset size.\n- Data transaction management: modeling of a transaction's lifecycle (creation, attachment association, processing, editing, deprecation), with hybrid persistence on MariaDB (relational data) and MongoDB (documents and semi-structured metadata); implementation of an atomic, non-destructive transaction deprecation mechanism, preserving the historical record while keeping it traceable.\n- Discretionary authorization system: a PermissionManager component that governs, at the level of each individual transaction, which operations are allowed to a given user based on resource ownership and explicitly granted permissions, checked upstream of every sensitive operation exposed by the application gateways.\n- \"Showcase\" module: functionality for generating publishable, shareable projections of a transaction's results (dashboards with chart and table widgets), decoupled from the internal application environment and also generatable via natural-language prompts interpreted by the language model for chart production.\n- Logging infrastructure: an extensible architecture, built on a common abstract class (BaseLogger) and a central manager (LogManager) that dynamically selects, via an enumerated type, the appropriate specialized logger (user actions, REST calls, MySQL/MongoDB operations, LLM model operations), ensuring uniform tracking of application operations.\n- Environment containerization: definition of a multi-service Docker infrastructure (Apache, with dedicated virtual hosts for the three frontends and the API; MariaDB; MongoDB; the LLM service; an isolated sandbox environment for script execution), orchestrated via Docker Compose, with automated provisioning of credentials and initial collections/schemas.\n\nExperimental validation: empirical evaluation of the system, carried out on real, synthetic (mock), and increasingly large datasets (from 1,000 to 1,000,000 records), showed a nearly linear trend in processing times as data volume grew, confirming the pipeline's scalability. The introduction of the caching mechanism and the restructuring of the model's incremental output analysis reduced average processing times from about 3 minutes to about 1 minute (over 60%) compared to the system's initial version.",
        stack: [
          "PHP",
          "Python",
          "Flask",
          "Ollama",
          "Qwen2.5-Coder-1.5B-Instruct",
          "Qwen2.5-Coder-7B-Instruct",
          "Pydantic",
          "Pandas",
          "MariaDB",
          "MongoDB",
          "Docker",
          "Docker Compose",
          "jQuery",
          "Bootstrap",
          "SheetJS",
        ],
        attachments: [
          { label: "Thesis", filename: "Bachelor Degree Thesis.pdf", icon: "FileText" },
          { label: "Presentation (PPTX)", filename: "Bachelor Degree Thesis Presentation.pptx", icon: "BarChart3" },
          { label: "Presentation (PDF)", filename: "Bachelor Degree Thesis Presentation.pdf", icon: "BarChart3" },
        ],
      },
    },
    {
      slug: "diploma-isii-marconi",
      period: "2018 — 2023",
      institution: "ITIS Guglielmo Marconi, Piacenza",
      role: "Technical Diploma in Computer Science and Telecommunications — Computer Science Track",
      description:
        "Focus on programming, software development, local area networks, operating systems, web technologies, databases, and information security.",
      type: "education",
      grade: "98/100",
    },
  ],

  /** @type {TimelineEntry[]} */
  experience: [
    {
      slug: "tirocinio",
      period: "Feb 2026 — Jun 2026",
      institution: "University of Parma, Parma",
      role: "Computer Science Thesis Intern - Software Development (Bachelor's Thesis)",
      description:
        "Design and development, within the scope of the Bachelor's thesis in Computer Science at the University of Parma (advisor: Prof. Vincenzo Bonnici), of a web-based software system for converting semi-structured experimental data, typical of the microbiology domain, into a structured relational database (bioCMS), with the aim of ensuring consistency, traceability, and interoperability in support of researchers. The work involved designing the system's multi-tier architecture according to the MVP and Gateway-Controller design patterns, implementing the frontend with HTML5, jQuery, SheetJS, and Bootstrap, and developing the application backend with client-server communication via RESTful APIs, chunked communication handling, and integration with a MongoDB database (BSON modeling, replica sets, and sharding). An LLM-based backend was also designed and implemented, built on an agentic architecture and orchestrated via Ollama with the Qwen2.5-Coder-7B-Instruct model, with data validation through Pydantic and dataset manipulation via Pandas, aimed at the automatic generation of showcases and chart visualizations from descriptive prompts provided by the user. Finally, modules for user, role, and permission management, Bearer Token authentication, and audit trail and operation logging were developed, along with query safety validation mechanisms and topological sorting for managing dependencies between domain entities.",
      type: "internship",
    },
    {
      slug: "junior-fullstack-afcon",
      period: "Apr 2026 — Jun 2026",
      institution: "AFCON SRL, Piacenza",
      role: "Junior Full Stack Developer",
      description:
        "Development, maintenance, and functional extension of web-based management software and Windows desktop applications, initially carried out within a school-work alternation programme (PCTO) and subsequently continued under an occasional-work contract. The activities involved the design and implementation of user interfaces in HTML5, CSS3, JavaScript, jQuery, and PHP, the development of complex interactive components (Gantt charts, resource management systems, operational checklists, and automatic PDF document generation modules), as well as the maintenance of management software already in production use and integration with SQL Server databases and industrial machinery control systems. In parallel, development and update activities for Windows applications were carried out, together with the production of technical documentation and operating manuals, in addition to data entry tasks and general business process support. The experience involved collaboration with technical teams, requirements analysis, testing of implemented functionality, and the use of professional tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio, FileZilla, TeamViewer, and DevExtreme.",
      type: "work",
    },
    {
      slug: "pcto-5s",
      period: "Feb 2023 — Feb 2023",
      institution: "AFCON SNC, Piacenza",
      role: "Frontend Developer Intern",
      description:
        "Development, maintenance, and functional extension of web-based management software built with HTML5, CSS3, JavaScript, jQuery, and PHP. The activities involved the design and implementation of graphical interfaces, the creation of complex interactive components (such as Gantt charts, operational checklists, and resource management systems), integration with company databases, and automated PDF document generation. The work involved collaborating with the development team on requirements analysis, activity planning, testing of implemented functionality, and technical software documentation, including the drafting of operating manuals and user guides. The experience also involved maintaining management software already in use, interfacing with industrial machinery through dedicated databases, and using professional tools such as Visual Studio Code, Microsoft SQL Server Management Studio, FileZilla, TeamViewer, and DevExtreme.",
      type: "internship",
    },
    {
      slug: "pcto-4s",
      period: "May 2021 — Jun 2022",
      institution: "AFCON SNC, Piacenza",
      role: "WPF Application Developer Intern",
      description:
        "Development, maintenance, and functional extension of desktop software applications built in C# and WPF, intended for the operational management of industrial machine tools. The activities involved requirements analysis, the design and implementation of complex graphical interfaces in XAML, integration with Microsoft SQL Server databases, management of concurrent processes through threading, and the implementation of automated logic for component status monitoring, pallet handling, and production flow routing. The work also involved collaborating with the client to define functional requirements, verifying correct operation through manual and automated testing, and systematically documenting the activities carried out using dedicated tools.",
      type: "internship",
    },
  ],

  /** @type {Project[]} */
  projects: [
    {
      id: 1,
      title: "AddressRecognize — Address Recognition",
      shortDescription: "Android application for OCR-based address recognition from the camera and optimization of multi-stop delivery routes.",
      description:
        "AddressRecognize is a native Android application written in Kotlin that addresses, within a single pipeline, three computationally distinct and conceptually decoupled problems: text extraction from images, semantic geocoding, and combinatorial route optimization. The first stage relies on CameraX for video frame acquisition and on Google ML Kit Text Recognition for OCR extraction of the raw text; rather than delegating address recognition itself to a second machine learning model, the design choice was to normalize the OCR output through a pattern-matching engine built on regular expressions calibrated on Italian street naming conventions (Via, Piazza, Corso, Viale). This decision, seemingly less sophisticated than a full-ML approach, is in fact motivated by a precise engineering trade-off: a regex-based system is deterministic, inspectable line by line, requires no training or labeled datasets, and produces easily diagnosable errors, whereas a purpose-trained named entity recognition (NER) model would have introduced a disproportionate amount of uncertainty relative to the added value, given the application domain's narrow scope to the Italian language. Once the textual address is identified, the application resolves it into geographic coordinates via Android's native Geocoder API and renders it on an OpenStreetMap map using the osmdroid library, thereby avoiding dependence on proprietary mapping services and their associated licensing costs for high request volumes. Persistence of application state — stops and trips — is handled through Room on SQLite, ensuring that an in-progress delivery run can be resumed even after the app is accidentally closed, a non-negotiable requirement for a field-operations use case. The architecturally most delicate component of the system is the OsrmTripService module, which queries the public infrastructure of the Open Source Routing Machine (OSRM) project via OkHttp to obtain the matrix of real road distances between all stops, and subsequently solves a constrained variant of the traveling salesman problem — with fixed start and end points and only the intermediate stops free to be reordered — via an exhaustive permutation algorithm of O(n!) complexity. This is a fully conscious implementation choice with respect to its asymptotic limits: for the typical number of stops in a local delivery run (generally fewer than ten), exhaustive search guarantees the optimal solution at negligible computational cost with trivially verifiable code, whereas a heuristic such as nearest-neighbor or 2-opt, while scaling better, would introduce a margin of sub-optimality and an implementation complexity unjustified at the problem's current scale; replacing the algorithm would in any case remain a localized change, isolated behind the service interface. At the overall architectural level, the application adopts a single-Activity design based on Fragments orchestrated by the Navigation Component, without an explicit ViewModel layer: domain logic therefore remains concentrated and easily traceable within individual Fragments, a pragmatic choice consistent with the codebase's contained size.",
      stack: ["Kotlin", "Android SDK", "CameraX", "ML Kit OCR", "Room/SQLite", "osmdroid", "OkHttp", "OSRM"],
      images: [
        "/projects/address-recognize/images/01-homepage.png",
        "/projects/address-recognize/images/02-camera-page.png",
        "/projects/address-recognize/images/03-address-validation-modal.png",
        "/projects/address-recognize/images/04-address-list-modal.png",
        "/projects/address-recognize/images/05-start-end-address-page.png",
        "/projects/address-recognize/images/06-computed-trip.png",
      ],
      icon: "/projects/address-recognize/icon/address-recognize.png",
      icon_size: { width: 64, height: 64 },
      tags: ["Android", "Computer Vision", "Geolocation"],
    },
    {
      id: 2,
      title: "Marlin Ender-3 Pro — Custom Firmware",
      shortDescription: "Custom Marlin firmware for the Ender-3 Pro FDM printer with BLTouch probe and filament runout sensor.",
      description:
        "Marlin Ender-3 Pro Custom is a customization project for the open-source Marlin firmware targeting the Creality Ender-3 Pro FDM 3D printer, carried out using a feature-flag matrix methodology rather than a single, all-encompassing monolithic configuration. The project comprises four distinct firmware variants — one with only the BLTouch leveling probe active, one with only the filament runout sensor active and automatic bed leveling disabled, one with both sensors active simultaneously and bilinear bed leveling (AUTO_BED_LEVELING_BILINEAR), and finally a port to the more recent Marlin 2.1.2.5 branch for the BOARD_CREALITY_V422 mainboard revision, while the other three variants remain anchored to the earlier BOARD_CREALITY_V4. This decomposition into independent, progressively more complete builds is not an incidental detail but reflects a risk-management strategy specific to embedded firmware development: unlike application software, a configuration error in machine-control firmware can translate into actual physical damage (nozzle collision with the bed, overheating, short circuit), so isolating and individually validating each hardware component before combining it into a final configuration allows any malfunction to be quickly circumscribed and diagnosed. All configurations share a stable core of parameters: A4988 stepper drivers (without resorting to the quieter TMC-family drivers, a cheaper and more conservative choice at the expense of operating noise), a 235×235 mm print area with a 250 mm Z-axis travel, a single extruder, persistence of calibrated parameters in EEPROM via the M500/M501 G-code commands, and Power Loss Recovery enabled to allow a print to resume automatically after a sudden power interruption. Notably, Linear Advance — a feature that compensates for residual pressure in the extruder to improve print-corner quality — is deliberately disabled in all four variants: a choice favoring system stability over a qualitative gain judged marginal relative to the risk of introducing extrusion-pressure instability on hardware not specifically calibrated for that feature. The most significant customizations relative to stock Marlin firmware include a probe offset recalculated for a mechanical mounting bracket entirely designed and 3D-printed in-house, an automatic preheating cycle run before the leveling procedure with dedicated temperatures to compensate for the differential thermal expansion of the print bed, a dedicated electrical pin (PA4, configured in pull-down logic) for reading the filament runout sensor signal, and finally the complete localization of the LCD interface menu into Italian on the stock CR10 display.",
      stack: ["C/C++", "Marlin Firmware 2.x", "PlatformIO", "AVR/ATmega2560", "BLTouch", "A4988"],
      images: [],
      tags: ["Firmware", "3D Printing", "Embedded Electronics"],
    },
    {
      id: 3,
      title: "Control Center — Smart Enclosure",
      shortDescription: "Home-automation system for a 3D printer enclosure, featuring embedded firmware, a REST backend, and a WPF desktop client.",
      description:
        "Control Center is a project developed across four successive architectural iterations (V1-V4), each conceived to overcome a concrete limitation that emerged from the previous one, rather than as a mere aesthetic rewrite. The initial version (V1) consisted of a simple monolithic Arduino sketch paired with a Windows Forms client, an architecture adequate for direct, local control but lacking any decoupling between control logic and interface. V2 introduced a WPF architecture with a PHP/MySQL backend, separating persistent state from the user interface for the first time and laying the groundwork for multi-client data access. V3 represented the most significant qualitative leap, introducing a genuine containerized infrastructure based on Docker (comprising MySQL, Spoolman for filament spool inventory management, FDM-Monster as a multi-printer management platform, and ustreamer for low-latency video streaming from the enclosure camera) and multiple physically independent ESP8266 control boards, each dedicated to a single subsystem: motorized door opening, internal LED lighting, environmental sensing, a physical button panel, and an RFID badge reader (via the MFRC522 library) for access control. This decomposition into independent hardware nodes anticipates, at the scale of embedded electronics, the same single-responsibility logic that characterizes a microservices architecture in software. V4, the most mature and recent version, consolidates both the desktop client and the background server service on .NET 9, adopting the commercial Syncfusion library for the user interface and the MVVM architectural pattern via the CommunityToolkit.Mvvm package to ensure testability and separation between presentation logic and application state; it also integrates control of third-party printers via the OctoPrint API (through the OctoPrintSharpApi library) and management of TP-Link Tapo smart plugs (via TapoConnect/TapoSharp) for remote power automation, and completely rewrites the PHP website following a client-side Model-View-Presenter pattern in vanilla JavaScript. The most significant architectural decision in the entire system, kept constant across all recent versions, is that every distributed component — the Arduino/ESP8266 boards, the .NET background service, the WPF desktop client, the PHP website — communicates exclusively through a single shared REST layer implemented in PHP with mysqli data access, backed by a central MySQL database named controlcenter, never establishing direct point-to-point connections between components nor resorting to a dedicated message broker. This centralized hub-and-spoke topology considerably simplifies distributed debugging, since every interaction between components passes through a single observable point, and allows any single node to be restarted or replaced without impacting the others; the cost of this choice is reduced real-time responsiveness compared to an event-driven publish-subscribe architecture, a trade-off deemed acceptable for a home-automation system where a few seconds of latency is generally tolerable. Closing out the entire integration chain, the project includes a custom fork of the Marlin 2.0.x/2.1.x firmware with native support for a BLTouch probe and filament runout sensor, demonstrating coherent management of the whole stack, from the printer's physical hardware all the way to the final user interface.",
      stack: ["C#/.NET 9", "WPF/Syncfusion", "CommunityToolkit.Mvvm", "PHP 8/mysqli", "MySQL", "Arduino/ESP8266", "Docker Compose", "OctoPrint API", "TP-Link Tapo API"],
      images: [
        "/projects/control-center/images/01-login-page.png",
        "/projects/control-center/images/02-dashboard-page.png",
        "/projects/control-center/images/03-enclosure-page.png",
        "/projects/control-center/images/04-printer-page.png",
        "/projects/control-center/images/05-temperature-page.png",
        "/projects/control-center/images/06-humidity-page.png",
        "/projects/control-center/images/07-air-quality-page.png",
        "/projects/control-center/images/08-smoke-page.png",
        "/projects/control-center/images/09-printer-temperature-page.png",
      ],
      icon: "/projects/control-center/icon/control-center.png",
      icon_size: { width: 80, height: 80 },
      tags: ["IoT/Home Automation", "3D Printing", "Embedded Systems"],
    },
    {
      id: 4,
      title: "PolyManage 3D — Additive Manufacturing ERP",
      shortDescription: "Management platform (ERP) for a 3D printing shop, with a transactional PHP backend and Python microservices for slicing and technical drawing.",
      description:
        "PolyManage 3D is a management platform (ERP) developed from the same hardware and shared REST core as Control Center, evolved into a complete system designed for a small additive-manufacturing business. The system includes modules for commercial quoting, production order management with progress tracking, a customer and supplier registry enriched with a customizable tagging system, inventory and procurement management, company accounting, human resources management, scheduled maintenance across a multi-machine fleet, and RFID access control for the physical enclosure. This application scenario overlaps two historically distinct classes of requirements with conflicting needs: on one hand an industrial-automation domain, requiring real-time responsiveness to machine status and emergency conditions; on the other a business-management domain, requiring strong transactional consistency guarantees for operations such as invoicing and inventory movements, where even a temporary inconsistency can translate into concrete financial loss. The architectural response to this tension is a decomposition into containerized microservices organized by vertical competency rather than by technical layer: a REST backend written in PHP 8.2, with autoloading compliant with the PSR-4 standard, stateless authentication via JSON Web Tokens (Firebase JWT library), and data access via PDO on a PostgreSQL database — a deliberate migration away from the MySQL used in the Control Center project from which this system conceptually derives, motivated by the need for stronger transactional (ACID) guarantees and more mature native support for complex integrity constraints, requirements that became essential once the accounting and invoicing modules were introduced — handles the entire application business logic, generating PDF documents via Dompdf and email communications via PHPMailer. Alongside this central core operate three entirely independent Python services, each responsible for a single specialized competency: a service called Control Software that manages integration with OctoPrint and Tapo smart plugs as well as detecting and handling emergency conditions on the machines; a TechnicalDrawing service dedicated to automatically generating technical orthographic projections from three-dimensional models; and a SlicerAgent service that automates the entire slicing process, parsing of the resulting G-code, and management of the print job queue. The frontend, a Single Page Application in vanilla JavaScript built with the Vite bundler, integrated with Bootstrap 5 for interface components and with Three.js for interactive three-dimensional model visualization, deliberately avoids a heavy reactive framework such as React or Vue, a choice that reduces maintenance cognitive load and final bundle size at the cost of somewhat reduced ergonomics when developing highly dynamic interfaces; the Vitest test suite nonetheless ensures automated coverage of client-side application logic. The entire development environment is containerized with Docker and includes a local HTTPS proxy with a dedicated private Certification Authority and a local SMTP/IMAP server, elements that allow faithfully reproducing production-environment conditions without depending on external services during development and testing. The project is also oriented toward progressively more sophisticated business features such as two-factor authentication via local certificates and mDNS resolution, and a demo mode with a database populated by mock data intended for commercial and demonstration purposes.",
      stack: ["PHP 8.2", "PostgreSQL/PDO", "JWT", "JavaScript/Vite", "Bootstrap 5", "Three.js", "Python", "Docker"],
      images: [
        "/projects/polymanage-3d/images/01-dashboard-page.png",
        "/projects/polymanage-3d/images/02-report-page.png",
        "/projects/polymanage-3d/images/03-quotes-page.png",
        "/projects/polymanage-3d/images/04-quotes-editor-page.png",
        "/projects/polymanage-3d/images/05-printers-page.png",
        "/projects/polymanage-3d/images/06-warehouse-items-page.png",
        "/projects/polymanage-3d/images/07-customers-page.png",
        "/projects/polymanage-3d/images/08-projects-page.png",
        "/projects/polymanage-3d/images/09-production-order-editor-page.png",
        "/projects/polymanage-3d/images/10-print-jobs-page.png",
        "/projects/polymanage-3d/images/11-stl-files-page.png",
        "/projects/polymanage-3d/images/12-spools-page.png",
        "/projects/polymanage-3d/images/13-printer-maintenance-page.png",
      ],
      icon: "/projects/polymanage-3d/icon/polymanage-3d.png",
      icon_size: { width: 160, height: 160 },
      tags: ["ERP/Management Software", "3D Printing", "Microservices Architecture"],
    },
    {
      id: 5,
      title: "Parma Student Events",
      shortDescription: "Web platform for managing and promoting events aimed at the student community of the University of Parma.",
      description:
        "Parma Student Events is a project developed as part of a university Software Engineering course, applying a structured software design method to a real use case with well-defined multi-actor requirements. The system distinguishes three categories of users with differentiated permissions and application flows: participants, who can register for events and receive notifications about them; organizers, belonging to previously verified student organizations; and developers, with access to technical administration functionality for the system. Each of these categories is bound, at authentication time, to a dedicated email domain, a simple yet effective access-control mechanism that avoids the need for a manual verification process for every single user. The system also offers captcha-protected login and a password reset procedure, full creation and lifecycle management of events, geographic display on an interactive map via the Leaflet.js library, a notification system, PDF document generation via the FPDF library, and multimedia attachment uploads. Architecturally, the backend is built in plain PHP without any framework, but organized according to a central-router pattern that parses every incoming HTTP request and dispatches it to classes called \"Gateways,\" each dedicated to a specific functional domain (events, users, notifications): this separation of concerns reproduces, even without the aid of a framework, the fundamental principles of a layered architecture, keeping domain logic decoupled from routing and easily testable in isolation. The frontend, written in vanilla JavaScript, in turn adopts the Model-View-Presenter architectural pattern to decouple application logic from direct DOM manipulation, a choice that eases interface maintainability in the absence of a reactive framework. The entire application environment is orchestrated via Docker Compose and faithfully reproduces a realistic, complete production stack, including not only the Apache/PHP application containers for frontend and backend and a MariaDB relational database, but also an FTP server (Pure-FTPd) with an accompanying web client for file management, and a full self-hosted email stack based on Postfix and Dovecot, complete with a RainLoop webmail interface, used for end-to-end verification of email notification flows in a controlled, reproducible environment; rounding out the infrastructure, phpMyAdmin provides a database administration interface. This infrastructural choice considerably exceeds the typical minimum requirements of an academic project, and reflects the explicit intent to validate the system's operation under full operating conditions rather than settling for a superficial demonstration of functionality. Management of the entire environment lifecycle — startup, initial configuration, and container cleanup — is finally automated by a dedicated bash script (env_controller.sh) featuring a menu-driven text interface.",
      stack: ["PHP 8.4", "JavaScript", "MariaDB", "Apache", "Docker Compose", "Leaflet.js", "PHPMailer", "FPDF", "Postfix/Dovecot/RainLoop"],
      images: [
        "/projects/parma-eventi-studenteschi/images/01-login-page.png",
        "/projects/parma-eventi-studenteschi/images/02-2fa-page.png",
        "/projects/parma-eventi-studenteschi/images/03-homepage-manager.png",
        "/projects/parma-eventi-studenteschi/images/04-participants-manage-modal.png",
        "/projects/parma-eventi-studenteschi/images/05-analytics-manager-page.png",
        "/projects/parma-eventi-studenteschi/images/06-homepage-user.png",
        "/projects/parma-eventi-studenteschi/images/07-user-event-details-modal.png",
        "/projects/parma-eventi-studenteschi/images/08-user-calendar-page.png",
        "/projects/parma-eventi-studenteschi/images/09-developer-user-actions-page.png",
        "/projects/parma-eventi-studenteschi/images/10-developer-api-page.png",
        "/projects/parma-eventi-studenteschi/images/11-developer-mysql-page.png",
        "/projects/parma-eventi-studenteschi/images/12-developer-ftp-page.png",
      ],
      icon: "/projects/parma-eventi-studenteschi/icon/parma-eventi-studenteschi.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Web Application", "Academic Project", "Containerized Architecture"],
    },
    {
      id: 6,
      title: "Print Service",
      shortDescription: "Self-hosted service for automating document printing and scanning for a copy shop, with job submission via web or email.",
      description:
        "Print Service is a project developed in two distinct versions, with the second one built to overcome the architectural limitations of the first rather than extending it incrementally. The system automates the intake and fulfillment of print and scan jobs for a real copy-shop operating context: customers can submit PDF documents via a dedicated web application or via a simple email with a conventionally formatted subject line, while a local daemon, physically connected to a printer and a scanner, pulls jobs from the queue, forwards them to the physical printing subsystem, and automatically returns the acquired scans as PDF via email. The original version (V1) was built in C#/.NET for the Windows environment, with a WPF and Windows Forms user interface, data persistence on a MySQL database, integration with the IMAP and SMTP protocols via the S22.Imap library for receiving and sending email, structured logging via log4net, PDF document rendering via PdfiumViewer, and image acquisition from the scanner via the standard TWAIN driver through the TwainDotNet wrapper; this version was also accompanied by a separate client application built in .NET MAUI, designed to allow remote submission of print jobs from a mobile device. This architecture, heavily centered on the Windows desktop and the Microsoft ecosystem, was consistent with an operating context with a single physical delivery point, but presented clear limitations in terms of operating-system licensing costs, portability, and the ability to scale onto cheaper hardware. V2 represents a strategic migration of the entire technology stack to the Linux environment, entirely rewritten in Python according to a microservices architecture whose independent services nonetheless share a common ORM package based on SQLAlchemy, a choice that ensures data-schema consistency across the different services while retaining independence of deployment and lifecycle. A daemon dedicated to processing the job queues interfaces directly with the CUPS printing subsystem via the IPP protocol (using the pycups binding) and with the SANE scanning subsystem (via the scanimage utility), while two distinct REST APIs built with the FastAPI framework, served via the Uvicorn ASGI server, cleanly separate the public surface exposed to customers from the administrative and management surface reserved for staff: this separation concretely reduces the attack surface of the service exposed directly on the Internet, since a vulnerability in the public endpoint does not automatically compromise the administrative functionality. V2 is deployed natively on Linux, without containerization, via an installation script that configures Apache as a reverse proxy to the FastAPI services, registers the application services as systemd units to ensure automatic restart, sets up a kiosk graphical environment for the local interface of the physical workstation, and installs the AnyDesk remote-assistance tool for remote maintenance: a set of operational choices motivated by the real-world context of a small business, where operational reliability, ease of remote maintenance, and infrastructure cost containment outweigh the theoretical portability offered by a containerized solution.",
      stack: ["C#/.NET 8", "WPF/WinForms/.NET MAUI", "TWAIN/TwainDotNet", "MySQL", "Python", "FastAPI/Uvicorn", "SQLAlchemy", "CUPS/pycups", "SANE", "Apache/systemd"],
      images: [
        "/projects/print-service/images/01-website.png",
        "/projects/print-service/images/02-gestionale.png",
      ],
      icon: "/projects/print-service/icon/print-service.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Document Automation", "Microservices Architecture", "Self-Hosted System"],
    },
    {
      id: 7,
      title: "WPEHub — Desktop Editor Ecosystem",
      shortDescription: "WPEHub product ecosystem: a WPF desktop suite with five productivity editors, an internal licensing/support tool, and a distribution website.",
      description:
        "WPEHub is an ecosystem of interconnected products, distributed across several sub-projects that share the same commercial lifecycle: a WPF desktop application on .NET 7 that brings together five functionally heterogeneous editor modules — source code with syntax highlighting, Word-style documents, images, PDFs, and spreadsheets — a separate desktop application for internal administration, and a website that manages its distribution and licensing. The main application employs a rigorous application of the Model-View-ViewModel pattern, with each module isolated in its own View and ViewModel, so that it can be developed, tested, and replaced without side effects on the other four. The most significant technical decision is delegating the implementation of the editing engines — the most costly and engineering-risky part — to the commercial Syncfusion Essential Studio for WPF library (SfRichTextBoxAdv for the document, SfImageEditor for images, PdfViewer for PDFs, SfSpreadsheet for spreadsheets, Edit.WPF for code): a classic build-vs-buy decision, motivated by the fact that reimplementing complex, mature editors from scratch would require a disproportionate development and testing investment relative to the achievable differential value, allowing the team to focus on module integration, theme consistency (SfSkinManager, with native support for Windows 11 light/dark themes), and cross-cutting features such as multilingual localization (GTranslate) and detection of the host system's hardware information (Hardware.Info). Alongside the main application, WPEHub Support is a separate desktop application on .NET 8, developed to fully isolate back-office operations — license code generation, maintenance-window scheduling, support-ticket lifecycle management — from the code exposed to the end user: anyone holding the public product installer thus has no access whatsoever to the sensitive administrative functionality, which remains confined to a tool reserved for internal staff, likewise organized according to MVVM with dedicated classes (MaintenanceManagement, TicketManagement, CryptoManagement, PhpManagement) and Syncfusion UI components. The WPEHub-WebSite website, built in PHP and MySQL, is the third piece of the ecosystem: it exposes the product's public presentation and persists, in a dedicated schema, the entities required for the licensing model (appcodes for application codes, maintenance for maintenance windows, tickets and tickettypes for typed customer support). Separating this backend from both the main desktop application and the internal administration tool, while sharing the same database as the single source of truth, allows licensing logic to be updated or new ticket types to be introduced without requiring a new build, a new testing cycle, and a new client distribution via installer — a structural constraint typical of any desktop product distributed in binary form, where the cost of a client-side update is orders of magnitude higher than updating a centralized web service. The whole ecosystem has an extensive evolutionary history: the earliest version of the product, named WPE-Editor, was built in UWP technology and already aimed to allow opening, editing, and commenting on Word, PowerPoint, Excel, and PDF files within a single application, accompanied by its own equally minimal PHP presentation website. Abandoning the UWP platform in favor of a complete rewrite on the WPF stack was motivated by UWP's structural limitations relative to the product's needs: a far smaller ecosystem of third-party commercial libraries (Syncfusion itself offers a much broader and more mature range of enterprise components for WPF), stricter distribution constraints tied to the Microsoft Store publishing model, and a sandboxed security model less suited to an application requiring broad file-system access for manipulating arbitrary documents; the PDF- and document-editing modules of the UWP prototype were in fact conceptually carried over, expanded, and consolidated into the current WPF implementation.",
      stack: ["C#/.NET 7/8", "WPF/MVVM", "Syncfusion Essential Studio", "GTranslate", "Newtonsoft.Json", "PHP", "MySQL", "UWP"],
      images: [
        "/projects/wpehub/images/01-presentation-video.mp4",
        "/projects/wpehub/images/02-loading-page.png",
        "/projects/wpehub/images/03-homepage.png",
        "/projects/wpehub/images/04-document-editor-page.png",
        "/projects/wpehub/images/05-spreadsheet-editor-page.png",
        "/projects/wpehub/images/06-pdf-editor-page.png",
        "/projects/wpehub/images/07-image-editor-page.png",
        "/projects/wpehub/images/08-code-editor-page.png",
        "/projects/wpehub/images/09-system-page.png",
      ],
      icon: "/projects/wpehub/icon/wpehub.png",
      icon_size: { width: 128, height: 128 },
      tags: ["Desktop Application", "Productivity Suite", "Licensing", "Build-vs-Buy"],
    },
    {
      id: 8,
      title: "YouTube Planner",
      shortDescription: "Full-stack management platform for planning, producing, and post-producing YouTube content, with a companion mobile app.",
      description:
        "YouTube Planner is an internal management system conceived to govern a video production workflow with numerous interdependent stages — editorial planning, editing, graphic production, rendering, publishing to social channels, internal team communication — and its overall architecture directly reflects this intrinsic organizational complexity. The web portal, written in procedural PHP without a formal MVC framework, is decomposed into dozens of loosely coupled, autonomous functional modules: planning and progress tracking of videos, management of posts destined for social networks, production of supporting graphics, management of video file upload and rendering, internal team communications with a dedicated Discord integration channel, generation of aggregate statistics, and an automatic scheduler for publishing content according to a predefined editorial calendar. Each of these modules, despite the total absence of a structured application framework, is organized according to a recurring convention rigorously followed throughout the codebase, consisting of an index.php entry file, a DataController.php class dedicated to data access and manipulation, and a service.php file that orchestrates its application logic: this conventional discipline, although not enforced by any technical constraint of the language, guarantees a structural predictability that significantly eases navigation and maintenance of a codebase otherwise composed of dozens of independent modules written at different times. The data-grid interfaces that permeate the portal rely on components from the commercial DevExtreme library, with dedicated support classes for server-side data loading and computation of statistical aggregations, a choice that shifts the computational burden of filtering and sorting over potentially large volumes of historical published-content data onto the server rather than the client. The underlying database's relational schema is organized around clearly identifiable domain entities (videos, editing cuts, social posts, graphic elements, renders, maintenance activities), but the most interesting choice from an architectural-efficiency standpoint is the introduction of precomputed database views dedicated specifically to planning, which automatically aggregate and order videos by urgency, expected publication week, or historical statistics: by moving this prioritization logic directly to the database-engine level, the system avoids replicating the same business logic, potentially subject to inconsistencies, across multiple points of the server-side or client-side application. The portal finally integrates a complete webmail system based on the open-source Roundcube project as an internal communication and notification channel, an ambitious infrastructural choice uncommon in projects of this scale, replicating a full email-based collaboration environment rather than settling for simple scheduled message sending via library. The most interesting component from the standpoint of concrete day-to-day workflow management is, however, Cut To Do App, a cross-platform companion application built in .NET MAUI for Android, iOS, macCatalyst, and Windows, specifically designed to decouple video review and editing-cut annotation work from the web portal's fixed workstation: the app plays back video through the CommunityToolkit.Maui.MediaElement component and lets the operator annotate, in real time while watching, a list of cut markers each carrying its exact timestamp, subsequently synchronizing these annotations with the central PHP backend via a dedicated REST call and JSON data serialization, thereby effectively closing the loop between the mobile-device review phase and the actual editing phase carried out on the central portal.",
      stack: ["Procedural PHP", "MySQL", "DevExtreme", "C#/.NET MAUI", "Syncfusion.Maui", "Newtonsoft.Json", "FluentFTP", "Roundcube"],
      images: [
        "/projects/youtube-planner/images/01-login-page.png",
        "/projects/youtube-planner/images/02-ai-assistant-modal.png",
        "/projects/youtube-planner/images/03-dashboard-page.png",
        "/projects/youtube-planner/images/04-project-upload-page.png",
        "/projects/youtube-planner/images/05-graphics-request-page.png",
        "/projects/youtube-planner/images/06-settings-page.png",
      ],
      icon: "/projects/youtube-planner/icon/youtube-planner.png",
      icon_size: { width: 72, height: 72 },
      tags: ["Content Production Management", "Full-Stack", "Companion Mobile App"],
    },
    {
      id: 9,
      title: "Bio-CMS",
      shortDescription: "Platform for interactive database creation from raw files, with data conversion assisted by an LLM run in an isolated sandbox environment.",
      description:
        "bio-cms is a platform for interactive database creation from raw files (CSV, Excel, TXT), developed as part of an internship and a Bachelor's thesis in Computer Science at the University of Parma, centered on the data-conversion module assisted by a large language model (LLM). The system is organized around a REST backend in PHP, three distinct frontends served by as many Apache virtual hosts — an Explorer frontend for browsing imported data, a Management frontend for system administration, and a Manual frontend for the manual of the previously listed applications — and an independent Python/Flask service (llm_server) dedicated entirely to orchestrating requests to the language model, run via Ollama either locally or on a remote instance reachable over the network. This clean separation of the LLM component into its own microservice, rather than integrating it directly into the PHP backend, decouples the lifecycle and scaling of the most computationally expensive component — model inference — from the rest of the application, allowing it to be deployed on dedicated hardware independently of the web server. The use of the language models is organized according to a two-tier strategy: pipeline steps that require only information extraction or classification (transaction category assignment, transaction name generation, chart structure production, interface text translation) are delegated to a lightweight model (qwen2.5:1.5b-instruct), while steps requiring more elaborate reasoning — database schema and column-mapping generation, generation and suggestion of Python conversion scripts — are delegated to a more capable but more expensive model (qwen2.5-coder:7b-instruct), both selectable via environment variable: a workload segmentation across models motivated by containing local-inference computational costs, avoiding invoking the heavier model even for tasks where it would bring no measurable benefit. Every call to the model is also configured with a low sampling temperature (0.1) and a deterministic seed computed from the SHA-256 hash of the entire conversation, so that an identical request always produces the same output rather than a different result on each run — a reproducibility choice important both for debugging and for the stability perceived by the end user, at the expense of the response variety that a higher temperature would provide. The conversational engine (ChatEngine) implements an agentic loop in which the model, rather than receiving the entire content of the uploaded files all at once, can invoke a restricted set of dedicated tools (tool_files.read, tool_files.sample, tool_files.infer_schema) to read, sample, or infer the schema of a file before responding; the results of these tools are cached both by exact hash of the file content and, for non-identical but structurally equivalent files (same headers, same column types, same nullability), by structural profile, thereby avoiding recomputation of a schema already inferred for a similar file uploaded previously. The size of the iteration budget and the context window sent to the model is not fixed but scales dynamically with the number of files involved in the request, a refinement introduced after observing in production that a fixed context window would run out mid-response with a large number of attached files, truncating the final JSON. The model's output is finally validated in two distinct stages: a structural validation via dedicated Pydantic models for each expected response type (for example SqlResponse for the database schema, with the set of allowed column types restricted to a predefined SQL vocabulary), and a subsequent semantic validation (validate_schema) that checks constraints not expressible in a Pydantic schema, such as the presence of a column_mapping for every NOT NULL column or the consistency of foreign-key references between tables. If either validation fails, the exact error is fed back to the model itself within the same conversation, explicitly asking it to reason again about the problem in a dedicated thinking block before producing a corrected version of the response: this self-correction (\"self-repair\") loop is capped at a configurable maximum number of attempts, beyond which the request is explicitly flagged as failed rather than returning a partial or silently incorrect result to the user. Every generation is finally logged with the number of self-correction rounds used, the cache-hit rate on the involved files, the prompt and completion token counts, and the overall duration, a level of observability that allows measuring the reliability and real cost of the language-model integration over time. On the PHP side, the entire LLM interaction surface is modeled by an enumeration of eight conversation types (generic response, question, name generation, category suggestion, chart generation, translation, script suggestion, and script generation), each routed by the LLMService service to the Flask endpoint dedicated to that specific task: the PHP backend thus remains a purely stateless orchestrator that assembles conversation history and attachments and forwards them to the correct microservice, without replicating any prompting or validation logic internally, which remains entirely the responsibility of the Python service. Translation of interface text was instead isolated into a separate PHP service (TranslationLLMService), simpler than the multi-turn, tool-based conversational loop and based on a synchronous single-string request to a dedicated Flask endpoint, whose result is streamed to the browser one string at a time via Server-Sent Events, a choice that avoids burdening an intrinsically simple task with the infrastructure designed for the more complex agentic schema- and script-generation loop. The actual application of the model-generated schema to the transaction database is finally handled with two distinct modes on the Flask side: in new-transaction creation mode, the operation — potentially long-running with dozens of files to upload — is executed in a background thread with an immediate HTTP 202 response, and progress is communicated asynchronously to the PHP backend via a callback authenticated by a shared secret; in additional-data import mode into an already existing schema, the operation is instead fast enough to be executed synchronously and returned directly in the response, avoiding the complexity of the asynchronous pattern when it is not needed. The most delicate architectural decision concerns instead the secure execution of the model-generated — and therefore inherently untrusted — code for the actual data conversion: every conversion script is executed in an ephemeral Docker container, isolated from the network and with no access to the host filesystem, whose only communication channel to the outside is an RPC module (sandbox_api) that exposes exclusively read-only queries against the specific transaction's database, each re-validated by a worker process external to the sandbox before execution: a multi-layered security model — network isolation, filesystem isolation, server-side application validation — made necessary by the fact that the code to be executed is neither written nor directly controlled by a developer, but automatically produced by a generative model, or manually by a user. Data persistence is distributed across two different database engines, MariaDB for the application's structured, relational data (users, permissions, logs, transactions) and MongoDB for user-imported data, whose structure can vary from one upload to the next: a polyglot-persistence choice consistent with the very nature of the product, which must be able to accommodate arbitrary data schemas dynamically defined by the user or the LLM. The entire environment is containerized via Docker Compose and managed by a set of automation scripts for startup, suspension, reinitialization, and complete teardown, which explicitly preserve persistent data unless explicit deletion is requested by the user.",
      stack: ["PHP", "Python/Flask", "Ollama", "qwen2.5 1.5B/7B-coder", "Pydantic", "Server-Sent Events", "MariaDB", "MongoDB", "Docker Compose", "pandas/numpy"],
      images: [
        "/projects/bio-cms/images/01-environment-start.png",
        "/projects/bio-cms/images/02-admin-user-creation-page.png",
        "/projects/bio-cms/images/03-login-page.png",
        "/projects/bio-cms/images/04-login-page.png",
        "/projects/bio-cms/images/05-transaction-creation-modal.png",
        "/projects/bio-cms/images/06-category-search-modal.png",
        "/projects/bio-cms/images/07-category-creation-modal.png",
        "/projects/bio-cms/images/08-transaction-file-import-modal.png",
        "/projects/bio-cms/images/09-homepage.png",
        "/projects/bio-cms/images/10-transaction-creation-details-modal.png",
        "/projects/bio-cms/images/11-homepage-transaction-details.png",
        "/projects/bio-cms/images/12-er-diagram-page.png",
        "/projects/bio-cms/images/13-table-management-page.png",
        "/projects/bio-cms/images/14-dashboard-page.png",
        "/projects/bio-cms/images/15-script-runner-page.png",
      ],
      icon: "/projects/bio-cms/icon/bio-cms.png",
      icon_size: { width: 62, height: 62 },
      thesisSlug: "laurea-triennale-informatica",
      tags: ["LLM/AI", "Agentic AI", "Data Engineering", "Sandboxing/Security"],
    },
  ],
};

/**
 * Retrieves the content object for the specified locale.
 *
 * @param {"it"|"en"} locale - Target locale code.
 * @returns {{ profile: Profile, interests: Interest[], education: TimelineEntry[], experience: TimelineEntry[], projects: Project[] }}
 */
export function getContent(locale) {
  return locale === "en" ? contentEn : contentIt;
}