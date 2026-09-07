import React from 'react'
import { branchesData } from '../data/dentalData'
import { Phone, MapPin, Clock, ShieldCheck, Sparkles, MessageSquare, Send } from 'lucide-react'

interface FooterProps {
  onOpenBooking: () => void
  onOpenSymptomChecker: () => void
  onOpenPatientPortal: () => void
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenSymptomChecker,
  onOpenPatientPortal
}) => {
  return (
    <footer id="contacts" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Emergency */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                DENTIS<span className="text-cyan-400">.LUX</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Флагманский центр эстетической стоматологии, цифровой имплантации и исправления прикуса. Оборудование экспертного класса Carl Zeiss, KaVo, 3Shape Trios.
            </p>

            {/* Quick emergency widget */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Отделение неотложной помощи 24/7</span>
              </div>
              <p className="text-xs text-slate-300">
                Прием с острой болью в день обращения без предварительной записи.
              </p>
              <button
                onClick={onOpenSymptomChecker}
                className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Экспресс AI-триаж боли
              </button>
            </div>
          </div>

          {/* Col 2 & 3: Branches Details */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6">
            {branchesData.map((b) => (
              <div key={b.id} className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {b.name}
                </h4>
                <p className="text-xs text-slate-300">{b.address}</p>
                <p className="text-[11px] text-cyan-300 font-medium">{b.metro}</p>
                <div className="pt-1 text-xs text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {b.hours}
                  </p>
                  <p className="text-emerald-400 font-semibold">{b.parking}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Col 4: Quick Navigation & Portals */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Цифровые сервисы
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#odontogram" className="hover:text-cyan-400 transition-colors">
                  Интерактивная зубная карта (32 зуба)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPatientPortal}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  Личный кабинет (Электронная медкарта)
                </button>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  Калькулятор рассрочки 0-0-24
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left font-bold text-cyan-400"
                >
                  Записаться онлайн на удобное время
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://wa.me/74951203300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Чат с администратором в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & License */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Стоматологическая клиника «DENTIS LUX». Все права защищены.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Медицинская лицензия № ЛО-77-01-021489</span>
            <span>Политика конфиденциальности</span>
            <span>Стандарты 152-ФЗ</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
