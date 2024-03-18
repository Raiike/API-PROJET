newName = "" //modifyName.value
newStartDate =  "" //modifyStartDate.value
newEndDate = "" //modifyEndDate.value

async function getPromos() {
    const response = await fetch('http://146.59.242.125:3004/promos', {
        headers:{
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926"
        }
    })
    const data = await response.json()
    return data
}

async function displayPromos() {
    const promos = await getPromos()
    promosContainer.innerHTML = ""
    console.log(promos);

    promos.forEach(promo => {
        const promoBox = document.createElement('div')
        promoBox.classList.add('promo')
        let promoTitle = document.createElement('h2')
        promoTitle.classList.add('promoTitle')
        promoTitle.textContent = promo.name
        promoTitle.appendChild(promoBox)
        const buttonBox = document.createElement('div')
        buttonBox.classList.add('buttonBox')
        let buttonDelete = document.createElement('button')
        buttonDelete.classList.add('deleteButton')
        buttonDelete.textContent = 'Supprimer'
        buttonBox.appendChild(buttonDelete)
        let buttonDetails = document.createElement('a')
        buttonDetails.href = "./pages/student.html?id="+promo._id
        buttonDetails.classList.add('detailsButton')
        buttonDetails.textContent = 'Details'
        let modifyPromo = document.createElement('button')
        modifyPromo.classList.add('modifyPromo')
        modifyPromo.textContent = 'modifier'
        buttonBox.appendChild(modifyPromo)
        promoTitle.appendChild(modifyPromo)
        buttonBox.appendChild(buttonDetails)
        promoTitle.appendChild(buttonBox)
        promosContainer.classList.add('promosContainer')
        promosContainer.appendChild(promoTitle);
        buttonDelete.addEventListener('click', ()=>{
            deletePromo(promo._id)
        })
        let modifiedDiv = document.createElement('div')
        modifiedDiv.classList.add('newDiv')
        let modifyPromoName = document.createElement('input')
        let modifyPromoStartDate = document.createElement('input')
        let modifyPromoEndDate = document.createElement('input')
        let validation = document.createElement('button')
        validation.textContent = "Valider"
        promoTitle.appendChild(modifiedDiv)
        modifiedDiv.appendChild(modifyPromoName)
        modifiedDiv.appendChild(modifyPromoStartDate)
        modifiedDiv.appendChild(modifyPromoEndDate)
        modifiedDiv.appendChild(validation)
        modifiedDiv.classList.add("hidden")
        modifyPromo.addEventListener("click", ()=>{
            modifiedDiv.classList.remove("hidden")
            modifyPromoName.value = `Nom : ` + promo.name
            modifyPromoStartDate.value =`Date de départ : ` + promo.startDate
            modifyPromoEndDate.value =`Date de fin : ` +  promo.endDate
            validation.addEventListener("click", ()=>{
                newName = modifyPromoName.value
                newStartDate =  modifyPromoStartDate.value
                newEndDate = modifyPromoEndDate.value
                changePromo(promo._id)
                modifiedDiv.classList.add("hidden")
            })
        })
    });

}
async function deletePromo(promoId) {
    const response = await fetch('http://146.59.242.125:3004/promos/' + promoId,{
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
        }
    })
    console.log(response);
    const data = await response.json()
    console.log(data);
    displayPromos()
}

async function addPromo() {
    const body = {
        "name" : document.querySelector('#name').value,
        "startDate" : document.querySelector('#startDate').value,
        "endDate" : document.querySelector('#endDate').value,
    }
    const response = await fetch('http://146.59.242.125:3004/promos',{
        method : "POST",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
            "Content-type" : "Application/json"
        },
        body: JSON.stringify(body)
    })  
    const data = await response.json()
    console.log(data);
    displayPromos()
}

function showAdd() {
    document.querySelector('#hidden').classList.remove('hidden')
    document.querySelector('#addHere').classList.add('hidden')

}

function hideAdd() {
    document.querySelector('#hidden').classList.add('hidden')
    document.querySelector('#addHere').classList.remove('hidden')
}

async function changePromo(promoId) {
    const body = {
        "name" : newName,
        "startDate" : newStartDate,
        "endDate" : newEndDate
    }
    const response = await fetch(`http://146.59.242.125:3004/promos/${promoId}`,{
        method : "PUT",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
            "Content-type" : "Application/json"
        },
        body: JSON.stringify(body)
    })  
    const data = await response.json()
    displayPromos()
}

displayPromos()