import { Injectable } from '@nestjs/common'
import { ApiStatus } from './application.types'

@Injectable()
export class ApplicationService {
  apiStatus(): ApiStatus {
    return {
      status: 200,
      message: 'The API is up and running.',
    }
  }
}
