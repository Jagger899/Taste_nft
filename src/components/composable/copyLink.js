import { toast } from 'vue3-toastify'

export const openPageInNewTab = function (routePath) {
  const baseUrl = import.meta.env.BASE_URL;
  const fullUrl = `${window.location.origin}${baseUrl}#${routePath}`;
  window.open(fullUrl, '_blank');
};

export const copyPageLink = function (routePath) {
  const baseUrl = import.meta.env.BASE_URL;
  const fullUrl = `${window.location.origin}${baseUrl}#${routePath}`;
  navigator.clipboard
    .writeText(fullUrl)
    .then(() => {
      toast.success(`Ссылка на ${routePath} скопирована!`);
    })
    .catch(() => {
      toast.error(`Не удалось скопировать ссылку на ${routePath}.`);
    });
};

export const socialIcons = [
  {
    id: 'external',
    route: '/artwork',
    action: openPageInNewTab,
  },
  {
    id: 'share',
    route: '/artwork',
    action: copyPageLink,
  },
  {
    id: 'vertical-more',
    route: '',
    action: function(){
      toast.info('Decoration')
    },
  },
]

const users = [
  {
    id: 1,
    name: 'Святослав',
    age: 25,
    email: 'svyatoslav@example.com',
    city: 'Київ',
    friends: [2, 3, 4],
  },
  {
    id: 2,
    name: 'Злата',
    age: 32,
    email: 'vlada@example.com',
    city: 'Київ',
    friends: [1, 5, 6, 8],
  },
  {
    id: 3,
    name: 'Дима',
    age: 28,
    email: 'dima@example.com',
    city: 'Київ',
    friends: [],
  },
  {
    id: 4,
    name: 'Алексей',
    age: 35,
    email: 'maxim@example.com',
    city: 'Харків',
    friends: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 5,
    name: 'Сергей',
    age: 29,
    email: 'vlad@example.com',
    city: 'Харків',
    friends: [2, 3, 4],
  },
  {
    id: 6,
    name: 'Артём',
    age: 41,
    email: 'artem@example.com',
    city: 'Харків',
    friends: [2, 3, 4, 5],
  },
  {
    id: 7,
    name: 'Андрей',
    age: 36,
    email: 'andrey@example.com',
    city: 'Херсон',
    friends: [2, 3, 4, 5, 7],
  },
  {
    id: 8,
    name: 'Родион',
    age: 45,
    email: 'denis@example.com',
    city: 'Херсон',
    friends: [],
  },
  {
    id: 9,
    name: 'Іван',
    age: 27,
    email: 'ivan@example.com',
    city: 'Херсон',
    friends: [],
  },
  {
    id: 10,
    name: 'Марія',
    age: 31,
    email: 'maria@example.com',
    city: 'Рівне',
    friends: [],
  },
]

users.forEach((item) => {
  if (item.id % 2 === 0) {
    users.forEach((user) => {
      if (user.id % 2 !== 0) {
        item.friends.push(user.id)
      }
    })
  } else {
    users.forEach((user) => {
      if (user.id % 2 === 0) {
        item.friends.push(user.id)
      }
    })
  }
})

const usersWithoutDublicates = users.reduce((init, user) => {
  user.friends = [...new Set(user.friends)];

  // console.log(user.friends);

  // return user.friends;
  return user;
},[]);

console.log(users)
