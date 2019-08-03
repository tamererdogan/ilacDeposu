## Backend

##### PHP ve Mysql Kurulumu
- https://www.apachefriends.org/tr/download.html
Linkinden "7.2.20" versiyonu indirilip kurulmalý ve varsayýlan php rotasý(**C:\xampp\php**) ortam deðiþkenlerine eklenmeli.

##### Composer Kurulumu
- https://getcomposer.org/download/
Linkinden Composer-Setup.exe indirilip kurulmalý.

Proje dizininde bulunan **.env** dosyasý içerisinde ki **DATABASE_URL=mysql://root:@127.0.0.1:3306/medicine** satýrý mysql bilgilerine göre
güncellenmeli. (Mysql xampp ile kurulduysa **varsayýlan kullanýcý root,þifresi ise boþtur**)

Komut satýrýndan proje dizinine gidilip (Backend klasörü içerisine) sýrasý ile aþaðýda ki komutlar çalýþtýrýlmalý.
composer install
- php bin/console doctrine:database:create
- php bin/console doctrine:migrations:migrate
- php bin/console server:run

## Frontend
##### NodeJS ve NPM Kurulumu
- https://nodejs.org/en/
Linkinden 10.16.1-LTS sürümü indirilip kurulmalý.

Komut satýrýndan proje dizinine geçilip (Frontend klasörü içerisine) aþaðýda ki komutlar uygulanmalý.
- npm install
- npm start