// Set saldo awal pemain
let saldo = 1000000;
let lastGachaItem = null;

// Daftar hadiah dan kemungkinan mendapatkannya
const rewards = [
    { item: "Alkha Mulet", basePrice: 50000, probability: 50 },
    { item: "Fadli Salto", basePrice: 75000, probability: 20 },
    { item: "Si Jomok", basePrice: 100000, probability: 10 },
    { item: "Super Fadli", basePrice: 150000, probability: 5},
    { item: "Padlikin", basePrice: 200000, probability: 0.000001 }
];

// Update saldo di tampilan
document.getElementById("saldo").innerText = saldo;

function gacha() {
    const biayaGacha = 50000;
    if (saldo < biayaGacha) {
        alert("Saldo Anda tidak cukup untuk gacha.");
        return;
    }

    saldo -= biayaGacha;
    document.getElementById("saldo").innerText = saldo;

    const randomNum = Math.random() * 100;
    let cumulativeProbability = 0;
    let hasil = "Tidak ada hadiah";

    for (let reward of rewards) {
        cumulativeProbability += reward.probability;
        if (randomNum <= cumulativeProbability) {
            hasil = reward.item;
            lastGachaItem = reward;
            break;
        }
    }

    document.getElementById("hasilGacha").innerText = hasil;
    document.getElementById("jualButton").disabled = false;
    document.getElementById("hargaJual").innerText = "-";
}

function jualItem() {
    if (!lastGachaItem) return;

    let hargaJual = lastGachaItem.basePrice;
    const randomChance = Math.random();

    if (randomChance < 0.1) { 
        hargaJual *= 2; 
    } else if (lastGachaItem.item === "Padlikin" && randomChance < 0.01) {
        hargaJual *= 10; 
    }

    const konfirmasi = confirm(`Apakah Anda yakin ingin menjual ${lastGachaItem.item} seharga Rp${hargaJual}?`);
    if (konfirmasi) {
        saldo += hargaJual;
        document.getElementById("saldo").innerText = saldo;
        alert(`${lastGachaItem.item} berhasil dijual seharga Rp${hargaJual}`);
        document.getElementById("hasilGacha").innerText = "Belum ada";
        lastGachaItem = null;
        document.getElementById("jualButton").disabled = true;
    } else {
        alert("Penjualan dibatalkan.");
    }
    document.getElementById("hargaJual").innerText = `Rp${hargaJual}`;
}
