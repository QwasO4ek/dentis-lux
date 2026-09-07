import React, { useState } from 'react'
import { formatCurrency } from '../utils/calendarUtils'
import { Calculator, Check, ShieldCheck, Sparkles, ArrowRight, Percent } from 'lucide-react'

interface PricingCalculatorProps {
  onOpenBookingWithPlan: (planSummary: string) => void
}

interface CalcService {
  id: string
  name: string
  price: number
  category: string
  selected: boolean
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenBookingWithPlan }) => {
  const [services, setServices] = useState<CalcService[]>([
    { id: 'c1', name: 'Имплантат Straumann SLActive (под ключ)', price: 58000, category: 'Имплантация', selected: true },
    { id: 'c2', name: 'Керамический винир E.max (4 ед.)', price: 104000, category: 'Эстетика', selected: false },
    { id: 'c3', name: 'Курс элайнеров Spark / Invisalign', price: 195000, category: 'Ортодонтия', selected: false },
    { id: 'c4', name: 'Лечение кариеса под микроскопом (2 зуба)', price: 11200, category: 'Терапия', selected: true },
    { id: 'c5', name: 'Спа-гигиена по протоколу GBT (AirFlow)', price: 5500, category: 'Гигиена', selected: true },
    { id: 'c6', name: 'Седация (лечение во сне, 1 час)', price: 8500, category: 'Комфорт', selected: false },
  ])

  const [months, setMonths] = useState<number>(12)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0)

  const toggleService = (id: string) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, selected: !s.selected } : s))
    )
  }

  const selectedServices = services.filter(s => s.selected)
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0)
  const downPaymentAmount = Math.round((totalPrice * downPaymentPercent) / 100)
  const loanAmount = Math.max(0, totalPrice - downPaymentAmount)
  const monthlyPayment = months > 0 ? Math.round(loanAmount / months) : 0

  return (
    <section id="calculator" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
            <Percent className="w-3.5 h-3.5" />
            <span>Честная рассрочка 0-0-24 без процентов и переплат</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Калькулятор лечения и беспроцентной рассрочки
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Соберите ваш индивидуальный комплекс процедур и рассчитайте комфортный ежемесячный платеж от ведущих банков-партнеров.
          </p>
        </div>

        {/* Workspace Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Checklist (Left) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Выберите необходимые процедуры:
              </span>
              <span className="text-xs font-bold text-cyan-600">
                Выбрано: {selectedServices.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {services.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleService(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    item.selected
                      ? 'border-cyan-500 bg-cyan-50/40 ring-1 ring-cyan-400'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      item.selected ? 'bg-cyan-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {item.selected && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-black text-slate-800 flex-shrink-0">
                    {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Стоимость фиксируется в договоре и не меняется на протяжении всего лечения.</span>
            </div>
          </div>

          {/* Installment Widget (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-navy-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Общая стоимость плана:
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-1">
                  {formatCurrency(totalPrice)}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
            </div>

            {/* Installment Term Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                <span>Срок рассрочки:</span>
                <span className="text-cyan-400 font-extrabold">{months} месяцев (0% годовых)</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      months === m
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-soft'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {m} мес.
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                <span>Первоначальный взнос:</span>
                <span className="text-cyan-400 font-extrabold">{downPaymentPercent}% ({formatCurrency(downPaymentAmount)})</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 10, 20, 30].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDownPaymentPercent(p)}
                    className={`py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      downPaymentPercent === p
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Resulting Monthly Payment */}
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Ежемесячный платеж без переплат:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
                {formatCurrency(monthlyPayment)} <span className="text-xs text-slate-400 font-normal">/ мес.</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                ✓ Одобрение за 2 минуты онлайн через приложение банка
              </p>
            </div>

            {/* Primary CTA */}
            <button
              onClick={() => {
                const planText = `План: ${selectedServices.map(s => s.name).join(', ')} (${formatCurrency(totalPrice)}, рассрочка на ${months} мес)`;
                onOpenBookingWithPlan(planText);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Зафиксировать расчет и скидку</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}
