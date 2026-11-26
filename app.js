app.js// TINKLO storefront starter. Replace the WhatsApp number with your verified 10-digit number.
const WHATSAPP_NUMBER = "916364608691"; // India country code + 10-digit mobile, digits only
const products = [
 {id:1,name:"USB Flash Drive",desc:"Compact storage for everyday files.",price:299,emoji:"💾"},
 {id:2,name:"Fast Charger",desc:"Convenient charging for compatible devices.",price:499,emoji:"🔌"},
 {id:3,name:"Bluetooth Earbuds",desc:"Wireless audio for daily listening.",price:799,emoji:"🎧"},
 {id:4,name:"USB-C Cable",desc:"Reliable everyday charging cable.",price:149,emoji:"🔗"},
 {id:5,name:"Bluetooth Speaker",desc:"Portable sound for your desk or room.",price:999,emoji:"🔊"},
 {id:6,name:"Power Bank",desc:"Extra power while you're on the go.",price:899,emoji:"🔋"},
 {id:7,name:"Wireless Mouse",desc:"Simple wireless control for work and study.",price:399,emoji:"🖱️"},
 {id:8,name:"Phone Stand",desc:"A handy stand for video and calls.",price:199,emoji:"📱"}
];
const cart = {};
const money = n => "₹" + n.toLocaleString("en-IN");
const productRoot = document.querySelector("#productGrid");
products.forEach(p=>{
 const card=document.createElement("article");card.className="product";
 card.innerHTML=`<div class="visual" aria-hidden="true">${p.emoji}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="add">Add to cart</button>`;
 card.querySelector("button").addEventListener("click",()=>{cart[p.id]=(cart[p.id]||0)+1;renderCart()});
 productRoot.appendChild(card);
});
function renderCart(){
 const lines=products.filter(p=>cart[p.id]).map(p=>`${p.name} × ${cart[p.id]} — ${money(p.price*cart[p.id])}`);
 const total=products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);
 document.querySelector("#cartItems").textContent=lines.length?lines.join(" | ")+` | Total: ${money(total)}`:"Your cart is empty.";
 const qty=Object.values(cart).reduce((a,b)=>a+b,0);
 document.querySelector("#cartCount").textContent=`${qty} item${qty===1?"":"s"}`;
 document.querySelector("#checkout").disabled=!qty;
}
document.querySelector("#cartTotal").addEventListener("click",()=>{
 if(WHATSAPP_NUMBER.includes("X")){alert("Please set your verified WhatsApp number in app.js before ordering.");return;}
 const lines=products.filter(p=>cart[p.id]).map(p=>`${p.name} x ${cart[p.id]} = ${money(p.price*cart[p.id])}`);
 const total=products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);
 const msg=encodeURIComponent(`Hello TINKLO! I'd like to order:\n${lines.join("\n")}\nTotal: ${money(total)}\nPlease confirm availability and delivery.`);
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank","noopener");
});
let installPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;document.querySelector("#install").classList.remove("hidden")});
document.querySelector("#install").addEventListener("click",async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;}});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
renderCart();
