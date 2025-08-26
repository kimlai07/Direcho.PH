import axios from 'axios';
import { Vehicle, ApiResponse } from '../types/vehicle';

// Keep original endpoints for future use
const privateUrlVehicle = 'https://l1y3094sxb.execute-api.us-east-1.amazonaws.com/dev/vehicle';
const prodUrlVehicle = 'https://13zbodb0tk.execute-api.ap-east-1.amazonaws.com/bentacars/vehicle?lastMonthOnly=true';
const prodUrlVehicleAllCars = 'https://13zbodb0tk.execute-api.ap-east-1.amazonaws.com/bentacars/vehicle?filterSold=true';
const newProdVehicleUrl= 'https://b6f0c09yu4.execute-api.ap-east-1.amazonaws.com/Prod/vehicles';
const newProdVehicleUrls = 'https://l1y3094sxb.execute-api.us-east-1.amazonaws.com/dev/vehicle'

// Mock data
const mockVehicles = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 1200000,
        mileage: 25000,
        fuelType: 'Petrol',
        location: 'Manila',
        imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Well-maintained Toyota Camry with excellent fuel efficiency'
    },
    {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2019,
        price: 950000,
        mileage: 35000,
        fuelType: 'Petrol',
        location: 'Quezon City',
        imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Sporty Honda Civic with modern features'
    },
    {
        id: 3,
        make: 'Mitsubishi',
        model: 'Montero Sport',
        year: 2021,
        price: 1800000,
        mileage: 15000,
        fuelType: 'Diesel',
        location: 'Cebu',
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Powerful SUV perfect for family adventures'
    },
    {
        id: 4,
        make: 'Nissan',
        model: 'Navara',
        year: 2020,
        price: 1350000,
        mileage: 28000,
        fuelType: 'Diesel',
        location: 'Davao',
        imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Reliable pickup truck for work and leisure'
    },
    {
        id: 5,
        make: 'Hyundai',
        model: 'Accent',
        year: 2018,
        price: 680000,
        mileage: 45000,
        fuelType: 'Petrol',
        location: 'Manila',
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Affordable and fuel-efficient sedan'
    },
    {
        id: 7,
        make: 'Suzuki',
        model: 'Swift',
        year: 2020,
        price: 720000,
        mileage: 22000,
        fuelType: 'Petrol',
        location: 'Taguig',
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Zippy hatchback perfect for urban driving'
    },
    {
        id: 8,
        make: 'Isuzu',
        model: 'D-Max',
        year: 2021,
        price: 1450000,
        mileage: 18000,
        fuelType: 'Diesel',
        location: 'Pasig',
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Tough and reliable pickup truck'
    }
];

// Flag to switch between mock and real API calls
const USE_MOCK_DATA = false;

export const fetchVehicles = async () => {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockVehicles;
    }
    
    try {
        const response = await axios.get(newProdVehicleUrl);
        console.log('Fetched vehicles:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const fetchAllCars = async () => {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockVehicles;
    }
    
    try {
        const response = await axios.get(newProdVehicleUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching all cars:', error);
        throw error;
    }
};

export const fetchNewVehicles = async () => {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockVehicles.filter(car => car.year >= 2020);
    }
    
    try {
        const response = await axios.get(newProdVehicleUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching new vehicles:', error);
        throw error;
    }
};

export const getVehicleById = async (id) => {
    try {
        // Fetch all cars and filter by ID
        const allCars = await fetchAllCars();
        const vehicle = allCars.find(car => car.id.toString() === id.toString());
        
        if (vehicle) {
            return { data: vehicle };
        } else {
            throw new Error('Vehicle not found');
        }
    } catch (error) {
        console.error('Error fetching vehicle by id:', error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return {
            id: 1,
            name: 'Juan Dela Cruz',
            email: 'juan.delacruz@example.com',
            phone: '+63 917 123 4567',
            location: 'Manila, Philippines',
            joinDate: '2023-01-15',
            totalSales: 3,
            totalPurchases: 1
        };
    }
    
    // Mock data for now - replace with actual API call
    return {
        name: 'Juan Dela Cruz',
        email: 'juan.delacruz@example.com',
        phone: '+63 917 123 4567'
    };
};

export const fetchUserCars = async () => {
    if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return [
            {
                id: 101,
                make: 'Toyota',
                model: 'Vios',
                year: 2018,
                price: 650000,
                status: 'For Sale',
                listedDate: '2024-01-10',
                imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
                id: 102,
                make: 'Honda',
                model: 'City',
                year: 2019,
                price: 750000,
                status: 'Sold',
                listedDate: '2023-12-15',
                soldDate: '2024-01-05',
                imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
        ];
    }
    
    // Mock data for now - replace with actual API call
    return [];
};

const api = {
    fetchVehicles,
    fetchAllCars,
    fetchNewVehicles,
    getVehicleById,
    fetchUserProfile,
    fetchUserCars
};

export default api;