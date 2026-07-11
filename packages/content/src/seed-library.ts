import type { Library } from "./types";

export const library: Library = {
  authors: [
    {
      id: "plato",
      name: "Plato",
      sortName: "Plato",
      lifespan: "c. 428-348 BCE",
      traditions: ["Platonism", "Ancient Greek"],
      portraitHint: "Classical Greek philosopher, Academy founder"
    },
    {
      id: "marcus-aurelius",
      name: "Marcus Aurelius",
      sortName: "Aurelius, Marcus",
      lifespan: "121-180 CE",
      traditions: ["Stoicism", "Ethics"],
      portraitHint: "Roman emperor and Stoic philosopher"
    },
    {
      id: "epictetus",
      name: "Epictetus",
      sortName: "Epictetus",
      lifespan: "c. 50-135 CE",
      traditions: ["Stoicism", "Ethics"],
      portraitHint: "Stoic teacher concerned with freedom and judgment"
    },
    {
      id: "friedrich-nietzsche",
      name: "Friedrich Nietzsche",
      sortName: "Nietzsche, Friedrich",
      lifespan: "1844-1900",
      traditions: ["Existentialism", "Ethics"],
      portraitHint: "German philosopher of values, culture, and self-overcoming"
    },
    {
      id: "john-stuart-mill",
      name: "John Stuart Mill",
      sortName: "Mill, John Stuart",
      lifespan: "1806-1873",
      traditions: ["Enlightenment", "Ethics"],
      portraitHint: "Liberal philosopher and utilitarian thinker"
    },
    {
      id: "aristotle",
      name: "Aristotle",
      sortName: "Aristotle",
      lifespan: "384-322 BCE",
      traditions: ["Aristotelianism", "Ancient Greek", "Ethics"],
      portraitHint: "Greek philosopher of virtue, logic, biology, and civic life"
    },
    {
      id: "rene-descartes",
      name: "Rene Descartes",
      sortName: "Descartes, Rene",
      lifespan: "1596-1650",
      traditions: ["Rationalism"],
      portraitHint: "French philosopher of method, doubt, and rational inquiry"
    },
    {
      id: "david-hume",
      name: "David Hume",
      sortName: "Hume, David",
      lifespan: "1711-1776",
      traditions: ["Empiricism", "Enlightenment"],
      portraitHint: "Scottish empiricist philosopher of causation, habit, and sentiment"
    },
    {
      id: "john-locke",
      name: "John Locke",
      sortName: "Locke, John",
      lifespan: "1632-1704",
      traditions: ["Empiricism", "Enlightenment"],
      portraitHint: "English philosopher of experience, knowledge, and political liberty"
    },
    {
      id: "benedictus-spinoza",
      name: "Benedictus de Spinoza",
      sortName: "Spinoza, Benedictus de",
      lifespan: "1632-1677",
      traditions: ["Spinozism", "Rationalism", "Ethics"],
      portraitHint: "Dutch rationalist philosopher of God, nature, mind, and freedom"
    },
    {
      id: "immanuel-kant",
      name: "Immanuel Kant",
      sortName: "Kant, Immanuel",
      lifespan: "1724-1804",
      traditions: ["Deontology", "Enlightenment", "Ethics"],
      portraitHint: "German philosopher of duty, reason, critique, and autonomy"
    },
    {
      id: "bertrand-russell",
      name: "Bertrand Russell",
      sortName: "Russell, Bertrand",
      lifespan: "1872-1970",
      traditions: ["Analytic Philosophy"],
      portraitHint: "Analytic philosopher and public intellectual concerned with knowledge and logic"
    },
    {
      id: "william-james",
      name: "William James",
      sortName: "James, William",
      lifespan: "1842-1910",
      traditions: ["Pragmatism"],
      portraitHint: "American pragmatist philosopher of belief, truth, and experience"
    }
  ],
  works: [
    {
      id: "apology",
      slug: "apology",
      title: "Apology",
      authorId: "plato",
      tradition: "Platonism",
      era: "Ancient Greece",
      summary: "Socrates defends the examined life before the Athenian court.",
      readingLength: "Short",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/1656",
        translator: "Benjamin Jowett",
        publicationYear: 1892,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Seed text uses brief excerpts only; full launch import requires source-specific QA."
      },
      chapters: [
        {
          id: "apology-opening",
          slug: "opening-defense",
          title: "The Opening Defense",
          order: 1,
          estimatedMinutes: 4,
          sections: [
            {
              id: "apology-opening-1",
              order: 1,
              title: "Plain Speech",
              paragraphs: [
                "Socrates begins by asking the jury to judge the truth of his words rather than the polish of his rhetoric.",
                "The defense frames philosophy as a public act: questioning, clarifying, and refusing to pretend to know what one does not know."
              ]
            },
            {
              id: "apology-opening-2",
              order: 2,
              title: "The Older Accusations",
              paragraphs: [
                "Before answering the legal charges, Socrates turns toward the older reputation that made him seem suspicious.",
                "The chapter is a useful first doorway into philosophy because it treats curiosity as both a civic disturbance and a moral duty."
              ]
            }
          ]
        },
        {
          id: "apology-examined-life",
          slug: "the-examined-life",
          title: "The Examined Life",
          order: 2,
          estimatedMinutes: 5,
          sections: [
            {
              id: "apology-examined-life-1",
              order: 1,
              title: "Conscience Over Comfort",
              paragraphs: [
                "Socrates argues that a person should care more for the condition of the soul than for reputation, money, or safety.",
                "His refusal to stop philosophizing turns the trial into a test of whether public life can tolerate honest examination."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "meditations",
      slug: "meditations",
      title: "Meditations",
      authorId: "marcus-aurelius",
      tradition: "Stoicism",
      era: "Imperial Rome",
      summary: "Private notes on discipline, mortality, attention, and living according to nature.",
      readingLength: "Medium",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/2680",
        translator: "George Long",
        publicationYear: 1862,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Seed text is summarized for the demo; full text should be imported from a vetted source."
      },
      chapters: [
        {
          id: "meditations-book-2",
          slug: "book-ii",
          title: "Book II",
          order: 1,
          estimatedMinutes: 6,
          sections: [
            {
              id: "meditations-book-2-1",
              order: 1,
              title: "Morning Attention",
              paragraphs: [
                "Marcus begins the day by preparing himself for difficult people, not as an excuse for resentment, but as practice in understanding human nature.",
                "The Stoic reader is asked to separate what happens from the judgment added to it."
              ]
            },
            {
              id: "meditations-book-2-2",
              order: 2,
              title: "The Present Task",
              paragraphs: [
                "Much of the work returns to a simple discipline: do the present action with justice, truth, and steadiness.",
                "The reader experience should make this kind of slow return easy: short sections, gentle pacing, and a clear place to resume."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "enchiridion",
      slug: "enchiridion",
      title: "Enchiridion",
      authorId: "epictetus",
      tradition: "Stoicism",
      era: "Imperial Rome",
      summary: "A compact manual on freedom, desire, control, and resilient judgment.",
      readingLength: "Short",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/45109",
        translator: "Elizabeth Carter",
        publicationYear: 1758,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Launch import should preserve numbered sections and translator attribution."
      },
      chapters: [
        {
          id: "enchiridion-section-1",
          slug: "what-is-up-to-us",
          title: "What Is Up To Us",
          order: 1,
          estimatedMinutes: 4,
          sections: [
            {
              id: "enchiridion-section-1-1",
              order: 1,
              title: "The First Distinction",
              paragraphs: [
                "Epictetus opens with a distinction between what is in our power and what is not.",
                "This gives V1 a natural beginner path: short philosophical units that can be read, bookmarked, and returned to without friction."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "thus-spake-zarathustra",
      slug: "thus-spake-zarathustra",
      title: "Thus Spake Zarathustra",
      authorId: "friedrich-nietzsche",
      tradition: "Existentialism",
      era: "19th Century",
      summary: "A poetic philosophical work on value creation, self-overcoming, and cultural transformation.",
      readingLength: "Long",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/1998",
        translator: "Thomas Common",
        publicationYear: 1896,
        rights: "Public-domain translation in the United States; Nietzsche translations vary, so translator provenance must be checked per edition.",
        jurisdictionNote: "Use only vetted public-domain translations or licensed modern translations."
      },
      chapters: [
        {
          id: "zarathustra-prologue",
          slug: "prologue",
          title: "Zarathustra's Prologue",
          order: 1,
          estimatedMinutes: 7,
          sections: [
            {
              id: "zarathustra-prologue-1",
              order: 1,
              title: "Descent From Solitude",
              paragraphs: [
                "Zarathustra leaves solitude to speak again with human beings, carrying a philosophy that is deliberately poetic and disruptive.",
                "For Philo4All, Nietzsche should be presented with extra source care because translation rights and interpretive framing matter."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "on-liberty",
      slug: "on-liberty",
      title: "On Liberty",
      authorId: "john-stuart-mill",
      tradition: "Enlightenment",
      era: "19th Century",
      summary: "A landmark argument about individuality, free discussion, and the limits of social power.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/34901",
        publicationYear: 1859,
        rights: "Public-domain text in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Useful launch candidate for ethics and political philosophy browsing."
      },
      chapters: [
        {
          id: "on-liberty-intro",
          slug: "introductory",
          title: "Introductory",
          order: 1,
          estimatedMinutes: 5,
          sections: [
            {
              id: "on-liberty-intro-1",
              order: 1,
              title: "Civil Liberty",
              paragraphs: [
                "Mill introduces the question of how far society may rightfully limit individual freedom.",
                "The work broadens the V1 catalog beyond ancient philosophy into political and ethical thought."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "republic",
      slug: "republic",
      title: "The Republic",
      authorId: "plato",
      tradition: "Platonism",
      era: "Ancient Greece",
      summary: "A foundational dialogue on justice, education, the soul, and the philosopher's relation to political life.",
      readingLength: "Long",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/1497",
        translator: "Benjamin Jowett",
        publicationYear: 1892,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Launch import should choose one Jowett edition and preserve book-level divisions."
      },
      chapters: [
        {
          id: "republic-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "republic-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "The Republic gives Philo4All a central path into political philosophy, ethics, education, psychology, and metaphysics.",
                "For V1, it should be imported as ten books with stable chapter navigation and extra care around line length because the dialogue can become dense."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "symposium",
      slug: "symposium",
      title: "Symposium",
      authorId: "plato",
      tradition: "Platonism",
      era: "Ancient Greece",
      summary: "A dramatic sequence of speeches on love, desire, beauty, and philosophical ascent.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/1600",
        translator: "Benjamin Jowett",
        publicationYear: 1892,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Good early launch work because it is shorter than the Republic and naturally divided by speeches."
      },
      chapters: [
        {
          id: "symposium-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "symposium-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Symposium is one of Plato's most inviting dialogues because it stages philosophy as conversation, wit, conflict, and longing.",
                "The launch import should split the work by speaker so readers can move through the speeches without losing the dramatic shape."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "phaedo",
      slug: "phaedo",
      title: "Phaedo",
      authorId: "plato",
      tradition: "Platonism",
      era: "Ancient Greece",
      summary: "Socrates' final conversation on the soul, death, philosophy, and the hope for wisdom beyond fear.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/1658",
        translator: "Benjamin Jowett",
        publicationYear: 1892,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Pairs naturally with Apology for a Socrates reading path."
      },
      chapters: [
        {
          id: "phaedo-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "phaedo-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Phaedo makes the question of death into a test of what philosophy is for.",
                "For the reader, it should be presented as a companion to Apology: trial, refusal, reflection, and the final practice of courage."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "nicomachean-ethics",
      slug: "nicomachean-ethics",
      title: "Nicomachean Ethics",
      authorId: "aristotle",
      tradition: "Aristotelianism",
      era: "Ancient Greece",
      summary: "Aristotle's practical inquiry into happiness, virtue, character, friendship, and the shape of a good life.",
      readingLength: "Long",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/8438",
        translator: "F. H. Peters",
        publicationYear: 1893,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Launch import should preserve the ten-book structure and mark glossary-heavy sections for later study aids."
      },
      chapters: [
        {
          id: "nicomachean-ethics-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "nicomachean-ethics-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Nicomachean Ethics is a strong V1 anchor because it asks the question many readers bring first: how should I live?",
                "The reader should support its practical rhythm by making each book easy to resume and by keeping virtue terms visible in headings."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "discourse-on-method",
      slug: "discourse-on-method",
      title: "Discourse on the Method",
      authorId: "rene-descartes",
      tradition: "Rationalism",
      era: "17th Century",
      summary: "Descartes' compact account of methodic doubt, clear reasoning, and the search for secure knowledge.",
      readingLength: "Short",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/59",
        publicationYear: 1637,
        rights: "Public-domain English text in the United States; verify translator/editor metadata before launch.",
        jurisdictionNote: "Short enough for an early full import and useful as a bridge into modern philosophy."
      },
      chapters: [
        {
          id: "discourse-on-method-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "discourse-on-method-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Discourse on the Method gives beginners a clean doorway into modern philosophy through doubt, method, and self-examination.",
                "The launch import should preserve the six-part structure and include source notes for the English edition used."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "enquiry-human-understanding",
      slug: "enquiry-human-understanding",
      title: "An Enquiry Concerning Human Understanding",
      authorId: "david-hume",
      tradition: "Empiricism",
      era: "18th Century",
      summary: "Hume's accessible investigation of ideas, causation, skepticism, belief, and the limits of human knowledge.",
      readingLength: "Medium",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/9662",
        publicationYear: 1748,
        rights: "Public-domain text in the United States; verify edition notes before redistribution.",
        jurisdictionNote: "Good early candidate for full-text import because sections are already reader-friendly."
      },
      chapters: [
        {
          id: "enquiry-human-understanding-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "enquiry-human-understanding-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Hume makes epistemology feel immediate by asking what experience can and cannot justify.",
                "For V1, this work helps the library move beyond ancient ethics into knowledge, belief, habit, and skepticism."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "essay-human-understanding",
      slug: "essay-human-understanding",
      title: "An Essay Concerning Humane Understanding",
      authorId: "john-locke",
      tradition: "Empiricism",
      era: "17th Century",
      summary: "Locke's major account of ideas, experience, identity, language, and the sources of human understanding.",
      readingLength: "Long",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/10615",
        publicationYear: 1689,
        rights: "Public-domain text in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Volume 1 is tracked first; Volume 2 can be linked as a companion import."
      },
      chapters: [
        {
          id: "essay-human-understanding-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "essay-human-understanding-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Locke is essential for readers tracing the empiricist line from experience to knowledge.",
                "Because the work is large, V1 should import it in volumes and make book-level navigation especially clear."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ethics-spinoza",
      slug: "ethics-spinoza",
      title: "Ethics",
      authorId: "benedictus-spinoza",
      tradition: "Spinozism",
      era: "17th Century",
      summary: "A geometric demonstration of God or nature, mind, emotion, bondage, freedom, and blessedness.",
      readingLength: "Long",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/3800",
        translator: "R. H. M. Elwes",
        publicationYear: 1883,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Import should preserve definitions, axioms, propositions, proofs, and scholia as distinct section types later."
      },
      chapters: [
        {
          id: "ethics-spinoza-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "ethics-spinoza-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Spinoza's Ethics is a difficult but beautiful candidate for Philo4All because its structure rewards careful navigation.",
                "A later reader upgrade should distinguish proof, proposition, note, and appendix blocks instead of flattening the text."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "groundwork",
      slug: "groundwork",
      title: "Fundamental Principles of the Metaphysic of Morals",
      authorId: "immanuel-kant",
      tradition: "Deontology",
      era: "18th Century",
      summary: "Kant's foundational work on good will, duty, autonomy, and the possibility of moral law.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/5682",
        translator: "Thomas Kingsmill Abbott",
        publicationYear: 1889,
        rights: "Public-domain translation in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Launch import should preserve the preface and three-section structure."
      },
      chapters: [
        {
          id: "groundwork-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "groundwork-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Kant gives the ethics shelf a very different voice from Aristotle, Hume, and Mill.",
                "This work is a strong V1 candidate because its structure is compact and its core terms can later support glossary notes."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "problems-of-philosophy",
      slug: "problems-of-philosophy",
      title: "The Problems of Philosophy",
      authorId: "bertrand-russell",
      tradition: "Analytic Philosophy",
      era: "20th Century",
      summary: "Russell's short, approachable introduction to appearance, reality, matter, knowledge, universals, and philosophical value.",
      readingLength: "Medium",
      featured: true,
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/5827",
        publicationYear: 1912,
        rights: "Public-domain text in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Excellent beginner-facing launch candidate because chapters are already concise and introductory."
      },
      chapters: [
        {
          id: "problems-of-philosophy-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "problems-of-philosophy-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Russell is one of the best first stops for readers who want philosophy explained without losing seriousness.",
                "This should be one of the first complete imports after the seed catalog because it suits Philo4All's public-access mission."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "pragmatism",
      slug: "pragmatism",
      title: "Pragmatism",
      authorId: "william-james",
      tradition: "Pragmatism",
      era: "20th Century",
      summary: "James presents pragmatism as a method for clarifying ideas through their practical consequences.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/5116",
        publicationYear: 1907,
        rights: "Public-domain text in the United States; verify local jurisdiction before redistribution.",
        jurisdictionNote: "Import should preserve lecture divisions and source notes for the edition title."
      },
      chapters: [
        {
          id: "pragmatism-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "pragmatism-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "James adds a warmer, experimentally minded modern voice to the library.",
                "The work fits Philo4All because it asks readers to connect philosophical differences to lived consequences."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "genealogy-of-morals",
      slug: "genealogy-of-morals",
      title: "The Genealogy of Morals",
      authorId: "friedrich-nietzsche",
      tradition: "Existentialism",
      era: "19th Century",
      summary: "Nietzsche's historical and psychological critique of moral concepts, guilt, asceticism, and inherited values.",
      readingLength: "Medium",
      source: {
        provider: "Project Gutenberg",
        sourceUrl: "https://www.gutenberg.org/ebooks/52319",
        translator: "Horace B. Samuel",
        publicationYear: 1913,
        rights: "Public-domain translation in the United States; Nietzsche translation provenance must be checked carefully.",
        jurisdictionNote: "Launch import should include translator metadata prominently because Nietzsche editions vary."
      },
      chapters: [
        {
          id: "genealogy-of-morals-preview",
          slug: "reader-preview",
          title: "Reader Preview",
          order: 1,
          estimatedMinutes: 3,
          sections: [
            {
              id: "genealogy-of-morals-preview-1",
              order: 1,
              title: "Why Read This",
              paragraphs: [
                "Genealogy of Morals pairs well with Zarathustra while giving readers a more argumentative Nietzsche text.",
                "Because the work is intense and historically charged, V1 should present clear source notes and avoid flattening it into inspirational snippets."
              ]
            }
          ]
        }
      ]
    }
  ]
};
