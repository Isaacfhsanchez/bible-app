// Bible Books Data
const bibleBooks = {
    'Genesis': 50,
    'Exodus': 40,
    'Leviticus': 27,
    'Numbers': 36,
    'Deuteronomy': 34,
    'Joshua': 24,
    'Judges': 21,
    'Ruth': 4,
    '1 Samuel': 31,
    '2 Samuel': 24,
    '1 Kings': 22,
    '2 Kings': 25,
    '1 Chronicles': 29,
    '2 Chronicles': 36,
    'Ezra': 10,
    'Nehemiah': 13,
    'Esther': 10,
    'Job': 42,
    'Psalms': 150,
    'Proverbs': 31,
    'Ecclesiastes': 12,
    'Isaiah': 66,
    'Jeremiah': 52,
    'Lamentations': 5,
    'Ezekiel': 48,
    'Daniel': 12,
    'Hosea': 14,
    'Joel': 3,
    'Amos': 9,
    'Obadiah': 1,
    'Jonah': 4,
    'Micah': 7,
    'Nahum': 3,
    'Habakkuk': 3,
    'Zephaniah': 3,
    'Haggai': 2,
    'Zechariah': 14,
    'Malachi': 4,
    'Matthew': 28,
    'Mark': 16,
    'Luke': 24,
    'John': 21,
    'Acts': 28,
    'Romans': 16,
    '1 Corinthians': 16,
    '2 Corinthians': 13,
    'Galatians': 6,
    'Ephesians': 6,
    'Philippians': 4,
    'Colossians': 4,
    '1 Thessalonians': 5,
    '2 Thessalonians': 3,
    '1 Timothy': 6,
    '2 Timothy': 4,
    'Titus': 3,
    'Philemon': 1,
    'Hebrews': 13,
    'James': 5,
    '1 Peter': 5,
    '2 Peter': 3,
    '1 John': 5,
    '2 John': 1,
    '3 John': 1,
    'Jude': 1,
    'Revelation': 22
};

