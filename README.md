# Digital Wallet Transaction System (Backend)

A complete backend system for a **Digital Wallet** application with support for user, agent, and admin roles.

## Features

- User authentication and authorization (JWT)
- Role-based access: Admin, Agent, User
- Wallet management: deposit, withdraw, transfer
- Transaction history
- Admin functionalities: view users/agents/transactions, approve/suspend/block/unblock users
- Data validation with Zod
- Secure password hashing using bcrypt

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Zod for validation
- bcrypt for password hashing
- CORS enabled
- ts-node-dev / nodemon for development

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Saiful-Rasel/digital-wallet-backend.git
cd digital-wallet-backend


## ALl Api


# user Api ===
router.post('/register',validateRequest(createUserZodSchema),userController.createUser)
router.get('/all-user',checkAuth(UserRole.ADMIN),userController.getAllUser)
router.patch('/:id',checkAuth(UserRole.ADMIN,UserRole.USER),userController.updateUser)

// created by admin user to agent 
router.patch("/convert-to-agent/:id",checkAuth(UserRole.ADMIN),agentcontroller.createUserToAgent)


# agent api ===
router.post( "/cash-out", checkAuth(UserRole.AGENT),agentcontroller.agentCashOut);  ==> this is not use from agent only use userEnd
router.post("/cash-in", checkAuth(UserRole.AGENT), agentcontroller.agentCashIn);

# transaction api ==
router.get("/me",checkAuth(UserRole.USER, UserRole.AGENT), transactionController.getMyTransactionHistory);

# wallet api === 
router.post('/deposit',checkAuth(UserRole.USER),walletController.depositWallet)
router.post('/withdraw',checkAuth(UserRole.USER),walletController.withdrawWallet) this route is not suitable because one user how withraw this user again / he only do cashout
router.post("/transfer", checkAuth(UserRole.USER), walletController.transfer);
router.get("/me", checkAuth(UserRole.USER,UserRole.AGENT), walletController.myHistory); 


# admin api === 

router.get('/users',checkAuth(UserRole.ADMIN),adminController.adminViewAllUser)
router.get('/agents',checkAuth(UserRole.ADMIN),adminController.adminViewAllAgent)
router.get('/transactions',checkAuth(UserRole.ADMIN),adminController.adminViewAllTransaction)
router.patch('/suspend/:id',checkAuth(UserRole.ADMIN),adminController.suspendAgent)
router.patch("/approve/:id", adminController.approveAgent)
router.patch('/block/:id',checkAuth(UserRole.ADMIN),adminController.blockWallet)
router.patch('/unblock/:id',checkAuth(UserRole.ADMIN),adminController.unblockWallet)
