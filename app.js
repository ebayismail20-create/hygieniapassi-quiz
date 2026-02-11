// === STATE ===
let mode = null; // 'practice' or 'exam'
let questions = [];
let currentIndex = 0;
let correct = 0;
let wrong = 0;
let answers = []; // {question, userAnswer, correctAnswer, isCorrect}
let timerInterval = null;
let timeLeft = 45 * 60;
let selectedCategories = Object.keys(CATEGORIES);
let categoryStats = {};

// === AUTH BADGE COLORS ===
const AUTH_COLORS = {
    official: { bg: '#1b4332', border: '#2d6a4f', text: '#74c69d', label: '✅ Official (Ruokavirasto)' },
    likely: { bg: '#4a3700', border: '#6b5000', text: '#ffd166', label: '⭐ Likely Official' },
    practice: { bg: '#1a2744', border: '#2a3f66', text: '#72b4ff', label: '📘 Practice Question' }
};

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    updateQuestionCount();
    buildCategoryChips();
});

function updateQuestionCount() {
    const el = document.getElementById('countdown-days');
    if (el) {
        el.textContent = QUESTIONS.length + ' questions';
    }
}

function buildCategoryChips() {
    const container = document.getElementById('categoryChips');
    container.innerHTML = '<button class="chip active" onclick="toggleAllCategories(this)">All Topics</button>';
    Object.entries(CATEGORIES).forEach(([key, name]) => {
        const count = QUESTIONS.filter(q => q.cat === key).length;
        container.innerHTML += `<button class="chip active" data-cat="${key}" onclick="toggleCategory(this,'${key}')">${name} (${count})</button>`;
    });
}

// === NAVIGATION ===
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() {
    stopTimer();
    showScreen('landing');
    document.getElementById('category-filter').classList.add('hidden');
}

// === MODE SELECTION ===
function startQuiz(m) {
    mode = m;
    if (mode === 'practice') {
        document.getElementById('category-filter').classList.remove('hidden');
        document.getElementById('category-filter').scrollIntoView({ behavior: 'smooth' });
    } else {
        selectedCategories = Object.keys(CATEGORIES);
        beginQuiz();
    }
}

function toggleCategory(btn, cat) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        if (!selectedCategories.includes(cat)) selectedCategories.push(cat);
    } else {
        selectedCategories = selectedCategories.filter(c => c !== cat);
    }
    const allBtn = document.querySelector('.chip:first-child');
    allBtn.classList.toggle('active', selectedCategories.length === Object.keys(CATEGORIES).length);
}

function toggleAllCategories(btn) {
    const chips = document.querySelectorAll('.chip[data-cat]');
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        chips.forEach(c => c.classList.remove('active'));
        selectedCategories = [];
    } else {
        btn.classList.add('active');
        chips.forEach(c => c.classList.add('active'));
        selectedCategories = Object.keys(CATEGORIES);
    }
}

function startPractice() {
    if (selectedCategories.length === 0) {
        alert('Please select at least one category!');
        return;
    }
    beginQuiz();
}

// === QUIZ LOGIC ===
function beginQuiz() {
    let pool = QUESTIONS.filter(q => selectedCategories.includes(q.cat));
    pool = shuffle([...pool]);

    if (mode === 'exam') {
        questions = pool.slice(0, 40);
    } else {
        questions = pool;
    }

    currentIndex = 0;
    correct = 0;
    wrong = 0;
    answers = [];
    categoryStats = {};

    Object.keys(CATEGORIES).forEach(k => {
        categoryStats[k] = { correct: 0, total: 0 };
    });

    updateStats();
    showScreen('quiz');

    const timerEl = document.getElementById('timer');
    if (mode === 'exam') {
        timerEl.classList.remove('hidden');
        timeLeft = 45 * 60;
        startTimer();
    } else {
        timerEl.classList.add('hidden');
    }

    showQuestion();
}

function showQuestion() {
    const q = questions[currentIndex];
    document.getElementById('questionText').textContent = q.q;
    document.getElementById('categoryBadge').textContent = CATEGORIES[q.cat];
    document.getElementById('questionCounter').textContent = `${currentIndex + 1}/${questions.length}`;

    const pct = ((currentIndex) / questions.length) * 100;
    document.getElementById('progressFill').style.width = pct + '%';

    // Show auth badge
    const authBadge = document.getElementById('authBadge');
    if (authBadge && q.auth && AUTH_COLORS[q.auth]) {
        const c = AUTH_COLORS[q.auth];
        authBadge.textContent = c.label;
        authBadge.style.background = c.bg;
        authBadge.style.borderColor = c.border;
        authBadge.style.color = c.text;
        authBadge.classList.remove('hidden');
    } else if (authBadge) {
        authBadge.classList.add('hidden');
    }

    // Reset buttons
    const btnT = document.getElementById('btnTrue');
    const btnF = document.getElementById('btnFalse');
    btnT.disabled = false;
    btnF.disabled = false;
    btnT.className = 'btn-answer btn-true';
    btnF.className = 'btn-answer btn-false';

    // Hide feedback
    document.getElementById('feedbackCard').classList.add('hidden');
    document.getElementById('feedbackCard').className = 'feedback-card hidden';
}

