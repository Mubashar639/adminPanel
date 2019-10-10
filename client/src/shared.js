import jwt from 'jsonwebtoken';
import axios from "axios";
export const AppsList = [
  {
    _id: 1,
    appName: "Mobile App Admin Panal",
    appUrl: "http://app-A.com",
    img: "/images/A.png",
    appFeatures: {
      paymentOptions: ["easypaisa", "konnect"],
      isDistributionEnabled:true,
      branches:[
        {
          id:1,
          name:'Branch A',
          type:'branch',
          stuff:{},
          incharge:'Account A'
        }
      ]
    },

    theme: {
      ads: [{ url: "some", position: "top", source: null}]
    }
  },
  {
    _id: 2,
    appName: "App B",
    appUrl: "http://app-B.com",
    img: "/images/B.png"
  },
  {
    _id: 3,
    appName: "App C",
    appUrl: "http://app-C.com",
    img: "/images/C.jpg"
  },
  {
    _id: 4,
    appName: "App D",
    appUrl: "http://app-D.com",
    img: "/images/D.png"
  },
  {
    _id: 7,
    appName: "App E",
    appUrl: "http://app-E.com"
  },
  {
    _id: 8,
    appName: "App F",
    appUrl: "http://app-F.com"
  },
  {
    _id: 9,
    appName: "App G",
    appUrl: "http://app-G.com"
  }
];

// eslint-disable-next-line
export const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export class CategoriesModel {
  categories = [
    {
      _id: 1,
      appName: "App A",
      name: "Category A",
      currencies: [
        {
          variation: [{ size: "small", price: 125 }],
          currencyName: "Currency A",
          currencyPrice: "100",
          key: 1,
          isAvailable: true
        }
      ]
    },
    {
      _id: 2,
      appName: "App A",
      name: "Category B",
      currencies: [
        {
          variation: [
            { size: "small", price: 152 },
            { size: "large", price: 245 }
          ],
          currencyName: "Currency B",
          currencyPrice: "100",
          isAvailable: true,
          key: 2
        }
      ]
    },
    {
      _id: 3,
      appName: "App B",
      name: "Category C",
      currencies: [
        {
          variation: [
            { size: "small", price: 500 },
            { size: "medium", price: 1000 },
            { size: "large", price: 1500 }
          ],
          currencyName: "Currency C",
          currencyPrice: "100",
          isAvailable: true,
          key: 3
        }
      ]
    },
    {
      _id: 4,
      appName: "App B",
      name: "Category D",
      currencies: [
        {
          variation: [
            { size: "small", price: 200 },
            { size: "medium", price: 300 },
            { size: "large", price: 400 }
          ],
          currencyName: "Currency D",
          currencyPrice: "100",
          isAvailable: false,
          key: 4
        }
      ]
    },
    {
      _id: 5,
      appName: "App B",
      name: "Category E",
      currencies: [
        {
          variation: [
            { size: "small", price: 180 },
            { size: "medium", price: 405 },
            { size: "large", price: 900 }
          ],
          currencyName: "Currency E",
          currencyPrice: "100",
          isAvailable: false,
          key: 5
        }
      ]
    }
  ];
  currencyVariationList = ["small", "medium", "large"];

  getCategory = appName =>
    this.categories.filter(cat => cat.appName === appName);

  addNewCategory = category => {
    category._id = this.categories.length + 1;
    this.categories.push(category);
    console.log(this.categories);
  };

  editCategory = category => {
    this.categories = this.categories.map(cat => {
      if (cat.name === category.name) {
        cat.currencies = category.currencies;
      }
      return cat;
    });
  };
}

// ..............................................................................>

export class AppAccountModel {
  accounts = [
    {
      id: 1,
      appName: "App A",
      name: "Account A",
      role: "Admin",
      password: "1256318",
      isSuspended: false
    },
    {
      id: 2,
      name: "Account B",
      appName: "App A",
      role: "Sales_Man",
      isSuspended: false,
      password: "1526985"
    },
    {
      id: 3,
      appName: "App A",
      name: "Account C",
      role: "Admin",
      password: "1256398",
      isSuspended: false
    },
    {
      id: 4,
      appName: "App B",
      name: "Account D",
      role: "Admin",
      password: "4589654",
      isSuspended: true
    },
    {
      id: 5,
      appName: "App B",
      name: "Account E",
      role: "Sales_Man",
      password: "1254693",
      isSuspended: true
    }
  ];

  getAccounts = appName => {
    return this.accounts.filter(account => account.appName === appName);
  };

  removeAccount = id => {
    this.accounts = this.accounts.filter(account => account.id !== Number(id));
  };

  suspendAccount = (id, isSuspended) => {
    this.accounts = this.accounts.map(account => {
      if (account.id === id) account.isSuspended = isSuspended;
      return account;
    });
  };

  addAccount = account => {
    account.id = this.accounts.length + 1;
    this.accounts.unshift(account);
  };
}

// ......................................user accounts ...................>

class Accounts {
  users = [
    {
      email: "test@test.com",
      password: "password",
      name: "Admin",
      noc: "abcdef"
    }
  ];

  addAccount = account => {
    this.users.push(account);
    return account;
  };

  login = creds =>
    this.users.find(
      user => user.email === creds.email && user.password === creds.password
    );
}

export const account = new Accounts();
export const appAccountModel = new AppAccountModel();
// export const Url = "http://localhost:5000/"

export const Url = 'https://mubasharserver734.herokuapp.com/';
export const baseUrl = axios.create({ baseURL: Url });

// eslint-disable-next-line


export const verifyToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp > Date.now() / 1000) return decodedToken
    return null
}


// {
// 	"email":"admin2123@gmail.com",
// 	"password":"1234asdf"
// }