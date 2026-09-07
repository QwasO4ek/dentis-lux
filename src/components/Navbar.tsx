import React, { useState, useEffect } from 'react'
import { Phone, Calendar, User, AlertCircle, Clock, Menu, X, Shield, Sparkles } from 'lucide-react'

interface NavbarProps {
  onOpenBooking: (initialService?: string, initialTooth?: number, isEmergency?: boolean) => void
  onOpenSymptomChecker: () => void
  onOpenPatientPortal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSymptomChecker,
  onOpenPatientPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-white/80 backdrop-blur-sm py-4'
    }`}>
      {/* Top micro-bar */}
      <div className="hidden lg:block border-b border-slate-100 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Клиника открыта: сегодня до 22:00
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Прием с острой болью без очереди за 15 минут
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan-600" />
              Международные протоколы стерилизации EN 13060
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPatientPortal}
              className="flex items-center gap-1.5 text-slate-700 hover:text-cyan-600 font-medium transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-cyan-500" />
              Электронная медкарта (Личный кабинет)
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">Москва, ул. Тверская, 24</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                  DENTIS<span className="text-cyan-500">.LUX</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-cyan-50 text-cyan-700 rounded border border-cyan-200">
                  Digital 3D
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block tracking-wide font-medium">
                Цифровая стоматология & имплантация
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#odontogram" className="hover:text-cyan-600 transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              Зубная формула
            </a>
            <a href="#services" className="hover:text-cyan-600 transition-colors">Услуги & Цены</a>
            <a href="#doctors" className="hover:text-cyan-600 transition-colors">Врачи-эксперты</a>
            <a href="#transformations" className="hover:text-cyan-600 transition-colors">До / После</a>
            <a href="#calculator" className="hover:text-cyan-600 transition-colors">Рассрочка 0-0-24</a>
            <a href="#contacts" className="hover:text-cyan-600 transition-colors">Контакты</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Urgent Pain Button */}
            <button
              onClick={onOpenSymptomChecker}
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-all hover:shadow-sm cursor-pointer"
              title="Интерактивный тест симптомов и срочная помощь"
            >
              <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Острая боль / Триаж</span>
            </button>

            {/* Direct Phone */}
            <a
              href="tel:+74951203300"
              className="hidden md:flex items-center gap-2 text-slate-800 hover:text-cyan-600 transition-colors text-sm font-bold px-2"
            >
              <Phone className="w-4 h-4 text-cyan-500" />
              <span>+7 (495) 120-33-00</span>
            </a>

            {/* Smart Booking CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-sm shadow-soft hover:shadow-glow transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться онлайн</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              Запись
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-800 text-base">
            <a
              href="#odontogram"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-cyan-600"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Интерактивная зубная формула (32 зуба)
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-50">
              Услуги и прозрачные цены
            </a>
            <a href="#doctors" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-50">
              Врачи высшей категории
            </a>
            <a href="#transformations" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-50">
              Кейсы «До / После»
            </a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-50">
              Калькулятор рассрочки 0-0-24
            </a>
            <a href="#contacts" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-slate-50">
              Контакты и филиалы
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenPatientPortal()
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
            >
              <User className="w-4 h-4 text-cyan-500" />
              Личный кабинет / Электронная медкарта
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenSymptomChecker()
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm border border-rose-200"
            >
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Острая боль (Экстренный триаж)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm text-center shadow-soft"
            >
              Записаться на прием онлайн
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
