import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { mainnet, goerli } from 'wagmi/chains';

// 配置支持的區塊鏈網路
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli], // 支持的網路
  [publicProvider()]
);

// 創建 Wagmi 客戶端
const client = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }), // 使用 MetaMask 連接器
  ],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
