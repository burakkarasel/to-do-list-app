const input = document.querySelector("input")

const addBtn = document.querySelector("#add")

const list = document.querySelector("ul")

const doneBtns = document.querySelectorAll(".done")


const delEvent = function(){
    this.parentElement.remove()
}

const doneEvent = function(){
    this.parentElement.classList.toggle("done-event")
}

addBtn.addEventListener("click", () => {
    if(input.value.trim()){
        list.innerHTML += `
        <li><button class="done"><ion-icon name="checkmark-outline"></ion-icon></button>${input.value}<button class="del"><ion-icon name="close-outline"></ion-icon></button></li>
        `
        input.value = ''
    }

    const delBtns = document.querySelectorAll(".del")

    delBtns.forEach(btn => btn.addEventListener("click", delEvent))


    const doneBtns = document.querySelectorAll(".done")

    doneBtns.forEach(btn => btn.addEventListener("click", doneEvent))

})