// ============================================
// PORTAL PRODUCTOR - TYPESCRIPT TYPES
// Tipos generados del schema de Supabase
// ============================================

// ============================================
// ENUMS
// ============================================

export type DocumentType =
    | 'ine'
    | 'curp'
    | 'rfc'
    | 'comprobante_domicilio'
    | 'permiso_siembra'
    | 'factura_venta'
    | 'factura_compra'
    | 'contrato_habilitacion'

export type ValidationStatus =
    | 'pending'
    | 'validating'
    | 'approved'
    | 'rejected'

export type SettlementStatus =
    | 'pending'
    | 'partial'
    | 'completed'
    | 'cancelled'

export type NotificationType =
    | 'new_ticket'
    | 'payment_released'
    | 'document_validated'
    | 'quality_alert'
    | 'inventory_update'
    | 'system_message'

export type SupportStatus =
    | 'open'
    | 'in_progress'
    | 'waiting_user'
    | 'resolved'
    | 'closed'

export type PriorityLevel =
    | 'low'
    | 'medium'
    | 'high'
    | 'urgent'

// ============================================
// CORE INTERFACES
// ============================================

export interface UserProfile {
    id: string
    rfc: string
    nombre: string
    email: string
    telefono: string
    empresa?: string
    created_at: string
    updated_at: string
}

export interface Document {
    id: string
    user_id: string
    document_type: DocumentType
    file_name: string
    file_url: string
    file_size?: number
    mime_type?: string
    status: ValidationStatus
    validation_details?: Record<string, any>
    validated_by?: string
    validated_at?: string
    uploaded_at: string
    expires_at?: string
    metadata?: Record<string, any>
    created_at: string
    updated_at: string
}

export interface ScaleTicket {
    id: string
    user_id: string
    folio: string
    product_type: string
    gross_weight: number
    tare_weight: number
    net_weight: number
    entry_datetime: string
    truck_plates?: string
    driver_name?: string
    location?: string
    quality_analyzed: boolean
    notes?: string
    created_at: string
    updated_at: string
}

export interface QualityAnalysis {
    id: string
    ticket_id: string
    humidity_level: number
    impurities_level: number
    broken_grains?: number
    foreign_matter?: number
    test_weight?: number
    temperature?: number
    test_date: string
    lab_technician?: string
    passed_standards?: boolean
    deduction_applied?: number
    notes?: string
    created_at: string
    updated_at: string
}

export interface GrainInventory {
    id: string
    user_id: string
    silo_id: string
    grain_type: string
    quantity_tons: number
    storage_date: string
    estimated_exit_date?: string
    actual_exit_date?: string
    location?: string
    status: string
    notes?: string
    created_at: string
    updated_at: string
}

export interface Settlement {
    id: string
    user_id: string
    settlement_number: string
    period_start: string
    period_end: string
    total_amount: number
    paid_amount: number
    withheld_amount: number
    withheld_reason?: string
    status: SettlementStatus
    payment_date?: string
    payment_reference?: string
    clabe_account?: string
    breakdown?: Record<string, any>
    created_at: string
    updated_at: string
}

export interface LandPlot {
    id: string
    user_id: string
    plot_name: string
    plot_number?: string
    coordinates?: any // Geometry type
    hectares: number
    municipality?: string
    state: string
    permit_id?: string
    crop_type?: string
    season?: string
    active: boolean
    created_at: string
    updated_at: string
}

export interface BankAccount {
    id: string
    user_id: string
    clabe: string
    bank_name: string
    account_holder: string
    is_primary: boolean
    verified: boolean
    verification_date?: string
    verification_method?: string
    active: boolean
    created_at: string
    updated_at: string
}

export interface Notification {
    id: string
    user_id: string
    type: NotificationType
    title: string
    message: string
    sent_via: string[]
    read: boolean
    read_at?: string
    related_id?: string
    related_type?: string
    metadata?: Record<string, any>
    created_at: string
}

