const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { User, Bookmark } = require("../models");
const { createToken } = require("../helper/jwt");

let tokenUser1;
let tokenUser2;
beforeAll(async () => {
  // Sync the database
  // Create initial data
  try {
    let user1 = await User.create({
      name: "admin",
      password: "12345",
      email: "abcd@gmail.com",
    });
    let user2 = await User.create({
      name: "admin2",
      password: "12345",
      email: "abcd2@gmail.com",
    });
    await Bookmark.create({
      UserId: 1,
      title:
        "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
      thumb:
        "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
      author: "Teo Ariesda",
      tag: "Tech News",
      key: "2025/02/12/lenovo-legion-go-s-12022025",
      statusRead: false,
      createdAt: "2025-03-25T09:53:04.335Z",
      updatedAt: "2025-03-25T09:53:04.335Z",
    });
    await Bookmark.create({
      UserId: 1,
      title:
        "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
      thumb:
        "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
      author: "Teo Ariesda",
      tag: "Tech News",
      key: "2025/02/12/lenovo-legion-go-s-12022025",
      statusRead: false,
      createdAt: "2025-03-25T09:53:04.335Z",
      updatedAt: "2025-03-25T09:53:04.335Z",
    });
    await Bookmark.create({
      UserId: 1,
      title:
        "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
      thumb:
        "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
      author: "Teo Ariesda",
      tag: "Tech News",
      key: "2025/02/12/lenovo-legion-go-s-12022025",
      statusRead: false,
      createdAt: "2025-03-25T09:53:04.335Z",
      updatedAt: "2025-03-25T09:53:04.335Z",
    });
    await Bookmark.create({
      UserId: 2,
      title:
        "Lenovo Legion Go S Resmi Hadir di Indonesia untuk Perkaya Persaingan PC Handheld",
      thumb:
        "https://thelazy.media/wp-content/uploads/2025/02/Ki-Ka-Hendry-Lim-Consumer-Product-Manager-Premium-Category-Lenovo-Indonesia_-Agnasta-Parwanto-Consumer-Marketing-Lead-Lenovo-Indonesia_-Donnie-Brahmandika-Product-Marketing-Manager-AMD-Indonesia-218x150.jpg",
      author: "Teo Ariesda",
      tag: "Tech News",
      key: "2025/02/12/lenovo-legion-go-s-12022025",
      statusRead: false,
      createdAt: "2025-03-25T09:53:04.335Z",
      updatedAt: "2025-03-25T09:53:04.335Z",
    });

    tokenUser1 = createToken({ id: user1.id });
    tokenUser2 = createToken({ id: user2.id });
  } catch (error) {
    console.log(error, "<------------ error");
  }
});

