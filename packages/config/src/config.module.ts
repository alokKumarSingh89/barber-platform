import { DynamicModule, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { getEnvFilePath } from "./env-path";

@Module({})
export class BarberConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: BarberConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: getEnvFilePath(),
        }),
      ],
      exports: [ConfigModule],
    };
  }
}
