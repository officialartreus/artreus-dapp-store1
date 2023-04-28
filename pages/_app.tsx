import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import LayoutWrapper from '@/components/LayoutWrapper'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, Chain, polygonMumbai, arbitrumGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const Telos: Chain = {
  id: 41,
  name: 'Telos',
  network: ' Telos',
  iconUrl: '/images/icons/telos-logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Telos',
    symbol: 'TLOS',
  },
  rpcUrls: {
    default: {
      http: ['http://141.193.240.11:8000/evm'],
    },
    public: {
      http: ['http://141.193.240.11:8000/evm'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Teloscan (testnet)', url: 'https://testnet.teloscan.io/'
    },
  },
  testnet: true,
};

const Shardeum: Chain = {
  id: 8082,
  name: 'Shardeum',
  network: ' Shardeum',
  iconUrl: '/images/icons/shardeum-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Shardeum',
    symbol: 'SHM',
  },
  rpcUrls: {
    default: {
      http: ['https://sphinx.shardeum.org/'],
    },
    public: {
      http: ['https://sphinx.shardeum.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shardeum', url: 'https://explorer-sphinx.shardeum.org/'
    },
  },
  testnet: false,
};

const ZetaChain: Chain = {
  id: 7001,
  name: 'ZetaChain Testnet',
  network: ' ZetaChain Testnet',
  iconUrl: '/images/icons/zetachain-logo.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'ZetaChain',
    symbol: 'ZETA',
  },
  rpcUrls: {
    default: {
      http: ['https://api.athens2.zetachain.com/evm'],
    },
    public: {
      http: ['https://api.athens2.zetachain.com/evm'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ZetaChain', url: 'https://explorer.zetachain.com/evm'
    },
  },
  testnet: true,
};

const Toronet: Chain = {
  id: 54321,
  name: 'Toronet',
  network: 'Toronet',
  iconUrl: '/images/icons/toronet-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Toronet',
    symbol: 'Toro',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.toronet.org/rpc/'],
    },
    public: {
      http: ['https://testnet.toronet.org/rpc/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Toronet', url: 'https://testnet.toronet.org/'
    },
  },
  testnet: true,
};

const Caduceus: Chain = {
  id: 512512,
  name: 'Caduceus',
  network: 'Caduceus',
  iconUrl: '/images/icons/iotex-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Caduceus',
    symbol: 'CMP',
  },
  rpcUrls: {
    default: {
      http: ['https://galaxy.block.caduceus.foundation'],
    },
    public: {
      http: ['https://galaxy.block.caduceus.foundation'],
    },
  },
  blockExplorers: {
    default: {
      name: 'caduceus', url: 'https://galaxy.scan.caduceus.foundation'
    },
  },
  testnet: true,
};

const IoTex: Chain = {
  id: 4690,
  name: 'IoTex',
  network: 'IoTex',
  iconUrl: '/images/icons/iotex-logo.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'IoTex',
    symbol: 'IOTX',
  },
  rpcUrls: {
    default: {
      http: ['https://babel-api.testnet.iotex.io'],
    },
    public: {
      http: ['https://babel-api.testnet.iotex.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'IoTex', url: 'https://testnet.iotexscan.io'
    },
  },
  testnet: true,
};


export const { chains, provider } = configureChains(
  [Caduceus, IoTex, polygonMumbai, Telos, Shardeum, Toronet, ZetaChain],
  [
    publicProvider()
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'Artreus DApp Store',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}