export interface NotificationSettings {
    id: string
    user_id: string
    telegram_enabled: boolean
    telegram_chat_id?: string
    whatsapp_enabled: boolean
    whatsapp_number?: string
    email_enabled: boolean
    in_app_enabled: boolean
    new_ticket_alert: boolean
    payment_alert: boolean
    document_alert: boolean
    quality_alert: boolean
    quiet_hours_start?: string
    quiet_hours_end?: string
    created_at: string
    updated_at: string
}

export interface SupportTicket {
    id: string
    user_id: string
    ticket_number: string
    subject: string
    description: string
    category?: string
    status: SupportStatus
    priority: PriorityLevel
    assigned_to?: string
    resolved_at?: string
    resolution_notes?: string
    created_at: string
    updated_at: string
}

export interface ChatMessage {
    id: string
    ticket_id: string
    sender_id: string
    sender_name: string
    sender_type: 'user' | 'staff'
    message: string
    attachments?: Record<string, any>
    read: boolean
    read_at?: string
    created_at: string
}

export interface Insumo {
    id: string
    sku: string
    name: string
    category: string
    brand?: string
    description?: string
    technical_sheet_url?: string
    application_guide_url?: string
    active: boolean
    price?: number
    unit?: string
    stock_available?: number
    image_url?: string
    metadata?: Record<string, any>
    created_at: string
    updated_at: string
}

export interface MarketPrice {
    id: string
    commodity: string
    price: number
    currency: string
    exchange?: string
    guaranteed_price?: number
    price_date: string
    recorded_at: string
}

export interface GovernmentSupport {
    id: string
    user_id: string
    program_name: string
    application_number?: string
    status: string
    requested_amount?: number
    approved_amount?: number
    paid_amount?: number
    application_date?: string
    approval_date?: string
    payment_date?: string
    required_documents?: string[]
    missing_documents?: string[]
    notes?: string
    created_at: string
    updated_at: string
}

// ============================================
// COMBINED TYPES (con joins)
// ============================================

export interface ScaleTicketWithQuality extends ScaleTicket {
    quality_analysis?: QualityAnalysis
}

export interface DocumentWithValidation extends Document {
    validator?: {
        email: string
        nombre: string
    }
}

export interface SupportTicketWithMessages extends SupportTicket {
    messages: ChatMessage[]
    unread_count: number
}

export interface SettlementWithDetails extends Settlement {
    user_profile: UserProfile
    ticket_count: number
}

// ============================================
// USER STATS
// ============================================

export interface UserStats {
    total_tickets: number
    total_inventory_tons: number
    pending_settlements: number
    total_plots: number
    unread_notifications: number
}

// ============================================
// FORM TYPES (para formularios)
// ============================================

export interface DocumentUploadForm {
    document_type: DocumentType
    file: File
    metadata?: Record<string, any>
}

export interface BankAccountForm {
    clabe: string
    bank_name: string
    account_holder: string
    is_primary: boolean
}

export interface SupportTicketForm {
    subject: string
    description: string
    category: string
    priority: PriorityLevel
}

export interface LandPlotForm {
    plot_name: string
    plot_number?: string
    hectares: number
    municipality?: string
    crop_type?: string
    season?: string
    coordinates?: {
        lat: number
        lng: number
    }[]
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
    data?: T
    error?: {
        message: string
        code?: string
    }
    metadata?: {
        page?: number
        total?: number
        limit?: number
    }
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

// ============================================
// FILTER TYPES
// ============================================

export interface ScaleTicketFilters {
    startDate?: string
    endDate?: string
    productType?: string
    location?: string
}

export interface DocumentFilters {
    documentType?: DocumentType
    status?: ValidationStatus
    startDate?: string
    endDate?: string
}

export interface SettlementFilters {
    status?: SettlementStatus
    startDate?: string
    endDate?: string
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface SettlementChartData {
    period: string
    total: number
    paid: number
    withheld: number
}

export interface QualityTrendData {
    date: string
    humidity: number
    impurities: number
    passed: boolean
}

export interface InventoryDistribution {
    silo_id: string
    grain_type: string
    quantity: number
    percentage: number
}
