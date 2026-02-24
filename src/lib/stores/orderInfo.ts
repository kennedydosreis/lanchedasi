import { writable, type Writable } from 'svelte/store';
import type { OrderStoreState, Location } from '$lib/types/models';

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
            update(state => ({
                ...state,
                address,
                location: null,
                distance: null,
                deliveryFee: 0,
                canDeliver: true,
                isLoadingLocation: false
            }));
        },
        setAddressWithGeocode: async (address: string) => {
            try {
                update(state => ({ ...state, isLoadingLocation: true }));
                const coordinates = await geocodeAddress(address);

                if (coordinates) {
                    const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, coordinates.lat, coordinates.lng);
                    const deliveryFee = calculateDeliveryFee(distance);
                    const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;

                    update(state => ({
                        ...state,
                        address,
                        location: {
                            latitude: coordinates.lat,
                            longitude: coordinates.lng,
                            accuracy: null
                        },
                        distance,
                        deliveryFee,
                        canDeliver,
                        isLoadingLocation: false
                    }));

                    return { success: true, distance, deliveryFee, canDeliver };
                } else {
                    update(state => ({
                        ...state,
                        address,
                        location: null,
                        distance: null,
                        deliveryFee: 0,
                        canDeliver: true,
                        isLoadingLocation: false
                    }));

                    return { success: true, distance: null, deliveryFee: 0, canDeliver: true };
                }
            } catch (error) {
                update(state => ({
                    ...state,
                    address,
                    location: null,
                    distance: null,
                    deliveryFee: 0,
                    canDeliver: true,
                    isLoadingLocation: false
                }));

                return { success: true, distance: null, deliveryFee: 0, canDeliver: true };
            }
        },
        setLocation: (location: Location) => {
            const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
            const deliveryFee = calculateDeliveryFee(distance);
            const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;

            update(state => ({
                ...state,
                location,
                distance,
                deliveryFee,
                canDeliver,
                isLoadingLocation: false
            }));
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
                        const location: Location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };

                        const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
                        const deliveryFee = calculateDeliveryFee(distance);
                        const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;

                        try {
                            const address = await reverseGeocode(location.latitude, location.longitude);
                            update(state => ({
                                ...state,
                                location,
                                address,
                                distance,
                                deliveryFee,
                                canDeliver,
                                isLoadingLocation: false
                            }));
                            resolve({ location, address, distance, deliveryFee, canDeliver });
                        } catch (error) {
                            const fallbackAddress = `Localização: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
                            update(state => ({
                                ...state,
                                location,
                                address: fallbackAddress,
                                distance,
                                deliveryFee,
                                canDeliver,
                                isLoadingLocation: false
                            }));
                            resolve({ location, address: fallbackAddress, distance, deliveryFee, canDeliver });
                        }
                    },
                    (error) => {
                        update(state => ({ ...state, isLoadingLocation: false }));
                        let errorMessage = 'Erro ao obter localização';

                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = 'Permissão de localização negada';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = 'Localização indisponível';
                                break;
                            case error.TIMEOUT:
                                errorMessage = 'Tempo limite excedido para obter localização';
                                break;
                        }

                        reject(new Error(errorMessage));
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 60000
                    }
                );
            });
        }
    };
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 100) / 100;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}

function calculateDeliveryFee(distance: number): number {
    if (distance <= DELIVERY_CONFIG.freeDeliveryDistance) {
        return 0;
    }
    const extraDistance = distance - DELIVERY_CONFIG.freeDeliveryDistance;
    return Math.ceil(extraDistance) * DELIVERY_CONFIG.pricePerKm;
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
        const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=pt-BR,pt,en`,
            { headers: { 'User-Agent': 'LancheDaSi/1.0' } }
        );

        if (nominatimResponse.ok) {
            const addr = (await nominatimResponse.json()).address;
            if (addr) {
                const parts = [
                    addr.house_number && addr.road ? `${addr.road}, ${addr.house_number}` : (addr.road || addr.street || addr.pedestrian),
                    addr.neighbourhood || addr.suburb || addr.quarter || addr.district,
                    addr.city || addr.town || addr.village || addr.municipality,
                    addr.state
                ].filter(Boolean);
                if (parts.length >= 2) return parts.join(', ');
            }
        }

        const bdcResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`);
        if (bdcResponse.ok) {
            const data = await bdcResponse.json();
            const parts = [];
            if (data.localityInfo?.administrative) {
                const admin = data.localityInfo.administrative.sort((a: any, b: any) => (b.adminLevel || 0) - (a.adminLevel || 0));
                const street = admin.find((i: any) => i.adminLevel >= 8);
                if (street) parts.push(street.name);
                const neighborhood = admin.find((i: any) => i.adminLevel >= 6 && i.adminLevel <= 7 && i.name !== street?.name);
                if (neighborhood) parts.push(neighborhood.name);
            }
            parts.push(data.city || data.locality, data.principalSubdivision);
            const filtered = parts.filter(Boolean);
            if (filtered.length >= 2) return filtered.join(', ');
        }
    } catch (e) {
        console.error('Geocoding error', e);
    }
    return `Localização: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
        const query = encodeURIComponent(address + ', Manaus, Amazonas, Brasil');
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=br`, {
            headers: { 'User-Agent': 'LancheDaSi/1.0' }
        });
        if (res.ok) {
            const data = await res.json();
            if (data?.[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
    } catch (e) {
        console.error('GeocodeAddress error', e);
    }
    return null;
}

export const orderInfo = createOrderInfo();
