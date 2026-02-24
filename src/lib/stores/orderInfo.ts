import { writable, type Writable } from 'svelte/store';
import type { OrderStoreState, Location } from '$lib/types/models';
import { geocodeAddress, reverseGeocode } from '$lib/utils/GeocodingUtils';

const STORE_LOCATION = {
    lat: -3.0796612,
    lng: -60.0481757,
    address: 'Rua Itororó, Dom Pedro I, Manaus, Amazonas'
};

const DELIVERY_CONFIG = {
    freeDeliveryDistance: 3,
    pricePerKm: 2.50,
    maxDeliveryDistance: 15
};

export interface OrderInfoStore extends Writable<OrderStoreState> {
    setObservations: (observations: string) => void;
    setAddress: (address: string) => void;
    setManualAddress: (address: string) => void;
    setAddressWithGeocode: (address: string) => Promise<{ success: boolean; distance: number | null; deliveryFee: number; canDeliver: boolean }>;
    setLocation: (location: Location) => void;
    setLoadingLocation: (isLoading: boolean) => void;
    clear: () => void;
    getLocationAsync: () => Promise<{ location: Location; address: string; distance: number; deliveryFee: number; canDeliver: boolean }>;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI/180);
    const dLon = (lon2 - lon1) * (Math.PI/180);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 100) / 100;
}

function calculateDeliveryFee(distance: number): number {
    if (distance <= DELIVERY_CONFIG.freeDeliveryDistance) return 0;
    return Math.ceil(distance - DELIVERY_CONFIG.freeDeliveryDistance) * DELIVERY_CONFIG.pricePerKm;
}

function createOrderInfo(): OrderInfoStore {
    const initialState: OrderStoreState = {
        observations: '',
        location: null,
        address: '',
        distance: null,
        deliveryFee: 0,
        canDeliver: true,
        isLoadingLocation: false
    };

    const { subscribe, set, update } = writable<OrderStoreState>(initialState);

    return {
        subscribe,
        set,
        update,
        setObservations: (observations: string) => update(state => ({ ...state, observations })),
        setAddress: (address: string) => update(state => ({ ...state, address })),
        setManualAddress: (address: string) => {
            update(state => ({ ...state, address, location: null, distance: null, deliveryFee: 0, canDeliver: true, isLoadingLocation: false }));
        },
        setAddressWithGeocode: async (address: string) => {
            update(state => ({ ...state, isLoadingLocation: true }));
            const coords = await geocodeAddress(address);
            if (coords) {
                const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, coords.lat, coords.lng);
                const deliveryFee = calculateDeliveryFee(distance);
                const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
                update(state => ({ ...state, address, location: { latitude: coords.lat, longitude: coords.lng, accuracy: null }, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
                return { success: true, distance, deliveryFee, canDeliver };
            }
            update(state => ({ ...state, address, location: null, distance: null, deliveryFee: 0, canDeliver: true, isLoadingLocation: false }));
            return { success: true, distance: null, deliveryFee: 0, canDeliver: true };
        },
        setLocation: (location: Location) => {
            const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
            const deliveryFee = calculateDeliveryFee(distance);
            const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
            update(state => ({ ...state, location, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
        },
        setLoadingLocation: (isLoading: boolean) => update(state => ({ ...state, isLoadingLocation: isLoading })),
        clear: () => set(initialState),
        getLocationAsync: async () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocalização não é suportada pelo navegador'));
                    return;
                }
                update(state => ({ ...state, isLoadingLocation: true }));
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const location: Location = { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy };
                        const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
                        const deliveryFee = calculateDeliveryFee(distance);
                        const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
                        try {
                            const address = await reverseGeocode(location.latitude, location.longitude);
                            update(state => ({ ...state, location, address, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
                            resolve({ location, address, distance, deliveryFee, canDeliver });
                        } catch (error) {
                            const fallbackAddress = `Localização: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
                            update(state => ({ ...state, location, address: fallbackAddress, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
                            resolve({ location, address: fallbackAddress, distance, deliveryFee, canDeliver });
                        }
                    },
                    (error) => {
                        update(state => ({ ...state, isLoadingLocation: false }));
                        reject(new Error('Erro ao obter localização'));
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
                );
            });
        }
    };
}

export const orderInfo = createOrderInfo();
