const form=document.querySelector("#task-form");
const todo=document.querySelector("#todo")
const tasks=document.querySelectorAll(".task");
const taskLanes=document.querySelectorAll(".box");
const saveBtn = document.querySelector(".savebtn");
const syncBtn = document.querySelector('.lastbtn');

let todoItems = [];
let doingItems = [];
let doneItems = [];

let source = null;
let target = null;
form.addEventListener("submit",function(event){
    // after every submit on form page refreshes to prevent default behaviour
    event.preventDefault();
    const task=event.target[0].value;
    // console.log(task) 
    if(task.length){
        const div=document.createElement('div');
        const para=document.createElement('p');
        para.innerText=task;
        div.classList.add('task'); 
        
        div.setAttribute('draggable','true');

        div.addEventListener('dragstart', (e) =>  {
            div.classList.add('is-dragging')
            source = e.target.parentNode.id;
        });
        div.addEventListener('dragend', (e) => {
            div.classList.remove('is-dragging');
            target = e.target.parentNode.id;
            recalculateTasksArr(task);
        });
        todoItems.push(task);
        div.appendChild(para);
        todo.appendChild(div);
        event.target[0].value="";
    }
  
})


saveBtn.addEventListener("click",function(){
    const tasks=JSON.stringify({
        todo :todoItems,
        doing:doingItems,
        done :doneItems
    });
    localStorage.setItem('tasks',tasks);
    alert('Information saved')
})

syncBtn.addEventListener("click",()=>{
    const savedItems=JSON.parse(localStorage.getItem('tasks'));
    // console.log(savedItems)
    const newtodo=savedItems.todo;
    // console.log(savedItems.todo)
    recreate(newtodo,todo);
    const newdoing=savedItems.doing;
    recreate(newdoing,doing);
    // console.log(savedItems.doing)
    const newdone=savedItems.done;
    recreate(newdone,done);
  
})

function recreate(p,pa){
    for(let i=0;i<p.length;i++){
        const div=document.createElement('div');
        const para=document.createElement('p');
        para.innerText=p[i];
        div.classList.add('task'); 
        div.appendChild(para);
        pa.appendChild(div);
    }
}
function recalculateTasksArr(task){
    let sourceArr = [];
    let targetArr = [];

    if (source === "todo") {
        sourceArr = [...todoItems];
    } else if (source === "doing") {
        sourceArr = [...doingItems]
    } else {
        sourceArr = [...doneItems];
    }

    if (target === "todo") {
        targetArr = [...todoItems];
    } else if (target === "doing") {
        targetArr = [...doingItems]
    } else {
        targetArr = [...doneItems];
    }

  

    const taskIndex = sourceArr.findIndex((el) => el === task);
    sourceArr.splice(taskIndex,1);
    targetArr.push(task);

    if (source === "todo") {
        todoItems = sourceArr;
    } else if (source === "doing") {
        doingItems = sourceArr
    } else {
        doneItems = sourceArr;
    }

    if (target === "todo") {
        todoItems = targetArr;
    } else if (target === "doing") {
        doingItems = targetArr
    } else {
        doneItems = targetArr;
    }

}




taskLanes.forEach(phase => {
    phase.addEventListener('dragover', (e) => {

        // e.preventDefault();
        const bottomTask = closestSibling(phase, e.clientY);
        const currentTask = document.querySelector('.is-dragging');
        if (!bottomTask) {
            phase.appendChild(currentTask)
        } else {
          phase.insertBefore(currentTask, bottomTask);
        }
    })
});





function closestSibling(phase, mouseY) {
    const els = phase.querySelectorAll(".task:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = -100000000000000;

    els.forEach(task => {
        const {top} = task.getBoundingClientRect();
        const offset = (mouseY - top);

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
}