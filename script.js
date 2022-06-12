const input = document.querySelector("input");
const addBtn = document.querySelector("#add");
const list = document.querySelector("ul");

let liItems = JSON.parse(localStorage.getItem("todos")) || [];

window.onload = function(){
    input.focus();
};

renderSavedTodos();

function renderSavedTodos(){
    liItems.forEach(li => {
        createListElement(li);
    });
};

function createListElement(item) {
    const {id, content, isDone} = item;
    list.innerHTML += `
        <li id="${id}" class="${isDone}">
        <button class="done">
        <ion-icon name="checkmark-outline" class="done-i">
        </ion-icon>
        </button>
        ${content}
        <button class="del">
        <ion-icon name="close-outline" class="del-i">
        </ion-icon>
        </button>
        </li>
        `;
}

// addBtn function
addBtn.addEventListener("click", () => {
    if(input.value.trim()){
        const liItem = {
            id: new Date().getTime(),
            isDone: false,
            content: input.value
        };

        liItems.push(liItem)

        localStorage.setItem("todos", JSON.stringify(liItems))

        createListElement(liItem);
        input.value = ""
    }
})

// adding todo with enter button
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
       addBtn.click()
    }
})

//arranging done & del buttons functions
list.addEventListener("click", (e) => {
    if(e.target.classList.contains("done") || e.target.classList.contains("del")){
        const id = e.target.parentElement.getAttribute("id")

        if(e.target.classList.contains("done")){
            liItems.map((item, index, arr) => {
                if(item.id == id) {
                    arr[index].isDone = !arr[index].isDone
                }
            });

            localStorage.setItem("todos", JSON.stringify(liItems))
        e.target.parentElement.classList.contains("done-event")
        ?
        e.target.parentElement.classList.remove("done-event")
        :
        e.target.parentElement.classList.add("done-event")
        
        }
        if(e.target.classList.contains("del")){

            liItems = liItems.filter(item => item.id != id)

            localStorage.setItem("todos", JSON.stringify(liItems))

            e.target.parentElement.remove()
        }
    }
    if(e.target.classList.contains("done-i") || e.target.classList.contains("del-i")){
        const id = e.target.parentElement.parentElement.getAttribute("id")
        if(e.target.classList.contains("done-i")){
            liItems.map((item, index, arr) => {
                if(item.id == id) {
                    arr[index].isDone = !arr[index].isDone
                }
            });

            e.target.parentElement.parentElement.classList.contains("done-event")
            ?
            e.target.parentElement.parentElement.classList.remove("done-event")
            :
            e.target.parentElement.parentElement.classList.add("done-event")

            localStorage.setItem("todos", JSON.stringify(liItems))
        }
        if(e.target.classList.contains("del-i")){
            liItems = liItems.filter(item => item.id != id)

            localStorage.setItem("todos", JSON.stringify(liItems))

            e.target.parentElement.parentElement.remove()
        }
    }
})