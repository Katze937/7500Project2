import {useAccount, useConnect, useDisconnect, useContractRead, useContractWrite,} from 'wagmi';
  import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
  import contractABI from '../src/abis/Erc20ABI.json'; // ABI 路徑
  
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // 智能合約地址
  
  export default function Home() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
      connector: new MetaMaskConnector(),
    });
    const { disconnect } = useDisconnect();
  
    // 讀取合約的 totalSupply
    const { data: totalSupply, refetch: refetchTotalSupply } = useContractRead({
      address: contractAddress,
      abi: contractABI,
      functionName: 'totalSupply',
      watch: true, // 自動刷新數據
    });
  
    // 寫入合約（轉移代幣）
    const { write: transferTokens } = useContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: 'transfer',
    });
  
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Erc20 Contract Interaction</h1>
  
        {!isConnected ? (
          <button onClick={() => connect()}>Connect MetaMask</button>
        ) : (
          <div>
            <p>Connected Address: {address}</p>
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
        )}
  
        {isConnected && (
          <div style={{ marginTop: '20px' }}>
            <div>
              <p>Total Supply: {totalSupply ? totalSupply.toString() : 'Loading...'}</p>
              <button onClick={() => refetchTotalSupply()}>Refresh Total Supply</button>
            </div>
            <div>
              <button
                onClick={() =>
                  transferTokens({
                    args: ['0xRecipientAddress', '1000000000000000000'], // 替換為目標地址和數量
                  })
                }
              >
                Transfer Tokens
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  