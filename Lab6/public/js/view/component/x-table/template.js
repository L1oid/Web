export default function(data) {
  result.data.forEach(function(item){
    
  });
  return `
<div>
 <br>
 ${data.id}
 ${data.name}
 ${data.price}
 ${data.description}
</div>             
`}


/*
{
    let table = document.createElement('table');
    let th = document.createElement('tr');
    let tdh1 = document.createElement('th');
    tdh1.innerText = "ID";
    let tdh2 = document.createElement('th');
    tdh2.innerText = "ProductName";
    let tdh3 = document.createElement('th');
    tdh3.innerText = "Price";
    let tdh4 = document.createElement('th');
    tdh4.innerText = "Description";
    let tdh5 = document.createElement('th');
        
    th.appendChild(tdh1);
    th.appendChild(tdh2);
    th.appendChild(tdh3);
    th.appendChild(tdh4);
    th.appendChild(tdh5);
    table.appendChild(th);
        
    return table;
  }*/