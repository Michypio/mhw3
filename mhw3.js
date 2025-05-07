document.querySelectorAll('.prodotto button').forEach(button => {
    button.addEventListener('click', (event) => {
        const prodotto = event.target.closest('.prodotto');
        const nomeProdotto = prodotto.querySelector('h3').innerText;
        const prezzoProdotto = prodotto.querySelector('p').innerText;
        
        alert(`Hai acquistato: ${nomeProdotto}\nPrezzo: ${prezzoProdotto}`);
    });
});

document.querySelector('.header-center a').addEventListener('click', (event) => {
    const header = document.querySelector('.header');
    header.style.backgroundImage = "url('nuovo_sfondo.jpeg')";
});

document.querySelectorAll('.prodotto button').forEach(button => {
    button.addEventListener('click', (event) => {
        const messaggio = document.createElement('div');
        messaggio.classList.add('messaggio-acquisto');
        messaggio.innerHTML = '<p>Acquisto confermato!</p>';
        
        document.body.appendChild(messaggio);
        setTimeout(() => {
            messaggio.remove();
        }, 3000);
    });
});

document.querySelector('.albo .nascondi-pulsante').addEventListener('click', () => {
    const albo = document.querySelector('.albo');
    const mostra = document.querySelector('.shop .mostra-pulsante');
    albo.classList.add('hidden');
    mostra.classList.remove('hidden');
});

document.querySelector('.shop .mostra-pulsante').addEventListener('click', () => {
    const mostra = document.querySelector('.shop .mostra-pulsante');
    const albo = document.querySelector('.albo');
    albo.classList.remove('hidden');
    mostra.classList.add('hidden');
});

