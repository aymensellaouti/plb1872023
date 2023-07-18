import { Global, Module } from '@nestjs/common';
import { INJECT_TOKENS } from './config/constantes';

import { v4 as uuidV4 } from 'uuid';

const UUID_PROVIDER = {
  provide: INJECT_TOKENS.UUID,
  useValue: uuidV4,
};

@Module({
  providers: [UUID_PROVIDER],
  exports: [UUID_PROVIDER],
})
@Global()
export class CommonModule {}
