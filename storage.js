/**
 * Data Storage & Business Logic Manager
 * Manages vocabulary bank, daily 10-word limits, anti-pileup queues,
 * spaced repetition intervals (2-3 days), and statistics.
 */

class StorageManager {
    constructor() {
        this.STORAGE_KEY_VOCAB = 'va_vocabulary_items';
        this.STORAGE_KEY_DAILY_ADDS = 'va_daily_adds';
        this.STORAGE_KEY_DAILY_REVIEWS = 'va_daily_reviews';
        this.STORAGE_KEY_PRACTICE_DAYS = 'va_practice_days';
        this.MAX_DAILY_ADDS = 10;
        this.MAX_REVIEW_BATCH = 10;
    }

    getTodayString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // --- Vocabulary Items ---

    getAllWords() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_VOCAB);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Failed to load words from storage', e);
            return [];
        }
    }

    saveAllWords(words) {
        localStorage.setItem(this.STORAGE_KEY_VOCAB, JSON.stringify(words));
    }

    getWordById(id) {
        const words = this.getAllWords();
        return words.find(w => w.id === id);
    }

    // --- Daily Add Limit (Strictly 10 max) ---

    getTodayAddsCount() {
        const today = this.getTodayString();
        const records = this.getDailyAddsRecord();
        return records[today] || 0;
    }

    getDailyAddsRecord() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_DAILY_ADDS);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    incrementDailyAddsCount() {
        const today = this.getTodayString();
        const records = this.getDailyAddsRecord();
        records[today] = (records[today] || 0) + 1;
        localStorage.setItem(this.STORAGE_KEY_DAILY_ADDS, JSON.stringify(records));
        return records[today];
    }

    canAddMoreToday() {
        return this.getTodayAddsCount() < this.MAX_DAILY_ADDS;
    }

    // --- Adding New Words ---

    addWord(phrase, definition, category = 'collocation') {
        if (!this.canAddMoreToday()) {
            return {
                success: false,
                reason: 'DAILY_LIMIT_REACHED',
                limit: this.MAX_DAILY_ADDS,
                current: this.getTodayAddsCount()
            };
        }

        const words = this.getAllWords();
        const now = new Date();

        // 2 to 3 days random interval for spaced activation
        const intervalDays = Math.random() < 0.5 ? 2 : 3;
        const nextDueDate = new Date();
        nextDueDate.setDate(nextDueDate.getDate() + intervalDays);

        const newWord = {
            id: 'word_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            phrase: phrase.trim(),
            definition: definition.trim(),
            category: category,
            createdAt: now.toISOString(),
            lastReviewedAt: null,
            nextDueDate: nextDueDate.toISOString(),
            fiveCount: 0,
            isActive: false,
            ratingHistory: [],
            cachedContext: ''
        };

        words.unshift(newWord);
        this.saveAllWords(words);
        this.incrementDailyAddsCount();

        return {
            success: true,
            word: newWord,
            currentCount: this.getTodayAddsCount(),
            maxLimit: this.MAX_DAILY_ADDS
        };
    }

    deleteWord(id) {
        let words = this.getAllWords();
        words = words.filter(w => w.id !== id);
        this.saveAllWords(words);
    }

    updateWord(id, updates) {
        const words = this.getAllWords();
        const index = words.findIndex(w => w.id === id);
        if (index !== -1) {
            words[index] = { ...words[index], ...updates };
            this.saveAllWords(words);
            return words[index];
        }
        return null;
    }

    // --- Anti-Pileup Spaced Review Queue ---

    /**
     * Anti-Pileup Logic:
     * 1. Only words where isActive === false
     * 2. Where nextDueDate <= current timestamp (or today)
     * 3. Sorted by oldest nextDueDate first (the skipped day's batch!)
     * 4. Strictly capped at MAX_REVIEW_BATCH (10 items)
     * Even if 50 words are technically past due because user skipped a week,
     * they ONLY get 10 words today. No pileup shock!
     */
    getDueReviewBatch() {
        const words = this.getAllWords();
        const now = new Date();

        // Filter passive words that are due
        const dueWords = words.filter(w => {
            if (w.isActive) return false;
            const dueTime = new Date(w.nextDueDate).getTime();
            return dueTime <= now.getTime();
        });

        // Sort by oldest due first (first-in-first-out anti-pileup queue)
        dueWords.sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime());

        // Cap strictly at 10 items
        return dueWords.slice(0, this.MAX_REVIEW_BATCH);
    }

    /**
     * Optional Early Practice / All Passive Review if user has 0 due but wants to practice
     */
    getEarlyPracticeBatch() {
        const words = this.getAllWords();
        const passiveWords = words.filter(w => !w.isActive);
        passiveWords.sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime());
        return passiveWords.slice(0, this.MAX_REVIEW_BATCH);
    }

    // --- Record Rating and Update Spaced Interval ---

    recordWordReview(id, rating) {
        const words = this.getAllWords();
        const index = words.findIndex(w => w.id === id);
        if (index === -1) return null;

        const word = words[index];
        const now = new Date();
        word.lastReviewedAt = now.toISOString();

        word.ratingHistory.push({
            date: now.toISOString(),
            rating: rating
        });

        let becameActive = false;

        if (rating === 5) {
            word.fiveCount = (word.fiveCount || 0) + 1;
            // The 2x Rule: Rated 5 twice -> promoted permanently to Active!
            if (word.fiveCount >= 2) {
                word.isActive = true;
                becameActive = true;
            } else {
                // First time 5: schedule next review in 3 days
                const next = new Date();
                next.setDate(next.getDate() + 3);
                word.nextDueDate = next.toISOString();
            }
        } else if (rating === 4) {
            // High confidence: 2 to 3 days
            const days = Math.random() < 0.5 ? 2 : 3;
            const next = new Date();
            next.setDate(next.getDate() + days);
            word.nextDueDate = next.toISOString();
        } else if (rating === 3) {
            // Passive only: 2 days
            const next = new Date();
            next.setDate(next.getDate() + 2);
            word.nextDueDate = next.toISOString();
        } else if (rating === 2) {
            // Vaguely recognized: 1 to 2 days
            const days = Math.random() < 0.5 ? 1 : 2;
            const next = new Date();
            next.setDate(next.getDate() + days);
            word.nextDueDate = next.toISOString();
        } else {
            // Rating 1 - Not recognized: 1 day
            const next = new Date();
            next.setDate(next.getDate() + 1);
            word.nextDueDate = next.toISOString();
        }

        words[index] = word;
        this.saveAllWords(words);

        // Record daily review telemetry
        this.recordDailyReviewOutcome(rating, becameActive);
        this.markPracticeDayToday();

        return {
            word: word,
            becameActive: becameActive,
            fiveCount: word.fiveCount
        };
    }

    recordDailyReviewOutcome(rating, becameActive) {
        const today = this.getTodayString();
        const records = this.getDailyReviewsRecord();
        if (!records[today]) {
            records[today] = {
                totalReviewed: 0,
                ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                promotedActive: 0
            };
        }

        records[today].totalReviewed++;
        records[today].ratingCounts[rating] = (records[today].ratingCounts[rating] || 0) + 1;
        if (becameActive) {
            records[today].promotedActive++;
        }

        localStorage.setItem(this.STORAGE_KEY_DAILY_REVIEWS, JSON.stringify(records));
    }

    getDailyReviewsRecord() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_DAILY_REVIEWS);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    getTodayReviewStats() {
        const today = this.getTodayString();
        const records = this.getDailyReviewsRecord();
        return records[today] || {
            totalReviewed: 0,
            ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            promotedActive: 0
        };
    }

    // --- Practice Days & Streak ---

    markPracticeDayToday() {
        const today = this.getTodayString();
        let days = this.getPracticeDays();
        if (!days.includes(today)) {
            days.push(today);
            localStorage.setItem(this.STORAGE_KEY_PRACTICE_DAYS, JSON.stringify(days));
        }
    }

    getPracticeDays() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY_PRACTICE_DAYS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    // --- Overall Statistics Aggregator ---

    getOverallStats() {
        const words = this.getAllWords();
        const totalWords = words.length;
        const activeWords = words.filter(w => w.isActive).length;
        const passiveWords = totalWords - activeWords;
        const practiceDays = this.getPracticeDays().length;
        const masteryRate = totalWords > 0 ? Math.round((activeWords / totalWords) * 100) : 0;

        return {
            totalWords,
            activeWords,
            passiveWords,
            practiceDays,
            masteryRate
        };
    }

    // --- Demo Seed Data for instant realistic testing ---
    seedInitialDemoDataIfEmpty() {
        const existing = this.getAllWords();
        if (existing.length === 0) {
            const pastDate1 = new Date();
            pastDate1.setDate(pastDate1.getDate() - 3);

            const pastDate2 = new Date();
            pastDate2.setDate(pastDate2.getDate() - 2);

            const demoWords = [
                {
                    id: 'word_demo_1',
                    phrase: 'come in handy',
                    definition: 'Оказаться полезным, пригодиться в нужный момент',
                    category: 'idiom',
                    createdAt: pastDate1.toISOString(),
                    lastReviewedAt: null,
                    nextDueDate: new Date(Date.now() - 3600000).toISOString(), // due now
                    fiveCount: 0,
                    isActive: false,
                    ratingHistory: [],
                    cachedContext: 'Don\'t throw away that old toolbox just yet, because those spare screws might <span class="highlight-chunk">come in handy</span> during next weekend\'s renovation. I remember when we were repairing the porch, having extra bolts saved us a trip to the hardware store. It\'s always smart to keep practical tools close at hand.'
                },
                {
                    id: 'word_demo_2',
                    phrase: 'cut corners',
                    definition: 'Халтурить, срезать углы, экономить в ущерб качеству',
                    category: 'idiom',
                    createdAt: pastDate1.toISOString(),
                    lastReviewedAt: null,
                    nextDueDate: new Date(Date.now() - 3600000).toISOString(), // due now
                    fiveCount: 1, // one 5 already, one more to graduate!
                    isActive: false,
                    ratingHistory: [{ date: pastDate2.toISOString(), rating: 5 }],
                    cachedContext: 'The architect warned the construction crew that attempting to <span class="highlight-chunk">cut corners</span> on safety inspections would lead to catastrophic structural defects. When building a skyscraper, every measurement must adhere to strict guidelines without exception. Diligence always beats reckless shortcuts in the long run.'
                },
                {
                    id: 'word_demo_3',
                    phrase: 'с глазу на глаз',
                    definition: 'Наедине, тет-а-тет, без посторонних свидетелей',
                    category: 'collocation',
                    createdAt: pastDate2.toISOString(),
                    lastReviewedAt: null,
                    nextDueDate: new Date(Date.now() - 3600000).toISOString(), // due now
                    fiveCount: 0,
                    isActive: false,
                    ratingHistory: [],
                    cachedContext: 'Руководитель департамента попросил остаться после планёрки, чтобы поговорить <span class="highlight-chunk">с глазу на глаз</span> о перспективах повышения. В конфиденциальной беседе удалось открыто обсудить все волнующие вопросы без лишнего шума. Такие откровенные диалоги укрепляют взаимное доверие в коллективе.'
                },
                {
                    id: 'word_demo_4',
                    phrase: 'on the spur of the moment',
                    definition: 'Спонтанно, под влиянием момента, не раздумывая',
                    category: 'collocation',
                    createdAt: pastDate2.toISOString(),
                    lastReviewedAt: null,
                    nextDueDate: new Date(Date.now() - 3600000).toISOString(), // due now
                    fiveCount: 0,
                    isActive: false,
                    ratingHistory: [],
                    cachedContext: 'Instead of spending another Friday night watching television, they booked a weekend getaway to the mountains <span class="highlight-chunk">on the spur of the moment</span>. Unplanned road trips often create the most memorable adventures of our lives. By midnight, they were already sitting around a cozy campfire.'
                }
            ];

            this.saveAllWords(demoWords);
        }
    }

    resetAllData() {
        localStorage.removeItem(this.STORAGE_KEY_VOCAB);
        localStorage.removeItem(this.STORAGE_KEY_DAILY_ADDS);
        localStorage.removeItem(this.STORAGE_KEY_DAILY_REVIEWS);
        localStorage.removeItem(this.STORAGE_KEY_PRACTICE_DAYS);
    }
}

window.storageManager = new StorageManager();
