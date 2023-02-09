export interface City {
    city: string
}

export interface Rating {
    average_rating: number;
    city: string;
    hotel_name: string;
}

export interface HotelData {
    hotelName: string;
    city: string;
    address: string;
    superiorPrice: string;
    deluxePrice: string;
    standardPrice: string;
    superiorStock: number;
    deluxeStock: number;
    standardStock: number;
    superiorFacility: string;
    deluxeFacility: string;
    standardFacility: string;
}

export interface TopHotel {
    hotel_city: string;
    hotel_name: string;
    id: number;
    total_booking: number
}

export interface Bookings {
    address: string;
    amount_of_deluxe_room: number;
    amount_of_standard_room: number;
    amount_of_superior_room: number;
    booking_id: number;
    checkin: string;
    checkout: string;
    city: string;
    hotel: string;
    phone: string;
    rating: number;
    total_price: number    
}

export interface ProfileCustomerInterface {
    username: string;
    name: string;
    email: string;
    phone: string
}

export interface ProfileHotelInterface {
    address: string,
    city: string,
    deluxeCapacity: string,
    deluxeFacility: string,
    deluxePrice: string,
    email: string,
    name: string,
    phone: string,
    standardCapacity: string,
    standardFacility: string,
    standardPrice: string,
    superiorCapacity: string,
    superiorFacility: string,
    superiorPrice: string,
    username: string
}