afterAll(async () => {
  // Close the database connection
  await Bookmark.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("REGISTER USER", () => {
  test("create new user with complete input /201", async () => {
    let user = {
      name: "newuser",
      email: "user@gmail.com",
      password: "12345",
    };
    let response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(201);
    expect(response.body.email).toEqual(user.email);
    expect(response.body.name).toEqual(user.name);
    expect(response.body).toHaveProperty("id", expect.any(Number));
  });
  test("create new user with empty name input /400", async () => {
    let user = {
      name: "",
      email: "user@gmail.com",
      password: "12345",
    };
    let response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Name is required");
  });
  test("create new user with empty email input /400", async () => {
    let user = {
      name: "name",
      email: "",
      password: "12345",
    };
    let response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Email is required");
  });
  test("create new user with false email format /400", async () => {
    let user = {
      name: "name",
      email: "qwertyt",
      password: "12345",
    };
    let response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Email format is incorrect");
  });
  test("create new user with empty pwd /400", async () => {
    let user = {
      name: "name",
      email: "user@gmail.com",
      password: "",
    };
    let response = await request(app).post("/users").send(user);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Password is required");
  });
});

describe("LOGIN USER", () => {
  test("complete registered user /200", async () => {
    let user = {
      name: "admin",
      password: "12345",
      email: "abcd@gmail.com",
    };
    let response = await request(app).post("/login").send(user);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  test("uncomplete input registered user /400", async () => {
    let user = {
      name: "admin",
      password: "",
      email: "abcd@gmail.com",
    };
    let response = await request(app).post("/login").send(user);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Password is required');
  });
  test("complete unregistered user /401", async () => {
    let user = {
      name: "admin",
      password: "12345",
      email: "abcd@gmaila.com",
    };
    let response = await request(app).post("/login").send(user);
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid email or password');
  });
});

describe("GET ALL NEWS", () => {
    test('get all news /200', async () => {
        let response = await request(app)
        .get('/news')
        expect(response.status).toEqual(200)
        expect(response.body[0]).toHaveProperty('title')
        expect(response.body[0]).toHaveProperty('thumb')
        expect(response.body[0]).toHaveProperty('author')
        expect(response.body[0]).toHaveProperty('tag')
        expect(response.body[0]).toHaveProperty('time')
        expect(response.body[0]).toHaveProperty('desc')
        expect(response.body[0]).toHaveProperty('key')
    })
})

describe('GET DETAIL NEWS', () => {
    test('get detail news /200', async () => {
        let response = await request(app)
        .get('/details?key=2025/02/12/lenovo-legion-go-s-12022025')
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('method')
        expect(response.body).toHaveProperty('status')
        expect(response.body).toHaveProperty('results')
        expect(response.body).toHaveProperty('results')

    })
})
describe('GET MY BOOKMARK', () => {
    test('get bookmark with token /200', async () => {
        let response = await request(app)
        .get('/bookmarks')
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(200)
        expect(response.body[0].UserId).toEqual(1)
        expect(response.body[0]).toHaveProperty('id', expect.any(Number))
        expect(response.body[0]).toHaveProperty('title', expect.any(String))
        expect(response.body[0]).toHaveProperty('thumb', expect.any(String))
        expect(response.body[0]).toHaveProperty('author', expect.any(String))
        expect(response.body[0]).toHaveProperty('key', expect.any(String))
        expect(response.body[0]).toHaveProperty('statusRead', expect.any(Boolean))
    })
    test('get bookmark with no token /401', async () => {
        let response = await request(app)
        .get('/bookmarks')
        .set('Authorization', ``)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('get bookmark with broken token /401', async () => {
        let response = await request(app)
        .get('/bookmarks')
        .set('Authorization', `Bearer dfijaisjdoiiohik`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('get bookmark with no auth /401', async () => {
        let response = await request(app)
        .get('/bookmarks')
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
})

describe('ADD BOOKMARK', () => {
    test('add bookmark with no login', async() => {
        let response = await request(app)
        .post('/bookmarks?key=2025/02/12/lenovo-legion-go-s-12022025')
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('add bookmark with broken token', async() => {
        let response = await request(app)
        .post('/bookmarks?key=2025/02/12/lenovo-legion-go-s-12022025')
        .set('Authorization', `Bearer ihjikiohu`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('add bookmark with login user1', async() => {
        let response = await request(app)
        .post('/bookmarks?key=2025/02/12/lenovo-legion-go-s-12022025')
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(201)
        expect(response.body.UserId).toEqual(1)
        expect(response.body).toHaveProperty('key')
        expect(response.body).toHaveProperty('thumb')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('statusRead')
        expect(response.body.statusRead).toEqual(false)
    })
})

describe('SUMMARIZE DETAIL', () => {
    test.concurrent('summarize without login', async() => {
        let response = await request(app)
        .get('/details-summarize?key=2025/02/12/lenovo-legion-go-s-12022025')
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    }, 1000)
    test.concurrent('summarize with broken token', async() => {
        let response = await request(app)
        .get('/details-summarize?key=2025/02/12/lenovo-legion-go-s-12022025')
        .set('Authorization', `Bearer jdsabjajsbj`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    }, 1000)
    test.concurrent('summarize with login', async() => {
        let response = await request(app)
        .get('/details-summarize?key=2025/02/12/lenovo-legion-go-s-12022025')
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('how')
        expect(response.body).toHaveProperty('what')
        expect(response.body).toHaveProperty('when')
        expect(response.body).toHaveProperty('why')
        expect(response.body).toHaveProperty('who')
    }, 1000)
})

describe('DELETE BOOKMARK', () => {
    test('delete without login', async () => {
        let response = await request(app)
        .delete('/bookmarks/1')
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('delete with broken login', async () => {
        let response = await request(app)
        .delete('/bookmarks/1')
        .set('Authorization', `Bearer jdifsonfsn`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('delete with sucess login', async () => {
        let response = await request(app)
        .delete('/bookmarks/1') //userID 1
        .set('Authorization', `Bearer ${tokenUser1}`) //userID 1
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Bookmark success deleted.')
    })
    test('deleting after deleted with sucess login /404', async () => {
        let response = await request(app)
        .delete('/bookmarks/1') //userID 1
        .set('Authorization', `Bearer ${tokenUser1}`) //userID 1
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual('Bookmark not found')
    })
    test('no bookmark found with sucess login /404', async () => {
        let response = await request(app)
        .delete('/bookmarks/100')
        .set('Authorization', `Bearer ${tokenUser1}`) //userID 1
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual('Bookmark not found')
    })
    test('delete  another bookmark with sucess login', async () => {
        let response = await request(app)
        .delete('/bookmarks/2') //userID 1
        .set('Authorization', `Bearer ${tokenUser2}`) //userID 2
        expect(response.status).toEqual(403)
        expect(response.body.message).toEqual('You are not authorized')
    })
})

describe('UPDATE STATUS BOOKMARK', () => {
    test('update bookmark without login', async () => {
        let response = await request(app)
        .put('/bookmarks/1')
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('update bookmark with broken token', async () => {
        let response = await request(app)
        .put('/bookmarks/1')
        .set('Authorization', `Bearer dnfknsknfoias`)
        expect(response.status).toEqual(401)
        expect(response.body.message).toEqual('Invalid token')
    })
    test('update not found bookmark with  login user', async () => {
        let response = await request(app)
        .put('/bookmarks/300')
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual('Bookmark not found')
    })
    test('update bookmark with same userid login user', async () => {
        let response = await request(app)
        .put('/bookmarks/3') //userid 1
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('statusRead success updated to true')
        // expect(response.body.statusRead).toEqual(true)
        // expect(response.body.UserId).toEqual(1)
        // expect(response.body).toHaveProperty('thumb')
        // expect(response.body).toHaveProperty('title')
        // expect(response.body).toHaveProperty('author')
    })
    test('update bookmark (again from false to true) with same userid login user', async () => {
        let response = await request(app)
        .put('/bookmarks/3') //userid 1
        .set('Authorization', `Bearer ${tokenUser1}`)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('statusRead success updated to false')
        // expect(response.body.statusRead).toEqual(false)
        // expect(response.body.UserId).toEqual(1)
        // expect(response.body).toHaveProperty('thumb')
        // expect(response.body).toHaveProperty('title')
        // expect(response.body).toHaveProperty('author')
    })
    test('update bookmark with different userid login user', async () => {
        let response = await request(app)
        .put('/bookmarks/4') //userid 2
        .set('Authorization', `Bearer ${tokenUser1}`) //userid1
        expect(response.status).toEqual(403)
        expect(response.body.message).toEqual('You are not authorized')
    })
    test('update bookmark with different userid login user', async () => {
        let response = await request(app)
        .put('/bookmarks/3') //userid 1
        .set('Authorization', `Bearer ${tokenUser2}`) //userid2
        expect(response.status).toEqual(403)
        expect(response.body.message).toEqual('You are not authorized')
    })
})
