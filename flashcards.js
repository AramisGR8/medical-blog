// ---------- PREMADE FLASHCARDS ----------

const flashcards = [
  { q: "Mis on seedetrakti verejooksu anatoomiline piirpunkt?", a: "Treitzi ligament: sellest ülalpool paikneb ülemine seedetrakt ja allpool alumine seedetrakt." },
  { q: "Millised elundid kuuluvad ülemisse seedetrakti?", a: "Söögitoru, magu ja kaksteistsõrmiksool." },
  { q: "Millised elundid kuuluvad alumisse seedetrakti?", a: "Peensool, jämesool ja pärasool." },
  { q: "Kumb on sagedasem: ülemise või alumise seedetrakti verejooks?", a: "Sagedasem on ülemise seedetrakti verejooks." },
  { q: "Patsiendil on must ja tõrvataoline väljaheide. Kuidas seda nimetatakse?", a: "Meleena. See viitab seeditud verele ning on sagedasem ülemise seedetrakti verejooksu korral." },
  { q: "Patsient oksendab verd. Kuidas seda nimetatakse?", a: "Hematemees." },
  { q: "Mida tähendab, kui okses on kohvipaksutaoline mass?", a: "Veri on reageerinud maohappega ning muutunud tumedaks ja teraliseks." },
  { q: "Mis on hematokeesia?", a: "Erkpunase vere eritumine pärasoolest; see viitab sagedamini alumise seedetrakti verejooksule." },
  { q: "Millele võib viidata ortostaatiline pearinglus seedetrakti verejooksuga patsiendil?", a: "Võimalikule veremahu vähenemisele ja hemodünaamilise ebastabiilsuse kujunemisele." },
  { q: "Millele võib viidata lamavas asendis tekkiv hüpotensioon?", a: "Olulisele verekaotusele ja kiire sekkumise vajadusele." },
  { q: "Mis on tenesm?", a: "Valulik ja sage roojamistung või tunne, et sool ei tühjene täielikult." },
  { q: "Mis on sagedaseim ülemise seedetrakti mittevarikoosse verejooksu põhjus?", a: "Peptiline haavand." },
  { q: "Millised on kaks olulist peptilise haavandi tekkepõhjust?", a: "Helicobacter pylori infektsioon ja mittesteroidsete põletikuvastaste ainete kasutamine." },
  { q: "Mis on Mallory-Weissi sündroom?", a: "Limaskesta rebend söögitoru ja mao ülemineku piirkonnas, mis tekib sageli tugeva oksendamise järel." },
  { q: "Mis põhjustab söögitoru veenilaiendeid ehk vaarikseid?", a: "Portaalhüpertoonia, mis on enamasti seotud maksatsirroosiga." },
  { q: "Mis on Dieulafoy kahjustus?", a: "Haruldane verejooksu põhjus, mille korral limaskesta pinnal paikneb ebanormaalselt suur arter." },
  { q: "Mis on sagedane alumise seedetrakti verejooksu põhjus täiskasvanutel?", a: "Divertikuloos." },
  { q: "Millised sümptomid võivad viidata põletikulisele soolehaigusele?", a: "Veresegune lima väljaheites, kõhulahtisus ja kõhuvalu." },
  { q: "Mis on ülemise seedetrakti verejooksu diagnostika keskne uuring?", a: "Gastroskoopia ehk ösofagogastroduodenoskoopia." },
  { q: "Milleks kasutatakse Glasgow-Blatchfordi skoori?", a: "Ülemise seedetrakti verejooksu esmaseks riskihindamiseks ja haiglaravi vajaduse hindamiseks." },
  { q: "Milleks kasutatakse Rockalli skoori?", a: "Kordusverejooksu ja prognoosi hindamiseks pärast endoskoopiat." },
  { q: "Millist skoori kasutatakse alumise seedetrakti verejooksu puhul?", a: "Oaklandi skoori." },
  { q: "Miks tuleb massiivse hematokeesia korral välistada ülemise seedetrakti verejooks?", a: "Sest kiire ja tugev ülemise seedetrakti verejooks võib avalduda erkpunase verena väljaheites." },
  { q: "Mis on esmase käsitluse keskmes?", a: "Verejooksu äratundmine, elutähtsate funktsioonide hindamine ja šoki ennetamine." },
  { q: "Mis on hemostaas?", a: "Verejooksu peatamine." }
]

function getRandomCards(){
return [...flashcards].sort(()=>0.5-Math.random()).slice(0,3)
}

function createCard(item){
    return `
    <div class="card-container">
      <div class="card" onclick="flipCard(event,this)">
        <div class="card-face">
          <h3>${item.q}</h3>
        </div>
        <div class="card-face card-back">
          <h3>${item.q}</h3>
          <p class="card-answer">${item.a}</p>
        </div>
      </div>
    </div>
  `
}

// let saved=localStorage.getItem(question) || ""

