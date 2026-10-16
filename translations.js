/**
 * Multilingual Translations Dictionary
 * Languages: English (en), Russian (ru), Uzbek (uz)
 */

const translations = {
    en: {
        appName: "Vocabulary Activator",
        tagline: "Bridge the gap between passive recognition and active fluency",
        navDashboard: "Dashboard",
        navVocab: "Vocabulary Bank",
        navStats: "Statistics",
        navInstructions: "Instructions & Guide",
        navSettings: "Settings",

        // Main Dashboard
        dailyGoalTitle: "Today's Activation Goal",
        wordsDueToday: "Words ready for activation today",
        wordsAddedToday: "Words added today",
        maxLimitBadge: "Max 10 / day",
        btnActivateVocab: "Activate Vocabulary",
        btnPracticeNow: "Start Review Session",
        btnEarlyPractice: "Practice Ahead (Early Review)",
        btnAddChunk: "+ Add Phrase or Word",
        quickStatsTitle: "At a Glance",
        passiveCountLabel: "Passive Chunks",
        activeCountLabel: "Fully Activated",
        daysPracticedLabel: "Days Practiced",
        allCaughtUpTitle: "All Caught Up For Today!",
        allCaughtUpDesc: "You have reviewed all due words. Words you save appear for review every 2 to 3 days. No pileups, no pressure!",
        noWordsYetTitle: "Your Vocabulary Bank is Empty",
        noWordsYetDesc: "Add up to 10 phrases, idioms, collocations, or words in Russian/English to start activating them.",

        // Add Modal
        modalAddTitle: "Add Language Chunk",
        modalAddSubtitle: "Add idioms, collocations, phrases or words with your custom definition",
        labelPhrase: "Word, Phrase, or Idiom",
        placeholderPhrase: "e.g., come in handy / cut corners / с глазу на глаз",
        labelDefinition: "Definition & Personal Memory Hook",
        placeholderDefinition: "Write the meaning in your own words (in Russian or your native language) to anchor it...",
        labelCategory: "Type (Optional)",
        typeCollocation: "Collocation / Chunk",
        typeIdiom: "Idiom",
        typePhrasal: "Phrasal Verb",
        typeWord: "Single Word",
        typeGrammar: "Sentence Pattern",
        btnSaveChunk: "Save to Passive Vocabulary",
        btnCancel: "Cancel",
        dailyLimitNotice: "Daily Limit: You can save up to 10 items per day (current: {current}/10). Recommended by cognitive science to prevent overload.",
        errorLimitReached: "Daily limit of 10 words reached! Quality matters more than quantity. Return tomorrow to add more.",
        savedSuccess: "Saved to your passive vocabulary bank!",

        // Review Session
        reviewTitle: "Vocabulary Activation Session",
        cardCounter: "Card {current} of {total}",
        contextHeading: "Context in Action",
        contextLoading: "Generating rich contextual sentences...",
        definitionReveal: "Show Definition & Notes",
        definitionHide: "Hide Definition & Notes",
        ratingInstruction: "Choose your level of recall for this chunk:",
        rate1Title: "1 - Do Not Recognize",
        rate1Desc: "Completely forgotten or cannot recall meaning",
        rate2Title: "2 - Recognize a Bit",
        rate2Desc: "Looks familiar, but meaning is unclear",
        rate3Title: "3 - Know Meaning, Can't Use",
        rate3Desc: "Passive only; cannot produce it fluently in speech",
        rate4Title: "4 - Can Use, Want Practice",
        rate4Desc: "Getting comfortable, but want an extra repetition",
        rate5Title: "5 - Fully Activated!",
        rate5Desc: "Instant, natural mastery! (Rate 5 twice to graduate)",
        timesRatedFive: "Achieved Level 5: {count}/2 times",
        promotedToActiveToast: "🎉 Congratulations! This phrase is now officially part of your Active Vocabulary!",

        // Celebration Modal
        congratsTitle: "Session Completed! 🎉",
        congratsSubtitle: "Great job! You have completed today's activation batch.",
        congratsReviewedCount: "Words Reviewed",
        congratsPromotedCount: "Graduated to Active",
        congratsStreak: "Days Practiced",
        congratsMotivational: "Consistent daily activation builds effortless active fluency. See you in the next session!",
        btnCloseCongrats: "Continue to Dashboard",

        // Statistics
        statsTitle: "Learning Statistics",
        statsDailyTab: "Daily Statistics",
        statsOverallTab: "Overall Statistics",
        statDueToday: "Words Due Today",
        statCompletedToday: "Reviewed Today",
        statAddedToday: "Added Today",
        statDailyBreakdown: "Today's Review Results",
        statFullyActivated: "Fully Activated (5)",
        statMediumActivated: "Strengthened (2-4)",
        statNotRecognized: "Need Attention (1)",
        statTotalPassive: "Total Passive Chunks",
        statTotalActive: "Total Active Chunks",
        statTotalAll: "Total Words in Bank",
        statActiveRatio: "Activation Mastery Rate",
        statPracticeDays: "Total Practice Days",
        statAntiPileupNotice: "🛡️ Anti-Pileup Protection Active: If you miss a day, only 1 batch of up to 10 words is queued. You will never face a pileup chore!",

        // Instructions
        instructionsTitle: "Why Vocabulary Activator Was Created",
        instructionIntroTitle: "The Science of Passive vs. Active Vocabulary",
        instructionIntroBody: "Most language learners face the same frustrating barrier: they understand movies, books, and podcasts easily (passive vocabulary), but when it's time to speak or write, the words simply do not come (active vocabulary).\n\nVocabulary Activator was engineered specifically to solve this problem through contextual retrieval and spaced activation.",
        instructionLimitTitle: "Why the Strict 10-Word Daily Limit?",
        instructionLimitBody: "Psycholinguistic research shows that the human working memory can only deeply assimilate 5 to 10 new language chunks per day.\n\nAdding 40 or 50 words creates cognitive overload and shallow familiarity without genuine activation. At 10 words a day, you activate up to 300 rich phrases a month—enough to completely transform your spoken fluency without burning out.",
        instructionSpacingTitle: "The 2 to 3 Day Spaced Activation Cycle",
        instructionSpacingBody: "Words you save do not appear immediately. They appear 2 to 3 days later, right when your brain begins to let go of the memory trace. Retrieving the phrase at this critical threshold strengthens the neural pathways necessary for spontaneous speech.",
        instructionAntiPileupTitle: "The Anti-Anki Pileup Guarantee",
        instructionAntiPileupBody: "In conventional apps, missing a few days results in an overwhelming mountain of 50 to 100 cards, creating anxiety and guilt. In Vocabulary Activator, sessions are strictly capped at 10 items. If you missed Monday, you will only see Monday's 10 words when you return. No guilt, no chores—just steady, calm progress.",
        instructionScaleTitle: "The 1 to 5 Activation Scale Explained",
        instructionScale1: "<strong>1 - Do Not Recognize:</strong> You have no recollection of this phrase. It will cycle back soon with fresh context.",
        instructionScale2: "<strong>2 - Recognize a Bit:</strong> The word looks vaguely familiar, but you cannot deduce its meaning without the definition.",
        instructionScale3: "<strong>3 - Know Meaning, Cannot Use:</strong> You understand it passively when reading, but cannot formulate your own sentence using it spontaneously.",
        instructionScale4: "<strong>4 - Can Use, Want Extra Practice:</strong> You feel you can use it, but want one more round of practice to feel 100% confident.",
        instructionScale5: "<strong>5 - Fully Activated:</strong> The chunk has become second nature. You can produce it immediately without hesitating.",
        instructionGraduationRule: "<strong>The 2x Graduation Rule:</strong> When you rate a word '5' twice across distinct sessions, it is permanently promoted to your Active Vocabulary and retires from review sessions.",

        // Settings
        settingsTitle: "Settings & Preferences",
        settingLanguage: "Interface Language",
        settingTheme: "Color Theme",
        themeLight: "Light Theme",
        themeDark: "Dark Theme",
        settingSound: "Sound Effects",
        soundOn: "Enabled (Clicks & Celebrations)",
        soundOff: "Muted",
        settingAiTitle: "Context Sentences Engine",
        settingAiDesc: "Context sentences provide natural 2-3 sentence stories for each word. You can use the built-in offline smart generator, or connect an OpenAI API key for live context creation.",
        labelApiKey: "OpenAI API Key (Optional)",
        placeholderApiKey: "sk-...",
        apiKeyHint: "Stored only in your browser's private localStorage. Never sent to any external server except OpenAI.",
        labelAiModel: "AI Model",
        btnSaveSettings: "Save Settings",
        btnResetData: "Reset All Learning Data",
        confirmReset: "Are you sure you want to reset all vocabulary and statistics? This cannot be undone.",

        // Vocabulary Bank Table
        vocabBankTitle: "Your Vocabulary Bank",
        filterAll: "All ({count})",
        filterPassive: "Passive ({count})",
        filterActive: "Active ({count})",
        searchPlaceholder: "Search words or definitions...",
        tableColPhrase: "Language Chunk",
        tableColDefinition: "Definition / Note",
        tableColStatus: "Status",
        tableColStage: "Stage (5s: {stage}/2)",
        tableColNextDue: "Next Activation",
        tableColActions: "Actions",
        statusActiveBadge: "Active",
        statusPassiveBadge: "Passive",
        deleteConfirm: "Delete this chunk from your bank?",
        noItemsFound: "No vocabulary chunks found.",

        // Common
        loading: "Loading...",
        ready: "Ready",
        close: "Close"
    },

    ru: {
        appName: "Vocabulary Activator",
        tagline: "Превратите пассивный словарный запас в свободную активную речь",
        navDashboard: "Главная",
        navVocab: "Банк фраз",
        navStats: "Статистика",
        navInstructions: "Инструкция",
        navSettings: "Настройки",

        // Main Dashboard
        dailyGoalTitle: "Цель активации на сегодня",
        wordsDueToday: "Фраз готово к активации сегодня",
        wordsAddedToday: "Фраз добавлено сегодня",
        maxLimitBadge: "Максимум 10 в день",
        btnActivateVocab: "Активировать словарь",
        btnPracticeNow: "Начать сессию активации",
        btnEarlyPractice: "Повторить заранее",
        btnAddChunk: "+ Добавить фразу или слово",
        quickStatsTitle: "Краткий обзор",
        passiveCountLabel: "В пассивном запасе",
        activeCountLabel: "Полностью активных",
        daysPracticedLabel: "Дней практики",
        allCaughtUpTitle: "На сегодня всё пройдено!",
        allCaughtUpDesc: "Вы активировали все запланированные фразы. Новые слова появляются для повторения каждые 2–3 дня. Никаких завалов и стресса!",
        noWordsYetTitle: "Ваш банк фраз пока пуст",
        noWordsYetDesc: "Добавьте до 10 выражений, идиом или коллокаций с переводом или определением, чтобы начать процесс их активации.",

        // Add Modal
        modalAddTitle: "Добавить языковой чанк",
        modalAddSubtitle: "Сохраняйте идиомы, коллокации и фразы со своим понятным определением",
        labelPhrase: "Слово, фраза или идиома",
        placeholderPhrase: "например: come in handy / cut corners / с глазу на глаз",
        labelDefinition: "Определение и личная ассоциация",
        placeholderDefinition: "Напишите значение своими словами (на русском или родном языке), чтобы прочно закрепить образ...",
        labelCategory: "Категория (необязательно)",
        typeCollocation: "Коллокация / Фраза",
        typeIdiom: "Идиома",
        typePhrasal: "Фразовый глагол",
        typeWord: "Одиночное слово",
        typeGrammar: "Грамматический паттерн",
        btnSaveChunk: "Сохранить в пассивный словарь",
        btnCancel: "Отмена",
        dailyLimitNotice: "Дневной лимит: максимум 10 фраз в день (сейчас: {current}/10). Это научно доказанный оптимум для глубокого усвоения.",
        errorLimitReached: "Достигнут лимит 10 фраз на сегодня! Качество важнее количества. Возвращайтесь завтра за следующей порцией.",
        savedSuccess: "Успешно сохранено в ваш пассивный словарь!",

        // Review Session
        reviewTitle: "Сессия активации словаря",
        cardCounter: "Карточка {current} из {total}",
        contextHeading: "Фраза в живом контексте",
        contextLoading: "Создание контекстных предложений...",
        definitionReveal: "Показать значение и заметку",
        definitionHide: "Скрыть значение",
        ratingInstruction: "Оцените степень узнавания и готовности использовать эту фразу:",
        rate1Title: "1 - Не узнаю",
        rate1Desc: "Совсем забыл или не понимаю значения",
        rate2Title: "2 - Смутно узнаю",
        rate2Desc: "Кажется знакомым, но точный смысл неясен",
        rate3Title: "3 - Помню значение, но не использую",
        rate3Desc: "Понимаю пассивно, но пока не могу применить в разговоре",
        rate4Title: "4 - Могу использовать, нужно закрепить",
        rate4Desc: "Почти в активе, но хочется еще разок попрактиковать",
        rate5Title: "5 - Полностью активировано!",
        rate5Desc: "Мгновенное знание! (Поставьте «5» дважды, чтобы перевести в актив)",
        timesRatedFive: "Оценка 5 получена: {count}/2 раз",
        promotedToActiveToast: "🎉 Поздравляем! Эта фраза официально перешла в ваш Активный Словарный Запас!",

        // Celebration Modal
        congratsTitle: "Сессия успешно завершена! 🎉",
        congratsSubtitle: "Превосходная работа! Вы активировали сегодняшнюю порцию выражений.",
        congratsReviewedCount: "Повторено фраз",
        congratsPromotedCount: "Переведено в актив",
        congratsStreak: "Дней практики",
        congratsMotivational: "Регулярность — главный секрет беглой речи. Ждём вас на следующей сессии!",
        btnCloseCongrats: "Вернуться на главную",

        // Statistics
        statsTitle: "Статистика обучения",
        statsDailyTab: "Статистика за сегодня",
        statsOverallTab: "Общая статистика",
        statDueToday: "Готово к повторению",
        statCompletedToday: "Повторено сегодня",
        statAddedToday: "Добавлено сегодня",
        statDailyBreakdown: "Результаты сегодняшней сессии",
        statFullyActivated: "Полностью активных (5)",
        statMediumActivated: "Закреплено (2-4)",
        statNotRecognized: "Требуют внимания (1)",
        statTotalPassive: "Всего в пассивном запасе",
        statTotalActive: "Всего в активном запасе",
        statTotalAll: "Всего фраз в банке",
        statActiveRatio: "Процент активации",
        statPracticeDays: "Всего дней практики",
        statAntiPileupNotice: "🛡️ Защита от завалов включена: если вы пропустите день, вас не завалит сотней карточек. Всегда доступна ровно 1 порция до 10 слов!",

        // Instructions
        instructionsTitle: "Зачем был создан Vocabulary Activator",
        instructionIntroTitle: "Психолингвистика: пассивный и активный словарный запас",
        instructionIntroBody: "Большинство изучающих язык сталкиваются с обидной проблемой: они прекрасно понимают книги, фильмы и сериалы (пассивный запас), но когда нужно заговорить самому — нужные выражения словно испаряются.\n\nVocabulary Activator создан именно для того, чтобы превратить понимаемые слова в спонтанно используемые с помощью контекстного извлечения.",
        instructionLimitTitle: "Почему лимит строго 10 фраз в день?",
        instructionLimitBody: "Исследования памяти показывают, что человеческий мозг способен глубоко усвоить и закрепить не более 5–10 устойчивых выражений в сутки.\n\nДобавление по 40–50 слов перегружает рабочую память и создаёт иллюзию знания. При 10 фразах в день вы уверенно активируете до 300 выражений в месяц — этого достаточно для качественного прорыва в речи без выгорания.",
        instructionSpacingTitle: "Интервал повторений 2–3 дня",
        instructionSpacingBody: "Сохранённые фразы не появляются для проверки сразу. Они возвращаются через 2–3 дня — в момент, когда мозг начинает забывать след памяти. Воспроизведение именно в эту фазу строит прочные нейронные связи.",
        instructionAntiPileupTitle: "Правило защиты от снежного кома (в отличие от Anki)",
        instructionAntiPileupBody: "В обычных приложениях пропуск 2–3 дней превращается в кошмар из 80–150 карточек, вызывая чувство вины и отторжение. В Vocabulary Activator порция ВСЕГДА ограничена 10 словами. Если вы пропустили понедельник, во вторник вы увидите только 10 слов пропущенного дня. Никаких долгов и стресса!",
        instructionScaleTitle: "Значение кнопок от 1 до 5",
        instructionScale1: "<strong>1 - Не узнаю:</strong> Фраза полностью стерлась из памяти. Она скоро вернется с новым контекстом.",
        instructionScale2: "<strong>2 - Смутно узнаю:</strong> Выражение кажется знакомым, но без подсказки вспомнить смысл невозможно.",
        instructionScale3: "<strong>3 - Помню значение, но не использую:</strong> Пассивное понимание есть, но построить фразу в реальном диалоге пока тяжело.",
        instructionScale4: "<strong>4 - Могу использовать, нужно закрепить:</strong> Почти активно, требуется еще одно контрольное повторение для уверенности.",
        instructionScale5: "<strong>5 - Полностью активировано:</strong> Фраза выскакивает на автомате, задержек при воспоминании нет.",
        instructionGraduationRule: "<strong>Правило двух пятерок:</strong> Когда вы нажимаете кнопку «5» дважды в разных сессиях, фраза окончательно считается активной и больше не появляется на повторении.",

        // Settings
        settingsTitle: "Настройки и параметры",
        settingLanguage: "Язык интерфейса",
        settingTheme: "Цветовая тема",
        themeLight: "Светлая тема",
        themeDark: "Тёмная тема",
        settingSound: "Звуковые эффекты",
        soundOn: "Включены (клики, нажатия и победный звук)",
        soundOff: "Выключены",
        settingAiTitle: "Генератор контекстных предложений",
        settingAiDesc: "Контекст показывает 2-3 живых предложения для каждой фразы. Вы можете использовать встроенный умный генератор или подключить свой ключ OpenAI API.",
        labelApiKey: "OpenAI API ключ (необязательно)",
        placeholderApiKey: "sk-...",
        apiKeyHint: "Сохраняется только в вашем браузере (localStorage). Никому не передается.",
        labelAiModel: "Модель AI",
        btnSaveSettings: "Сохранить настройки",
        btnResetData: "Сбросить все данные обучения",
        confirmReset: "Вы уверены, что хотите удалить все сохраненные слова и статистику? Это действие нельзя отменить.",

        // Vocabulary Bank Table
        vocabBankTitle: "Ваш банк словарного запаса",
        filterAll: "Все ({count})",
        filterPassive: "Пассивные ({count})",
        filterActive: "Активные ({count})",
        searchPlaceholder: "Поиск по словам или определениям...",
        tableColPhrase: "Фраза / Слово",
        tableColDefinition: "Определение / Заметка",
        tableColStatus: "Статус",
        tableColStage: "Пятёрки: {stage}/2",
        tableColNextDue: "Следующая активация",
        tableColActions: "Действия",
        statusActiveBadge: "Активно",
        statusPassiveBadge: "Пассивно",
        deleteConfirm: "Удалить эту фразу из вашего банка?",
        noItemsFound: "Слов пока не найдено.",

        // Common
        loading: "Загрузка...",
        ready: "Готово",
        close: "Закрыть"
    },

    uz: {
        appName: "Vocabulary Activator",
        tagline: "Passiv so'z boyligingizni erkin nutqqa aylantiring",
        navDashboard: "Asosiy",
        navVocab: "Lug'at banki",
        navStats: "Statistika",
        navInstructions: "Yo'riqnoma",
        navSettings: "Sozlamalar",

        // Main Dashboard
        dailyGoalTitle: "Bugungi faollashtirish maqsadi",
        wordsDueToday: "Bugun faollashtirishga tayyor iboralar",
        wordsAddedToday: "Bugun qo'shilgan iboralar",
        maxLimitBadge: "Kuniga ko'pi bilan 10 ta",
        btnActivateVocab: "Lug'atni faollashtirish",
        btnPracticeNow: "Mashg'ulotni boshlash",
        btnEarlyPractice: "Muddatidan oldin takrorlash",
        btnAddChunk: "+ Yangi ibora yoki so'z qo'shish",
        quickStatsTitle: "Umumiy ko'rsatkichlar",
        passiveCountLabel: "Passiv lug'atda",
        activeCountLabel: "To'liq faollashtirilgan",
        daysPracticedLabel: "Mashq qilingan kunlar",
        allCaughtUpTitle: "Bugun uchun hammasi bajarildi!",
        allCaughtUpDesc: "Siz bugungi barcha iboralarni faollashtirdingiz. Yangi so'zlar har 2-3 kunda takrorlash uchun chiqadi. Ortiqcha bosim va to'planish yo'q!",
        noWordsYetTitle: "Lug'at banki hozircha bo'sh",
        noWordsYetDesc: "Faollashtirishni boshlash uchun rus yoki ingliz tilidagi 10 tagacha ibora, fraza yoki so'zni izohi bilan qo'shing.",

        // Add Modal
        modalAddTitle: "Til iborasi qo'shish",
        modalAddSubtitle: "Idiomalar, turg'un birikmalar va so'zlarni o'zingizga tushunarli ma'nosi bilan saqlang",
        labelPhrase: "So'z, ibora yoki idioma",
        placeholderPhrase: "masalan: come in handy / cut corners / с глазу на глаз",
        labelDefinition: "Ma'nosi va eslab qolish izohi",
        placeholderDefinition: "Xotirada mustahkam qolishi uchun ma'nosini o'z so'zlaringiz bilan yozing...",
        labelCategory: "Turi (ixtiyoriy)",
        typeCollocation: "Turg'un birikma (Collocation)",
        typeIdiom: "Idioma",
        typePhrasal: "Frazali fe'l",
        typeWord: "Alohida so'z",
        typeGrammar: "Grammatik qolip",
        btnSaveChunk: "Passiv lug'atga saqlash",
        btnCancel: "Bekor qilish",
        dailyLimitNotice: "Kunlik cheklov: kuniga ko'pi bilan 10 ta ibora (hozir: {current}/10). Bu miya uchun eng samarali ilmiy tavsiya.",
        errorLimitReached: "Bugun uchun 10 ta ibora chegarasiga yetildi! Sifat miqdordan muhimroq. Yangi so'zlar qo'shish uchun ertaga kiring.",
        savedSuccess: "Passiv lug'at bankiga muvaffaqiyatli saqlandi!",

        // Review Session
        reviewTitle: "Lug'atni faollashtirish mashqi",
        cardCounter: "{total} tadan {current}-ibora",
        contextHeading: "Ibora matn ichida",
        contextLoading: "Boy mazmunli gaplar tayyorlanmoqda...",
        definitionReveal: "Ma'nosi va izohni ko'rish",
        definitionHide: "Izohni yashirish",
        ratingInstruction: "Ushbu iborani qay darajada eslaganingizni baholang:",
        rate1Title: "1 - Umuman tanimayman",
        rate1Desc: "To'liq unutilgan yoki ma'nosi esga kelmadi",
        rate2Title: "2 - Qisman taniyman",
        rate2Desc: "Tanishdek tuyuladi, lekin aniq ma'nosi noma'lum",
        rate3Title: "3 - Ma'nosini bilaman, qo'llay olmayman",
        rate3Desc: "Passiv bilaman, lekin nutqda mustaqil ishlata olmayman",
        rate4Title: "4 - Qo'llay olaman, mashq kerak",
        rate4Desc: "Xotiramda bor, lekin yanada mustahkamlashni xohlayman",
        rate5Title: "5 - To'liq faollashtirildi!",
        rate5Desc: "Darhol va erkin qo'llay olaman! (Aktivga o'tish uchun 2 marta 5 bosing)",
        timesRatedFive: "5 ball olindi: {count}/2 marta",
        promotedToActiveToast: "🎉 Tabriklaymiz! Bu ibora rasman sizning Faol Lug'at boyligingizga o'tdi!",

        // Celebration Modal
        congratsTitle: "Bugungi mashg'ulot yakunlandi! 🎉",
        congratsSubtitle: "Ajoyib natija! Siz bugungi iboralar partiyasini faollashtirdingiz.",
        congratsReviewedCount: "Takrorlangan iboralar",
        congratsPromotedCount: "Faol lug'atga o'tganlar",
        congratsStreak: "Mashq qilingan kunlar",
        congratsMotivational: "Kundalik doimiylik — ravon nutqning kalitidir. Keyingi darsda ko'rishguncha!",
        btnCloseCongrats: "Bosh sahifaga qaytish",

        // Statistics
        statsTitle: "O'rganish statistikasi",
        statsDailyTab: "Bugungi statistika",
        statsOverallTab: "Umumiy statistika",
        statDueToday: "Bugun takrorlanadigan",
        statCompletedToday: "Bugun takrorlandi",
        statAddedToday: "Bugun qo'shildi",
        statDailyBreakdown: "Bugungi natijalar taqsimoti",
        statFullyActivated: "To'liq faollashtirilgan (5)",
        statMediumActivated: "Mustahkamlangan (2-4)",
        statNotRecognized: "E'tibor talab (1)",
        statTotalPassive: "Jami passiv iboralar",
        statTotalActive: "Jami faol iboralar",
        statTotalAll: "Bankdagi jami iboralar",
        statActiveRatio: "Faollashtirish foizi",
        statPracticeDays: "Jami mashq kunlari",
        statAntiPileupNotice: "🛡️ To'planishdan himoya faol: Agar kun o'tkazib yuborsangiz, sizni yuzlab so'zlar bosib qolmaydi. Har doim ko'pi bilan 10 ta so'zdan iborat 1 partiya taqdim etiladi!",

        // Instructions
        instructionsTitle: "Vocabulary Activator nega yaratildi?",
        instructionIntroTitle: "Passiv va faol lug'at boyligi ilmi",
        instructionIntroBody: "Aksariyat til o'rganuvchilar bir xil muammoga duch kelishadi: ular kinolarni, kitoblarni yaxshi tushunishadi (passiv lug'at), lekin gapirishga kelganda so'zlar esga kelmay qoladi (faol lug'at).\n\nVocabulary Activator aynan passiv so'zlarni kontekst orqali nutqda o'z-o'zidan chiqadigan faol holatga keltirish uchun yaratilgan.",
        instructionLimitTitle: "Nima uchun qat'iy kunlik 10 ta so'z cheklovi?",
        instructionLimitBody: "Kognitiv psixologiya shuni ko'rsatadiki, inson xotirasi bir kunda chuqur o'zlashtirish uchun ko'pi bilan 5 tadan 10 tagacha iborani qabul qila oladi.\n\nKuniga 40-50 ta so'z yozish xotirani toliqtiradi va yuzaki qolib ketadi. Kuniga 10 ta iborani faollashtirish orqali siz oyiga 300 ta boy iborani o'zlashtirasiz — bu nutqingizni tubdan o'zgartirish uchun to'liq yetarli.",
        instructionSpacingTitle: "2-3 kunlik intervalli faollashtirish",
        instructionSpacingBody: "Saqlangan so'zlar darhol mashqda chiqmaydi. Ular 2-3 kundan so'ng — miya ularni aynan unuta boshlagan pallasida paydo bo'ladi. Aynan shu lahzada iborani eslash orqali mustahkam neyron aloqalari shakllanadi.",
        instructionAntiPileupTitle: "Ankidagi kabi to'planib qolmaslik qoidasi",
        instructionAntiPileupBody: "Boshqa ilovalarda bir-ikki kun kirmay qolsangiz, 80-100 ta so'z to'planib qolib, dars qilishga hafsala pir bo'ladi. Bizda esa bunday holat bo'lmaydi! Agar dushanba kunini o'tkazib yuborgan bo'lsangiz, seshanba kuni faqat o'sha o'tkazib yuborilgan 10 ta so'zni ko'rasiz. Kuniga 10 tadan ortiq takrorlash bo'lmaydi!",
        instructionScaleTitle: "1 dan 5 gacha baholash tugmalari ma'nosi",
        instructionScale1: "<strong>1 - Umuman tanimayman:</strong> Ibora butunlay unutilgan. Tez orada yangi kontekst bilan yana chiqadi.",
        instructionScale2: "<strong>2 - Qisman taniyman:</strong> Tanishdek, lekin yordamsiz ma'nosini eslash qiyin.",
        instructionScale3: "<strong>3 - Ma'nosini bilaman, qo'llay olmayman:</strong> Matnda tushunasiz, lekin gapda mustaqil ishlatishga qiynalasiz.",
        instructionScale4: "<strong>4 - Qo'llay olaman, mashq kerak:</strong> Xotirangizda bor, faqat 100% ishonch hosil qilish uchun yana bir bor takrorlash kerak.",
        instructionScale5: "<strong>5 - To'liq faollashtirildi:</strong> Ibora til uchida turadi, hech qanday ikkilanishsiz erkin ishlata olasiz.",
        instructionGraduationRule: "<strong>Ikkita 5 qoidasi:</strong> Ikkita turli mashg'ulotda '5' tugmasini bosganingizdan so'ng, ibora rasman Faol Lug'atga o'tadi va takrorlash ro'yxatidan butunlay chiqadi.",

        // Settings
        settingsTitle: "Sozlamalar",
        settingLanguage: "Sayt tili",
        settingTheme: "Rang mavzusi",
        themeLight: "Yorug' mavzu",
        themeDark: "Qorong'u mavzu",
        settingSound: "Ovoz effektlari",
        soundOn: "Yoqilgan (chertish va g'alaba ovozlari)",
        soundOff: "O'chirilgan",
        settingAiTitle: "Kontekst gaplar generatori",
        settingAiDesc: "Har bir ibora uchun 2-3 ta jonli gapdan iborat matn yaratiladi. Siz ichki avtomatik generatordan foydalanishingiz yoki o'zingizning OpenAI API kalitingizni ulashingiz mumkin.",
        labelApiKey: "OpenAI API kaliti (ixtiyoriy)",
        placeholderApiKey: "sk-...",
        apiKeyHint: "Faqat brauzeringizda (localStorage) saqlanadi. Hech qayerga uzatilmaydi.",
        labelAiModel: "AI modeli",
        btnSaveSettings: "Sozlamalarni saqlash",
        btnResetData: "Barcha ma'lumotlarni o'chirish",
        confirmReset: "Barcha saqlangan so'zlar va statistikani o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.",

        // Vocabulary Bank Table
        vocabBankTitle: "Lug'at boyligingiz banki",
        filterAll: "Barchasi ({count})",
        filterPassive: "Passiv ({count})",
        filterActive: "Faol ({count})",
        searchPlaceholder: "So'z yoki izoh bo'yicha qidirish...",
        tableColPhrase: "Ibora / So'z",
        tableColDefinition: "Ma'nosi / Izoh",
        tableColStatus: "Holati",
        tableColStage: "Bosqich: {stage}/2",
        tableColNextDue: "Keyingi mashq",
        tableColActions: "Amallar",
        statusActiveBadge: "Faol",
        statusPassiveBadge: "Passiv",
        deleteConfirm: "Ushbu iborani bankdan o'chirmoqchimisiz?",
        noItemsFound: "Hozircha iboralar mavjud emas.",

        // Common
        loading: "Yuklanmoqda...",
        ready: "Tayyor",
        close: "Yopish"
    }
};

window.I18N = {
    currentLang: 'en',

    init(lang) {
        if (lang && translations[lang]) {
            this.currentLang = lang;
        } else {
            const saved = localStorage.getItem('va_lang');
            if (saved && translations[saved]) {
                this.currentLang = saved;
            } else {
                const nav = navigator.language || 'en';
                if (nav.startsWith('ru')) this.currentLang = 'ru';
                else if (nav.startsWith('uz')) this.currentLang = 'uz';
                else this.currentLang = 'en';
            }
        }
    },

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('va_lang', lang);
            this.updateDOM();
        }
    },

    t(key, params = {}) {
        const dict = translations[this.currentLang] || translations.en;
        let text = dict[key] || translations.en[key] || key;
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        }
        return text;
    },

    updateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = this.t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.hasAttribute('placeholder')) {
                    el.placeholder = val;
                }
            } else {
                // If contains markup or simple text
                if (val.includes('<') && val.includes('>')) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });

        // Update document title
        document.title = `${this.t('appName')} - ${this.t('tagline')}`;
    }
};
