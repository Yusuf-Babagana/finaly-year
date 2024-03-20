let sub = document.querySelectorAll(".deleteSub");
let subId;
sub.forEach((s) =>{
    s.addEventListener('click', (e)=>{
        if(window.confirm("Deleting this subject will remove it from all the departments currently offering it. Are you sure you wish to proceed?")){
            console.log("Yes, delete subject");
        }
        else{
            console.log("Don't delete subject");
            e.preventDefault();
        }
    })
});

