import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { PokeAxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: PokeAxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany(); //delete * from pokemons;

    // const { data } = await this.axios.get<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon/?limit=10',
    // );

    // const insertPromiseArray = [];

    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   insertPromiseArray.push(this.pokemonModel.create({ name, no }));
    //   // const createPokemons = this.pokemonModel.create({ name, no });
    // });

    // await Promise.all(insertPromiseArray);

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon/?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
