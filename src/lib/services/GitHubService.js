export class GitHubService {
    /**
     * Atualiza o cardápio no GitHub via API (Custo Zero)
     * @param {Object} newProduct 
     * @param {string} token 
     */
    static async updateMenu(newProduct, token) {
        const repo = 'kennedydosreis/lanchedasi';
        const path = 'static/data/menu.json';

        try {
            console.log('GitHubService: Buscando arquivo atual...');
            
            // 1. Buscar o arquivo atual (adicionando timestamp para evitar cache)
            const getUrl = `https://api.github.com/repos/${repo}/contents/${path}?t=${Date.now()}`;
            const response = await fetch(getUrl, {
                headers: { 
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                console.error('GitHubService: Erro ao buscar SHA', response.status);
                return false;
            }

            const fileData = await response.json();
            
            // Decodificação segura para UTF-8 (suporta acentos como 'ç')
            const contentDecoded = decodeURIComponent(escape(atob(fileData.content)));
            const currentContent = JSON.parse(contentDecoded);

            // 2. Adicionar o novo produto na categoria correta
            if (!currentContent[newProduct.category]) {
                currentContent[newProduct.category] = [];
            }
            
            // Evitar duplicidade de ID no mesmo push
            const exists = currentContent[newProduct.category].some(p => p.id === newProduct.id);
            if (!exists) {
                currentContent[newProduct.category].push(newProduct);
            }

            // 3. Enviar de volta para o GitHub com codificação segura
            const jsonString = JSON.stringify(currentContent, null, 2);
            const updatedContent = btoa(unescape(encodeURIComponent(jsonString)));

            console.log('GitHubService: Enviando atualização...');
            const putResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `feat: add product ${newProduct.name} via admin panel`,
                    content: updatedContent,
                    sha: fileData.sha
                })
            });

            if (putResponse.ok) {
                console.log('GitHubService: Sucesso!');
                return true;
            } else {
                const errorData = await putResponse.json();
                console.error('GitHubService: Erro no PUT', errorData);
                return false;
            }
        } catch (err) {
            console.error('GitHubService: Falha catastrófica:', err);
            return false;
        }
    }
}
