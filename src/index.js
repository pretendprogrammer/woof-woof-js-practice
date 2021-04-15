const URL = 'http://localhost:3000/pups'
const dogBarOfNames = document.querySelector('#dog-bar')
const dogNameH2 = document.querySelector('#dog-name')
const dogImage = document.querySelector('#dog-image')
const dogButton = document.querySelector('#dog-button')

fetch(`${URL}`)
    .then(response => response.json())
    .then(arrayOfDogPojos => {
        arrayOfDogPojos.forEach(element => {
            let newSpan = document.createElement('span')
                newSpan.append(element.name)
                newSpan.id = element.id
                newSpan.addEventListener('click', () => {bringDogToMainView(element)})
            dogBarOfNames.append(newSpan)
        });
    })

function bringDogToMainView(dogObject) {
    dogImage.src = dogObject.image
    dogNameH2.textContent = dogObject.name
    setDogStatus(dogObject.isGoodDog, dogObject.id)
}

function setDogStatus(currentStatus, currentId) {
    dogButton.name = currentId
    dogButton.value = currentStatus
    let dogStatus
    currentStatus === true ? dogStatus = 'Good Dog!' : dogStatus = 'Bad Dog!'
    dogButton.textContent = dogStatus
}

dogButton.addEventListener('click', () => {
    idOfObjectToUpdate = dogButton.name
    dogButton.value === 'true' ? newDogStatus = false : newDogStatus = true
    patchConfig= {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({isGoodDog: newDogStatus})
    }
    fetch(`${URL}/${idOfObjectToUpdate}`, patchConfig)
        .then(response => response.json())
        .then((updatedDogObject) => {
            setDogStatus(updatedDogObject.isGoodDog, updatedDogObject.id)
        })
})