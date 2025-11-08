const add=document.getElementById("add");
const moviemodel=document.getElementById("moviemodel");
const close1=[...document.querySelectorAll(".close1")];
const addmovie =document.getElementById("submit");
const moviename=document.getElementById("moviename");
const movieimgurl=document.getElementById("movieimgurl");
const rate=document.getElementById("rate");
const discriptio=document.getElementById("discriptio");
const fff=document.getElementById("fff");
const moviemodel1=document.getElementById("moviemodel1");
const update=document.getElementById("update");
const backdrop=document.getElementById("backdrop");

  
let cl=console.log;
let formarr;
if(localStorage.getItem("formarr")){
   formarr = JSON.parse(localStorage.getItem("formarr")); 
}else{
  formarr = [];
}
cl(formarr);
const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}

const sbadge=(rating)=>{
  if(rating>4)
    {
    return "badge-success";
  }
  else if(rating>3&&rating<=4){
  return "badge-warning";
  }
  else{
    return "badge-danger";
  }
}

let createmoviecard=((arr)=>{
  let r=''
  arr.forEach((element) => {
    r+=` 
       <div class="col-md-3 col-sm-6 m-0">
      <div class="card mb-3 card1 text-white" id="${element.id}">
            <div class="card-header p-2">
                <div class="row d-flex justify-content-between align-items-center"> <div class="col-10"><h3>${element.name} </h3> </div>
                <div class="col-2 p-0">
               <h3> <span class="badge ${sbadge(element.ratee)}">${element.ratee}</span></h3>
               </div>
                </div></div>
            <div class="card-body p-0">
                <figure>
                    <img src="${element.url}"/>
                    <figcaption class="figcaption">
                        <h5>${element.name}</h5>
                        <p>${element.disc}
                        </p>
                    </figcaption>
                </figure>
            </div>
             <div class="card-footer p-2 d-flex justify-content-between align-items-center">
                
                    <button id="ad" type="button" onclick="onedit(this)" class="btn-sm add">edit</button>
                    <button id="de" type="button" onclick="onremove(this)" class="btn-sm nadd">delete</button>
                    </div>
                    
        </div>
    </div>
    `;
  });
  fff.innerHTML=r;
});
  createmoviecard(formarr);

  const onremove=((ele)=>{
    let getcon=confirm(`are you sure`);
     console.log(getcon);
    if(getcon){ 
    const rid=ele.closest("div.card").id;
    cl(rid);
    geti=formarr.findIndex((ele)=>ele.id==rid);
    cl(geti);
    formarr.splice(geti,1);
    localStorage.setItem("formarr",JSON.stringify(formarr));
    ele.closest(".col-md-3").remove();
     swal.fire({
        title:'Deleted!',
        text:'details deleted successfully',
        icon:'success',
        timer:3000
    })
  }
  })
let eid;
const onedit=((ele)=>{
     eid=ele.closest(".card").id;
    cl(eid);
    const getobj=formarr.find((ele)=>ele.id==eid);
    moviename.value=getobj.name;
    movieimgurl.value=getobj.url;
    rate.value=getobj.ratee;
    discriptio.value=getobj.disc;

    moviemodel.classList.remove("d-none");
    update.classList.remove("d-none");
    addmovie.classList.add("d-none");
   backdrop.classList.remove("d-none");

})



const onaddmovie=((ele)=>{
      console.log("ssssss");
    moviemodel.classList.toggle("d-none");
    backdrop.classList.toggle("d-none");

})
const onsubmit=((eve)=>{
          console.log("ssssss222");
          eve.preventDefault();
          const Obj={
            name:moviename.value,
            url:movieimgurl.value,
            ratee:rate.value,
            disc:discriptio.value,
            id:uuid()
          };
          cl(Obj)
        moviemodel1.reset();
        formarr.push(Obj);
        localStorage.setItem("formarr",JSON.stringify(formarr));
       
         createmoviecard(formarr);
         swal.fire({
            title:'Added!',
            text:'details added successfully',
            icon:'success',
            timer:3000
          })
          moviemodel.classList.add("d-none");
           backdrop.classList.add("d-none");
})
const onupdatemovie=((eve)=>{
  const uid=eid;
  cl(uid);
  const updatedobj={
    name:moviename.value,
    url:movieimgurl.value,
    ratee:rate.value,
    disc:discriptio.value,
    id:uid
  };

  const getindex=formarr.findIndex((ele)=>ele.id==uid);
  cl(getindex);
  formarr[getindex]=updatedobj;
  localStorage.setItem("formarr",JSON.stringify(formarr));
   createmoviecard(formarr);
    moviemodel1.reset();
    update.classList.add("d-none");
    addmovie.classList.remove("d-none");
    moviemodel.classList.add("d-none");
    swal.fire({
      title:'Updated!',
      text:'details updated successfully',
      icon:'success',
      timer:3000
    })
})
const onclose=((ele)=>
{
    moviemodel.classList.add("d-none");
   backdrop.classList.add("d-none");
     moviemodel1.reset();
      update.classList.add("d-none");
    addmovie.classList.remove("d-none");



})

add.addEventListener("click",onaddmovie);
close1.forEach(element => {
  cl(element);
   element.addEventListener("click",onclose)
});
addmovie.addEventListener("click",onsubmit)
update.addEventListener("click",onupdatemovie);
