import React from 'react'
import { ArrowRight, ShieldCheck, Sparkles, Clock, CheckCircle2, Star, Calendar } from 'lucide-react'

interface HeroSectionProps {
  onOpenBooking: () => void
  onOpenSymptomChecker: () => void
  onScrollToOdontogram: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenSymptomChecker,
  onScrollToOdontogram
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-cyan-100/60 via-teal-50/40 to-blue-100/50 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headings & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 border border-cyan-200 text-cyan-800 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Швейцарские и немецкие стандарты цифровой стоматологии</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Интеллектуальная стоматология{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-500">
                без страха и боли
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Лечение под микроскопом <b>Carl Zeiss</b> с 30-кратным увеличением, имплантация зубов за 1 день с пожизненной гарантией и прозрачная стоимость каждого зуба на интерактивной 3D-карте.
            </p>

            {/* Bullet trust list */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>99.6% приживаемость имплантов</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Лечение во сне (мягкая седация)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Собственная CAD/CAM 3D лаборатория</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Беспроцентная рассрочка 0-0-24</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-base shadow-card hover:shadow-glow transition-all transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Записаться онлайн</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToOdontogram}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-base shadow-sm hover:border-cyan-300 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span className="text-cyan-600">🦷</span>
                <span>Выбрать зуб на карте</span>
              </button>
            </div>

            {/* Quick Emergency Banner */}
            <div className="pt-2">
              <div 
                onClick={onOpenSymptomChecker}
                className="inline-flex items-center gap-3 p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-slate-800 hover:bg-rose-100/80 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                  SOS
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-rose-700">Острая зубная боль прямо сейчас?</p>
                  <p className="text-slate-600">Запустите экспресс AI-триаж — примем дежурным врачом за 15 минут</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Clinic Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Инновационный стоматологический кабинет DENTIS LUX"
                  className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Флагманский кабинет микроскопии Carl Zeiss</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">
                    Лечение под оптическим увеличением сохраняет здоровый зуб навсегда.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Rated Doctors */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-slate-100 flex items-center gap-3.5 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-slate-900 text-base">5.0</span>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">1 200+ отзывов на Яндекс & ПроДокторов</p>
                </div>
              </div>

              {/* Floating Badge 2: Emergency Response */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-slate-100 flex items-center gap-3.5 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Свободные окна сегодня</div>
                  <p className="text-xs text-emerald-600 font-semibold">4 слота доступны для онлайн-записи</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
