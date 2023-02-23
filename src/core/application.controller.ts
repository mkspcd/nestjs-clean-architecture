import { Controller, Get } from '@nestjs/common'
import { ApplicationService } from './application.service'
import { ApiStatus } from './application.types'

@Controller()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  getApiStatus(): ApiStatus {
    return this.applicationService.apiStatus()
  }
}
