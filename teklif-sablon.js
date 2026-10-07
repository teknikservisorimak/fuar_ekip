/* ORİMAK Fuar CRM — kurumsal teklif şablonu
   window.Teklif.html(offer)          -> A4 teklif HTML'i (önizleme ve PDF için)
   window.Teklif.pdf(offer)           -> Promise<Blob> (PDF, sayfa numaralı)
   window.Teklif.message(offer)       -> WhatsApp mesaj metni (link yok)
   window.Teklif.total(offer)         -> {sub, discount, total, hasPrice}
   window.Teklif.STD                  -> varsayılan standart metinler
   window.Teklif.LOGO / LOGO_DARK     -> gömülü logo (data URI)
*/
(function(){
  const LOGO="data:image/png;base64,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";
  const LOGO_DARK="data:image/png;base64,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";
  const HTML2PDF="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

  // Varsayılan standart metinler (uygulamadaki Katalog > Standart metinler'den değiştirilir)
  const STD={
    company:{name:"ORİMAK Makina",address:"İnegöl / Bursa, Türkiye",phone:"",email:"",web:"www.orimak.com"},
    validityDays:"30",
    tr:{intro:"Fuarımızda göstermiş olduğunuz ilgi için teşekkür ederiz. Talebiniz doğrultusunda hazırladığımız teklifimizi bilgilerinize sunarız.",
        closing:"Teklifimizin uygun karşılanacağını umar, her türlü sorunuz için bizimle iletişime geçmenizi rica ederiz.",
        delivery:"",incoterm:"",payment:"",warranty:"",
        terms:"Fiyatlara KDV dahil değildir.\nTeklif, belirtilen geçerlilik süresi içinde geçerlidir.\nSipariş, yazılı onay ve avans ödemesi ile kesinleşir.\nNakliye, sigorta ve gümrük masrafları teslim şekline göre belirlenir."},
    en:{intro:"Thank you for your interest at our stand. As requested, please find our quotation below.",
        closing:"We trust our offer meets your requirements and remain at your disposal for any questions.",
        delivery:"",incoterm:"",payment:"",warranty:"",
        terms:"Prices exclude VAT.\nThis quotation is valid for the stated validity period.\nOrders are confirmed upon written acceptance and receipt of the advance payment.\nFreight, insurance and customs costs depend on the agreed delivery terms."}
  };

  const T={
    tr:{title:"TEKLİF",no:"Teklif No",date:"Tarih",valid:"Geçerlilik",days:"gün",to:"Teklif Verilen",from:"Teklif Veren",dear:"Sayın",
        machine:"Makine",specs:"Teknik Özellikler",prices:"Fiyatlandırma",scope:"Teklif Kapsamı",nr:"No",desc:"Açıklama",qty:"Adet",unit:"Birim Fiyat",amount:"Tutar",
        incl:"Dahil",sub:"Ara Toplam",disc:"İndirim",total:"Genel Toplam",noprice:"Fiyat bilgisi ayrıca iletilecektir.",
        terms:"Ticari Koşullar",delivery:"Teslim Süresi",incoterm:"Teslim Şekli",payment:"Ödeme",warranty:"Garanti",
        general:"Genel Şartlar",note:"Not",regards:"Saygılarımızla,",sign:"Kaşe / İmza",tel:"Tel",mail:"E-posta",
        msg:(o)=>[`Merhaba ${o.customer.name||""},`,"",`ORİMAK ${o.machine.name} teklifimizi (${o.no}) bu mesajın ardından iletiyoruz.`,"","Sorularınız için bu numaradan bize her zaman ulaşabilirsiniz.","",`Saygılarımızla,`,`${o.by?o.by+" – ":""}ORİMAK Makina`]},
    en:{title:"QUOTATION",no:"Quotation No",date:"Date",valid:"Validity",days:"days",to:"Quotation For",from:"Quotation By",dear:"Dear",
        machine:"Machine",specs:"Technical Specifications",prices:"Pricing",scope:"Scope of Supply",nr:"No",desc:"Description",qty:"Qty",unit:"Unit Price",amount:"Amount",
        incl:"Included",sub:"Subtotal",disc:"Discount",total:"Grand Total",noprice:"Pricing will be sent separately.",
        terms:"Commercial Terms",delivery:"Delivery Time",incoterm:"Delivery Terms",payment:"Payment",warranty:"Warranty",
        general:"General Conditions",note:"Note",regards:"Best regards,",sign:"Stamp / Signature",tel:"Tel",mail:"E-mail",
        msg:(o)=>[`Hello ${o.customer.name||""},`,"",`Our ORİMAK ${o.machine.name} quotation (${o.no}) follows this message.`,"","Feel free to reach us on this number for any questions.","","Best regards,",`${o.by?o.by+" – ":""}ORİMAK Makina`]}
  };
  const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const num=v=>{const n=parseFloat(String(v??"").replace(/\s/g,"").replace(/\.(?=\d{3}(\D|$))/g,"").replace(",","."));return isFinite(n)?n:0};
  function money(v,o){
    try{return new Intl.NumberFormat(o.lang==="en"?"en-GB":"tr-TR",{style:"currency",currency:o.currency||"EUR",maximumFractionDigits:2,minimumFractionDigits:0}).format(v)}
    catch(e){return Math.round(v).toLocaleString()+" "+(o.currency||"")}
  }
  function total(o){
    const base=num(o.machine&&o.machine.price);
    const opts=(o.options||[]).reduce((a,x)=>a+num(x.price),0);
    const sub=base+opts, discount=Math.min(num(o.discount),sub);
    return {base,sub,discount,total:sub-discount,hasPrice:sub>0};
  }
  const fmtDate=(ms,lang)=>new Date(ms).toLocaleDateString(lang==="en"?"en-GB":"tr-TR",{day:"2-digit",month:"long",year:"numeric"});
  function specRows(specs){
    return specs.filter(Boolean).map(s=>{const i=s.indexOf(":");return i>0&&i<48?[s.slice(0,i).trim(),s.slice(i+1).trim()]:[s,""]});
  }

  function html(o){
    const t=T[o.lang]||T.tr, tt=total(o), c=o.customer||{}, co=Object.assign({},STD.company,o.company||{});
    const specs=specRows(o.machine&&o.machine.specs||[]);
    const items=[{d:o.machine.name,sub:"",p:num(o.machine.price)}].concat((o.options||[]).map(x=>({d:x.name,p:num(x.price)})));
    const generalLines=String(o.terms||"").split("\n").map(s=>s.trim()).filter(Boolean);
    const termRows=[[t.delivery,o.delivery],[t.incoterm,o.incoterm],[t.payment,o.payment],[t.warranty,o.warranty],[t.valid,(o.validityDays?o.validityDays+" "+t.days:"")]].filter(r=>r[1]);
    let n=0;
    const U=x=>String(x).toLocaleUpperCase(o.lang==="en"?"en":"tr");
    const sec=(i,label)=>`<div class="sh"><i></i><span>${U(label)}</span></div>`;
    return `<div class="tq" lang="${o.lang==="en"?"en":"tr"}">
<style>
.tq{width:794px;box-sizing:border-box;background:#fff;color:#16181B;font-family:"IBM Plex Sans",Arial,Helvetica,sans-serif;font-size:12.5px;line-height:1.5;padding:18px 56px 20px}
.tq *{box-sizing:border-box}
.tq .hd{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}
.tq .hd img{height:60px;display:block;margin-top:2px}
.tq .ttl{text-align:right}
.tq .ttl h1{margin:0;font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-size:34px;font-weight:700;letter-spacing:.14em;line-height:1}
.tq .ttl table{margin:10px 0 0 auto;border-collapse:collapse}
.tq .ttl td{padding:1px 0 1px 14px;font-size:11.5px;text-align:right;white-space:nowrap}
.tq .ttl td:first-child{color:#6B7178}
.tq .ttl td.m{font-family:"IBM Plex Mono",Consolas,monospace;font-weight:500}
.tq .rule{display:flex;height:4px;margin:20px 0 22px}.tq .rule b{flex:0 0 120px;background:#F08900}.tq .rule i{flex:1;background:#16181B;height:1px;margin-top:3px}
.tq .parties{display:flex;gap:18px}
.tq .pty{flex:1;padding:12px 14px;border:1px solid #E1E3E6;border-radius:6px}
.tq .pty.to{border-left:3px solid #F08900}
.tq .lb{font-size:9.5px;font-weight:600;letter-spacing:.14em;color:#6B7178;margin-bottom:5px}
.tq .pty .nm{font-size:14px;font-weight:600}
.tq .pty div{font-size:11.5px}
.tq .intro{margin:22px 0 4px}
.tq .intro p{margin:6px 0 0}
.tq .sh{display:flex;align-items:center;gap:9px;margin:24px 0 10px}
.tq .sh i{width:10px;height:10px;background:#F08900;transform:rotate(45deg);flex:0 0 auto}
.tq .sh span{font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-size:17px;font-weight:700;letter-spacing:.08em;}
.tq .mname{font-family:"Barlow Condensed","Arial Narrow",Arial,sans-serif;font-size:26px;font-weight:700;line-height:1.1;margin:0 0 8px}
.tq table.sp{width:100%;border-collapse:collapse}
.tq table.sp td{padding:6px 10px;border-bottom:1px solid #EDEFF1;vertical-align:top}
.tq table.sp tr:nth-child(odd) td{background:#F7F7F8}
.tq table.sp td:first-child{width:42%;color:#4A5057}
.tq table.sp td:last-child{font-weight:500}
.tq table.pr{width:100%;border-collapse:collapse}
.tq table.pr th{background:#16181B;color:#fff;font-size:9.5px;letter-spacing:.12em;font-weight:600;padding:8px 10px;text-align:left}
.tq table.pr td{padding:9px 10px;border-bottom:1px solid #E6E8EA;vertical-align:top}
.tq table.pr .r{text-align:right;white-space:nowrap;font-family:"IBM Plex Mono",Consolas,monospace;font-size:12px}
.tq table.pr .c{text-align:center;width:46px}
.tq table.pr th.r{font-family:inherit;font-size:9.5px}
.tq table.pr .nr{width:34px;color:#6B7178}
.tq table.pr tr.main td{font-weight:600}
.tq .tot{display:flex;justify-content:flex-end;margin-top:10px}
.tq .tot table{border-collapse:collapse;min-width:300px}
.tq .tot td{padding:5px 10px}
.tq .tot td:last-child{text-align:right;font-family:"IBM Plex Mono",Consolas,monospace}
.tq .tot tr.g td{background:#F08900;color:#16181B;font-weight:700;font-size:15px;padding:9px 10px}
.tq .vat{text-align:right;font-size:10.5px;color:#6B7178;margin-top:4px}
.tq .np{padding:10px 12px;background:#FFF4E5;border-left:3px solid #F08900;margin-top:10px}
.tq table.tm{width:100%;border-collapse:collapse}
.tq table.tm td{padding:6px 0;border-bottom:1px solid #EDEFF1;vertical-align:top}
.tq table.tm td:first-child{width:170px;color:#4A5057;font-weight:500}
.tq ol{margin:0;padding-left:18px;color:#3A3F45;font-size:11.5px}
.tq ol li{margin:2px 0}
.tq .note{white-space:pre-wrap;padding:10px 12px;background:#F7F7F8;border-radius:6px}
.tq .close{margin-top:22px}
.tq .sig{display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px;gap:24px}
.tq .sig .who b{display:block;font-size:13.5px}
.tq .sig .who div{font-size:11.5px;color:#3A3F45}
.tq .sig .stamp{width:200px;height:84px;border:1px dashed #C4C8CD;border-radius:6px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;font-size:10px;color:#9AA0A6;letter-spacing:.08em;}
.tq .ft{margin-top:28px;padding-top:10px;border-top:1px solid #E1E3E6;display:flex;justify-content:space-between;gap:16px;font-size:10.5px;color:#6B7178}
.tq .ft b{color:#16181B}
.tq .avoid{page-break-inside:avoid;break-inside:avoid}
</style>
<div class="hd">
  <img src="${LOGO}" alt="ORİMAK">
  <div class="ttl"><h1>${U(t.title)}</h1>
    <table><tr><td>${t.no}</td><td class="m">${esc(o.no)}</td></tr><tr><td>${t.date}</td><td>${fmtDate(o.createdAt,o.lang)}</td></tr>${o.validityDays?`<tr><td>${t.valid}</td><td>${esc(o.validityDays)} ${t.days}</td></tr>`:""}</table>
  </div>
</div>
<div class="rule"><b></b><i></i></div>
<div class="parties avoid">
  <div class="pty to"><div class="lb">${U(t.to)}</div><div class="nm">${esc(c.name)}</div>${c.company?`<div>${esc(c.company)}</div>`:""}${c.country?`<div>${esc(c.country)}</div>`:""}${c.phone?`<div>${t.tel}: ${esc(c.phone)}</div>`:""}${c.email?`<div>${esc(c.email)}</div>`:""}</div>
  <div class="pty"><div class="lb">${U(t.from)}</div><div class="nm">${esc(co.name)}</div>${co.address?`<div>${esc(co.address)}</div>`:""}${co.phone?`<div>${t.tel}: ${esc(co.phone)}</div>`:""}${co.email?`<div>${esc(co.email)}</div>`:""}${co.web?`<div>${esc(co.web)}</div>`:""}</div>
</div>
${o.intro?`<div class="intro"><b>${t.dear} ${esc(c.name)},</b><p>${esc(o.intro)}</p></div>`:""}
<div class="avoid">${sec(++n,t.machine)}<div class="mname">${esc(o.machine.name)}</div>
${specs.length?`<table class="sp">${specs.map(r=>`<tr class="avoid">${r[1]?`<td>${esc(r[0])}</td><td>${esc(r[1])}</td>`:`<td colspan="2" style="width:auto">${esc(r[0])}</td>`}</tr>`).join("")}</table>`:""}
</div>
<div class="avoid">${sec(++n,tt.hasPrice?t.prices:t.scope)}
<table class="pr"><thead><tr><th class="nr">${U(t.nr)}</th><th>${U(t.desc)}</th><th class="c">${U(t.qty)}</th>${tt.hasPrice?`<th class="r">${U(t.unit)}</th><th class="r">${U(t.amount)}</th>`:""}</tr></thead><tbody>
${items.map((it,i)=>`<tr class="avoid${i===0?" main":""}"><td class="nr">${i+1}</td><td>${esc(it.d)}</td><td class="c">1</td>${tt.hasPrice?(it.p?`<td class="r">${money(it.p,o)}</td><td class="r">${money(it.p,o)}</td>`:`<td class="r">${t.incl}</td><td class="r">—</td>`):""}</tr>`).join("")}
</tbody></table>
${tt.hasPrice?`<div class="tot"><table>${tt.discount?`<tr><td>${t.sub}</td><td>${money(tt.sub,o)}</td></tr><tr><td>${t.disc}</td><td>− ${money(tt.discount,o)}</td></tr>`:""}<tr class="g"><td>${t.total}</td><td>${money(tt.total,o)}</td></tr></table></div>`:`<div class="np">${t.noprice}</div>`}
</div>
${termRows.length?`<div class="avoid">${sec(++n,t.terms)}<table class="tm">${termRows.map(r=>`<tr><td>${r[0]}</td><td>${esc(r[1])}</td></tr>`).join("")}</table></div>`:""}
${generalLines.length?`<div class="avoid">${sec(++n,t.general)}<ol>${generalLines.map(l=>`<li>${esc(l)}</li>`).join("")}</ol></div>`:""}
${o.note?`<div class="avoid">${sec(++n,t.note)}<div class="note">${esc(o.note)}</div></div>`:""}
<div class="avoid">
${o.closing?`<p class="close">${esc(o.closing)}</p>`:""}
<div class="sig"><div class="who"><div style="margin-bottom:6px">${t.regards}</div>${o.by?`<b>${esc(o.by)}</b>`:""}${o.byTitle?`<div>${esc(o.byTitle)}</div>`:""}${o.byPhone?`<div>${t.tel}: ${esc(o.byPhone)}</div>`:""}${o.byEmail?`<div>${esc(o.byEmail)}</div>`:""}<div><b style="display:inline;font-size:11.5px">${esc(co.name)}</b></div></div><div class="stamp">${U(t.sign)}</div></div>
<div class="ft"><div><b>${esc(co.name)}</b> · ${esc(co.address||"")}</div><div>${[co.phone,co.email,co.web].filter(Boolean).map(esc).join(" · ")}</div></div>
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
    try{if(document.fonts&&document.fonts.ready)await document.fonts.ready}catch(e){}
    try{
      const imgs=[...host.querySelectorAll("img")];await Promise.all(imgs.map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));
      let doc=null;
      await h2p().set({margin:[30,0,34,0],filename:(o.no||"teklif")+".pdf",image:{type:"jpeg",quality:.96},
        html2canvas:{scale:2,backgroundColor:"#ffffff",useCORS:true},jsPDF:{unit:"pt",format:"a4",orientation:"portrait"},
        pagebreak:{mode:["css","legacy"],avoid:[".avoid","tr"]}}).from(host.firstElementChild).toPdf().get("pdf").then(p=>{doc=p});
      const pages=doc.internal.getNumberOfPages(),W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight();
      for(let i=1;i<=pages;i++){
        doc.setPage(i);doc.setDrawColor(240,137,0);doc.setLineWidth(1.2);doc.line(42,H-22,W-42,H-22);
        doc.setFontSize(7.5);doc.setTextColor(110,113,120);
        doc.text(String(o.no||""),42,H-11);doc.text(i+" / "+pages,W-42,H-11,{align:"right"});
      }
      return doc.output("blob");
    }finally{host.remove()}
  }
  // Teklifin tek parça görseli (WhatsApp'a yapıştırmak / paylaşmak için)
  async function image(o,scale){
    const h2p=await lib();
    const host=document.createElement("div");
    host.style.cssText="position:fixed;left:-10000px;top:0;width:794px;background:#fff";
    host.innerHTML=html(o);document.body.appendChild(host);
    try{
      if(document.fonts&&document.fonts.ready)await document.fonts.ready;
      const imgs=[...host.querySelectorAll("img")];await Promise.all(imgs.map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));
      const el=host.firstElementChild;el.style.paddingTop="40px";el.style.paddingBottom="44px";
      let canvas=null;
      await h2p().set({html2canvas:{scale:scale||1.6,backgroundColor:"#ffffff",useCORS:true}}).from(el).toCanvas().get("canvas").then(c=>{canvas=c});
      return await new Promise((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error("png")),"image/png"));
    }finally{host.remove()}
  }
  function message(o){const t=T[o.lang]||T.tr;return t.msg(o).join("\n")}
  window.Teklif={html,pdf,image,message,total,money:(v,o)=>money(v,o),T,STD,LOGO,LOGO_DARK};
})();
