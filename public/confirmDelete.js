let sub = document.querySelectorAll(".deleteSub");
let subId;
sub.forEach((s) =>{
    s.addEventListener('click', (e)=>{
        // subId = JSON.parse(JSON.stringify(e.target.nextElementSibling.dataset.subjectid));
        // console.log(subId);
        if(window.confirm("Deleting this subject will remove it from all the departments currently offering it. Are you sure you wish to proceed?")){
            console.log("hey inside");
        }
        else{
            console.log("no");
            e.preventDefault();
        }
    })
});

