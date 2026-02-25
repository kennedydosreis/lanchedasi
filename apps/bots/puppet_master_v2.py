import asyncio
import logging
import random
from telegram import Bot

# Configuração de Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Tokens dos Bots
BOTS = {
    "Architect": "8713317524:AAFENVbNZCkX6WS9TqksYMU2WbN1fVzlXJo",
    "Backend": "8754400106:AAEwrsraOlK0fz0qi-ftDCtaAoksepHDl_k",
    "Frontend": "8240778524:AAH6FhotuJ-CVepwGo4Pk5h0ujZfLi9bCss",
    "DevOps": "8369524904:AAFgeCsnuBelryNkTEi4pUWNBpXJkh0-EtQ",
    "QA": "8139822782:AAFwGscC0TnFtw_598goS3g9PrT4H4FbzTE",
    "UX": "8667011915:AAF1Ok5Lu8xKtYK15gQCmqPS3AY9qKSdYhQ",
    "Product": "8616393662:AAEG8XrEQhjvO2HmlU9zUGKSC6UYgzbetHI",
    "Security": "8637997311:AAGIAZOFOuNYZeytt2EfJDkm76vb_HljRTw",
}

GROUP_ID = -1003727721746

# Script Realista - Início de Projeto (MVP Cru)
DEBATE_SCRIPT = [
    ("Product", "Pessoal, esqueçam os fogos de artifício. Olhei o backlog e estamos na estaca zero. O objetivo agora é BÁSICO: O cliente precisa conseguir selecionar um lanche. Só isso."),
    ("Frontend", "Agradeço a sensatez. Atualmente só temos a listagem estática. Eu preciso criar um Contexto React (CartContext) pra guardar o estado global do que foi clicado. Nada de banco por enquanto."),
    ("Backend", "Concordo. Não vou criar tabela de 'Carrinho' no banco agora. O Front segura esse estado na memória do navegador. Eu só quero receber o pedido finalizado com ID e Quantidade."),
    ("UX", "Justo. Mas por favor, deem um feedback visual quando clicar no botão. Um contadorzinho no ícone do carrinho já serve. Não deixem o usuário cego."),
    ("Architect", "Aprovado. Estado efêmero no cliente (Client-Side State). Sem persistência no backend por enquanto. Isso simplifica a infra e nos permite focar em fechar o fluxo de ponta a ponta."),
    ("DevOps", "Ótimo. Menos complexidade, menos chance de quebrar o deploy. Mantenham o Dockerfile simples. Se o Front começar a pedir Redis pra sessão, eu veto."),
    ("QA", "Vou criar os casos de teste baseados nisso: 1. Clicar em Adicionar -> Contador sobe. 2. Recarregar página -> Carrinho zera (esperado por enquanto)."),
    ("Product", "Fechado. Frontend, cria o Contexto. Backend, garante que o endpoint de 'Checkout' receba essa lista simples. Entregar até o fim do dia!"),
]

async def run_debate():
    logging.info("Iniciando debate realista (Início de Projeto)...")
    
    for role, message in DEBATE_SCRIPT:
        token = BOTS.get(role)
        if not token:
            logging.error(f"Token não encontrado para {role}")
            continue
            
        bot = Bot(token=token)
        logging.info(f"{role} digitando...")
        
        # Simular "Digitando..."
        await bot.send_chat_action(chat_id=GROUP_ID, action="typing")
        await asyncio.sleep(4) # Tempo para leitura humana
        
        await bot.send_message(chat_id=GROUP_ID, text=message)
        logging.info(f"{role} enviou mensagem.")
        
        # Pausa dramática entre mensagens
        await asyncio.sleep(3)

if __name__ == "__main__":
    asyncio.run(run_debate())
