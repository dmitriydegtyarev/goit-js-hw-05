const user = {
  name: 'Mango',
  age: 20,
  hobby: 'html',
  premium: true,
};

user.mood = 'happy';
user.hobby = 'skydiving';
user.premium = false;

// const keys = Object.entries(user);

// for (const entry of keys) {

//   const key = entry[0];
//   const value = entry[1];

//   console.log(`${key} : ${value}`);
// }

const userKeys = Object.keys(user);

for (const key of userKeys) {
  console.log(`${key}: ${user[key]}`);
}