import { isEmpty, omitBy } from 'lodash'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import qs from 'qs'
import { useCallback, useEffect, useState } from 'react'

type ShapeConstructor = NumberConstructor | StringConstructor
type QueryShape = Record<string, ShapeConstructor | ShapeConstructor[]>
type QueryValues<Shape extends QueryShape> = Partial<{
  [Key in keyof Shape]: Shape[Key] extends Array<infer ConstructorType extends ShapeConstructor>
    ? ReturnType<ConstructorType>[]
    : Shape[Key] extends infer ConstructorType extends ShapeConstructor
      ? ReturnType<ConstructorType>
      : never
}>

const keyValueReducer =
  <Shape extends QueryShape>(shape?: Shape) =>
  (acc: QueryValues<Shape>, [key, value]: string[]) => {
    let constructor: ShapeConstructor | ShapeConstructor[]

    if (!shape || !(constructor = shape[key as keyof QueryValues<Shape>])) {
      return { ...acc, [key]: value }
    }

    let isArrayField: boolean
    const parsedValue = (isArrayField = Array.isArray(constructor)) ? constructor[0](value) : constructor(value)

    const prevValue = acc[key]
    if (Array.isArray(prevValue)) {
      return { ...acc, [key]: prevValue.concat(parsedValue) }
    }

    return { ...acc, [key]: isArrayField ? [parsedValue] : parsedValue }
  }

const iterableToObject = <Shape extends QueryShape>(iterator: Iterable<string[]>, shape?: Shape): QueryValues<Shape> =>
  Array.from(iterator).reduce(keyValueReducer(shape), {} as QueryValues<Shape>)

export const useQueryParams = <Shape extends QueryShape>(shape?: Shape, defaults?: QueryValues<Shape>) => {
  const router = useRouter()
  const pathname = usePathname()

  const [queryParamsState, setQueryParamsState] = useState<QueryValues<Shape>>({
    ...defaults,
    ...removeEmptyValues(iterableToObject(useSearchParams().entries(), shape)),
  })

  const updateQueryParams = useCallback(
    (values: QueryValues<Shape>) => setQueryParamsState((prev) => removeEmptyValues({ ...prev, ...values })),
    [],
  )

  const setQueryParams = useCallback((values: QueryValues<Shape>) => setQueryParamsState(removeEmptyValues(values)), [])

  const removeQueryParam = useCallback((value: keyof Shape | string) => {
    setQueryParamsState((prev) => {
      //@ts-expect-error
      return removeEmptyValues(omitBy(prev, value))
    })
  }, [])

  useEffect(() => {
    router.replace(pathname.concat('?', qs.stringify(queryParamsState, { arrayFormat: 'repeat' })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParamsState])

  return {
    updateQueryParams,
    setQueryParams,
    queryParams: queryParamsState,
    removeQueryParam,
  }
}

function removeEmptyValues<Shape extends QueryShape>(values: QueryValues<Shape>): QueryValues<Shape> {
  return Object.keys(values).reduce(
    (acc, key) => (typeof values[key] !== 'number' && isEmpty(values[key]) ? acc : { ...acc, [key]: values[key] }),
    {},
  )
}
