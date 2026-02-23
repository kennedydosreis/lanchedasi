export class GitHubService {
    /**
     * Atualiza o cardápio no GitHub via API (Custo Zero)
     * @param {any} newProduct 
     * @param {string} token 
     */
    static async updateMenu(newProduct: any, token: string): Promise<boolean> {
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
            
            // Decodificação segura para UTF-8 usando TextDecoder (evita corrupção de acentos)
            const binaryString = atob(fileData.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const decoder = new TextDecoder('utf-8');
            const contentDecoded = decoder.decode(bytes);
            const currentContent = JSON.parse(contentDecoded);

            // 2. Adicionar o novo produto na categoria correta
            if (!currentContent[newProduct.category]) {
                currentContent[newProduct.category] = [];
            }
            
            // Evitar duplicidade de ID no mesmo push
            const exists = currentContent[newProduct.category].some((p: any) => p.id === newProduct.id);
            if (!exists) {
                currentContent[newProduct.category].push(newProduct);
            }

            // 3. Enviar de volta para o GitHub com codificação segura usando TextEncoder
            const jsonString = JSON.stringify(currentContent, null, 2);
            const encoder = new TextEncoder();
            const encodedBytes = encoder.encode(jsonString);
            let updatedBinaryString = '';
            for (let i = 0; i < encodedBytes.byteLength; i++) {
                updatedBinaryString += String.fromCharCode(encodedBytes[i]);
            }
            const updatedContent = btoa(updatedBinaryString);

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
