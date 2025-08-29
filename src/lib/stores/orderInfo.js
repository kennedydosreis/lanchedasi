// @ts-nocheck
import { writable } from 'svelte/store';

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

function createOrderInfo() {
    const { subscribe, set, update } = writable({
        observations: '',
        location: null,
        address: '',
        distance: null,
        deliveryFee: 0,
        canDeliver: true,
        isLoadingLocation: false
    });

    return {
        subscribe,
        setObservations: (observations) => update(state => ({ ...state, observations })),
        setAddress: (address) => update(state => ({ ...state, address })),
        setManualAddress: (address) => {
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
        setAddressWithGeocode: async (address) => {
            try {
                update(state => ({ ...state, isLoadingLocation: true }));

                // Tenta fazer geocoding do endereço para obter coordenadas
                const coordinates = await geocodeAddress(address);

                if (coordinates) {
                    // Se conseguiu coordenadas, calcula distância
                    const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, coordinates.lat, coordinates.lng);
                    const deliveryFee = calculateDeliveryFee(distance);
                    const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;

                    update(state => ({
                        ...state,
                        address,
                        location: {
                            latitude: coordinates.lat,
                            longitude: coordinates.lng,
                            accuracy: null // Geocoding não tem precisão GPS
                        },
                        distance,
                        deliveryFee,
                        canDeliver,
                        isLoadingLocation: false
                    }));

                    console.log('Endereço geocodificado:', { address, coordinates, distance, deliveryFee });
                    return { success: true, distance, deliveryFee, canDeliver };
                } else {
                    // Se não conseguiu coordenadas, salva só o endereço
                    update(state => ({
                        ...state,
                        address,
                        location: null,
                        distance: null,
                        deliveryFee: 0,
                        canDeliver: true,
                        isLoadingLocation: false
                    }));

                    console.log('Endereço salvo sem geocoding:', address);
                    return { success: true, distance: null, deliveryFee: 0, canDeliver: true };
                }
            } catch (error) {
                console.error('Erro no geocoding:', error);
                // Em caso de erro, salva só o endereço
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
        setLocation: (location) => {
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
        setLoadingLocation: (isLoading) => update(state => ({ ...state, isLoadingLocation: isLoading })),
        clear: () => set({
            observations: '',
            location: null,
            address: '',
            distance: null,
            deliveryFee: 0,
            canDeliver: true,
            isLoadingLocation: false
        }),
        getLocationAsync: async () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocalização não é suportada pelo navegador'));
                    return;
                }

                update(state => ({ ...state, isLoadingLocation: true }));

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };

                        console.log('Localização obtida:', location);
                        console.log('Precisão:', position.coords.accuracy, 'metros');

                        const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
                        const deliveryFee = calculateDeliveryFee(distance);
                        const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;

                        try {
                            const address = await reverseGeocode(location.latitude, location.longitude);
                            console.log('Endereço encontrado:', address);
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
                            console.error('Erro no geocoding:', error);
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

function calculateDistance(lat1, lon1, lat2, lon2) {
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

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function calculateDeliveryFee(distance) {
    if (distance <= DELIVERY_CONFIG.freeDeliveryDistance) {
        return 0;
    }
    const extraDistance = distance - DELIVERY_CONFIG.freeDeliveryDistance;
    return Math.ceil(extraDistance) * DELIVERY_CONFIG.pricePerKm;
}

async function reverseGeocode(lat, lng) {
    try {
        // Tentativa 1: OpenStreetMap Nominatim (mais detalhado para endereços específicos)
        try {
            const nominatimResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=pt-BR,pt,en`,
                {
                    headers: {
                        'User-Agent': 'LancheDaSi/1.0'
                    }
                }
            );

            if (nominatimResponse.ok) {
                const nominatimData = await nominatimResponse.json();

                if (nominatimData && nominatimData.address) {
                    const addr = nominatimData.address;
                    const addressParts = [];

                    // Monta o endereço completo com máxima precisão

                    // 1. Número da casa + nome da rua
                    let streetInfo = '';
                    if (addr.house_number && addr.road) {
                        streetInfo = `${addr.road}, ${addr.house_number}`;
                    } else if (addr.road) {
                        streetInfo = addr.road;
                    } else if (addr.street) {
                        streetInfo = addr.street;
                    } else if (addr.pedestrian) {
                        streetInfo = addr.pedestrian;
                    }

                    if (streetInfo) {
                        addressParts.push(streetInfo);
                    }

                    // 2. Bairro/Distrito
                    const neighborhood = addr.neighbourhood || addr.suburb || addr.quarter || addr.district;
                    if (neighborhood && neighborhood !== streetInfo) {
                        addressParts.push(neighborhood);
                    }

                    // 3. Cidade
                    const city = addr.city || addr.town || addr.village || addr.municipality;
                    if (city) {
                        addressParts.push(city);
                    }

                    // 4. Estado
                    if (addr.state) {
                        addressParts.push(addr.state);
                    }

                    // Se conseguiu montar um endereço específico, retorna
                    if (addressParts.length >= 2) {
                        console.log('Endereço detalhado encontrado (Nominatim):', addressParts.join(', '));
                        return addressParts.join(', ');
                    }
                }
            }
        } catch (nominatimError) {
            console.log('Erro no Nominatim:', nominatimError);
        }

        // Tentativa 2: BigDataCloud
        try {
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Dados BigDataCloud:', data);

                const addressParts = [];

                // Tenta extrair informações mais específicas
                if (data.localityInfo && data.localityInfo.administrative && Array.isArray(data.localityInfo.administrative)) {
                    // Ordena por nível administrativo (mais específico primeiro)
                    const adminLevels = data.localityInfo.administrative
                        .filter(item => item && item.name)
                        .sort((a, b) => (b.adminLevel || 0) - (a.adminLevel || 0));

                    // Pega os mais específicos (níveis 8-10 são geralmente ruas/logradouros)
                    const streetLevel = adminLevels.find(item => item.adminLevel >= 8);
                    if (streetLevel) {
                        addressParts.push(streetLevel.name);
                    }

                    // Bairro (níveis 6-7)
                    const neighborhoodLevel = adminLevels.find(item =>
                        item.adminLevel >= 6 && item.adminLevel <= 7 &&
                        item.name !== (streetLevel?.name)
                    );
                    if (neighborhoodLevel) {
                        addressParts.push(neighborhoodLevel.name);
                    }
                }

                // Adiciona cidade
                if (data.city && !addressParts.includes(data.city)) {
                    addressParts.push(data.city);
                } else if (data.locality && !addressParts.includes(data.locality)) {
                    addressParts.push(data.locality);
                }

                // Adiciona estado
                if (data.principalSubdivision && !addressParts.includes(data.principalSubdivision)) {
                    addressParts.push(data.principalSubdivision);
                }

                if (addressParts.length >= 2) {
                    console.log('Endereço detalhado encontrado (BigDataCloud):', addressParts.join(', '));
                    return addressParts.join(', ');
                }

                // Fallback para informações básicas
                if (data.locality || data.city) {
                    const basicAddress = `${data.locality || data.city}, ${data.principalSubdivision || ''}, ${data.countryName || ''}`;
                    console.log('Endereço básico encontrado:', basicAddress);
                    return basicAddress.replace(', ,', ',').replace(/,$/, '');
                }
            }
        } catch (bigDataError) {
            console.log('Erro no BigDataCloud:', bigDataError);
        }

        // Tentativa 3: ViaCEP reverso (para coordenadas no Brasil)
        try {
            const viaCepResponse = await fetch(
                `https://viacep.com.br/ws/${lat},${lng}/json/`
            );

            if (viaCepResponse.ok) {
                const viaCepData = await viaCepResponse.json();
                if (viaCepData && !viaCepData.erro) {
                    const addressParts = [];

                    if (viaCepData.logradouro) {
                        addressParts.push(viaCepData.logradouro);
                    }
                    if (viaCepData.bairro) {
                        addressParts.push(viaCepData.bairro);
                    }
                    if (viaCepData.localidade) {
                        addressParts.push(viaCepData.localidade);
                    }
                    if (viaCepData.uf) {
                        addressParts.push(viaCepData.uf);
                    }

                    if (addressParts.length >= 2) {
                        console.log('Endereço encontrado (ViaCEP):', addressParts.join(', '));
                        return addressParts.join(', ');
                    }
                }
            }
        } catch (viaCepError) {
            console.log('Erro no ViaCEP:', viaCepError);
        }

        // Se todas as tentativas falharam, retorna coordenadas
        console.log('Todas as APIs falharam, retornando coordenadas');
        return `Localização: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    } catch (error) {
        console.error('Erro geral no geocoding:', error);
        return `Localização: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
}

async function geocodeAddress(address) {
    try {
        console.log('Tentando geocoding para:', address);

        // Tentativa 1: Nominatim (OpenStreetMap)
        try {
            const query = encodeURIComponent(address + ', Manaus, Amazonas, Brasil');
            const nominatimResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=br`,
                {
                    headers: {
                        'User-Agent': 'LancheDaSi/1.0'
                    }
                }
            );

            if (nominatimResponse.ok) {
                const nominatimData = await nominatimResponse.json();

                if (nominatimData && nominatimData.length > 0) {
                    const result = nominatimData[0];
                    const coordinates = {
                        lat: parseFloat(result.lat),
                        lng: parseFloat(result.lon)
                    };

                    console.log('Geocoding bem-sucedido (Nominatim):', coordinates);
                    return coordinates;
                }
            }
        } catch (nominatimError) {
            console.log('Erro no Nominatim geocoding:', nominatimError);
        }

        // Tentativa 2: ViaCEP para buscar CEP no endereço
        try {
            // Extrai possível CEP do endereço
            const cepMatch = address.match(/\d{5}-?\d{3}/);
            if (cepMatch) {
                const cep = cepMatch[0].replace('-', '');
                const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

                if (viaCepResponse.ok) {
                    const viaCepData = await viaCepResponse.json();

                    if (viaCepData && !viaCepData.erro && viaCepData.logradouro) {
                        // Monta endereço completo e tenta geocoding novamente
                        const fullAddress = `${viaCepData.logradouro}, ${viaCepData.bairro}, ${viaCepData.localidade}, ${viaCepData.uf}, Brasil`;
                        const query2 = encodeURIComponent(fullAddress);

                        const nominatimResponse2 = await fetch(
                            `https://nominatim.openstreetmap.org/search?format=json&q=${query2}&limit=1&countrycodes=br`,
                            {
                                headers: {
                                    'User-Agent': 'LancheDaSi/1.0'
                                }
                            }
                        );

                        if (nominatimResponse2.ok) {
                            const nominatimData2 = await nominatimResponse2.json();

                            if (nominatimData2 && nominatimData2.length > 0) {
                                const result2 = nominatimData2[0];
                                const coordinates2 = {
                                    lat: parseFloat(result2.lat),
                                    lng: parseFloat(result2.lon)
                                };

                                console.log('Geocoding bem-sucedido (ViaCEP + Nominatim):', coordinates2);
                                return coordinates2;
                            }
                        }
                    }
                }
            }
        } catch (viaCepError) {
            console.log('Erro no ViaCEP geocoding:', viaCepError);
        }

        // Se nenhuma tentativa funcionou
        console.log('Não foi possível fazer geocoding do endereço');
        return null;

    } catch (error) {
        console.error('Erro geral no geocoding:', error);
        return null;
    }
}

export const orderInfo = createOrderInfo();
