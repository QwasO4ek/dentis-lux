import React, { useState } from 'react'
import { Sparkles, ArrowLeftRight, CheckCircle2, Clock, User, Star, Award } from 'lucide-react'

interface BeforeAfterSliderProps {
  onOpenBooking: (serviceName?: string) => void
}

interface CaseItem {
  id: string
  title: string
  category: string
  duration: string
  doctor: string
  procedure: string
  patientFeedback: string
  imgUrl: string
  beforeFilter: string
  beforeLabel: string
  afterLabel: string
  rating: number
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50) // percentage
  const [isDragging, setIsDragging] = useState(false)
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)

  const cases: CaseItem[] = [
    {
      id: 'case-veneers',
      title: 'Керамические виниры E.max (10 зубов зоны улыбки)',
      category: 'Эстетическая реставрация',
      duration: '2 визита (10 дней)',
      doctor: 'Д-р Виктория Лазарева',
      procedure: '10 ультратонких виниров E.max (Германия)',
      patientFeedback: '«Мечтала о красивой улыбке 10 лет. Результат превзошел все ожидания — цвет натуральный, зубы гладкие и идеальной формы!»',
      imgUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
      beforeFilter: 'sepia(0.4) contrast(0.92) brightness(0.88) saturate(1.3)',
      beforeLabel: 'ДО: оттенок VITA A3.5, микротрещины эмали',
      afterLabel: 'ПОСЛЕ: виниры E.max Bleach 2, зеркальный блеск',
      rating: 5.0
    },
    {
      id: 'case-whitening',
      title: 'Лазерное отбеливание Philips Zoom 4 WhiteSpeed',
      category: 'Клиническое отбеливание',
      duration: '1 сеанс (60 минут)',
      doctor: 'Д-р Михаил Смирнов',
      procedure: 'Клиническое отбеливание холодным LED-светом',
      patientFeedback: '«Осветлили на 7 тонов за один час без боли и без прострелов чувствительности. Улыбка буквально сияет!»',
      imgUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=85',
      beforeFilter: 'sepia(0.55) contrast(0.9) brightness(0.85) saturate(1.5)',
      beforeLabel: 'ДО: чайный налет, пигментация, тон A4',
      afterLabel: 'ПОСЛЕ: белизна на 8 тонов, реминерализация',
      rating: 5.0
    },
    {
      id: 'case-aligners',
      title: 'Выравнивание прикуса прозрачными элайнерами Spark',
      category: 'Цифровая ортодонтия',
      duration: '8 месяцев',
      doctor: 'Д-р Елена Родионова',
      procedure: 'Комплект 18 пар капп Spark Advanced',
      patientFeedback: '«Никаких брекетов, на работе никто не замечал каппы. Прикус стал идеальным, лицо визуально помолодело!»',
      imgUrl: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1200&q=85',
      beforeFilter: 'sepia(0.3) contrast(0.95) brightness(0.9)',
      beforeLabel: 'ДО: скученность резцов, перекрестный прикус',
      afterLabel: 'ПОСЛЕ: идеальная симметрия зубной дуги',
      rating: 5.0
    }
  ]

  const currentCase = cases[activeCaseIdx]

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percent = Math.max(2, Math.min(98, (x / rect.width) * 100))
    setSliderPosition(percent)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  return (
    <section id="transformations" className="py-20 bg-slate-950 text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-cyan-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Клинические результаты пациентов клиники</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Преображение улыбки: Интерактивное «До / После»
          </h2>
          <p className="mt-2.5 text-slate-300 text-sm sm:text-base">
            Потяните ползунок в центре фотографии, чтобы увидеть результат преображения зубного ряда.
          </p>
        </div>

        {/* Case Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiveCaseIdx(idx)
                setSliderPosition(50)
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCaseIdx === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-glow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Split Slider Canvas (Left) */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full h-[360px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 select-none cursor-ew-resize group"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
            >
              {/* After Layer (Base Image: Pristine Bleach Smile) */}
              <img
                src={currentCase.imgUrl}
                alt="Результат после лечения"
                className="absolute inset-0 w-full h-full object-cover filter contrast-105 brightness-105"
                draggable={false}
              />
              
              {/* After Tag */}
              <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                ПОСЛЕ ЛЕЧЕНИЯ
              </div>

              {/* Before Layer (Clipped Image with pre-treatment dental filter) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={currentCase.imgUrl}
                  alt="Состояние до лечения"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: currentCase.beforeFilter }}
                  draggable={false}
                />
                
                {/* Before Tag */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                  ДО ЛЕЧЕНИЯ
                </div>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-glow pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-cyan-500">
                  <ArrowLeftRight className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
            </div>

            {/* Slider Guidance Labels */}
            <div className="flex justify-between items-center text-xs text-slate-400 mt-3 px-2">
              <span className="text-slate-400 truncate mr-2">← {currentCase.beforeLabel}</span>
              <span className="text-emerald-400 font-semibold truncate ml-2 text-right">{currentCase.afterLabel} →</span>
            </div>
          </div>

          {/* Case Clinical Profile (Right) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  {currentCase.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{currentCase.rating}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                {currentCase.title}
              </h3>
            </div>

            {/* Patient Feedback */}
            <blockquote className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              {currentCase.patientFeedback}
            </blockquote>

            {/* Clinical Specs */}
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Процедура:
                </span>
                <span className="font-bold text-slate-200">{currentCase.procedure}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Срок реализации:
                </span>
                <span className="font-bold text-slate-200">{currentCase.duration}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Ведущий врач:
                </span>
                <span className="font-bold text-cyan-300">{currentCase.doctor}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenBooking(currentCase.procedure)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-sm shadow-soft hover:shadow-glow transition-all cursor-pointer"
            >
              Записаться на консультацию по этому кейсу
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
