import { BookingFormData } from '../types'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Создает и инициирует скачивание файла iCalendar (.ics)
 * Поддерживается в iOS (Apple Calendar), Android (Google Calendar), macOS, Windows Outlook.
 */
export function downloadIcsCalendar(booking: BookingFormData) {
  const title = `Визит в стоматологию DENTIS LUX: ${booking.service}`
  const description = `Пациент: ${booking.patientName}\\nУслуга: ${booking.service}\\nВрач: ${booking.doctor}\\nФилиал: ${booking.branch}${booking.toothId ? `\\nЗуб: #${booking.toothId}` : ''}\\nТелефон клиники: +7 (495) 120-33-00`
  const location = booking.branch

  // Парсим дату и время (формат даты YYYY-MM-DD, время HH:mm)
  const dateParts = booking.date.split('-').map(Number)
  const timeParts = booking.time.split(':').map(Number)

  if (dateParts.length !== 3 || timeParts.length !== 2) return

  const startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1])
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // +1 час длительность

  const pad = (n: number) => (n < 10 ? '0' + n : n)
  const formatIcsDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

  const dtStart = formatIcsDate(startDate)
  const dtEnd = formatIcsDate(endDate)
  const now = formatIcsDate(new Date())

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DENTIS LUX//Dental Clinic Booking//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:dentislux-${Date.now()}@dentis-lux.ru`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'DESCRIPTION:Напоминание о приеме в стоматологии DENTIS LUX за 2 часа',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `dentis-lux-appointment-${booking.date}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Генерирует прямую ссылку для добавления в Google Календарь
 */
export function getGoogleCalendarLink(booking: BookingFormData): string {
  const dateParts = booking.date.split('-').map(Number)
  const timeParts = booking.time.split(':').map(Number)
  if (dateParts.length !== 3 || timeParts.length !== 2) return '#'

  const startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1])
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)

  const pad = (n: number) => (n < 10 ? '0' + n : n)
  const fmt = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

  const text = encodeURIComponent(`Визит в DENTIS LUX: ${booking.service}`)
  const details = encodeURIComponent(`Пациент: ${booking.patientName}\nВрач: ${booking.doctor}${booking.toothId ? `\nЗуб: #${booking.toothId}` : ''}\nТелефон: ${booking.phone}`)
  const location = encodeURIComponent(booking.branch)
  const dates = `${fmt(startDate)}/${fmt(endDate)}`

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`
}

/**
 * Создает прямую ссылку в WhatsApp для мгновенного подтверждения администратором
 */
export function getWhatsAppBookingUrl(booking: BookingFormData, clinicPhone = '74951203300'): string {
  const message = [
    'Здравствуйте! Подтверждаю онлайн-запись в клинику DENTIS LUX:',
    `👤 Пациент: ${booking.patientName}`,
    `📞 Телефон: ${booking.phone}`,
    `🦷 Услуга: ${booking.service}`,
    booking.toothId ? `📌 Выбранный зуб: #${booking.toothId}` : '',
    `👨‍⚕️ Доктор: ${booking.doctor}`,
    `📅 Дата и время: ${booking.date} в ${booking.time}`,
    `🏥 Филиал: ${booking.branch}`,
    booking.urgency === 'emergency' ? '🚨 СРОЧНЫЙ ПРИЕМ (Острая боль)' : '',
    booking.notes ? `💬 Примечание: ${booking.notes}` : ''
  ].filter(Boolean).join('\n')

  return `https://wa.me/${clinicPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Создает прямую ссылку в Telegram
 */
export function getTelegramBookingUrl(booking: BookingFormData, botUsername = 'DentisLuxBot'): string {
  const message = `Запись в DENTIS LUX:\n${booking.patientName} (${booking.phone})\n${booking.service}\n${booking.date} в ${booking.time}\n${booking.doctor}`
  return `https://t.me/${botUsername}?start=${encodeURIComponent(message)}`
}
