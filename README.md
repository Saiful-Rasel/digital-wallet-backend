# 💳 Digital Wallet API

## 🎯 Project Overview

The **Digital Wallet API** is a secure, modular, and role-based backend system designed to simulate mobile wallet services like **bKash** or **Nagad**. It is built using **Express.js**, **TypeScript**, and **Mongoose**, and supports key wallet functionalities such as **top-up, withdraw, send money**, and **agent-based cash in/out** with **JWT authentication** and **role-based authorization**.

---

## 🚀 Features

- 🔐 JWT-based authentication with **secure password hashing**
- 👤 Roles: `admin`, `user`, `agent`
- 🏦 Automatic wallet creation during registration (৳50 default balance)
- 💰 Wallet operations:
  - Users: Add Money, Withdraw, Send Money
  - Agents: Cash-In (add to user's wallet), Cash-Out (withdraw from user's wallet)
- 📜 Transaction history for users and agents
- 👮 Admin controls:
  - View all users, agents, wallets, transactions
  - Block/unblock wallets
  - Approve/suspend agents
- 🧾 All transactions are tracked and stored
- ✅ Proper modular structure and route protection

---

## 🧱 Tech Stack

- **Backend:** Express.js, TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Validation:** Zod
- **Testing:** Postman

---

### user route 

router.post('/register',validateRequest(createUserZodSchema),userController.createUser)
router.get('/all-user',checkAuth(UserRole.ADMIN),userController.getAllUser)
router.patch('/:id',checkAuth(UserRole.ADMIN,UserRole.USER),userController.updateUser)
// created by admin user to agent 
router.patch("/convert-to-agent/:id",checkAuth(UserRole.ADMIN),agentcontroller.createUserToAgent)

## agent route
router.post("/cash-out",checkAuth(UserRole.AGENT), agentcontroller.agentCashOut);
router.post("/cash-in", checkAuth(UserRole.AGENT), agentcontroller.agentCashIn);

## transaction route
//everyone see their all transaction buy this route
router.get("/me",checkAuth(UserRole.USER, UserRole.AGENT), transactionController.getMyTransactionHistory);


## admin route 
router.get('/users',checkAuth(UserRole.ADMIN),adminController.adminViewAllUser)
router.get('/agents',checkAuth(UserRole.ADMIN),adminController.adminViewAllAgent)
router.get('/transactions',checkAuth(UserRole.ADMIN),adminController.adminViewAllTransaction)
router.patch('/suspend/:id',checkAuth(UserRole.ADMIN),adminController.suspendAgent)
router.patch("/approve/:id", adminController.approveAgent)
router.patch('/block/:id',checkAuth(UserRole.ADMIN),adminController.blockWallet)
router.patch('/unblock/:id',checkAuth(UserRole.ADMIN),adminController.unblockWallet)
