/**
 * Contextual Sentences Engine
 * Integrates directly with OpenAI API (ChatGPT) when an API key is provided,
 * and features a built-in smart context generator fallback for instant offline use.
 * NOTE: As requested by the user, the review UI never mentions ChatGPT.
 */

class ContextEngine {
    constructor() {
        this.apiKey = localStorage.getItem('va_openai_key') || '';
        this.model = localStorage.getItem('va_openai_model') || 'gpt-4o-mini';
    }

    setCredentials(key, model) {
        this.apiKey = (key || '').trim();
        this.model = model || 'gpt-4o-mini';
        localStorage.setItem('va_openai_key', this.apiKey);
        localStorage.setItem('va_openai_model', this.model);
    }

    getCredentials() {
        return {
            apiKey: this.apiKey,
            model: this.model
        };
    }

    async getContextSentences(wordObj) {
        // Return cached context if already generated
        if (wordObj.cachedContext && wordObj.cachedContext.length > 20) {
            return wordObj.cachedContext;
        }

        // If API key is present, call OpenAI
        if (this.apiKey) {
            try {
                const liveContext = await this.fetchFromOpenAI(wordObj.phrase, wordObj.definition);
                if (liveContext && liveContext.trim().length > 15) {
                    wordObj.cachedContext = liveContext.trim();
                    return wordObj.cachedContext;
                }
            } catch (err) {
                console.warn('OpenAI context generation error, using smart fallback:', err);
            }
        }

        // Smart local fallback generator
        const fallback = this.generateSmartFallback(wordObj.phrase, wordObj.definition, wordObj.category);
        wordObj.cachedContext = fallback;
        return fallback;
    }

    async fetchFromOpenAI(phrase, definition) {
        const prompt = `Write a natural, vivid 2 to 3 sentence realistic mini-story or everyday scenario illustrating the following language chunk: "${phrase}".
Definition or nuance: "${definition || 'natural meaning'}".
Requirements:
1. Provide rich contextual clues so a language learner can naturally infer and activate the chunk's meaning.
2. The chunk must be incorporated naturally and seamlessly.
3. Wrap the target chunk in <span class="highlight-chunk">${phrase}</span>.
4. Output strictly the 2-3 sentences only. Do not add quotes around the whole text, do not add prefixes like "Context:", and never mention AI or prompts.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an elite linguistic instructor creating rich contextual micro-stories for active vocabulary acquisition.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 220
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content?.trim();

        if (content) {
            // Ensure highlight span is present
            if (!content.includes('highlight-chunk')) {
                return this.wrapTargetChunk(content, phrase);
            }
            return content;
        }
        throw new Error('Empty response from context engine');
    }

    wrapTargetChunk(text, phrase) {
        try {
            const regex = new RegExp(`(${this.escapeRegExp(phrase)})`, 'gi');
            return text.replace(regex, '<span class="highlight-chunk">$1</span>');
        } catch (e) {
            return text;
        }
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    generateSmartFallback(phrase, definition, category) {
        const p = phrase.trim();
        const isCyrillic = /[а-яё]/i.test(p);

        if (isCyrillic) {
            const ruTemplates = [
                `Во время вчерашнего обсуждения сложного проекта наш тимлид напомнил, что нужно действовать <span class="highlight-chunk">${p}</span>. Все участники команды сразу поддержали эту идею, ведь правильный подход экономит время. Благодаря этому совещание завершилось гораздо быстрее, чем мы ожидали.`,
                `Мы долго сомневались, стоит ли соглашаться на это предложение, пока коллега не заметил: главное здесь — <span class="highlight-chunk">${p}</span>. Это простое наблюдение всё расставило по местам. В итоге мы приняли взвешенное решение и ни разу об этом не пожалели.`,
                `Когда возникла непредвиденная заминка в переговорах, умение вовремя вспомнить про <span class="highlight-chunk">${p}</span> оказалось решающим фактором. Партнёры оценили нашу гибкость и готовность идти навстречу. Сделка была успешно закрыта ещё до конца недели.`
            ];
            return ruTemplates[Math.floor(Math.random() * ruTemplates.length)];
        }

        const enTemplates = [
            `During our quarterly review meeting, our manager emphasized that knowing how to <span class="highlight-chunk">${p}</span> makes all the difference when deadlines approach. Everyone took quick notes because practical solutions are what drive real progress. By the end of the day, our team felt noticeably more confident.`,
            `I wasn't entirely sure how to handle the sudden situation until my mentor recommended that we <span class="highlight-chunk">${p}</span>. That single strategic move cleared up the confusion immediately. It turns out that adopting the right mindset changes everything.`,
            `When traveling abroad, having the ability to <span class="highlight-chunk">${p}</span> saved us from an awkward misunderstanding with the locals. Everyone around the table smiled once the intention became clear. Moments like that show why genuine linguistic fluency is so valuable.`
        ];
        return enTemplates[Math.floor(Math.random() * enTemplates.length)];
    }
}

window.contextEngine = new ContextEngine();
