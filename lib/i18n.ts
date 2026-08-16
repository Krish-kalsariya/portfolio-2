// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ES and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "es" | "en";

export const LANGUAGES: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).es === "string";
}

export const DICT = {
  picker: {
    season: { es: "Estación", en: "Season" },
    language: { es: "Idioma", en: "Language" },
  },
  seasons: {
    spring: { es: "Primavera", en: "Spring" },
    summer: { es: "Verano", en: "Summer" },
    autumn: { es: "Otoño", en: "Autumn" },
    winter: { es: "Invierno", en: "Winter" },
  },
  nav: {
    aria: { es: "Secciones", en: "Sections" },
    home: { es: "Inicio", en: "Home" },
    stack: { es: "Stack", en: "Stack" },
    experience: { es: "Experiencia", en: "Experience" },
    project: { es: "Proyecto", en: "Project" },
    contact: { es: "Contacto", en: "Contact" },
  },
  header: {
    availability: {
      es: "Disponible para oportunidades",
      en: "Available for opportunities",
    },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I am" },
    roleLine: {
      es: "Desarrollador Full Stack / Especialista en React",
      en: "Full Stack Developer / React Specialist",
    },
    tagline: {
      es: "Creando experiencias digitales excepcionales con tecnologías web modernas.",
      en: "Crafting exceptional digital experiences with modern web technologies.",
    },
    cv: { es: "Descargar CV", en: "Download CV" },
    hire: { es: "Contactarme", en: "Contact me" },
    scroll: { es: "Deslizar para explorar", en: "Scroll to explore" },
    keysHint: {
      es: "· hover sobre las teclas",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { es: "Tech Stack", en: "Tech Stack" },
    hint: {
      es: "(pasa el ratón por una tecla)",
      en: "(hover over a key)",
    },
    hintMobile: {
      es: "Las herramientas con las que construyo.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { es: "Experiencia", en: "Experience" },
    subtitle: {
      es: "Mi trayectoria profesional.",
      en: "My professional journey.",
    },
  },
  projects: {
    kicker: { es: "proyecto", en: "project" },
    viewMore: { es: "Ver más", en: "View more" },
    openSite: { es: "Abrir sitio", en: "Visit site" },
    viewCode: { es: "Ver código", en: "View code" },
    close: { es: "Cerrar", en: "Close" },
    stackLabel: { es: "Stack", en: "Stack" },
    overview: { es: "Resumen", en: "Overview" },
  },
  contact: {
    kicker: { es: "contacto", en: "contact" },
    title: { es: "¿Hablamos?", en: "Let's talk?" },
    body: {
      es: "Si te interesa lo que has visto o tienes un proyecto en mente, envíame un mensaje directo aquí.",
      en: "Have a project in mind, looking to collaborate, or just want to connect? Send me a message directly.",
    },
    copyEmail: { es: "Copiar email", en: "Copy email" },
    openMail: { es: "Abrir mail", en: "Open mailto" },
    github: { es: "GitHub", en: "GitHub" },
    linkedin: { es: "LinkedIn", en: "LinkedIn" },
    emailToast: { es: "Email copiado", en: "Email copied" },
    formName: { es: "Tu Nombre", en: "Your Name" },
    formEmail: { es: "Tu Correo", en: "Your Email" },
    formSubject: { es: "Asunto", en: "Subject" },
    formMessage: { es: "Tu Mensaje", en: "Your Message" },
    formSend: { es: "Enviar Mensaje", en: "Send Message" },
    formSending: { es: "Enviando...", en: "Sending..." },
    formSuccess: {
      es: "¡Mensaje enviado con éxito! Te responderé pronto.",
      en: "Message sent successfully! I'll get back to you soon.",
    },
    formError: {
      es: "Hubo un error al enviar el mensaje. Inténtalo de nuevo o escribe por correo.",
      en: "Failed to send message. Please try again or reach out via email.",
    },
    footer: {
      es: "© 2026 Krish Kalsariya. Todos los derechos reservados.",
      en: "© 2026 Krish Kalsariya. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      html5: {
        es: "El lenguaje de marcado fundamental de la web.",
        en: "The core markup language of the web.",
      },
      css: {
        es: "Dando vida a los diseños y estilos visuales.",
        en: "Bringing layouts and visual styles to life.",
      },
      tailwindcss: {
        es: "Construcción rápida de diseños con CSS utility-first.",
        en: "Rapidly building custom designs with utility-first CSS.",
      },
      javascript: {
        es: "Añadiendo comportamientos interactivos y dinámicos.",
        en: "Adding interactive behaviors and dynamic capabilities.",
      },
      typescript: {
        es: "Tipando JavaScript para un código más robusto y limpio.",
        en: "Typing JavaScript for robust, safer, and cleaner code.",
      },
      react: {
        es: "Construyendo interfaces responsivas con componentes reutilizables.",
        en: "Building responsive user interfaces with reusable components.",
      },
      nodedotjs: {
        es: "Escalando JavaScript para impulsar backends rápidos.",
        en: "Scaling JavaScript to power fast, asynchronous backends.",
      },
      express: {
        es: "Framework web minimalista para construir APIs RESTful.",
        en: "Minimalist web framework for building RESTful APIs.",
      },
      mongodb: {
        es: "Base de datos NoSQL flexible basada en documentos.",
        en: "Flexible, document-based NoSQL database for modern apps.",
      },
      git: {
        es: "Seguimiento de cambios y versionado de código.",
        en: "Tracking changes and versioning code efficiently.",
      },
      github: {
        es: "Alojamiento de repositorios y colaboración en desarrollo.",
        en: "Hosting repositories and collaborating with developers.",
      },
      postman: {
        es: "Diseño, prueba y depuración de APIs con facilidad.",
        en: "Designing, testing, and debugging APIs with ease.",
      },
      figma: {
        es: "Colaboración en diseños modernos limpios e intuitivos.",
        en: "Collaborating on clean, intuitive modern designs.",
      },
      mysql: {
        es: "Sistema relacional para datos estructurados.",
        en: "Relational database management system for structured data.",
      },
      postgresql: {
        es: "Base de datos relacional avanzada de código abierto.",
        en: "Advanced open-source relational database.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.es ?? path;
  return path;
}
