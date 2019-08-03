## Backend

##### PHP ve Mysql Kurulumu
- https://www.apachefriends.org/tr/download.html
Linkinden "7.2.20" versiyonu indirilip kurulmalı ve varsayılan php rotası(**C:\xampp\php**) ortam değişkenlerine eklenmeli.

##### Composer Kurulumu
- https://getcomposer.org/download/
Linkinden Composer-Setup.exe indirilip kurulmalı.

Proje dizininde bulunan **.env** dosyası içerisinde ki **DATABASE_URL=mysql://root:@127.0.0.1:3306/medicine** satırı mysql bilgilerine göre
güncellenmeli. (Mysql xampp ile kurulduysa **varsayılan kullanıcı root,şifresi ise boştur**)

Komut satırından proje dizinine gidilip (Backend klasörü içerisine) sırası ile aşağıda ki komutlar çalıştırılmalı.
- composer install
- php bin/console doctrine:database:create
- php bin/console doctrine:migrations:migrate (contuine sorusuna 'y' cevabı girilip devam edilmeli)
- php bin/console server:run

## Frontend
##### NodeJS ve NPM Kurulumu
- https://nodejs.org/en/
Linkinden 10.16.1-LTS sürümü indirilip kurulmalı.

Komut satırından proje dizinine geçilip (Frontend klasörü içerisine) aşağıda ki komutlar uygulanmalı.
- npm install
- npm start
