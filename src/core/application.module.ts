import { Module } from '@nestjs/common'
import { ControllersModule } from '../infrastructure/controllers/controllers.module'
import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'

@Module({
  imports: [ControllersModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
