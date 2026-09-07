import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { InteractiveOdontogram } from './components/InteractiveOdontogram'
import { BeforeAfterSlider } from './components/BeforeAfterSlider'
import { ServicesSection } from './components/ServicesSection'
import { PricingCalculator } from './components/PricingCalculator'
import { DoctorsSection } from './components/DoctorsSection'
import { SterilizationStandards } from './components/SterilizationStandards'
import { ReviewsAndFaq } from './components/ReviewsAndFaq'
import { Footer } from './components/Footer'
import { SmartBookingModal } from './components/SmartBookingModal'
import { SymptomCheckerModal } from './components/SymptomCheckerModal'
import { PatientPortalModal } from './components/PatientPortalModal'
import { DentoBot } from './components/DentoBot'

export const App: React.FC = () => {
  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState<string | undefined>()
  const [bookingToothId, setBookingToothId] = useState<number | undefined>()
  const [bookingEmergency, setBookingEmergency] = useState(false)

  const [symptomCheckerOpen, setSymptomCheckerOpen] = useState(false)
  const [patientPortalOpen, setPatientPortalOpen] = useState(false)

  // Handlers
  const handleOpenBooking = (service?: string, toothId?: number, isEmergency: boolean = false) => {
    setBookingService(service)
    setBookingToothId(toothId)
    setBookingEmergency(isEmergency)
    setBookingOpen(true)
  }

  const handleSelectToothForBooking = (toothId: number, treatmentName?: string) => {
    handleOpenBooking(treatmentName || `Лечение зуба #${toothId}`, toothId, false)
  }

  const handleSymptomUrgentBooking = (serviceName: string, isEmergency: boolean) => {
    setSymptomCheckerOpen(false)
    handleOpenBooking(serviceName, undefined, isEmergency)
  }

  const handleScrollToOdontogram = () => {
    const el = document.getElementById('odontogram')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top sticky navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenSymptomChecker={() => setSymptomCheckerOpen(true)}
        onOpenPatientPortal={() => setPatientPortalOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenSymptomChecker={() => setSymptomCheckerOpen(true)}
          onScrollToOdontogram={handleScrollToOdontogram}
        />

        {/* 2. Interactive 32-Tooth Odontogram (FDI) */}
        <InteractiveOdontogram
          onSelectToothForBooking={handleSelectToothForBooking}
        />

        {/* 3. Before / After Interactive Slider */}
        <BeforeAfterSlider
          onOpenBooking={(procedure) => handleOpenBooking(procedure)}
        />

        {/* 4. Services & Transparent Pricing */}
        <ServicesSection
          onSelectService={(service) => handleOpenBooking(service)}
        />

        {/* 5. Pricing & 0-0-24 Installment Calculator */}
        <PricingCalculator
          onOpenBookingWithPlan={(planSummary) => handleOpenBooking(planSummary)}
        />

        {/* 6. Medical Team & Experts */}
        <DoctorsSection
          onSelectDoctor={(docName) => handleOpenBooking(undefined, undefined, false)}
        />

        {/* 7. Safety, Sterilization Melag B & Zeiss Optics */}
        <SterilizationStandards />

        {/* 8. Patient Reviews & FAQ Accordion */}
        <ReviewsAndFaq />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenSymptomChecker={() => setSymptomCheckerOpen(true)}
        onOpenPatientPortal={() => setPatientPortalOpen(true)}
      />

      {/* Interactive Modals */}
      <SmartBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingService}
        initialToothId={bookingToothId}
        initialUrgency={bookingEmergency}
      />

      <SymptomCheckerModal
        isOpen={symptomCheckerOpen}
        onClose={() => setSymptomCheckerOpen(false)}
        onBookUrgent={handleSymptomUrgentBooking}
      />

      <PatientPortalModal
        isOpen={patientPortalOpen}
        onClose={() => setPatientPortalOpen(false)}
        onBookNext={() => handleOpenBooking('Продолжение плана лечения')}
      />

      {/* Floating AI Assistant */}
      <DentoBot
        onOpenBooking={(service) => handleOpenBooking(service)}
        onOpenSymptomChecker={() => setSymptomCheckerOpen(true)}
        onOpenOdontogram={handleScrollToOdontogram}
      />
    </div>
  )
}
