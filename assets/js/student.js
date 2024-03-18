let studentContainer = document.querySelector('#studentContainer')
let newFirstName = ""
let newLastName = ""
let newAge = ""

function getPromoId(){
    let url = window.location.href
    let objUrl = new URL(url)
    const id = objUrl.searchParams.get('id')
    console.log(id);
    return id 
}

async function getStudentByPromo() {
    const response = await fetch('http://146.59.242.125:3004/promos/'+ getPromoId(),{
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
        }
    })
    const data = await response.json()
    return data
}

async function displayStudents(){
    const promo = await getStudentByPromo()
    const students = promo.students
    studentContainer.innerHTML = ""
    document.querySelector('#titouan').innerHTML =`Classe ${promo.name}`

    students.forEach(student => {
        let studentDiv = document.createElement('div')
        studentContainer.appendChild(studentDiv)
        studentDiv.classList.add('student')
        let titreStudent = document.createElement('h2')
        studentDiv.appendChild(titreStudent)
        titreStudent.classList.add('titreStudent')
        titreStudent.textContent = `${student.firstName} ${student.lastName}`
        let divButton = document.createElement('div')
        studentDiv.appendChild(divButton)
        divButton.classList.add('divButton')
        let del = document.createElement('button')
        del.classList.add('kick')
        divButton.appendChild(del)
        let modify = document.createElement('button')
        modify.classList.add('settup')
        divButton.appendChild(modify)
        modify.textContent = `Settup`
        del.textContent = `kick`
        del.addEventListener('click', () =>{
            kick(student._id)
        })
        modify.addEventListener('click', () =>{
            let modifiedDiv = document.createElement('div')
            let modifyFirstName = document.createElement('input')
            let modifyLastName = document.createElement('input')
            let modifyAge = document.createElement('input')
            let validation = document.createElement('button')
            validation.textContent = "Valider"
            studentDiv.appendChild(modifiedDiv)
            modifiedDiv.appendChild(modifyFirstName)
            modifiedDiv.appendChild(modifyLastName)
            modifiedDiv.appendChild(modifyAge)
            modifiedDiv.appendChild(validation)
            modifyFirstName.value = student.firstName
            modifyLastName.value = student.lastName
            modifyAge.value = student.age
            validation.addEventListener("click", ()=>{
                newFirstName = modifyFirstName.value
                newLastName = modifyLastName.value
                newAge = modifyAge.value
                replaceStudent(student._id)
            })
            
        })
    });
}

async function kick(studentid) {
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students/${studentid}`,{
        method : "DELETE",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
        },
    })  
    const data = await response.json()
    displayStudents()
}

async function addStudent() {
    const body = {
        "firstName" : document.querySelector('#firstName').value,
        "lastName" : document.querySelector('#lastName').value,
        "age" : document.querySelector('#age').value
    }
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students/`,{
        method : "POST",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
            "Content-type" : "Application/json"
        },
        body: JSON.stringify(body)
    })  
    const data = await response.json()
    displayStudents()
}

async function replaceStudent(studentId) {
    const body = {
        "firstName" : newFirstName,
        "lastName" : newLastName,
        "age" : newAge

    }
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students/${studentId}`,{
        method : "PUT",
        headers : {
            "Authorization" : "Bearer a0f72309-a9d7-40c0-8ef2-fc45309f9926",
            "Content-type" : "Application/json"
        },
        body: JSON.stringify(body)
    })  
    const data = await response.json()
    displayStudents()
}

function showHiddenAdd() {
    document.querySelector('#addHere').classList.add('hidden')
    document.querySelector('#hidden').classList.remove('hidden')
}

function hideHiddenAdd() {
    document.querySelector('#addHere').classList.remove('hidden')
    document.querySelector('#hidden').classList.add('hidden')
}

displayStudents()