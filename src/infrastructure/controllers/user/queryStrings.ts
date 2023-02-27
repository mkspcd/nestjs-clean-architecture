// /* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

type Order = "asc" | "desc";

export class Paging {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public offset: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public limit: number;
}

export class Sorting {
  @IsString()
  @IsOptional()
  readonly field: string;

  readonly direction: Order;
}

export class QueryRequestDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public offset: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  public limit: number;

  @IsString()
  @IsOptional()
  public field: string;

  @IsOptional()
  public direction: Order;
}

/**
 * This type should only be used
 * to assign the properties of a class in a constructor
 */

export class FilterDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Paging)
  @IsOptional()
  readonly paging: Paging;

  @IsObject()
  @ValidateNested()
  @Type(() => Sorting)
  @IsOptional()
  readonly sorting: Sorting;

  constructor(filter: FilterDto) {
    Object.assign<this, FilterDto>(this, {
      ...filter,
    });
  }
}

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  async transform(value: QueryRequestDto, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    const filter: FilterDto = {
      paging: {
        offset: value.offset ?? undefined,
        limit: value.limit ?? undefined,
      },
      sorting: {
        field: value.field ?? undefined,
        direction: value.direction ?? undefined,
      },
    };
    return new FilterDto(filter);
  }
}
