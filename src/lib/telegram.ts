// src/lib/telegram.ts

export async function sendTelegram(data: { name: string; phone: string }) {
  // Заглушка: имитация отправки заявки
  console.log('Заявка получена:', data);
  
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Успешное завершение
  return { success: true };
}