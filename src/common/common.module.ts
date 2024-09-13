import { Module } from '@nestjs/common';
import { PokeAxiosAdapter } from './adapters/axios.adapter';

@Module({
  providers: [PokeAxiosAdapter],
  exports: [PokeAxiosAdapter],
})
export class CommonModule {}
