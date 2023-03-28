import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import LayoutWrapper from '@/components/LayoutWrapper'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, Chain } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';


// const Toronet: Chain = {
//   id: 54321,
//   name: 'Toronet',
//   network: 'Toronet',
//   iconUrl: 'https://example.com/icon.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Toronet',
//     symbol: 'Toro',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://testnet.toronet.org/rpc/'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'SnowTrace', url: 'https://testnet.toronet.org/'
//     },
//   },
//   testnet: true,
// };


// const { chains, provider } = configureChains(
//   [mainnet, polygon, optimism, arbitrum, Toronet],
//   [
//     jsonRpcProvider({
//       rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
//     }),
//     publicProvider()
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   chains
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider
// })


export default function App({ Component, pageProps }: AppProps) {
  return (
    // <WagmiConfig client={wagmiClient}>
    //   <RainbowKitProvider chains={chains}>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
    //   </RainbowKitProvider>
    // </WagmiConfig>
  )
}