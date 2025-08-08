# Cars24 Clone

This project is a React application that mimics the functionality and design of the car buying and selling platform, Cars24. It allows users to browse, search, and sell cars seamlessly.

## Project Structure

```2
├── public
│   ├── index.html         # Main HTML file
│   └── favicon.ico        # Favicon for the website
├── src
│   ├── components         # Reusable components
│   │   ├── Header         # Navigation bar component
│   │   ├── Footer         # Footer component
│   │   ├── CarCard        # Component to display individual car details
│   │   ├── SearchBar      # Search functionality component
│   │   └── FilterPanel     # Filtering options for car listings
│   ├── pages              # Application pages
│   │   ├── Home           # Landing page showcasing featured cars
│   │   ├── CarListing     # Page displaying a list of cars
│   │   ├── CarDetails     # Detailed view of a selected car
│   │   ├── SellCar        # Form for users to submit car details for selling
│   │   └── Profile        # User profile page
│   ├── services           # API interaction
│   │   └── api.js        # Functions to fetch vehicle data
│   ├── utils              # Utility functions
│   │   └── helpers.js     # Data manipulation and formatting functions
│   ├── styles             # Global styles
│   │   └── global.css     # Styles for the application
│   ├── App.jsx            # Main application component
│   ├── App.css            # Styles for the App component
│   └── index.js           # Entry point of the application
├── package.json           # npm configuration file
└── package-lock.json      # Dependency lock file
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd cars24-clone
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- Browse and search for cars
- Detailed view of each car
- Filter options for car listings
- User profile management
- Form to submit cars for sale

## Technologies Used

- React
- Axios (for API calls)
- CSS for styling

## License

This project is licensed under the MIT License.
