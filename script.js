const form=document.querySelector("#task-form");
const todo=document.querySelector("#todo")
const tasks=document.querySelectorAll(".task");
form.addEventListener("submit",function(event){
    // after every submit on form page refreshes to prevent default behaviour
    event.preventDefault();
    const task=event.target[0].value;
    console.log(task) 
    if(task.length){
        const div=document.createElement('div');
        const para=document.createElement('p');
        para.innerText=task;
        div.classList.add('task'); 
        div.appendChild(para);
        div.setAttribute('draggable','true');
        todo.appendChild(div);
        event.target[0].value="";
    }
  
})
tasks.forEach((task)=>{
    task.addEventListener("dragstart",()=>{

    })
})
