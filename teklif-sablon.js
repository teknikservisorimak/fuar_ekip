/* ORİMAK Fuar CRM — teklif şablonu (uygulama ve müşteri sayfası ortak kullanır)
   window.Teklif.html(offer)  -> A4 teklif HTML'i
   window.Teklif.pdf(offer)   -> Promise<Blob> (PDF)
   window.Teklif.message(offer, link) -> WhatsApp mesaj metni
   window.Teklif.total(offer) -> {sub, discount, total, hasPrice}
*/
(function(){
  const HTML2PDF="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  const COMPANY={name:"ORİMAK Makina",city:"İnegöl / Bursa",country:{tr:"Türkiye",en:"Türkiye"},web:"www.orimak.com"};
  const T={
    tr:{title:"TEKLİF",no:"Teklif No",date:"Tarih",valid:"Geçerlilik",days:"gün",to:"Sayın",customer:"Müşteri",
        machine:"Makine",specs:"Teknik özellikler",options:"Seçenekler ve hizmetler",item:"Kalem",price:"Fiyat",
        base:"Makine bedeli",sub:"Ara toplam",disc:"İndirim",total:"Toplam",noprice:"Fiyat bilgisi ayrıca iletilecektir.",
        terms:"Koşullar",delivery:"Teslim süresi",payment:"Ödeme",note:"Not",prepared:"Hazırlayan",vat:"Fiyatlara KDV dahil değildir.",
        hello:n=>`Merhaba ${n},`,intro:m=>`ORİMAK ${m} teklifimizi bilginize sunarız.`,link:"Teklifi görüntülemek ve PDF olarak indirmek için:",
        thanks:"Fuarda bizi ziyaret ettiğiniz için teşekkür ederiz.",sel:"Seçenekler"},
    en:{title:"QUOTATION",no:"Quotation No",date:"Date",valid:"Valid for",days:"days",to:"Dear",customer:"Customer",
        machine:"Machine",specs:"Technical specifications",options:"Options and services",item:"Item",price:"Price",
        base:"Machine price",sub:"Subtotal",disc:"Discount",total:"Total",noprice:"Pricing will be sent separately.",
        terms:"Terms",delivery:"Delivery time",payment:"Payment",note:"Note",prepared:"Prepared by",vat:"Prices exclude VAT.",
        hello:n=>`Hello ${n},`,intro:m=>`Please find our ORİMAK ${m} quotation below.`,link:"View the quotation and download the PDF:",
        thanks:"Thank you for visiting our stand.",sel:"Options"}
  };
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const num=v=>{const n=parseFloat(String(v??"").replace(/\s/g,"").replace(",","."));return isFinite(n)?n:0};
  function money(v,o){
    try{return new Intl.NumberFormat(o.lang==="tr"?"tr-TR":"en-GB",{style:"currency",currency:o.currency||"EUR",maximumFractionDigits:0}).format(v)}
    catch(e){return Math.round(v).toLocaleString()+" "+(o.currency||"")}
  }
  function total(o){
    const base=num(o.machine&&o.machine.price);
    const opts=(o.options||[]).reduce((a,x)=>a+num(x.price),0);
    const sub=base+opts, discount=Math.min(num(o.discount),sub);
    return {base,sub,discount,total:sub-discount,hasPrice:sub>0};
  }
  function fmtDate(ms,lang){return new Date(ms).toLocaleDateString(lang==="tr"?"tr-TR":"en-GB",{day:"2-digit",month:"long",year:"numeric"})}

  function html(o){
    const t=T[o.lang]||T.tr, tt=total(o), c=o.customer||{};
    const specs=(o.machine&&o.machine.specs||[]).filter(Boolean);
    const rows=[];
    if(tt.hasPrice&&num(o.machine.price))rows.push([t.base+" — "+o.machine.name,money(num(o.machine.price),o)]);
    (o.options||[]).forEach(x=>rows.push([x.name,tt.hasPrice&&num(x.price)?money(num(x.price),o):(tt.hasPrice?"—":"")]));
    return `<div class="tkd" lang="${o.lang==="en"?"en":"tr"}">
<style>
.tkd{width:794px;min-height:1123px;box-sizing:border-box;background:#fff;color:#0F1B26;font-family:"IBM Plex Sans",Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;position:relative}
.tkd *{box-sizing:border-box}
.tkd .band{background:#1450A3;color:#fff;padding:34px 48px 26px;display:flex;justify-content:space-between;align-items:flex-end}
.tkd .wm{font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-weight:700;font-size:40px;letter-spacing:.02em;line-height:1}
.tkd .wm small{display:block;font-family:"IBM Plex Sans",Arial,sans-serif;font-weight:500;font-size:11px;letter-spacing:.18em;opacity:.8;margin-top:6px}
.tkd .ttl{text-align:right;font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-size:30px;font-weight:700;letter-spacing:.08em}
.tkd .ttl span{display:block;font-family:"IBM Plex Mono",Consolas,monospace;font-size:12px;font-weight:500;letter-spacing:0;opacity:.9}
.tkd .kraft{height:8px;background:repeating-linear-gradient(90deg,#B9823A 0 18px,#D9A55C 18px 22px)}
.tkd .body{padding:28px 48px 120px}
.tkd .meta{display:flex;gap:24px;margin-bottom:22px}
.tkd .box{flex:1;border:1px solid #D3DBE3;border-radius:10px;padding:12px 14px}
.tkd .lbl{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#5A6A79;margin-bottom:4px}
.tkd .big{font-size:16px;font-weight:600}
.tkd h2{font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-size:22px;margin:22px 0 8px;letter-spacing:.02em;color:#1450A3}
.tkd h3{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5A6A79;margin:16px 0 6px}
.tkd ul{margin:0;padding-left:18px}
.tkd li{margin:2px 0}
.tkd table{width:100%;border-collapse:collapse;margin-top:6px}
.tkd th{text-align:left;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#5A6A79;border-bottom:2px solid #0F1B26;padding:6px 4px}
.tkd td{padding:8px 4px;border-bottom:1px solid #E3E8EE}
.tkd td.r,.tkd th.r{text-align:right;font-family:"IBM Plex Mono",Consolas,monospace;white-space:nowrap}
.tkd tr.tot td{border-bottom:0;font-weight:700;font-size:16px;padding-top:12px}
.tkd tr.sm td{color:#5A6A79;border-bottom:0;padding:3px 4px}
.tkd .np{margin-top:10px;padding:10px 12px;background:#F3E6D2;border-radius:8px}
.tkd .terms{display:grid;grid-template-columns:150px 1fr;gap:6px 14px;margin-top:6px}
.tkd .terms div:nth-child(odd){color:#5A6A79}
.tkd .foot{position:absolute;left:0;right:0;bottom:0;padding:16px 48px 22px;border-top:1px solid #D3DBE3;display:flex;justify-content:space-between;font-size:11px;color:#5A6A79}
.tkd .foot b{color:#0F1B26}
</style>
<div class="band">
  <div class="wm">ORİMAK<small>${o.lang==="tr"?"KUTU KESİM VE PAKETLEME MAKİNELERİ":"BOX CUTTING & PACKAGING MACHINERY"}</small></div>
  <div class="ttl">${t.title}<span>${esc(o.no)}</span></div>
</div>
<div class="kraft"></div>
<div class="body">
  <div class="meta">
    <div class="box"><div class="lbl">${t.customer}</div><div class="big">${esc(c.name)}</div>${c.company?`<div>${esc(c.company)}</div>`:""}${c.country?`<div>${esc(c.country)}</div>`:""}</div>
    <div class="box" style="flex:0 0 220px"><div class="lbl">${t.date}</div><div>${fmtDate(o.createdAt,o.lang)}</div><div class="lbl" style="margin-top:8px">${t.valid}</div><div>${num(o.validityDays)||30} ${t.days}</div></div>
  </div>
  <h2>${t.machine}: ${esc(o.machine&&o.machine.name)}</h2>
  ${specs.length?`<h3>${t.specs}</h3><ul>${specs.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>`:""}
  ${rows.length?`<h3>${tt.hasPrice?t.price:t.options}</h3>
  <table><thead><tr><th>${t.item}</th>${tt.hasPrice?`<th class="r">${t.price}</th>`:""}</tr></thead><tbody>
  ${rows.map(r=>`<tr><td>${esc(r[0])}</td>${tt.hasPrice?`<td class="r">${r[1]}</td>`:""}</tr>`).join("")}
  ${tt.hasPrice?`${tt.discount?`<tr class="sm"><td>${t.sub}</td><td class="r">${money(tt.sub,o)}</td></tr><tr class="sm"><td>${t.disc}</td><td class="r">− ${money(tt.discount,o)}</td></tr>`:""}
  <tr class="tot"><td>${t.total}</td><td class="r">${money(tt.total,o)}</td></tr>`:""}
  </tbody></table>`:""}
  ${tt.hasPrice?`<div style="font-size:11px;color:#5A6A79;margin-top:4px">${t.vat}</div>`:`<div class="np">${t.noprice}</div>`}
  ${(o.delivery||o.payment||o.note)?`<h3>${t.terms}</h3><div class="terms">
    ${o.delivery?`<div>${t.delivery}</div><div>${esc(o.delivery)}</div>`:""}
    ${o.payment?`<div>${t.payment}</div><div>${esc(o.payment)}</div>`:""}
    ${o.note?`<div>${t.note}</div><div style="white-space:pre-wrap">${esc(o.note)}</div>`:""}
  </div>`:""}
</div>
<div class="foot">
  <div><b>${COMPANY.name}</b><br>${COMPANY.city}, ${COMPANY.country[o.lang]||"Türkiye"}<br>${COMPANY.web}</div>
  <div style="text-align:right">${o.by?`${t.prepared}: <b>${esc(o.by)}</b><br>`:""}${o.byPhone?esc(o.byPhone)+"<br>":""}${o.byEmail?esc(o.byEmail):""}</div>
</div>
</div>`;
  }

  let libP=null;
  function lib(){
    if(window.html2pdf)return Promise.resolve(window.html2pdf);
    if(!libP)libP=new Promise((res,rej)=>{const s=document.createElement("script");s.src=HTML2PDF;s.onload=()=>res(window.html2pdf);s.onerror=()=>{libP=null;rej(new Error("html2pdf"))};document.head.appendChild(s)});
    return libP;
  }
  async function pdf(o){
    const h2p=await lib();
    const host=document.createElement("div");
    host.style.cssText="position:fixed;left:-10000px;top:0;width:794px;background:#fff";
    host.innerHTML=html(o);document.body.appendChild(host);
    try{ if(document.fonts&&document.fonts.ready)await document.fonts.ready; }catch(e){}
    try{
      return await h2p().set({margin:0,filename:(o.no||"teklif")+".pdf",image:{type:"jpeg",quality:.95},
        html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:true},jsPDF:{unit:"px",format:[794,1123],orientation:"portrait",hotfixes:["px_scaling"]},
        pagebreak:{mode:["css","legacy"]}}).from(host.firstElementChild).outputPdf("blob");
    }finally{host.remove()}
  }
  function message(o,link){
    const t=T[o.lang]||T.tr, tt=total(o), c=o.customer||{};
    const lines=[t.hello(c.name||""),"",t.intro(o.machine&&o.machine.name||""),"",`${t.no}: ${o.no}`,`${t.machine}: ${o.machine&&o.machine.name||""}`];
    if((o.options||[]).length)lines.push(`${t.sel}: ${o.options.map(x=>x.name).join(", ")}`);
    if(tt.hasPrice)lines.push(`${t.total}: ${money(tt.total,o)}`);
    if(link)lines.push("",t.link,link);
    lines.push("",t.thanks,`${o.by?o.by+" – ":""}ORİMAK Makina`);
    return lines.join("\n");
  }
  window.Teklif={html,pdf,message,total,money:(v,o)=>money(v,o),T};
})();
