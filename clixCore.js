var wallet = 0;
var second = new Date().getSeconds();

var autoClickArray = [];

var prodValues = {
    totalProducedEnergy: 0,
    elapsedTime: 0,
    totalClick: 0,
    jPerWatt: 0,
    gain: 0
};

var levelValues = {
    level: 0,
    energyToBeProduced: (Math.random() * 10 + 10),
    speedBonus: .25,
    status: false
};

var bonuses = {
    speedBonus: 100,
    totalEnergyBonus: 100,
    autoClickBonus: 100
};
// Game Data

const updateBonuses = () => {
    $("#speedBonusPrice").text(bonuses.speedBonus.toFixed(2));
    $("#totalEnergyBonusPrice").text(bonuses.totalEnergyBonus.toFixed(2));
    $("#autoClickBonusPrice").text(bonuses.autoClickBonus.toFixed(2));
};

const updateWallet = () => {
    $("#wallet").text(wallet.toFixed(2));
};

const updateLevelStatus = () => {
    $("#level").text(levelValues.level);
    $("#energyToBeProduced").text(levelValues.energyToBeProduced);
    $("#speedBonus").text(levelValues.speedBonus);
    $("#status").text(levelValues.status);
};

const updateProdStatus = () => {
    $("#totalProducedEnergy").text(prodValues.totalProducedEnergy);
    $("#elapsedTime").text(prodValues.elapsedTime);
    $("#totalClick").text(prodValues.totalClick);
    $("#jPerWatt").text(prodValues.jPerWatt);
    $("#gain").text(prodValues.gain);
};

const click = () => {
    prodValues.totalClick += 1;
    totalProducedEnergy += (1 - (Math.E / Math.PI)) * speedBonus;
    //(Math.random() / Math.E)**Math.PI;//(0.09 + (Math.random() / (Math.E)));
}
// Functions

var elapsedTime = prodValues.elapsedTime;
var jPerWatt = prodValues.jPerWatt;
var totalProducedEnergy = prodValues.totalProducedEnergy;
var gain = prodValues.gain;
var energyToBeProduced = levelValues.energyToBeProduced;
var speedBonus = levelValues.speedBonus;

$("#produce").on("click", click);

$("#levelUpButton").on("click", () => {
    if (totalProducedEnergy - levelValues.energyToBeProduced > 0) {
        totalProducedEnergy -= levelValues.energyToBeProduced;
        levelValues.level += 1;
        energyToBeProduced += (Math.random() * speedBonus + 10) + (energyToBeProduced);
        speedBonus *= 1.5;

        gain += (jPerWatt / totalProducedEnergy);
        wallet += gain;
        gain = 0;
    }
});

$("#speedBonusx").on("click", () => {
    if (wallet >= bonuses.speedBonus) {
        speedBonus += 1/levelValues.energyToBeProduced + speedBonus;
        wallet -= bonuses.speedBonus;
        bonuses.speedBonus *= (bonuses.speedBonus/51);
    }
});

$("#totalEnergyBonus").on("click", () => {
    if (wallet >= bonuses.totalEnergyBonus) {
        totalProducedEnergy += totalProducedEnergy * 0.15;
        wallet -= bonuses.totalEnergyBonus;
        bonuses.totalEnergyBonus += (bonuses.totalEnergyBonus/21);
    }
});

$("#autoClickBonus").on("click", () => {
    if (wallet >= bonuses.autoClickBonus) {
        autoClickArray.push(click);
        wallet -= bonuses.autoClickBonus;
        bonuses.autoClickBonus *= (bonuses.autoClickBonus/40);
    }
});

const main = () => {
    setInterval(() => {
        elapsedTime = elapsedTime + 1 / 10;
        jPerWatt = (totalProducedEnergy / ((elapsedTime)/prodValues.totalClick)) * levelValues.speedBonus;
        // Calculations

        if (elapsedTime.toFixed(2) % 60 == 0) {
            gain += (jPerWatt / totalProducedEnergy);
            wallet += gain;
        }
        gain = 0;
        // Withdraw
        
        /*var sec = new Date().getSeconds();
        if (second < sec) {            
            // elapsedTime += 1;

            autoClickArray.forEach(clickFunction => {
                clickFunction();
            });
            second = sec;
        }*/

        autoClickArray.forEach(clickFunction => {
            clickFunction();
        });

        prodValues.elapsedTime = Math.floor(elapsedTime);
        prodValues.jPerWatt = jPerWatt.toFixed(2);
        prodValues.totalProducedEnergy = totalProducedEnergy.toFixed(2);
        prodValues.gain = gain.toFixed(2);
        levelValues.energyToBeProduced = energyToBeProduced.toFixed(2);
        levelValues.speedBonus = speedBonus.toFixed(2);
        // Display

        updateLevelStatus();
        updateProdStatus();
        updateBonuses();
        updateWallet();
    }, 100);
}

$(document).on("keydown", (event) => {
    if (event.key === "q") {
        wallet += 100;
    }
});

main();
