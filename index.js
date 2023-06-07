var form=document.getElementById('addForm');
var newitem = document.getElementById('items');
var pname=document.getElementById('Pname')
var pdec=document.getElementById('PDec')
var pprice=document.getElementById('PPrice')
var pquant=document.getElementById('PQuant')
form.addEventListener('submit',submitForm);

newitem.addEventListener('click',buyitem);

function submitForm(e){
    e.preventDefault();

    let mysobj={
        name: pname.value,
        description: pdec.value,
        price:pprice.value,
        quantity:pquant.value
    }
    axios.post('https://crudcrud.com/api/b0d309bc588b44168ebc37bc70507fcd/products',
    mysobj).then(res=>{
        newitem.innerHTML=""
        getitems()
    }).catch(err =>console.log(err));
    showData(mysobj)
}

function getitems(){
    axios.get('https://crudcrud.com/api/b0d309bc588b44168ebc37bc70507fcd/products')
        .then((res)=>{
            console.log(res)
            for(var i=0;i<res.data.length;i++){
                showData(res.data[i])
            }
        }).catch(err=>console.log(err))
    console.log("shows Data")
}
getitems()

function showData(obj){

    var li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode("Name: "));
    li.appendChild(document.createTextNode(obj.name));
    li.appendChild(document.createTextNode(" - Description :"));
    li.appendChild(document.createTextNode(obj.description));
    li.appendChild(document.createTextNode(" - Price :"));
    li.appendChild(document.createTextNode(obj.price));
    li.appendChild(document.createTextNode(" - Quantity :"));
    li.appendChild(document.createTextNode(obj.quantity));


    var buy=document.createElement('button');
    buy.className='btn btn-primary btn-sm float-right ml-auto buy';
    buy.appendChild(document.createTextNode('Buy'));

    //quantity field
    var qun=document.createElement('input');
    qun.classList='float-right';
    qun.setAttribute("type", "number")
    qun.setAttribute("min",1)
    qun.value=1;
    

    //Buy Button
    

    li.appendChild(buy)
    li.append(qun)
    newitem.appendChild(li);
    pname.value=""
    pdec.value=""
    pprice.value=""
    pquant.value=""

}
function buyitem(e){
    var li=e.target.parentElement;
    if(e.target.classList.contains('buy')){
        var pn=li.childNodes[1].textContent;
        var pd=li.childNodes[3].textContent;
        var pp=li.childNodes[5].textContent;
        var pq=li.childNodes[7].textContent;
        var quan=li.childNodes[9];

        console.log(pn,pd,pp,pq,quan.value)
        if(quan.value>pq){
            console.log(pq,quan.value)
            alert(`Sorry only ${pq} in stock,Do you want to buy ${pq} Quantity`)
            quan.value=pq
        }
         if(confirm(`Amount to Pay Rs.${pp*quan.value}.Are you Sure, You want to Buy?`)){
            axios.get('https://crudcrud.com/api/b0d309bc588b44168ebc37bc70507fcd/products')
            .then((res)=>{
                for(var i=0;i<res.data.length;i++){
                    if (pn==res.data[i].name){
                            let myobj={
                                name: pn,
                                description: pd,
                                price:pp,
                                quantity:pq-quan.value
                            }
                            let id=res.data[i]._id
                            axios.put(`https://crudcrud.com/api/b0d309bc588b44168ebc37bc70507fcd/products/${id}`,myobj)
                            .then(()=>{
                                newitem.innerHTML=""
                                getitems()
    
                            }).catch(err=>console.log(err))

                        
                        

                    }
                }
            }).catch(err=>console.log(err))


        }
    }
}