# ORİMAK Fuar CRM — GitHub Pages kurulumu

## 1. Dosyaları yükleyin
Bu klasördeki 6 dosyanın hepsini aynı GitHub deposunun köküne yükleyin
(Add file → Upload files):

- `index.html` — uygulamanın kendisi
- `sw.js` — internetsiz çalışma
- `manifest.webmanifest` — iPhone/Android'e uygulama olarak kurulum
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — uygulama ikonları

Firebase ayarı girilmeden de açılır; o durumda kayıtlar sadece o cihazda tutulur.

## 2. Ekiple ortak liste için Firebase
Mevcut Firebase projenizi (Servis Takip'in projesi) kullanabilirsiniz; veriler
ayrı bir `fuar_crm` koleksiyonunda durur, diğer verilere dokunmaz.

1. Firebase Console → **Proje ayarları → Genel → Uygulamalarınız** →
   Web uygulamasının **Config** bloğunu kopyalayın.
2. `index.html` içinde `const FIREBASE_CONFIG = {` satırını bulun
   (GitHub'da dosyayı açıp kalem ikonuyla düzenleyin) ve süslü parantezin
   içine yapıştırın.
3. Firebase Console → **Authentication → Sign-in method → Anonymous** →
   **Etkinleştir**.
4. Firebase Console → **Firestore → Kurallar**. Mevcut kurallarınızı
   SİLMEDEN, `match /databases/{database}/documents {` bloğunun içine
   şunu ekleyin ve Yayınla'ya basın:

```
match /fuar_crm/{id} {
  allow read, write: if request.auth != null;
}
```

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
