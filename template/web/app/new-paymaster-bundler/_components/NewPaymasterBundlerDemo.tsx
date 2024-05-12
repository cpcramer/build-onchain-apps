import { useAccount } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import { CallStatus } from './CallStatus';
import { Capabilities } from './Capabilities';

const deployUrl = process.env.BOAT_DEPLOY_URL ?? process.env.VERCEL_URL;
const defaultUrl = deployUrl
  ? `https://${deployUrl}/new-paymaster-bundler/_components/NewPaymasterProxy`
  : `https://api.developer.coinbase.com/rpc/v1/base-sepolia/z7inYI-NRNAOF9kgaW4Suf-30N6DuMra`;

const abi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', type: 'address' }],
    name: 'safeMint',
    outputs: [],
  },
] as const;

export default function NewPaymasterBundlerDemo() {
  const account = useAccount();
  const { data: id, writeContracts } = useWriteContracts();

  const handleMint = async () => {
    console.log("Default url: ", defaultUrl)
    console.log('account: ', account);
    if (account.address === undefined) {
      alert('You need to be signed in to mint an NFT.');
      console.error('You need to be signed in to mint an NFT.');
      return;
    }

    try {
      writeContracts({
        contracts: [
          {
            address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
            abi,
            functionName: 'safeMint',
            args: [account.address],
          },
          // ,
          // {
          //   address: '0x119Ea671030FBf79AB93b436D2E20af6ea469a19',
          //   abi,
          //   functionName: 'safeMint',
          //   args: [account.address],
          // },
        ],
        capabilities: {
          paymasterService: {
            // TODOs
            // Temp work around by calling our paymaster directly.
            // Proxy should work in dev, need to test.
            url: defaultUrl
            // url: `${defaultUrl} + /api/paymaster`,
            // url: `${document.location.origin}/new-paymaster-bundler/_components/`;            
          },
        },
      });

      console.log('Success writing contract!');
    } catch (error) {
      console.error('Error writing contract: ', error);
    }
  };

return (
  <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #ccc" }}>Account Details</h2>
      <div style={{ fontSize: "16px", marginTop: "10px" }}>
        <strong>Status:</strong> {account.status}
        <br />
        <strong>Chain ID:</strong> {account.chainId}
        <br />
        <strong>Addresses:</strong> {JSON.stringify(account.addresses)}
        <br />
        <Capabilities />
        <br />
      </div>
    </div>
    <div>
      <h2 style={{ borderBottom: "2px solid #ccc" }}>Mint an NFT using Smart Wallets. Sponsored by Coinbase!</h2>
      <button
        type="button"
        style={{
          display: "block",
          width: "100%",
          padding: "15px 0",
          borderRadius: "30px",
          border: "2px solid black",
          backgroundColor: "white",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "10px"
        }}
        className="hover:bg-gray-800 hover:text-white"
        onClick={handleMint}
      >
        Mint NFT
      </button>
      <br />
      {id && <CallStatus id={id} />}
      {id && (
        <div style={{ marginTop: "10px", fontSize: "16px" }}>
          <strong>Transaction ID:</strong> {id}
        </div>
      )}
    </div>
  </div>
);
}
