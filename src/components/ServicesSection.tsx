import React, { useState } from 'react'
import { serviceCategoriesData } from '../data/dentalData'
import { formatCurrency } from '../utils/calendarUtils'
import { ShieldCheck, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(serviceCategoriesData[0].id)

  const activeCategory = serviceCategoriesData.find(c => c.id === activeCategoryId) || serviceCategoriesData[0]

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold mb-3 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Прозрачность и стандарты лечения</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Комплексные услуги и честный прайс-лист
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Все процедуры выполняются под строгим контролем цифровых протоколов с фиксацией цены до начала лечения.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {serviceCategoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeCategoryId === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-soft scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Description */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {activeCategory.description}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategory.services.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl p-6 sm:p-7 transition-all flex flex-col justify-between border ${
                item.popular
                  ? 'border-2 border-cyan-500 bg-cyan-50/20 shadow-card'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-soft'
              }`}
            >
              {item.popular && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Хит выбора пациентов
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.name}
                </h3>

                {/* Price block */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-cyan-600">
                    {formatCurrency(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-slate-400 line-through font-semibold">
                      {formatCurrency(item.oldPrice)}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.duration}
                  </span>
                  {item.warranty && (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Гарантия: {item.warranty}
                    </span>
                  )}
                </div>

                {/* Features list */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
                  {item.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4">
                <button
                  onClick={() => onSelectService(item.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    item.popular
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-soft'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>Записаться на эту процедуру</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
