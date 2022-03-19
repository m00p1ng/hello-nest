import { DynamicModule, Global, Module } from '@nestjs/common';

import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from '../common/common.constants';

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      exports: [MailService],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
    };
  }
}
