import asyncio
import logging
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

# Script do Debate (Gerado dinamicamente num cenário real)
DEBATE_SCRIPT = [
    ("Product", "Equipe, precisamos definir o MVP do Carrinho de Compras. O cliente quer finalizar a compra em 3 cliques. Como viabilizamos isso para ontem?"),
    ("UX", "Três cliques é agressivo, mas possível. Sugiro um 'One Page Checkout'. Se o Backend me der um endpoint que receba tudo de uma vez, eu desenho a tela."),
    ("Backend", "Calma lá, UX. Receber tudo de uma vez é pedir timeout. Precisamos validar estoque, calcular frete e processar pagamento. Vou precisar de pelo menos 3 chamadas assíncronas."),
    ("Architect", "Concordo com o Backend. Se fizermos monolítico, vamos gargalar o banco. Vamos usar Redis para segurar o estado do carrinho temporário e só persistir no PostgreSQL na confirmação."),
    ("DevOps", "Redis? Mais um container pra eu gerenciar? Vocês têm certeza que a VPS de 2GB aguenta essa brincadeira? Se o Redis cair, o carrinho some?"),
    ("Security", "E tem mais: dados de pagamento não podem trafegar sem criptografia ponta a ponta. Onde vamos armazenar o token do cartão?"),
    ("QA", "Eu só quero saber como vou testar isso. Se for assíncrono, meus testes E2E vão ficar 'flaky'. Preciso de mocks estáveis."),
    ("Frontend", "Gente, o usuário só quer comprar o lanche. Eu faço o estado local no React e mando o JSON final. Se der erro, mostro um toast. Simples."),
    ("Product", "Frontend tem razão na simplicidade, mas Arquiteto tem razão na segurança. Vamos fechar assim: Estado no Front, validação no final, e Backend se vira pra processar rápido. Temos acordo?"),
]

async def run_debate():
    logging.info("Iniciando debate orquestrado...")
    
    for role, message in DEBATE_SCRIPT:
        token = BOTS.get(role)
        if not token:
            logging.error(f"Token não encontrado para {role}")
            continue
            
        bot = Bot(token=token)
        logging.info(f"{role} digitando...")
        
        # Simular "Digitando..."
        await bot.send_chat_action(chat_id=GROUP_ID, action="typing")
        await asyncio.sleep(3) # Tempo para leitura humana
        
        await bot.send_message(chat_id=GROUP_ID, text=message)
        logging.info(f"{role} enviou mensagem.")
        
        # Pausa dramática entre mensagens
        await asyncio.sleep(2)

if __name__ == "__main__":
    asyncio.run(run_debate())
