import type { MenuItem } from './menu';

export interface Product extends MenuItem {}

export interface CartItem extends Product {
    quantity: number;
}

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
    paymentMethod: 'dinheiro' | 'pix' | 'cartao';
    change?: string;
    observations?: string;
}

export interface Order extends CustomerInfo {
    id: string;
    items: CartItem[];
    total: number;
    deliveryFee: number;
    timestamp: number;
}

export interface Location {
    latitude: number;
    longitude: number;
    accuracy: number | null;
}

export interface OrderStoreState {
    observations: string;
    location: Location | null;
    address: string;
    distance: number | null;
    deliveryFee: number;
    canDeliver: boolean;
    isLoadingLocation: boolean;
}