// Sample Bible Verses Data (simplified)
const bibleVerses = {
    'John': {
        3: [
            { verse: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
            { verse: 17, text: 'For God did not send his Son into the world to condemn the world, but to save the world through him.' }
        ],
        11: [
            { verse: 35, text: 'Jesus wept.' },
            { verse: 36, text: 'Then the Jews said, "See how he loved him!"' }
        ]
    },
    'Romans': {
        3: [
            { verse: 23, text: 'for all have sinned and fall short of the glory of God' },
            { verse: 24, text: 'and all are justified freely by his grace through the redemption that came by Christ Jesus.' }
        ]
    },
    'Psalms': {
        23: [
            { verse: 1, text: 'The LORD is my shepherd, I lack nothing.' },
            { verse: 2, text: 'He makes me lie down in green pastures, he leads me beside quiet waters,' },
            { verse: 3, text: 'he refreshes my soul. He guides me along the right paths for his name\'s sake.' }
        ]
    },
    'Proverbs': {
        3: [
            { verse: 5, text: 'Trust in the LORD with all your heart and lean not on your own understanding;' },
            { verse: 6, text: 'in all your ways submit to him, and he will make your paths straight.' }
        ]
    },
    'Matthew': {
        6: [
            { verse: 33, text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' }
        ],
        5: [
            { verse: 3, text: '"Blessed are the poor in spirit, for theirs is the kingdom of heaven.' },
            { verse: 4, text: 'Blessed are those who mourn, for they will be comforted.' }
        ]
    },
    '1 Corinthians': {
        13: [
            { verse: 4, text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.' },
            { verse: 5, text: 'It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.' },
            { verse: 7, text: 'It always protects, always trusts, always hopes, always perseveres.' }
        ]
    },
    'Philippians': {
        4: [
            { verse: 6, text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' },
            { verse: 7, text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.' }
        ]
    }
};

// DOM Elements
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const verseDisplay = document.getElementById('verseDisplay');
const chapterNav = document.getElementById('chapterNav');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const favoritesList = document.getElementById('favoritesList');
const clearFavBtn = document.getElementById('clearFavBtn');

// State
let favorites = JSON.parse(localStorage.getItem('bibleFavorites')) || [];
let currentBook = '';
let currentChapter = '';

// Initialize
function init() {
    populateBooks();
    loadFavorites();
    setupEventListeners();
}

// Populate books dropdown
function populateBooks() {
    Object.keys(bibleBooks).forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = book;
        bookSelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    bookSelect.addEventListener('change', handleBookChange);
    chapterSelect.addEventListener('change', handleChapterChange);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    clearFavBtn.addEventListener('click', clearAllFavorites);
}

// Handle book selection
function handleBookChange(e) {
    currentBook = e.target.value;
    currentChapter = '';

    if (!currentBook) {
        chapterNav.style.display = 'none';
        verseDisplay.innerHTML = '<p class="placeholder">Select a book to view chapters</p>';
        return;
    }

    // Populate chapters
    chapterSelect.innerHTML = '<option value="">Choose a chapter...</option>';
    const chapterCount = bibleBooks[currentBook];
    
    for (let i = 1; i <= chapterCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i}`;
        chapterSelect.appendChild(option);
    }

    chapterNav.style.display = 'flex';
    verseDisplay.innerHTML = '<p class="placeholder">Select a chapter to view verses</p>';
}

// Handle chapter selection
function handleChapterChange(e) {
    currentChapter = e.target.value;

    if (!currentChapter) {
        verseDisplay.innerHTML = '<p class="placeholder">Select a chapter to view verses</p>';
        return;
    }

    displayVerses();
}

// Display verses
function displayVerses() {
    let verses = [];

    if (bibleVerses[currentBook] && bibleVerses[currentBook][currentChapter]) {
        verses = bibleVerses[currentBook][currentChapter];
    } else {
        verseDisplay.innerHTML = `<p class="placeholder">Verses for ${currentBook} ${currentChapter} are not available in this demo. This app includes sample verses for educational purposes. For a complete Bible app, integrate with a Bible API like Versearium, Bible API, or Scripture API.</p>`;
        return;
    }

    let html = '';
    verses.forEach(verseObj => {
        const verseKey = `${currentBook} ${currentChapter}:${verseObj.verse}`;
        const isFavorited = favorites.some(fav => fav.key === verseKey);

        html += `
            <div class="verse-item">
                <div class="verse-reference">${verseKey}</div>
                <div class="verse-text">${verseObj.text}</div>
                <div class="verse-actions">
                    <button class="fav-btn ${isFavorited ? 'added' : ''}" onclick="toggleFavorite('${verseKey}', '${verseObj.text.replace(/'/g, "\\'")}')">⭐ ${isFavorited ? 'Favorited' : 'Add to Favorites'}</button>
                    <button class="copy-btn" onclick="copyVerse('${verseKey}', '${verseObj.text.replace(/'/g, "\\'")}')">📋 Copy</button>
                </div>
            </div>
        `;
    });

    verseDisplay.innerHTML = html;
}

// Toggle favorite
function toggleFavorite(verseKey, verseText) {
    const existingIndex = favorites.findIndex(fav => fav.key === verseKey);

    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
    } else {
        favorites.push({ key: verseKey, text: verseText });
    }

    localStorage.setItem('bibleFavorites', JSON.stringify(favorites));
    displayVerses();
    loadFavorites();
}

// Copy verse to clipboard
function copyVerse(verseKey, verseText) {
    const text = `${verseKey} - ${verseText}`;
    navigator.clipboard.writeText(text).then(() => {
        alert('Verse copied to clipboard!');
    });
}

// Load and display favorites
function loadFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="placeholder">No favorite verses yet</p>';
        return;
    }

    let html = '';
    favorites.forEach((fav, index) => {
        html += `
            <div class="favorite-item">
                <div class="favorite-content">
                    <div class="favorite-ref">${fav.key}</div>
                    <div class="favorite-text">${fav.text}</div>
                </div>
                <button class="remove-fav-btn" onclick="removeFavorite(${index})">Remove</button>
            </div>
        `;
    });

    favoritesList.innerHTML = html;
}

// Remove favorite
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('bibleFavorites', JSON.stringify(favorites));
    loadFavorites();
    if (currentBook && currentChapter) {
        displayVerses();
    }
}

// Clear all favorites
function clearAllFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        localStorage.setItem('bibleFavorites', JSON.stringify(favorites));
        loadFavorites();
        if (currentBook && currentChapter) {
            displayVerses();
        }
    }
}

// Handle search
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a book name to search');
        return;
    }

    const matchedBook = Object.keys(bibleBooks).find(book =>
        book.toLowerCase().includes(query)
    );

    if (matchedBook) {
        bookSelect.value = matchedBook;
        handleBookChange({ target: { value: matchedBook } });
        chapterSelect.value = '1';
        handleChapterChange({ target: { value: '1' } });
        searchInput.value = '';
    } else {
        alert(`Book containing "${query}" not found`);
    }
}

// Initialize app on load
window.addEventListener('DOMContentLoaded', init);