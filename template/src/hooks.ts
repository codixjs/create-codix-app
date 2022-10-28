import { useRequestRouter } from '@codixjs/codix';
import callback from './index';
type TCallbackpathes = ReturnType<typeof callback>;
export function usePath<U extends keyof TCallbackpathes>(id: U) {
  return useRequestRouter<TCallbackpathes>(id) as TCallbackpathes[U];
}