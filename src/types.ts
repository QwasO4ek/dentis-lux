export type ToothStatus = 'healthy' | 'caries' | 'pulpitis' | 'crown' | 'implant' | 'missing' | 'aligner'

export interface TreatmentOption {
  name: string
  price: number
  duration: string
  description: string
  warranty?: string
}

export interface Tooth {
  id: number // FDI notation (11-18, 21-28, 31-38, 41-48)
  name: string
  jaw: 'upper' | 'lower'
  quadrant: 1 | 2 | 3 | 4
  type: 'incisor' | 'canine' | 'premolar' | 'molar'
  status: ToothStatus
  conditionDescription: string
  treatments: TreatmentOption[]
}

export interface Doctor {
  id: string
  name: string
  role: string
  experience: string
  image: string
  rating: number
  reviewsCount: number
  specialties: string[]
  badge: string
  education: string
  casesCount: number
}

export interface ServiceItem {
  id: string
  name: string
  price: number
  oldPrice?: number
  popular?: boolean
  features: string[]
  duration: string
  warranty?: string
}

export interface ServiceCategory {
  id: string
  name: string
  iconName: string
  description: string
  services: ServiceItem[]
}

export type UrgencyLevel = 'emergency' | 'urgent' | 'routine'

export interface Symptom {
  id: string
  title: string
  description: string
  iconName: string
  severity: UrgencyLevel
  possibleCauses: string[]
  recommendedDoctor: string
  firstAidInstructions: string[]
  recommendedService: string
  estimatedCost: string
}

export interface BeforeAfterCase {
  id: string
  title: string
  category: string
  duration: string
  doctor: string
  beforeImg: string
  afterImg: string
  description: string
  procedure: string
  rating: number
}

export interface BookingFormData {
  id?: string
  patientName: string
  phone: string
  email?: string
  service: string
  doctor: string
  date: string
  time: string
  branch: string
  toothId?: number
  urgency: 'normal' | 'emergency'
  notes?: string
}

export interface PatientRecord {
  patientName: string
  patientId: string
  phone: string
  bonusPoints: number
  discountLevel: string
  lastVisit: string
  nextAppointment?: {
    date: string
    time: string
    doctor: string
    procedure: string
    branch: string
  }
  treatmentPlan: {
    stage: string
    status: 'completed' | 'in_progress' | 'scheduled'
    date: string
    tooth: string
    procedure: string
    cost: number
  }[]
  xrays: {
    id: string
    date: string
    title: string
    type: string
    previewUrl: string
  }[]
  prescriptions: {
    medication: string
    dosage: string
    timing: string
    active: boolean
  }[]
}
