import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        solutions: "Solutions",
        puzzles: "Puzzles",
        tools: "Tools",
        about: "About",
        getStarted: "Get Started"
      },
      
      // Hero Section - Default
      hero: {
        default: {
          title: "Master the Logic of Efficiency",
          subtitle: "Elevate your cognitive prowess through AI-driven automation puzzles. Where precision meets intelligence, and logic transforms into power.",
          cta: "Begin Your Journey"
        },
        google: {
          title: "Precision AI Infrastructure",
          subtitle: "Scalable automation logic engineered for data-driven enterprises. Achieve the gold standard in technical efficiency."
        },
        linkedin: {
          title: "Enterprise Cognitive Automation",
          subtitle: "Transform complex corporate workflows into streamlined autonomous systems. Intelligence at the scale of your ambition."
        },
        facebook: {
          title: "The Future of Workflow Logic",
          subtitle: "Discover how neural processing is redefining modern productivity. Connect your vision with autonomous execution."
        },
        youtube: {
          title: "Implement Intelligent Systems",
          subtitle: "From theory to autonomous reality. Explore the architectural depth of high-performance AI automation."
        },
        newsletter: {
          title: "Exclusive Logic Insights",
          subtitle: "Deep dives into algorithmic patterns and distributed computing. Stay ahead of the automation curve."
        },
        jointherealworld: {
          title: "This is a Puzzle #11",
          subtitle: "If you don't try every day, you might lose your lucky day."
        },
        mexico: {
          title: "Automation Shines Through Every Climate",
          subtitle: "Whether under blazing sun or gathering clouds, your operations run flawlessly. AI that adapts to any weather, any challenge.",
          cta: "Begin Your Journey"
        },
        españa: {
          title: "Automation Radiant as the Sun",
          subtitle: "Brilliant processes that never dim. Let your systems shine with the clarity and warmth of perpetual optimization.",
          cta: "Begin Your Journey"
        },
        rusia: {
          title: "Automation Resilient Through Winter",
          subtitle: "When the cold sets in, your systems stay warm. Precision engineered for the harshest conditions and unwavering performance.",
          cta: "Begin Your Journey"
        },
        francia: {
          title: "Automation Flows Like Rain",
          subtitle: "Elegant, continuous, inevitable. Your processes cascade with the grace of a French storm, turning complexity into harmony.",
          cta: "Begin Your Journey"
        }
      },
      
      // Puzzles Section
      puzzles: {
        title: "Automation Puzzles",
        subtitle: "Challenge your mind with sophisticated logic problems",
        neural: {
          title: "The Neural Link",
          description: "Connect autonomous agents through intricate pathways. Optimize data flow across distributed networks.",
          difficulty: "Difficulty: Advanced",
          stages: "12 Stages"
        },
        dataStream: {
          title: "Data Stream Flow",
          description: "Master the art of real-time data processing. Balance throughput with precision in dynamic environments.",
          difficulty: "Difficulty: Expert",
          stages: "18 Stages"
        },
        quantum: {
          title: "Quantum Sequence",
          description: "Decode complex algorithmic patterns. Navigate probabilistic decision trees with mathematical elegance.",
          difficulty: "Difficulty: Master",
          stages: "24 Stages"
        }
      },
      
      // Tools Section
      tools: {
        title: "Intelligent Tools Suite",
        subtitle: "Enterprise-grade automation at your fingertips",
        neural: {
          title: "Neural Processing Engine",
          optimization: "Optimization"
        },
        analytics: {
          title: "Performance Analytics",
          accuracy: "Accuracy"
        },
        distributed: {
          title: "Distributed Computing",
          balance: "Load Balance"
        },
        systemStatus: {
          title: "System Status",
          activeProcesses: "Active Processes",
          tasksCompleted: "Tasks Completed",
          efficiencyRate: "Efficiency Rate",
          uptime: "Uptime"
        },
        badges: {
          verified: "Verified",
          realtime: "Real-time",
          instant: "Instant"
        }
      },
      
      // Footer
      footer: {
        copyright: "© 2024 AI Automation. Redefining the boundaries of intelligent systems."
      }
    }
  },
  es: {
    translation: {
      // Navegación
      nav: {
        solutions: "Soluciones",
        puzzles: "Acertijos",
        tools: "Herramientas",
        about: "Acerca de",
        getStarted: "Comenzar"
      },
      
      // Sección Hero - Default
      hero: {
        default: {
          title: "Domina la Lógica de la Eficiencia",
          subtitle: "Eleva tu destreza cognitiva a través de acertijos de automatización impulsados por IA. Donde la precisión se encuentra con la inteligencia, y la lógica se transforma en poder.",
          cta: "Comienza tu Viaje"
        },
        google: {
          title: "Infraestructura de IA de Precisión",
          subtitle: "Lógica de automatización escalable diseñada para empresas basadas en datos. Alcanza el estándar de oro en eficiencia técnica."
        },
        linkedin: {
          title: "Automatización Cognitiva Empresarial",
          subtitle: "Transforma flujos de trabajo corporativos complejos en sistemas autónomos optimizados. Inteligencia a la escala de tu ambición."
        },
        facebook: {
          title: "El Futuro de la Lógica de Flujo de Trabajo",
          subtitle: "Descubre cómo el procesamiento neural está redefiniendo la productividad moderna. Conecta tu visión con la ejecución autónoma."
        },
        youtube: {
          title: "Implementa Sistemas Inteligentes",
          subtitle: "De la teoría a la realidad autónoma. Explora la profundidad arquitectónica de la automatización de IA de alto rendimiento."
        },
        newsletter: {
          title: "Perspectivas Lógicas Exclusivas",
          subtitle: "Inmersiones profundas en patrones algorítmicos y computación distribuida. Mantente a la vanguardia de la automatización."
        },
        jointherealworld: {
          title: "Este es un Acertijo #11",
          subtitle: "Si no lo intentas cada día, podrías perder tu día de suerte."
        },
        mexico: {
          title: "Automatización que Brilla Bajo Cualquier Clima",
          subtitle: "Ya sea bajo el sol ardiente o nubes pasajeras, tus operaciones fluyen sin fallas. IA que se adapta a cualquier clima, cualquier desafío.",
          cta: "Comienza tu Viaje"
        },
        españa: {
          title: "Automatización Radiante como el Sol",
          subtitle: "Procesos brillantes que nunca se apagan. Deja que tus sistemas resplandezcan con la claridad y calidez de la optimización perpetua.",
          cta: "Comienza tu Viaje"
        },
        rusia: {
          title: "Automatización Resiliente en el Invierno",
          subtitle: "Cuando el frío llega, tus sistemas permanecen cálidos. Precisión diseñada para las condiciones más duras y rendimiento inquebrantable.",
          cta: "Comienza tu Viaje"
        },
        francia: {
          title: "Automatización que Fluye como la Lluvia",
          subtitle: "Elegante, continua, inevitable. Tus procesos caen en cascada con la gracia de una tormenta francesa, convirtiendo complejidad en armonía.",
          cta: "Comienza tu Viaje"
        }
      },
      
      // Sección de Acertijos
      puzzles: {
        title: "Acertijos de Automatización",
        subtitle: "Desafía tu mente con problemas de lógica sofisticados",
        neural: {
          title: "El Enlace Neural",
          description: "Conecta agentes autónomos a través de caminos intrincados. Optimiza el flujo de datos en redes distribuidas.",
          difficulty: "Dificultad: Avanzado",
          stages: "12 Etapas"
        },
        dataStream: {
          title: "Flujo de Datos en Tiempo Real",
          description: "Domina el arte del procesamiento de datos en tiempo real. Equilibra el rendimiento con precisión en entornos dinámicos.",
          difficulty: "Dificultad: Experto",
          stages: "18 Etapas"
        },
        quantum: {
          title: "Secuencia Cuántica",
          description: "Decodifica patrones algorítmicos complejos. Navega árboles de decisión probabilísticos con elegancia matemática.",
          difficulty: "Dificultad: Maestro",
          stages: "24 Etapas"
        }
      },
      
      // Sección de Herramientas
      tools: {
        title: "Suite de Herramientas Inteligentes",
        subtitle: "Automatización de nivel empresarial al alcance de tu mano",
        neural: {
          title: "Motor de Procesamiento Neural",
          optimization: "Optimización"
        },
        analytics: {
          title: "Análisis de Rendimiento",
          accuracy: "Precisión"
        },
        distributed: {
          title: "Computación Distribuida",
          balance: "Balance de Carga"
        },
        systemStatus: {
          title: "Estado del Sistema",
          activeProcesses: "Procesos Activos",
          tasksCompleted: "Tareas Completadas",
          efficiencyRate: "Tasa de Eficiencia",
          uptime: "Tiempo de Actividad"
        },
        badges: {
          verified: "Verificado",
          realtime: "Tiempo Real",
          instant: "Instantáneo"
        }
      },
      
      // Pie de página
      footer: {
        copyright: "© 2024 AI Automation. Redefiniendo los límites de los sistemas inteligentes."
      }
    }
  },
  fr: {
    translation: {
      // Navigation
      nav: {
        solutions: "Solutions",
        puzzles: "Énigmes",
        tools: "Outils",
        about: "À propos",
        getStarted: "Commencer"
      },
      
      // Hero Section - Default
      hero: {
        default: {
          title: "Maîtrisez la Logique de l'Efficacité",
          subtitle: "Élevez votre prouesse cognitive grâce aux énigmes d'automatisation pilotées par l'IA. Où la précision rencontre l'intelligence, et la logique se transforme en pouvoir.",
          cta: "Commencez Votre Voyage"
        },
        google: {
          title: "Infrastructure IA de Précision",
          subtitle: "Logique d'automatisation évolutive conçue pour les entreprises axées sur les données. Atteignez le standard d'or en efficacité technique."
        },
        linkedin: {
          title: "Automatisation Cognitive d'Entreprise",
          subtitle: "Transformez les flux de travail d'entreprise complexes en systèmes autonomes rationalisés. Intelligence à l'échelle de votre ambition."
        },
        facebook: {
          title: "L'Avenir de la Logique des Flux de Travail",
          subtitle: "Découvrez comment le traitement neuronal redéfinit la productivité moderne. Connectez votre vision à l'exécution autonome."
        },
        youtube: {
          title: "Implémentez des Systèmes Intelligents",
          subtitle: "De la théorie à la réalité autonome. Explorez la profondeur architecturale de l'automatisation IA haute performance."
        },
        newsletter: {
          title: "Perspectives Logiques Exclusives",
          subtitle: "Plongées profondes dans les modèles algorithmiques et l'informatique distribuée. Gardez une longueur d'avance sur l'automatisation."
        },
        jointherealworld: {
          title: "Ceci est une Énigme #11",
          subtitle: "Si vous n'essayez pas chaque jour, vous pourriez perdre votre jour de chance."
        },
        mexico: {
          title: "L'Automatisation Brille Sous Tous les Climats",
          subtitle: "Que ce soit sous un soleil de plomb ou des nuages passagers, vos opérations fonctionnent parfaitement. IA qui s'adapte à tout climat, tout défi.",
          cta: "Commencez Votre Voyage"
        },
        españa: {
          title: "Automatisation Radieuse comme le Soleil",
          subtitle: "Des processus brillants qui ne faiblissent jamais. Laissez vos systèmes rayonner avec la clarté et la chaleur de l'optimisation perpétuelle.",
          cta: "Commencez Votre Voyage"
        },
        rusia: {
          title: "Automatisation Résiliente en Hiver",
          subtitle: "Quand le froid s'installe, vos systèmes restent chauds. Précision conçue pour les conditions les plus rudes et performances inébranlables.",
          cta: "Commencez Votre Voyage"
        },
        francia: {
          title: "L'Automatisation Coule comme la Pluie",
          subtitle: "Élégante, continue, inévitable. Vos processus cascadent avec la grâce d'une tempête française, transformant la complexité en harmonie.",
          cta: "Commencez Votre Voyage"
        }
      },
      
      // Puzzles Section
      puzzles: {
        title: "Énigmes d'Automatisation",
        subtitle: "Défiez votre esprit avec des problèmes de logique sophistiqués",
        neural: {
          title: "Le Lien Neuronal",
          description: "Connectez des agents autonomes via des chemins complexes. Optimisez le flux de données sur des réseaux distribués.",
          difficulty: "Difficulté : Avancé",
          stages: "12 Étapes"
        },
        dataStream: {
          title: "Flux de Données en Temps Réel",
          description: "Maîtrisez l'art du traitement des données en temps réel. Équilibrez débit et précision dans des environnements dynamiques.",
          difficulty: "Difficulté : Expert",
          stages: "18 Étapes"
        },
        quantum: {
          title: "Séquence Quantique",
          description: "Décodez des modèles algorithmiques complexes. Naviguez dans des arbres de décision probabilistes avec élégance mathématique.",
          difficulty: "Difficulté : Maître",
          stages: "24 Étapes"
        }
      },
      
      // Tools Section
      tools: {
        title: "Suite d'Outils Intelligents",
        subtitle: "Automatisation de niveau entreprise à portée de main",
        neural: {
          title: "Moteur de Traitement Neuronal",
          optimization: "Optimisation"
        },
        analytics: {
          title: "Analyse de Performance",
          accuracy: "Précision"
        },
        distributed: {
          title: "Informatique Distribuée",
          balance: "Équilibre de Charge"
        },
        systemStatus: {
          title: "État du Système",
          activeProcesses: "Processus Actifs",
          tasksCompleted: "Tâches Terminées",
          efficiencyRate: "Taux d'Efficacité",
          uptime: "Temps de Fonctionnement"
        },
        badges: {
          verified: "Vérifié",
          realtime: "Temps Réel",
          instant: "Instantané"
        }
      },
      
      // Footer
      footer: {
        copyright: "© 2024 AI Automation. Redéfinir les limites des systèmes intelligents."
      }
    }
  },
  ru: {
    translation: {
      // Navigation
      nav: {
        solutions: "Решения",
        puzzles: "Головоломки",
        tools: "Инструменты",
        about: "О нас",
        getStarted: "Начать"
      },
      
      // Hero Section - Default
      hero: {
        default: {
          title: "Освойте Логику Эффективности",
          subtitle: "Повысьте свое когнитивное мастерство с помощью головоломок автоматизации на основе ИИ. Где точность встречается с интеллектом, а логика превращается в силу.",
          cta: "Начните Свой Путь"
        },
        google: {
          title: "Точная Инфраструктура ИИ",
          subtitle: "Масштабируемая логика автоматизации, разработанная для предприятий, работающих с данными. Достигните золотого стандарта технической эффективности."
        },
        linkedin: {
          title: "Корпоративная Когнитивная Автоматизация",
          subtitle: "Преобразуйте сложные корпоративные рабочие процессы в оптимизированные автономные системы. Интеллект в масштабе ваших амбиций."
        },
        facebook: {
          title: "Будущее Логики Рабочих Процессов",
          subtitle: "Откройте для себя, как нейронная обработка переопределяет современную продуктивность. Соедините свое видение с автономным выполнением."
        },
        youtube: {
          title: "Внедряйте Интеллектуальные Системы",
          subtitle: "От теории к автономной реальности. Исследуйте архитектурную глубину высокопроизводительной автоматизации ИИ."
        },
        newsletter: {
          title: "Эксклюзивные Логические Идеи",
          subtitle: "Глубокое погружение в алгоритмические модели и распределенные вычисления. Оставайтесь впереди кривой автоматизации."
        },
        jointherealworld: {
          title: "Это Головоломка №11",
          subtitle: "Если вы не пытаетесь каждый день, вы можете потерять свой удачный день."
        },
        mexico: {
          title: "Автоматизация Сияет в Любую Погоду",
          subtitle: "Будь то палящее солнце или облака, ваши операции работают безупречно. ИИ, который адаптируется к любой погоде, любым вызовам.",
          cta: "Начните Свой Путь"
        },
        españa: {
          title: "Автоматизация Сияет как Солнце",
          subtitle: "Блестящие процессы, которые никогда не гаснут. Пусть ваши системы сияют с ясностью и теплом вечной оптимизации.",
          cta: "Начните Свой Путь"
        },
        rusia: {
          title: "Автоматизация Устойчива к Зиме",
          subtitle: "Когда приходит холод, ваши системы остаются теплыми. Точность для самых суровых условий и непоколебимая производительность.",
          cta: "Начните Свой Путь"
        },
        francia: {
          title: "Автоматизация Течет как Дождь",
          subtitle: "Элегантная, непрерывная, неизбежная. Ваши процессы текут с грацией французской бури, превращая сложность в гармонию.",
          cta: "Начните Свой Путь"
        }
      },
      
      // Puzzles Section
      puzzles: {
        title: "Головоломки Автоматизации",
        subtitle: "Испытайте свой разум сложными логическими задачами",
        neural: {
          title: "Нейронная Связь",
          description: "Соединяйте автономные агенты через сложные пути. Оптимизируйте поток данных в распределенных сетях.",
          difficulty: "Сложность: Продвинутый",
          stages: "12 Этапов"
        },
        dataStream: {
          title: "Поток Данных в Реальном Времени",
          description: "Овладейте искусством обработки данных в реальном времени. Балансируйте пропускную способность с точностью в динамичных средах.",
          difficulty: "Сложность: Эксперт",
          stages: "18 Этапов"
        },
        quantum: {
          title: "Квантовая Последовательность",
          description: "Расшифруйте сложные алгоритмические паттерны. Перемещайтесь по вероятностным деревьям решений с математической элегантностью.",
          difficulty: "Сложность: Мастер",
          stages: "24 Этапа"
        }
      },
      
      // Tools Section
      tools: {
        title: "Набор Интеллектуальных Инструментов",
        subtitle: "Автоматизация корпоративного уровня у вас под рукой",
        neural: {
          title: "Движок Нейронной Обработки",
          optimization: "Оптимизация"
        },
        analytics: {
          title: "Аналитика Производительности",
          accuracy: "Точность"
        },
        distributed: {
          title: "Распределенные Вычисления",
          balance: "Балансировка Нагрузки"
        },
        systemStatus: {
          title: "Статус Системы",
          activeProcesses: "Активные Процессы",
          tasksCompleted: "Завершенные Задачи",
          efficiencyRate: "Коэффициент Эффективности",
          uptime: "Время Работы"
        },
        badges: {
          verified: "Проверено",
          realtime: "В Реальном Времени",
          instant: "Мгновенно"
        }
      },
      
      // Footer
      footer: {
        copyright: "© 2024 AI Automation. Переопределяя границы интеллектуальных систем."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;