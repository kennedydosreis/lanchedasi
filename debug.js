// Script para debug - Cole no console do navegador (F12)

// Limpar completamente o cache
console.log("🧹 Limpando cache...");
localStorage.clear();

// Recarregar a página
console.log("🔄 Recarregando a página...");
location.reload();

// Verificar dados após reload (execute este bloco separadamente após o reload)
/*
console.log("📋 Verificando dados do menu:");
console.log("Total de combos:", menuData.combos?.length || 0);
console.log("Total de sanduíches:", menuData.sanduiches?.length || 0);
console.log("Total de pratos:", menuData.pratos?.length || 0);
console.log("Total de porções:", menuData.porcoes?.length || 0);
console.log("Total de bebidas:", menuData.bebidas?.length || 0);
console.log("Total de sobremesas:", menuData.sobremesas?.length || 0);

// Mostrar alguns sanduíches para verificar
console.log("🥪 Primeiros 5 sanduíches:");
menuData.sanduiches?.slice(0, 5).forEach(item => {
    console.log(`- ${item.name}: R$ ${item.price}`);
});
*/
