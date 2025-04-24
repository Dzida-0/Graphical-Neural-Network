# Graphic Neural Network

## 🧠 Description

<h4>
Graphic Neural Network is an interactive web application designed for experimenting with small-scale neural networks. Built with React + TypeScript + Tailwind CSS + Vite on the frontend and a C# ASP.NET Core backend, this app allows users to create, train, and test simple neural networks for data classification tasks.


## 🚀 Installation Instructions
 **Clone the repository**:
   ```bash
   git clone https://github.com/Dzida-0/Graphical-Neural-Network.git
   ```

   ### Backend Setup (C# ASP.NET Core)

1. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

2. **Run the server**:
   ```bash
   dotnet run
   ```

### Frontend Setup (React + Vite)

1. **Move to frontend catalog**:
   ```bash
   cd .\frontend\
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   The app should now be running at `http://localhost:5173`.

   By default, the API should be available at `https://localhost:5001`.

---

## 🧑‍💻 User Instructions

### ⚠️ Disclaimer
Not all parts of the app are complete. Some mathematical functions and behaviors (like activation functions or optimizers) might not be fully balanced or may produce unstable results under certain configurations.

---

The app is divided into several main components:

### 🔝 Top Bar
Allows users to create and manage multiple pages or sessions within the app.

### 🧠 Network Editor
- Drag the **blue ball** onto an existing layer to **add a node**.
- Drop the blue ball **between layers** to **add a new layer**.
- To **remove a node**, drag it to the **red ball**.

### 🎚️ Sliders Panel
- Lets users manually adjust **weights** and **biases** of the neural network.
- Useful for monitoring and ensuring no values are too large or `NaN`.

### 📈 Plot Panel
- Visualizes Data points and predictions from the network.
- Allows creation of new generation schemes and exploration of training effects.

### 🏋️ Training Controller
Provides controls to:
- Generate training data.
- Train or reset the network.
- Change generator settings
- Customize training parameters: **learning rate, number of epochs, batch size, optimizer, activation function, and cost function**.

⚠️ **Important**: Not all data configurations are compatible with all training settings. Some options may require adjusting the network structure to function properly.

---





## 🔧 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: C# ASP.NET Core Web API
- **Data Handling**: JSON/CSV file upload, in-memory training
