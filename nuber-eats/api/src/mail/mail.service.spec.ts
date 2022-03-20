import { Test } from '@nestjs/testing';

import { CONFIG_OPTIONS } from '../common/common.constants';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: CONFIG_OPTIONS,
          useValue: {
            apiKey: 'test-api',
            domain: 'test-domain',
            fromEmail: 'test-fromEmail',
          },
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call sendEmail', () => {
    const sendVerificationEmailArgs = {
      email: 'email',
      code: 'code',
    };
    const sendEmailSpy = jest
      .spyOn(service as any, 'sendEmail')
      .mockImplementation(() => null);
    service.sendVerificationEmail(
      sendVerificationEmailArgs.email,
      sendVerificationEmailArgs.code,
    );
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(
      'Verify Your Email',
      sendVerificationEmailArgs.email,
      'verify-email',
      [
        { key: 'code', value: sendVerificationEmailArgs.code },
        { key: 'username', value: sendVerificationEmailArgs.email },
      ],
    );
  });
});