// return `
// <div class="card-container">
// <div class="card" onclick="flipCard(event,this)">
// <div class="card-face">
// <h3>${question}</h3>
// </div>
// <div class="card-face card-back">
// <h3>${question}</h3>
// <input 
// value="${saved}"
// placeholder="Write your answer"
// onclick="event.stopPropagation()"
// oninput="saveAnswer('${question}',this.value)">
// </div>
// </div>
// </div>
// `
// }

function loadCards(){
    let grid = document.getElementById("flashcardGrid")
  let cards = getRandomCards()
  grid.innerHTML = ""
  cards.forEach(item => {
    grid.innerHTML += createCard(item)
  })
}

// let grid=document.getElementById("flashcardGrid")

// let cards=getRandomCards()

// grid.innerHTML=""

// cards.forEach(q=>{
// grid.innerHTML+=createCard(q)
// })

// }

// ---------- CUSTOM FLASHCARDS (FIXED SYSTEM) ----------

let visibleCustomCards = [] // tracks currently shown 3 cards

function getCustomCards(){
return JSON.parse(localStorage.getItem("customCards")) || []
}

function saveCustomCards(cards){
localStorage.setItem("customCards", JSON.stringify(cards))
}

// create new card with UNIQUE ID
function createNewCard(){

let cards=getCustomCards()

if(cards.length>=20){
alert("Max 20 cards reached")
return
}

let newCard={
id: Date.now(),
question:"",
answer:""
}

cards.push(newCard)

saveCustomCards(cards)

// show the new card immediately
visibleCustomCards = [newCard, ...visibleCustomCards].slice(0,3)

renderCustomCards()

}

// update card using ID (NOT index)
function updateCustomCard(id,field,value){

let cards=getCustomCards()

let card = cards.find(c => c.id === id)

if(!card) return

card[field] = value

saveCustomCards(cards)

// update ONLY text (no re-render)
updateCardText(id)

}

// update visible text without rebuilding UI
function updateCardText(id){

let cards=getCustomCards()
let card = cards.find(c => c.id === id)

let text = card.question.trim() || "Sinu küsimus"

document.querySelectorAll(`[data-id='${id}'] .card-face h3`)
.forEach(el => el.innerText = text)

}

// render EXACTLY 3 cards (no random while typing)
function renderCustomCards(){

let grid=document.getElementById("customCardGrid")

grid.innerHTML=""

visibleCustomCards.forEach(card=>{

let q = card.question || "Sinu küsimus"

grid.innerHTML+=`
<div class="card-container" data-id="${card.id}">

<div class="card" onclick="flipCard(event,this)">

<div class="card-face">
<h3>${q}</h3>
</div>

<div class="card-face card-back">

<h3>${q}</h3>

<label>Küsimus</label>
<input 
value="${card.question}"
onclick="event.stopPropagation()"
oninput="updateCustomCard(${card.id},'question',this.value)">

<label>Vastus</label>
<input 
value="${card.answer}"
onclick="event.stopPropagation()"
oninput="updateCustomCard(${card.id},'answer',this.value)">

</div>

</div>

</div>
`
})

}

// shuffle ONLY when pressing button
function loadCustomCards(){

let cards=getCustomCards()

// ensure at least 3 exist
if(cards.length < 3){
while(cards.length < 3){
cards.push({
id: Date.now()+Math.random(),
question:"",
answer:""
})
}
saveCustomCards(cards)
}

// choose 3 random cards
visibleCustomCards = [...cards].sort(()=>0.5-Math.random()).slice(0,3)

renderCustomCards()

}


// ---------- IN ORDER ----------

let currentIndex = 0
let currentCustomIndex = 0

function nextCardsInOrder() {

  // premade cards in order
  let grid = document.getElementById("flashcardGrid")
  let cards = flashcards.slice(currentIndex, currentIndex + 3)

  if (cards.length === 0) {
    currentIndex = 0
    cards = flashcards.slice(0, 3)
    alert("Mälukaardid läbi! Alustan otsast.")
  }

  grid.innerHTML = ""
  cards.forEach(item => {
    grid.innerHTML += createCard(item)
  })

  currentIndex += 3
  if (currentIndex > flashcards.length) currentIndex = 0

  // custom cards in order (only ones with a question written)
  let customCards = getCustomCards().filter(c => c.question.trim() !== "")
  if (customCards.length === 0) return

  let nextCustom = customCards.slice(currentCustomIndex, currentCustomIndex + 3)

  if (nextCustom.length === 0) {
    currentCustomIndex = 0
    nextCustom = customCards.slice(0, 3)
  }

  visibleCustomCards = nextCustom
  renderCustomCards()

  currentCustomIndex += 3
  if (currentCustomIndex > customCards.length) currentCustomIndex = 0
}

// ---------- BUTTON ACTION ----------

function nextCards(){
loadCards()
loadCustomCards()
}

// ---------- COMMON ----------

function flipCard(event,card){
if(event.target.tagName==="INPUT") return
card.classList.toggle("flip")
}

function saveAnswer(question,value){
localStorage.setItem(question,value)
}

// ---------- INIT ----------

window.onload=()=>{
loadCards()
loadCustomCards()
}