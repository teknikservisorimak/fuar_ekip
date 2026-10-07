# ORİMAK Fuar CRM — GitHub Pages kurulumu

## 1. Dosyaları yükleyin
Bu klasördeki dosyaların hepsini aynı GitHub deposunun köküne yükleyin
(Add file → Upload files):

- `index.html` — uygulamanın kendisi
- `sw.js` — internetsiz çalışma
- `manifest.webmanifest` — iPhone/Android'e uygulama olarak kurulum
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — uygulama ikonları
- `teklif-sablon.js` — teklif / PDF şablonu
- `teklif.html` — müşterinin WhatsApp linkinden açtığı teklif sayfası


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
2. Dili, makineyi ve seçenekleri seçin; isterseniz fiyat, indirim, teslim ve ödeme
   koşullarını girin. Altta PDF önizlemesi anında güncellenir.
3. **1 · WhatsApp'ta gönder** → telefonda WhatsApp, müşterinin sohbetiyle ve hazır
   mesajla açılır; mesajda teklif linki vardır, müşteri linkten PDF'i indirir.
4. **2 · PDF'i paylaş** → PDF dosyasının kendisini paylaşım menüsünden WhatsApp'a
   gönderin (müşteri sohbeti en üstte görünür).

Gönderilen teklif müşteri kaydına işlenir, durum "Teklif verildi" olur ve 3 gün
sonrasına takip tarihi konur.

Makine, özellik, seçenek ve fiyatları üstteki **Katalog** düğmesinden düzenleyin;
tüm ekip aynı kataloğu kullanır.
