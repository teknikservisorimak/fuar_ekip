# ORİMAK Fuar CRM — GitHub Pages kurulumu

## 1. Dosyaları yükleyin
Bu klasördeki dosyaların hepsini aynı GitHub deposunun köküne yükleyin
(Add file → Upload files):

- `index.html` — uygulamanın kendisi
- `sw.js` — internetsiz çalışma
- `manifest.webmanifest` — iPhone/Android'e uygulama olarak kurulum
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — uygulama ikonları
- `teklif-sablon.js` — teklif / PDF şablonu


## 2. Firebase (hazır)
Uygulama `orimak-fuar-crm` Firebase projesine bağlı (Firestore, Avrupa / eur3).
Anonymous giriş açık; kurallar yalnızca `fuar_crm` koleksiyonuna, uygulamadan
giriş yapmış kullanıcıların yazmasına izin veriyor. Ayrıca bir şey yapmanız
gerekmiyor. Kayıtları Firebase Console → Firestore → Data → `fuar_crm`
altında görebilirsiniz.

## 3. Telefona / tablete uygulama olarak kurun
- **iPhone / iPad:** Safari'de siteyi açın → Paylaş → **Ana Ekrana Ekle**.
- **Android:** Chrome'da menü → **Uygulamayı yükle**.

Bir kez internetle açıldıktan sonra fuarda internet olmasa da açılır.
İnternetsizken girilen kayıtlar telefonda bekler, bağlantı gelince
otomatik gönderilir (üstte "Çevrimdışı · X bekliyor" yazar).

## Kartvizit okuma
Telefonda çalışır, internete veri göndermez. İlk kullanımda okuma aracı
(~15 MB) indirilir; bunu fuardan önce internet varken bir kez deneyin.
Latin harfli kartlarda (Türkçe, İngilizce, Almanca vb.) iyi çalışır;
Arapça/Kiril kartlarda isim alanını elle kontrol edin.

## Güncelleme
`index.html`'i yeniden yükleyin. Uygulama açılışta yeni sürümü internetten
alır; kurulu uygulamada görünmezse uygulamayı kapatıp tekrar açın.

## Teklif gönderme
1. Müşteri kaydını açın → **Teklif hazırla**.
2. Dili, makineyi ve seçenekleri seçin; fiyat ve indirimi girin. Ticari koşullar
   ve metinler standart ayarlardan dolu gelir, bu teklife özel değiştirebilirsiniz.
   Altta PDF önizlemesi anında güncellenir.
3. **Teklifi WhatsApp'tan gönder** → müşterinin WhatsApp sohbeti kısa bir mesajla
   açılır, PDF arka planda hazırlanır.
4. Uygulamaya dönün → **PDF'i sohbete gönder** → WhatsApp'ı ve müşterinin
   sohbetini seçin. Müşteriye sadece PDF gider, siteye yönlendirme yoktur.

Gönderilen teklif müşteri kaydına işlenir (durum "Teklif verildi", 3 gün sonrasına
takip). Kayıttaki eski tekliflere dokunarak PDF'i yeniden gönderebilirsiniz.

## Teklif ayarları
Üstteki **Teklif** düğmesi:
- **Standart metinler:** firma bilgileri, teslim süresi/şekli, ödeme, garanti,
  giriş/kapanış metni ve genel şartlar (Türkçe ve İngilizce ayrı).
- **Makine kataloğu:** makineler, teknik özellikler ("Başlık: değer" şeklinde),
  seçenekler ve fiyatlar.
Ayarlar tüm ekip için ortaktır.

Not: Eski sürümden kalan `teklif.html` dosyası artık kullanılmıyor; repodan
silebilirsiniz (kalması da sorun değildir).
