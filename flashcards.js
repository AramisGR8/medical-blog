// ---------- PREMADE FLASHCARDS ----------

const flashcards=[
"What color is arterial bleeding?",
"What color is venous bleeding?",
"What type of bleeding is the most dangerous?",
"What is the first step when treating bleeding?",
"What does a tourniquet do?",
"When should you call emergency services?",
"What are capillaries?",
"Why should pressure be applied to wounds?",
"What is internal bleeding?",
"What should you avoid removing from a wound?",
"What does elevation help reduce?",
"What is the purpose of bandaging?"
]

function getRandomCards(){
return [...flashcards].sort(()=>0.5-Math.random()).slice(0,3)
}

function createCard(question){

let saved=localStorage.getItem(question) || ""

return `
<div class="card-container">
<div class="card" onclick="flipCard(event,this)">
<div class="card-face">
<h3>${question}</h3>
</div>
<div class="card-face card-back">
<h3>${question}</h3>
<input 
value="${saved}"
placeholder="Write your answer"
onclick="event.stopPropagation()"
oninput="saveAnswer('${question}',this.value)">
</div>
</div>
</div>
`
}

function loadCards(){

let grid=document.getElementById("flashcardGrid")

let cards=getRandomCards()

grid.innerHTML=""

cards.forEach(q=>{
grid.innerHTML+=createCard(q)
})

}

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

let text = card.question.trim() || "Your question..."

document.querySelectorAll(`[data-id='${id}'] .card-face h3`)
.forEach(el => el.innerText = text)

}

// render EXACTLY 3 cards (no random while typing)
function renderCustomCards(){

let grid=document.getElementById("customCardGrid")

grid.innerHTML=""

visibleCustomCards.forEach(card=>{

let q = card.question || "Your question..."

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