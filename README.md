# YONO SBI React Native Clone

A modern React Native app inspired by the YONO by SBI mobile banking experience.  
This project aims to replicate the look, feel, and core features of the official YONO app, including authentication, balance display, transactions, quick actions, and more.

---

## 🚀 Features

- **Beautiful Onboarding & Login**
  - Login using username/password or 4-digit MPIN
  - Demo credentials provided for easy access

- **Redux State Management**
  - User authentication, theme (dark/light), and transactions are managed with Redux for robust state handling

- **Home & Lock Screens**
  - Modern, card-based UI for balance, quick pay, and services
  - Recent transactions and account summary
  - Quick actions for common banking tasks

- **Theming**
  - Light and dark mode support (toggle via Redux, just a few style changes needed for full dark mode)

- **API Integration**
  - Transactions fetched from a mock API (can be replaced with a real backend)

- **Componentized UI**
  - Reusable components for header, cards, and actions

- **Easy Customization**
  - All demo user data and credentials are in Redux and can be changed for future needs

---

## 🧑 Demo User Credentials

> Use these credentials to log in and explore the app:

- **Username:** `demoUser`
- **Password:** `demoUser`
- **MPIN:** `0000`

You can change these in `redux/userReducer.js` under the `initialState.user` object.

---


## 🛠️ Tech Stack

- **React Native** (Expo)
- **Redux** for state management
- **Redux Thunk** (if async actions are used)
- **React Navigation** (if navigation is present)
- **Mock API** for transactions

---

## 🧪 Mock API for Transactions

This project uses a public mock REST API to fetch transaction data.

**API Endpoint (GET):**
```
https://686cc7b514219674dcc916e6.mockapi.io/api/transactions
```

**Sample Response:**
```json
[
  {
    "transaction": 37,
    "receiver": "Pablo Hessel",
    "mode": "invoice",
    "timestamp": 1751965441,
    "referenceId": "493148126",
    "id": "1"
  },
  {
    "transaction": 1000,
    "receiver": "John Doe",
    "mode": "deposit",
    "timestamp": 1751965442,
    "referenceId": "493148127",
    "id": "2"
  }
  // ...more transactions
]
```

**Fields:**
- `transaction`: Amount of the transaction (number)
- `receiver`: Name of the receiver (string)
- `mode`: Type of transaction, e.g. `"deposit"`, `"invoice"`, etc. (string)
- `timestamp`: Unix timestamp of the transaction (number)
- `referenceId`: Reference ID for the transaction (string)
- `id`: Unique transaction ID (string)

**Usage:**
- The app fetches this endpoint to display recent transactions and calculate the account balance.
- You can modify or extend this API for your own backend or use [mockapi.io](https://mockapi.io/) to create more endpoints.

---

---

## 🗂️ Project Structure

```
myBank/
├── App.js
├── components/
│   └── Header.js
├── redux/
│   ├── action.js
│   ├── constant.js
│   ├── rootReducer.js
│   ├── store.js
│   ├── themeReducer.js
│   └── userReducer.js
├── screens/
│   ├── homeScreen.js
│   ├── loadingScreen.js
│   └── lockScreen.js
├── assets/
│   └── (images/icons)
└── ...
```

---

## 🎨 Theming

- The app supports dark and light modes.
- The theme state is managed in Redux (`themeReducer.js`).
- Toggle `isDarkMode` in Redux to switch themes.  
  (Just a few style changes needed to fully support dark mode.)

---

## 🔄 Extensibility

- **User Data:**  
  Change the default user in `redux/userReducer.js` for new demo accounts.
- **Transactions:**  
  Point the API to your own backend or mock server.
- **Theming:**  
  Expand the style objects to support full dark/light mode.
- **Features:**  
  Add more screens, services, and banking features as needed.

---

## 📝 How to Run

1. Clone the repo
2. Run `npm install`
3. Start with `npm start` or `expo start`
4. Use the demo credentials above to log in

---

## 🙏 Credits

This project is a personal learning/portfolio project and is not affiliated with SBI or YONO.  
All icons and images are for demonstration purposes only.

---



---


## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 4px;">
  <img src="https://github.com/user-attachments/assets/708a8550-fa36-41c4-a1db-63339c927d7c" width="16.6%"/>
  <img src="https://github.com/user-attachments/assets/6deddac8-e534-4125-9a26-44afe295069e" width="16.6%"/>
  <img src="https://github.com/user-attachments/assets/94401075-51c8-432f-b7f2-23f78d39681c" width="16.6%"/>
  <img src="https://github.com/user-attachments/assets/99715f14-d9a2-4e0c-b74d-6967536f7feb" width="16.6%"/>
  <img src="https://github.com/user-attachments/assets/bed6b0f9-847c-4242-b6ae-c101daa442c5" width="16.6%"/>
  <img src="https://github.com/user-attachments/assets/b4c8bfcf-84d7-46b3-9f8f-ccf8e5e7883b" width="16.6%"/>
</div>
