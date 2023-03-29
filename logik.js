var today = new Date().toISOString().slice(0, 10)

// Klasse
class Blok {
    constructor (i, dato, data, tidligere_hash) {
        this.i = i
        this.dato = dato
        this.data = data
        this.tidligere_hash = tidligere_hash
        this.hash = this.hashBlok()
    }

    // Funktion i klassen: hasher'en
    hashBlok () {
        var streng = this.i + this.dato + this.data + this.tidligere_hash
        var sha256 = new jsSHA('SHA-256', 'TEXT');
        sha256.update(streng);
        var hash = sha256.getHash("HEX");
        return hash
    }
}

function lavGenesisBlok() {
    return new Blok(0, today, "Genesis Block", "0")
}

function nyBlok(lastBlock, randomNumber) {
    var thisIndex = lastBlock.i + 1
    var thisTimestamp = today
    var thisData = randomNumber
    var thisHash = lastBlock.hash

    return new Blok(thisIndex, thisTimestamp, thisData, thisHash)
}


var antal = 20
var blockchain = [lavGenesisBlok()]
var previousBlock = blockchain[0]
let mainChain = document.getElementById('main_chain');
var chainids = document.getElementById('chain_ids');
var chainblk = document.getElementById('chain_blk');


for (let i = 0; i < antal; i++) {
    let randn = Math.floor((Math.random() * 2));
    var blockToAdd = nyBlok(previousBlock, randn)

    blockchain.push(blockToAdd)
    previousBlock = blockToAdd

    if (i > 0) {
        mainChain.innerHTML += `<div class="row">
                               <div class="cols col-1" id="chain_ids"># ${blockToAdd.i}</div>
                               <div class="cols col-11" id="chain_blk">
                                    <div class="row"><div class="col">Dato: ${blockToAdd.dato}</div></div>
                                    <div class="row"><div class="col">Tidligere hash: ${blockchain[i].hash}</div></div>
                                    <div class="row"><div class="col">Ny hash: ${blockToAdd.hash}</div></div>
                                    <div class="row"><div class="col">Data: ${blockToAdd.data}</div></div>
                               </div>
                            </div>`;
    } else {
        
        // Genesis-blokken
        mainChain.innerHTML += `<div class="row">
                               <div class="cols col-1" id="chain_ids"># ${blockToAdd.i}</div>
                               <div class="cols col-11" id="chain_blk">
                                    <div class="row"><div class="col">Date: ${blockToAdd.dato}</div></div>
                                    <div class="row"><div class="col">Tidligere hash: 0</div></div>
                                    <div class="row"><div class="col">Ny hash: ${blockToAdd.hash}</div></div>
                                    <div class="row"><div class="col">Data: N/A</div></div>
                               </div>
                            </div>`;
    }
}
