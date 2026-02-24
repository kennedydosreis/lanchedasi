export async function reverseGeocode(lat: number, lng: number): Promise<string> {
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

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
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