// Configurazione API News
const NEWS_API_KEY = 'secret'; // Nuova chiave API
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Funzione per recuperare le notizie in tempo reale
async function fetchLatestNews() {
    try {
        const response = await fetch(`${NEWS_API_URL}?q=inter+milan+football&language=it&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            const notizieContainer = document.querySelector('.notizie-container');
            notizieContainer.innerHTML = ''; // Pulisce il contenitore esistente

            // Prendi le prime 4 notizie
            const latestNews = data.articles.slice(0, 4);

            latestNews.forEach(news => {
                const notizia = document.createElement('div');
                notizia.className = 'notizia';
                
                // Usa un'immagine di fallback se non c'è un'immagine nella notizia
                const imageUrl = news.urlToImage || 'placeholder.jpg';
                
                notizia.innerHTML = `
                    <img src="${imageUrl}" alt="${news.title}">
                    <p>${news.title}</p>
                `;
                
                // Aggiungi click handler per aprire la notizia completa
                notizia.addEventListener('click', () => {
                    window.open(news.url, '_blank');
                });

                notizieContainer.appendChild(notizia);
            });
        }
    } catch (error) {
        console.error('Errore nel recupero delle notizie:', error);
    }
}

// Aggiorna le notizie ogni 5 minuti
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestNews(); // Carica le notizie all'avvio
    setInterval(fetchLatestNews, 300000); // Aggiorna ogni 5 minuti
});

document.addEventListener('DOMContentLoaded', () => {
    const btnMostraPartite = document.getElementById('mostra-altre-partite');
    const partiteContainer = document.querySelector('.partite-container');
    const partiteOriginali = Array.from(partiteContainer.children);
    
    btnMostraPartite.addEventListener('click', () => {
        partiteContainer.classList.add('show-all');
        const nuovePartite = [
            {
                data: "27 Apr 2025 - 20:45",
                squadraCasa: "Inter",
                squadraOspite: "Roma",
                stadio: "San Siro, Milano"
            },
            {
                data: "04 Mag 2025 - 18:00",
                squadraCasa: "Inter",
                squadraOspite: "Verona",
                stadio: "San Siro, Milano"
            },
            {
                data: "11 Mag 2025 - 20:45",
                squadraCasa: "Torino",
                squadraOspite: "Inter",
                stadio: "Olimpico Grande Torino, Torino"
            },
            {
                data: "18 Mag 2025 - 20:45",
                squadraCasa: "Inter",
                squadraOspite: "Lazio",
                stadio: "San Siro, Milano"
            },
            {
                data: "25 Mag 2025 - 20:45",
                squadraCasa: "Como",
                squadraOspite: "Inter",
                stadio: "Stadio Giuseppe Sinigaglia, Como"
             },

        ];

        nuovePartite.forEach(partita => {
            const partitaElement = document.createElement('div');
            partitaElement.className = 'partita';
            partitaElement.innerHTML = `
                <p class="data">${partita.data}</p>
                <div class="squadre">
                    <span>${partita.squadraCasa}</span>
                    <span>vs</span>
                    <span>${partita.squadraOspite}</span>
                </div>
                <p class="stadio">${partita.stadio}</p>
                <img src="scudetto.png" >
            `;

            // Aggiungi quote di esempio per ogni partita
            const quoteEsempio = {
                homeWin: 1.85 + Math.random() * 0.5,
                draw: 3.50 + Math.random() * 0.5,
                awayWin: 4.25 + Math.random() * 0.5
            };
            updateOddsUI(partitaElement, quoteEsempio);
            
            partiteContainer.appendChild(partitaElement);
        });

        btnMostraPartite.style.display = 'none';
        
        const btnTornaIndietro = document.createElement('button');
        btnTornaIndietro.id = 'torna-indietro';
        btnTornaIndietro.textContent = 'Mostra meno partite';
        btnTornaIndietro.addEventListener('click', () => {
            partiteContainer.classList.remove('show-all');
            partiteContainer.innerHTML = '';
            partiteOriginali.forEach(partita => {
                partiteContainer.appendChild(partita.cloneNode(true));
            });
            btnMostraPartite.style.display = 'inline-block';
            btnTornaIndietro.remove();
        });
        
        document.querySelector('.partite').appendChild(btnTornaIndietro);
    });

    const giocatori = [
        {
            nome: "Yann Sommer",
            numero: "1",
            ruolo: "Portiere",
            immagine: "sommer.webp",
            nazionalita: "Svizzera"
        },
        {
            nome: "Josep Martinez",
            numero: "13",
            ruolo: "Portiere",
            immagine: "josep.webp",
            nazionalita: "Spagna"
        },
        {
            nome: "Raffaele Di Gennaro",
            numero: "12",
            ruolo: "Portiere",
            immagine: "di_gennaro.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Stefan De Vrij",
            numero: "6",
            ruolo: "Difensore",
            immagine: "devrij.webp",
            nazionalita: "Olanda"
        },
        {
            nome: "Francesco Acerbi",
            numero: "15",
            ruolo: "Difensore",
            immagine: "acerbi.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Alessandro Bastoni",
            numero: "95",
            ruolo: "Difensore",
            immagine: "bastoni.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Benjamin Pavard",
            numero: "28",
            ruolo: "Difensore",
            immagine: "pavard.webp",
            nazionalita: "Francia"
        },
        {
            nome: "Federico Dimarco",
            numero: "32",
            ruolo: "Difensore",
            immagine: "dimarco.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Matteo Darmian",
            numero: "36",
            ruolo: "Difensore",
            immagine: "darmian.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Carlos Augusto",
            numero: "30",
            ruolo: "Difensore",
            immagine: "carlos.webp",
            nazionalita: "Brasile"
        },
        {
            nome: "Denzel Dumfries",
            numero: "2",
            ruolo: "Difensore",
            immagine: "dumfries.webp",
            nazionalita: "Olanda"
        },
        {
            nome: "Yann Bisseck",
            numero: "31",
            ruolo: "Difensore",
            immagine: "bisseck.webp",
            nazionalita: "Germania"
        },
        {
            nome: "Nicolò Barella",
            numero: "23",
            ruolo: "Centrocampista",
            immagine: "barella.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Hakan Çalhanoğlu",
            numero: "20",
            ruolo: "Centrocampista",
            immagine: "calhanoglu.webp",
            nazionalita: "Turchia"
        },
        {
            nome: "Henrikh Mkhitaryan",
            numero: "22",
            ruolo: "Centrocampista",
            immagine: "mkhitaryan.webp",
            nazionalita: "Armenia"
        },
        {
            nome: "Kristjan Asllani",
            numero: "21",
            ruolo: "Centrocampista",
            immagine: "asllani.webp",
            nazionalita: "Albania"
        },
        {
            nome: "Davide Frattesi",
            numero: "16",
            ruolo: "Centrocampista",
            immagine: "frattesi.webp",
            nazionalita: "Italia"
        },
        {
            nome: "Piotr Zielinski",
            numero: "7",
            ruolo: "Centrocampista",
            immagine: "zielinski.webp",
            nazionalita: "Polonia"  
        },
        {
            nome: "Nicola Zalewski",
            numero: "59",
            ruolo: "Centrocampista",
            immagine: "zalewski.webp",
            nazionalita: "Polonia"
        },
        {
            nome: "Valentin Carboni",
            numero: "45",
            ruolo: "Centrocampista",
            immagine: "carboni.webp",
            nazionalita: "Argentina"    
        },
        {
            nome: "Lautaro Martinez",
            numero: "10",
            ruolo: "Attaccante",
            immagine: "lautaro.webp",
            nazionalita: "Argentina"
        },
        {
            nome: "Marcus Thuram",
            numero: "9",
            ruolo: "Attaccante",
            immagine: "thuram.webp",
            nazionalita: "Francia"
        },
        {
            nome: "Marko Arnautovic",
            numero: "8",
            ruolo: "Attaccante",
            immagine: "arnautovic.webp",
            nazionalita: "Austria"
        },
        {
            nome: "Joaquin Correa",
            numero: "11",
            ruolo: "Attaccante",
            immagine: "correa.webp",
            nazionalita: "Argentina"
        },
        {
            nome: "Mehdi Taremi",
            numero: "99",
            ruolo: "Attaccante",
            immagine: "taremi.webp",
            nazionalita: "Iran" 
        }
    ];
    const allenatore = {
        nome: "Simone Inzaghi",
        ruolo: "Allenatore",
        immagine: "inzaghi.webp",
        nazionalita: "Italia"
    };

    const rosaSection = document.createElement('section');
    rosaSection.className = 'rosa';

    const titolo = document.createElement('h2');
    titolo.textContent = 'Rosa';

    const filtriContainer = document.createElement('div');
    filtriContainer.className = 'filtri-ruolo';
    
    const ruoli = ['Tutti', 'Portiere', 'Difensore', 'Centrocampista', 'Attaccante', 'Allenatore'];
    ruoli.forEach(ruolo => {
        const button = document.createElement('button');
        button.textContent = ruolo;
        button.className = 'filtro-btn';
        button.addEventListener('click', () => {
            filtriContainer.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const cards = container.querySelectorAll('.giocatore-card');
            cards.forEach(card => {
                if (ruolo === 'Tutti' || card.dataset.ruolo === ruolo) {
                    card.classList.add('visible');
                    card.classList.remove('hidden');
                } else {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                }
            });

            container.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        });
        filtriContainer.appendChild(button);
    });

    rosaSection.append(titolo, filtriContainer);

    const container = document.createElement('div');
    container.className = 'rosa-container';

    giocatori
        .sort((a, b) => parseInt(a.numero) - parseInt(b.numero))
        .forEach(giocatore => {
            const card = document.createElement('div');
            card.className = 'giocatore-card visible';
            card.dataset.ruolo = giocatore.ruolo;
            card.dataset.nazionalita = giocatore.nazionalita;

            const numero = document.createElement('span');
            numero.className = 'numero';
            numero.textContent = giocatore.numero;

            const headerInfo = document.createElement('div');
            headerInfo.className = 'header-info';

            const [nome, ...cognomeParts] = giocatore.nome.split(' ');
            const cognome = cognomeParts.join(' ');

            const nomeElement = document.createElement('span');
            nomeElement.className = 'nome';
            nomeElement.textContent = nome;

            const cognomeElement = document.createElement('span');
            cognomeElement.className = 'cognome';
            cognomeElement.textContent = cognome;

            const ruolo = document.createElement('span');
            ruolo.className = 'ruolo';
            ruolo.textContent = giocatore.ruolo.substring(0, 3).toUpperCase(); // Abbrevia il ruolo

            const img = document.createElement('img');
            img.src = giocatore.immagine;
            img.alt = giocatore.nome;

            headerInfo.append(nomeElement, cognomeElement, ruolo);
            card.append(numero, headerInfo, img);
            container.appendChild(card);
        });

    // Anche per l'allenatore
    const allenatoreCard = document.createElement('div');
    allenatoreCard.className = 'giocatore-card visible';
    allenatoreCard.dataset.ruolo = 'Allenatore';
    allenatoreCard.dataset.nazionalita = allenatore.nazionalita;

    const headerInfoAll = document.createElement('div'); // rinominato per evitare duplicati
    headerInfoAll.className = 'header-info';

    const [nomeAll, ...cognomePartsAll] = allenatore.nome.split(' ');
    const cognomeAll = cognomePartsAll.join(' ');

    const nomeElementAll = document.createElement('span');
    nomeElementAll.className = 'nome';
    nomeElementAll.textContent = nomeAll;

    const cognomeElementAll = document.createElement('span');
    cognomeElementAll.className = 'cognome';
    cognomeElementAll.textContent = cognomeAll;

    const ruoloAll = document.createElement('span');
    ruoloAll.className = 'ruolo';
    ruoloAll.textContent = 'ALL';

    const imgAll = document.createElement('img');
    imgAll.src = allenatore.immagine;
    imgAll.alt = allenatore.nome;

    headerInfoAll.append(nomeElementAll, cognomeElementAll, ruoloAll);
    allenatoreCard.append(headerInfoAll, imgAll);
    container.appendChild(allenatoreCard);

    rosaSection.appendChild(container);

    document.querySelector('.notizie').after(rosaSection);

    const sidebarOpen = document.querySelector('.sidebar-open');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    if (sidebarOpen && mobileSidebar && sidebarClose) {
        sidebarOpen.addEventListener('click', () => {
            mobileSidebar.classList.remove('hidden');  // rimuove la classe che nasconde il menu
            mobileSidebar.classList.add('active');
            document.body.classList.add('no-scroll'); // disabilita lo scroll aggiungendo la classe
            sidebarOpen.innerText = '🔍';  // cambia il testo a lente dopo l'apertura
        });
        sidebarClose.addEventListener('click', () => {
            mobileSidebar.classList.remove('active');
            mobileSidebar.classList.add('hidden');  // aggiunge la classe per nascondere il menu
            document.body.classList.remove('no-scroll'); // riabilita lo scroll rimuovendo la classe
            sidebarOpen.innerText = '☰';  // ripristina il testo hamburger
        });
    }

    // Aggiungi gestione ricerca mobile
    const searchBtn = document.querySelector('.search-btn-mobile');
    const searchBar = document.querySelector('.search-bar-mobile');
    const closeSearch = document.querySelector('.close-search');
    const sidebarOpenBtn = document.querySelector('.sidebar-open');

    searchBtn.addEventListener('click', () => {
        searchBar.classList.add('active');
        searchBar.classList.remove('hidden');
        searchBtn.style.display = 'none';
        sidebarOpenBtn.style.display = 'none';
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchBar.classList.add('hidden');
        searchBtn.style.display = 'block';
        sidebarOpenBtn.style.display = 'block';
    });

    // Aggiungi gestione ricerca desktop
    const searchIcon = document.querySelector('.search-icon');
    const searchBarDesktop = document.querySelector('.search-bar-desktop');
    const closeSearchDesktop = document.querySelector('.close-search-desktop');

    searchIcon.addEventListener('click', () => {
        searchBarDesktop.classList.remove('hidden');
        searchIcon.style.display = 'none';
    });

    closeSearchDesktop.addEventListener('click', () => {
        searchBarDesktop.classList.add('hidden');
        searchIcon.style.display = 'block';
    });
});

// Configurazione The Odds API
const ODDS_API_KEY = 'secret';
const ODDS_API_URL = 'https://api.the-odds-api.com/v4/sports';

// Funzione per recuperare le quote delle partite
async function getMatchOdds() {
    try {
        const response = await fetch(`${ODDS_API_URL}/soccer_italy_serie_a/odds/?apiKey=${ODDS_API_KEY}&regions=eu&markets=h2h`);
        const data = await response.json();
        return data.filter(match => 
            match.home_team.includes('Inter') || 
            match.away_team.includes('Inter')
        );
    } catch (error) {
        console.error('Errore nel recupero quote:', error);
        return getFallbackOdds();
    }
}

// Dati di fallback per le quote
function getFallbackOdds() {
    return [
        {
            home_team: 'Inter',
            away_team: 'Roma',
            bookmakers: [{
                markets: [{
                    outcomes: [
                        { name: "Inter", price: 1.85 },
                        { name: "Draw", price: 3.50 },
                        { name: "Roma", price: 4.25 }
                    ]
                }]
            }]
        }
    ];
}

// Funzione per aggiornare l'UI con le quote
function updateOddsUI(partitaElement, match) {
    const quotesContainer = document.createElement('div');
    quotesContainer.className = 'quote-container';
    
    if (match && match.bookmakers && match.bookmakers[0]) {
        const outcomes = match.bookmakers[0].markets[0].outcomes;
        quotesContainer.innerHTML = `
            <div class="quote">
                <span>1</span>
                <span>${outcomes[0].price.toFixed(2)}</span>
            </div>
            <div class="quote">
                <span>X</span>
                <span>${outcomes[1].price.toFixed(2)}</span>
            </div>
            <div class="quote">
                <span>2</span>
                <span>${outcomes[2].price.toFixed(2)}</span>
            </div>
            <div class="bookmaker">
                <span>${match.bookmakers[0].title}</span>
            </div>
        `;
    } else {
        // Use fallback odds
        const fallbackOdds = {
            homeWin: 1.85 + Math.random() * 0.5,
            draw: 3.50 + Math.random() * 0.5,
            awayWin: 4.25 + Math.random() * 0.5
        };
        quotesContainer.innerHTML = `
            <div class="quote">
                <span>1</span>
                <span>${fallbackOdds.homeWin.toFixed(2)}</span>
            </div>
            <div class="quote">
                <span>X</span>
                <span>${fallbackOdds.draw.toFixed(2)}</span>
            </div>
            <div class="quote">
                <span>2</span>
                <span>${fallbackOdds.awayWin.toFixed(2)}</span>
            </div>
        `;
    }
    
    partitaElement.appendChild(quotesContainer);
}

