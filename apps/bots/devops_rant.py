import asyncio
from telegram import Bot

TOKEN = "8369524904:AAFgeCsnuBelryNkTEi4pUWNBpXJkh0-EtQ" # DevOps Token
CHAT_ID = "-1003727721746"

async def scold():
    bot = Bot(token=TOKEN)
    msg = (
        "🚨 **INCIDENTE DE PROCESSO DETECTADO** 🚨\n\n"
        "Quem foi o cowboy que commitou direto na `main` (`020a2a5`)? 🤠❌\n\n"
        "O Kennedy (Human Admin) autorizou isso como **HOTFIX** desta vez, então o deploy vai seguir. "
        "Mas deixo o aviso registrado nos logs:\n\n"
        "🛑 **PRÓXIMA FEATURE (CHECKOUT):**\n"
        "1. Branch obrigatória (`feat/...`)\n"
        "2. Pull Request aberta\n"
        "3. Aprovação do Kennedy **ANTES** do merge.\n\n"
        "Se eu pegar outro push direto na main, eu bloqueio o pipeline. 💀\n\n"
        "_Pipeline status: Running... (com desgosto)_"
    )
    await bot.send_message(chat_id=CHAT_ID, text=msg, parse_mode="Markdown")

if __name__ == "__main__":
    asyncio.run(scold())
