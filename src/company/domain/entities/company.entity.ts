// src/company/domain/entities/company.entity.ts

export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly site: string,
    public readonly sector: string,
  ) {}
}