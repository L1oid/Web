export default function() {return ` 
  <div>       
   <button>
    <slot></slot>  
   </button>
  </div>
  <style>
    button{
        color: #fff;
        background: #573b8a;
    }
  </style>          
`}