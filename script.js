// script.js
let cookieCount = 0;
let upgradeCount = 0;
let autoClickerCount = 0;
let autoClickerUpgradeCount = 0;
let upgradeCost = 10;
let autoClickerCost = 100;
let autoClickerUpgradeCost = 200;
let cookiesPerClick = 1;
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

cookieElement.addEventListener('click', () => {
    cookieCount += cookiesPerClick;
    cookieCountElement.textContent = cookieCount;
    clickSound.play();
});

buyUpgradeButton.addEventListener('click', () => {
    if (cookieCount >= upgradeCost) {
        cookieCount -= upgradeCost;
        upgradeCount += 1;
        cookiesPerClick += 1;
        upgradeCost *= 2;

        cookieCountElement.textContent = cookieCount;
        upgradeCountElement.textContent = upgradeCount;
        buyUpgradeButton.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
    } else {
        alert('Not enough cookies!');
    }
});

buyAutoClickerButton.addEventListener('click', () => {
    if (cookieCount >= autoClickerCost) {
        cookieCount -= autoClickerCost;
        autoClickerCount += 1;
        autoClickerCost *= 2;

        cookieCountElement.textContent = cookieCount;
        autoClickerCountElement.textContent = autoClickerCount;
        buyAutoClickerButton.textContent = `Buy Auto-Clicker (Cost: ${autoClickerCost})`;

        if (autoClickerCount === 1) {
            autoClickerInterval = setInterval(() => {
                cookieCount += autoClickerCount;
                cookieCountElement.textContent = cookieCount;
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

        cookieCountElement.textContent = cookieCount;
        autoClickerUpgradeCountElement.textContent = autoClickerUpgradeCount;
        buyAutoClickerUpgradeButton.textContent = `Upgrade Auto-Clicker (Cost: ${autoClickerUpgradeCost})`;

        if (autoClickerCount > 0) {
            clearInterval(autoClickerInterval);
            autoClickerInterval = setInterval(() => {
                cookieCount += autoClickerCount * (1 + autoClickerUpgradeCount);
                cookieCountElement.textContent = cookieCount;
            }, 1000);
        }
    } else {
        alert('Not enough cookies!');
    }
});
