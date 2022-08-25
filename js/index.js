
//node getters
const inputName = () => document.querySelector('input#name')
const inputAge = () => document.querySelector('input#age')
const inputDescription = () => document.querySelector('input#description')
const createMonsterForm = () => document.querySelector('form#create-monster')
const divMonsterContainer = () => document.querySelector('div#monster-container')
const forwardBtn = () => document.getElementById('forward')
const backwardBtn = () => document.getElementById('back')



//event helpers
const createMonsterCard = (monster) => {
    const monsterCardDiv = document.createElement('div')

    const monsterCardH2 = document.createElement('h2')
    monsterCardH2.innerText = monster.name
    monsterCardH2.id = monster.id

    const monsterCardH4 = document.createElement('h4')
    monsterCardH4.innerText = monster.age

    const monsterCardP = document.createElement('p')
    monsterCardP.innerText = monster.description

    monsterCardDiv.appendChild(monsterCardH2)
    monsterCardDiv.appendChild(monsterCardH4)
    monsterCardDiv.appendChild(monsterCardP)
    divMonsterContainer().appendChild(monsterCardDiv)

}

const createMonsterCards = (data) => {
    for (let monster of data) {
        createMonsterCard(monster)
    }
}

const restoreInitialFormValue = () => {
    inputName().value = 'name...'
    inputAge().value = 'age...'
    inputDescription().value = 'description...'
}

const resetMonsterDiv = () => divMonsterContainer().innerHTML = ' '

const findNextId = (data) => {
    const lastMonsterId = parseInt(divMonsterContainer().lastChild.firstChild.id)
    resetMonsterDiv()
    for (let currMonsterId = lastMonsterId; currMonsterId < lastMonsterId + 50; currMonsterId++) {
        createMonsterCard(data[currMonsterId])
    }
}  

const findLastId = (data) => {
    const lastMonsterId = parseInt(divMonsterContainer().lastChild.firstChild.id)
    resetMonsterDiv()
    for (let currMonsterId = lastMonsterId - 100; currMonsterId < lastMonsterId - 50; currMonsterId++) {
        createMonsterCard(data[currMonsterId])
    }
}

//event handlers
const createMonster = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify ({
            "name": inputName().value,
            "age": inputAge().value,
            "description": inputDescription().value, 
        })
    })
    .then(resp => resp.json())
    .then(data => createMonsterCard(data))
    restoreInitialFormValue()
}

const showMonsters = (e) => {
    fetch('http://localhost:3000/monsters?_limit=50&_page=1')
    .then(resp => resp.json())
    .then(data => createMonsterCards(data))
}

const deleteInitialFormValue = (e) => {
    e.target.value = " "
}

const showNext50 = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => {
        findNextId(data)
    })
}

const showPrev50 = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => {
        findLastId(data)
    })
}

//event listeners
const next50MonstersEvent = () => {
    forwardBtn().addEventListener('click', showNext50)
}

const back50MonstersEvent = () => {
    backwardBtn().addEventListener('click', showPrev50)
}

const deleteInitialFormValueEvent = () => {
    for(let i = 0; i<createMonsterForm().length - 1; i++) {
        createMonsterForm()[i].addEventListener('click', deleteInitialFormValue)
    }
    
}

const createMonsterEvent = () => {
    createMonsterForm().addEventListener('submit', createMonster)
}

document.addEventListener('DOMContentLoaded', () => {
    showMonsters()
    createMonsterEvent()
    deleteInitialFormValueEvent()
    next50MonstersEvent()
    back50MonstersEvent()
})





// - At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them.