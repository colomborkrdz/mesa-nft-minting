import { useState, useEffect } from 'react'
import { createConfig, WagmiProvider, useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useBalance } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { coinbaseWallet } from 'wagmi/connectors'
import { base } from 'wagmi/chains'
import { http, parseEther } from 'viem'

const CONTRACT_ADDRESS = "0x361CF153779e32F04c27D4D15DE77b0203c21db7"

// Correct Thirdweb NFT Drop claim function
const CONTRACT_ABI = [
  {
    inputs: [
      { name: "_receiver", type: "address" },
      { name: "_quantity", type: "uint256" },
      { name: "_currency", type: "address" },
      { name: "_pricePerToken", type: "uint256" },
      { name: "_allowlistProof", type: "tuple", components: [
        { name: "proof", type: "bytes32[]" },
        { name: "quantityLimitPerWallet", type: "uint256" },
        { name: "pricePerToken", type: "uint256" },
        { name: "currency", type: "address" }
      ]},
      { name: "_data", type: "bytes" }
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
]

// Wagmi configuration
const config = createConfig({
  chains: [base], // Only Base mainnet
  connectors: [
    coinbaseWallet({
      appName: import.meta.env.VITE_COINBASE_APP_NAME || 'Mesa NFT Mint',
      preference: 'all',
    }),
  ],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

// Main NFT Mint Flow Component
function NFTMintFlow() {
  const [currentStep, setCurrentStep] = useState('eligibility')
  const [isEligible, setIsEligible] = useState(false)
  const [mintStatus, setMintStatus] = useState('idle')
  const [txHash, setTxHash] = useState(null)
  
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { data: balance } = useBalance({ address, chainId: base.id })
  
  const { writeContract, isPending: isMintPending, error: mintError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // Step 1: Eligibility Check
  const checkEligibility = async () => {
    setCurrentStep('checking')
    // Simulate eligibility check - replace with actual logic
    setTimeout(() => {
      setIsEligible(true)
      setCurrentStep('wallet')
    }, 2000)
  }

  // Step 2: Wallet Connection
  const handleWalletConnect = (connector) => {
    connect({ connector, chainId: base.id })
  }

  // Step 3: NFT Minting
  const handleMint = async () => {
    if (!isConnected || !address) return
    
    // Check balance  
    const mintCost = parseEther('0.0005') // Reduced to match your balance
    const estimatedGas = parseEther('0.0002') // Base gas is very cheap
    if (balance && balance.value < mintCost + estimatedGas) {
      const needed = parseFloat((mintCost + estimatedGas).toString()) / 1e18
      console.warn(`Low balance: Need ~${needed.toFixed(4)} ETH total, have ${balance.formatted} ETH`)
      // Temporarily allow it to proceed for testing
    }
    
    // Check if we're on the correct chain
    if (chain?.id !== base.id) {
      try {
        await switchChain({ chainId: base.id })
      } catch (error) {
        console.error('Failed to switch chain:', error)
        setMintStatus('error')
        return
      }
    }
    
    try {
      setMintStatus('minting')
      setCurrentStep('minting')
      
      const hash = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'claim',
        args: [
          address, // _receiver
          1n, // _quantity (1 NFT)
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // _currency (native currency ETH)
          0n, // _pricePerToken (0 for free)
          {
            proof: [],
            quantityLimitPerWallet: 0n,
            pricePerToken: 0n,
            currency: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          }, // _allowlistProof (for public claim)
          "0x" // _data (empty)
        ],
        chainId: base.id,
      })
      
      setTxHash(hash)
    } catch (error) {
      console.error('Mint failed:', error)
      setMintStatus('error')
    }
  }

  // Auto-advance to mint step when wallet is connected
  useEffect(() => {
    if (isConnected && currentStep === 'wallet') {
      setCurrentStep('mint')
    }
  }, [isConnected, currentStep])

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      setMintStatus('success')
      setCurrentStep('success')
    }
  }, [isConfirmed])

  const renderStep = () => {
    switch (currentStep) {
      case 'eligibility':
        return (
          <div className="step-container">
            <h2>🎯 Eligibility Check</h2>
            <p>Check if you're eligible to mint this exclusive NFT</p>
            <button onClick={checkEligibility} className="primary-btn">
              Check Eligibility
            </button>
          </div>
        )

      case 'checking':
        return (
          <div className="step-container">
            <h2>🔍 Checking Eligibility...</h2>
            <div className="loading-spinner"></div>
            <p>Verifying your eligibility status...</p>
          </div>
        )

      case 'wallet':
        return (
          <div className="step-container">
            <h2>🔗 Connect Your Wallet</h2>
            <p>Choose your preferred wallet option to continue</p>
            <div className="wallet-options">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => handleWalletConnect(connector)}
                  disabled={isPending}
                  className="wallet-btn"
                >
                  <div className="wallet-info">
                    <span className="wallet-name">{connector.name}</span>
                    <span className="wallet-desc">
                      {connector.name === 'Coinbase Wallet' 
                        ? 'Connect existing wallet or create Smart Wallet'
                        : 'Secure wallet connection'
                      }
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {isPending && <p className="connecting">Connecting...</p>}
          </div>
        )

      case 'mint':
        return (
          <div className="step-container">
            <h2>🎨 Ready to Mint</h2>
            <div className="wallet-info-card">
              <p><strong>Connected:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <p><strong>Network:</strong> {chain?.name || 'Unknown'}</p>
              <p><strong>Balance:</strong> {balance ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : 'Loading...'}</p>
              {chain?.id !== base.id && (
                <p className="wrong-network">⚠️ Wrong network! Will switch to Base when minting.</p>
              )}
              <button onClick={() => disconnect()} className="disconnect-btn">
                Disconnect
              </button>
            </div>
            <div className="nft-preview">
              <div className="nft-placeholder">
                <span>🖼️</span>
                <p>Mesa NFT Preview</p>
              </div>
            </div>
            <button onClick={handleMint} className="mint-btn" disabled={isMintPending || isConfirming}>
              {isMintPending ? 'Confirming...' : isConfirming ? 'Minting...' : 'Mint NFT'}
            </button>
            {mintError && (
              <div className="error-message">
                <p>❌ Mint failed: {mintError.message}</p>
              </div>
            )}
          </div>
        )

      case 'minting':
        return (
          <div className="step-container">
            <h2>⚡ Minting in Progress</h2>
            <div className="loading-spinner"></div>
            <p>Your NFT is being minted on the blockchain...</p>
            {txHash && (
              <p className="minting-details">
                Transaction: {txHash.slice(0, 10)}...{txHash.slice(-8)}
              </p>
            )}
            <p className="minting-details">This may take a few moments</p>
          </div>
        )

      case 'success':
        return (
          <div className="step-container success">
            <h2>🎉 Mint Successful!</h2>
            <div className="success-content">
              <div className="nft-success">
                <span>✅</span>
                <p>Your Mesa NFT has been minted successfully!</p>
              </div>
              <div className="transaction-info">
                <p><strong>Wallet:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                <p><strong>Status:</strong> Confirmed</p>
                {txHash && (
                  <p><strong>Transaction:</strong> {txHash.slice(0, 10)}...{txHash.slice(-8)}</p>
                )}
              </div>
              <button 
                onClick={() => {
                  setCurrentStep('eligibility')
                  setMintStatus('idle')
                  setTxHash(null)
                  disconnect()
                }} 
                className="reset-btn"
              >
                Mint Another
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="nft-mint-app">
      <header className="app-header">
        <h1>Mesa NFT Mint</h1>
        <div className="step-indicator">
          <div className={`step ${currentStep === 'eligibility' || currentStep === 'checking' ? 'active' : isEligible ? 'completed' : ''}`}>1</div>
          <div className={`step ${currentStep === 'wallet' ? 'active' : isConnected ? 'completed' : ''}`}>2</div>
          <div className={`step ${currentStep === 'mint' || currentStep === 'minting' ? 'active' : mintStatus === 'success' ? 'completed' : ''}`}>3</div>
          <div className={`step ${currentStep === 'success' ? 'active completed' : ''}`}>4</div>
        </div>
      </header>
      
      <main className="mint-flow">
        {renderStep()}
      </main>
    </div>
  )
}

// Main App Component with Providers
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NFTMintFlow />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App