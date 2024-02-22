# Node.js Admin Uygulaması

Bu proje, bir Node.js tabanlı yönetici paneli uygulamasıdır. Kullanıcı yönetimi, oturum açma, oturum yönetimi, şifre sıfırlama gibi temel işlevleri içerir.


## Teknolojiler

- **Node.js**: Server tarafı iş mantığını yürütmek için kullanılır.
- **Express.js**: HTTP isteklerini işlemek ve API rotalarını yönlendirmek için kullanılır.
- **MongoDB**: Veritabanı olarak kullanılır, kullanıcı verileri ve diğer ilişkili bilgiler burada saklanır.
- **bcrypt**: Kullanıcı şifrelerini hashlemek ve doğrulamak için kullanılır.
- **jsonwebtoken**: Oturum yönetimi için JWT (JSON Web Token) oluşturmak ve doğrulamak için kullanılır.
- **moment**: Tarih ve saat işlemleri yapmak için kullanılır.
- **nodemailer**: E-posta göndermek için kullanılır, şifre sıfırlama işlemleri için e-posta bildirimleri göndermek için kullanılır.

## API Servisleri

Bu uygulama, aşağıdaki API servislerini sunar:

- **Kullanıcı Yönetimi**:
  - `POST /lg/register`: Yeni kullanıcı kaydı oluşturur.
  - `POST /lg/login`: Kullanıcı girişi yapar.
  - `GET /lg/me`: Mevcut kullanıcı bilgilerini döndürür.
  - `GET /lg/all-users`: Tüm kullanıcıları listeler (yetkilendirme gerektirir).
  - `POST /lg/user`: Tek bir kullanıcının bilgilerini getirir (yetkilendirme gerektirir).
  - `POST /lg/update-user`: Bir kullanıcının bilgilerini günceller (yetkilendirme ve izin gerektirir).
  - `POST /lg/delete-user`: Bir kullanıcıyı siler (yetkilendirme ve izin gerektirir).
  - `POST /lg/forget-password`: Şifre sıfırlama e-postası gönderir.
  - `POST /lg/reset-code-check`: Şifre sıfırlama kodunu doğrular ve geçici JWT oluşturur.
  - `POST /lg/reset-password`: Kullanıcının şifresini sıfırlar.

## Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Önkoşullar

- Node.js'in yüklü olduğundan emin olun. [Node.js İndirme Sayfası](https://nodejs.org/)
- MongoDB veritabanına erişiminiz olduğundan emin olun. [MongoDB İndirme ve Kurulum](https://www.mongodb.com/try/download/community)

### Kurulum

1. Bu projeyi klonlayın:
   ```sh
   git clone https://github.com/sencerarslan/nodejs-admin.git
   ```
2. Proje dizinine gidin:
   ```sh
   cd nodejs-admin
   ```
3. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
4. Ortam değişkenlerini yapılandırın:
   - `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli değerleri doldurun.

5. Uygulamayı başlatın:
   ```sh
   npm start
   ```

## Kullanım

Uygulama başarıyla başlatıldığında, API'ye istekler yapabilirsiniz. API rotalarını kullanarak kullanıcıları yönetebilir, oturum açabilir, şifre sıfırlama işlemleri yapabilirsiniz.
