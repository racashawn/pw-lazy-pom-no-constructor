export function lazyPage<T>(PageObject: new () => T): () => T {
  let instance: T | null = null;
  return () => {
    if (!instance) {
      instance = new PageObject();
    }
    return instance;
  };
}