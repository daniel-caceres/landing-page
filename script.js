let currentLang = 'es';
let translations = {};

// Cargar las traducciones
async function loadTranslations() {
    try {
        const response = await fetch(`translations/${currentLang}.json`);
        translations = await response.json();
        updatePageTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Obtener el valor traducido usando una clave anidada (e.g., 'nav.home')
function getTranslatedValue(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], translations) || key;
}

// Actualizar todos los elementos con atributo data-i18n
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslatedValue(key);
    });

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = currentLang;
}

// Cambiar el idioma
async function toggleLanguage() {
    const button = document.querySelector('.lang-switch');
    currentLang = currentLang === 'es' ? 'en' : 'es';
    button.textContent = currentLang === 'es' ? 'EN' : 'ES';
    
    await loadTranslations();
}

// Cargar las traducciones iniciales
document.addEventListener('DOMContentLoaded', loadTranslations);
