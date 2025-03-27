# News (TechNows App) API Documentation

# Endpoint

List of available endpoints:

- `POST /google-login` .
- `POST /users` .
- `POST /login` .
- `GET /news` .
- `GET /details` .
- `GET /details-summarized`.
- `GET /bookmarks` .
- `POST /bookmarks` .
- `DELETE /bookmarks/:bookmarkId`. 
- `PUT /bookmarks/:bookmarkId` .

## 1. POST /google-login
Description:
- Login to application with Google Login Encoded JWT ID token

## Example request body
```json
{
    "googleToken": "<Encoded JWT ID token>",
}
```
_Response (200 - OK)_
```json
{
    "access_token": "<access-token>"
}
```

## 2. POST /users
Description:
-  Adding user manually
## Example request body
```json
{   "name": "hafidz",
    "email": "akunbaru@mail.com",
    "password": "12345"
}
```
_response (201)_
```json
{
    "id": 20,
    "name": "hafidz",
    "email": "akunbaru@mail.com"
}
```

_response (400) if email or password not filled_
```json
{
    "message": "Email required"
}
```
OR
```json
{
    "message": "Password required"
}
```

_response (400) if email already exist_
```json
{
    "message": "Email already exists"
}
```
_response (400) if email doesn't meet email format_
```json
{
    "message": "Email format is incorrect"
}
```

## 3. POST /login
Description:
- Login manually by registered account to application
## Example request body
```json
{
    "email": "admin@example.com",
    "password": "12345"
}
```
_Response (200 - OK)_
```json
{
    "access_token": "<access-token>"
}
```
## Example request body with validation error

```json
{
    "email": "",
    "password": "12345"
}
```
OR
```json
{
    "email": "admin@example.com",
    "password": ""
}

```

_Response (400)_
```json
{
    "message": "email is required"
}
```
_Response (400)_
```json
{
    "message": "password is required"
}
```
## Example request body if email doesn't registered
```json
{
    "email": "12345@example.com",
    "password": "12345"
}
```
OR
## Email / password invalid error
```json
{
    "email": "admi@example.com",
    "password": "12345"
}
```
OR
```json
{
    "email": "admin@example.com",
    "password": "1234"
}
```
_will return response (401)_
```json
{
    "message": "Invalid email or password"
} 
```




## 4. GET /news
Description: 
- Get all news on database Lazy Monkey API

_response(200)_
```json
[
    {
        "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
        "thumb": "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech News",
        "time": "February 12, 2025",
        "desc": "Jakarta, 12 Februari — Lenovo kembali menghadirkan edisi terbaru untuk lini PC Handhled-nya dengan merilis Lenovo Legion Go S yang sudah dijual secara resmi di Indonesia!\n\nSimak informasi selengkapnya di bawah!\nLenovo Legion Go...",
        "key": "2025/02/12/lenovo-legion-go-s-12022025"
    },
    {
        "title": "Axioo Pongo 735, Laptop Sweet Spot Baru Buat Para Mahasiswa, Gamers dan Konten Kreator...",
        "thumb": "https://thelazy.media/wp-content/uploads/2025/02/512-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech News",
        "time": "February 1, 2025",
        "desc": "Jakarta, 1 Februari – Sedang mencari laptop untuk kebutuhan tugas kuliah, gaming, produktivitas, atau pembuatan konten? Axioo Pongo 735 bisa jadi opsi yang tepat untuk kalian!\n\nSimak informasi selengkapnya di bawah!\nAxioo Pongo...",
        "key": "2025/02/01/axioo-pongo-735-01022025"
    }
]
```

## 5. GET /details
Description
- Get detail news by its "key"

## Request Params

> 'key' : '`2025/02/12/lenovo-legion-go-s-12022025`'


