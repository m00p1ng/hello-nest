import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVars, MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    to: string,
    template: string,
    emailVars: EmailVars[],
  ) {
    console.log('[-] Sending email', {
      subject,
      to,
      template,
      domain: this.options.domain,
      emailVars,
    });
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', email, 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
