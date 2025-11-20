import FlagEnvironment from '@/components/common/FlagEnvironment'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <FlagEnvironment />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
