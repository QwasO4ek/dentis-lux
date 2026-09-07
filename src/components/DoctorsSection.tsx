import React from 'react'
import { doctorsData } from '../data/dentalData'
import { Star, Award, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react'

interface DoctorsSectionProps {
  onSelectDoctor: (doctorName: string) => void
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctor }) => {
  return (
    <section id="doctors" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold mb-3 border border-cyan-200">
            <Award className="w-3.5 h-3.5" />
            <span>Команда экспертов высшей квалификации</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Врачи, которым доверяют сложные клинические случаи
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Постоянные стажировки в Швейцарии, Германии и США. Более 10 000 успешно спасенных зубов и установленных имплантов.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorsData.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with Badge */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                    <span className="text-slate-400 text-[10px]">({doc.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-xl">
                    {doc.badge}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-bold text-cyan-600 mt-0.5">
                      {doc.experience}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {doc.role}
                    </p>
                  </div>

                  {/* Education */}
                  <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                    <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{doc.education}</span>
                  </div>

                  {/* Specialties tags */}
                  <div className="space-y-1.5 pt-1">
                    {doc.specialties.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDoctor(doc.name)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Записаться к доктору</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
