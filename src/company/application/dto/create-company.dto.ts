export class CreateCompanyDto {
  name: string
  cnpj: string
  email: string
  phone?: string
  site?: string
  sector: 'TECHNOLOGY' | 'FINANCE' | 'HEALTHCARE' | 'EDUCATION' | 'RETAIL' | 'INDUSTRY'
  expiresAt?: string
}