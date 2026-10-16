/**
 * Main Application Controller for Vocabulary Activator
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Variables ---
    let currentReviewBatch = [];
    let currentCardIndex = 0;
    let sessionReviewedCount = 0;
    let sessionPromotedCount = 0;
    let currentVocabFilter = 'all';

    // --- DOM Elements ---
    const brandLink = document.getElementById('brand-link');
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewPanels = document.querySelectorAll('.view-panel');
    const reviewView = document.getElementById('view-review');

    // Dashboard Elements
    const heroDueCount = document.getElementById('hero-due-count');
    const heroPassiveCount = document.getElementById('hero-passive-count');
    const heroActiveCount = document.getElementById('hero-active-count');
    const heroStreakCount = document.getElementById('hero-streak-count');
    const heroAddedCount = document.getElementById('hero-added-count');
    const btnActivateMain = document.getElementById('btn-activate-main');
    const btnOpenAddModal = document.getElementById('btn-open-add-modal');
    const btnPracticeEarly = document.getElementById('btn-practice-early');
    const dashCaughtUpBox = document.getElementById('dash-caught-up-box');
    const dashEmptyBox = document.getElementById('dash-empty-box');
    const btnCaughtUpEarly = document.getElementById('btn-caught-up-early');
    const btnEmptyAdd = document.getElementById('btn-empty-add');
    const linkReadGuide = document.getElementById('link-read-guide');

    // Review Elements
    const reviewProgressFill = document.getElementById('review-progress-fill');
    const reviewCardCounter = document.getElementById('review-card-counter');
    const btnExitReview = document.getElementById('btn-exit-review');
    const cardPhraseText = document.getElementById('card-phrase-text');
    const btnPronounce = document.getElementById('btn-pronounce');
    const cardStagePill = document.getElementById('card-stage-pill');
    const cardContextText = document.getElementById('card-context-text');
    const btnToggleDef = document.getElementById('btn-toggle-def');
    const defToggleText = document.getElementById('def-toggle-text');
    const cardDefContent = document.getElementById('card-definition-content');
    const ratingButtons = document.querySelectorAll('.btn-rate');

    // Vocab Bank Elements
    const vocabTableBody = document.getElementById('vocab-table-body');
    const searchVocabInput = document.getElementById('search-vocab');
    const filterPills = document.querySelectorAll('.filter-pill');
    const btnVocabAddMore = document.getElementById('btn-vocab-add-more');
    const pillFilterAll = document.getElementById('pill-filter-all');
    const pillFilterPassive = document.getElementById('pill-filter-passive');
    const pillFilterActive = document.getElementById('pill-filter-active');

    // Stats Elements
    const statsTabButtons = document.querySelectorAll('.stats-tab-btn');
    const subtabDailyContent = document.getElementById('subtab-daily-content');
    const subtabOverallContent = document.getElementById('subtab-overall-content');
    const statsDailyDue = document.getElementById('stats-daily-due');
    const statsDailyCompleted = document.getElementById('stats-daily-completed');
    const statsDailyAdded = document.getElementById('stats-daily-added');
    const statsDaily5 = document.getElementById('stats-daily-5');
    const statsDailyMedium = document.getElementById('stats-daily-medium');
    const statsDaily1 = document.getElementById('stats-daily-1');
    const statsTotalAll = document.getElementById('stats-total-all');
    const statsTotalPassive = document.getElementById('stats-total-passive');
    const statsTotalActive = document.getElementById('stats-total-active');
    const statsTotalDays = document.getElementById('stats-total-days');
    const statMasteryPercent = document.getElementById('stat-mastery-percent');
    const statOverallRing = document.getElementById('stat-overall-ring');

    // Add Modal Elements
    const modalAddPhrase = document.getElementById('modal-add-phrase');
    const btnCloseAddModal = document.getElementById('btn-close-add-modal');
    const btnCancelAddModal = document.getElementById('btn-cancel-add-modal');
    const formAddPhrase = document.getElementById('form-add-phrase');
    const inputPhrase = document.getElementById('input-phrase');
    const inputDefinition = document.getElementById('input-definition');
    const selectCategory = document.getElementById('select-category');
    const modalDailyLimitBadge = document.getElementById('modal-daily-limit-badge');

    // Congratulations Modal Elements
    const modalCongrats = document.getElementById('modal-congrats');
    const btnCloseCongrats = document.getElementById('btn-close-congrats');
    const congratsReviewedNum = document.getElementById('congrats-reviewed-num');
    const congratsPromotedNum = document.getElementById('congrats-promoted-num');
    const congratsStreakNum = document.getElementById('congrats-streak-num');

    // Settings Modal & Controls
    const modalSettings = document.getElementById('modal-settings');
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const btnSaveSettings = document.getElementById('btn-save-settings');
    const btnResetData = document.getElementById('btn-reset-data');
    const settingLanguageSelect = document.getElementById('setting-language-select');
    const settingThemeSelect = document.getElementById('setting-theme-select');
    const settingSoundSelect = document.getElementById('setting-sound-select');
    const inputOpenAiKey = document.getElementById('input-openai-key');
    const selectOpenAiModel = document.getElementById('select-openai-model');
    const btnQuickTheme = document.getElementById('btn-quick-theme');
    const btnQuickSound = document.getElementById('btn-quick-sound');

    // Toast Container
    const toastContainer = document.getElementById('toast-container');

    // ================= INITIALIZATION =================

    function initApp() {
        // Seed demo data if first run
        storageManager.seedInitialDemoDataIfEmpty();

        // Initialize i18n
        I18N.init();
        settingLanguageSelect.value = I18N.currentLang;

        // Initialize Theme
        const savedTheme = localStorage.getItem('va_theme') || 'light';
        setTheme(savedTheme);
        settingThemeSelect.value = savedTheme;

        // Initialize Sound
        const savedSound = localStorage.getItem('va_sound_enabled');
        const soundEnabled = savedSound !== null ? savedSound === 'true' : true;
        soundManager.setEnabled(soundEnabled);
        settingSoundSelect.value = soundEnabled ? 'true' : 'false';
        updateQuickSoundIcon(soundEnabled);

        // Initialize AI Credentials
        const aiCreds = contextEngine.getCredentials();
        inputOpenAiKey.value = aiCreds.apiKey;
        selectOpenAiModel.value = aiCreds.model;

        // Apply translations
        I18N.updateDOM();

        // Refresh UI
        refreshDashboard();
        renderVocabTable();
        refreshStatistics();

        // Setup global click sound for all buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button, .btn');
            if (btn && !btn.classList.contains('btn-rate')) {
                soundManager.playClick();
            }
        });
    }

    // ================= THEME & SOUND HELPERS =================

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('va_theme', theme);
        btnQuickTheme.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        settingThemeSelect.value = next;
    }

    function updateQuickSoundIcon(enabled) {
        btnQuickSound.textContent = enabled ? '🔊' : '🔇';
    }

    function toggleSound() {
        const newState = !soundManager.enabled;
        soundManager.setEnabled(newState);
        localStorage.setItem('va_sound_enabled', newState ? 'true' : 'false');
        settingSoundSelect.value = newState ? 'true' : 'false';
        updateQuickSoundIcon(newState);
        showToast(newState ? I18N.t('soundOn') : I18N.t('soundOff'));
    }

    // ================= NAVIGATION / VIEW SWITCHER =================

    function switchView(viewName) {
        // Hide review view if open
        reviewView.classList.remove('active');

        viewPanels.forEach(panel => {
            panel.style.display = 'none';
        });

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
        });

        const activePanel = document.getElementById(`view-${viewName}`);
        if (activePanel) {
            activePanel.style.display = 'block';
        }

        if (viewName === 'dashboard') {
            refreshDashboard();
        } else if (viewName === 'vocab') {
            renderVocabTable();
        } else if (viewName === 'stats') {
            refreshStatistics();
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchView(view);
        });
    });

    brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('dashboard');
    });

    linkReadGuide.addEventListener('click', () => {
        switchView('instructions');
    });

    // ================= DASHBOARD CONTROLLER =================

    function refreshDashboard() {
        const words = storageManager.getAllWords();
        const dueWords = storageManager.getDueReviewBatch();
        const overall = storageManager.getOverallStats();
        const addedToday = storageManager.getTodayAddsCount();

        heroDueCount.textContent = dueWords.length;
        heroPassiveCount.textContent = overall.passiveWords;
        heroActiveCount.textContent = overall.activeWords;
        heroStreakCount.textContent = overall.practiceDays;
        heroAddedCount.textContent = addedToday;

        // State displays
        if (words.length === 0) {
            dashEmptyBox.style.display = 'block';
            dashCaughtUpBox.style.display = 'none';
            btnActivateMain.style.display = 'none';
            btnPracticeEarly.style.display = 'none';
        } else if (dueWords.length === 0) {
            dashEmptyBox.style.display = 'none';
            dashCaughtUpBox.style.display = 'block';
            btnActivateMain.style.display = 'none';
            btnPracticeEarly.style.display = overall.passiveWords > 0 ? 'inline-flex' : 'none';
        } else {
            dashEmptyBox.style.display = 'none';
            dashCaughtUpBox.style.display = 'none';
            btnActivateMain.style.display = 'inline-flex';
            btnPracticeEarly.style.display = 'none';
        }
    }

    // ================= ADD PHRASE MODAL =================

    function openAddModal() {
        const addedToday = storageManager.getTodayAddsCount();
        modalDailyLimitBadge.innerHTML = `💡 ${I18N.t('dailyLimitNotice', { current: addedToday })}`;

        if (addedToday >= storageManager.MAX_DAILY_ADDS) {
            modalDailyLimitBadge.style.color = '#dc2626';
            modalDailyLimitBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            modalDailyLimitBadge.style.background = 'rgba(239, 68, 68, 0.1)';
        } else {
            modalDailyLimitBadge.style.color = '#d97706';
            modalDailyLimitBadge.style.borderColor = 'rgba(245, 158, 11, 0.3)';
            modalDailyLimitBadge.style.background = 'rgba(245, 158, 11, 0.1)';
        }

        formAddPhrase.reset();
        modalAddPhrase.classList.add('open');
        soundManager.playPop();
        setTimeout(() => inputPhrase.focus(), 150);
    }

    function closeAddModal() {
        modalAddPhrase.classList.remove('open');
    }

    btnOpenAddModal.addEventListener('click', openAddModal);
    btnVocabAddMore.addEventListener('click', openAddModal);
    btnEmptyAdd.addEventListener('click', openAddModal);
    btnCloseAddModal.addEventListener('click', closeAddModal);
    btnCancelAddModal.addEventListener('click', closeAddModal);

    formAddPhrase.addEventListener('submit', (e) => {
        e.preventDefault();
        const phrase = inputPhrase.value.trim();
        const definition = inputDefinition.value.trim();
        const category = selectCategory.value;

        if (!phrase || !definition) return;

        const res = storageManager.addWord(phrase, definition, category);

        if (!res.success) {
            soundManager.playWarning();
            showToast(I18N.t('errorLimitReached'), 'warning');
            return;
        }

        soundManager.playSuccess();
        showToast(I18N.t('savedSuccess'), 'success');
        closeAddModal();
        refreshDashboard();
        renderVocabTable();
        refreshStatistics();
    });

    // ================= REVIEW / FLASHCARD CONTROLLER =================

    function startReviewSession(isEarly = false) {
        if (isEarly) {
            currentReviewBatch = storageManager.getEarlyPracticeBatch();
        } else {
            currentReviewBatch = storageManager.getDueReviewBatch();
        }

        if (currentReviewBatch.length === 0) {
            showToast(I18N.t('allCaughtUpTitle'));
            return;
        }

        currentCardIndex = 0;
        sessionReviewedCount = 0;
        sessionPromotedCount = 0;

        viewPanels.forEach(p => p.style.display = 'none');
        reviewView.classList.add('active');

        soundManager.playPress();
        loadCard(currentCardIndex);
    }

    async function loadCard(index) {
        if (index >= currentReviewBatch.length) {
            finishReviewSession();
            return;
        }

        const word = currentReviewBatch[index];
        const total = currentReviewBatch.length;

        // Update progress bar
        const progressPct = ((index) / total) * 100;
        reviewProgressFill.style.width = `${progressPct}%`;
        reviewCardCounter.textContent = I18N.t('cardCounter', { current: index + 1, total: total });

        // Update Word Text & Stage
        cardPhraseText.textContent = word.phrase;
        cardStagePill.textContent = I18N.t('timesRatedFive', { count: word.fiveCount || 0 });

        // Hide definition initially
        cardDefContent.textContent = word.definition;
        cardDefContent.classList.remove('visible');
        defToggleText.textContent = I18N.t('definitionReveal');

        // Context Sentence Generator (OpenAI or smart fallback)
        cardContextText.innerHTML = `<em>${I18N.t('contextLoading')}</em>`;
        const contextHtml = await contextEngine.getContextSentences(word);
        cardContextText.innerHTML = contextHtml;

        // Auto-save generated context to storage if it was newly created
        storageManager.updateWord(word.id, { cachedContext: word.cachedContext });
    }

    // Toggle Definition Button
    btnToggleDef.addEventListener('click', () => {
        soundManager.playClick();
        const isVisible = cardDefContent.classList.contains('visible');
        if (isVisible) {
            cardDefContent.classList.remove('visible');
            defToggleText.textContent = I18N.t('definitionReveal');
        } else {
            cardDefContent.classList.add('visible');
            defToggleText.textContent = I18N.t('definitionHide');
        }
    });

    // Pronunciation (SpeechSynthesis)
    btnPronounce.addEventListener('click', () => {
        soundManager.playClick();
        pronouncePhrase(cardPhraseText.textContent);
    });

    function pronouncePhrase(text) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const isCyrillic = /[а-яё]/i.test(text);
        utterance.lang = isCyrillic ? 'ru-RU' : 'en-US';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    }

    // 1-5 Rating Button Handlers
    ratingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.getAttribute('data-rating'), 10);
            handleRateCard(rating);
        });
    });

    function handleRateCard(rating) {
        if (currentCardIndex >= currentReviewBatch.length) return;

        soundManager.playRateTone(rating);
        const currentWord = currentReviewBatch[currentCardIndex];
        const result = storageManager.recordWordReview(currentWord.id, rating);

        sessionReviewedCount++;

        if (result && result.becameActive) {
            sessionPromotedCount++;
            showToast(I18N.t('promotedToActiveToast'), 'success');
        }

        currentCardIndex++;
        loadCard(currentCardIndex);
    }

    // Keyboard Shortcuts (1-5 for rating, Space to toggle definition)
    document.addEventListener('keydown', (e) => {
        // If typing in an input or textarea, ignore shortcuts
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            return;
        }

        if (reviewView.classList.contains('active')) {
            if (['1', '2', '3', '4', '5'].includes(e.key)) {
                e.preventDefault();
                const rating = parseInt(e.key, 10);
                handleRateCard(rating);
            } else if (e.code === 'Space') {
                e.preventDefault();
                btnToggleDef.click();
            }
        }
    });

    btnExitReview.addEventListener('click', () => {
        reviewView.classList.remove('active');
        switchView('dashboard');
    });

    btnActivateMain.addEventListener('click', () => startReviewSession(false));
    btnPracticeEarly.addEventListener('click', () => startReviewSession(true));
    btnCaughtUpEarly.addEventListener('click', () => startReviewSession(true));

    // ================= CELEBRATION / COMPLETION =================

    function finishReviewSession() {
        reviewView.classList.remove('active');

        // Play celebratory fanfare & trigger confetti
        soundManager.playCelebrate();
        confettiCanon.fire(4500);

        // Populate celebration stats
        congratsReviewedNum.textContent = sessionReviewedCount;
        congratsPromotedNum.textContent = sessionPromotedCount;
        congratsStreakNum.textContent = storageManager.getPracticeDays().length;

        // Open modal
        modalCongrats.classList.add('open');

        // Refresh background state
        refreshDashboard();
        renderVocabTable();
        refreshStatistics();
    }

    btnCloseCongrats.addEventListener('click', () => {
        modalCongrats.classList.remove('open');
        switchView('dashboard');
    });

    // ================= VOCABULARY BANK TABLE =================

    function renderVocabTable() {
        const words = storageManager.getAllWords();
        const searchQuery = (searchVocabInput.value || '').toLowerCase().trim();

        const passiveWords = words.filter(w => !w.isActive);
        const activeWords = words.filter(w => w.isActive);

        pillFilterAll.textContent = I18N.t('filterAll', { count: words.length });
        pillFilterPassive.textContent = I18N.t('filterPassive', { count: passiveWords.length });
        pillFilterActive.textContent = I18N.t('filterActive', { count: activeWords.length });

        let filtered = words;

        if (currentVocabFilter === 'passive') {
            filtered = passiveWords;
        } else if (currentVocabFilter === 'active') {
            filtered = activeWords;
        }

        if (searchQuery) {
            filtered = filtered.filter(w =>
                w.phrase.toLowerCase().includes(searchQuery) ||
                w.definition.toLowerCase().includes(searchQuery)
            );
        }

        vocabTableBody.innerHTML = '';

        if (filtered.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">${I18N.t('noItemsFound')}</td>`;
            vocabTableBody.appendChild(tr);
            return;
        }

        filtered.forEach(word => {
            const tr = document.createElement('tr');

            const statusBadgeClass = word.isActive ? 'active' : 'passive';
            const statusBadgeText = word.isActive ? I18N.t('statusActiveBadge') : I18N.t('statusPassiveBadge');

            const nextDueStr = word.isActive
                ? '—'
                : formatNextDue(word.nextDueDate);

            tr.innerHTML = `
                <td>
                    <strong>${escapeHtml(word.phrase)}</strong>
                    <button class="audio-btn" style="width: 26px; height: 26px; font-size: 0.8rem; margin-left: 6px;" data-pronounce="${escapeHtml(word.phrase)}">🔊</button>
                </td>
                <td style="color: var(--text-secondary);">${escapeHtml(word.definition)}</td>
                <td>
                    <span class="badge-status ${statusBadgeClass}">${statusBadgeText}</span>
                </td>
                <td>
                    <strong>${word.fiveCount || 0}</strong> / 2
                </td>
                <td>${nextDueStr}</td>
                <td>
                    <button class="icon-btn" style="width: 30px; height: 30px; font-size: 0.9rem; color: var(--danger);" data-delete-id="${word.id}" title="Delete">🗑️</button>
                </td>
            `;

            vocabTableBody.appendChild(tr);
        });

        // Event Delegation for Table Actions
        vocabTableBody.querySelectorAll('[data-pronounce]').forEach(btn => {
            btn.addEventListener('click', () => {
                const phrase = btn.getAttribute('data-pronounce');
                pronouncePhrase(phrase);
            });
        });

        vocabTableBody.querySelectorAll('[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-delete-id');
                if (confirm(I18N.t('deleteConfirm'))) {
                    storageManager.deleteWord(id);
                    soundManager.playClick();
                    renderVocabTable();
                    refreshDashboard();
                    refreshStatistics();
                }
            });
        });
    }

    function formatNextDue(dueDateStr) {
        if (!dueDateStr) return 'Ready';
        const due = new Date(dueDateStr);
        const now = new Date();
        const diffMs = due.getTime() - now.getTime();

        if (diffMs <= 0) {
            return `<span style="color: var(--primary); font-weight: 600;">⚡ Ready Today</span>`;
        }

        const hours = Math.round(diffMs / (1000 * 60 * 60));
        if (hours < 24) {
            return `In ~${hours}h`;
        }
        const days = Math.round(hours / 24);
        return `In ~${days}d`;
    }

    searchVocabInput.addEventListener('input', () => renderVocabTable());

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentVocabFilter = pill.getAttribute('data-filter');
            renderVocabTable();
        });
    });

    // ================= STATISTICS VIEW =================

    function refreshStatistics() {
        const todayStats = storageManager.getTodayReviewStats();
        const overall = storageManager.getOverallStats();
        const dueBatch = storageManager.getDueReviewBatch();
        const addedToday = storageManager.getTodayAddsCount();

        // Daily
        statsDailyDue.textContent = dueBatch.length;
        statsDailyCompleted.textContent = todayStats.totalReviewed;
        statsDailyAdded.textContent = `${addedToday}/10`;
        statsDaily5.textContent = todayStats.ratingCounts[5] || 0;
        statsDailyMedium.textContent = (todayStats.ratingCounts[2] || 0) + (todayStats.ratingCounts[3] || 0) + (todayStats.ratingCounts[4] || 0);
        statsDaily1.textContent = todayStats.ratingCounts[1] || 0;

        // Overall
        statsTotalAll.textContent = overall.totalWords;
        statsTotalPassive.textContent = overall.passiveWords;
        statsTotalActive.textContent = overall.activeWords;
        statsTotalDays.textContent = overall.practiceDays;
        statMasteryPercent.textContent = `${overall.masteryRate}%`;
        statOverallRing.style.setProperty('--percent', overall.masteryRate);
    }

    statsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            statsTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subtab = btn.getAttribute('data-subtab');
            if (subtab === 'daily') {
                subtabDailyContent.style.display = 'block';
                subtabOverallContent.style.display = 'none';
            } else {
                subtabDailyContent.style.display = 'none';
                subtabOverallContent.style.display = 'block';
            }
        });
    });

    // ================= SETTINGS CONTROLLER =================

    btnOpenSettings.addEventListener('click', () => {
        modalSettings.classList.add('open');
        soundManager.playPop();
    });

    btnCloseSettings.addEventListener('click', () => {
        modalSettings.classList.remove('open');
    });

    btnSaveSettings.addEventListener('click', () => {
        const selectedLang = settingLanguageSelect.value;
        const selectedTheme = settingThemeSelect.value;
        const selectedSound = settingSoundSelect.value === 'true';
        const apiKey = inputOpenAiKey.value.trim();
        const apiModel = selectOpenAiModel.value;

        // Save language
        I18N.setLanguage(selectedLang);

        // Save theme
        setTheme(selectedTheme);

        // Save sound
        soundManager.setEnabled(selectedSound);
        localStorage.setItem('va_sound_enabled', selectedSound ? 'true' : 'false');
        updateQuickSoundIcon(selectedSound);

        // Save AI Credentials
        contextEngine.setCredentials(apiKey, apiModel);

        soundManager.playSuccess();
        modalSettings.classList.remove('open');
        showToast(I18N.t('ready'), 'success');

        refreshDashboard();
        renderVocabTable();
        refreshStatistics();
    });

    btnResetData.addEventListener('click', () => {
        if (confirm(I18N.t('confirmReset'))) {
            storageManager.resetAllData();
            soundManager.playWarning();
            modalSettings.classList.remove('open');
            refreshDashboard();
            renderVocabTable();
            refreshStatistics();
            showToast('All learning data cleared.', 'info');
        }
    });

    btnQuickTheme.addEventListener('click', toggleTheme);
    btnQuickSound.addEventListener('click', toggleSound);

    // ================= TOAST NOTIFICATION UTILITY =================

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        let icon = 'ℹ️';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';

        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    // Start App
    initApp();
});
