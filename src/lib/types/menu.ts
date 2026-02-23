export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'sanduiches' | 'kikao' | 'bebidas' | 'porcoes' | 'combos' | 'pratos';
    image?: string;
    popular?: boolean;
    disponivel?: boolean;
}

export interface MenuData {
    [key: string]: MenuItem[];
}

export interface CartItem extends MenuItem {
    quantity: number;
}
