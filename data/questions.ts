export const SAMPLE_MARKDOWN = `
#### Dato il seguente tableau di un problema PLC in forma minimizzazione: 

$$
\\begin{array}{|c|ccccc|}
\\hline
x_1 & x_2 & x_3 & x_4 & x_5 \\\\
\\hline
0 & 0 & 0 & \\alpha & \\beta & -3 \\\\
1 & 0 & 2 & 0 & \\gamma & 2 \\\\
0 & -1 & 4 & 1 & -2 & \\delta \\\\
\\hline
\\end{array}
$$

1. se $\\alpha \\ge 0$, $\\beta \\ge 0$ e $\\delta < 0$, le colonne di $x_1$ e $x_2$ danno una soluzione duale ammissibile.
2. se  $\\alpha \\ge 0$, $\\beta \\ge 0$ e $\\delta > 0$, le colonne di $x_1$ e $x_2$ danno una soluzione duale ammissibile  
3. se $\\alpha = 0$, $\\beta > 0$ e $\\delta \\ge 0$, il tableau è associato alla soluzione primale ottima
4. se $\\alpha < 0$, $\\beta < 0$, $\\delta > 0$ e $\\gamma \\le 0$, il problema è illimitato  
5. se $\\alpha = 0$, $\\delta > 0$ e $\\gamma > 0$, il problema primale non è ammissibile 
6. se $\\alpha = 0$, $\\delta > 0$, il problema primale non è vuoto
7. se $\\alpha = 0$, $\\beta \\ge 0$ danno una soluzione ottimale 
8. se $\\alpha = 0$, $\\beta \\ge 0$ , le colonne di $x_1$ e $x_2$ danno una soluzione duale ammissibile  

> Risposte: 
> Per le prime due domande 1 e 2, guardiamo un tableu di esempio:Es:
> $$
> \\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & 5 & 5 & -3 \\\\
> 1 & 0 & 2 & 0 & -5 & 2 \\\\
> 0 & -1 & 4 & 1 & -2 & \\delta \\\\
> \\hline
> \\end{array}
> $$
> 1.❌ Le colonne di $x_1$ e $x_2$ danno una soluzione duale ammissibile?
>
> $x_1=(0,1,0)^T$  ⇒ è già una colonna “di base”.
>
> $x_2 = (0,0,-1)^T$ ⇒ è una colonna di base **a segno negativo** , quindi non e' in forma canonica(basta moltiplicare la 3ª riga per $-1$ per ottenere il pivot $+1$).
>
> Quindi la base naturale è $\\{x_1,x_2\\}$. La **dual ammissibilità**, letta dal tableau, dipende dal **segno dei costi ridotti** dei non base:
> $$
> \\bar c_3 = 0,\\quad \\bar c_4 = 5,\\quad \\bar c_5 = 5.
> $$
> Se stai risolvendo un **problema di minimizzazione**, la dual ammissibilità richiede $\\bar c_j \\ge 0$ per tutti i non base ⇒ **SÌ**, è dualmente ammissibile (e questo non dipende da $\\delta$).
> Se invece fosse stato un **problema di massimizzazione**, tipicamente serve $\\bar c_j \\le 0$ ⇒ qui **NO** (perché $5,5>0$).
>
> 2.❌ Il tableau è associato alla soluzione primale ottima?
> Per essere “primale ottima”  servono **ammissibilità primale** + **costi ridotti col segno giusto**(ok, 0,5,5 ≥ 0). Per la **fattibilità** primale i termini noti devono essere positivi ma non possiamo perche' non sappiamo se il $\\delta$ sia positiva o negativa.
>
> 3.✅Es:
> $$
> \\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & 0 & 5 & -3 \\\\
> 1 & 0 & 2 & 0 & \\gamma & 2 \\\\
> 0 & -1 & 4 & 1 & -2 & 5 \\\\
> \\hline
> \\end{array}
> $$
> il tableau è associato alla soluzione primale ottima? Si perché la base $x_2$ e $x_4$ è ammissibile e i costi ridotti sono tutti non negativi.
>
> 4.✅Es:
> $$
> \\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & -5 & -5 & -3 \\\\
> 1 & 0 & 2 & 0 & -5 & 2 \\\\
> 0 & -1 & 4 & 1 & -2 & 5 \\\\
> \\hline
> \\end{array}
> $$
> Dalle righe dei vincoli si vede che le colonne di $x_1$ e $x_4$ formano la matrice identità, quindi la base è $\\{x_1, x_4\\}$ e la soluzione di base associata è: $x_1 = 2,\\quad x_4 = 5,\\quad x_2=x_3=x_5=0,$
>
> che è **primale ammissibile** (termini noti non negativi).
>
> Per un **problema di minimo**, una variabile non basica con **costo ridotto negativo** è una candidata entrante perché può **ridurre** il valore dell’obiettivo. Tra le non basiche $(x_2,x_3,x_5)$, l’unica con valore negativo in riga 0 è $x_5$ (coefficiente $-5$), quindi scegliamo $x_5$ come **variabile entrante**.
>
> Ora osserviamo la colonna di $x_5$ nelle righe dei vincoli: i coefficienti sono $-5$ e $-2$, quindi sono **tutti** $\\le 0$. Questo implica che, aumentando $x_5$, i valori delle variabili basiche **non diminuiscono** (anzi aumentano), quindi la fattibilità primale **non viene mai violata**. Di conseguenza **non esiste una variabile uscente** (il ratio test non si può applicare).
>
> Quindi possiamo aumentare $x_5$ arbitrariamente e l’obiettivo continua a diminuire senza limite: il problema è **illimitato inferiormente**.
>
> 5.❌Es:
> $$
> \\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & 0 & \\beta & -3 \\\\
> 1 & 0 & 2 & 0 & 5 & 2 \\\\
> 0 & -1 & 4 & 1 & -2 & 5 \\\\
> \\hline
> \\end{array}
> $$
> I termini noti sono positivi, quindi il primale è ammissibile.
>
> 6.✅
> $$
> \\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & 5 & \\beta & -3 \\\\
> 1 & 0 & 2 & 0 & \\gamma & 2 \\\\
> 0 & -1 & 4 & 1 & -2 & 5 \\\\
> \\hline
> \\end{array}
> $$
> Esiste ed è primale una soluzione di base ammissibile $x*= {2,0,0,5,0}$, l’insieme fattibile non è vuoto, cioè significa che esiste **almeno un punto**, una soluzione che soddisfa **tutti i vincoli del problema**.
>
> Esempio per 7 e 8:
> $$\\begin{array}{|c|ccccc|}
> \\hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\\\
> \\hline
> 0 & 0 & 0 & 0  & 5 & -3 \\\\
> 1 & 0 & 2 & 0 & \\gamma & 2 \\\\
> 0 & 1 & -4 & -1 & 2 & -\\delta \\\\
> \\hline
> \\end{array}$$
> 7.✅ Per un problema di minimizzazione se una soluzione di base è **primale ammissibile** e **tutti i costi ridotti delle variabili non basiche sono non negativi**, allora la soluzione è **ottima**.
> 8.✅. La base del tableau è $\\{x_1,x_4\\}$. Per ottenere $\\{x_1,x_2\\}$ si moltiplica per $-1$ la seconda riga, così la colonna di $x_2$ diventa unitaria. Nel caso di **minimizzazione** la **dual ammissibilità** vale se $\\bar c_j \\ge 0 \\ \\ \\forall j,$  e dipende **solo** dai **costi ridotti** (riga 0: $(0,0,0,0,5)$), **non** dai termini noti (RHS).
---
#### Considera i due problemi,  $P: \\min \\{\\, c^T x : A x = b,\\, x \\ge 0 \\,\\}$ e $D: \\max \\{\\, u^T b : u^T A \\le c^T \\,\\}$ (dove $u$ è libera in segno, perché nel primale c’è un vincolo di uguaglianza). allora:

1. una soluzione ammissibile di $P$ fornisce un limite inferiore per il valore ottimale di $D$;  

2. una soluzione ammissibile di $D$ fornisce un limite inferiore per il valore ottimale di $P$;  

3. una coppia di soluzioni $x$ e $u$ con $x$ ammissibile per $P$ e $u$ ammissibile per $D$ sono ottimali se $c^T - c_B^TB^{-1}A \\geq 0$;  

4. una coppia di soluzioni $x$ e $u$ tale che $(u^TA - c^T)x = 0$ sono ottimali se $x \\geq 0$;  

5. una coppia di soluzioni $x$ e $u$ sono ottimali se $x \\geq 0$ e $u \\geq 0$.
> Risposte:
> 1. ❌. Per debole dualità ($c^\top x \ge b^\top u$): ($c^\top x$) è un upper bound di $ D^* $), non un lower bound.
> 2. ✅. Sempre da debole dualità: ($b^\top u \le c^\top x$) per ogni (x) ammissibile ⇒ ($b^\top u \le$ $P^*$) ⇒ lower bound per $P^*$
> 3. ❌ La condizione $c^\top - c_B^\top B^{-1}A \ge 0$
>    controlla **solo il duale** e non dice nulla su (x). Essa indica semplicemente che i “prezzi” (u) sono **ammissibili per il problema duale**, perché i **costi ridotti sono non negativi** rispetto a una base (B) (dual-ammissibilità). Tuttavia, **non verifica se le quantità (x) sono fattibili**, cioè se (x) rispetta i vincoli del primale; in particolare, non controlla la **complementarità (slackness)**. Per trasformarla in un’affermazione vera: una coppia ((x,u)) è ottimale se (equivalentemente) vale la **complementarità** $
>    (c^\top - u^\top A)x = 0,$ oppure se la condizione $c^\top - c_B^\top B^{-1}A \ge 0$
>    vale **insieme** a $x_B = B^{-1}b \ge 0,\qquad x_N = 0, $cioè se (x) è la **soluzione di base associata alla base (B)** ed è primale ammissibile.
> 4. ❌La condizione $(u^\top A - c^\top)x = 0 $dice solo che **ogni variabile positiva ha costo ridotto nullo** (condizione di **complementarità**), ma **non garantisce** che: (x) soddisfi $Ax = b$; , (u) rispetti $u^\top A \le c^\top$. Per rendere l’affermazione vera, bisogna dire che una coppia ((x,u)) è **ottimale** se: $Ax=b,\quad x\ge 0,\quad u^\top A\le c^\top,\quad (c^\top-u^\top A)x=0. $(Cioè: **ammissibilità primale + ammissibilità duale + complementarità**.
> 5. ❌ La sola non negatività di (x) e (u) **non implica l’ottimalità**; inoltre (u) **può anche non essere positivo**, poiché nel duale è libero in segno.Per verificare l’ottimalità è necessario controllare: 1. i **vincoli del primale**; 2. i **vincoli del duale**; 3. la **complementarità** tra (x) e (u).
>
> 🔑 Riassumendo – Regola d’oro
>
> Una coppia ((x,u)) è **ottimale** se e solo se:
>
> 1. (x) è ammissibile
>
> - rispetta i vincoli (Ax=b);
> - è non negativo.
>
> 2. (u) è ammissibile
>
> - non viola i vincoli duali (u^\top A \le c^\top).
>
> 3. Sono coerenti tra loro
>
> - nessuna variabile positiva “spreca valore”
>   (condizione di **complementarità**).
>
> 👉 **Servono tutte e tre insieme**, mai una sola.
---
#### Una soluzione di base di un problema di PLC e' chiamata degenere quando: 

1. ci sono piu' variabili rispetto ai vincoli;

2. il numero di variabili di base con valore zero e' uguale al numero di vincoli;

3. il numero di variabili di base con valore diversi da zeri è inferiore al numero di vincoli;

4. il numero di variabili di base con valore diversi da zeri è uguale al  numero di righe dei vincoli della matrice;

5. il numero di variabili di base con valore zero è uguale alla differenza di numero di colonne e righe (n - m);

6. il numero delle variabili non-nulle in base è strettamente minore al numero di righe della matrice dei vincoli;

7. la matrice di base e' invertibile.

8. vi sono variabili nulle nella soluzione;

> Risposte:
> ### Definizione corretta di degenerazione (BFS,Basic Feasible Solution)
>
> In un problema di **Programmazione Lineare** (LP/PLC), una **soluzione di base** è **degenere** quando **almeno una variabile di base vale 0**
> (equivalentemente: il numero di variabili di base **strettamente positive** è **< m**, dove *m* è il numero di vincoli / righe della matrice dei vincoli).
>
> Quindi: *“ci sono variabili nulle nella soluzione”* **non è sufficiente** in generale, perché in una BFS ci saranno sempre molte variabili **non di base** poste a 0. La degenerazione riguarda **le variabili di base**.
>
> Esempio di tableu degenere:
>
> $\begin{array}{|c|ccccc|}
> \hline
> x_1 & x_2 & x_3 & x_4 & x_5 \\
> \hline
> 0 & 0 & 0 & 5 & 3 & -3 \\
> 1 & 0 & 2 & 0 & 6 & 2 \\
> 0 & 1 & 4 & 1 & -2 & 0 \\
> \hline
> \end{array}$
>
> Quindi la soluzione fattibile di base(BFS)  associata è $x^*=(2,0,0,0,0)$ con $x_3=x_4=x_5=0$ non basiche.
>
> La soluzione è **degenere** perché **una variabile di base è nulla**: $x_2$ è in base e vale (0). Valutazione delle risposte:
>
> ✅ Corrette:
> - **8.** “vi sono variabili nulle nella soluzione” → corretta **solo se intesa come: variabili di base nulle** Attenti, da chiedere al prof.
> - **3.** "n variabili di base ≠0 < n vincoli” → è proprio l’equivalente della degenerazione.
> - **6.** è la stessa idea della 3, solo riscritta.
>
> ❌ Errate / non definitorie:
> - **1.** irrilevante per degenerazione.
> - **2.** troppo forte: “n basiche a zero = n vincoli” significherebbe tutte le basiche zero (caso particolare, non definizione).
> - **4.** descrive il caso **non degenere** (basiche non nulle = m).
> - **5.** non è collegata alla definizione (mix n−m).
> - **7.** una base deve essere invertibile per definizione di base (non caratterizza degenerazione).
---

#### Dato un problema di Programmazione Lineare Intera (PLI), in minimizzazione, sia ( $z^*$ ) il valore ottimale del rilassamento continuo (LP-relax).

1. ( $z^*$ ) è un limite superiore al valore IP ottimale
2. ( $z^*$ ) è un limite inferiore al valore IP ottimale
3. ( $\\lceil z^* \\rceil$ ) (estremo superiore di ( $z^*$ )) è un limite inferiore al valore IP ottimale se i coefficienti della funzione obiettivo sono interi
4. ( $\\lceil z^* \\rceil$ ) è un limite superiore al valore IP ottimale
5. ( $\\lceil z^* \\rceil$ ) è un limite inferiore al valore IP ottimale se i coefficienti della funzione obiettivo sono razionali

> #### Risposte:
>
> 1. ✅ — In minimizzazione, LP-relax ≤ IP ⇒ il valore LP è upper bound sull’ottimo intero.
> 2. ❌ — È il contrario: non è un limite inferiore ma superiore.
> 3. ✅ — Con coeff. interi, $( \\lceil z^* \\rceil )$ produce un lower bound valido per l’IP.
> 4. ❌ — L’estremo superiore (ceiling) fornisce un lower bound, non upper bound.
> 5. ❌ — Il risultato richiede coeff. interi, non solo razionali.

---

#### La strategia iniziale di esplorazione approfondita per il metodo branch-and-bound:

1. esplora prima il problema con il limite inferiore più piccolo;

2. esplora prima il problema con il limite inferiore più alto;

3. partendo da un problema padre, esplora il primo problema figlio generato;

4. partendo da un problema padre, esplora tutti i problemi figlio generati prima di considerare i problemi di livello inferiore;

5. dopo una fase di backtracking, esplora il primo problema figlio non esplorato, se presente.

6. viene utilizzato per trovare il percorso più breve in una rete;

7. utilizza il rilassamento continuo per calcolare un limite in tutti i nodi;

8. esplora sempre 2n problemi;

9. esplora un numero di problemi non superiore al numero di variabili;

10. viene utilizzato per trovare la complessita' computazionale di problema;

11. puo' essere applicato a problemi di minimizzazione in forma standard;

12. trova l'ottimo soluzione di un problema NP-completo;

13. utilizzare sempre come procedura di delimitazione la soluzione di a Problema PLC;

> #### Risposte:
>
> 1. ❌ — Selezionare il nodo col limite inferiore più piccolo è una strategia best-bound, non la deep-first iniziale.
>
> 2. ❌ — Idem: scegliere il limite inferiore più alto non è deep-first e sarebbe comunque una scelta poco promettente nel caso di minimizzazione.
>
> 3. ✅ — In depth-first, da un padre si scende sul primo figlio generato e si continua ad approfondire la stessa ramificazione.
>
> 4. ❌ — Esplorare tutti i figli prima di scendere di livello descrive la breadth-first, non la deep-first.
>
> 5. ✅ — Dopo il backtracking, la deep-first prosegue col primo figlio non ancora esplorato del nodo corrente.
>
> 6. ❌ — Per il percorso minimo si usano algoritmi polinomiali (Dijkstra, Bellman-Ford); B&B non è lo strumento tipico.
>
> 7. ✅ — Nei MILP si usa normalmente il rilassamento continuo (LP) per calcolare il bound in ciascun nodo visitato (per potare).
>
> 8. ❌ — Non “sempre 2n”: il numero di nodi può essere esponenziale (≈2^n) nel peggiore dei casi, o molto meno se si pota bene.
>
> 9. ❌ — Non è limitato al numero di variabili; può esplorare molti più nodi.
>
> 10. ❌ — B&B non si usa per determinare la complessità computazionale di un problema (questo è tema di teoria delle complessità).
>
> 11. ✅ — Si può applicare a problemi di minimizzazione (in qualsiasi forma standard equivalente).
>
> (n) ✅ — È un metodo esatto: può trovare l’ottimo anche per problemi NP-completi (senza però garantire tempi polinomiali).
>
> 13. ❌ — Non “sempre” LP: il bound può venire anche da euristiche, Lagrangiano, surrogate ecc.; l’LP è comune ma non obbligatorio.

---

#### Il metodo branch-and-bound per problemi di zaino 0-1:

1. utilizza un albero decisionale con un numero esponenziale di nodi

2. utilizza la strategia piu' bassa per esplorare l'albero decisionale

3. calcola un limite superiore in ogni nodo dell'albero decisionale

4. utilizza un albero decisionale con un numero polinomiale di livelli

5. utilizza un albero decisionale con un numero esponenziale di livelli

6. Ha $O(2^n)$ livelli degli alberi

7. Calcola il limite superiore in tutti i nodi generati da un vincolo del genere $x_j$=1

8. Usa la prima strategia più alta per esplorare l’albero

9. Calcola il limite superiore solo nei nodi figlio generati aggiungendo un vincolo del genere $x_j$=0, al nodo padre

10. Interrompe la ricerca non appena il livello n Ë raggiunto

> #### Risposte:
>
> 1. ✅ — L’albero può avere numero di nodi esponenziale (fino a ≈2^n foglie) nel caso peggiore; la potatura può solo ridurli.
>
> 2. ❌ — Per un problema di massimizzazione non si esplora il nodo col bound più basso; tipicamente si usa best-bound col bound più alto oppure depth-first.
>
> 3. ✅ — A ogni nodo (vivo) si calcola un limite superiore (es. zaino frazionario/LP) per poter potare.
>
> 4. ✅ — L’albero ha n livelli (uno per item), quindi numero di livelli polinomiale (O(n)).
>
> 5. ❌ — I livelli non sono esponenziali: sono n.
>
> 6. ❌ — I livelli non sono O($2^n$); sono O(n). (Il numero di nodi può essere esponenziale, non i livelli.)
>
> 7. ❌ — Il bound si calcola su tutti i figli generati (sia con vincolo $x_j$=1 sia con $x_j$=0), non solo su quelli con $x_j$=1.
>
> 8. ✅ — Nella pratica per knapsack si usa spesso una strategia best-first scegliendo il nodo col bound più alto (massimizzazione).
>
> 9. ❌ — Non si calcola il bound solo sui figli con $x_j$=0; si calcola su entrambi i figli (se vivi).
>
> 10. ❌ — Raggiungere il livello n in un ramo dà una soluzione completa, ma non si interrompe finché tutti i nodi vivi non sono potati o valutati (serve garantire l’ottimo globale).

---

#### Un problema NP-completo:

  1. non può essere risolto esattamente in tempo polinomiale;

  2. può essere risolto utilizzando l’algoritmo del simplesso (primal o dual);

  3. ha sempre una complessità computazionale $(O(2^n))$;

  4. non può essere risolto esattamente utilizzando computer all’avanguardia;

  5. può essere risolto utilizzando il simplesso rivisto;

  6. può essere risolto utilizzando il metodo branch-and-bound;

  7. può essere risolto con una sequenza di calcoli di percorso più breve;

  8. non può essere risolto con un algoritmo esatto;

  9. può essere risolto esattamente usando l’algoritmo del simplesso con un numero di iterazioni non polinomiale;

  10. può essere risolto esattamente usando l’algoritmo del simplesso con l’aggiunta di tagli di Gomory (dopo opportuna formulazione come ILP);

  11. può essere risolto esattamente usando l’algoritmo di Dijkstra;

  12. può essere risolto esattamente usando un albero decisionale binario con (n) livelli, dove (n) è il numero di variabili;

  13. può essere risolto con una sequenza di calcoli del percorso più breve.

> #### Risposte:
>
> 1. ❌ — Non è dimostrato: sarebbe ✅ solo se ($P\\neq NP$). Ad oggi non si sa se esista un algoritmo polinomiale.
> 2. ❌ — Il simplesso risolve problemi LP; un NP-completo in generale non è un LP.
> 3. ❌ — Non “sempre” ($O(2^n)$): esistono algoritmi esatti con altre complessità esponenziali o pseudos-esponenziali; la classe non impone un’unica forma.
> 4. ❌ — Si può risolvere esattamente con algoritmi esponenziali per istanze di taglia moderata; l’hardware non lo vieta.
> 5. ❌ — Come (b): il simplesso rivisto resta un metodo LP, non risolve in generale problemi NP-completi.
> 6. ✅ — Branch-and-bound è un metodo esatto (tipicamente esponenziale) applicabile dopo adeguata modellazione (es. ILP/0-1).
> 7. ❌ — “Percorso più breve” è un problema in P; una sequenza di shortest path non risolve in generale NP-completi.
> 8. ❌ — Esistono algoritmi esatti (ma non polinomiali noti in generale).
> 9. ❌ — Anche con molte iterazioni, il simplesso resta per LP; non risolve in generale NP-completi.
> 10. ✅ (con caveat) — Molti NP-completi si formulano come ILP 0-1; tagli di Gomory (spesso con B&B/B&C) danno un metodo esatto in tempo potenzialmente esponenziale.
> 11. ❌ — Dijkstra risolve shortest path con pesi non negativi (tempo polinomiale), non problemi NP-completi in generale.
> 12. ✅ — L’esaustiva su un albero binario di profondità (n) (backtracking) è un algoritmo esatto (peggiore dei casi esponenziale).
> 13. ❌ — È la stessa idea di (g): shortest-path in sequenza non risolve, in generale, NP-completi.

---

#### Dato un problema PLC con n variabili e m vincoli, una matrice di base è:

1. una raccolta di n vincoli;

2. una raccolta di n x m colonne della matrice dei vincoli;

3. una matrice quadrata m x m con valore 1 sulla diagonale principale;

4. una raccolta di m colonne linearmente indipendenti;

5. una sottomatrice quadrata n x n.

6. una sottomatrice quadrata della matrice dei vincoli, che può essere invertita

7. una raccolta di m vincoli;

> #### Risposte:
>
> 1. ❌ — Una matrice di base non è una raccolta di vincoli, ma una raccolta di colonne della matrice dei vincoli che corrispondono alle variabili di base.
>
> 2. ❌ — Una matrice di base non è una raccolta di n x m colonne, ma solo n colonne della matrice dei vincoli, dove (n) è il numero di variabili in base.
>
> 3. ❌ — La matrice di base non è una matrice quadrata con valori 1 sulla diagonale principale, ma una sottomatrice che può essere invertibile (se le colonne corrispondenti sono linearmente indipendenti).
>
> 4. ✅ — Una matrice di base è una raccolta di m colonne linearmente indipendenti dalla matrice dei vincoli. Queste colonne corrispondono alle variabili di base in una soluzione.
>
> 5. ❌ — La matrice di base non è una sottomatrice quadrata (n \\times n), ma una sottomatrice (m \\times m) che può essere invertibile.
>
> 6. ✅ — Una matrice di base è una sottomatrice quadrata della matrice dei vincoli che può essere invertibile se le colonne scelte sono linearmente indipendenti.
>
> 7. ❌ — Una matrice di base non è una raccolta di m vincoli, ma una raccolta di colonne della matrice dei vincoli, corrispondenti alle variabili di base.

---

#### Il costo ridotto di una variabile di base ($x_j$), np un tableau in forma di base:

1. è sempre maggiore o uguale a zero;

2. è strettamente positivo se la soluzione corrente è ottimale e il problema è in forma di minimizzazione;

3. ha valore ($c^T B^{-1} A_j$);

4. è uguale alla variazione della funzione obiettivo quando la variabile ($x_j$) aumenta di una unità (e tutte le altre variabili non di base rimangono al valore zero);

5. è l'opposto della j-esima variabile duale;

6. è sempre nullo;

7. ha un valore non positivo se la soluzione corrente è ottimale e il problema è in forma di minimizzazione;

8. rappresenta la variazione della funzione obiettivo quando la (rhs) del j-esimo vincolo aumenta di una unità;

9. ha un valore non negativo se la soluzione attuale è ottimale e il problema è in minimizzazione.

> #### Risposte:
>
> #### Per definizione i costi ridotti sono:  $c^T - c^TB^{-1}A_j$; e sono sempre ≥ 0 se la soluzione è ottima
>
> 1. ❌ — Il costo ridotto di una variabile di base non è sempre maggiore o uguale a zero. Per le variabili di base, il costo ridotto è zero, mentre per le variabili non di base potrebbe essere negativo o positivo.
>
> 2. ❌ — In un problema di minimizzazione, il costo ridotto di una variabile non di base deve essere minore di zero per indicare che il problema può essere migliorato. Un costo ridotto positivo indica che la soluzione non è ottimale.
>
> 3. ✅ — Il costo ridotto di una variabile di base ($x_j$) è dato da ($c^T B^{-1} A_j$), dove 2. è la matrice delle colonne di base e ($A_j$) è la colonna del vincolo corrispondente alla variabile.
>
> 4. ✅ — Il costo ridotto rappresenta la variazione della funzione obiettivo quando la variabile ($x_j$) aumenta di una unità, mantenendo costanti le altre variabili non di base (che sono fissate a zero).
>
> 5. ❌ — Il costo ridotto non è l'opposto della variabile duale. La variabile duale di un vincolo rappresenta la sensibilità del valore della funzione obiettivo rispetto a un aumento del termine noto (rhs) del vincolo.
>
> 6. ❌ — Il costo ridotto di una variabile di base non è sempre nullo, ma è nullo solo se la variabile è sulla base e non cambia il valore della funzione obiettivo.
>
> 7. ✅ — Se la soluzione corrente è ottimale e il problema è di minimizzazione, il costo ridotto deve essere non positivo (zero o negativo) per tutte le variabili non di base. Un costo ridotto positivo implicherebbe una soluzione non ottimale.
>
> 8. ✅ — Il costo ridotto rappresenta la variazione della funzione obiettivo quando il termine noto (rhs) di un vincolo aumenta di una unità, con tutte le altre variabili non di base fissate.
>
> 9. ❌ — Il costo ridotto non può essere sempre non negativo. Se la soluzione è ottimale e il problema è di minimizzazione, il costo ridotto delle variabili non di base sarà non positivo.

------

#### Dato un PLC di minimizzazione, il costo ridotto di una variabile non in base ($x_i$), in un tableau in forma di base:

1. È strettamente positivo se la soluzione attuale è ottimale;
2. È la variazione della funzione obiettivo quando il termine noto del j-esimo vincolo aumenta di una unità (e tutte le variabili non di base rimangono uguali a zero);
3. È la variazione della funzione obiettivo quando la variabile ($x_j$) cresce di un’unità (e tutte le variabili non di base rimangono uguali a zero);
4. È sempre nullo;
5. Ha un valore non negativo se la soluzione corrente è ottimale.

> #### Risposte:
>
> 1. ❌ — Il costo ridotto non è strettamente positivo se la soluzione è ottimale; deve essere non positivo per tutte le variabili non di base. Se è positivo, la soluzione non è ottimale.
> 2. ✅ — Il costo ridotto di una variabile non di base rappresenta la variazione della funzione obiettivo quando il termine noto del j-esimo vincolo aumenta di una unità, con tutte le variabili non di base fissate.
> 3. ✅ — Il costo ridotto di una variabile non di base rappresenta la variazione della funzione obiettivo quando quella variabile cresce di una unità, con tutte le altre variabili non di base fissate a zero.
> 4. ❌ — Il costo ridotto di una variabile non è sempre nullo. In generale, è diverso da zero e può essere positivo o negativo, a seconda che la variabile non di base possa migliorare o meno la funzione obiettivo.
> 5. ✅ — Se la soluzione corrente è ottimale e il problema è di minimizzazione, il costo ridotto di tutte le variabili non di base sarà non positivo.

---

#### Dato un problema PLC, l'analisi di sensibilità di un valore del lato destro ($b_i$) (anche chiamato right-hand side, rhs):

1. definisce un limite superiore per il valore della soluzione ottimale;

2. definisce il valore minimo e massimo della i-esima variabile che non modifica la base ottimale;

3. definisce il valore minimo e massimo di ($b_i$) che non modifica la base ottimale;

4. definisce l'intervallo di valori di ($b_i$) che non modifica i costi ridotti;

5. definisce l'intervallo di valori di ($b_i$) che non modifica le variabili duali;

6. definisce il valore minimo e massimo di 2. che non cambia il valore della soluzione ottima;

7. definisce l'intervallo di valori di 2. che non modifica le variabili duali;

> #### Risposte:
>
> 1. ❌ — L'analisi di sensibilità di (b_i) non fornisce un limite superiore per la soluzione ottimale. Piuttosto, analizza come la soluzione ottimale cambia al variare del valore di ($b_i$), ma non impone un "limite superiore" per la soluzione ottimale stessa.
>
> 2. ❌ — L'analisi di sensibilità non riguarda direttamente i valori minimi e massimi della variabile (x_i) che non cambiano la base ottimale, ma riguarda i vincoli del problema e come il cambiamento in ($b_i$) influenzi la base.
>
> 3. ✅ — L'analisi di sensibilità può determinare l'intervallo di valori di ($b_i$) per i quali la base ottimale rimane invariata. Se il valore di ($b_i$) esce da questo intervallo, la base ottimale cambierà.
>
> 4. ❌ — L'intervallo di valori di ($b_i$) che non modifica i costi ridotti non è parte dell'analisi di sensibilità in quanto i costi ridotti dipendono dalla variabile duale e non direttamente dal rhs ($b_i$).
>
> 5. ❌ — L'intervallo di valori di (b_i) che non modifica le variabili duali non è definito in questo modo. L'analisi di sensibilità può determinare come i cambiamenti in ($b_i$) possano alterare il valore della soluzione ottimale e le variabili duali, ma non in un intervallo fisso.
>
> 6. ✅? — L'analisi di sensibilità può determinare l'intervallo di valori di ($b_i$) che non cambia il valore della soluzione ottimale. Questo intervallo stabilisce la stabilità della soluzione ottimale rispetto alle variazioni dei valori di ($b_i$).
>
> 7. ❌ — L'analisi di sensibilità non definisce un intervallo di valori di 2. che non modifica le variabili duali. Le variabili duali cambiano in risposta alla modifica del rhs, ma l'analisi di sensibilità si concentra su come (b_i) influenzi la soluzione ottimale, non le variabili duali separatamente.

---

#### Dato un problema di flusso a costo minimo con sorgente (s), destinazione (t) e valore di flusso (q):

1. Il flusso è ottimale se la quantità di flusso entrante in un qualsiasi vertice (j) è uguale alla quantità di flusso uscente da (j);

2. In una soluzione ottima il flusso uscente da (s) è uguale a (q);

3. Nel grafo residuo associato a una soluzione ottima non esiste alcun ciclo di costo negativo;

4. Nel grafo residuo associato a una soluzione ottima non esiste alcun ciclo di costo positivo;

5. Nel grafo residuo associato a una soluzione ottima non esiste alcun arco entrante in (t);

> #### Risposte:
>
> 1. ❌ — La condizione che il flusso entrante in un nodo sia uguale al flusso uscente è una condizione di conservazione del flusso in un grafo di flusso, ma non è sufficiente a garantire l'ottimalità in termini di costo minimo. L'ottimalità è determinata dal fatto che il flusso soddisfi anche il costo minimo.
>
> 2. ✅ — In una soluzione ottima di flusso, il flusso uscente dalla sorgente (s) deve essere esattamente uguale al valore di flusso (q), poiché (q) rappresenta la quantità di flusso totale che deve essere inviato dalla sorgente alla destinazione.
>
> 3. ✅ — Un ciclo di costo negativo nel grafo residuo indica che esiste la possibilità di migliorare ulteriormente la soluzione (minimizzare il costo), quindi in una soluzione ottima, il grafo residuo non deve contenere cicli di costo negativo.
>
> 4. ❌ — Il grafo residuo in una soluzione ottima può contenere cicli di costo positivo, ma questi non portano a una riduzione del costo totale, poiché il flusso ottimale è già stato trovato. I cicli di costo positivo non influiscono sull'ottimalità della soluzione.
>
> 5. ✅ — In una soluzione ottima, il flusso deve arrivare alla destinazione (t), quindi non esistono archi entranti in (t) nel grafo residuo. Gli archi entranti in (t) sono già saturi, quindi non c'è alcun flusso che può entrare in (t) dalla destinazione.

---

#### Considera un grafo ( G = (V, E) ). Sia $S/V = \\{ x \\mid x \\in S \\ \\text{e} \\ x \\notin V \\}$ interpretato come tutti i nodi sorgente che NON sono anche nodi intermedi. 

Quale delle seguenti affermazioni descrive correttamente concetti relativi al problema del cammino più breve da ($s$) a un vertice ($v$) (shortest path)?

1. Nel problema del cammino più breve, un nodo sorgente appartenente a ( S/V ) può essere usato come nodo intermedio se ciò riduce la lunghezza del percorso.
2. Il problema del cammino più breve da ( s ) a ( v ) richiede di considerare solo percorsi che non utilizzano nodi intermedi.
3. Nel problema del cammino più breve, la soluzione ottimale consiste sempre in un albero di copertura minimo (Minimum Spanning Tree).
4. Un cammino più breve da ( s ) a ( v ) può includere nodi intermedi, ma un nodo sorgente appartenente a ( S/V ) non può mai essere nodo intermedio.

> #### Risposte:
>
> 1. ❌ - Per definizione, un nodo in $S/V$ è un nodo sorgente che non può essere nodo intermedio.
>    Quindi NON può essere utilizzato come nodo intermedio in un cammino, nemmeno se migliorerebbe il costo.
> 2. ❌ - Il cammino più breve da $s$ a $v$ può e di solito deve usare nodi intermedi.
>    Non è ✅ che si debbano considerare solo percorsi senza intermedi.
> 3. ❌ - Un albero di copertura minimo (MST) NON risolve il problema del cammino più breve.
>    MST minimizza il costo totale dell’albero, non il costo dei singoli cammini.
> 4. ✅ - È corretto:
>    - un cammino più breve da $s$ a $v$ può usare nodi intermedi;
>    - ma un nodo sorgente appartenente a $S/V$ è definito come sorgente che non può essere intermedio.

---

#### Sia $G=(V,E)$ un grafo non orientato con pesi (costi) sugli archi. Si consideri il problema dell’albero di copertura di costo minimo (Minimum Spanning Tree, MST) e una sua soluzione ottima $T^*$.

Quali affermazioni sono corrette?

1. L’arco di costo minimo è sempre in $T^*$.
2. L’arco di costo minimo è in $T^*$ solo se non chiude un ciclo con altri archi.
3. L’arco di costo massimo è sempre in $T^*$.
4. L’arco di secondo costo minimo è sempre in $T^*$.
5. L’arco di secondo costo minimo è in $T^*$ solo se l’arco di costo minimo non è in $T^*$.

> #### Risposte:
>
> 1. ❌ — Non è ✅ che un particolare arco di costo minimo debba appartenere a ogni MST.
>    Controesempio: triangolo con tre archi tutti di peso $1$. Ogni MST usa 2 archi qualunque, quindi un arco minimo specifico può essere escluso.
> 2. ✅ — T è un albero, quindi è aciclico. Di conseguenza, ogni arco appartenente a $T^*$ non può “chiudere un ciclo” insieme agli altri archi di $T^*$.
>    Quindi l’implicazione “se l’arco minimo è in $T^*$, allora non chiude un ciclo” è sempre ✅ (ed è una condizione necessaria, non sufficiente).
> 3. ❌ — Un arco di costo massimo può benissimo essere evitato.
>    Controesempio: triangolo con pesi $1,2,100$. L’MST usa gli archi $1$ e $2$, ed esclude $100$.
> 4. ❌ — Neppure un arco di “secondo costo minimo” (inteso come arco specifico) è garantito in $T^*$.
>    Controesempio: quadrilatero $A\\!-\\!B\\!-\\!C\\!-\\!D\\!-\\!A$ con pesi $AB=1$, $BC=2$, $CD=2$, $DA=2$. Un MST può essere $\\{AB,CD,DA\\}$, che esclude l’arco $BC$ (anche se ha costo 2).
> 5. ❌ — È ❌ che il “secondo minimo” entri solo se il minimo non entra: spesso entrano entrambi.
>    Controesempio: cammino su 3 nodi $A\\!-\\!B\\!-\\!C$ con pesi $AB=1$, $BC=2$. L’unico MST è $\\{AB,BC\\}$: contiene sia il minimo (1) sia il secondo minimo (2).

---

#### Si consideri il problema 0–1 Knapsack: $\\max \\left\\{\\sum_{j=1}^{n} p_j x_j \\;:\\; \\sum_{j=1}^{n} w_j x_j \\le c,\\; x_j\\in\\{0,1\\},\\; j=1,\\dots,n\\right\\}.$

Si consideri l’algoritmo di programmazione dinamica che associa gli stati al profitto totale.

Quali affermazioni sono corrette?

1. Calcola un limite inferiore al valore ottimo.
2. Ha $c+1$ stati (da $0$ a $c$).
3. In ogni fase ha uno stato per ogni profitto $P$, con $P=0,\\dots,\\sum_{j=1}^n p_j$.
4. Alla fase $j$ si considera la possibilità di inserire l’oggetto $j$.
5. La soluzione ottima si trova nell’ultimo stato dell’ultima fase.

> #### Risposte:
>
> 1. ❌ - La DP (eseguita completamente) calcola il valore ottimo esatto, non solo un limite inferiore. Un limite inferiore è tipico di euristiche o branch-and-bound, non della DP esatta.
>
> 2. ❌ - c+1 stati corrisponde alla DP con stati = capacità/peso (riempimento $0,\\dots,c$), non a quella con stati = profitto.
>
> 3. ✅ - Se lo stato è il profitto totale, allora lo spazio degli stati è indicizzato da $P\\in\\{0,\\dots,\\sum p_j\\}$ (tipicamente si memorizza, per ogni profitto, il peso minimo necessario per ottenerlo).
>
> 4. ✅ - In una DP a fasi per knapsack 0–1, alla fase $j$ si decide se includere o escludere l’oggetto $j$, aggiornando gli stati.
>
> 5. ❌ - Con stati = profitto, l’ottimo non è “l’ultimo profitto” $\\sum p_j$: in genere l’ottimo è il massimo profitto $P$ tale che il peso minimo associato a $P$ sia $\\le c$. Quindi non è necessariamente l’“ultimo stato”, ma il miglior stato ammissibile nell’ultima fase.

---

#### Data una matrice $A$ di dimensione $m \\times n$, essa è totalmente unimodulare se:

1. tutte le sottomatrici quadrate hanno determinante pari a $-1$, $0$ o $1$;

2. tutte le sottomatrici quadrate $m \\times m$ hanno determinante pari a $0$ o $1$;

3. il suo determinante è definito;

4. il suo determinante ha valore $1$;

5. tutte le sottomatrici quadrate hanno determinante non nullo;

> #### Risposte:
>
> 1. ✅ - Ogni sottomatrice quadrata ha determinante in $\\{-1, 0, 1\\}$. Questa è la definizione formale di total unimodularity.
>
> 2. ❌ - Le sottomatrici considerate devono essere tutte quelle quadrate, non solo quelle $m \\times m$.
>    Inoltre devono poter essere anche $-1$, non solo $0$ o $1$.
>
> 3. ❌ - Il determinante di $A$ è sempre definito solo per matrici quadrate, ma la total unimodularity riguarda tutte le sottomatrici quadrate, non solo il determinante di $A$ stessa.
>
> 4. ❌ - Può anche avere determinante $0$ o $-1$.
>    Serve che tutte le sue sottomatrici quadrate rispettino $-1, 0, 1$, non solo quella principale.
>
> 5. ❌ - Molte sottomatrici di una matrice totalmente unimodulare hanno determinante zero (ad esempio, se hanno due righe uguali o colonne linearmente dipendenti).  Dire che devono essere “tutte non nulle” è quindi errato.

---

#### Dato un problema PLC (P) in forma di minimizzazione, con 2 vincoli di tipo “$\\ge$” e 1 vincolo di tipo “=” e 5 variabili, considera il problema duale (D)

1. (D) ha 3 variabili e 5 vincoli;
2. (D) ha 5 variabili e 3 vincoli;
3. la prima variabile di (D) deve essere non negativa;
4. la terza variabile di (D) non ha restrizioni di segno;
5. la seconda variabile di (D) deve essere non positiva;
6. se il primale (P) ha una soluzione ottima finita, allora il duale (D) ha una soluzione ottima finita;
7. se il primale è vuoto (inammissibile), il duale è vuoto;
8. se il primale è illimitato, allora il duale è illimitato;
9. una soluzione duale ammissibile può avere un valore inferiore a quello della soluzione primale ottima;
10. qualsiasi soluzione ammissibile del primale ha un valore maggiore o uguale a qualsiasi soluzione ammissibile del duale.

> #### Risposte:
>
> 1. ✅ — Duale: 3 vincoli → 3 variabili, primale: 5 variabili → 5 vincoli.
> 2. ❌ — È il contrario (3 variabili, 5 vincoli).
> 3. ✅ — Vincolo “≥” nel primale → variabile duale ≥ 0.
> 4. ✅ — Vincolo “=” → variabile duale libera.
> 5. ❌ — Anche il secondo vincolo è “≥”, quindi variabile duale ≥ 0.
> 6. ✅ — Se il primale ha ottimo finito, anche il duale.
> 7. ❌ — Primale vuoto → duale può essere vuoto o illimitato.
> 8. ❌ — Primale illimitato → duale inammissibile, non illimitato.
> 9. ✅ — Valore duale ≤ valore primale: può essere più basso.
> 10. ✅ — Proprietà della dualità debole.
>
> | Primale ↓ / Duale → | Soluzione finita | Vuoto (inammiss.) | Illimitato      |
> | ------------------- | ---------------- | ----------------- | --------------- |
> | Soluzione finita    | ✔                | ✗                 | ✗               |
> | Vuoto               | ✗                | non applicabile   | ✔               |
> | Illimitato          | ✗                | ✔                 | non applicabile |

---

#### Considera un problema di minimizzazione e l'algoritmo dual simplex:

1) ad ogni passo il valore della soluzione corrente e' un limite superiore al valore ottimale
2) ad ogni passo il valore della soluzione corrente e' un limite inferiore al valore ottimale
3) l'operazione di pivot viene eseguita sugli elementi  $\\alpha_{ij} > 0;$
4) l'operazione di pivot viene eseguita sugli elementi  $\\alpha_{ij} < 0;$
5) i costi ridotti $\\bar e^T$diventano non negativi nell'ultima iterazione (dando la soluzione ottimale)

> #### Risposte:
>
> 1. ❌ – è un limite inferiore (non superiore), con la precisazione che la soluzione primale corrente può anche non essere ammissibile finché l’algoritmo non termina.
> 2. ❌ – Non è un limite inferiore.
> 3. ❌ – Il pivot non usa $a_{ij}>0$.
> 4. ✅ – Il pivot usa $a_{ij}<0$.
> 5. ✅ – All’ultima iterazione i costi ridotti diventano non negativi.

---

##### Si consideri un problema di Programmazione Lineare (PL) in forma standard con $n$ variabili e $m$ vincoli, matrice dei vincoli $A \\in \\mathbb{R}^{m \\times n}$ (di rango $m$), una base $B$ (insieme di $m$ colonne linearmente indipendenti di $A$) e il tableau del simplesso associato a $B$.

Un’operazione di pivot viene utilizzata per:

1. Trasformare, tramite pivot, la colonna della variabile entrante $j \\notin B$ in una colonna della matrice identità $I_m$ nel nuovo tableau (cioè renderla una colonna unitaria), sostituendo una colonna della base.

2. Aggiungere una disuguaglianza valida al tableau corrente.

3. Trasformare il tableau corrente in un nuovo tableau associato a una base con cui condivide $n-1$ colonne.

4. Trasformare il tableau corrente in un nuovo tableau associato a una qualsiasi base.

5. Trasformare il tableau corrente in un nuovo tableau associato a una base con cui condivide $m-1$ colonne.

> #### Risposte:
>
> 1. ✅ – Un pivot rende basica la variabile entrante $j\\notin B$: nel nuovo tableau la sua colonna diventa una colonna unitaria di $I_m$ (e una colonna basica precedente esce).
> 2. ❌ – Aggiungere una disuguaglianza valida è tipico dei cutting planes, non del pivot del simplesso.
> 3. ❌ – Un pivot cambia una sola colonna della base; una base ha $m$ colonne, quindi la condivisione corretta è $m-1$, non $n-1$.
> 4. ❌ – Un singolo pivot porta solo a una base adiacente (differisce per una colonna), non a “una qualsiasi” base.
> 5. ✅ – Dopo un pivot la nuova base condivide $m-1$ colonne con la base precedente.



---

#### Consideriamo un problema di minimizzazione e l'algoritmo primale del simplesso:

1. a ogni passo il valore della soluzione corrente è un limite inferiore del valore ottimale;
2. a ogni passo il valore della soluzione corrente è un limite superiore del valore ottimale;
3. l'operazione di pivot viene eseguita sugli elementi $\\alpha_{ij} < 0;$
4. l'operazione di pivot viene eseguita sugli elementi $\\alpha_{ij} > 0;$
5. i costi ridotti $\\bar c^T$ diventano non negativi nell'ultima iterazione (ottenendo la soluzione ottimale)

> #### Risposte:
>
> 1. ❌ – In un problema di minimizzazione, qualunque soluzione primal ammissibile (e il simplesso primale mantiene proprio la primal-ammissibilità) ha valore di obiettivo maggiore o uguale all’ottimo $z^*$. Quindi il valore corrente è un limite superiore (upper bound), non un limite inferiore.
> 2. ❌ – Non è un limite superiore.
> 3. ✅ – Il pivot usa $\\alpha_{ij}<0$.
> 4. ❌ – Non usa $\\alpha_{ij}>0$.
> 5. ✅ – All’ultima iterazione i costi ridotti sono non negativi.

---

#### Il metodo del piano di taglio (cutting-plane method):

1. viene utilizzato per risolvere problemi di programmazione lineare con variabili continue;
2. termina con un numero polinomiale di iterazioni;
3. viene utilizzato per risolvere problemi NP-completi (“difficili”);
4. a ogni iterazione utilizza il simplesso per risolvere il sottoproblema corrente;
5. utilizza la strategia “più bassa prima” per esplorare i sottoproblemi.

> #### Risposte:
>
> 1. ❌ — I piani di taglio servono per programmazione intera, non per LP continui.
> 2. ❌ — Il metodo non garantisce numero polinomiale di iterazioni.
> 3. ✅ — Si usa proprio per problemi NP-completi come i 0-1 ILP.
> 4. ✅ — Ogni iterazione risolve un LP con il simplesso (o altro solver LP).
> 5. ❌ — Non usa strategie di esplorazione tipo branch-and-bound; non esiste “più bassa prima”.

------

#### Dato il modello di Programmazione Lineare Intera (PLI) $\\min {c^T x : x \\in P \\cap \\mathbb{Z}^n} \\quad \\text{con} \\quad P = {Ax = b,; x \\ge 0}$ e data la soluzione ottima (x^) del rilassamento continuo, il taglio di Gomory è:

1. una disuguaglianza per (P) che soddisfa il lemma di Farkas;
2. una disuguaglianza ($\\alpha_F^T x_F \\ge \\alpha_0$) soddisfatta da qualsiasi ($x \\in P$);
3. una disuguaglianza ($\\alpha_F^T x_F \\ge \\alpha_0$) soddisfatta da qualsiasi ($x \\in P \\cap \\mathbb{Z}^n$), ma non da ($x^*$);
4. una disuguaglianza ($\\alpha_F^T x_F \\ge \\alpha_0$) soddisfatta da qualsiasi ($x \\in $P) ma non da ($x^*$);
5. nessuna delle precedenti.

> ####  Risposte:
>
> 1. ❌ — Non è definito tramite il lemma di Farkas come condizione primaria.
> 2. ❌ — Il taglio non deve essere soddisfatto da tutti i punti di (P), ma solo da quelli interi.
> 3. ✅ — È la definizione corretta del taglio valido: esclude (x^) ma è valido per ogni punto intero ammissibile.
> 4. ❌ — Deve escludere (x^), ma non deve essere valido per tutti i punti reali di (P).
> 5. ❌ — Perché la risposta corretta è la 3.

---

#### Dato un problema PLC (P) in forma standard con (n) variabili e m vincoli, si consideri il metodo in due fasi.  Il problema artificiale utilizzato nella prima fase:

1. ha m variabili e (n) vincoli;
2. ha al massimo (n + m) variabili e m vincoli;
3. ha una funzione obiettivo in forma di massimizzazione;
4. fornisce una base ammissibile per il problema (P) se la sua soluzione ottima ha valore zero;
5. fornisce una soluzione ammissibile e ottimale per il problema (P) se la sua soluzione ottima ha valore negativo.

> #### Risposte:
>
> 1. ❌ — Il numero di vincoli rimane m; le variabili non diventano m, ma (n +) eventuali variabili artificiali.
> 2. ✅ — Le variabili possono arrivare fino a (n + m); i vincoli restano m.
> 3. ❌ — In fase 1 la funzione obiettivo è minimizzare la somma delle variabili artificiali.
> 4. ✅ — Se la soluzione ottima della fase 1 è 0, si ottiene una base ammissibile per il problema originale.
> 5. ❌ — Se il valore ottimo è positivo, il problema originale è inammissibile; non esiste il caso "valore negativo".

------

#### Si consideri l’algoritmo di Dijkstra per il calcolo dei cammini minimi.

Quali delle seguenti affermazioni sono corrette?

1. Non è applicabile a grafi aciclici.
2. Non è utilizzabile in un grafo con archi a costo (peso) negativo.
3. Può essere utilizzato per trovare un albero di copertura di costo minimo (Minimum Spanning Tree).
4. Può essere utilizzato per trovare un cammino minimo in un grafo diretto, da una sorgente $s$ a una destinazione $t$.
5. Non è utilizzabile in un grafo con cicli (circuiti) negativi.

> #### Risposte:
>
> 1. ❌ — Dijkstra può essere applicato a grafi aciclici: l’assenza di cicli non è un problema; ciò che conta è l’assenza di pesi negativi.
> 2. ✅ — Dijkstra è corretto solo se tutti i pesi degli archi sono $\\ge 0$. Con pesi negativi, la scelta “greedy” (fissare definitivamente la distanza minima quando un nodo viene estratto) può diventare ❌.
> 3. ❌ — L’albero di copertura minimo (MST) si calcola con algoritmi come Prim o Kruskal, non con Dijkstra: Dijkstra produce un albero dei cammini minimi da una sorgente (Shortest Path Tree), che in generale non coincide con un MST.
> 4. ✅ — Dijkstra trova i cammini minimi da sorgente singola in grafi diretti o non diretti, purché i pesi siano non negativi. In particolare, consente di ottenere il cammino minimo $s \\to t$ (eventualmente arrestando l’algoritmo quando $t$ viene estratto).
> 5. ✅ — In presenza di cicli negativi raggiungibili, il “cammino minimo” può non essere ben definito (si può ridurre il costo indefinitamente). Inoltre, un ciclo negativo implica la presenza di almeno un arco negativo, quindi le ipotesi di Dijkstra sono violate.

---

#### Un problema si dice di tipo polinomiale (classe $P$) se esiste un algoritmo che lo risolve in tempo (numero di operazioni) polinomiale nella dimensione dell’input $n$.

Quali affermazioni sono corrette?

a) È sempre risolvibile con il simplesso in un numero non polinomiale di iterazioni.

b) Deve essere risolto con un algoritmo di branch-and-bound.

c) È risolvibile esattamente con l’algoritmo di Dijkstra.

d) È risolvibile con un algoritmo che esegue un numero polinomiale di operazioni.

e) Ammette anche un algoritmo con complessità al più esponenziale, ad esempio $O(2^n)$.

> #### Risposte:
>
> 1. ❌ — Il simplesso è un algoritmo per programmazione lineare (LP), non un metodo “universale” per qualunque problema in $P$. Inoltre non è ✅ che un problema polinomiale sia “sempre” risolto col simplesso (né che servano “sempre” iterazioni non polinomiali).
> 2. ❌ — Il branch-and-bound è tipico per problemi combinatori (spesso NP-hard) e non è necessario per un problema in $P$: in $P$ esiste già un algoritmo polinomiale.
> 3. ❌ — Dijkstra risolve il cammino minimo a sorgente singola in grafi con pesi non negativi, non un generico problema polinomiale.
> 4. ✅ — Per definizione di problema “polinomiale” (classe $P$), esiste un algoritmo che lo risolve con un numero di operazioni $O(n^k)$ per qualche costante $k$.
> 5. ✅ — per un problema polinomiale, è formalmente ✅ ma banale, perché se esiste un algoritmo $O(n^k)$, allora lo stesso algoritmo è anche $O(2^n)$ (un bound più “largo”).

---
`;
