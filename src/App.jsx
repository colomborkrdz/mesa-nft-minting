import { useState } from 'react'

function App() {
  console.log("🚀 EXPLICIT STYLES LOADED!")
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #374151', padding: '1rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img 
              src="/mesa vectorized logo-10.png.png" 
              alt="Mesa Logo" 
              style={{ width: '32px', height: '32px' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'inline';
              }}
            />
            <div style={{ fontSize: '1.5rem', display: 'none' }}>🌄</div>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '1.25rem' }}>Mesa</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#9CA3AF' }}>NFT Minting</span>
            {isConnected && (
              <div style={{ 
                backgroundColor: '#064E3B', 
                color: '#6EE7B7', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '9999px', 
                fontSize: '0.875rem' 
              }}>
                Smart Wallet Connected
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '56rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Mesa Genesis Collection
            </h1>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
              This NFT certifies you were a part of MESA since Day 1!
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <button style={{
                backgroundColor: '#1F2937',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Check Availability
              </button>
            </div>
          </div>

          {/* NFT Card */}
          <div style={{ maxWidth: '24rem', margin: '0 auto 2rem' }}>
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <div style={{
                aspectRatio: '1',
                background: 'linear-gradient(to bottom right, #7F1D1D, #111827)',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/mesa vectorized logo-10.png.png" 
                  alt="Mesa Logo" 
                  style={{ width: '96px', height: '96px', borderRadius: '8px' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'inline';
                  }}
                />
                <div style={{ fontSize: '3.75rem', display: 'none' }}>🌄</div>
              </div>
              <h3 style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Mesa Genesis NFT
              </h3>
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
                A unique digital collectible representing your place in the Mesa ecosystem.
              </p>
            </div>
          </div>

          {/* Wallet Connection Section */}
          <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
            {!isConnected ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Info Card */}
                <div style={{
                  background: 'linear-gradient(to right, rgba(30, 58, 138, 0.5), rgba(30, 64, 175, 0.5))',
                  border: '1px solid #2563EB',
                  borderRadius: '0.5rem',
                  padding: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{
                      backgroundColor: '#2563EB',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      marginRight: '0.5rem',
                      fontWeight: '500'
                    }}>
                      NEW
                    </div>
                    <h3 style={{ color: '#93C5FD', fontWeight: '600', fontSize: '1.125rem', margin: 0 }}>
                      New to Crypto?
                    </h3>
                  </div>
                  <p style={{ color: '#BFDBFE', marginBottom: '1rem' }}>
                    Create a Smart Wallet in seconds - no downloads, no seed phrases!
                  </p>
                  <ul style={{ color: '#BFDBFE', fontSize: '0.875rem', marginBottom: '0', textAlign: 'left', paddingLeft: '0', listStyle: 'none' }}>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#34D399', marginRight: '0.5rem' }}>✅</span>
                      Sign in with Face ID, Touch ID, or passkey
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#34D399', marginRight: '0.5rem' }}>✅</span>
                      Works everywhere across Web3
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#34D399', marginRight: '0.5rem' }}>✅</span>
                      Enterprise-grade security
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#34D399', marginRight: '0.5rem' }}>✅</span>
                      Gasless transactions available
                    </li>
                  </ul>
                </div>

                {/* Side by Side Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsConnected(true)}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      backgroundColor: '#2563EB',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Create Smart Wallet (Recommended)
                  </button>
                  
                  <button
                    onClick={() => setIsConnected(true)}
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      backgroundColor: '#1F2937',
                      border: '1px solid #4B5563',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '500',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Connect Coinbase Wallet
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', marginBottom: '1rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Wallet Connected</span>
                </div>
                <div style={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  textAlign: 'left'
                }}>
                  <div style={{ color: 'white', fontSize: '0.875rem' }}>
                    <p style={{ margin: '0.25rem 0' }}><strong>Address:</strong> 0x1234...5678</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Network:</strong> Base</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Balance:</strong> 0.0247 ETH</p>
                  </div>
                  <button
                    onClick={() => setIsConnected(false)}
                    style={{
                      color: '#F87171',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Disconnect
                  </button>
                </div>
                <button style={{
                  width: '100%',
                  backgroundColor: '#DC2626',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Mint NFT - Free (Gasless)
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #374151', padding: '2rem 1.5rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
          <p>Don't forget to review your NFT in your wallet.</p>
          <p style={{ marginTop: '0.25rem' }}>Customize it if needed and showcase it when you are ready!</p>
        </div>
      </footer>

      {/* Success Notice */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        backgroundColor: '#064E3B',
        border: '1px solid #059669',
        color: '#6EE7B7',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem'
      }}>
        ✅ EXPLICIT STYLES WORKING!
      </div>
    </div>
  )
}

export default App