## Example response body with request /details?key=2025/02/12/lenovo-legion-go-s-12022025
_response (200)_
```js
{
    "method": "GET",
    "status": true,
    "results": {
        "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
        "author": "Teo Ariesda",
        "date": "February 12, 2025",
        "categories": [
            "Tech",
            "Tech News"
        ],
        "figure": [],
        "content": [
            "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-696x465.jpg",
            "\n\n",
            "Jakarta, 12 Februari — Lenovo kembali menghadirkan edisi terbaru untuk lini PC Handhled-nya dengan merilis Lenovo Legion Go S yang sudah dijual secara resmi di Indonesia!",
            "Simak informasi selengkapnya di bawah!",
            "https://thelazy.media/wp-content/uploads/2025/02/Untitled-1134-1024x576.jpg",
            "Legion Go S diperkenalkan pertama kali di event CES 2025 pada bulan Januari lalu, sebagai PC Handheld yang ditenagai prosesor AMD RyzenTM Z2 Go terbaru, desain yang lebih ergonomis dengan layar PureSight 8′′ WUXGA, dan fitur-fitur menarik lainnya yang akan memanjakan para pemain gim.",
            "Santi Nainggolan, Consumer Lead Lenovo Indonesia mengatakan, “Lenovo dengan bangga memperkenalkan Legion Go S di Indonesia, sebagai wujud komitmen kami untuk terus berinovasi dan memberikan pengalaman gaming terbaik bagi para gamer di Tanah Air. Kehadiran Legion Go S diharapkan dapat menjadi pilihan yang tepat bagi mereka yang baru memasuki dunia handheld gaming. Kami yakin Legion Go S akan dapat menjadi perangkat handheld gaming terbaik yang dapat digunakan kapanpun dan dimanapun, terutama bagi para first-time handheld gaming buyers yang mencari pengalaman bermain game yang mudah, menyenangkan, dan berkualitas tinggi.”",
            "https://thelazy.media/wp-content/uploads/2025/02/Untitled-11345-1024x576.jpg",
            "Untuk tunjang performa dari PC Handheld satu ini, Lenovo menggunakan prosesor ekslusif AMD Z2 Go (4 core, 8 thread) dan GPU AMD Radeon 800M dengan arsitektur RDNA 2 yang mendukung fitur Radeon Super Resolution, FidelityFX Super Resolution, dan AFMF.",
            "Lenovo Legion Go S juga dibekali memori LPDDR5X 16GB & penyimpanan 512GB PCIe Gen4, supaya gim-gim favorit kalian bisa dimainkan sembari rebahan atau berpergian saat menggunakan PC Handheld ini karena bobotnya cuma 730 gram saja.",
            "Tidak perlu ragu untuk masalah koneksi, karena telah tersedia Wi-Fi 6E, dua port USB 4, & slot microSD untuk konektivitas yang lebih fleksibel.",
            "https://thelazy.media/wp-content/uploads/2025/02/Legion-Go-S_Thermals-1024x576.png",
            "Legion ColdFront merupakan teknologi pendingin untuk mengatasi masalah suhu pada mesin dan bodi. Dengan tambahan kipas 3D berkapasitas tinggi, kalian bisa memainkan gim berat tanpa harus merasakan panas yang signifikan.",
            "https://thelazy.media/wp-content/uploads/2025/02/Legion-Go-S_Button-1024x576.png",
            "Kontroler Legion TrueStrike pada Legion Go S dirancang dengan desain unibody ergonomis yang ramping, memberikan kenyamanan maksimal bahkan selama sesi permainan panjang. Dengan tekstur anti-slip, kontroler ini memastikan pegangan yang kokoh dan stabil, sehingga gamer dapat tetap fokus tanpa khawatir kehilangan kontrol.",
            "Salah satu fitur unggulannya adalah trigger yang dapat disesuaikan, memungkinkan gamer memilih antara tekanan tombol pendek atau panjang sesuai dengan jenis permainan, seperti FPS atau balapan. Teknologi joystick Hall Effect yang digunakan juga memberikan pergerakan lebih presisi dan responsif dibandingkan joystick konvensional, menciptakan pengalaman bermain yang lebih mulus dan akurat.",
            "Selain itu, Legion Go S hadir dengan desain RGB yang dapat disesuaikan, memberikan nuansa warna yang menyatu dengan tema permainan. Pivot D-Pad yang lebih besar juga mempermudah eksekusi kombinasi tombol dalam game pertarungan atau genre lain yang memerlukan presisi tinggi.",
            " ",
            "Kalian bisa mendapatkan Lenovo Legion Go S dengan harga mulai dari Rp 8.999.000 saja. Dapatkan akses Game Pass selama tiga bulan secara gratis dan berbagai bonus lainnya untuk beberapa pembeli unitnya.",
            "https://thelazy.media/wp-content/uploads/2025/02/Legion-Go-S_XBox-Game-Pass-1-1024x576.png",
            "Gimana tanggapan kalian tentang PC Handheld terbaru dari Lenovo ini, guys?",
            "Ikuti kabar-kabar terbaru dari The Lazy Monday melalui:\nYoutube | Instagram | X | Tiktok"
        ]
    }
}
```



## 6. GET /details-summarize
Description
- Get summarized news powered by AI by its "key"

## Request Headers

> 'Authorization' : '`Bearer <your token>`'

> 'Content-Type': '`<application/json>`'

## Request Params

> 'key' : '`2025/02/12/lenovo-legion-go-s-12022025`'


