export class GitHubService {
    /**
     * Atualiza o cardápio no GitHub via API (Custo Zero)
     * @param {Object} newProduct 
     * @param {string} token 
     */
    static async updateMenu(newProduct, token) {
        const repo = 'kennedydosreis/lanchedasi';
        const path = 'src/lib/data/menu.json'; // Ajustado para o caminho real dos dados

        try {
            // 1. Buscar o arquivo atual e seu SHA (necessário para update)
            const getUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
            const response = await fetch(getUrl, {
                headers: { 'Authorization': `token ${token}` }
            });
            const fileData = await response.json();
            const currentContent = JSON.parse(atob(fileData.content));

            // 2. Adicionar o novo produto na categoria correta
            if (!currentContent[newProduct.category]) {
                currentContent[newProduct.category] = [];
            }
            currentContent[newProduct.category].push(newProduct);

            // 3. Enviar de volta para o GitHub
            const updatedContent = btoa(JSON.stringify(currentContent, null, 2));
            const putResponse = await fetch(getUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `feat: add product ${newProduct.name} via admin panel`,
                    content: updatedContent,
                    sha: fileData.sha
                })
            });

            return putResponse.ok;
        } catch (err) {
            console.error('Erro na integração com GitHub:', err);
            return false;
        }
    }
}
