## Backend

##### PHP ve Mysql Kurulumu
- https://www.apachefriends.org/tr/download.html
Linkinden "7.2.20" versiyonu indirilip kurulmal� ve varsay�lan php rotas�(**C:\xampp\php**) ortam de�i�kenlerine eklenmeli.

##### Composer Kurulumu
- https://getcomposer.org/download/
Linkinden Composer-Setup.exe indirilip kurulmal�.

Proje dizininde bulunan **.env** dosyas� i�erisinde ki **DATABASE_URL=mysql://root:@127.0.0.1:3306/medicine** sat�r� mysql bilgilerine g�re
g�ncellenmeli. (Mysql xampp ile kurulduysa **varsay�lan kullan�c� root,�ifresi ise bo�tur**)

Komut sat�r�ndan proje dizinine gidilip (Backend klas�r� i�erisine) s�ras� ile a�a��da ki komutlar �al��t�r�lmal�.
composer install
- php bin/console doctrine:database:create
- php bin/console doctrine:migrations:migrate
- php bin/console server:run

## Frontend
##### NodeJS ve NPM Kurulumu
- https://nodejs.org/en/
Linkinden 10.16.1-LTS s�r�m� indirilip kurulmal�.

Komut sat�r�ndan proje dizinine ge�ilip (Frontend klas�r� i�erisine) a�a��da ki komutlar uygulanmal�.
- npm install
- npm start