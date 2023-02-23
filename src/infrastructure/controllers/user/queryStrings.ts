// /* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance, Type } from 'class-transformer'
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'

type Order = 'asc' | 'desc'

export class Paging {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public offset: number

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public limit: number
}

export class Sorting {
  @IsString()
  @IsOptional()
  readonly field: string

  readonly direction: Order
}

export class QueryRequestDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public offset: number

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public limit: number

  @IsString()
  @IsOptional()
  public field: string

  @IsOptional()
  public direction: Order
}

export class Filter {
  @IsObject()
  @ValidateNested()
  @Type(() => Paging)
  @IsOptional()
  readonly paging: Paging

  @IsObject()
  @ValidateNested()
  @Type(() => Sorting)
  @IsOptional()
  readonly sorting: Sorting
}

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: QueryRequestDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value
    }

    return plainToInstance<Filter, QueryRequestDto>(metatype, value)
  }
}
