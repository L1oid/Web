export default function(result) {
  let page = ` 
  <div>
   <br>
   <slot>ID Name Price Description</slot>
  </div>              
   `;
  result.data.forEach(function(item){
    page = page + ` 
    <div>
     <slot>${item.id}, ${item.name}, ${item.price}, ${item.description}</slot>
    </div>              
  `
  });
  return page
}