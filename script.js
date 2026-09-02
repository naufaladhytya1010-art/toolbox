const modal=document.getElementById("modal");
const modalContent=document.getElementById("modalContent");
const closeModal=document.getElementById("closeModal");
document.getElementById("year").textContent=new Date().getFullYear();

const tools={
calculator:{
 title:"🧮 Kalkulator",
 desc:"Kalkulator sederhana untuk perhitungan cepat.",
 html:`<div class="result" id="calcResult">0</div>
 <div class="calc">${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map(x=>`<button data-calc="${x}">${x}</button>`).join("")}</div>`,
 init(){
   let expr="";
   document.querySelectorAll("[data-calc]").forEach(b=>b.onclick=()=>{
     const v=b.dataset.calc;
     if(v==="="){try{expr=String(Function("return "+expr)());}catch{expr="Error"}}
     else if(expr==="Error") expr=v;
     else expr+=v;
     document.getElementById("calcResult").textContent=expr||"0";
   });
 }
},
ai:{
 title:"🤖 AI Chat",
 desc:"Wadah UI untuk AI Chat. Backend/API dapat disambungkan nanti.",
 html:`<div class="notice">Frontend sudah disiapkan. Untuk AI sungguhan, kita perlu backend dan API model AI agar API key tidak ditaruh langsung di browser.</div>
 <input class="tool-input" placeholder="Ketik pesan..." disabled>
 <button class="tool-btn" disabled>Kirim</button>`
},
deploy:{
 title:"🚀 Deployment Website",
 desc:"Tempat untuk menyiapkan fitur deploy.",
 html:`<div class="notice">Template deployment siap dikembangkan. Nanti bisa ditambah upload file, build project, deployment status, dan domain.</div>`
},
hosting:{
 title:"🌐 Hosting Website",
 desc:"Panel awal untuk fitur hosting.",
 html:`<div class="notice">Template hosting siap dikembangkan. Nanti bisa ditambah project list, domain, storage, SSL, dan pengaturan website.</div>`
},
expense:{
 title:"💰 Pengeluaran Harian",
 desc:"Catat pengeluaran harian dan hitung totalnya.",
 html:`<input class="tool-input" id="expenseName" placeholder="Nama pengeluaran">
 <input class="tool-input" id="expenseAmount" type="number" placeholder="Jumlah (Rp)">
 <button class="tool-btn" id="addExpense">Tambah</button>
 <div id="expenseList" style="margin-top:18px"></div>
 <h3 style="margin-top:18px">Total: <span id="expenseTotal">Rp0</span></h3>`,
 init(){
   let total=0;
   const list=document.getElementById("expenseList");
   document.getElementById("addExpense").onclick=()=>{
     const name=document.getElementById("expenseName").value.trim();
     const amount=Number(document.getElementById("expenseAmount").value);
     if(!name||!amount)return;
     total+=amount;
     const item=document.createElement("div");
     item.className="notice";
     item.style.marginTop="8px";
     item.textContent=`${name} — Rp${amount.toLocaleString("id-ID")}`;
     list.appendChild(item);
     document.getElementById("expenseTotal").textContent=`Rp${total.toLocaleString("id-ID")}`;
     document.getElementById("expenseName").value="";
     document.getElementById("expenseAmount").value="";
   };
 }
},
tiktok:{
 title:"🎵 TikTok Downloader",
 desc:"Antarmuka untuk fitur download video TikTok.",
 html:`<input class="tool-input" placeholder="Tempel URL video TikTok di sini">
 <button class="tool-btn">Download</button>
 <p style="margin-top:14px;opacity:.5;font-size:13px">Fitur backend downloader belum terhubung. Pastikan penggunaan mematuhi hak cipta dan ketentuan layanan platform.</p>`
}
};

document.querySelectorAll("[data-tool]").forEach(card=>card.onclick=()=>{
 const tool=tools[card.dataset.tool];
 modalContent.innerHTML=`<h2 class="tool-title">${tool.title}</h2><p class="tool-desc">${tool.desc}</p>${tool.html}`;
 modal.classList.add("show");
 if(tool.init)tool.init();
});
closeModal.onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
