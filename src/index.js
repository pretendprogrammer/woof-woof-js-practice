const URL = 'http://localhost:3000/pups'
const dogBarOfNames = document.querySelector('#dog-bar')
const dogNameH2 = document.querySelector('#dog-name')
const dogImage = document.querySelector('#dog-image')
const dogButton = document.querySelector('#dog-button')

let masterObject = {}
let displayedDog = {}

fetch(`${URL}`)
    .then(response => response.json())
    .then(arrayOfDogPojos => {
        arrayOfDogPojos.forEach(element => {
            masterObject[element.id] = element
            let newSpan = document.createElement('span')
                newSpan.append(element.name)
                newSpan.addEventListener('click', () => {bringDogToMainView(element.id)})
            dogBarOfNames.append(newSpan)
        });
    })

function bringDogToMainView(dogId) {
    displayedDog = masterObject[dogId]
    dogImage.src = displayedDog.image
    dogNameH2.textContent = displayedDog.name
    displayedDog.isGoodDog ? dogButton.textContent = 'Good Dog!' : dogButton.textContent = 'Bad Dog!'
}

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