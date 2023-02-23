# NestJS Clean Architecture

**To run the project:**

```bash
yarn install
yarn start
```

This is a minimal reproduction of a problem: transforming a query string into an object, so as to be able to use the search params in the services called by the repository.

The type of the filters parameters is:

```typescript
type Filter = {
  paging: Paging;
  sorting: Sorting;
};
```

with the inner types:

```typescript
type Paging = {
  offset: number
  limit: number
}

type Order : 'asc' | 'desc'

type Sorting = {
  sortBy: string
  order: Order
}
```

The `QueryTransformPipe` should transform the following query strings:

```typescript
?offset=2&limit=10&sortBy=email&direction=asc
```

into the desired object:

```typescript
{
  paging: {
    offset: 2;
    limit: 10;
  }
  sorting: {
    sortBy: email;
    order: "asc";
  }
}
```

The thing is :

- This parameters are all optional. I want to be able to provide default values if they are not in the query string
- The sortBy should be a key in the User model, but I want to use the same pipe with any model. So I'm trying to have a generic `QueryTransformPipe<T>`.

The generic should give me something along the lines of:

```typescript
type Sorting<T> = {
  sortBy: keyof T;
  order: Order;
};

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  // … ??
}
```
