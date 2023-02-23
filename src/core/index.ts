import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ApplicationModule } from './application.module'

export const startServer = async () => {
  const PORT = 3000
  const application = await NestFactory.create<NestExpressApplication>(ApplicationModule)

  application.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await application.listen(PORT)
  console.log(`Server listening at the address: http://localhost:${PORT}`)
}
