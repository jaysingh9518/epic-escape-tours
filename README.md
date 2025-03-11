# **CRM for Travel Agency**

## **📌 Description**
**CRM for Travel Agency** is a Customer Relationship Management (CRM) system tailored for travel agencies to manage their travel products efficiently. This platform allows agencies to handle solo trips, complete travel programs, and other travel-related services with ease.  

Built with **Next.js** for the frontend and **MongoDB Atlas** for the backend, it offers a seamless, user-friendly experience for travel agencies.

---

## **📑 Table of Contents**
- [🚀 Technologies Used](#-technologies-used)
- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [🛠️ Setup Guide](#️-setup-guide)
- [📌 Usage Instructions](#-usage-instructions)

---

## **🚀 Technologies Used**
### **Frontend:**
- **Next.js** (React Framework)
- **TypeScript** (Strongly typed JavaScript)
- **SCSS** (Enhanced styling with Sass)

### **Backend:**
- **Node.js** (Server-side runtime)
- **Express.js** (Lightweight backend framework)
- **MongoDB Atlas** (Cloud-based NoSQL database)

### **Additional Tools:**
- **Multer** (For file uploads)
- **Bcrypt** (For secure password hashing)
- **JWT (JSON Web Tokens)** (For authentication)

---

## **✨ Features**
✅ **Product Management**: Easily view, edit, search, and bulk modify travel product details.  
✅ **General Descriptions Management**: Add, delete, and assign descriptions to products.  
✅ **User Authentication**: Secure user registration & login with JWT-based authentication.  
✅ **File Uploads**: Upload XML files to add products to the database quickly.  
✅ **Dynamic Frontend**: Responsive and interactive UI using **Next.js**.  

---

## **📸 Screenshots**
### **📌 Dashboard View**
![DASHBOARDCRMTRAVEL](https://github.com/user-attachments/assets/1ec69ef0-47ef-467c-9ac3-89cf11fc1f63)

### **📌 CRM Information**
![CRMINFO](https://github.com/user-attachments/assets/99d71042-b04f-46d9-975c-a1ab4a98c59c)

### **📌 Travel Map Integration**
![CRMMAP](https://github.com/user-attachments/assets/f480a9b3-31f3-47e8-b2f4-e7c8e5de4423)

### **📌 Product Details View**
![CRMPHOTOSDETAIL](https://github.com/user-attachments/assets/bc8f70a3-1dda-4c28-9957-db6a0ea15c38)

### **📌 General Descriptions Management**
![GENERICDESCR](https://github.com/user-attachments/assets/49da1c03-ecc5-48ba-9e37-bafa13c2d27f)

### **📌 Database Download Management**
![CRMDATABASEDWNLOAD](https://github.com/user-attachments/assets/c4f8eeaa-6fba-42a5-8762-4ccc1f177c21)

---

## **🛠️ Setup Guide**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repository-url.git
cd CRM-for-Travel-Agency
```

### **2️⃣ Install Dependencies**
```sh
# Install frontend dependencies
cd package
npm install

# Install backend dependencies
cd ../NodejsAPI
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in both **package** (frontend) and **NodejsAPI** (backend) directories and configure it with your API keys and database credentials.

Example `.env` file for backend:
```env
MONGO_URI=your-mongodb-atlas-url
JWT_SECRET=your-secret-key
PORT=5000
```

---

## **📌 Usage Instructions**
🚀 **Run the application in one command!**  

### **▶ Development Mode** (Hot reloading enabled, no build required)
```sh
node start.js
```

### **▶ Production Mode** (Build first, then start)
```sh
node start.js prod
```

---

### **📩 Need Help?**
For any issues or contributions, feel free to open an issue in the repository.

---

This **README.md** now has **clear formatting**, **detailed instructions**, and a **professional structure**! Let me know if you need any modifications. 🚀