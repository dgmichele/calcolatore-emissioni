// Funzione per il calcolo delle emissioni energetiche
function calcolaEmissioniEnergia(consumoEnergetico) {
    return consumoEnergetico * 0.233;
}

// Funzione per il calcolo delle emissioni dei trasporti
function calcolaEmissioniTrasporto(chilometriPercorsi) {
    return chilometriPercorsi * 0.21;
}

// Funzione per calcolare le emissioni totali
function calcolaEmissioniTotali(consumoEnergetico, chilometriPercorsi) {
    let emissioniEnergetiche = calcolaEmissioniEnergia(consumoEnergetico);
    let emissioniTrasporto = calcolaEmissioniTrasporto(chilometriPercorsi);
    return emissioniEnergetiche + emissioniTrasporto;
}
    // Aggiungiamo un event listener al form per gestire il submit
    document.getElementById('emissioniForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Preveniamo il comportamento di default del form

        // Prendiamo i valori scritti da un utente dagli input 'energia' e 'chilometri'
        let consumoEnergetico = parseFloat(document.getElementById('energia').value);
        let chilometriPercorsi = parseFloat(document.getElementById('chilometri').value);

        // Calcoliamo le emissioni totali
        let emissioniTotali = calcolaEmissioniTotali(consumoEnergetico, chilometriPercorsi);

        // Aggiungiamo un margine dinamico al contenitore del risultato
        document.querySelector('.risultato-emissioni').style.marginTop = '20px';

        //Ora dobbiamo stampare il risultato 
 
        let indicatoreRisultato = document.getElementById('indicatore-risultato');

        // Controlliamo se il paragrafo esiste già, se non esiste, lo creiamo
        if (!indicatoreRisultato) {
            indicatoreRisultato = document.createElement('p');
            indicatoreRisultato.id = 'indicatore-risultato';  // Assegniamo un id allo span
            // Individuiamo il contenitore e aggiungiamo il nuovo <span>
            let calcoloRisultato = document.querySelector('.risultato-emissioni');
            calcoloRisultato.append(indicatoreRisultato);
        }

            indicatoreRisultato.innerText = "Risultato: "

        // Dobbiamo evitare che i risultati delle emissioni si concatenino in molteplici <span>, quindi...
        let spanRisultato = document.getElementById('risultato-span');

        // Controlliamo se lo span esiste già, se non esiste, lo creiamo
        if (!spanRisultato) {
            spanRisultato = document.createElement('span');
            spanRisultato.id = 'risultato-span';  // Assegniamo un id allo span
            // Individuiamo il contenitore e aggiungiamo il nuovo <span>
            let calcoloRisultato = document.querySelector('.risultato-emissioni');
            calcoloRisultato.append(spanRisultato);
        }

        // Aggiorniamo il contenuto dello span con il risultato
        spanRisultato.innerText = `${emissioniTotali.toFixed(2)} kg di CO₂`;
    });