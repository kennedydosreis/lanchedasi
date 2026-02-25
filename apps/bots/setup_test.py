import asyncio
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Configuração de Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Tokens dos Bots (Do INFRA_CREDENTIALS.md)
BOTS = {
    "Architect": "8713317524:AAFENVbNZCkX6WS9TqksYMU2WbN1fVzlXJo",
    "Backend": "8754400106:AAEwrsraOlK0fz0qi-ftDCtaAoksepHDl_k",
    "QA": "8139822782:AAFwGscC0TnFtw_598goS3g9PrT4H4FbzTE",
    "DevOps": "8369524904:AAFgeCsnuBelryNkTEi4pUWNBpXJkh0-EtQ",
    "UX": "8667011915:AAF1Ok5Lu8xKtYK15gQCmqPS3AY9qKSdYhQ",
    "Frontend": "8240778524:AAH6FhotuJ-CVepwGo4Pk5h0ujZfLi9bCss",
    "Product": "8616393662:AAEG8XrEQhjvO2HmlU9zUGKSC6UYgzbetHI",
    "Security": "8637997311:AAGIAZOFOuNYZeytt2EfJDkm76vb_HljRTw",
    # "Main": "8391615086:AAFzksnlUOsGf94ojUIo4XTYP8CZaHCf2fc" # RickOpenBot (talvez o orquestrador?)
}

GROUP_ID = -1003727721746

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde ao comando /start."""
    await update.message.reply_text('Bot online e pronto para o debate técnico!')

async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Echo simples para teste (apenas imprime no log por enquanto)."""
    # Aqui entraria a lógica de IA para cada persona responder baseada no contexto
    logging.info(f"Mensagem recebida no grupo {update.effective_chat.id}: {update.message.text}")

async def run_bot(token, name):
    """Roda uma instância de bot."""
    logging.info(f"Iniciando bot: {name}")
    application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", start))
    # application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Em um cenário real, precisaríamos de webhooks ou polling concorrente complexo
    # Como este é um script de exemplo/setup, vamos rodar apenas um bot para teste inicial ou
    # explicar ao usuário que precisamos de uma arquitetura de microsserviços para rodar 8 bots simultâneos.
    
    # Para simplificar o "setup", vou criar um script que roda *um* bot de cada vez ou usa multiprocessing.
    # Mas o python-telegram-bot usa asyncio loop.
    
    await application.initialize()
    await application.start()
    await application.updater.start_polling(allowed_updates=Update.ALL_TYPES)
    
    logging.info(f"Bot {name} rodando...")
    
    # Manter rodando - num script real isso seria gerenciado melhor
    # await asyncio.Event().wait() 

async def main():
    # Exemplo: Rodar apenas o Arquiteto para validar a conexão
    await run_bot(BOTS["Architect"], "Architect")
    
    # Num setup real, cada bot seria um container ou processo separado.
    # Vou sugerir criar um docker-compose para levantar todos.
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
