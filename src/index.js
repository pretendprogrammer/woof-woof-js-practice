const URL = 'http://localhost:3000/pups'
const dogBarOfNames = document.querySelector('#dog-bar')
const dogNameH2 = document.querySelector('#dog-name')
const dogImage = document.querySelector('#dog-image')
const dogButton = document.querySelector('#dog-button')
const filterButton = document.querySelector('#good-dog-filter')

let uselessArrRef = []
let masterObject = {}
let displayedDog = {}

let isFilterOn = false

fetch(`${URL}`)
    .then(response => response.json())
    .then(arrayOfDogPojos => {
        uselessArrRef = arrayOfDogPojos
        populateDogBar(uselessArrRef)
    })

function populateDogBar(array) {
    dogBarOfNames.textContent = ''
    array.forEach(element => {
        if (isFilterOn && !(element.isGoodDog)) {return} // Bad dog filter/gate
        masterObject[element.id] = element
        let newSpan = document.createElement('span')
            newSpan.append(element.name)
            newSpan.addEventListener('click', () => {bringDogToMainView(element.id)})
        dogBarOfNames.append(newSpan)
    })
}

function bringDogToMainView(dogId) {
    displayedDog = masterObject[dogId]
    dogImage.src = displayedDog.image
    dogNameH2.textContent = displayedDog.name
    displayedDog.isGoodDog ? dogButton.textContent = 'Good Dog!' : dogButton.textContent = 'Bad Dog!'
}

filterButton.addEventListener("click", function(){
    isFilterOn = !isFilterOn
    !isFilterOn ? filterButton.textContent = 'Filter good dogs: OFF' : filterButton.textContent = 'Filter good dogs: ON'
    populateDogBar(uselessArrRef)
})

dogButton.addEventListener('click', () => {
    displayedDog.isGoodDog ? newDogStatus = false : newDogStatus = true
    patchConfig = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isGoodDog: newDogStatus})
    }
    fetch(`${URL}/${displayedDog.id}`, patchConfig)
        .then(response => response.json())
        .then((updatedDogObject) => {
            masterObject[displayedDog.id] = updatedDogObject
            bringDogToMainView(displayedDog.id)
        })
})