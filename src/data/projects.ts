import type { Localized } from "@/i18n/config";

// Jedan projekat = jedan objekat. Odavde čitaju: kartice u chatu, modal sa
// studijom slučaja, stranice /projects/[slug] i AI (kao izvor činjenica).
// Sve što AI zna o projektima, zna odavde, zato ovde pišemo samo proverene stvari.

export type Media = {
  type: "image" | "video";
  src: string; // putanja u public/, npr. "/projects/mems/suggestions.png"
  poster?: string; // za video: slika dok se ne učita
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
};

export type Project = {
  slug: string;
  hidden?: boolean; // true = ne prikazuje se nigde (ni AI ga ne pominje)
  label: Localized; // mala oznaka iznad naslova na kartici
  title: string;
  summary: Localized;
  highlight: Localized; // najjači rezultat, jedna rečenica
  metrics: { value: string; label: Localized }[];
  cover?: { src: string; width: number; height: number; alt: Localized };
  media: Media[];
  problem: Localized;
  approach: Localized[];
  results: Localized[];
  learned: Localized[];
  limitations: Localized[];
  stack: string[];
  links: { github?: string; demo?: string; video?: string };
  demoNote?: Localized; // npr. da se besplatni hosting budi minut
};

export const projects: Project[] = [
  {
    slug: "web-automation",
    label: { en: "Client work · In production", sr: "Rad za klijenta · U upotrebi" },
    title: "Payment entry automation",
    summary: {
      en: "A desktop tool that reads payment lists from PDF reports and enters them into a client's web accounting system. When a name doesn't match the customer database, an ML model decides whether it is safe to fix it automatically or to ask a person.",
      sr: "Desktop alat koji čita spiskove uplata iz PDF izveštaja i unosi ih u klijentov web knjigovodstveni program. Kad se ime ne poklapa sa bazom kupaca, ML model odlučuje da li je bezbedno da ga sam ispravi ili da pita čoveka.",
    },
    highlight: {
      en: "~80 hours of manual typing per month became ~3 hours of supervised, automated entry.",
      sr: "~80 sati ručnog kucanja mesečno svedeno je na ~3 sata nadgledanog automatskog unosa.",
    },
    metrics: [
      { value: "80h → 3h", label: { en: "monthly data entry", sr: "unosa mesečno" } },
      { value: "≥ 0.80", label: { en: "confidence to enter on its own", sr: "sigurnost za samostalan unos" } },
      { value: "84% → 97%", label: { en: "right customer in top 5 after fixing search", sr: "pravi kupac u top 5 posle popravke pretrage" } },
    ],
    cover: {
      src: "/projects/web-automation/confirm-dialog.png",
      width: 1600,
      height: 840,
      alt: { en: "Confirmation dialog over the accounting web app", sr: "Dijalog za potvrdu iznad knjigovodstvenog programa" },
    },
    media: [
      {
        type: "video",
        src: "/projects/web-automation/auto-entry.mp4",
        poster: "/projects/web-automation/auto-entry-poster.png",
        width: 1280,
        height: 560,
        alt: { en: "The bot logs in, opens a payment document and enters rows on its own", sr: "Bot se prijavljuje, otvara dokument uplata i sam unosi redove" },
        caption: {
          en: "The bot logs in, opens a new payment document and enters payments row by row (sped up 1.5×). Only the name in the row being filled is visible; IDs and client data are blurred.",
          sr: "Bot se prijavljuje, otvara novi dokument uplata i unosi red po red (ubrzano 1,5×). Vidi se samo ime u redu koji se popunjava; ID brojevi i podaci klijenta su zamućeni.",
        },
      },
      {
        type: "video",
        src: "/projects/web-automation/correction.mp4",
        poster: "/projects/web-automation/correction-poster.png",
        width: 1280,
        height: 560,
        alt: { en: "The bot replaces a mismatched name with the matched customer", sr: "Bot zamenjuje neusklađeno ime pronađenim kupcem" },
        caption: {
          en: "The PDF says “UD KARLICA ZDRAVKA” (widow format). Autocomplete finds nothing, the model is confident it is “ZDRAVKA KARLICA”, so the bot fixes the name itself and saves the alias for next month.",
          sr: "U PDF-u piše „UD KARLICA ZDRAVKA” (format za udovice). Autocomplete ne nalazi ništa, model je siguran da je to „ZDRAVKA KARLICA”, pa bot sam ispravlja ime i pamti alias za sledeći mesec.",
        },
      },
      {
        type: "image",
        src: "/projects/web-automation/confirm-dialog.png",
        width: 1600,
        height: 840,
        alt: { en: "Confirmation dialog with five ranked candidates", sr: "Dijalog za potvrdu sa pet rangiranih kandidata" },
        caption: {
          en: "When the model isn't sure: every candidate has the same fuzzy score (86), the best one gets 41%, below the 0.80 threshold, so the bot pauses and asks. Names are fictional.",
          sr: "Kad model nije siguran: svi kandidati imaju isti fuzzy skor (86), najbolji dobija 41%, ispod praga 0,80, pa bot staje i pita. Imena su izmišljena.",
        },
      },
      {
        type: "image",
        src: "/projects/web-automation/pdf.png",
        width: 1300,
        height: 919,
        alt: { en: "Monthly PDF report with one row per payment", sr: "Mesečni PDF izveštaj sa jednim redom po uplati" },
        caption: {
          en: "The input: a monthly PDF report in Cyrillic, one row per payment. Names fictional, IDs blurred.",
          sr: "Ulaz: mesečni PDF izveštaj na ćirilici, jedan red po uplati. Imena izmišljena, ID-jevi zamućeni.",
        },
      },
      {
        type: "image",
        src: "/projects/web-automation/heatmap_f1.png",
        width: 960,
        height: 480,
        alt: { en: "F1 heatmap: three feature sets by three models", sr: "F1 toplotna mapa: tri skupa osobina puta tri modela" },
        caption: {
          en: "Three feature sets × three models, 5-fold cross-validation, tracked in MLflow. Embeddings added only +0.4 pp for the best model, so production runs without them.",
          sr: "Tri skupa osobina × tri modela, 5-fold unakrsna validacija, praćeno u MLflow-u. Embeddinzi su najboljem modelu dodali samo +0,4 pp, pa produkcija radi bez njih.",
        },
      },
      {
        type: "image",
        src: "/projects/web-automation/app.png",
        width: 977,
        height: 787,
        alt: { en: "The desktop app: pick a PDF, preview rows, start, pause or stop", sr: "Desktop aplikacija: izbor PDF-a, pregled redova, start, pauza, stop" },
      },
    ],
    problem: {
      en: "Each month the company gets PDF reports with hundreds of payments, and every one was typed into the accounting system by hand. The hard part: names in the PDF and in the system are written differently (swapped first and last name, typos, missing diacritics, “Dj” instead of “Đ”, a widow format with the husband's name and “UD”). Typed as-is, the system's autocomplete finds nothing.",
      sr: "Firma svakog meseca dobija PDF izveštaje sa stotinama uplata, i svaka je ručno kucana u knjigovodstveni program. Teži deo: imena u PDF-u i u programu pišu se drugačije (zamenjeno ime i prezime, greške u kucanju, bez dijakritika, „Dj” umesto „Đ”, format za udovice sa imenom muža i „UD”). Ako se ukuca kako piše, autocomplete ne nađe ništa.",
    },
    approach: [
      {
        en: "PDF extraction with pdfplumber by coordinates, branch read from the header, Cyrillic transliterated to Latin. OCR fallback for scanned PDFs.",
        sr: "Čitanje PDF-a pomoću pdfplumber-a po koordinatama, filijala iz zaglavlja, ćirilica preslovljena u latinicu. OCR rezerva za skenirane PDF-ove.",
      },
      {
        en: "Alias memory in SQLite: every resolved mismatch is stored, so the same name goes straight through next month.",
        sr: "Memorija aliasa u SQLite-u: svako razrešeno neslaganje se pamti, pa isto ime sledećeg meseca prolazi odmah.",
      },
      {
        en: "A Selenium bot types the name; if autocomplete fails, rapidfuzz finds the top 5 of ~5,900 customers (with a tie-break and a branch preference, not a filter).",
        sr: "Selenium bot kuca ime; ako autocomplete ne uspe, rapidfuzz nalazi top 5 od ~5.900 kupaca (uz razrešavanje nerešenih i prednost filijale, ne filter).",
      },
      {
        en: "A Random Forest scores each candidate on 13 similarity features. At ≥ 0.80 the bot enters it on its own; below that, a dialog asks a person with the best candidate preselected.",
        sr: "Random Forest ocenjuje svakog kandidata na 13 osobina sličnosti. Na ≥ 0,80 bot sam unosi; ispod toga dijalog pita čoveka, sa najboljim kandidatom unapred izabranim.",
      },
      {
        en: "Feedback loop: every decision is saved with its source (automatic, confirmed, manual) and becomes labelled data.",
        sr: "Povratna sprega: svaka odluka se čuva sa izvorom (automatski, potvrđeno, ručno) i postaje označen podatak.",
      },
    ],
    results: [
      {
        en: "Monthly entry dropped from ~80 hours of typing to ~3 hours; people only handle the uncertain matches.",
        sr: "Mesečni unos pao je sa ~80 sati kucanja na ~3 sata; ljudi rešavaju samo nesigurna uparivanja.",
      },
      {
        en: "Built training data from scratch: 116 hand-labelled pairs → 503 rows with easy, hard and random negatives. Production model F1 0.949 in cross-validation.",
        sr: "Podatke za treniranje napravila sam od nule: 116 ručno označenih parova → 503 reda sa lakim, teškim i nasumičnim negativnim primerima. Produkcijski model F1 0,949 u unakrsnoj validaciji.",
      },
      {
        en: "Fixing candidate search raised “right customer in top 5” from 144/172 (84%) to 162/167; the remaining misses are different-surname cases only a human can resolve.",
        sr: "Popravka pretrage kandidata podigla je „pravi kupac u top 5” sa 144/172 (84%) na 162/167; preostali promašaji su slučajevi sa drugim prezimenom koje može da reši samo čovek.",
      },
    ],
    learned: [
      {
        en: "A baseline humbled the model: plain fuzzy top-1 ranks as well (113/116). The model's real value is the confidence score that decides when it's safe to act alone.",
        sr: "Baseline je spustio model na zemlju: obični fuzzy top-1 rangira jednako dobro (113/116). Prava vrednost modela je skor sigurnosti koji odlučuje kada je bezbedno da radi sam.",
      },
      {
        en: "The real bottleneck was search, not ML: the scraper stopped at 43 of 60 pages, so 16 customers simply weren't in the list.",
        sr: "Pravo usko grlo bila je pretraga, ne ML: scraper je stajao na 43 od 60 strana, pa 16 kupaca jednostavno nije bilo na spisku.",
      },
      {
        en: "When the model confidently disagreed with my labels, it was right three times; I fixed the labels. Branch mapping was wrong for 18% of customers until I rewrote it.",
        sr: "Kad se model sigurno nije slagao sa mojim oznakama, tri puta je bio u pravu; ispravila sam oznake. Mapiranje filijala bilo je pogrešno za 18% kupaca dok ga nisam prepisala.",
      },
    ],
    limitations: [
      {
        en: "Small hand-labelled dataset: model differences are a few examples, indicative rather than conclusive.",
        sr: "Mali ručno označen skup: razlike između modela su par primera, okvirne a ne konačne.",
      },
      {
        en: "Tailored to one company's PDF layout and web app; the repository is a case study and contains no client data.",
        sr: "Prilagođeno PDF formatu i aplikaciji jedne firme; repozitorijum je studija slučaja i ne sadrži podatke klijenta.",
      },
    ],
    stack: ["Python", "Selenium", "pdfplumber", "rapidfuzz", "scikit-learn", "XGBoost", "MLflow", "SQLite", "Tkinter", "pytest"],
    links: { github: "https://github.com/m4r1n4181/web-automation" },
  },
  {
    slug: "mems-influencer-recommender",
    label: { en: "Machine learning · Full-stack", sr: "Mašinsko učenje · Full-stack" },
    title: "MEMS: AI influencer matching",
    summary: {
      en: "A marketing agency app where machine learning picks the Instagram creators a brand should work with, explains why, and drafts the outreach e-mail.",
      sr: "Aplikacija za marketinšku agenciju u kojoj mašinsko učenje bira Instagram kreatore sa kojima brend treba da sarađuje, objašnjava zašto i piše nacrt e-maila.",
    },
    highlight: {
      en: "Finds 27.6% of each brand's real new partners in its top 50, +29% over the best heuristic, on a held-out future period.",
      sr: "Pronalazi 27,6% stvarnih novih partnera svakog brenda u top 50, +29% u odnosu na najbolju heuristiku, na izdvojenom budućem periodu.",
    },
    metrics: [
      { value: "1.6M", label: { en: "Instagram posts", sr: "Instagram objava" } },
      { value: "0.276", label: { en: "Recall@50, test period", sr: "Recall@50, test period" } },
      { value: "+29%", label: { en: "over the best heuristic", sr: "u odnosu na heuristiku" } },
    ],
    cover: {
      src: "/projects/mems/suggestions.png",
      width: 2880,
      height: 1800,
      alt: { en: "Ranked creator suggestions with reasons", sr: "Rangirani predlozi kreatora sa razlozima" },
    },
    media: [
      {
        type: "video",
        src: "/projects/mems/demo-find-creators.mp4",
        poster: "/projects/mems/demo-find-creators-poster.png",
        width: 960,
        height: 600,
        alt: { en: "Finding creators for a campaign", sr: "Pronalaženje kreatora za kampanju" },
        caption: {
          en: "Finding creators for a campaign: ranked suggestions with reasons, a creator profile, selecting a creator.",
          sr: "Pronalaženje kreatora za kampanju: rangirani predlozi sa razlozima, profil kreatora, izbor.",
        },
      },
      {
        type: "image",
        src: "/projects/mems/test-results.png",
        width: 1600,
        height: 720,
        alt: { en: "Recall at 10, 50 and 100: model vs heuristic vs brand kNN", sr: "Recall na 10, 50 i 100: model, heuristika i brand kNN" },
        caption: {
          en: "Test window used once, at the end. Walk-forward validation gives +21% and +23% in earlier periods, so the gain isn't a lucky window.",
          sr: "Test period korišćen je jednom, na kraju. Walk-forward validacija daje +21% i +23% u ranijim periodima, pa dobitak nije srećan slučaj.",
        },
      },
      {
        type: "image",
        src: "/projects/mems/ai-email.png",
        width: 1918,
        height: 899,
        alt: { en: "Outreach e-mail drafted by the LLM with the faithfulness check", sr: "E-mail koji je napisao LLM, sa proverom vernosti" },
        caption: {
          en: "The LLM only rewrites facts the app holds; code checks every draft for invented numbers, handles or placeholders before a person reviews it.",
          sr: "LLM samo preformuliše činjenice koje aplikacija ima; kod proverava svaki nacrt na izmišljene brojeve, @handle-ove i placeholdere pre nego što ga čovek pregleda.",
        },
      },
      {
        type: "video",
        src: "/projects/mems/demo-new-brand.mp4",
        poster: "/projects/mems/demo-new-brand-poster.png",
        width: 960,
        height: 600,
        alt: { en: "Adding a new brand with similar brands", sr: "Dodavanje novog brenda preko sličnih brendova" },
        caption: {
          en: "Cold start: a new brand is described by up to five similar brands; their rankings are merged with reciprocal rank fusion.",
          sr: "Cold start: novi brend se opisuje sa do pet sličnih brendova; njihova rangiranja spajaju se reciprocal rank fusion metodom.",
        },
      },
      {
        type: "image",
        src: "/projects/mems/cold-start.png",
        width: 1600,
        height: 640,
        alt: { en: "Cold-start simulation results", sr: "Rezultati simulacije cold starta" },
        caption: {
          en: "Fusion works (8× random), but cold start costs ~80% of the quality, and the app tells the user so.",
          sr: "Spajanje radi (8× bolje od nasumičnog), ali cold start košta ~80% kvaliteta, i aplikacija to kaže korisniku.",
        },
      },
    ],
    problem: {
      en: "A brand can contact a few dozen of ~35,000 creators. Which ones? I framed it as ranking with a time split: learn only from the past, then check who actually started a new paid collaboration after the cutoff. Random splits would leak the future into training.",
      sr: "Brend može da kontaktira nekoliko desetina od ~35.000 kreatora. Koje? Postavila sam to kao rangiranje sa vremenskom podelom: uči se samo iz prošlosti, pa se proverava ko je zaista započeo novu plaćenu saradnju posle granice. Nasumična podela bi provukla budućnost u treniranje.",
    },
    approach: [
      {
        en: "Two-stage recommender: five candidate sources (organic mentions, brand kNN, niche pool, SVD and a LightGCN graph neural network in PyTorch) narrow 35K creators to ~1,100 per brand.",
        sr: "Dvostepeni recommender: pet izvora kandidata (organska pominjanja, brand kNN, niša, SVD i LightGCN grafovska neuronska mreža u PyTorchu) sužavaju 35K kreatora na ~1.100 po brendu.",
      },
      {
        en: "A LightGBM LambdaRank model orders candidates on 25 features, with human-readable reasons shown in the app.",
        sr: "LightGBM LambdaRank model ređa kandidate na 25 osobina, sa razlozima čitljivim za ljude u aplikaciji.",
      },
      {
        en: "Served by a FastAPI microservice to an ASP.NET Core API and React client; runs with docker compose up.",
        sr: "Servira ga FastAPI mikroservis za ASP.NET Core API i React klijent; pokreće se sa docker compose up.",
      },
    ],
    results: [
      {
        en: "Recall@50 0.276 vs 0.214 for the best heuristic; LightGCN was the biggest single improvement, mostly for brands with little history.",
        sr: "Recall@50 0,276 naspram 0,214 za najbolju heuristiku; LightGCN je doneo najveće pojedinačno poboljšanje, najviše za brendove sa malo istorije.",
      },
    ],
    learned: [
      {
        en: "Error analysis: my first guess explained under 5% of misses. Reading 50 misses by hand found what counts didn't.",
        sr: "Analiza grešaka: moja prva pretpostavka objasnila je manje od 5% promašaja. Ručno čitanje 50 promašaja otkrilo je ono što brojanje nije.",
      },
      {
        en: "Niches help people (filters, explanations) far more than ranking: removing them kept Recall@50 with 18% fewer candidates.",
        sr: "Niše pomažu ljudima (filteri, objašnjenja) mnogo više nego rangiranju: bez njih Recall@50 ostaje isti uz 18% manje kandidata.",
      },
    ],
    limitations: [
      {
        en: "Offline evaluation only; data from 2017–2019. The app already records accepted and declined creators, the labels a future A/B test needs.",
        sr: "Samo offline evaluacija; podaci iz 2017–2019. Aplikacija već beleži prihvaćene i odbijene kreatore, oznake koje trebaju budućem A/B testu.",
      },
    ],
    stack: ["PyTorch", "LightGBM", "scikit-learn", "MLflow", "FastAPI", "ASP.NET Core", "React", "TypeScript", "PostgreSQL", "Docker"],
    links: { github: "https://github.com/m4r1n4181/mems-media-ai" },
  },
  {
    slug: "rag-ml-course-assistant",
    label: { en: "RAG · Evaluation", sr: "RAG · Evaluacija" },
    title: "ML course assistant",
    summary: {
      en: "A study assistant in Serbian that answers only from the course slides and textbook, cites every source and shows the original slide. Every design choice was tested on 72 official exam questions.",
      sr: "Asistent za učenje na srpskom koji odgovara samo iz slajdova i udžbenika, citira svaki izvor i prikazuje originalni slajd. Svaka odluka testirana je na 72 zvanična ispitna pitanja.",
    },
    highlight: {
      en: "On a held-out test set, answer completeness rose from 0.46 to 0.65 and MRR from 0.71 to 0.94.",
      sr: "Na izdvojenom test skupu potpunost odgovora porasla je sa 0,46 na 0,65, a MRR sa 0,71 na 0,94.",
    },
    metrics: [
      { value: "0.42 → 0.59", label: { en: "Recall@10", sr: "Recall@10" } },
      { value: "0.71 → 0.94", label: { en: "MRR", sr: "MRR" } },
      { value: "0.46 → 0.65", label: { en: "answer completeness", sr: "potpunost odgovora" } },
    ],
    media: [
      {
        type: "image",
        src: "/projects/rag-ml/results.png",
        width: 1800,
        height: 840,
        alt: { en: "Before and after metrics on the held-out test set", sr: "Metrike pre i posle na izdvojenom test skupu" },
        caption: {
          en: "All decisions were made on a 24-question dev split; the 48-question test split was used once for these numbers.",
          sr: "Sve odluke donete su na dev skupu od 24 pitanja; test skup od 48 pitanja korišćen je jednom, za ove brojeve.",
        },
      },
    ],
    problem: {
      en: "Students need answers grounded in their own course material, in Serbian, with sources they can check. The original version answered the very question that started the project with “not in the materials”.",
      sr: "Studentima trebaju odgovori iz njihovog gradiva, na srpskom, sa izvorima koje mogu da provere. Prva verzija je na pitanje kojim je projekat počeo odgovorila „nije u materijalima”.",
    },
    approach: [
      {
        en: "One slide per chunk, textbook in 800-character chunks, and a “lecture | slide title” header on every chunk, because a slide titled “Lasso” never says “regularization”.",
        sr: "Jedan slajd po delu, udžbenik u delovima od 800 karaktera, i zaglavlje „predavanje | naslov slajda” na svakom delu, jer slajd „Lasso” nigde ne kaže „regularizacija”.",
      },
      {
        en: "Multilingual e5 embeddings in ChromaDB, follow-up questions rewritten before search, Claude Haiku answers only from retrieved context.",
        sr: "Višejezični e5 embeddinzi u ChromaDB-u, dodatna pitanja se preformulišu pre pretrage, Claude Haiku odgovara samo iz pronađenog konteksta.",
      },
      {
        en: "Relevance labels built by pooling, as in TREC: 2,062 graded judgments. An LLM judge for completeness and faithfulness, compared with a human on 15 answers.",
        sr: "Oznake relevantnosti napravljene pooling metodom, kao u TREC-u: 2.062 ocene. LLM sudija za potpunost i vernost, upoređen sa čovekom na 15 odgovora.",
      },
    ],
    results: [
      {
        en: "Recall@10 0.42 → 0.59, MRR 0.71 → 0.94, completeness 0.46 → 0.65, faithfulness 0.81 → 0.87 on the held-out test set.",
        sr: "Recall@10 0,42 → 0,59, MRR 0,71 → 0,94, potpunost 0,46 → 0,65, vernost 0,81 → 0,87 na izdvojenom test skupu.",
      },
      {
        en: "Live public demo, CI with unit tests, Docker image; LLM evaluation costs are cached and capped.",
        sr: "Javni live demo, CI sa testovima, Docker image; troškovi LLM evaluacije su keširani i ograničeni.",
      },
    ],
    learned: [
      {
        en: "A crude first metric said BM25 hurts; slide-level labels showed it doesn't. That's why the evaluation was rebuilt.",
        sr: "Gruba prva metrika je govorila da BM25 šteti; oznake na nivou slajda pokazale su da ne šteti. Zato je evaluacija napravljena iznova.",
      },
      {
        en: "The judge itself had a bug: it couldn't see source labels, so every citation looked invented.",
        sr: "I sam sudija je imao bag: nije video oznake izvora, pa je svaki citat izgledao izmišljeno.",
      },
      {
        en: "The textbook PDF had ~4,300 broken characters (“č” as “ˇc”); fixed in the loader and covered by tests.",
        sr: "PDF udžbenika imao je ~4.300 pokvarenih karaktera („č” kao „ˇc”); ispravljeno u loaderu i pokriveno testovima.",
      },
    ],
    limitations: [
      {
        en: "About 40% of useful material still doesn't reach the model; 48 test questions is a small sample.",
        sr: "Oko 40% korisnog materijala i dalje ne stiže do modela; 48 test pitanja je mali uzorak.",
      },
    ],
    stack: ["Python", "ChromaDB", "multilingual-e5", "Claude Haiku", "BM25", "Streamlit", "pytest", "Docker", "GitHub Actions"],
    links: {
      github: "https://github.com/m4r1n4181/rag_ml",
      demo: "https://ml-course-assistant.streamlit.app/",
    },
    demoNote: {
      en: "Free hosting: if the demo has been idle, it takes about a minute to wake up.",
      sr: "Besplatan hosting: ako demo nije korišćen, budi se oko minut.",
    },
  },
  {
    slug: "endokrina",
    label: { en: "Health tech · Full-stack", sr: "Zdravstvo · Full-stack" },
    title: "Endokrina: thyroid pre-visit platform",
    summary: {
      en: "Patients prepare for a thyroid appointment from a secure link: identity check, a structured questionnaire and lab uploads. Doctors get a read-only clinical context; reception manages appointments and never sees clinical content.",
      sr: "Pacijenti se pripremaju za pregled štitne žlezde preko sigurnog linka: provera identiteta, strukturisan upitnik i slanje nalaza. Lekari dobijaju pregled bez izmena; recepcija upravlja terminima i nikad ne vidi klinički sadržaj.",
    },
    highlight: {
      en: "Built like a health product: access enforced on the server, an append-only audit log, and no AI in clinical summaries.",
      sr: "Napravljeno kao zdravstveni proizvod: pristup kontroliše server, audit log se ne briše, i nema AI-ja u kliničkim sažecima.",
    },
    metrics: [
      { value: "3 roles", label: { en: "access enforced server-side", sr: "pristup kontroliše server" } },
      { value: "MFA + OTP", label: { en: "staff and patient sign-in", sr: "prijava osoblja i pacijenata" } },
      { value: "CI", label: { en: "typecheck, build, tests on every push", sr: "tipovi, build, testovi na svaki push" } },
    ],
    media: [],
    problem: {
      en: "Thyroid appointments lose time collecting history and lab results. The clinic needed patients to prepare beforehand, without reception staff ever seeing clinical data.",
      sr: "Na pregledima štitne žlezde gubi se vreme na prikupljanje istorije i nalaza. Klinici je trebalo da se pacijenti pripreme unapred, a da recepcija nikad ne vidi kliničke podatke.",
    },
    approach: [
      {
        en: "Patients verify with a magic link, date of birth and an e-mail code, then fill a config-driven questionnaire and upload results to encrypted S3 storage.",
        sr: "Pacijenti se potvrđuju magic linkom, datumom rođenja i kodom na e-mail, pa popunjavaju upitnik definisan konfiguracijom i šalju nalaze u enkriptovani S3.",
      },
      {
        en: "Doctors get deterministic, template-based summaries (never diagnoses or therapy advice) and a morning briefing e-mail.",
        sr: "Lekari dobijaju determinističke sažetke iz šablona (nikad dijagnoze ni preporuke terapije) i jutarnji pregled na e-mail.",
      },
      {
        en: "Role-based access returns HTTP 403 on clinical endpoints for admin and reception, not just hidden UI; every access to clinical content is logged.",
        sr: "Pristup po ulogama vraća HTTP 403 na kliničkim endpointima za admina i recepciju, ne samo sakriven UI; svaki pristup kliničkom sadržaju se beleži.",
      },
    ],
    results: [
      {
        en: "One Docker image on Azure Container Apps with Azure PostgreSQL and S3 documents; migrations run from CI, never automatically.",
        sr: "Jedan Docker image na Azure Container Apps sa Azure PostgreSQL-om i dokumentima na S3; migracije se pokreću iz CI-ja, nikad automatski.",
      },
      {
        en: "Tests cover MFA, tampered and expired links, upload limits, timezone and DST edge cases in the morning briefing.",
        sr: "Testovi pokrivaju MFA, izmenjene i istekle linkove, ograničenja upload-a, vremenske zone i prelazak na letnje vreme u jutarnjem pregledu.",
      },
    ],
    learned: [],
    limitations: [],
    stack: ["TypeScript", "Express", "React", "PostgreSQL", "Drizzle", "Zod", "AWS S3", "Azure", "Docker", "Vitest"],
    links: { github: "https://github.com/m4r1n4181/endokrina-app" }, // TODO: dodaj demo: "https://..." (Azure)
  },
  {
    // Sakriveno: validaciona tačnost u notebooku je ~11,8% (ispod nasumičnih 14% za 7 klasa),
    // iako je trening ~90%. Najverovatnije DataLoader bez shuffle=True. Popravi pa stavi hidden: false.
    slug: "face-emotion-recognition",
    hidden: true,
    label: { en: "Computer vision", sr: "Računarski vid" },
    title: "Face emotion recognition",
    summary: {
      en: "Classifies seven facial emotions with a fine-tuned EfficientNet in PyTorch.",
      sr: "Prepoznaje sedam emocija sa lica pomoću dotrenirane EfficientNet mreže u PyTorchu.",
    },
    highlight: { en: "Transfer learning for 7-class emotion classification.", sr: "Transfer learning za 7 klasa emocija." },
    metrics: [],
    media: [],
    problem: { en: "Recognise seven emotions from a face image.", sr: "Prepoznati sedam emocija sa slike lica." },
    approach: [],
    results: [],
    learned: [],
    limitations: [],
    stack: ["PyTorch", "EfficientNet", "timm"],
    links: { github: "https://github.com/m4r1n4181/FaceEmotionRecognition" },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);
export const getProject = (slug: string) => visibleProjects.find((p) => p.slug === slug);
