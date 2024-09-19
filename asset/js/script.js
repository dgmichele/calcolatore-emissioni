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
        spanRisultato.innerText = `${emissioniTotali.toFixed(2)} kg di CO2`;

         // Creiamo un nuovo paragrafo in cui stampare il banner di valutazione
        let nuovoParagrafo = document.getElementById('risultato')

        // Controlliamo se il paragrafo esiste già, se non esiste, lo creiamo
        if(!nuovoParagrafo) {
            let nuovoParagrafo = document.createElement('p');
            nuovoParagrafo.id = 'risultato';
            // Individuiamo il contenitore e aggiungiamo il nuovo <p>
            let testoRisultato = document.querySelector('.interno-calcolatore');
            testoRisultato.append(nuovoParagrafo);
        }

        if(emissioniTotali < 50){
            // Mostriamo il risultato a schermo
            document.getElementById('risultato').innerText = "✅ Sei un top cittadino!";

            // Cerchiamo il banner (l'elemento con id 'risultato')
            let banner = document.getElementById('risultato');
            
            // Otteniamo la posizione del banner rispetto alla finestra del browser
            let posizioneBanner = banner.getBoundingClientRect();
            
            // Calcoliamo l'origine dei coriandoli in base alla posizione del banner
            // (posizioneBanner.left + posizioneBanner.right) / 2 restituisce il centro del banner in termini di larghezza
            // (posizioneBanner.top + posizioneBanner.bottom) / 2 restituisce il centro del banner in termini di larghezza
            // i risultati delle operazioni sopra, divise per document.documentElement.client... , restituiscono un valore tra 0 e 1, utile per assegnare le coordinate alla funzione "confetti"
            let bannerX = (posizioneBanner.left + posizioneBanner.right) / 2 / document.documentElement.clientWidth;  // Coordinata orizzontale
            let bannerY = (posizioneBanner.top + posizioneBanner.bottom) / 2 / document.documentElement.clientHeight; // Coordinata verticale

            // Lancia i coriandoli dall'area del banner
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: bannerX, y: bannerY }
            });

        } else {
            // Se si supera 50 mostriamo un banner rosso per indicare il risultato negativo
            document.getElementById('risultato').innerText = "❌ Ma quanto inquini?!";
            document.getElementById('risultato').style.color = 'red';
            document.getElementById('risultato').style.backgroundColor = '#fffef2';
            document.getElementById('risultato').style.padding = '20px 30px';
            document.getElementById('risultato').style.borderRadius = '7px';
            document.getElementById('risultato').style.border = '2px solid red';
            document.getElementById('risultato').style.borderLeft = '7px solid red';
        }
    });