function answer(userAnswer) {
    const q = questions[currentIndex];
    const isCorrect = userAnswer === q.a;

    if (isCorrect) correct++;
    else wrong++;

    categoryStats[q.cat].total++;
    if (isCorrect) categoryStats[q.cat].correct++;

    answers.push({
        question: q,
        userAnswer,
        correctAnswer: q.a,
        isCorrect
    });

    updateStats();

    const btnT = document.getElementById('btnTrue');
    const btnF = document.getElementById('btnFalse');
    btnT.disabled = true;
    btnF.disabled = true;

    if (userAnswer === true) {
        btnT.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
        if (!isCorrect) btnF.classList.add('show-correct');
    } else {
        btnF.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
        if (!isCorrect) btnT.classList.add('show-correct');
    }

    if (mode === 'practice') {
        const fc = document.getElementById('feedbackCard');
        fc.classList.remove('hidden');
        fc.className = `feedback-card ${isCorrect ? 'correct' : 'wrong'}`;

        document.getElementById('feedbackIcon').textContent = isCorrect ? '✅' : '❌';
        document.getElementById('feedbackText').textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        document.getElementById('feedbackText').style.color = isCorrect ? 'var(--grn)' : 'var(--red)';
        document.getElementById('explanation').textContent = q.exp;

        fc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                showQuestion();
            } else {
                finishQuiz();
            }
        }, 600);
    }
}

function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        showQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        finishQuiz();
    }
}

function updateStats() {
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('wrongCount').textContent = wrong;
    const total = correct + wrong;
    document.getElementById('accuracyValue').textContent = total > 0 ? Math.round((correct / total) * 100) + '%' : '0%';
}

// === TIMER ===
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        const timerEl = document.getElementById('timer');
        if (timeLeft <= 300) {
            timerEl.className = 'timer danger';
        } else if (timeLeft <= 600) {
            timerEl.className = 'timer warning';
        }

        if (timeLeft <= 0) {
            stopTimer();
            finishQuiz();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timerValue').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// === RESULTS ===
function finishQuiz() {
    stopTimer();

    const total = questions.length;
    const passed = mode === 'exam' ? correct >= 34 : correct >= Math.ceil(total * 0.85);
    const pct = total > 0 ? (correct / total) * 100 : 0;

    document.getElementById('resultsIcon').textContent = passed ? '🎉' : '📖';
    document.getElementById('resultsTitle').textContent = passed ? 'You Passed!' : 'Keep Studying!';
    document.getElementById('resultsSubtitle').textContent = passed
        ? `Great job! You scored ${correct}/${total} (${Math.round(pct)}%). You're ready for the exam!`
        : `You scored ${correct}/${total} (${Math.round(pct)}%). You need ${mode === 'exam' ? '34/40' : '85%'} to pass. Review your mistakes and try again!`;

    const circle = document.getElementById('scoreCircle');
    const circumference = 339.292;
    const offset = circumference - (pct / 100) * circumference;
    circle.classList.remove('pass', 'fail');
    circle.classList.add(passed ? 'pass' : 'fail');

    document.getElementById('scoreNumber').textContent = correct;
    document.querySelector('.score-total').textContent = '/' + total;

    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);

    const breakdownEl = document.getElementById('resultsBreakdown');
    breakdownEl.innerHTML = '';
    Object.entries(categoryStats).forEach(([key, stats]) => {
        if (stats.total > 0) {
            const catPct = Math.round((stats.correct / stats.total) * 100);
            const cls = catPct >= 85 ? 'good' : catPct >= 60 ? 'okay' : 'bad';
            breakdownEl.innerHTML += `
                <div class="breakdown-item">
                    <span class="cat-name">${CATEGORIES[key]}</span>
                    <span class="cat-score ${cls}">${stats.correct}/${stats.total} (${catPct}%)</span>
                </div>`;
        }
    });

    showScreen('results');
}

function showResults() {
    showScreen('results');
}

// === REVIEW MISTAKES ===
function reviewMistakes() {
    const container = document.getElementById('reviewBody');
    const mistakes = answers.filter(a => !a.isCorrect);

    if (mistakes.length === 0) {
        container.innerHTML = '<div class="review-item" style="border-color:var(--grn-b);text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:16px">🎯</div><p style="font-size:1.1rem;font-weight:600">Perfect score! No mistakes to review.</p></div>';
    } else {
        container.innerHTML = mistakes.map((m, i) => `
            <div class="review-item">
                <div class="review-category">${CATEGORIES[m.question.cat]}</div>
                <div class="review-question">${i + 1}. ${m.question.q}</div>
                <div class="review-answer">
                    <span class="your-ans">Your answer: ${m.userAnswer ? 'TRUE' : 'FALSE'}</span>
                    <span class="correct-ans">Correct: ${m.correctAnswer ? 'TRUE' : 'FALSE'}</span>
                </div>
                <div class="review-explanation">${m.question.exp}</div>
            </div>
        `).join('');
    }

    showScreen('review');
}