## Example response body with request /details-summarize?key=2025/02/12/lenovo-legion-go-s-12022025
_response (200)_
```json
{
    "when": "12 Februari 2025",
    "what": "Lenovo meluncurkan edisi terbaru PC Handheld mereka, Lenovo Legion Go S, yang sudah dijual resmi di Indonesia. PC Handheld ini ditenagai prosesor AMD RyzenTM Z2 Go, memiliki layar PureSight 8′′ WUXGA, dan fitur-fitur menarik lainnya. Dilengkapi dengan memori LPDDR5X 16GB & penyimpanan 512GB PCIe Gen4. Kontroler Legion TrueStrike memiliki desain unibody ergonomis dengan trigger yang dapat disesuaikan dan teknologi joystick Hall Effect.",
    "where": "Jakarta, Indonesia",
    "who": "Lenovo Indonesia (Santi Nainggolan, Consumer Lead), AMD (prosesor AMD RyzenTM Z2 Go dan GPU AMD Radeon 800M)",
    "why": "Sebagai wujud komitmen Lenovo untuk terus berinovasi dan memberikan pengalaman gaming terbaik bagi para gamer di Indonesia, terutama bagi mereka yang baru memasuki dunia handheld gaming.",
    "how": "Lenovo Legion Go S dilengkapi dengan prosesor AMD Z2 Go (4 core, 8 thread) dan GPU AMD Radeon 800M, memori 16GB LPDDR5X, penyimpanan 512GB PCIe Gen4, Wi-Fi 6E, dua port USB 4, slot microSD, dan teknologi pendingin Legion ColdFront. Kontroler Legion TrueStrike dirancang ergonomis dengan trigger yang dapat disesuaikan dan teknologi joystick Hall Effect.  Dijual dengan harga mulai dari Rp 8.999.000 dan mendapatkan akses Game Pass selama tiga bulan secara gratis serta bonus lainnya untuk beberapa pembeli."
}
```
_without login / invalid token authorization bearer(401)_

```json
{
    "message": "Invalid token"
}
```

## 7. GET /bookmarks
Description:
- get all authenticated user's bookmark
## Request Headers

> 'Authorization' : '`Bearer <your token>`'

> 'Content-Type': '`<application/json>`'


_response (200)_
```json
[
    {
        "id": 2,
        "UserId": 1,
        "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
        "thumb": "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech News",
        "key": "2025/02/12/lenovo-legion-go-s-12022025",
        "statusRead": false,
        "createdAt": "2025-03-25T10:01:53.612Z",
        "updatedAt": "2025-03-25T10:06:27.559Z"
    },
    {
        "id": 1,
        "UserId": 1,
        "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
        "thumb": "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech News",
        "key": "2025/02/12/lenovo-legion-go-s-12022025",
        "statusRead": true,
        "createdAt": "2025-03-25T09:53:04.335Z",
        "updatedAt": "2025-03-26T00:03:50.890Z"
    },
    {
        "id": 3,
        "UserId": 1,
        "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
        "thumb": "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
        "author": "Teo Ariesda",
        "tag": "Tech News",
        "key": "2025/02/12/lenovo-legion-go-s-12022025",
        "statusRead": true,
        "createdAt": "2025-03-26T10:46:24.161Z",
        "updatedAt": "2025-03-27T02:01:04.909Z"
    }
]
```

## 8. POST /bookmarks
Description
- add news to bookmarks by its "key"

## Request Headers

> 'Authorization' : '`Bearer <your token>`'

> 'Content-Type': '`<application/json>`'

## Request Params

> 'key' : '`2025/02/12/lenovo-legion-go-s-12022025`'


## Example response body with request /bookmarks?key=2025/02/12/lenovo-legion-go-s-12022025
_response (200)_
```json
{
    "statusRead": false,
    "id": 80,
    "UserId": 1,
    "title": "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
    "thumb": "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
    "author": "Teo Ariesda",
    "tag": "Tech News",
    "key": "2025/02/12/lenovo-legion-go-s-12022025",
    "updatedAt": "2025-03-27T03:14:01.440Z",
    "createdAt": "2025-03-27T03:14:01.440Z"
}
```
## Example response unauthorized / broken token
_response (401)_
```json
{
    "message": "Invalid token"
}
```
## 9. DELETE /bookmarks/:bookmarkId
Description:
- delete bookmark saved by user
## Request Headers

> 'Authorization' : '`Bearer <your token>`'

> 'Content-Type': '`<application/json>`'

_response (200) SUCCESS_
```json
{
    "message": "Bookmark success deleted."
}
```
OR
_attempt to delete other user bookmark response (403)_
```json
{
    "message": "You are not authorized"
}
```
OR
_error bookmarkId not found response (404)_
```json
{
    "message": "Bookmark not found"
}
```
OR
_without login / invalid token authorization bearer(401)_

```json
{
    "message": "Invalid token"
}
```

## 9. PUT /bookmarks/:bookmarkId
Description:
- change statusRead bookmark saved by user
## Request Headers

> 'Authorization' : '`Bearer <your token>`'

> 'Content-Type': '`<application/json>`'

_response (200) SUCCESS_
```json
{
    "message": "statusRead success updated to false"
}
```
OR
_response (200) SUCCESS_
```json
{
    "message": "statusRead success updated to true"
}
```
OR
_attempt to change other user bookmark response (403)_
```json
{
    "message": "You are not authorized"
}
```
OR
_error bookmarkId not found response (404)_
```json
{
    "message": "Bookmark not found"
}
```
OR
_without login / invalid token authorization bearer(401)_

```json
{
    "message": "Invalid token"
}
```

## Global Error
_response (500)_
```json
{
    "message": "Internal server error"
}
```

## Pay attention to .env variable on .env.example file.