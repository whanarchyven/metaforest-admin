import { IMetaforestBunny } from '@/shared/types/backend/MetaforestBunny/types/IMetaforestBunny';

export class MetaforestBunny {
  public state;
  constructor(state: IMetaforestBunny) {
    this.state = state;
  }
}
