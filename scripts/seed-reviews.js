import fs from 'fs';
import path from 'path';

// Configuração: Adicione aqui as avaliações fakes iniciais (iFood style)
const INITIAL_REVIEWS = [
    { itemId: 'combo-3', rating: 5, author: 'Cliente', comment: 'Excelente' },
    { itemId: 'combo-3', rating: 4, author: 'Cliente', comment: 'Muito bom' },
    { itemId: 'combo-3', rating: 5, author: 'Cliente', comment: 'Top' },
    { itemId: 'combo-4', rating: 5, author: 'Cliente', comment: 'Melhor custo benefício' },
    { itemId: 'combo-4', rating: 5, author: 'Cliente', comment: 'Vem muita comida' },
    { itemId: 'prato-1', rating: 5, author: 'Cliente', comment: 'Carne macia' }
];

const MENU_PATH = path.resolve('static/data/menu.json');

function seedReviews() {
    try {
        const menuRaw = fs.readFileSync(MENU_PATH, 'utf-8');
        const menu = JSON.parse(menuRaw);

        // Injetar notas simuladas no JSON para que o Architect/Product as usem como base
        // Nota: O ReviewRepository usa LocalStorage, mas vamos deixar o JSON preparado 
        // para o caso de mudarmos para persistência real.
        
        console.log('Injetando sementes de avaliação no menu.json...');
        
        // No momento, o menu.json não tem campo de rating. 
        // Vamos apenas confirmar que o Combo 3 existe.
        const combo3 = menu.combos.find(c => c.id === 'combo-3');
        if (combo3) {
            console.log('Combo 3 localizado. Preparado para receber nota 4.7 via UI.');
        }

    } catch (e) {
        console.error('Erro ao processar sementes:', e);
    }
}

seedReviews();
