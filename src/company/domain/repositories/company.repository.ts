import { Company } from '../entities/company.entity'
import type { CreateCompanyDto } from '../../application/dto/create-company.dto'
import type { UpdateCompanyDto } from '../../application/dto/update-company.dto'
 
export abstract class CompanyRepository {
  abstract create(data: CreateCompanyDto): Promise<Company>
  abstract findAll(): Promise<Company[]>
  abstract findById(id: string): Promise<Company | null>
  abstract update(id: string, data: UpdateCompanyDto): Promise<Company>
  abstract delete(id: string): Promise<Company>
}
 