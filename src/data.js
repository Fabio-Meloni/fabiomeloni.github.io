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
    email: "",
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
  ],
};

/** English-language content object. */
const contentEn = {
  /** @type {Profile} */
  profile: {
    name: "Fabio Meloni",
    role: "Full Stack Developer",
    university: { degree: "B.Sc. in Computer Science", institution: "University of Parma, Italy" },
    email: "",
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