// === STUDY GUIDE ===
function showStudyGuide() {
    const container = document.getElementById('guideBody');

    // PDF Download cards
    let html = `
    <div class="pdf-downloads">
        <h3 style="font-size:.9rem;color:var(--t2);text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;font-weight:600">📄 Printable PDF Documents</h3>
        <div class="pdf-cards">
            <a href="official-ruokavirasto-questions.html" target="_blank" class="pdf-card" style="border-color:rgba(251,191,36,0.3)">
                <div class="pdf-icon">🏛️</div>
                <div class="pdf-info">
                    <div class="pdf-title" style="color:#fbbf24">Official Ruokavirasto Model Test</div>
                    <div class="pdf-desc">40 confirmed questions from the Finnish Food Authority's official model exam (2025) with official justifications</div>
                </div>
                <div class="pdf-action" style="color:#fbbf24">Open →</div>
            </a>
            <a href="study-guide.html" target="_blank" class="pdf-card">
                <div class="pdf-icon">📋</div>
                <div class="pdf-info">
                    <div class="pdf-title">Complete Study Guide</div>
                    <div class="pdf-desc">40 questions with explanations, temperature tables, key concepts & test day checklist</div>
                </div>
                <div class="pdf-action">Open →</div>
            </a>
            <a href="authentic-questions.html" target="_blank" class="pdf-card">
                <div class="pdf-icon">✅</div>
                <div class="pdf-info">
                    <div class="pdf-title">Authenticated Question Bank</div>
                    <div class="pdf-desc">58+ questions color-coded by authenticity (Official / Likely / Practice) with sources</div>
                </div>
                <div class="pdf-action">Open →</div>
            </a>
            <a href="complete-study-guide.html" target="_blank" class="pdf-card">
                <div class="pdf-icon">🎓</div>
                <div class="pdf-info">
                    <div class="pdf-title">40-Question Practice Test</div>
                    <div class="pdf-desc">Categorized by topic (Poisoning, Hygiene, Temp, Storage, Cleaning, Law) with key concepts summary</div>
                </div>
                <div class="pdf-action">Open →</div>
            </a>
        </div>
        <p style="font-size:.75rem;color:var(--t3);margin-top:10px;text-align:center">💡 Open a document, then press <strong style="color:var(--t2)">Ctrl+P → Save as PDF</strong> to download</p>
    </div>
    `;

    // Build study guide sections
    html += STUDY_GUIDE.map(section => `
        <div class="guide-section">
            <div class="guide-section-header" onclick="this.parentElement.classList.toggle('open')">
                <div class="guide-section-title">
                    <span>${section.icon}</span>
                    <span>${section.title}</span>
                </div>
                <span class="guide-arrow">▼</span>
            </div>
            <div class="guide-content">
                <div class="key-fact">🔑 <strong>Key Fact:</strong> ${section.keyFact}</div>
                <h4>Important Points</h4>
                <ul>
                    ${section.facts.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    // Add Exam Tricks section
    if (typeof EXAM_TRICKS !== 'undefined' && EXAM_TRICKS.length > 0) {
        html += `
        <div class="guide-section tricks-section">
            <div class="guide-section-header" onclick="this.parentElement.classList.toggle('open')">
                <div class="guide-section-title">
                    <span>🎯</span>
                    <span>Exam Tricks & Common Pitfalls</span>
                </div>
                <span class="guide-arrow">▼</span>
            </div>
            <div class="guide-content">
                <div class="key-fact">🔑 <strong>Key Fact:</strong> Always answer from a PROFESSIONAL kitchen perspective. Words like "always" and "never" are usually FALSE.</div>
                <div class="tricks-grid">
                    ${EXAM_TRICKS.map(t => `
                        <div class="trick-card">
                            <div class="trick-title">${t.title}</div>
                            <div class="trick-tip">${t.tip}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }

    // Add Frequently Tested section
    if (typeof FREQUENTLY_TESTED !== 'undefined' && FREQUENTLY_TESTED.length > 0) {
        html += `
        <div class="guide-section freq-section">
            <div class="guide-section-header" onclick="this.parentElement.classList.toggle('open')">
                <div class="guide-section-title">
                    <span>🔥</span>
                    <span>Most Frequently Tested Questions</span>
                </div>
                <span class="guide-arrow">▼</span>
            </div>
            <div class="guide-content">
                <div class="key-fact">🔑 <strong>Key Fact:</strong> These questions appear on nearly every exam. Master them for guaranteed points!</div>
                <div class="freq-list">
                    ${FREQUENTLY_TESTED.map(ft => `
                        <div class="freq-item">
                            <div class="freq-question">"${ft.question}"</div>
                            <div class="freq-meta">
                                <span class="freq-answer ${ft.answer ? 'ans-true' : 'ans-false'}">Answer: ${ft.answer ? 'TRUE' : 'FALSE'}</span>
                                <span class="freq-stars">${ft.freq}</span>
                            </div>
                            <div class="freq-note">${ft.note}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }

    container.innerHTML = html;
    showScreen('study-guide');
}

// === UTILITIES ===
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
