import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

export function Capabilities() {
    const account = useAccount();
    const { data: capabilities } = useCapabilities({ account: account.address });
  
    return (
      <div style={{ 
        fontFamily: "Arial, sans-serif", 
        color: "white",
      }}>
        <h2 style={{ 
          color: "white",
          fontWeight: "bold" 
        }}>Capabilities:</h2>
        {capabilities ? (
          <pre style={{
            background: "#333",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            overflow: "auto",
            fontFamily: "Consolas, 'Courier New', monospace",
            margin: "10px 0 0 0"
          }}>
            {JSON.stringify(capabilities, null, 2)}
          </pre>
        ) : (
          <p>No capabilities found.</p>
        )}
      </div>
    );
  }
  
  