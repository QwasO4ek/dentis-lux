import React, { useState } from 'react'
import { Tooth, ToothStatus, TreatmentOption } from '../types'
import { initialTeethData } from '../data/dentalData'
import { formatCurrency } from '../utils/calendarUtils'
import { CheckCircle, Shield, Clock, ArrowRight, Info, Filter, Sparkles, Layers } from 'lucide-react'

interface InteractiveOdontogramProps {
  onSelectToothForBooking: (toothId: number, treatmentName?: string) => void
}

export const InteractiveOdontogram: React.FC<InteractiveOdontogramProps> = ({
  onSelectToothForBooking
}) => {
  const [teeth] = useState<Tooth[]>(initialTeethData)
  const [selectedTooth, setSelectedTooth] = useState<Tooth>(teeth.find(t => t.id === 16) || teeth[0])
  const [activeFilter, setActiveFilter] = useState<'all' | ToothStatus>('all')
  const [activeJawTab, setActiveJawTab] = useState<'all' | 'upper' | 'lower'>('all')

  const getStatusMeta = (status: ToothStatus) => {
    switch (status) {
      case 'healthy':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          gradient: 'from-emerald-400 to-teal-500',
          border: 'border-emerald-200',
          label: 'Здоров'
        }
      case 'caries':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          gradient: 'from-amber-400 to-orange-500',
          border: 'border-amber-300',
          label: 'Кариес'
        }
      case 'pulpitis':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          gradient: 'from-rose-500 to-red-600',
          border: 'border-rose-300',
          label: 'Пульпит'
        }
      case 'crown':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
          dot: 'bg-indigo-500',
          gradient: 'from-indigo-400 to-blue-600',
          border: 'border-indigo-300',
          label: 'Коронка'
        }
      case 'implant':
        return {
          bg: 'bg-cyan-50 text-cyan-800 border-cyan-300',
          dot: 'bg-cyan-500',
          gradient: 'from-cyan-400 to-teal-600',
          border: 'border-cyan-300',
          label: 'Имплант'
        }
      case 'missing':
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-300',
          dot: 'bg-slate-400',
          gradient: 'from-slate-300 to-slate-400',
          border: 'border-slate-200',
          label: 'Отсутствует'
        }
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          gradient: 'from-slate-400 to-slate-500',
          border: 'border-slate-200',
          label: 'Осмотр'
        }
    }
  }

  // ЗУБЫ ПО КВАДРАНТАМ
  const upperRight = teeth.filter(t => t.quadrant === 1).sort((a, b) => b.id - a.id) // 18 -> 11
  const upperLeft = teeth.filter(t => t.quadrant === 2).sort((a, b) => a.id - b.id)  // 21 -> 28
  const lowerRight = teeth.filter(t => t.quadrant === 4).sort((a, b) => b.id - a.id) // 48 -> 41
  const lowerLeft = teeth.filter(t => t.quadrant === 3).sort((a, b) => a.id - b.id)  // 31 -> 38

  const renderToothCard = (tooth: Tooth) => {
    const isSelected = selectedTooth.id === tooth.id
    const meta = getStatusMeta(tooth.status)
    const matchesFilter = activeFilter === 'all' || tooth.status === activeFilter

    return (
      <button
        key={tooth.id}
        type="button"
        onClick={() => setSelectedTooth(tooth)}
        className={`group relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-2xl transition-all duration-200 cursor-pointer min-w-[54px] sm:min-w-[64px] border ${
          isSelected
            ? 'ring-2 ring-cyan-500 bg-cyan-50/90 border-cyan-400 shadow-md scale-105 z-20'
            : matchesFilter
            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-300 hover:scale-102 shadow-xs'
            : 'bg-slate-50 border-slate-100 opacity-35 hover:opacity-100'
        }`}
      >
        {/* Top: Tooth Number */}
        <div className="flex items-center justify-between w-full px-0.5">
          <span className={`text-[11px] font-black tracking-tight ${isSelected ? 'text-cyan-700' : 'text-slate-700'}`}>
            #{tooth.id}
          </span>
          <span className={`w-2 h-2 rounded-full ${meta.dot} shadow-xs`} />
        </div>

        {/* Center: Sleek Stylized Anatomical Tooth Graphic */}
        <div className="my-1 relative w-9 h-11 sm:w-10 sm:h-12 flex items-center justify-center">
          <svg viewBox="0 0 36 44" className="w-full h-full drop-shadow-xs group-hover:drop-shadow-sm transition-all">
            {/* Tooth Crown & Root Outline */}
            <path
              d={
                tooth.type === 'molar'
                  ? 'M6 8 C6 3, 30 3, 30 8 C34 16, 33 28, 28 42 C24 36, 21 24, 18 24 C15 24, 12 36, 8 42 C3 28, 2 16, 6 8 Z'
                  : tooth.type === 'premolar'
                  ? 'M8 8 C8 3, 28 3, 28 8 C32 16, 31 30, 24 42 C20 34, 18 26, 18 26 C18 26, 16 34, 12 42 C5 30, 4 16, 8 8 Z'
                  : tooth.type === 'canine'
                  ? 'M10 8 C12 2, 24 2, 26 8 C30 18, 28 34, 18 42 C8 34, 6 18, 10 8 Z'
                  : 'M8 6 C8 2, 28 2, 28 6 C31 16, 29 32, 18 42 C7 32, 5 16, 8 6 Z'
              }
              fill={isSelected ? '#0EA5E9' : tooth.status === 'missing' ? '#E2E8F0' : '#FFFFFF'}
              stroke={isSelected ? '#0284C7' : '#94A3B8'}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            
            {/* Tooth Enamel Highlight */}
            {tooth.status !== 'missing' && (
              <path
                d="M10 10 C12 6, 24 6, 26 10 C27 13, 27 16, 25 18 C20 16, 16 16, 11 18 C9 16, 9 13, 10 10 Z"
                fill={isSelected ? '#38BDF8' : '#F8FAFC'}
                opacity={0.8}
              />
            )}

            {/* Condition Emblem */}
            {tooth.status === 'caries' && (
              <circle cx="18" cy="14" r="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            )}
            {tooth.status === 'pulpitis' && (
              <circle cx="18" cy="15" r="4" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
            )}
            {tooth.status === 'implant' && (
              <path d="M14 26 L22 26 M15 30 L21 30 M16 34 L20 34 M17 38 L19 38" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
            )}
            {tooth.status === 'crown' && (
              <path d="M11 10 L14 16 L18 10 L22 16 L25 10" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        </div>

        {/* Bottom: Type abbreviation */}
        <span className={`text-[10px] font-semibold truncate w-full text-center ${
          isSelected ? 'text-cyan-800' : 'text-slate-500'
        }`}>
          {tooth.type === 'molar' ? 'Моляр' : tooth.type === 'premolar' ? 'Премол.' : tooth.type === 'canine' ? 'Клык' : 'Резец'}
        </span>
      </button>
    )
  }

  return (
    <section id="odontogram" className="py-20 bg-slate-50/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Цифровая одонтограмма взрослого прикуса (FDI)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Интерактивная карта 32 зубов
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            Выберите любой зуб для мгновенного просмотра клинического состояния, плана лечения и точной стоимости.
          </p>
        </div>

        {/* Filter Bar & Jaw View Switcher */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-soft mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Jaw View Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveJawTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeJawTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Вся челюсть (32 зуба)
            </button>
            <button
              onClick={() => setActiveJawTab('upper')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeJawTab === 'upper'
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Верхняя челюсть
            </button>
            <button
              onClick={() => setActiveJawTab('lower')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeJawTab === 'lower'
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Нижняя челюсть
            </button>
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Все
            </button>
            {[
              { id: 'healthy', label: 'Здоровые', color: 'bg-emerald-500' },
              { id: 'caries', label: 'Кариес', color: 'bg-amber-500' },
              { id: 'pulpitis', label: 'Пульпит', color: 'bg-rose-500' },
              { id: 'crown', label: 'Коронки', color: 'bg-indigo-500' },
              { id: 'implant', label: 'Импланты', color: 'bg-cyan-500' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as ToothStatus)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${f.color}`} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Main Workspace: Odontogram Chart (Left) + Detailed Diagnostic Blueprint (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Odontogram Interactive Arch Container */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-6">
            
            {/* UPPER JAW */}
            {(activeJawTab === 'all' || activeJawTab === 'upper') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    Верхняя челюсть (Квадрант 1: Правый)
                  </span>
                  <span className="flex items-center gap-1.5 text-right">
                    (Квадрант 2: Левый)
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  </span>
                </div>

                {/* Horizontal scroll container on small screens with clean flex */}
                <div className="overflow-x-auto pb-2 pt-1">
                  <div className="min-w-[560px] flex items-center justify-between gap-1.5">
                    {/* Quadrant 1: 18 -> 11 */}
                    <div className="flex items-center gap-1.5 flex-1 justify-end pr-2 border-r-2 border-dashed border-slate-200">
                      {upperRight.map(renderToothCard)}
                    </div>
                    {/* Quadrant 2: 21 -> 28 */}
                    <div className="flex items-center gap-1.5 flex-1 justify-start pl-2">
                      {upperLeft.map(renderToothCard)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DIVIDER: OCCLUSION SMILE LINE */}
            {activeJawTab === 'all' && (
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-slate-200"></div>
                <span className="absolute bg-slate-100 px-4 py-1 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-wider border border-slate-200">
                  Линия смыкания прикуса
                </span>
              </div>
            )}

            {/* LOWER JAW */}
            {(activeJawTab === 'all' || activeJawTab === 'lower') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    Нижняя челюсть (Квадрант 4: Правый)
                  </span>
                  <span className="flex items-center gap-1.5 text-right">
                    (Квадрант 3: Левый)
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  </span>
                </div>

                <div className="overflow-x-auto pb-2 pt-1">
                  <div className="min-w-[560px] flex items-center justify-between gap-1.5">
                    {/* Quadrant 4: 48 -> 41 */}
                    <div className="flex items-center gap-1.5 flex-1 justify-end pr-2 border-r-2 border-dashed border-slate-200">
                      {lowerRight.map(renderToothCard)}
                    </div>
                    {/* Quadrant 3: 31 -> 38 */}
                    <div className="flex items-center gap-1.5 flex-1 justify-start pl-2">
                      {lowerLeft.map(renderToothCard)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Helper Hint */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <span>Кликните на любой зуб для вызова диагностической карты</span>
              </span>
              <span className="font-semibold text-slate-400 hidden sm:inline">
                Стандарт FDI World Dental Federation
              </span>
            </div>

          </div>

          {/* Right Card: Diagnosis & Treatment Blueprint for Selected Tooth */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl border-2 border-cyan-500/40 p-6 sm:p-7 shadow-card space-y-6">
              
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      Зуб #{selectedTooth.id}
                    </span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusMeta(selectedTooth.status).bg}`}>
                      {getStatusMeta(selectedTooth.status).label}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 mt-1">
                    {selectedTooth.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedTooth.jaw === 'upper' ? 'Верхняя челюсть' : 'Нижняя челюсть'} • Квадрант {selectedTooth.quadrant}
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-50 to-teal-50 text-cyan-700 flex items-center justify-center font-black text-xl border border-cyan-200/80 shadow-xs">
                  #{selectedTooth.id}
                </div>
              </div>

              {/* Condition Diagnostic Note */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  Клиническая картина:
                </div>
                <p className="text-sm text-slate-800 leading-snug font-semibold">
                  {selectedTooth.conditionDescription}
                </p>
              </div>

              {/* Available Treatments */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-600" />
                  Рекомендуемые процедуры:
                </h4>

                <div className="space-y-3">
                  {selectedTooth.treatments.map((treatment: TreatmentOption, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {treatment.name}
                        </h5>
                        <span className="text-base font-black text-cyan-600 flex-shrink-0">
                          {treatment.price === 0 ? 'Бесплатно' : formatCurrency(treatment.price)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {treatment.description}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {treatment.duration}
                        </span>

                        {treatment.warranty && (
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <Shield className="w-3 h-3" />
                            {treatment.warranty}
                          </span>
                        )}

                        <button
                          onClick={() => onSelectToothForBooking(selectedTooth.id, treatment.name)}
                          className="text-xs font-bold text-cyan-600 group-hover:text-cyan-700 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          Выбрать <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => onSelectToothForBooking(selectedTooth.id, selectedTooth.treatments[0]?.name)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Записаться на лечение зуба #{selectedTooth.id}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
