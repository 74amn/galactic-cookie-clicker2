// script.js
let cookieCount = parseInt(localStorage.getItem('cookieCount')) || 0;
let upgradeCount = parseInt(localStorage.getItem('upgradeCount')) || 0;
let autoClickerCount = parseInt(localStorage.getItem('autoClickerCount')) || 0;
let autoClickerUpgradeCount = parseInt(localStorage.getItem('autoClickerUpgradeCount')) || 0;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
let autoClickerCost = parseInt(localStorage.getItem('autoClickerCost')) || 100;
let autoClickerUpgradeCost = parseInt(localStorage.getItem('autoClickerUpgradeCost')) || 200;
let cookiesPerClick = parseInt(localStorage.getItem('cookiesPerClick')) || 1;
let autoClickerInterval;

const cookieElement = document.getElementById('cookie');
const cookieCountElement = document.getElementById('cookie-count');
const buyUpgradeButton = document.getElementById('buy-upgrade');
const buyAutoClickerButton = document.getElementById('buy-auto-clicker');
const buyAutoClickerUpgradeButton = document.getElementById('buy-auto-clicker-upgrade');
const upgradeCountElement = document.getElementById('upgrade-count');
const autoClickerCountElement = document.getElementById('auto-clicker-count');
const autoClickerUpgradeCountElement = document.getElementById('auto-clicker-upgrade-count');
const clickSound = document.getElementById('click-sound');

// Обновление отображения данных на экране
function updateDisplay() {
    cookieCountElement.textContent = cookieCount;
    upgradeCountElement.textContent = upgradeCount;
    autoClickerCountElement.textContent = autoClickerCount;
    autoClickerUpgradeCountElement.textContent = autoClickerUpgradeCount;
    buyUpgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
    buyAutoClickerButton.textContent = `Buy Auto-Clicker (Cost: ${autoClickerCost})`;
    buyAutoClickerUpgradeButton.textContent = `Upgrade Auto-Clicker (Cost: ${autoClickerUpgradeCost})`;
}

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem('cookieCount', cookieCount);
    localStorage.setItem('upgradeCount', upgradeCount);
    localStorage.setItem('autoClickerCount', autoClickerCount);
    localStorage.setItem('autoClickerUpgradeCount', autoClickerUpgradeCount);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('autoClickerCost', autoClickerCost);
    localStorage.setItem('autoClickerUpgradeCost', autoClickerUpgradeCost);
    localStorage.setItem('cookiesPerClick', cookiesPerClick);
}

cookieElement.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    cookieCountElement.textContent = cookieCount;
    clickSound.play();
    saveData();
});

buyUpgradeButton.addEventListener('click', () => {
    if (cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost;
        upgradeCount += 1;
        cookiesPerClick += 1;
        upgradeCost *= 2;

        updateDisplay();
        saveData();
    } else {
        alert('Not enough cookies!');
    }
});

buyAutoClickerButton.addEventListener('click', () => {
    if (cookieCount >= autoClickerCost) {
        cookieCount -= autoClickerCost;
        autoClickerCount += 1;
        autoClickerCost *= 2;

        updateDisplay();
        saveData();

        if (autoClickerCount === 1) {
            autoClickerInterval = setInterval(() => {
                cookieCount += autoClickerCount * (1 + autoClickerUpgradeCount);
                cookieCountElement.textContent = cookieCount;
                saveData();
            }, 1000);
        }
    } else {
        alert('Not enough cookies!');
    }
});

buyAutoClickerUpgradeButton.addEventListener('click', () => {
    if (cookieCount >= autoClickerUpgradeCost) {
        cookieCount -= autoClickerUpgradeCost;
        autoClickerUpgradeCount += 1;
        autoClickerUpgradeCost *= 2;

        updateDisplay();
        saveData();

        if (autoClickerCount > 0) {
            clearInterval(autoClickerInterval);
            autoClickerInterval = setInterval(() => {
                cookieCount += autoClickerCount * (1 + autoClickerUpgradeCount);
                cookieCountElement.textContent = cookieCount;
                saveData();
            }, 1000);
        }
    } else {
        alert('Not enough cookies!');
    }
});

updateDisplay();

if (autoClickerCount > 0) {
    autoClickerInterval = setInterval(() => {
        cookieCount += autoClickerCount * (1 + autoClickerUpgradeCount);
        cookieCountElement.textContent = cookieCount;
        saveData();
    }, 1000);
}
