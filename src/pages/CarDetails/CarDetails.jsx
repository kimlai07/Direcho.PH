import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './CarDetails.css';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await api.getVehicleById(id);
                setCar(response.data);
            } catch (err) {
                setError('Error fetching car details');
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="car-details">
            <h1>{car.make} {car.model}</h1>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
            <p>Price: ${car.price}</p>
            <p>Year: {car.year}</p>
            <p>Mileage: {car.mileage} miles</p>
            <p>Description: {car.description}</p>
        </div>
    );
};

export default CarDetails;