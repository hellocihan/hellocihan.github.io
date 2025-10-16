// counter.js

// Sayaç kontrolü için fonksiyonlar
function getCounterData() {
    const data = localStorage.getItem('copyCounter');
    if (!data) {
        return { count: 12, lastReset: Date.now() };
    }
    return JSON.parse(data);
}

function saveCounterData(count, lastReset) {
    localStorage.setItem('copyCounter', JSON.stringify({ count, lastReset }));
}

function checkAndResetCounter() {
    const data = getCounterData();
    const now = Date.now();
    const hoursPassed = (now - data.lastReset) / (1000 * 60 * 60);
    
    if (hoursPassed >= 24) {
        // 24 saat geçti, sıfırla
        saveCounterData(12, now);
        return 12;
    }
    return data.count;
}

function updateCopyButton() {
    const count = checkAndResetCounter();
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.textContent = `Copy`;
    }
}

function decrementCounter() {
    let count = checkAndResetCounter();
    
    // Sayaç 0'ın altına düşebilir (engelleme yok)
    count = count - 1;
    const data = getCounterData();
    saveCounterData(count, data.lastReset);
    
    return true; // Her zaman başarılı
}