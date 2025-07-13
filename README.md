<h1 align="center" style="color:#2c3e50;">💹 Bluestock Fintech</h1>

<p align="center">
  <img src="./src/assets/Github-Images/Preview-Image.png" alt="Bluestock Preview" width="600"/>
</p>

<p align="center">
  <b>A sleek, production-ready frontend for Bluestock's IPO analytics platform.</b><br>
  Built with Angular & Bootstrap, this app offers real-time IPO insights, tracking, and document access.
</p>

---

## 📄 About the Project

Bluestock is a production-level frontend application built for Bluestock Fintech.  
It displays IPO data in a clean, responsive interface — helping investors track public offerings.  
This app powers both our platform and client dashboards with structured IPO insights.

---

## 🌟 Features

- 📊 **Detailed IPO Listings**  
  Company logo, name, price band, issue type and size, key dates, listing gains & status.

- 📈 **Live Market Metrics**  
  IPO price, listing price, current CMP, and auto-calculated returns.

- 📎 **Downloadable Documents**  
  Instant access to RHP and DRHP PDFs for every IPO.

- 💻 **Responsive UI**  
  Fully optimized for both desktop and mobile screens.

- 🌐 **Easy Embeds for Clients**  
  Designed for integration into third-party apps and platforms.

---

## 🛠️ Tech Stack

> This repository contains the **frontend only**.

- 🎯 **Framework:** Angular (standalone components)
- 🎨 **Styling:** Bootstrap 5
- 🧩 **Icons & Assets:** Bootstrap Icons, Custom Assets
- 🔗 **API:** Connected to Bluestock’s secure REST API

---

## 🚀 Live Demo

🌐 **App Link:**  
[🔗 Bluestock-Fintech.app](https://bluestock-fintech-phi.vercel.app/)

---

## 📁 Project Structure
```bash
bluestock-frontend/
├── src/
│ ├── app/
│ │ ├── components/
│ │ ├── services/
│ ├── assets/
│ │ ├── Github-Images/
│ │ │ └── Preview-Image.png
│ └── index.html
├── angular.json
├── package.json
```
---

## ⚙️ Getting Started

```bash
// environment.example.ts
export const environment = {
  production: false,
  apiUrl: 'http://your-api-url.com',
  googleSigninUrl: 'https://your-api-url.com/OAuth/account/google/login',
  googleSignupUrl: 'https://your-api-url.com/OAuth/account/google/signup',
  recaptchaSiteKey: 'YOUR_RECAPTCHA_SITE_KEY'
};
```

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rockyhans/Bluestock-Fintech.git
```
```bash
cd bluestock-frontend
```

  
2️⃣ Install Dependencies
```bash 
npm install
```

3️⃣ Run Locally
```bash
ng serve
```
App will be running at: http://localhost:4200


### 🌍 Hosting Info
The frontend is hosted on Vercel
- [[ Bluestock Fintech - IPO Web Application](https://bluestock-fintech-phi.vercel.app/)]

👤 Contributors
<table> <tr> <td align="center"> <img src="https://avatars.githubusercontent.com/u/164065390?v=4" width="80px;" alt="Danish Rizwan"/> <br /><sub><b>Danish Rizwan</b></sub><br /> <sub>Frontend Developer</sub> </td> </tr> </table>

📬 Contact
<br>
📧 Email: rdanishrizwan@example.com
<br>
💼 Team: Bluestock Fintech


