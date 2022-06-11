export const getShortened = (name: string): string =>
  name.split(' ').slice(0, -1).join(' ')

export async function getRetried<T>(
  name: string,
  fetchFunc: (name: string) => Promise<T>,
  judgeFunc: (items: T) => boolean
): Promise<T | undefined> {
  const data = await fetchFunc(name)

  if (!judgeFunc(data)) {
    const fixedName = getShortened(name)

    if (!fixedName) {
      return undefined
    }

    return getRetried(fixedName, fetchFunc, judgeFunc)
  }

  return data
}
