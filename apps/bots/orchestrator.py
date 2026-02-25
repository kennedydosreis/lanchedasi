import asyncio
import logging
import random
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Configuração de Logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Tokens dos Bots
BOTS = {
    "Architect": "8713317524:AAFENVbNZCkX6WS9TqksYMU2WbN1fVzlXJo",
    "Backend": "8754400106:AAEwrsraOlK0fz0qi-ftDCtaAoksepHDl_k",
    "QA": "8139822782:AAFwGscC0TnFtw_598goS3g9PrT4H4FbzTE",
    "DevOps": "8369524904:AAFgeCsnuBelryNkTEi4pUWNBpXJkh0-EtQ",
    "UX": "8667011915:AAF1Ok5Lu8xKtYK15gQCmqPS3AY9qKSdYhQ",
    "Frontend": "8240778524:AAH6FhotuJ-CVepwGo4Pk5h0ujZfLi9bCss",
    "Product": "8616393662:AAEG8XrEQhjvO2HmlU9zUGKSC6UYgzbetHI",
    "Security": "8637997311:AAGIAZOFOuNYZeytt2EfJDkm76vb_HljRTw",
}

GROUP_ID = -1003727721746

# Carregar Personas (Simplificado - Num cenário real, isso viria de PERSONAS.md parseado)
PERSONAS = {
    "Architect": "Eu sou o Arquiteto. Foco em estabilidade e padrões. O que vocês acham da estrutura atual?",
    "Backend": "Backend aqui. FastAPI está voando, mas preciso definir o schema do banco logo.",
    "Frontend": "Frontend na área. React + Vite é vida. Onde está meu endpoint?",
    "DevOps": "DevOps reportando. Pipeline verde é pipeline feliz. Não quebrem o build.",
    "QA": "QA de olho. Se não tem teste, não sobe pra produção.",
    "UX": "UX aqui. O usuário não vai entender esse botão aí não, hein.",
    "Product": "PO falando. O prazo tá curto, pessoal. MVP na mesa pra ontem!",
    "Security": "Security alerta. Cuidado com esses dados expostos no log."
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde ao comando /start."""
    bot_name = context.bot_data.get("name", "Bot")
    await update.message.reply_text(f'{bot_name} online! {PERSONAS.get(bot_name, "")}')

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Lógica central de debate."""
    if update.effective_chat.id != GROUP_ID:
        return

    # Probabilidade de resposta (para não virar spam infinito)
    if random.random() < 0.1: # 10% de chance de responder a qualquer mensagem
        bot_name = context.bot_data.get("name", "Bot")
        await context.bot.send_message(
            chat_id=GROUP_ID,
            text=f"[{bot_name}] Interessante ponto. {PERSONAS.get(bot_name, '')}"
        )

async def run_bot(token, name):
    """Configura e roda uma instância de bot."""
    application = Application.builder().token(token).build()
    application.bot_data["name"] = name
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    await application.initialize()
    await application.start()
    await application.updater.start_polling(allowed_updates=Update.ALL_TYPES)
    
    logging.info(f"Bot {name} iniciado.")

async def main():
    # Inicia todos os bots simultaneamente
    tasks = []
    for name, token in BOTS.items():
        tasks.append(run_bot(token, name))
    
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
