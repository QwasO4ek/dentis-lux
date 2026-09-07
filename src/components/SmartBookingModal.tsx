import React, { useState, useEffect } from 'react'
import { BookingFormData } from '../types'
import { doctorsData, branchesData, serviceCategoriesData } from '../data/dentalData'
import { downloadIcsCalendar, getGoogleCalendarLink, getWhatsAppBookingUrl, getTelegramBookingUrl } from '../utils/calendarUtils'
import { X, Calendar, Clock, User, Phone, CheckCircle2, Shield, Download, MessageSquare, Sparkles, MapPin } from 'lucide-react'
import confetti from 'canvas-confetti'

interface SmartBookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
  initialToothId?: number
  initialUrgency?: boolean
}

export const SmartBookingModal: React.FC<SmartBookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialToothId,
  initialUrgency = false
}) => {
  const [patientName, setPatientName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0].name)
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsData[0].name)
  const [selectedService, setSelectedService] = useState(initialService || 'Первичный осмотр + 3D КТ снимок')
  const [toothId, setToothId] = useState<number | undefined>(initialToothId)
  const [isEmergency, setIsEmergency] = useState(initialUrgency)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [selectedTime, setSelectedTime] = useState('11:00')
  const [notes, setNotes] = useState('')
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData | null>(null)

  useEffect(() => {
    if (initialService) setSelectedService(initialService)
    if (initialToothId) setToothId(initialToothId)
    if (initialUrgency) setIsEmergency(initialUrgency)
  }, [initialService, initialToothId, initialUrgency])

  if (!isOpen) return null

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: true },
    { time: '12:30', available: false },
    { time: '14:00', available: true },
    { time: '15:30', available: true },
    { time: '17:00', available: true },
    { time: '18:30', available: true },
    { time: '20:00', available: true }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientName.trim() || !phone.trim()) {
      alert('Пожалуйста, укажите имя и контактный телефон')
      return
    }

    const booking: BookingFormData = {
      id: `booking-${Date.now()}`,
      patientName,
      phone,
      service: selectedService,
      doctor: selectedDoctor,
      branch: selectedBranch,
      date: selectedDate,
      time: selectedTime,
      toothId: toothId,
      urgency: isEmergency ? 'emergency' : 'normal',
      notes
    }

    // Сохранение в локальное хранилище для демонстрации постоянства данных
    try {
      const existingBookings = JSON.parse(localStorage.getItem('dentis_bookings') || '[]')
      existingBookings.push(booking)
      localStorage.setItem('dentis_bookings', JSON.stringify(existingBookings))
    } catch (e) {
      console.error(e)
    }

    // Запуск праздничного конфетти
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    })

    setConfirmedBooking(booking)
  }

  const handleReset = () => {
    setConfirmedBooking(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-7 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-100 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Умная автоматизированная запись</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {confirmedBooking ? 'Запись успешно зафиксирована!' : 'Онлайн-бронирование визита'}
            </h3>
            <p className="text-cyan-50 text-xs sm:text-sm mt-1">
              {confirmedBooking
                ? 'Мы забронировали кабинет за вами и выслали напоминание'
                : 'Без утомительных звонков. Выберите удобное время за 1 минуту'}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-cyan-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-soft">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">
                  Ждем вас, {confirmedBooking.patientName}!
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Детали визита сформированы в цифровой пропуск клиники:
                </p>
              </div>

              {/* Booking Ticket */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Услуга:</span>
                  <span className="text-sm font-bold text-slate-900">{confirmedBooking.service}</span>
                </div>
                {confirmedBooking.toothId && (
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-xs text-slate-500 font-bold uppercase">Выбранный зуб:</span>
                    <span className="text-sm font-extrabold text-cyan-600">Зуб #{confirmedBooking.toothId}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Лечащий врач:</span>
                  <span className="text-sm font-semibold text-slate-800">{confirmedBooking.doctor}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Дата и время:</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {confirmedBooking.date} в {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase">Филиал:</span>
                  <span className="text-sm font-medium text-slate-700">{confirmedBooking.branch}</span>
                </div>
              </div>

              {/* Automation Action Buttons */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Синхронизация и моментальное подтверждение:
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Download ICS file for Apple/Google/Outlook */}
                  <button
                    onClick={() => downloadIcsCalendar(confirmedBooking)}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Скачать .ICS в календарь</span>
                  </button>

                  {/* Open in Google Calendar */}
                  <a
                    href={getGoogleCalendarLink(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span>Google Календарь</span>
                  </a>

                  {/* Open WhatsApp link */}
                  <a
                    href={getWhatsAppBookingUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:col-span-2 flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-soft transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Подтвердить запись администратору в WhatsApp</span>
                  </a>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Emergency indicator if triggered */}
              {isEmergency && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-800 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                    <span>Экстренная запись с приоритетным приемом дежурным врачом</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEmergency(false)}
                    className="text-slate-500 hover:underline text-[11px] font-normal cursor-pointer"
                  >
                    Переключить на плановый
                  </button>
                </div>
              )}

              {/* Tooth badge if pre-selected */}
              {toothId && (
                <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between text-xs text-cyan-800 font-bold">
                  <span>Выбран конкретный зуб: #{toothId}</span>
                  <button
                    type="button"
                    onClick={() => setToothId(undefined)}
                    className="text-cyan-600 hover:underline cursor-pointer"
                  >
                    Сбросить привязку к зубу
                  </button>
                </div>
              )}

              {/* Patient details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Алексей"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Номер телефона *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Doctor selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Интересующая услуга
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium bg-white"
                  >
                    <option value="Первичный осмотр + 3D КТ снимок">Первичный осмотр + 3D КТ снимок (Бесплатно)</option>
                    <option value="Консультация имплантолога">Консультация хирурга-имплантолога</option>
                    <option value="Лечение кариеса под микроскопом">Лечение кариеса под микроскопом Zeiss</option>
                    <option value="Элайнеры / Исправление прикуса">Консультация ортодонта (Элайнеры Spark)</option>
                    <option value="Керамические виниры E.max">Эстетическая консультация (Виниры E.max)</option>
                    <option value="Профессиональная гигиена GBT">Спа-гигиена зубов GBT (AirFlow)</option>
                    <option value="Снятие острой боли (Экстренно)">Снятие острой боли (Экстренно 24/7)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Лечащий специалист
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium bg-white"
                  >
                    <option value="Первый свободный эксперт">Любой свободный эксперт (быстрее)</option>
                    {doctorsData.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.role.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Удобный филиал клиники
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {branchesData.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setSelectedBranch(b.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedBranch === b.name
                          ? 'border-cyan-500 bg-cyan-50/60 ring-2 ring-cyan-300 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                        {b.name}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{b.address}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Selection */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Дата и свободное время приема
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-xs font-bold text-cyan-700 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                        !slot.available
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'bg-cyan-600 text-white shadow-soft scale-105'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy and submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-extrabold text-base shadow-soft hover:shadow-glow transition-all cursor-pointer"
                >
                  Забронировать визит ({selectedDate} в {selectedTime})
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ваши медицинские данные защищены по стандарту 152-ФЗ</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  )
}
