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

export class Sorting<T> {
  @IsString()
  @IsOptional()
  readonly field: keyof T;

  readonly direction: Order;
}

export class QueryRequestDto<T> {
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
  public field: keyof T;

  @IsOptional()
  public direction: Order;
}

/**
 * This type should only be used
 * to assign the properties of a class in a constructor
 */

export class FilterDto<T> {
  @IsObject()
  @ValidateNested()
  @Type(() => Paging)
  @IsOptional()
  readonly paging: Paging;

  @IsObject()
  @ValidateNested()
  @Type(() => Sorting)
  @IsOptional()
  readonly sorting: Sorting<T>;

  constructor(filter: FilterDto<T>) {
    Object.assign<this, FilterDto<T>>(this, {
      ...filter,
    });
  }
}

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;
const DEFAULT_DIRECTION: Order = "asc";

@Injectable()
export class QueryTransformPipe<T> implements PipeTransform {
  async transform(value: QueryRequestDto<T>, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    const filter: FilterDto<T> = {
      paging: {
        offset: value.offset ?? DEFAULT_OFFSET,
        limit: value.limit ?? DEFAULT_LIMIT,
      },
      sorting: {
        field: value.field ?? undefined,
        direction: value.direction ?? DEFAULT_DIRECTION,
      },
    };
    return new FilterDto(filter);
  }
}
