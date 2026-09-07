import React, { useState } from 'react'
import { beforeAfterCasesData } from '../data/dentalData'
import { Sparkles, ArrowLeftRight, CheckCircle2, Clock, User, Star } from 'lucide-react'

interface BeforeAfterSliderProps {
  onOpenBooking: (serviceName?: string) => void
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50) // percentage
  const [isDragging, setIsDragging] = useState(false)

  const currentCase = beforeAfterCasesData[activeCaseIndex]

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
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
    <section id="transformations" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Клинические результаты пациентов DENTIS LUX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Преображение улыбки: Интерактивное «До / После»
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Потяните разделитель влево или вправо, чтобы увидеть разницу в эстетике и симметрии зубного ряда.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {beforeAfterCasesData.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx)
                setSliderPosition(50)
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCaseIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-glow'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700'
              }`}
            >
              {c.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Split Slider Canvas (Left) */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 select-none cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Base) */}
              <img
                src={currentCase.afterImg}
                alt={`После: ${currentCase.title}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                ПОСЛЕ (Результат)
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={currentCase.beforeImg}
                  alt={`До: ${currentCase.title}`}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-90"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md pointer-events-none">
                  ДО ЛЕЧЕНИЯ
                </div>
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-glow flex items-center justify-center font-bold text-xs">
                  <ArrowLeftRight className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 mt-3 px-2">
              <span>← Тяните влево</span>
              <span className="font-semibold text-cyan-400">Интерактивная шторка сравнения</span>
              <span>Тяните вправо →</span>
            </div>
          </div>

          {/* Case Metadata & Doctor notes (Right) */}
          <div className="lg:col-span-5 bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>{currentCase.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {currentCase.rating}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                {currentCase.title}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {currentCase.description}
            </p>

            {/* Quick Specs */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-3">
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

            {/* CTA */}
            <button
              onClick={() => onOpenBooking(currentCase.procedure)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-sm shadow-soft hover:shadow-glow transition-all cursor-pointer"
            >
              Хочу такой же результат (Консультация)
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
