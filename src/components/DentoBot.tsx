import React, { useState } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight, User } from 'lucide-react'

interface DentoBotProps {
  onOpenBooking: (serviceName?: string) => void
  onOpenSymptomChecker: () => void
  onOpenOdontogram: () => void
}

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  action?: {
    label: string
    type: 'booking' | 'symptom' | 'odontogram'
    data?: string
  }
}

export const DentoBot: React.FC<DentoBotProps> = ({
  onOpenBooking,
  onOpenSymptomChecker,
  onOpenOdontogram
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Здравствуйте! Я интеллектуальный ассистент DENTIS LUX. Подскажу по ценам, подберу врача или помогу с острой болью. О чем хотите узнать?'
    }
  ])
  const [inputVal, setInputVal] = useState('')

  const quickQuestions = [
    { label: 'Сколько стоят виниры?', query: 'виниры' },
    { label: 'Больно ли ставить имплант?', query: 'имплант' },
    { label: 'Лечение во сне (седация)', query: 'седация' },
    { label: 'Острая боль прямо сейчас', query: 'боль' }
  ]

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim()
    if (!text) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal('')

    // AI Response matching logic
    setTimeout(() => {
      const lower = text.toLowerCase()
      let botResponse: ChatMessage

      if (lower.includes('винир') || lower.includes('голливуд')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Мы используем ультратонкие керамические виниры E.max (Германия) толщиной от 0.3 мм без агрессивного обтачивания. Стоимость — от 24 000 ₽ за зуб с гарантией 10 лет. Действует рассрочка 0-0-24.',
          action: { label: 'Записаться на 3D примерку Mock-Up', type: 'booking', data: 'Керамические виниры E.max' }
        }
      } else if (lower.includes('имплант') || lower.includes('зуб удален')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Установка имплантата Straumann / Nobel занимает всего 20–30 минут и проходит абсолютно безболезненно под компьютерной анестезией или в легком медикаментозном сне. Приживаемость — 99.6%.',
          action: { label: 'Записаться на бесплатный 3D КТ снимок', type: 'booking', data: 'Консультация имплантолога' }
        }
      } else if (lower.includes('боль') || lower.includes('ноет') || lower.includes('острая') || lower.includes('пухн')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Если зуб болит остро, не грейте щеку и не терпите! Запустите наш экспресс-триаж симптомов или мы примем вас дежурным врачом в течение 15 минут.',
          action: { label: 'Запустить триаж острой боли (SOS)', type: 'symptom' }
        }
      } else if (lower.includes('седаци') || lower.includes('наркоз') || lower.includes('страх')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Для пациентов, испытывающих стресс, мы проводим лечение в медикаментозном сне под контролем штатного анестезиолога-реаниматолога. Вы засыпаете и просыпаетесь уже с готовой здоровой улыбкой!',
          action: { label: 'Консультация по лечению во сне', type: 'booking', data: 'Лечение во сне (седация)' }
        }
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Вы можете наглядно выбрать проблемный зуб на нашей интерактивной зубной формуле (FDI 32 зуба) или сразу забронировать удобный таймслот в календаре.',
          action: { label: 'Открыть интерактивную карту зубов', type: 'odontogram' }
        }
      }

      setMessages(prev => [...prev, botResponse])
    }, 600)
  }

  const handleAction = (action: ChatMessage['action']) => {
    if (!action) return
    if (action.type === 'booking') {
      onOpenBooking(action.data)
      setIsOpen(false)
    } else if (action.type === 'symptom') {
      onOpenSymptomChecker()
      setIsOpen(false)
    } else if (action.type === 'odontogram') {
      onOpenOdontogram()
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Floating Action Beacon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-card hover:shadow-glow hover:scale-105 transition-all flex items-center gap-2 cursor-pointer group"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
        </div>
        <span className="hidden sm:inline font-bold text-xs">AI Консультант</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-navy-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">DentoBot • AI Ассистент</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>В сети (мгновенные ответы)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[80%] space-y-2">
                  <div className={`p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                  }`}>
                    {m.text}
                  </div>

                  {m.action && (
                    <button
                      onClick={() => handleAction(m.action)}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-[11px] shadow-xs hover:shadow-soft flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-[11px] font-semibold text-slate-600 transition-colors cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Задайте вопрос о лечении..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
