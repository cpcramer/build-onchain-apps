import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

/**
 * Capabilities component displays the capabilities of the current account.
 *
 * @returns {JSX.Element} The rendered component displaying the capabilities or a message if none are found.
 */
export function Capabilities() {
  const account = useAccount();
  const { data: capabilities } = useCapabilities({ account: account.address });

  return (
    <div className="font-sans text-white">
      <h2 className="text-white font-bold">Capabilities:</h2>
      {capabilities ? (
        <pre className="bg-gray-800 text-white p-2.5 rounded overflow-auto font-mono mt-2">
          {JSON.stringify(capabilities, null, 2)}
        </pre>
      ) : (
        <p>No capabilities found.</p>
      )}
    </div>
  );
} 
  